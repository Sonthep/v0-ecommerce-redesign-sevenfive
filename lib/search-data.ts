// Shared search data — used by both /api/search route and /search page

export interface SearchProduct {
  id: string
  type: "product"
  name: string
  brand: string
  category: string
  subcategory: string
  price: number
  originalPrice?: number
  image: string
  slug: string
  rating: number
  reviewCount: number
}

export interface SearchBrand {
  id: string
  type: "brand"
  name: string
  slug: string
  productCount: number
  image: string
}

export interface SearchCategory {
  id: string
  type: "category"
  name: string
  slug: string
  productCount: number
}

export interface SearchResults {
  products: SearchProduct[]
  brands: SearchBrand[]
  categories: SearchCategory[]
  suggestions: string[]
  totalResults: number
}

export const allProducts: SearchProduct[] = [
  {
    id: "1",
    type: "product",
    name: "Rational iCombi Pro 10-1/1 Electric Combi Oven",
    brand: "Rational",
    category: "Cooking Equipment",
    subcategory: "Combi Ovens",
    price: 485000,
    originalPrice: 520000,
    image: "/images/products/combi-oven.jpg",
    slug: "rational-icombi-pro-10-1-1",
    rating: 4.9,
    reviewCount: 124,
  },
  {
    id: "2",
    type: "product",
    name: "Hoshizaki IM-240ANE Ice Machine",
    brand: "Hoshizaki",
    category: "Refrigeration",
    subcategory: "Ice Machines",
    price: 125000,
    image: "/images/products/ice-machine.jpg",
    slug: "hoshizaki-im-240ane",
    rating: 4.7,
    reviewCount: 89,
  },
  {
    id: "3",
    type: "product",
    name: "La Marzocco Linea PB Espresso Machine",
    brand: "La Marzocco",
    category: "Beverage",
    subcategory: "Coffee Machines",
    price: 380000,
    image: "/images/products/espresso-machine.jpg",
    slug: "la-marzocco-linea-pb",
    rating: 4.8,
    reviewCount: 56,
  },
  {
    id: "4",
    type: "product",
    name: "True TWT-72SD-HC Work Top Refrigerator",
    brand: "True",
    category: "Refrigeration",
    subcategory: "Prep Tables",
    price: 89000,
    image: "/images/products/worktop-refrigerator.jpg",
    slug: "true-twt-72sd-hc",
    rating: 4.6,
    reviewCount: 203,
  },
  {
    id: "5",
    type: "product",
    name: "Electrolux 700XP Gas Range",
    brand: "Electrolux",
    category: "Cooking Equipment",
    subcategory: "Ranges & Ovens",
    price: 165000,
    image: "/images/products/combi-oven.jpg",
    slug: "electrolux-700xp-gas-range",
    rating: 4.5,
    reviewCount: 78,
  },
  {
    id: "6",
    type: "product",
    name: "Winterhalter PT-M Passthrough Dishwasher",
    brand: "Winterhalter",
    category: "Warewashing",
    subcategory: "Dishwashers",
    price: 245000,
    image: "/images/products/combi-oven.jpg",
    slug: "winterhalter-pt-m",
    rating: 4.8,
    reviewCount: 42,
  },
  {
    id: "7",
    type: "product",
    name: "Rational iVario Pro 2-S Multifunctional Cooker",
    brand: "Rational",
    category: "Cooking Equipment",
    subcategory: "Steamers",
    price: 620000,
    image: "/images/products/combi-oven.jpg",
    slug: "rational-ivario-pro-2s",
    rating: 4.9,
    reviewCount: 37,
  },
  {
    id: "8",
    type: "product",
    name: "Hoshizaki HR-78MA Reach-in Refrigerator",
    brand: "Hoshizaki",
    category: "Refrigeration",
    subcategory: "Reach-in Refrigerators",
    price: 95000,
    image: "/images/products/worktop-refrigerator.jpg",
    slug: "hoshizaki-hr-78ma",
    rating: 4.7,
    reviewCount: 65,
  },
  {
    id: "9",
    type: "product",
    name: "Hobart HL600 60-Quart Commercial Mixer",
    brand: "Hobart",
    category: "Food Preparation",
    subcategory: "Mixers",
    price: 185000,
    image: "/images/products/combi-oven.jpg",
    slug: "hobart-hl600",
    rating: 4.8,
    reviewCount: 111,
  },
  {
    id: "10",
    type: "product",
    name: "Miele G 7883 Professional Dishwasher",
    brand: "Miele",
    category: "Warewashing",
    subcategory: "Dishwashers",
    price: 320000,
    image: "/images/products/combi-oven.jpg",
    slug: "miele-g7883",
    rating: 4.9,
    reviewCount: 29,
  },
  {
    id: "11",
    type: "product",
    name: "Electrolux Air-O-Steam Combi Oven 10 GN",
    brand: "Electrolux",
    category: "Cooking Equipment",
    subcategory: "Combi Ovens",
    price: 295000,
    originalPrice: 320000,
    image: "/images/products/combi-oven.jpg",
    slug: "electrolux-air-o-steam",
    rating: 4.6,
    reviewCount: 54,
  },
  {
    id: "12",
    type: "product",
    name: "True T-49 Two-Section Reach-In Refrigerator",
    brand: "True",
    category: "Refrigeration",
    subcategory: "Reach-in Refrigerators",
    price: 110000,
    image: "/images/products/worktop-refrigerator.jpg",
    slug: "true-t-49",
    rating: 4.7,
    reviewCount: 188,
  },
  {
    id: "13",
    type: "product",
    name: "Rational SCC 6-1/1 Self Cooking Center",
    brand: "Rational",
    category: "Cooking Equipment",
    subcategory: "Combi Ovens",
    price: 350000,
    originalPrice: 390000,
    image: "/images/products/combi-oven.jpg",
    slug: "rational-scc-6-1-1",
    rating: 4.8,
    reviewCount: 96,
  },
  {
    id: "14",
    type: "product",
    name: "La Marzocco GB5 AV Espresso Machine",
    brand: "La Marzocco",
    category: "Beverage",
    subcategory: "Coffee Machines",
    price: 520000,
    image: "/images/products/espresso-machine.jpg",
    slug: "la-marzocco-gb5-av",
    rating: 4.9,
    reviewCount: 31,
  },
  {
    id: "15",
    type: "product",
    name: "Hobart FP350 Food Processor",
    brand: "Hobart",
    category: "Food Preparation",
    subcategory: "Food Processors",
    price: 78000,
    image: "/images/products/combi-oven.jpg",
    slug: "hobart-fp350",
    rating: 4.5,
    reviewCount: 47,
  },
]

