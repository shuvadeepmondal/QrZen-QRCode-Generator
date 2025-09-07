import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "QrZen - Beautiful QR Code Generator",
  description:
    "Create beautiful, customizable QR codes with logo overlays. Export as PNG or SVG. Built with Next.js and Tailwind CSS.",
  keywords: ["QR code", "generator", "customizable", "logo", "PNG", "SVG", "React", "Next.js"],
  authors: [{ name: "QrZen Team" }],
  creator: "QrZen",
  publisher: "QrZen",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://qrzen.vercel.app"),
  openGraph: {
    title: "QrZen - Beautiful QR Code Generator",
    description: "Create beautiful, customizable QR codes with logo overlays. Export as PNG or SVG.",
    url: "https://qrzen.vercel.app",
    siteName: "QrZen",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QrZen - Beautiful QR Code Generator",
    description: "Create beautiful, customizable QR codes with logo overlays. Export as PNG or SVG.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
