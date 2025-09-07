"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

type ECC = "L" | "M" | "Q" | "H"

export type QRSettings = {
  text: string
  size: number
  margin: number
  ecc: ECC
  colorDark: string
  colorLight: string
  logoFile?: File | null
  logoRadius: number
  logoScale: number // percentage of QR width (0-1)
}

type QRContextValue = {
  settings: QRSettings
  setSettings: React.Dispatch<React.SetStateAction<QRSettings>>
  reset: () => void
  theme: "light" | "dark"
  toggleTheme: () => void
}

const defaultSettings: QRSettings = {
  text: "https://example.com",
  size: 512,
  margin: 4,
  ecc: "M",
  colorDark: "#111827", // zinc-900
  colorLight: "#ffffff",
  logoFile: null,
  logoRadius: 12,
  logoScale: 0.18,
}

const QRContext = createContext<QRContextValue | undefined>(undefined)

export function QRProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<QRSettings>(() => {
    // Restore persisted settings, if any
    try {
      const raw = localStorage.getItem("qr:settings")
      if (raw) {
        const parsed = JSON.parse(raw)
        return { ...defaultSettings, ...parsed }
      }
    } catch {}
    return defaultSettings
  })

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light"
    const saved = localStorage.getItem("qr:theme") as "light" | "dark" | null
    if (saved) return saved
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  })

  useEffect(() => {
    localStorage.setItem("qr:settings", JSON.stringify({ ...settings, logoFile: undefined }))
  }, [settings])

  useEffect(() => {
    localStorage.setItem("qr:theme", theme)
    const root = document.documentElement
    if (theme === "dark") root.classList.add("dark")
    else root.classList.remove("dark")
  }, [theme])

  const value: QRContextValue = useMemo(
    () => ({
      settings,
      setSettings,
      reset: () => setSettings(defaultSettings),
      theme,
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    }),
    [settings, theme]
  )

  return <QRContext.Provider value={value}>{children}</QRContext.Provider>
}

export function useQR() {
  const ctx = useContext(QRContext)
  if (!ctx) throw new Error("useQR must be used within QRProvider")
  return ctx
}
