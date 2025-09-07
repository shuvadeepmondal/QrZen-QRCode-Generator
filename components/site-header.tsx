"use client"

import Link from "next/link"
import ThemeToggle from "../theme-toggle"
import { QrCode, Github } from 'lucide-react'

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/60 border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="group flex items-center gap-2">
            <div className="h-9 w-9 grid place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm">
              <QrCode className="h-5 w-5" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold tracking-tight group-hover:opacity-90">QrZen</span>
              <span className="text-xs text-gray-500 dark:text-zinc-400">Generate the QR</span>
            </div>
          </Link>
        </div>

        <nav className="hidden sm:flex items-center gap-5 text-sm">
          <Link href="/" className="text-gray-600 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/generator" className="text-gray-600 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white transition-colors">
            Generator
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="View source on GitHub"
            title="View source on GitHub"
          >
            <Github className="h-4 w-4" />
            <span>Source</span>
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
