import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans, Syne } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ComparisonProvider } from "@/contexts/comparison-context"
import { ComparisonBar } from "@/components/comparison-bar"
import "./globals.css"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
})

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SevenFive | Professional Kitchen Equipment",
  description:
    "Premium commercial kitchen equipment for restaurants, hotels, and cafes. Over 30,000 products from world-leading brands.",
  generator: "v0.app",
  keywords: [
    "kitchen equipment",
    "commercial kitchen",
    "restaurant equipment",
    "hotel kitchen",
    "professional cooking",
  ],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${syne.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <ComparisonProvider>
          {children}
          <ComparisonBar />
        </ComparisonProvider>
        <Analytics />
      </body>
    </html>
  )
}
