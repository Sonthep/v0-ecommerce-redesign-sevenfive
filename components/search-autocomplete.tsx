"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, X, Loader2, ArrowRight, Tag, Building2, Grid3X3 } from "lucide-react"
import { cn } from "@/lib/utils"
import useSWR from "swr"

interface Product {
  id: string
  type: "product"
  name: string
  brand: string
  category: string
  subcategory: string
  price: number
  image: string
  slug: string
}

interface Brand {
  id: string
  type: "brand"
  name: string
  slug: string
  productCount: number
}

interface Category {
  id: string
  type: "category"
  name: string
  slug: string
  productCount: number
}

interface SearchResults {
  products: Product[]
  brands: Brand[]
  categories: Category[]
  suggestions: string[]
  totalResults: number
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface SearchAutocompleteProps {
  onClose?: () => void
  autoFocus?: boolean
  className?: string
}

export function SearchAutocomplete({ onClose, autoFocus = true, className }: SearchAutocompleteProps) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(-1)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const debouncedQuery = useDebounce(query, 200)

  const { data, isLoading } = useSWR<SearchResults>(
    debouncedQuery.length >= 2 ? `/api/search?q=${encodeURIComponent(debouncedQuery)}` : null,
    fetcher,
    { keepPreviousData: true }
  )

  const hasResults = data && (data.products.length > 0 || data.brands.length > 0 || data.categories.length > 0)
  const showDropdown = isOpen && query.length >= 2

  // Build flat list for keyboard navigation
  const allItems = React.useMemo(() => {
    if (!data) return []
    return [
      ...data.categories.map((c) => ({ ...c, itemType: "category" as const })),
      ...data.brands.map((b) => ({ ...b, itemType: "brand" as const })),
      ...data.products.map((p) => ({ ...p, itemType: "product" as const })),
    ]
  }, [data])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < allItems.length - 1 ? prev + 1 : 0))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : allItems.length - 1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && allItems[selectedIndex]) {
          const item = allItems[selectedIndex]
          navigateToItem(item)
        } else if (query) {
          navigateToSearch(query)
        }
        break
      case "Escape":
        e.preventDefault()
        setIsOpen(false)
        onClose?.()
        break
    }
  }

  const navigateToItem = (item: (typeof allItems)[0]) => {
    setIsOpen(false)
    setQuery("")
    onClose?.()
    
    if (item.itemType === "product") {
      router.push(`/product/${item.slug}`)
    } else if (item.itemType === "brand") {
      router.push(`/brands/${item.slug}`)
    } else if (item.itemType === "category") {
      router.push(`/category/${item.slug}`)
    }
  }

  const navigateToSearch = (searchQuery: string) => {
    setIsOpen(false)
    setQuery("")
    onClose?.()
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  // Close on click outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Auto focus
  React.useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  // Reset selection when results change
  React.useEffect(() => {
    setSelectedIndex(-1)
  }, [data])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search products, brands, categories..."
          className="w-full rounded-lg border border-border bg-input py-3 pl-12 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Search"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          autoComplete="off"
        />
        {isLoading && (
          <Loader2 className="absolute right-12 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-muted-foreground" />
        )}
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("")
              inputRef.current?.focus()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {showDropdown && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-lg border border-border bg-card shadow-xl">
          {!hasResults && !isLoading && (
            <div className="p-6 text-center">
              <p className="text-muted-foreground">No results found for &quot;{query}&quot;</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try searching for products, brands, or categories
              </p>
            </div>
          )}

          {hasResults && (
            <div className="divide-y divide-border">
              {/* Categories */}
              {data.categories.length > 0 && (
                <div className="p-2">
                  <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Categories
                  </p>
                  <ul role="listbox">
                    {data.categories.map((category, index) => {
                      const itemIndex = index
                      return (
                        <li key={category.id} role="option" aria-selected={selectedIndex === itemIndex}>
                          <Link
                            href={`/category/${category.slug}`}
                            onClick={() => {
                              setIsOpen(false)
                              setQuery("")
                              onClose?.()
                            }}
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                              selectedIndex === itemIndex
                                ? "bg-secondary text-foreground"
                                : "hover:bg-secondary/50"
                            )}
                          >
                            <div className="flex h-8 w-8 items-center justify-center rounded bg-muted">
                              <Grid3X3 className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground truncate">{category.name}</p>
                              <p className="text-sm text-muted-foreground">{category.productCount} products</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              {/* Brands */}
              {data.brands.length > 0 && (
                <div className="p-2">
                  <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Brands
                  </p>
                  <ul role="listbox">
                    {data.brands.map((brand, index) => {
                      const itemIndex = data.categories.length + index
                      return (
                        <li key={brand.id} role="option" aria-selected={selectedIndex === itemIndex}>
                          <Link
                            href={`/brands/${brand.slug}`}
                            onClick={() => {
                              setIsOpen(false)
                              setQuery("")
                              onClose?.()
                            }}
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                              selectedIndex === itemIndex
                                ? "bg-secondary text-foreground"
                                : "hover:bg-secondary/50"
                            )}
                          >
                            <div className="flex h-8 w-8 items-center justify-center rounded bg-muted">
                              <Building2 className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground truncate">{brand.name}</p>
                              <p className="text-sm text-muted-foreground">{brand.productCount} products</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              {/* Products */}
              {data.products.length > 0 && (
                <div className="p-2">
                  <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Products
                  </p>
                  <ul role="listbox">
                    {data.products.map((product, index) => {
                      const itemIndex = data.categories.length + data.brands.length + index
                      return (
                        <li key={product.id} role="option" aria-selected={selectedIndex === itemIndex}>
                          <Link
                            href={`/product/${product.slug}`}
                            onClick={() => {
                              setIsOpen(false)
                              setQuery("")
                              onClose?.()
                            }}
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                              selectedIndex === itemIndex
                                ? "bg-secondary text-foreground"
                                : "hover:bg-secondary/50"
                            )}
                          >
                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-muted">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground truncate">{product.name}</p>
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-muted-foreground">{product.brand}</span>
                                <span className="text-muted-foreground/50">•</span>
                                <span className="text-accent font-medium">{formatPrice(product.price)}</span>
                              </div>
                            </div>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              {/* View All Results */}
              <div className="p-2">
                <button
                  onClick={() => navigateToSearch(query)}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-secondary px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors"
                >
                  <Search className="h-4 w-4" />
                  View all results for &quot;{query}&quot;
                </button>
              </div>
            </div>
          )}

          {/* Popular Searches (when no query) */}
          {!hasResults && !isLoading && query.length >= 2 && data?.suggestions && data.suggestions.length > 0 && (
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Suggestions
              </p>
              <div className="flex flex-wrap gap-2">
                {data.suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setQuery(suggestion)
                    }}
                    className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-sm text-secondary-foreground hover:bg-muted transition-colors"
                  >
                    <Tag className="h-3 w-3" />
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