export const allBrands: SearchBrand[] = [
  {
    id: "b1",
    type: "brand",
    name: "Rational",
    slug: "rational",
    productCount: 45,
    image: "/images/brands/rational.jpg",
  },
  {
    id: "b2",
    type: "brand",
    name: "Hoshizaki",
    slug: "hoshizaki",
    productCount: 62,
    image: "/images/brands/hoshizaki.jpg",
  },
  {
    id: "b3",
    type: "brand",
    name: "La Marzocco",
    slug: "la-marzocco",
    productCount: 28,
    image: "/images/brands/la-marzocco.jpg",
  },
  {
    id: "b4",
    type: "brand",
    name: "True",
    slug: "true",
    productCount: 89,
    image: "/images/brands/true.jpg",
  },
  {
    id: "b5",
    type: "brand",
    name: "Electrolux",
    slug: "electrolux",
    productCount: 156,
    image: "/images/brands/electrolux.jpg",
  },
  {
    id: "b6",
    type: "brand",
    name: "Winterhalter",
    slug: "winterhalter",
    productCount: 34,
    image: "/images/brands/winterhalter.jpg",
  },
  {
    id: "b7",
    type: "brand",
    name: "Hobart",
    slug: "hobart",
    productCount: 78,
    image: "/images/brands/hobart.jpg",
  },
  {
    id: "b8",
    type: "brand",
    name: "Miele",
    slug: "miele",
    productCount: 42,
    image: "/images/brands/miele.jpg",
  },
]

