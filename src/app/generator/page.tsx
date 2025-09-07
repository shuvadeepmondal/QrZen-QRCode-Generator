import { QRProvider } from "@/contexts/qr-context"
import SiteHeader from "@/components/layout/site-header"
import SiteFooter from "@/components/layout/site-footer"
import QRControls from "@/components/qr/qr-controls"
import QRPreview from "@/components/qr/qr-preview"
import { Info } from "lucide-react"

export default function GeneratorPage() {
  return (
    <QRProvider>
      <div className="min-h-screen bg-white text-gray-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-300">
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/50 p-4 sm:p-6 shadow-sm">
              <h2 className="text-base font-semibold flex items-center gap-2 mb-4">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
                Generator Controls
              </h2>
              <QRControls />
            </div>

            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/50 p-4 sm:p-6 shadow-sm">
              <h2 className="text-base font-semibold mb-4">Live Preview & Export</h2>
              <QRPreview />
            </div>
          </section>

          <section className="mt-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Info className="h-5 w-5 text-emerald-600 dark:text-emerald-400" aria-hidden />
              </div>
              <div className="text-sm leading-relaxed text-gray-600 dark:text-zinc-300">
                <p className="mb-2">
                  This is a client-only React app. QR codes are generated in your browser using canvas, so no data is
                  uploaded to a server.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>PNG downloads support optional logo overlays for better branding.</li>
                  <li>SVG downloads prioritize sharp vector output and exclude logo overlays.</li>
                  <li>Use error correction to improve scan reliability when adding logos.</li>
                </ul>
              </div>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    </QRProvider>
  )
}
