import { NextRequest, NextResponse } from "next/server"
import { search } from "@/lib/search-data"

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams
  const query = sp.get("q") || ""
  const category = sp.get("category") || undefined
  const brand = sp.get("brand") || undefined
  const minPrice = sp.get("minPrice") ? Number(sp.get("minPrice")) : undefined
  const maxPrice = sp.get("maxPrice") ? Number(sp.get("maxPrice")) : undefined
  const sort =
    (sp.get("sort") as "relevance" | "price-asc" | "price-desc" | "rating" | "newest") ||
    "relevance"
  const limit = parseInt(sp.get("limit") || "10", 10)

  if (query.length < 2) {
    return NextResponse.json({
      products: [],
      brands: [],
      categories: [],
      suggestions: ["Combi Oven", "Ice Machine", "Coffee Machine", "Dishwasher", "Refrigerator"],
      totalResults: 0,
    })
  }

  const results = search({ query, category, brand, minPrice, maxPrice, sort, limit })
  return NextResponse.json(results)
}
