"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, X, Check, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useComparison } from "@/contexts/comparison-context"
import { cn } from "@/lib/utils"

// Mock specifications for comparison
const productSpecs: Record<string, Record<string, string | boolean>> = {
  "1": {
    "Power Source": "Electric",
    Capacity: "10 x 1/1 GN",
    "Power Rating": "18.4 kW",
    "Dimensions (WxDxH)": "847 x 771 x 1042 mm",
    Weight: "138 kg",
    "Temperature Range": "30-300°C",
    "Humidity Control": true,
    "Self-Cleaning": true,
    "Digital Display": true,
    "WiFi Connected": true,
    Warranty: "2 Years",
  },
  "2": {
    "Power Source": "Gas",
    Capacity: "6 Burners + Oven",
    "Power Rating": "44 kW",
    "Dimensions (WxDxH)": "1200 x 900 x 850 mm",
    Weight: "245 kg",
    "Temperature Range": "100-300°C",
    "Humidity Control": false,
    "Self-Cleaning": false,
    "Digital Display": false,
    "WiFi Connected": false,
    Warranty: "1 Year",
  },
  "3": {
    "Power Source": "Gas",
    Capacity: "36 inch Griddle",
    "Power Rating": "24 kW",
    "Dimensions (WxDxH)": "914 x 635 x 400 mm",
    Weight: "95 kg",
    "Temperature Range": "150-250°C",
    "Humidity Control": false,
    "Self-Cleaning": false,
    "Digital Display": false,
    "WiFi Connected": false,
    Warranty: "1 Year",
  },
  "4": {
    "Power Source": "Electric",
    Capacity: "5 x 1/1 GN",
    "Power Rating": "11 kW",
    "Dimensions (WxDxH)": "965 x 857 x 1570 mm",
    Weight: "145 kg",
    "Temperature Range": "65-260°C",
    "Humidity Control": true,
    "Self-Cleaning": false,
    "Digital Display": true,
    "WiFi Connected": false,
    Warranty: "2 Years",
  },
}

const specCategories = [
  {
    name: "Basic Info",
    specs: ["Power Source", "Capacity", "Power Rating"],
  },
  {
    name: "Dimensions",
    specs: ["Dimensions (WxDxH)", "Weight"],
  },
  {
    name: "Performance",
    specs: ["Temperature Range"],
  },
  {
    name: "Features",
    specs: ["Humidity Control", "Self-Cleaning", "Digital Display", "WiFi Connected"],
  },
  {
    name: "Warranty",
    specs: ["Warranty"],
  },
]

// This page uses useComparison (client context) so it must be a Client Component.
// The comparison context itself is already wrapped properly in layout via ComparisonProvider.
export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useComparison()

  if (compareList.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center">
          <div className="px-4 text-center">
            <h1 className="text-foreground font-display mb-4 text-2xl font-bold">
              No Products to Compare
            </h1>
            <p className="text-muted-foreground mb-6 max-w-md">
              Add products to your comparison list from the category or product pages to see them
              side by side.
            </p>
            <Button asChild>
              <Link href="/category/cooking-equipment">Browse Products</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Link
                href="/category/cooking-equipment"
                className="text-muted-foreground hover:text-foreground mb-2 inline-flex items-center text-sm transition-colors"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to products
              </Link>
              <h1 className="text-foreground font-display text-2xl font-bold md:text-3xl">
                Compare Products
              </h1>
              <p className="text-muted-foreground mt-1">Comparing {compareList.length} products</p>
            </div>
            <Button variant="outline" onClick={clearCompare}>
              Clear All
            </Button>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Product Header */}
              <thead>
                <tr>
                  <th className="bg-background border-border sticky left-0 z-10 w-48 border-b p-4 text-left align-bottom">
                    <span className="sr-only">Specification</span>
                  </th>
                  {compareList.map((product) => (
                    <th
                      key={product.id}
                      className="border-border bg-card min-w-[200px] border-b p-4 text-left align-bottom"
                    >
                      <div className="relative">
                        <button
                          onClick={() => removeFromCompare(product.id)}
                          className="bg-muted text-muted-foreground hover:bg-foreground hover:text-background absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full transition-colors"
                        >
                          <X className="h-3.5 w-3.5" />
                          <span className="sr-only">Remove</span>
                        </button>
                        <div className="bg-muted relative mb-4 aspect-square w-full max-w-[180px] overflow-hidden rounded-lg">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-muted-foreground mb-1 text-xs font-medium tracking-wider uppercase">
                          {product.brand}
                        </p>
                        <h3 className="text-foreground mb-2 line-clamp-2 font-semibold">
                          {product.name}
                        </h3>
                        <div className="flex items-baseline gap-2">
                          <span className="text-foreground text-lg font-bold">
                            {new Intl.NumberFormat("th-TH", {
                              style: "currency",
                              currency: "THB",
                              minimumFractionDigits: 0,
                            }).format(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-muted-foreground text-sm line-through">
                              {new Intl.NumberFormat("th-TH", {
                                style: "currency",
                                currency: "THB",
                                minimumFractionDigits: 0,
                              }).format(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        <Button asChild size="sm" className="mt-4 w-full">
                          <Link href={`/product/${product.slug}`}>View Details</Link>
                        </Button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Specification Rows */}
              <tbody>
                {specCategories.map((category) => (
                  <React.Fragment key={category.name}>
                    {/* Category Header */}
                    <tr>
                      <td
                        colSpan={compareList.length + 1}
                        className="bg-muted text-foreground border-border border-b px-4 py-3 font-semibold"
                      >
                        {category.name}
                      </td>
                    </tr>

                    {/* Specs */}
                    {category.specs.map((spec) => (
                      <tr key={spec} className="group">
                        <td className="bg-background text-foreground border-border group-hover:bg-secondary/50 sticky left-0 z-10 border-b px-4 py-3 text-sm font-medium">
                          {spec}
                        </td>
                        {compareList.map((product) => {
                          const value = productSpecs[product.id]?.[spec]
                          return (
                            <td
                              key={`${product.id}-${spec}`}
                              className="border-border group-hover:bg-secondary/50 border-b px-4 py-3 text-sm"
                            >
                              {typeof value === "boolean" ? (
                                value ? (
                                  <Check className="h-5 w-5 text-green-600" />
                                ) : (
                                  <Minus className="text-muted-foreground h-5 w-5" />
                                )
                              ) : (
                                <span
                                  className={cn(
                                    value ? "text-foreground" : "text-muted-foreground"
                                  )}
                                >
                                  {value || "—"}
                                </span>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Hint */}
          <p className="text-muted-foreground mt-4 text-center text-sm md:hidden">
            Scroll horizontally to see all products
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
