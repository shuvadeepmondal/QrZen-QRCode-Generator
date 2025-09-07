"use client"

import { useMemo, useRef, useState } from "react"
import { useQR } from "@/contexts/qr-context"
import { useDebouncedEffect } from "@/hooks/use-debounced-effect"
import { normalizeHex } from "@/lib/utils"
import { Trash2, Upload, Palette, SlidersHorizontal } from "lucide-react"

export default function QRControls() {
  const { settings, setSettings, reset } = useQR()
  const fileRef = useRef<HTMLInputElement>(null)
  const [tempText, setTempText] = useState(settings.text)

  // Debounce text updates for smoother typing
  useDebouncedEffect(
    () => {
      setSettings((s) => ({ ...s, text: tempText }))
    },
    [tempText],
    250,
  )

  const fileName = useMemo(() => settings.logoFile?.name ?? "", [settings.logoFile])

  return (
    <form className="grid gap-5" onSubmit={(e) => e.preventDefault()} aria-labelledby="controls-heading">
      <div className="grid gap-2">
        <label htmlFor="qr-text" className="text-sm font-medium">
          Content
        </label>
        <textarea
          id="qr-text"
          className="w-full min-h-24 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/50 transition-shadow resize-none"
          placeholder="Enter text or URL to encode..."
          value={tempText}
          onChange={(e) => setTempText(e.target.value)}
          spellCheck={false}
        />
        <p className="text-xs text-gray-500 dark:text-zinc-400">Tip: Keep content concise for best scan reliability.</p>
      </div>

      <fieldset className="grid gap-4">
        <legend className="text-sm font-medium flex items-center gap-2 mb-1">
          <SlidersHorizontal className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          Size & Quality
        </legend>
        <RangeRow
          id="size"
          label="Size"
          min={128}
          max={1024}
          step={32}
          value={settings.size}
          onChange={(v) => setSettings((s) => ({ ...s, size: v }))}
          suffix="px"
        />
        <RangeRow
          id="margin"
          label="Margin"
          min={0}
          max={12}
          step={1}
          value={settings.margin}
          onChange={(v) => setSettings((s) => ({ ...s, margin: v }))}
          suffix="modules"
        />

        <div className="grid sm:grid-cols-3 gap-3">
          <div className="grid gap-1">
            <label htmlFor="ecc" className="text-xs font-medium">
              Error Correction
            </label>
            <select
              id="ecc"
              className="h-10 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/50"
              value={settings.ecc}
              onChange={(e) => setSettings((s) => ({ ...s, ecc: e.target.value as any }))}
            >
              <option value="L">L (Low)</option>
              <option value="M">M (Medium)</option>
              <option value="Q">Q (Quartile)</option>
              <option value="H">H (High)</option>
            </select>
          </div>

          <ColorField
            id="dark"
            label="QR Color"
            value={settings.colorDark}
            onChange={(val) => setSettings((s) => ({ ...s, colorDark: normalizeHex(val) }))}
          />
          <ColorField
            id="light"
            label="Background"
            value={settings.colorLight}
            onChange={(val) => setSettings((s) => ({ ...s, colorLight: normalizeHex(val) }))}
          />
        </div>
      </fieldset>

      <fieldset className="grid gap-4">
        <legend className="text-sm font-medium flex items-center gap-2 mb-1">
          <Palette className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          Branding (optional)
        </legend>
        <div className="grid gap-3 sm:grid-cols-5">
          <div className="sm:col-span-3 grid gap-2">
            <div className="flex items-center gap-2">
              <input
                ref={fileRef}
                id="logo"
                type="file"
                accept="image/png, image/jpeg, image/webp, image/svg+xml"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  setSettings((s) => ({ ...s, logoFile: file ?? null }))
                }}
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex h-10 items-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 px-3 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors focus-visible"
              >
                <Upload className="h-4 w-4" />
                Upload Logo
              </button>
              {settings.logoFile && (
                <button
                  type="button"
                  onClick={() => {
                    if (fileRef.current) fileRef.current.value = ""
                    setSettings((s) => ({ ...s, logoFile: null }))
                  }}
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 px-3 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors focus-visible"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-zinc-400 line-clamp-1" aria-live="polite">
              {fileName || "PNG, JPG, WEBP, or SVG. Max few MBs recommended."}
            </p>
          </div>

          <RangeRow
            id="logo-scale"
            label="Logo Size"
            min={0.1}
            max={0.35}
            step={0.01}
            value={settings.logoScale}
            onChange={(v) => setSettings((s) => ({ ...s, logoScale: v }))}
            format={(v) => `${Math.round(v * 100)}%`}
          />
          <RangeRow
            id="logo-radius"
            label="Logo Radius"
            min={0}
            max={24}
            step={1}
            value={settings.logoRadius}
            onChange={(v) => setSettings((s) => ({ ...s, logoRadius: v }))}
            suffix="px"
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-zinc-400">
          Use higher error correction (Q or H) when adding a logo for reliable scanning.
        </p>
      </fieldset>

      <div className="flex flex-wrap items-center gap-2 pt-2">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 px-4 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors focus-visible"
        >
          Reset
        </button>
      </div>
    </form>
  )
}

interface RangeRowProps {
  id: string
  label: string
  min: number
  max: number
  step: number
  value: number
  onChange: (v: number) => void
  suffix?: string
  format?: (v: number) => string
}

function RangeRow({ id, label, min, max, step, value, onChange, suffix, format }: RangeRowProps) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-medium">
          {label}
        </label>
        <span className="text-xs text-gray-500 dark:text-zinc-400 tabular-nums">
          {format ? format(value) : value}
          {suffix ? ` ${suffix}` : ""}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="accent-emerald-600 focus-visible"
      />
    </div>
  )
}

interface ColorFieldProps {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
}

function ColorField({ id, label, value, onChange }: ColorFieldProps) {
  return (
    <div className="grid gap-1">
      <label htmlFor={`${id}-color`} className="text-xs font-medium">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={`${id}-color`}
          type="color"
          className="h-10 w-10 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1 focus-visible"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={`${label} color picker`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="flex-1 h-10 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/50"
          aria-label={`${label} hex value`}
        />
      </div>
    </div>
  )
}
