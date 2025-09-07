"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { QRSettings, QRContextValue } from "@/types/qr"

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
    if (typeof window === "undefined") return defaultSettings

    try {
      const raw = localStorage.getItem("qr:settings")
      if (raw) {
        const parsed = JSON.parse(raw)
        return { ...defaultSettings, ...parsed }
      }
    } catch (error) {
      console.warn("Failed to parse QR settings from localStorage:", error)
    }
    return defaultSettings
  })

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light"

    const saved = localStorage.getItem("qr:theme") as "light" | "dark" | null
    if (saved) return saved

    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  })

  useEffect(() => {
    try {
      localStorage.setItem("qr:settings", JSON.stringify({ ...settings, logoFile: undefined }))
    } catch (error) {
      console.warn("Failed to save QR settings to localStorage:", error)
    }
  }, [settings])

  useEffect(() => {
    try {
      localStorage.setItem("qr:theme", theme)
      const root = document.documentElement
      if (theme === "dark") {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }
    } catch (error) {
      console.warn("Failed to save theme to localStorage:", error)
    }
  }, [theme])

  const value: QRContextValue = useMemo(
    () => ({
      settings,
      setSettings,
      reset: () => setSettings(defaultSettings),
      theme,
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    }),
    [settings, theme],
  )

  return <QRContext.Provider value={value}>{children}</QRContext.Provider>
}

export function useQR() {
  const ctx = useContext(QRContext)
  if (!ctx) {
    throw new Error("useQR must be used within QRProvider")
  }
  return ctx
}
