import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Syne } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { CartProvider } from "@/contexts/cart-context"
import { ComparisonProvider } from "@/contexts/comparison-context"
import { WishlistProvider } from "@/contexts/wishlist-context"
import "../globals.css"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

export const metadata: Metadata = {
  title: { default: "SevenFive Kitchen", template: "%s | SevenFive Kitchen" },
  description: "Premium culinary equipment for professionals",
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as "en" | "th")) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <CartProvider>
        <WishlistProvider>
          <ComparisonProvider>
            <div className={`${plusJakartaSans.variable} ${syne.variable} font-sans antialiased`}>
              {children}
            </div>
          </ComparisonProvider>
        </WishlistProvider>
      </CartProvider>
    </NextIntlClientProvider>
  )
}
