import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CategoryProductsClient } from "@/components/category-products-client"

// Mock data — replace with real DB/API calls per slug
const categoryData = {
  name: "Cooking Equipment",
  description:
    "Professional cooking equipment for commercial kitchens. From ranges and ovens to fryers and steamers, we have everything you need.",
  image: "/images/categories/cooking.jpg",
  subcategories: [
    { name: "Ranges & Ovens", slug: "ranges-ovens", count: 156 },
    { name: "Fryers", slug: "fryers", count: 89 },
    { name: "Grills & Griddles", slug: "grills-griddles", count: 67 },
    { name: "Steamers", slug: "steamers", count: 45 },
    { name: "Combi Ovens", slug: "combi-ovens", count: 34 },
    { name: "Woks & Ranges", slug: "woks-ranges", count: 28 },
  ],
}

const filters = [
  {
    name: "Brand",
    options: [
      { value: "rational", label: "Rational", count: 45 },
      { value: "electrolux", label: "Electrolux", count: 38 },
      { value: "garland", label: "Garland", count: 32 },
      { value: "blodgett", label: "Blodgett", count: 28 },
      { value: "vulcan", label: "Vulcan", count: 24 },
    ],
  },
  {
    name: "Type",
    options: [
      { value: "electric", label: "Electric", count: 89 },
      { value: "gas", label: "Gas", count: 67 },
      { value: "induction", label: "Induction", count: 34 },
    ],
  },
  {
    name: "Capacity",
    options: [
      { value: "small", label: "Small (1-5 GN)", count: 45 },
      { value: "medium", label: "Medium (6-10 GN)", count: 67 },
      { value: "large", label: "Large (10+ GN)", count: 28 },
    ],
  },
]

const products = [
  {
    id: "1",
    name: "Rational iCombi Pro 10-1/1 Electric Combi Oven",
    brand: "Rational",
    price: 485000,
    originalPrice: 520000,
    image: "/images/products/combi-oven.jpg",
    slug: "rational-icombi-pro-10-1-1",
    category: "Cooking Equipment",
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Electrolux 900XP Gas Range 6-Burner with Oven",
    brand: "Electrolux",
    price: 245000,
    image: "/images/products/combi-oven.jpg",
    slug: "electrolux-900xp-gas-range",
    category: "Cooking Equipment",
    isNew: true,
  },
  {
    id: "3",
    name: "Garland US Range 36 Gas Griddle",
    brand: "Garland",
    price: 89000,
    image: "/images/products/combi-oven.jpg",
    slug: "garland-us-range-36-griddle",
    category: "Cooking Equipment",
  },
  {
    id: "4",
    name: "Blodgett Mark V Electric Convection Oven",
    brand: "Blodgett",
    price: 178000,
    originalPrice: 195000,
    image: "/images/products/combi-oven.jpg",
    slug: "blodgett-mark-v-convection",
    category: "Cooking Equipment",
  },
  {
    id: "5",
    name: "Vulcan 4-Burner Heavy Duty Gas Range",
    brand: "Vulcan",
    price: 125000,
    image: "/images/products/combi-oven.jpg",
    slug: "vulcan-4-burner-gas-range",
    category: "Cooking Equipment",
  },
  {
    id: "6",
    name: "Rational SelfCookingCenter 6-1/1 Electric",
    brand: "Rational",
    price: 395000,
    image: "/images/products/combi-oven.jpg",
    slug: "rational-scc-6-1-1",
    category: "Cooking Equipment",
    isBestSeller: true,
  },
  {
    id: "7",
    name: "Electrolux 700XP Electric Tilting Braising Pan",
    brand: "Electrolux",
    price: 285000,
    image: "/images/products/combi-oven.jpg",
    slug: "electrolux-700xp-braising-pan",
    category: "Cooking Equipment",
  },
  {
    id: "8",
    name: "Garland Commercial Deep Fryer 35lb",
    brand: "Garland",
    price: 68000,
    originalPrice: 75000,
    image: "/images/products/combi-oven.jpg",
    slug: "garland-deep-fryer-35lb",
    category: "Cooking Equipment",
    isNew: true,
  },
]

// Pre-render known category slugs at build time
export async function generateStaticParams() {
  return [
    { slug: "cooking-equipment" },
    { slug: "refrigeration" },
    { slug: "food-preparation" },
    { slug: "beverage" },
    { slug: "warewashing" },
    { slug: "storage" },
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug: _slug } = await params
  return {
    title: `${categoryData.name} | SevenFive`,
    description: categoryData.description,
  }
}

// Server Component — no "use client" here
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Category Header */}
        <section className="relative h-64 overflow-hidden md:h-80">
          <Image
            src={categoryData.image}
            alt={categoryData.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="mx-auto w-full max-w-7xl px-4 pb-8">
              {/* Breadcrumb */}
              <nav className="mb-4 flex items-center gap-2 text-sm text-white/70">
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/category" className="transition-colors hover:text-white">
                  Categories
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">{categoryData.name}</span>
              </nav>
              <h1 className="text-3xl font-bold text-white md:text-4xl">{categoryData.name}</h1>
              <p className="mt-2 max-w-2xl text-white/80">{categoryData.description}</p>
            </div>
          </div>
        </section>

        {/* Subcategories */}
        <section className="border-border bg-card border-b">
          <div className="mx-auto max-w-7xl px-4 py-6">
            <div className="scrollbar-hide -mb-2 flex gap-3 overflow-x-auto pb-2">
              {categoryData.subcategories.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/category/${slug}/${sub.slug}`}
                  className="border-border bg-background text-foreground hover:border-foreground hover:bg-secondary flex-shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                >
                  {sub.name}
                  <span className="text-muted-foreground ml-2">({sub.count})</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section — interactive state lives in the Client Component */}
        <section className="py-8">
          <div className="mx-auto max-w-7xl px-4">
            <CategoryProductsClient filters={filters} products={products} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
