"use client"

import * as React from "react"
import { Grid3X3, List, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { cn } from "@/lib/utils"

interface FilterOption {
  value: string
  label: string
  count: number
}

interface Filter {
  name: string
  options: FilterOption[]
}

interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  slug: string
  category: string
  isBestSeller?: boolean
  isNew?: boolean
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "best-selling", label: "Best Selling" },
]

interface CategoryProductsClientProps {
  filters: Filter[]
  products: Product[]
}

export function CategoryProductsClient({ filters, products }: CategoryProductsClientProps) {
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
    <div className="lg:grid lg:grid-cols-4 lg:gap-8">
      {/* Desktop Filters */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <h2 className="text-foreground mb-6 text-lg font-semibold">Filters</h2>
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
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>

            <span className="text-muted-foreground text-sm">{products.length} products</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground hidden text-sm sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-border bg-background text-foreground focus:ring-ring rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="border-border hidden items-center gap-1 rounded-md border p-1 sm:flex">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "rounded p-1.5 transition-colors",
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
                  "rounded p-1.5 transition-colors",
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
            viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
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
            <Button key={page} variant={page === 1 ? "default" : "outline"} size="icon">
              {page}
            </Button>
          ))}
          <Button variant="outline">Next</Button>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="bg-card absolute inset-y-0 left-0 w-full max-w-xs shadow-xl">
            <div className="border-border flex items-center justify-between border-b p-4">
              <h2 className="text-foreground text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="h-[calc(100%-73px)] overflow-y-auto p-4">
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
    </div>
  )
}
