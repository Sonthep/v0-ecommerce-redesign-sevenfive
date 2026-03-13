"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Grid3X3, List, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { cn } from "@/lib/utils"

// Mock data - in production this would come from an API/database
const categoryData = {
  name: "Cooking Equipment",
  description: "Professional cooking equipment for commercial kitchens. From ranges and ovens to fryers and steamers, we have everything you need.",
  image: "/images/categories/cooking.jpg",
  subcategories: [
    { name: "Ranges & Ovens", slug: "ranges-ovens", count: 156 },
    { name: "Fryers", slug: "fryers", count: 89 },
    { name: "Grills & Griddles", slug: "grills-griddles", count: 67 },
    { name: "Steamers", slug: "steamers", count: 45 },
    { name: "Combi Ovens", slug: "combi-ovens", count: 34 },
    { name: "Woks & Ranges", slug: "woks-ranges", count: 28 },
  ],
}

const filters = [
  {
    name: "Brand",
    options: [
      { value: "rational", label: "Rational", count: 45 },
      { value: "electrolux", label: "Electrolux", count: 38 },
      { value: "garland", label: "Garland", count: 32 },
      { value: "blodgett", label: "Blodgett", count: 28 },
      { value: "vulcan", label: "Vulcan", count: 24 },
    ],
  },
  {
    name: "Type",
    options: [
      { value: "electric", label: "Electric", count: 89 },
      { value: "gas", label: "Gas", count: 67 },
      { value: "induction", label: "Induction", count: 34 },
    ],
  },
  {
    name: "Capacity",
    options: [
      { value: "small", label: "Small (1-5 GN)", count: 45 },
      { value: "medium", label: "Medium (6-10 GN)", count: 67 },
      { value: "large", label: "Large (10+ GN)", count: 28 },
    ],
  },
]

const products = [
  {
    id: "1",
    name: "Rational iCombi Pro 10-1/1 Electric Combi Oven",
    brand: "Rational",
    price: 485000,
    originalPrice: 520000,
    image: "/images/products/combi-oven.jpg",
    slug: "rational-icombi-pro-10-1-1",
    category: "Cooking Equipment",
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Electrolux 900XP Gas Range 6-Burner with Oven",
    brand: "Electrolux",
    price: 245000,
    image: "/images/products/combi-oven.jpg",
    slug: "electrolux-900xp-gas-range",
    category: "Cooking Equipment",
    isNew: true,
  },
  {
    id: "3",
    name: "Garland US Range 36 Gas Griddle",
    brand: "Garland",
    price: 89000,
    image: "/images/products/combi-oven.jpg",
    slug: "garland-us-range-36-griddle",
    category: "Cooking Equipment",
  },
  {
    id: "4",
    name: "Blodgett Mark V Electric Convection Oven",
    brand: "Blodgett",
    price: 178000,
    originalPrice: 195000,
    image: "/images/products/combi-oven.jpg",
    slug: "blodgett-mark-v-convection",
    category: "Cooking Equipment",
  },
  {
    id: "5",
    name: "Vulcan 4-Burner Heavy Duty Gas Range",
    brand: "Vulcan",
    price: 125000,
    image: "/images/products/combi-oven.jpg",
    slug: "vulcan-4-burner-gas-range",
    category: "Cooking Equipment",
  },
  {
    id: "6",
    name: "Rational SelfCookingCenter 6-1/1 Electric",
    brand: "Rational",
    price: 395000,
    image: "/images/products/combi-oven.jpg",
    slug: "rational-scc-6-1-1",
    category: "Cooking Equipment",
    isBestSeller: true,
  },
  {
    id: "7",
    name: "Electrolux 700XP Electric Tilting Braising Pan",
    brand: "Electrolux",
    price: 285000,
    image: "/images/products/combi-oven.jpg",
    slug: "electrolux-700xp-braising-pan",
    category: "Cooking Equipment",
  },
  {
    id: "8",
    name: "Garland Commercial Deep Fryer 35lb",
    brand: "Garland",
    price: 68000,
    originalPrice: 75000,
    image: "/images/products/combi-oven.jpg",
    slug: "garland-deep-fryer-35lb",
    category: "Cooking Equipment",
    isNew: true,
  },
]

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "best-selling", label: "Best Selling" },
]

