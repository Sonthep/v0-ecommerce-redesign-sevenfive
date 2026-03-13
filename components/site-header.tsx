"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Search, ShoppingCart, User, X, ChevronDown } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SearchAutocomplete } from "@/components/search-autocomplete"
import { LanguageSwitcher } from "@/components/language-switcher"

const categories = [
  {
    name: "Cooking Equipment",
    href: "/category/cooking-equipment",
    subcategories: [
      { name: "Ranges & Ovens", href: "/category/cooking-equipment/ranges-ovens" },
      { name: "Fryers", href: "/category/cooking-equipment/fryers" },
      { name: "Grills & Griddles", href: "/category/cooking-equipment/grills-griddles" },
      { name: "Steamers", href: "/category/cooking-equipment/steamers" },
      { name: "Combi Ovens", href: "/category/cooking-equipment/combi-ovens" },
    ],
  },
  {
    name: "Refrigeration",
    href: "/category/refrigeration",
    subcategories: [
      { name: "Walk-in Coolers", href: "/category/refrigeration/walk-in-coolers" },
      { name: "Reach-in Refrigerators", href: "/category/refrigeration/reach-in-refrigerators" },
      { name: "Prep Tables", href: "/category/refrigeration/prep-tables" },
      { name: "Ice Machines", href: "/category/refrigeration/ice-machines" },
    ],
  },
  {
    name: "Food Preparation",
    href: "/category/food-preparation",
    subcategories: [
      { name: "Mixers", href: "/category/food-preparation/mixers" },
      { name: "Food Processors", href: "/category/food-preparation/food-processors" },
      { name: "Slicers", href: "/category/food-preparation/slicers" },
      { name: "Prep Tables", href: "/category/food-preparation/prep-tables" },
    ],
  },
  {
    name: "Beverage",
    href: "/category/beverage",
    subcategories: [
      { name: "Coffee Machines", href: "/category/beverage/coffee-machines" },
      { name: "Blenders", href: "/category/beverage/blenders" },
      { name: "Juice Dispensers", href: "/category/beverage/juice-dispensers" },
      { name: "Ice Cream Machines", href: "/category/beverage/ice-cream-machines" },
    ],
  },
  {
    name: "Warewashing",
    href: "/category/warewashing",
    subcategories: [
      { name: "Dishwashers", href: "/category/warewashing/dishwashers" },
      { name: "Glass Washers", href: "/category/warewashing/glass-washers" },
      { name: "Sinks", href: "/category/warewashing/sinks" },
    ],
  },
]

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = React.useState<string | null>(null)
  const [searchOpen, setSearchOpen] = React.useState(false)
  const t = useTranslations("header")
  const tNav = useTranslations("nav")
  const locale = useLocale()

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="border-sidebar-border border-b">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 text-xs">
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline">{t("afterSales")}</span>
            <span className="hidden md:inline">{t("freeDelivery")}</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <span className="text-sidebar-border">|</span>
            <Link href={`/${locale}/contact`} className="hover:text-accent transition-colors">
              {t("contact")}
            </Link>
            <span className="text-sidebar-border">|</span>
            <Link href={`/${locale}/about`} className="hover:text-accent transition-colors">
              {t("about")}
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight">SEVENFIVE</span>
            <span className="text-primary-foreground/60 text-[10px] tracking-[0.2em]">
              KITCHEN EQUIPMENT
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {categories.map((category) => (
            <div
              key={category.name}
              className="relative"
              onMouseEnter={() => setActiveMegaMenu(category.name)}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link
                href={`/${locale}${category.href}`}
                className={cn(
                  "hover:text-accent flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors",
                  activeMegaMenu === category.name && "text-accent"
                )}
              >
                {category.name}
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform",
                    activeMegaMenu === category.name && "rotate-180"
                  )}
                />
              </Link>
            </div>
          ))}
          <Link
            href={`/${locale}/brands`}
            className="hover:text-accent px-4 py-2 text-sm font-medium transition-colors"
          >
            {tNav("brands")}
          </Link>
          <Link
            href={`/${locale}/solutions`}
            className="hover:text-accent px-4 py-2 text-sm font-medium transition-colors"
          >
            {tNav("solutions")}
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-sidebar-accent hover:text-primary-foreground"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-sidebar-accent hover:text-primary-foreground hidden sm:flex"
            asChild
          >
            <Link href={`/${locale}/account`}>
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-sidebar-accent hover:text-primary-foreground relative"
            asChild
          >
            <Link href={`/${locale}/cart`}>
              <ShoppingCart className="h-5 w-5" />
              <span className="bg-accent text-accent-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-medium">
                0
              </span>
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-sidebar-accent hover:text-primary-foreground lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="bg-card border-border absolute inset-x-0 top-full z-50 border-b shadow-xl">
          <div className="mx-auto max-w-3xl px-4 py-4">
            <div className="flex items-center gap-3">
              <SearchAutocomplete
                onClose={() => setSearchOpen(false)}
                autoFocus
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-secondary shrink-0"
                onClick={() => setSearchOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mega Menu */}
      {activeMegaMenu && (
        <div
          className="bg-card border-border absolute inset-x-0 top-full border-b shadow-lg"
          onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
          onMouseLeave={() => setActiveMegaMenu(null)}
        >
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="grid grid-cols-4 gap-8">
              <div className="col-span-1">
                <h3 className="text-foreground mb-4 text-lg font-semibold">{activeMegaMenu}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t("megaMenuDesc")}</p>
                <Link
                  href={`/${locale}${categories.find((c) => c.name === activeMegaMenu)?.href || ""}`}
                  className="text-foreground hover:text-accent mt-4 inline-flex items-center text-sm font-medium transition-colors"
                >
                  View All
                  <ChevronDown className="ml-1 h-4 w-4 -rotate-90" />
                </Link>
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                {categories
                  .find((c) => c.name === activeMegaMenu)
                  ?.subcategories.map((sub) => (
                    <Link
                      key={sub.name}
                      href={`/${locale}${sub.href}`}
                      className="group border-border hover:border-foreground rounded-lg border p-4 transition-all hover:shadow-sm"
                    >
                      <h4 className="text-foreground group-hover:text-accent font-medium transition-colors">
                        {sub.name}
                      </h4>
                      <p className="text-muted-foreground mt-1 text-sm">Shop now</p>
                    </Link>
                  ))}
              </div>
              <div className="bg-secondary col-span-1 rounded-lg p-4">
                <h4 className="text-foreground font-medium">{t("featuredBrand")}</h4>
                <p className="text-muted-foreground mt-2 text-sm">{t("featuredBrandDesc")}</p>
                <Link
                  href={`/${locale}/brands`}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 inline-block rounded-md px-4 py-2 text-sm font-medium transition-colors"
                >
                  {t("exploreBrands")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="bg-card border-border absolute inset-x-0 top-full max-h-[80vh] overflow-y-auto border-b shadow-lg lg:hidden">
          <nav className="divide-border divide-y">
            {categories.map((category) => (
              <div key={category.name} className="p-4">
                <Link
                  href={`/${locale}${category.href}`}
                  className="text-foreground block font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
                <div className="mt-2 grid gap-2 pl-4">
                  {category.subcategories.map((sub) => (
                    <Link
                      key={sub.name}
                      href={`/${locale}${sub.href}`}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="p-4">
              <Link
                href={`/${locale}/brands`}
                className="text-foreground block font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {tNav("brands")}
              </Link>
            </div>
            <div className="p-4">
              <Link
                href={`/${locale}/solutions`}
                className="text-foreground block font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {tNav("solutions")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
