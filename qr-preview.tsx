"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import QRCode from "qrcode"
import { useQR } from "./qr-context"
import { Download, Copy, Check, ImageDown, RefreshCcw } from 'lucide-react'

export default function QRPreview() {
  const { settings } = useQR()
  const [dataUrl, setDataUrl] = useState<string>("")
  const [svgText, setSvgText] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState<"png" | "svg" | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const regenKey = useMemo(
    () => [settings.text, settings.size, settings.margin, settings.ecc, settings.colorDark, settings.colorLight].join("|"),
    [settings.text, settings.size, settings.margin, settings.ecc, settings.colorDark, settings.colorLight]
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

        // hold a canvas ref for potential direct downloads
        canvasRef.current = composedCanvas
      } catch (e) {
        console.error(e)
        setDataUrl("")
        setSvgText("")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    const t = window.setTimeout(gen, 200)
    return () => {
      cancelled = true
      controller.abort()
      window.clearTimeout(t)
    }
  }, [regenKey, settings.logoFile, settings.logoRadius, settings.logoScale])

  return (
    <div className="grid gap-4">
      <div
        className="relative aspect-square w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[linear-gradient(120deg,rgba(16,185,129,.08),transparent),linear-gradient(0deg,rgba(0,0,0,.02),transparent)] grid place-items-center overflow-hidden"
        aria-live="polite"
      >
        <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(transparent,black_70%)]" />
        {loading && (
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-3">
              <RefreshCcw className="h-5 w-5 animate-spin text-emerald-600" />
              <span className="text-xs text-gray-500 dark:text-zinc-400">Generating...</span>
            </div>
          </div>
        )}
        {dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={dataUrl}
            src={dataUrl || "/placeholder.svg"}
            alt="Generated QR code preview"
            className="w-full h-full object-contain animate-in fade-in zoom-in-50 duration-300"
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
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-disabled={!dataUrl}
        >
          <ImageDown className="h-4 w-4" />
          PNG
        </button>
        <button
          type="button"
          onClick={() => downloadSVG(svgText, suggestedFileName(settings.text))}
          disabled={!svgText}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-disabled={!svgText}
          title={settings.logoFile ? "SVG export excludes logo overlay" : undefined}
        >
          <Download className="h-4 w-4" />
          SVG
        </button>
        <button
          type="button"
          onClick={async () => {
            if (!dataUrl) return
            const ok = await copyImageToClipboard(dataUrl)
            setCopied(ok ? "png" : null)
            window.setTimeout(() => setCopied(null), 1200)
          }}
          disabled={!dataUrl}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

async function composeWithLogo(
  baseCanvas: HTMLCanvasElement,
  file?: File | null,
  opts?: { radius?: number; scale?: number }
) {
  if (!file) return baseCanvas
  const { radius = 12, scale = 0.18 } = opts ?? {}
  const cw = baseCanvas.width
  const ch = baseCanvas.height

  // Compose on a new canvas to avoid tainting original if needed
  const canvas = document.createElement("canvas")
  canvas.width = cw
  canvas.height = ch
  const ctx = canvas.getContext("2d")!
  ctx.drawImage(baseCanvas, 0, 0)

  // Load logo image
  const url = URL.createObjectURL(file)
  try {
    const img = await loadImage(url)
    const logoW = Math.round(cw * clamp(scale, 0.08, 0.4))
    const logoH = Math.round((img.height / img.width) * logoW)
    const x = Math.round(cw / 2 - logoW / 2)
    const y = Math.round(ch / 2 - logoH / 2)

    // Draw white rounded rect under logo for contrast
    ctx.save()
    roundedRect(ctx, x - 8, y - 8, logoW + 16, logoH + 16, radius)
    ctx.fillStyle = "white"
    ctx.fill()
    ctx.restore()

    // Draw logo clipped to rounded rect
    ctx.save()
    roundedRect(ctx, x, y, logoW, logoH, radius)
    ctx.clip()
    ctx.drawImage(img, x, y, logoW, logoH)
    ctx.restore()
  } finally {
    URL.revokeObjectURL(url)
  }

  return canvas
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + rr, y)
  ctx.arcTo(x + w, y, x + w, y + h, rr)
  ctx.arcTo(x + w, y + h, x, y + h, rr)
  ctx.arcTo(x, y + h, x, y, rr)
  ctx.arcTo(x, y, x + w, y, rr)
  ctx.closePath()
}

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}

function suggestedFileName(content: string) {
  const clean = content.trim().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/gi, "").toLowerCase()
  return clean ? `qr-${clean.slice(0, 40)}` : "qr-code"
}

function downloadPNG(canvas: HTMLCanvasElement | null, base: string) {
  if (!canvas) return
  const link = document.createElement("a")
  link.download = `${base}.png`
  link.href = canvas.toDataURL("image/png")
  document.body.appendChild(link)
  link.click()
  link.remove()
}

function downloadSVG(svgText: string, base: string) {
  if (!svgText) return
  const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.download = `${base}.svg`
  link.href = url
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

async function copyImageToClipboard(dataUrl: string) {
  try {
    const res = await fetch(dataUrl)
    const blob = await res.blob()
    // @ts-ignore - ClipboardItem is not in TS lib in some environments
    const item = new ClipboardItem({ [blob.type]: blob })
    await navigator.clipboard.write([item])
    return true
  } catch (e) {
    console.warn("Clipboard image copy not supported", e)
    return false
  }
}
