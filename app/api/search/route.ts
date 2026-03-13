import { NextRequest, NextResponse } from "next/server"

// Mock data - in production this would query a database
const products = [
  {
    id: "1",
    type: "product" as const,
    name: "Rational iCombi Pro 10-1/1 Electric Combi Oven",
    brand: "Rational",
    category: "Cooking Equipment",
    subcategory: "Combi Ovens",
    price: 485000,
    image: "/images/products/combi-oven.jpg",
    slug: "rational-icombi-pro-10-1-1",
  },
  {
    id: "2",
    type: "product" as const,
    name: "Hoshizaki IM-240ANE Ice Machine",
    brand: "Hoshizaki",
    category: "Refrigeration",
    subcategory: "Ice Machines",
    price: 125000,
    image: "/images/products/ice-machine.jpg",
    slug: "hoshizaki-im-240ane",
  },
  {
    id: "3",
    type: "product" as const,
    name: "La Marzocco Linea PB Espresso Machine",
    brand: "La Marzocco",
    category: "Beverage",
    subcategory: "Coffee Machines",
    price: 380000,
    image: "/images/products/espresso-machine.jpg",
    slug: "la-marzocco-linea-pb",
  },
  {
    id: "4",
    type: "product" as const,
    name: "True TWT-72SD-HC Work Top Refrigerator",
    brand: "True",
    category: "Refrigeration",
    subcategory: "Prep Tables",
    price: 89000,
    image: "/images/products/worktop-refrigerator.jpg",
    slug: "true-twt-72sd-hc",
  },
  {
    id: "5",
    type: "product" as const,
    name: "Electrolux 700XP Gas Range",
    brand: "Electrolux",
    category: "Cooking Equipment",
    subcategory: "Ranges & Ovens",
    price: 165000,
    image: "/images/products/combi-oven.jpg",
    slug: "electrolux-700xp-gas-range",
  },
  {
    id: "6",
    type: "product" as const,
    name: "Winterhalter PT-M Passthrough Dishwasher",
    brand: "Winterhalter",
    category: "Warewashing",
    subcategory: "Dishwashers",
    price: 245000,
    image: "/images/products/combi-oven.jpg",
    slug: "winterhalter-pt-m",
  },
  {
    id: "7",
    type: "product" as const,
    name: "Rational iVario Pro 2-S Multifunctional Cooker",
    brand: "Rational",
    category: "Cooking Equipment",
    subcategory: "Steamers",
    price: 620000,
    image: "/images/products/combi-oven.jpg",
    slug: "rational-ivario-pro-2s",
  },
  {
    id: "8",
    type: "product" as const,
    name: "Hoshizaki HR-78MA Reach-in Refrigerator",
    brand: "Hoshizaki",
    category: "Refrigeration",
    subcategory: "Reach-in Refrigerators",
    price: 95000,
    image: "/images/products/worktop-refrigerator.jpg",
    slug: "hoshizaki-hr-78ma",
  },
]

const brands = [
  { id: "b1", type: "brand" as const, name: "Rational", slug: "rational", productCount: 45 },
  { id: "b2", type: "brand" as const, name: "Hoshizaki", slug: "hoshizaki", productCount: 62 },
  { id: "b3", type: "brand" as const, name: "La Marzocco", slug: "la-marzocco", productCount: 28 },
  { id: "b4", type: "brand" as const, name: "True", slug: "true", productCount: 89 },
  { id: "b5", type: "brand" as const, name: "Electrolux", slug: "electrolux", productCount: 156 },
  { id: "b6", type: "brand" as const, name: "Winterhalter", slug: "winterhalter", productCount: 34 },
  { id: "b7", type: "brand" as const, name: "Hobart", slug: "hobart", productCount: 78 },
  { id: "b8", type: "brand" as const, name: "Miele", slug: "miele", productCount: 42 },
]

const categories = [
  { id: "c1", type: "category" as const, name: "Cooking Equipment", slug: "cooking-equipment", productCount: 234 },
  { id: "c2", type: "category" as const, name: "Refrigeration", slug: "refrigeration", productCount: 189 },
  { id: "c3", type: "category" as const, name: "Food Preparation", slug: "food-preparation", productCount: 156 },
  { id: "c4", type: "category" as const, name: "Beverage", slug: "beverage", productCount: 98 },
  { id: "c5", type: "category" as const, name: "Warewashing", slug: "warewashing", productCount: 67 },
  { id: "c6", type: "category" as const, name: "Bakery Equipment", slug: "bakery", productCount: 112 },
  { id: "c7", type: "category" as const, name: "Combi Ovens", slug: "cooking-equipment/combi-ovens", productCount: 24 },
  { id: "c8", type: "category" as const, name: "Ice Machines", slug: "refrigeration/ice-machines", productCount: 35 },
  { id: "c9", type: "category" as const, name: "Coffee Machines", slug: "beverage/coffee-machines", productCount: 42 },
]

function searchItems<T extends { name: string }>(items: T[], query: string): T[] {
  const lowerQuery = query.toLowerCase()
  return items.filter((item) => {
    const searchFields = [
      item.name,
      ...(("brand" in item && typeof item.brand === "string") ? [item.brand] : []),
      ...(("category" in item && typeof item.category === "string") ? [item.category] : []),
      ...(("subcategory" in item && typeof item.subcategory === "string") ? [item.subcategory] : []),
    ]
    return searchFields.some((field) => field.toLowerCase().includes(lowerQuery))
  })
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q") || ""
  const limit = parseInt(searchParams.get("limit") || "10", 10)

  if (query.length < 2) {
    return NextResponse.json({
      products: [],
      brands: [],
      categories: [],
      suggestions: ["Combi Oven", "Ice Machine", "Coffee Machine", "Dishwasher", "Refrigerator"],
    })
  }

  // Simulate network delay for realism
  await new Promise((resolve) => setTimeout(resolve, 100))

  const matchedProducts = searchItems(products, query).slice(0, limit)
  const matchedBrands = searchItems(brands, query).slice(0, 4)
  const matchedCategories = searchItems(categories, query).slice(0, 4)

  // Generate suggestions based on partial matches
  const allNames = [
    ...products.map((p) => p.name),
    ...brands.map((b) => b.name),
    ...categories.map((c) => c.name),
  ]
  const suggestions = allNames
    .filter((name) => name.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5)

  return NextResponse.json({
    products: matchedProducts,
    brands: matchedBrands,
    categories: matchedCategories,
    suggestions,
    totalResults: matchedProducts.length + matchedBrands.length + matchedCategories.length,
  })
}
