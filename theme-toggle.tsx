"use client"

import { Moon, Sun } from 'lucide-react'
import { useQR } from "./qr-context"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useQR()
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
      aria-label="Toggle theme"
      title="Toggle light/dark"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  )
}