export const allCategories: SearchCategory[] = [
  {
    id: "c1",
    type: "category",
    name: "Cooking Equipment",
    slug: "cooking-equipment",
    productCount: 234,
  },
  { id: "c2", type: "category", name: "Refrigeration", slug: "refrigeration", productCount: 189 },
  {
    id: "c3",
    type: "category",
    name: "Food Preparation",
    slug: "food-preparation",
    productCount: 156,
  },
  { id: "c4", type: "category", name: "Beverage", slug: "beverage", productCount: 98 },
  { id: "c5", type: "category", name: "Warewashing", slug: "warewashing", productCount: 67 },
  { id: "c6", type: "category", name: "Bakery Equipment", slug: "bakery", productCount: 112 },
  {
    id: "c7",
    type: "category",
    name: "Combi Ovens",
    slug: "cooking-equipment/combi-ovens",
    productCount: 24,
  },
  {
    id: "c8",
    type: "category",
    name: "Ice Machines",
    slug: "refrigeration/ice-machines",
    productCount: 35,
  },
  {
    id: "c9",
    type: "category",
    name: "Coffee Machines",
    slug: "beverage/coffee-machines",
    productCount: 42,
  },
]

export const POPULAR_SEARCHES = [
  "Combi Oven",
  "Ice Machine",
  "Coffee Machine",
  "Dishwasher",
  "Refrigerator",
  "Mixer",
]

/** Score a string match: exact=3, starts-with=2, contains=1, no match=0 */
function scoreMatch(text: string, query: string): number {
  const t = text.toLowerCase()
  const q = query.toLowerCase()
  if (t === q) return 3
  if (t.startsWith(q)) return 2
  if (t.includes(q)) return 1
  return 0
}

function scoreProduct(product: SearchProduct, query: string): number {
  return Math.max(
    scoreMatch(product.name, query) * 3, // name is most important
    scoreMatch(product.brand, query) * 2,
    scoreMatch(product.category, query),
    scoreMatch(product.subcategory, query)
  )
}

function scoreBrand(brand: SearchBrand, query: string): number {
  return scoreMatch(brand.name, query) * 3
}

function scoreCategory(cat: SearchCategory, query: string): number {
  return scoreMatch(cat.name, query) * 3
}

export interface SearchOptions {
  query: string
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  sort?: "relevance" | "price-asc" | "price-desc" | "rating" | "newest"
  limit?: number
}

export function search(options: SearchOptions): SearchResults {
  const { query, category, brand, minPrice, maxPrice, sort = "relevance", limit = 20 } = options
  const q = query.trim()

  if (q.length < 1) {
    return {
      products: [],
      brands: [],
      categories: [],
      suggestions: POPULAR_SEARCHES,
      totalResults: 0,
    }
  }

  // Score & filter products
  let products = allProducts
    .map((p) => ({ product: p, score: scoreProduct(p, q) }))
    .filter(({ score }) => score > 0)
    .map(({ product }) => product)

  // Apply category filter
  if (category) {
    products = products.filter(
      (p) =>
        p.category.toLowerCase() === category.toLowerCase() ||
        p.subcategory.toLowerCase() === category.toLowerCase()
    )
  }

  // Apply brand filter
  if (brand) {
    products = products.filter((p) => p.brand.toLowerCase() === brand.toLowerCase())
  }

  // Apply price filter
  if (minPrice !== undefined) products = products.filter((p) => p.price >= minPrice)
  if (maxPrice !== undefined) products = products.filter((p) => p.price <= maxPrice)

  // Sort
  if (sort === "price-asc") {
    products.sort((a, b) => a.price - b.price)
  } else if (sort === "price-desc") {
    products.sort((a, b) => b.price - a.price)
  } else if (sort === "rating") {
    products.sort((a, b) => b.rating - a.rating)
  } else {
    // relevance (default)
    products.sort((a, b) => scoreProduct(b, q) - scoreProduct(a, q))
  }

  // Score & filter brands/categories (only if no category/brand filter already applied)
  const brands = allBrands
    .map((b) => ({ brand: b, score: scoreBrand(b, q) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ brand }) => brand)

  const categories = allCategories
    .map((c) => ({ category: c, score: scoreCategory(c, q) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ category }) => category)

  // Suggestions from names that contain the query
  const suggestions = [
    ...allProducts.map((p) => p.name),
    ...allBrands.map((b) => b.name),
    ...allCategories.map((c) => c.name),
  ]
    .filter(
      (name) =>
        name.toLowerCase().includes(q.toLowerCase()) && name.toLowerCase() !== q.toLowerCase()
    )
    .slice(0, 5)

  return {
    products: products.slice(0, limit),
    brands,
    categories,
    suggestions,
    totalResults: products.length + brands.length + categories.length,
  }
}
