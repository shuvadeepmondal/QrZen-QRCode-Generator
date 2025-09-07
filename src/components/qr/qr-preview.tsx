"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import QRCode from "qrcode"
import { useQR } from "@/contexts/qr-context"
import { clamp, suggestedFileName } from "@/lib/utils"
import { composeWithLogo } from "@/lib/qr-utils"
import { copyImageToClipboard, downloadPNG, downloadSVG } from "@/lib/download-utils"
import { Download, Copy, Check, ImageDown, RefreshCcw } from "lucide-react"

export default function QRPreview() {
  const { settings } = useQR()
  const [dataUrl, setDataUrl] = useState<string>("")
  const [svgText, setSvgText] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState<"png" | "svg" | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const regenKey = useMemo(
    () =>
      [settings.text, settings.size, settings.margin, settings.ecc, settings.colorDark, settings.colorLight].join("|"),
    [settings.text, settings.size, settings.margin, settings.ecc, settings.colorDark, settings.colorLight],
  )

  // Debounced generation for performance
  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()

    const gen = async () => {
      if (!settings.text?.trim()) {
        setDataUrl("")
        setSvgText("")
        return
      }

      setLoading(true)

      try {
        // Prepare base QR on a temp canvas
        const size = clamp(settings.size, 128, 2048)
        const canvas = document.createElement("canvas")

        await QRCode.toCanvas(canvas, settings.text, {
          width: size,
          margin: clamp(settings.margin, 0, 32),
          color: {
            dark: settings.colorDark,
            light: settings.colorLight,
          },
          errorCorrectionLevel: settings.ecc,
        })

        // Optional logo overlay for PNG
        const composedCanvas = await composeWithLogo(canvas, settings.logoFile, {
          radius: settings.logoRadius,
          scale: settings.logoScale,
        })

        if (cancelled || controller.signal.aborted) return

        const url = composedCanvas.toDataURL("image/png")
        setDataUrl(url)

        // Generate vector SVG (logo-free for simplicity)
        const svg = await QRCode.toString(settings.text, {
          type: "svg",
          width: size,
          margin: clamp(settings.margin, 0, 32),
          color: {
            dark: settings.colorDark,
            light: settings.colorLight,
          },
          errorCorrectionLevel: settings.ecc,
        })

        if (cancelled || controller.signal.aborted) return
        setSvgText(svg)

        // Hold a canvas ref for potential direct downloads
        canvasRef.current = composedCanvas
      } catch (error) {
        console.error("QR generation error:", error)
        setDataUrl("")
        setSvgText("")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    const timeout = window.setTimeout(gen, 200)

    return () => {
      cancelled = true
      controller.abort()
      window.clearTimeout(timeout)
    }
  }, [regenKey, settings.logoFile, settings.logoRadius, settings.logoScale])

  const handleCopyPNG = async () => {
    if (!dataUrl) return
    const success = await copyImageToClipboard(dataUrl)
    setCopied(success ? "png" : null)
    window.setTimeout(() => setCopied(null), 1200)
  }

  return (
    <div className="grid gap-4">
      <div
        className="relative aspect-square w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[linear-gradient(120deg,rgba(16,185,129,.08),transparent),linear-gradient(0deg,rgba(0,0,0,.02),transparent)] grid place-items-center overflow-hidden"
        aria-live="polite"
      >
        <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(transparent,black_70%)]" />

        {loading && (
          <div className="absolute inset-0 grid place-items-center bg-white/50 dark:bg-zinc-900/50">
            <div className="flex flex-col items-center gap-3">
              <RefreshCcw className="h-5 w-5 animate-spin text-emerald-600" />
              <span className="text-xs text-gray-500 dark:text-zinc-400">Generating...</span>
            </div>
          </div>
        )}

        {dataUrl ? (
          <img
            key={dataUrl}
            src={dataUrl || "/placeholder.svg"}
            alt="Generated QR code preview"
            className="w-full h-full object-contain animate-in"
          />
        ) : (
          <div className="text-center text-sm text-gray-500 dark:text-zinc-400 px-6">
            Enter content on the left to preview your QR code here.
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => downloadPNG(canvasRef.current, suggestedFileName(settings.text))}
          disabled={!dataUrl}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible"
          aria-disabled={!dataUrl}
        >
          <ImageDown className="h-4 w-4" />
          PNG
        </button>

        <button
          type="button"
          onClick={() => downloadSVG(svgText, suggestedFileName(settings.text))}
          disabled={!svgText}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible"
          aria-disabled={!svgText}
          title={settings.logoFile ? "SVG export excludes logo overlay" : undefined}
        >
          <Download className="h-4 w-4" />
          SVG
        </button>

        <button
          type="button"
          onClick={handleCopyPNG}
          disabled={!dataUrl}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible"
          aria-disabled={!dataUrl}
        >
          {copied === "png" ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
          {copied === "png" ? "Copied" : "Copy PNG"}
        </button>
      </div>

      <p className="text-xs text-gray-500 dark:text-zinc-400">
        SVG export is vector and logo-free. PNG export includes logo overlays when provided.
      </p>
    </div>
  )
}
