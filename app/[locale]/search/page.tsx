import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, SlidersHorizontal, X } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { search, allCategories, POPULAR_SEARCHES } from "@/lib/search-data"
import { SearchInput } from "./_components/search-input"
import { SortSelect } from "./_components/sort-select"

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
    category?: string
    brand?: string
    sort?: string
  }>
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q: query = "" } = await searchParams
  return {
    title: query ? `"${query}" — Search Results | SevenFive` : "Search | SevenFive",
    description: query
      ? `Search results for "${query}" — commercial kitchen equipment from SevenFive`
      : "Search our full catalog of commercial kitchen equipment",
  }
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
  }).format(price)

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query = "", category, brand, sort } = await searchParams

  const results = query.trim()
    ? search({
        query: query.trim(),
        category,
        brand,
        sort: sort as "relevance" | "price-asc" | "price-desc" | "rating" | "newest",
        limit: 30,
      })
    : { products: [], brands: [], categories: [], suggestions: POPULAR_SEARCHES, totalResults: 0 }

  const hasActiveFilters = !!(category || brand)

  // Build filter-clearing URLs
  const buildFilterUrl = (params: Record<string, string | undefined>) => {
    const p = new URLSearchParams()
    if (query) p.set("q", query)
    if (sort) p.set("sort", sort)
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined) p.set(k, v)
    })
    return `/search?${p.toString()}`
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Search Header */}
        <section className="bg-primary text-primary-foreground py-10">
          <div className="mx-auto max-w-7xl px-4">
            <nav className="text-primary-foreground/60 mb-4 flex items-center gap-2 text-sm">
              <Link href="/" className="hover:text-primary-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary-foreground">Search</span>
            </nav>
            <SearchInput initialQuery={query} />
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-8">
          {/* Results summary + Sort */}
          {query && (
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-muted-foreground text-sm">
                  {results.totalResults > 0 ? (
                    <>
                      <span className="text-foreground font-semibold">
                        {results.products.length}
                      </span>{" "}
                      product{results.products.length !== 1 ? "s" : ""} found for{" "}
                      <span className="text-foreground font-semibold">&ldquo;{query}&rdquo;</span>
                    </>
                  ) : (
                    <>
                      No results for{" "}
                      <span className="text-foreground font-semibold">&ldquo;{query}&rdquo;</span>
                    </>
                  )}
                </p>
                {/* Active filter chips */}
                {hasActiveFilters && (
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-muted-foreground text-xs">Filters:</span>
                    {category && (
                      <Badge variant="secondary" className="gap-1 py-0.5 pr-1 pl-2">
                        {category}
                        <Link
                          href={buildFilterUrl({ category: undefined })}
                          className="hover:bg-muted-foreground/20 ml-1 rounded"
                        >
                          <X className="h-3 w-3" />
                        </Link>
                      </Badge>
                    )}
                    {brand && (
                      <Badge variant="secondary" className="gap-1 py-0.5 pr-1 pl-2">
                        {brand}
                        <Link
                          href={buildFilterUrl({ brand: undefined })}
                          className="hover:bg-muted-foreground/20 ml-1 rounded"
                        >
                          <X className="h-3 w-3" />
                        </Link>
                      </Badge>
                    )}
                    <Link
                      href={`/search?q=${encodeURIComponent(query)}`}
                      className="text-muted-foreground hover:text-foreground text-xs underline underline-offset-2 transition-colors"
                    >
                      Clear all
                    </Link>
                  </div>
                )}
              </div>
              <SortSelect
                currentSort={sort || "relevance"}
                query={query}
                category={category}
                brand={brand}
              />
            </div>
          )}

          {/* No query — show popular */}
          {!query && (
            <div className="py-12 text-center">
              <h2 className="font-display text-foreground text-2xl font-bold">
                What are you looking for?
              </h2>
              <p className="text-muted-foreground mt-2">Search by product, brand, or category</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {POPULAR_SEARCHES.map((term) => (
                  <Link
                    key={term}
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="border-border bg-card text-foreground hover:border-foreground rounded-full border px-5 py-2.5 text-sm font-medium shadow-sm transition-colors"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Results layout */}
          {query && results.totalResults > 0 && (
            <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
              {/* Filter sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-6">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="text-muted-foreground h-4 w-4" />
                    <span className="text-foreground text-sm font-semibold">Filters</span>
                  </div>

                  {/* Categories filter */}
                  {results.categories.length > 0 && (
                    <div>
                      <h3 className="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase">
                        Category
                      </h3>
                      <ul className="space-y-1">
                        <li>
                          <Link
                            href={buildFilterUrl({ category: undefined })}
                            className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                              !category
                                ? "bg-primary text-primary-foreground font-medium"
                                : "text-foreground hover:bg-secondary"
                            }`}
                          >
                            All Categories
                            <span className="ml-2 text-xs opacity-60">
                              ({results.products.length})
                            </span>
                          </Link>
                        </li>
                        {results.categories.map((cat) => (
                          <li key={cat.id}>
                            <Link
                              href={buildFilterUrl({ category: cat.name })}
                              className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                                category === cat.name
                                  ? "bg-primary text-primary-foreground font-medium"
                                  : "text-foreground hover:bg-secondary"
                              }`}
                            >
                              {cat.name}
                              <span className="ml-2 text-xs opacity-60">({cat.productCount})</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Brands filter */}
                  {results.brands.length > 0 && (
                    <div>
                      <h3 className="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase">
                        Brand
                      </h3>
                      <ul className="space-y-1">
                        <li>
                          <Link
                            href={buildFilterUrl({ brand: undefined })}
                            className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                              !brand
                                ? "bg-primary text-primary-foreground font-medium"
                                : "text-foreground hover:bg-secondary"
                            }`}
                          >
                            All Brands
                          </Link>
                        </li>
                        {results.brands.map((b) => (
                          <li key={b.id}>
                            <Link
                              href={buildFilterUrl({ brand: b.name })}
                              className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                                brand === b.name
                                  ? "bg-primary text-primary-foreground font-medium"
                                  : "text-foreground hover:bg-secondary"
                              }`}
                            >
                              {b.name}
                              <span className="ml-2 text-xs opacity-60">({b.productCount})</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* All categories from catalog */}
                  {results.categories.length === 0 && (
                    <div>
                      <h3 className="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase">
                        Browse Categories
                      </h3>
                      <ul className="space-y-1">
                        {allCategories.slice(0, 6).map((cat) => (
                          <li key={cat.id}>
                            <Link
                              href={buildFilterUrl({ category: cat.name })}
                              className="text-foreground hover:bg-secondary block rounded-md px-3 py-2 text-sm transition-colors"
                            >
                              {cat.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </aside>

              {/* Products grid */}
              <div>
                {results.products.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {results.products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        className="group border-border bg-card hover:border-foreground/30 rounded-xl border p-4 shadow-sm transition-all hover:shadow-md"
                      >
                        <div className="bg-muted relative aspect-square w-full overflow-hidden rounded-lg">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          {product.originalPrice && (
                            <span className="bg-accent text-accent-foreground absolute top-2 left-2 rounded-full px-2 py-0.5 text-xs font-semibold">
                              -
                              {Math.round(
                                ((product.originalPrice - product.price) / product.originalPrice) *
                                  100
                              )}
                              %
                            </span>
                          )}
                        </div>
                        <div className="mt-3">
                          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                            {product.brand}
                          </p>
                          <h3 className="text-foreground group-hover:text-accent mt-1 line-clamp-2 text-sm font-semibold transition-colors">
                            {product.name}
                          </h3>
                          <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-foreground text-base font-bold">
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-muted-foreground text-xs line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                          <div className="mt-1 flex items-center gap-1">
                            <span className="text-muted-foreground text-xs">
                              ★ {product.rating} ({product.reviewCount})
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center">
                    <p className="text-muted-foreground">No products match the selected filters.</p>
                    <Link
                      href={`/search?q=${encodeURIComponent(query)}`}
                      className="text-foreground hover:text-accent mt-4 inline-block text-sm underline underline-offset-2 transition-colors"
                    >
                      Clear filters
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* No results */}
          {query && results.totalResults === 0 && (
            <div className="py-16 text-center">
              <p className="text-4xl">🔍</p>
              <h2 className="font-display text-foreground mt-4 text-xl font-bold">
                No results found
              </h2>
              <p className="text-muted-foreground mx-auto mt-2 max-w-md">
                We couldn&apos;t find anything for &ldquo;{query}&rdquo;. Try a different keyword or
                browse by category.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {POPULAR_SEARCHES.map((term) => (
                  <Link
                    key={term}
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="border-border bg-card text-foreground hover:border-foreground rounded-full border px-4 py-2 text-sm transition-colors"
                  >
                    {term}
                  </Link>
                ))}
              </div>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/category">Browse All Products</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
