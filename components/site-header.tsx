"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Search, ShoppingCart, User, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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

  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground">
      {/* Top bar */}
      <div className="border-b border-sidebar-border">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 text-xs">
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline">365 Days After-Sales Service</span>
            <span className="hidden md:inline">Free Delivery on Orders Over 5,000 THB</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-accent transition-colors">
              Contact Us
            </Link>
            <span className="text-sidebar-border">|</span>
            <Link href="/about" className="hover:text-accent transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight">SEVENFIVE</span>
            <span className="text-[10px] tracking-[0.2em] text-primary-foreground/60">KITCHEN EQUIPMENT</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {categories.map((category) => (
            <div
              key={category.name}
              className="relative"
              onMouseEnter={() => setActiveMegaMenu(category.name)}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link
                href={category.href}
                className={cn(
                  "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors hover:text-accent",
                  activeMegaMenu === category.name && "text-accent"
                )}
              >
                {category.name}
                <ChevronDown className={cn(
                  "h-3 w-3 transition-transform",
                  activeMegaMenu === category.name && "rotate-180"
                )} />
              </Link>
            </div>
          ))}
          <Link
            href="/brands"
            className="px-4 py-2 text-sm font-medium transition-colors hover:text-accent"
          >
            Brands
          </Link>
          <Link
            href="/solutions"
            className="px-4 py-2 text-sm font-medium transition-colors hover:text-accent"
          >
            Solutions
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
            className="hidden sm:flex text-primary-foreground hover:bg-sidebar-accent hover:text-primary-foreground"
            asChild
          >
            <Link href="/account">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative text-primary-foreground hover:bg-sidebar-accent hover:text-primary-foreground"
            asChild
          >
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
                0
              </span>
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-primary-foreground hover:bg-sidebar-accent hover:text-primary-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="absolute inset-x-0 top-full bg-card border-b border-border shadow-lg">
          <div className="mx-auto max-w-3xl p-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search products, brands, categories..."
                className="w-full rounded-lg border border-border bg-input py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                autoFocus
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {["Combi Oven", "Ice Machine", "Coffee Machine", "Walk-in Cooler"].map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground hover:bg-muted transition-colors"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mega Menu */}
      {activeMegaMenu && (
        <div
          className="absolute inset-x-0 top-full bg-card border-b border-border shadow-lg"
          onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
          onMouseLeave={() => setActiveMegaMenu(null)}
        >
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="grid grid-cols-4 gap-8">
              <div className="col-span-1">
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  {activeMegaMenu}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Browse our extensive selection of professional-grade equipment designed for commercial kitchens.
                </p>
                <Link
                  href={categories.find(c => c.name === activeMegaMenu)?.href || "#"}
                  className="mt-4 inline-flex items-center text-sm font-medium text-foreground hover:text-accent transition-colors"
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
                      href={sub.href}
                      className="group rounded-lg border border-border p-4 transition-all hover:border-foreground hover:shadow-sm"
                    >
                      <h4 className="font-medium text-foreground group-hover:text-accent transition-colors">
                        {sub.name}
                      </h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Shop now
                      </p>
                    </Link>
                  ))}
              </div>
              <div className="col-span-1 rounded-lg bg-secondary p-4">
                <h4 className="font-medium text-foreground">Featured Brand</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Discover top-quality equipment from industry-leading manufacturers.
                </p>
                <Link
                  href="/brands"
                  className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Explore Brands
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute inset-x-0 top-full bg-card border-b border-border shadow-lg max-h-[80vh] overflow-y-auto">
          <nav className="divide-y divide-border">
            {categories.map((category) => (
              <div key={category.name} className="p-4">
                <Link
                  href={category.href}
                  className="block font-medium text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
                <div className="mt-2 grid gap-2 pl-4">
                  {category.subcategories.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
                href="/brands"
                className="block font-medium text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Brands
              </Link>
            </div>
            <div className="p-4">
              <Link
                href="/solutions"
                className="block font-medium text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Solutions
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
