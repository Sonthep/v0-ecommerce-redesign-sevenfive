"use client"

import { useLocale } from "next-intl"
import { useRouter, usePathname } from "@/lib/navigation"
import { cn } from "@/lib/utils"

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="flex items-center gap-0.5 text-xs font-medium">
      <button
        onClick={() => switchLocale("en")}
        className={cn(
          "rounded px-1.5 py-0.5 transition-colors",
          locale === "en"
            ? "text-primary-foreground font-bold underline underline-offset-2"
            : "text-primary-foreground/60 hover:text-primary-foreground"
        )}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-primary-foreground/40">|</span>
      <button
        onClick={() => switchLocale("th")}
        className={cn(
          "rounded px-1.5 py-0.5 transition-colors",
          locale === "th"
            ? "text-primary-foreground font-bold underline underline-offset-2"
            : "text-primary-foreground/60 hover:text-primary-foreground"
        )}
        aria-label="เปลี่ยนเป็นภาษาไทย"
      >
        TH
      </button>
    </div>
  )
}
