"use client"

import { useRouter } from "next/navigation"

interface SortSelectProps {
  currentSort: string
  query: string
  category?: string
  brand?: string
}

const SORT_OPTIONS = [
  { value: "relevance", label: "Most Relevant" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
]

export function SortSelect({ currentSort, query, category, brand }: SortSelectProps) {
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams()
    if (query) params.set("q", query)
    if (category) params.set("category", category)
    if (brand) params.set("brand", brand)
    params.set("sort", e.target.value)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-select" className="text-muted-foreground text-sm whitespace-nowrap">
        Sort by
      </label>
      <select
        id="sort-select"
        value={currentSort}
        onChange={handleChange}
        className="border-border bg-card text-foreground focus:ring-ring rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
