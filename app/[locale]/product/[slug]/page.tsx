import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { ProductDetailClient } from "@/components/product-detail-client"

// Mock product data — replace with real DB/API calls per slug
const product = {
  id: "1",
  name: "Rational iCombi Pro 10-1/1 Electric Combi Oven",
  brand: "Rational",
  price: 485000,
  originalPrice: 520000,
  sku: "RAT-ICOMBI-10-1-1-E",
  images: [
    "/images/products/combi-oven.jpg",
    "/images/products/combi-oven.jpg",
    "/images/products/combi-oven.jpg",
    "/images/products/combi-oven.jpg",
  ],
  description:
    "The iCombi Pro is the intelligent combi steamer for professional kitchens. With iCookingSuite, it automatically adjusts cooking parameters to deliver perfect results every time. The 10-1/1 model offers 10 full-size gastronorm capacity, making it ideal for medium to large commercial kitchens.",
  features: [
    "iCookingSuite intelligent cooking system",
    "10 x 1/1 GN capacity",
    "HiDensityControl for even heat distribution",
    "Efficient Care automatic cleaning system",
    "7-inch touchscreen display",
    "USB port for HACCP data export",
    "Energy-efficient design",
    "Stainless steel construction",
  ],
  specifications: [
    { name: "Capacity", value: "10 x 1/1 GN or 20 x 1/2 GN" },
    { name: "Power Type", value: "Electric" },
    { name: "Power Requirements", value: "400V 3N AC 50/60Hz" },
    { name: "Connected Load", value: "37 kW" },
    { name: "Dimensions (WxDxH)", value: "879 x 791 x 1042 mm" },
    { name: "Weight", value: "178 kg" },
    { name: "Steam Generation", value: "Fresh steam generator" },
    { name: "Water Connection", value: "3/4 inch" },
    { name: "Drain Connection", value: "DN 50" },
    { name: "Country of Origin", value: "Germany" },
  ],
  inStock: true,
  stockCount: 5,
  deliveryDays: 3,
  warranty: "2 years manufacturer warranty",
  category: "Cooking Equipment",
  categorySlug: "cooking-equipment",
  rating: 4.9,
  reviewCount: 127,
}

const relatedProducts = [
  {
    id: "2",
    name: "Rational SelfCookingCenter 6-1/1 Electric",
    brand: "Rational",
    price: 395000,
    image: "/images/products/combi-oven.jpg",
    slug: "rational-scc-6-1-1",
    category: "Cooking Equipment",
  },
  {
    id: "3",
    name: "Hoshizaki IM-240ANE Ice Machine",
    brand: "Hoshizaki",
    price: 125000,
    image: "/images/products/ice-machine.jpg",
    slug: "hoshizaki-im-240ane",
    category: "Refrigeration",
    isNew: true,
  },
  {
    id: "4",
    name: "True TWT-72SD-HC Work Top Refrigerator",
    brand: "True",
    price: 89000,
    originalPrice: 98000,
    image: "/images/products/worktop-refrigerator.jpg",
    slug: "true-twt-72sd-hc",
    category: "Refrigeration",
  },
  {
    id: "5",
    name: "La Marzocco Linea PB Espresso Machine",
    brand: "La Marzocco",
    price: 380000,
    image: "/images/products/espresso-machine.jpg",
    slug: "la-marzocco-linea-pb",
    category: "Beverage",
  },
]

// Static params for pre-rendering known product slugs
export async function generateStaticParams() {
  return [
    { slug: "rational-icombi-pro-10-1-1" },
    { slug: "rational-scc-6-1-1" },
    { slug: "hoshizaki-im-240ane" },
    { slug: "true-twt-72sd-hc" },
    { slug: "la-marzocco-linea-pb" },
  ]
}

// Per-page metadata driven by the product data
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  await params
  return {
    title: `${product.name} | SevenFive`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.images[0]],
    },
  }
}

// Server Component — no "use client" needed here
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug: _slug, locale } = await params
  const t = await getTranslations({ locale, namespace: "product" })

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-secondary border-border border-b">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <nav className="text-muted-foreground flex items-center gap-2 text-sm">
              <Link href={`/${locale}`} className="hover:text-foreground transition-colors">
                {t("breadcrumbHome")}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                href={`/${locale}/category`}
                className="hover:text-foreground transition-colors"
              >
                {t("breadcrumbCategories")}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                href={`/${locale}/category/${product.categorySlug}`}
                className="hover:text-foreground transition-colors"
              >
                {product.category}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground max-w-[200px] truncate">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Section — interactive parts are in the Client Component */}
        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <ProductDetailClient product={product} discount={discount} />
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="border-border bg-secondary border-t py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-foreground text-2xl font-bold">{t("relatedProducts")}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
