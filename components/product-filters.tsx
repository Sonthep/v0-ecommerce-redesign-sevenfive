"use client"

import * as React from "react"
import { ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FilterOption {
  value: string
  label: string
  count?: number
}

interface FilterGroup {
  name: string
  options: FilterOption[]
}

interface ProductFiltersProps {
  filters: FilterGroup[]
  activeFilters: Record<string, string[]>
  onFilterChange: (group: string, value: string) => void
  onClearFilters: () => void
}

export function ProductFilters({
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
}: ProductFiltersProps) {
  const [expandedGroups, setExpandedGroups] = React.useState<string[]>(
    filters.map((f) => f.name)
  )

  const totalActiveFilters = Object.values(activeFilters).flat().length

  const toggleGroup = (name: string) => {
    setExpandedGroups((prev) =>
      prev.includes(name) ? prev.filter((g) => g !== name) : [...prev, name]
    )
  }

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {totalActiveFilters > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">
              Active Filters ({totalActiveFilters})
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
              onClick={onClearFilters}
            >
              Clear all
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([group, values]) =>
              values.map((value) => (
                <button
                  key={`${group}-${value}`}
                  onClick={() => onFilterChange(group, value)}
                  className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background hover:bg-foreground/90 transition-colors"
                >
                  {value}
                  <X className="h-3 w-3" />
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Filter Groups */}
      {filters.map((group) => (
        <div key={group.name} className="border-t border-border pt-6 first:border-0 first:pt-0">
          <button
            onClick={() => toggleGroup(group.name)}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="text-sm font-medium text-foreground">{group.name}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-muted-foreground transition-transform",
                expandedGroups.includes(group.name) && "rotate-180"
              )}
            />
          </button>
          {expandedGroups.includes(group.name) && (
            <div className="mt-4 space-y-3">
              {group.options.map((option) => {
                const isActive = activeFilters[group.name]?.includes(option.value)
                return (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={cn(
                        "h-4 w-4 rounded border border-border transition-colors flex items-center justify-center",
                        isActive && "bg-foreground border-foreground"
                      )}
                    >
                      {isActive && (
                        <svg
                          className="h-3 w-3 text-background"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isActive ?? false}
                      onChange={() => onFilterChange(group.name, option.value)}
                    />
                    <span className="flex-1 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {option.label}
                    </span>
                    {option.count !== undefined && (
                      <span className="text-xs text-muted-foreground">({option.count})</span>
                    )}
                  </label>
                )
              })}
            </div>
          )}
        </div>
      ))}

      {/* Price Range */}
      <div className="border-t border-border pt-6">
        <span className="text-sm font-medium text-foreground">Price Range</span>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground">Min</label>
            <input
              type="number"
              placeholder="0"
              className="mt-1 w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Max</label>
            <input
              type="number"
              placeholder="No limit"
              className="mt-1 w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
        <Button className="mt-3 w-full" variant="outline" size="sm">
          Apply Price Filter
        </Button>
      </div>
    </div>
  )
}
