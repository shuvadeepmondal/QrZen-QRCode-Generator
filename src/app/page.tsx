import { QRProvider } from "@/contexts/qr-context"
import SiteHeader from "@/components/layout/site-header"
import SiteFooter from "@/components/layout/site-footer"
import HeroSection from "@/components/ui/hero-section"

export default function HomePage() {
  return (
    <QRProvider>
      <div className="min-h-screen bg-white text-gray-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-300">
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
          <HeroSection />
        </main>
        <SiteFooter />
      </div>
    </QRProvider>
  )
}
