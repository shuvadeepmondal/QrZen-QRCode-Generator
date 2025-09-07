import Link from "next/link"
import { Github, ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-emerald-50 to-white dark:from-zinc-900 dark:to-zinc-900/60 px-6 py-12 sm:px-12 sm:py-16 shadow-sm mb-8">
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" aria-hidden />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl" aria-hidden />
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 dark:border-emerald-800/60 bg-white/60 dark:bg-zinc-900/60 px-3 py-1 text-xs text-emerald-700 dark:text-emerald-300 mb-4">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
            Client-side, no data leaves your device
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Create beautiful{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              QR codes
            </span>{" "}
            with QrZen's philosophy of privacy and simplicity
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-zinc-300 max-w-2xl mx-auto lg:mx-0">
            Experience the future of QR code generation with QrZen. Customize colors, margins, and error correction. Add
            a center logo, then export as crisp PNG or SVG. Built with Next.js and Tailwind CSS.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
            <Link
              href="/generator"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 text-white hover:bg-emerald-700 transition-colors w-full sm:w-auto focus-visible"
            >
              <ArrowRight className="h-4 w-4" />
              Open QrZen Generator
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 px-5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors w-full sm:w-auto focus-visible"
              aria-label="View source on GitHub"
              title="View source on GitHub"
            >
              <Github className="h-4 w-4" />
              View source
            </a>
          </div>
        </div>

        <div className="order-first lg:order-none grid place-items-center">
          <div className="relative aspect-square w-full max-w-[320px] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 overflow-hidden shadow-sm">
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,.15),transparent_60%)]"
              aria-hidden
            />
            <img
              src="/stylized-qr-code.png"
              alt="Stylized QR code illustration showing the app's capabilities"
              className="absolute inset-0 m-auto h-[72%] w-[72%] object-contain animate-in"
            />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-gray-500 dark:text-zinc-400">
              <span>Preview</span>
              <span>PNG • SVG</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