export default function CategoryPage() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = React.useState("featured")
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false)
  const [activeFilters, setActiveFilters] = React.useState<Record<string, string[]>>({})

  const handleFilterChange = (group: string, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[group] || []
      const newValues = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      
      if (newValues.length === 0) {
        const { [group]: _, ...rest } = prev
        return rest
      }
      
      return { ...prev, [group]: newValues }
    })
  }

  const handleClearFilters = () => {
    setActiveFilters({})
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Category Header */}
        <section className="relative h-64 md:h-80 overflow-hidden">
          <Image
            src={categoryData.image}
            alt={categoryData.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="mx-auto w-full max-w-7xl px-4 pb-8">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/category" className="hover:text-white transition-colors">
                  Categories
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">{categoryData.name}</span>
              </nav>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {categoryData.name}
              </h1>
              <p className="mt-2 text-white/80 max-w-2xl">
                {categoryData.description}
              </p>
            </div>
          </div>
        </section>

        {/* Subcategories */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-6">
            <div className="flex gap-3 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
              {categoryData.subcategories.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/category/cooking-equipment/${sub.slug}`}
                  className="flex-shrink-0 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:border-foreground hover:bg-secondary transition-colors"
                >
                  {sub.name}
                  <span className="ml-2 text-muted-foreground">({sub.count})</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-8">
          <div className="mx-auto max-w-7xl px-4">
            <div className="lg:grid lg:grid-cols-4 lg:gap-8">
              {/* Desktop Filters */}
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <h2 className="text-lg font-semibold text-foreground mb-6">Filters</h2>
                  <ProductFilters
                    filters={filters}
                    activeFilters={activeFilters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                  />
                </div>
              </aside>

              {/* Products */}
              <div className="lg:col-span-3">
                {/* Toolbar */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    {/* Mobile Filter Toggle */}
                    <Button
                      variant="outline"
                      className="lg:hidden"
                      onClick={() => setMobileFiltersOpen(true)}
                    >
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>

                    <span className="text-sm text-muted-foreground">
                      {products.length} products
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Sort */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground hidden sm:inline">
                        Sort by:
                      </span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        {sortOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* View Toggle */}
                    <div className="hidden sm:flex items-center gap-1 border border-border rounded-md p-1">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={cn(
                          "p-1.5 rounded transition-colors",
                          viewMode === "grid"
                            ? "bg-foreground text-background"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <Grid3X3 className="h-4 w-4" />
                        <span className="sr-only">Grid view</span>
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={cn(
                          "p-1.5 rounded transition-colors",
                          viewMode === "list"
                            ? "bg-foreground text-background"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <List className="h-4 w-4" />
                        <span className="sr-only">List view</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Grid */}
                <div
                  className={cn(
                    "grid gap-6",
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1"
                  )}
                >
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      variant={viewMode === "list" ? "compact" : "default"}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-12 flex items-center justify-center gap-2">
                  <Button variant="outline" disabled>
                    Previous
                  </Button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <Button
                      key={page}
                      variant={page === 1 ? "default" : "outline"}
                      size="icon"
                    >
                      {page}
                    </Button>
                  ))}
                  <Button variant="outline">Next</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Filters Drawer */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-full max-w-xs bg-card shadow-xl">
              <div className="flex items-center justify-between border-b border-border p-4">
                <h2 className="text-lg font-semibold text-foreground">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-4 overflow-y-auto h-[calc(100%-73px)]">
                <ProductFilters
                  filters={filters}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
