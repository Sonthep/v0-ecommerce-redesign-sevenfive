"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Search,
  X,
  Loader2,
  ArrowRight,
  Tag,
  Building2,
  Grid3X3,
  Clock,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { POPULAR_SEARCHES } from "@/lib/search-data"
import type { SearchResults } from "@/lib/search-data"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const MAX_RECENT = 5
const RECENT_KEY = "sf_recent_searches"

function getRecentSearches(): string[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]")
  } catch {
    return []
  }
}

function addRecentSearch(query: string) {
  const prev = getRecentSearches().filter((s) => s.toLowerCase() !== query.toLowerCase())
  const next = [query, ...prev].slice(0, MAX_RECENT)
  localStorage.setItem(RECENT_KEY, JSON.stringify(next))
}

function removeRecentSearch(query: string) {
  const next = getRecentSearches().filter((s) => s !== query)
  localStorage.setItem(RECENT_KEY, JSON.stringify(next))
}

/** Wraps matched text in <mark> tags for highlighting */
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"))
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-accent/20 text-accent rounded-sm font-semibold not-italic">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  )
}

interface SearchAutocompleteProps {
  onClose?: () => void
  autoFocus?: boolean
  className?: string
}

export function SearchAutocomplete({
  onClose,
  autoFocus = true,
  className,
}: SearchAutocompleteProps) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(-1)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [recentSearches, setRecentSearches] = React.useState<string[]>([])

  // Load recent searches on mount (client only)
  React.useEffect(() => {
    setRecentSearches(getRecentSearches())
  }, [])

  const debouncedQuery = useDebounce(query, 200)

  const { data, isLoading } = useSWR<SearchResults>(
    debouncedQuery.length >= 2 ? `/api/search?q=${encodeURIComponent(debouncedQuery)}` : null,
    fetcher,
    { keepPreviousData: true }
  )

  const hasResults =
    data && (data.products.length > 0 || data.brands.length > 0 || data.categories.length > 0)
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
    addRecentSearch(item.name)
    setRecentSearches(getRecentSearches())
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
    addRecentSearch(searchQuery)
    setRecentSearches(getRecentSearches())
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
        <Search className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
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
          className="border-border bg-input text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-lg border py-3 pr-12 pl-12 focus:ring-2 focus:outline-none"
          aria-label="Search"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          autoComplete="off"
        />
        {isLoading && (
          <Loader2 className="text-muted-foreground absolute top-1/2 right-12 h-5 w-5 -translate-y-1/2 animate-spin" />
        )}
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("")
              inputRef.current?.focus()
            }}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-4 -translate-y-1/2 rounded p-1 transition-colors"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </button>
        )}
      </div>

      {/* Dropdown - Recent/Trending (no query yet) */}
      {isOpen && !query && (recentSearches.length > 0 || POPULAR_SEARCHES.length > 0) && (
        <div className="border-border bg-card absolute inset-x-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-lg border shadow-xl">
          {recentSearches.length > 0 && (
            <div className="p-3">
              <div className="mb-1 flex items-center justify-between px-2">
                <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                  Recent
                </p>
                <button
                  onClick={() => {
                    localStorage.removeItem(RECENT_KEY)
                    setRecentSearches([])
                  }}
                  className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                >
                  Clear all
                </button>
              </div>
              <ul>
                {recentSearches.map((term) => (
                  <li key={term} className="group flex items-center gap-2">
                    <button
                      className="hover:bg-secondary/50 flex flex-1 items-center gap-3 rounded-md px-2 py-2 text-left text-sm transition-colors"
                      onClick={() => {
                        setQuery(term)
                        setIsOpen(true)
                      }}
                    >
                      <Clock className="text-muted-foreground h-4 w-4 shrink-0" />
                      <span className="text-foreground">{term}</span>
                    </button>
                    <button
                      className="text-muted-foreground hover:text-foreground mr-2 hidden rounded p-1 group-hover:block"
                      onClick={() => {
                        removeRecentSearch(term)
                        setRecentSearches(getRecentSearches())
                      }}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="border-border border-t p-3">
            <p className="text-muted-foreground mb-2 px-2 text-xs font-semibold tracking-wider uppercase">
              Trending
            </p>
            <div className="flex flex-wrap gap-2 px-2">
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setQuery(term)
                    setIsOpen(true)
                    inputRef.current?.focus()
                  }}
                  className="bg-secondary text-secondary-foreground hover:bg-muted inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors"
                >
                  <TrendingUp className="h-3 w-3" />
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Dropdown - Search Results */}
      {showDropdown && (
        <div className="border-border bg-card absolute inset-x-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-lg border shadow-xl">
          {!hasResults && !isLoading && (
            <div className="p-6 text-center">
              <p className="text-muted-foreground">No results found for &quot;{query}&quot;</p>
              <p className="text-muted-foreground mt-2 text-sm">
                Try searching for products, brands, or categories
              </p>
            </div>
          )}

          {hasResults && (
            <div className="divide-border divide-y">
              {/* Categories */}
              {data.categories.length > 0 && (
                <div className="p-2">
                  <p className="text-muted-foreground px-3 py-2 text-xs font-semibold tracking-wider uppercase">
                    Categories
                  </p>
                  <ul role="listbox">
                    {data.categories.map((category, index) => {
                      const itemIndex = index
                      return (
                        <li
                          key={category.id}
                          role="option"
                          aria-selected={selectedIndex === itemIndex}
                        >
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
                            <div className="bg-muted flex h-8 w-8 items-center justify-center rounded">
                              <Grid3X3 className="text-muted-foreground h-4 w-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-foreground truncate font-medium">
                                <Highlight text={category.name} query={query} />
                              </p>
                              <p className="text-muted-foreground text-sm">
                                {category.productCount} products
                              </p>
                            </div>
                            <ArrowRight className="text-muted-foreground h-4 w-4" />
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
                  <p className="text-muted-foreground px-3 py-2 text-xs font-semibold tracking-wider uppercase">
                    Brands
                  </p>
                  <ul role="listbox">
                    {data.brands.map((brand, index) => {
                      const itemIndex = data.categories.length + index
                      return (
                        <li
                          key={brand.id}
                          role="option"
                          aria-selected={selectedIndex === itemIndex}
                        >
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
                            <div className="bg-muted flex h-8 w-8 items-center justify-center rounded">
                              <Building2 className="text-muted-foreground h-4 w-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-foreground truncate font-medium">
                                <Highlight text={brand.name} query={query} />
                              </p>
                              <p className="text-muted-foreground text-sm">
                                {brand.productCount} products
                              </p>
                            </div>
                            <ArrowRight className="text-muted-foreground h-4 w-4" />
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
                  <p className="text-muted-foreground px-3 py-2 text-xs font-semibold tracking-wider uppercase">
                    Products
                  </p>
                  <ul role="listbox">
                    {data.products.map((product, index) => {
                      const itemIndex = data.categories.length + data.brands.length + index
                      return (
                        <li
                          key={product.id}
                          role="option"
                          aria-selected={selectedIndex === itemIndex}
                        >
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
                            <div className="bg-muted relative h-12 w-12 shrink-0 overflow-hidden rounded">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-foreground truncate font-medium">
                                <Highlight text={product.name} query={query} />
                              </p>
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-muted-foreground">
                                  <Highlight text={product.brand} query={query} />
                                </span>
                                <span className="text-muted-foreground/50">•</span>
                                <span className="text-accent font-medium">
                                  {formatPrice(product.price)}
                                </span>
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
                  className="bg-secondary text-foreground hover:bg-secondary/80 flex w-full items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-medium transition-colors"
                >
                  <Search className="h-4 w-4" />
                  View all results for &quot;{query}&quot;
                </button>
              </div>
            </div>
          )}

          {/* Popular Searches (when no query) */}
          {!hasResults &&
            !isLoading &&
            query.length >= 2 &&
            data?.suggestions &&
            data.suggestions.length > 0 && (
              <div className="p-4">
                <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
                  Suggestions
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setQuery(suggestion)
                      }}
                      className="bg-secondary text-secondary-foreground hover:bg-muted inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors"
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
