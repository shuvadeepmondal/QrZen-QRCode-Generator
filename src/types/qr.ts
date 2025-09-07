import type React from "react"
export type ECC = "L" | "M" | "Q" | "H"

export interface QRSettings {
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

export interface QRContextValue {
  settings: QRSettings
  setSettings: React.Dispatch<React.SetStateAction<QRSettings>>
  reset: () => void
  theme: "light" | "dark"
  toggleTheme: () => void
}
