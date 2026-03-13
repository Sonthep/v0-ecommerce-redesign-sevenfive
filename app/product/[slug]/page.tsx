"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  CheckCircle2,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { cn } from "@/lib/utils"

// Mock product data
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

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = React.useState(0)
  const [quantity, setQuantity] = React.useState(1)
  const [activeTab, setActiveTab] = React.useState<"description" | "specifications" | "reviews">(
    "description"
  )

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-secondary border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/category" className="hover:text-foreground transition-colors">
                Categories
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                href={`/category/${product.categorySlug}`}
                className="hover:text-foreground transition-colors"
              >
                {product.category}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Section */}
        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Image Gallery */}
              <div>
                <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  {discount && (
                    <span className="absolute left-4 top-4 rounded bg-destructive px-2 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                      -{discount}%
                    </span>
                  )}
                </div>
                <div className="mt-4 grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "relative aspect-square overflow-hidden rounded-lg bg-muted transition-all",
                        selectedImage === index
                          ? "ring-2 ring-foreground ring-offset-2"
                          : "opacity-70 hover:opacity-100"
                      )}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div>
                {/* Brand */}
                <Link
                  href={`/brands/${product.brand.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors"
                >
                  {product.brand}
                </Link>

                {/* Name */}
                <h1 className="mt-2 text-2xl font-bold text-foreground md:text-3xl text-balance">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < Math.floor(product.rating)
                            ? "fill-accent text-accent"
                            : "text-muted-foreground/30"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-foreground">
                    {new Intl.NumberFormat("th-TH", {
                      style: "currency",
                      currency: "THB",
                      minimumFractionDigits: 0,
                    }).format(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {new Intl.NumberFormat("th-TH", {
                        style: "currency",
                        currency: "THB",
                        minimumFractionDigits: 0,
                      }).format(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* SKU */}
                <p className="mt-2 text-sm text-muted-foreground">SKU: {product.sku}</p>

                {/* Stock Status */}
                <div className="mt-6 flex items-center gap-2">
                  {product.inStock ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-600">
                        In Stock ({product.stockCount} available)
                      </span>
                    </>
                  ) : (
                    <span className="text-sm font-medium text-destructive">Out of Stock</span>
                  )}
                </div>

                {/* Quantity & Add to Cart */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex items-center rounded-md border border-border">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex h-12 w-12 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-medium text-foreground">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="flex h-12 w-12 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <Button size="lg" className="flex-1 min-w-[200px]" disabled={!product.inStock}>
                    Add to Cart
                  </Button>
                  <Button size="lg" variant="outline" className="w-12" asChild>
                    <button>
                      <Heart className="h-5 w-5" />
                      <span className="sr-only">Add to wishlist</span>
                    </button>
                  </Button>
                  <Button size="lg" variant="outline" className="w-12" asChild>
                    <button>
                      <Share2 className="h-5 w-5" />
                      <span className="sr-only">Share</span>
                    </button>
                  </Button>
                </div>

                {/* Benefits */}
                <div className="mt-8 grid gap-4 rounded-xl bg-secondary p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-card">
                      <Truck className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Free Delivery</p>
                      <p className="text-sm text-muted-foreground">
                        Estimated delivery in {product.deliveryDays} business days
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-card">
                      <Shield className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Warranty</p>
                      <p className="text-sm text-muted-foreground">{product.warranty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-card">
                      <RotateCcw className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">365 Days Support</p>
                      <p className="text-sm text-muted-foreground">
                        24/7 after-sales service and support
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Contact */}
                <div className="mt-6 rounded-xl border border-border p-6">
                  <p className="font-medium text-foreground">Need help with this product?</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Our experts are ready to assist you with specifications and installation.
                  </p>
                  <div className="mt-4 flex gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="tel:+6621234567">Call: +66 2 123 4567</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Tabs */}
        <section className="border-t border-border py-12">
          <div className="mx-auto max-w-7xl px-4">
            {/* Tabs */}
            <div className="flex gap-8 border-b border-border">
              {(["description", "specifications", "reviews"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "pb-4 text-sm font-medium capitalize transition-colors border-b-2 -mb-px",
                    activeTab === tab
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab}
                  {tab === "reviews" && (
                    <span className="ml-2 text-muted-foreground">({product.reviewCount})</span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="py-8">
              {activeTab === "description" && (
                <div className="grid gap-8 lg:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Product Description</h3>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Key Features</h3>
                    <ul className="mt-4 space-y-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="max-w-2xl">
                  <h3 className="text-lg font-semibold text-foreground">
                    Technical Specifications
                  </h3>
                  <div className="mt-6 divide-y divide-border rounded-xl border border-border">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="grid grid-cols-2 p-4">
                        <span className="font-medium text-foreground">{spec.name}</span>
                        <span className="text-muted-foreground">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="max-w-2xl">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">Customer Reviews</h3>
                    <Button>Write a Review</Button>
                  </div>
                  <div className="mt-6 rounded-xl border border-border p-8 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold text-foreground">{product.rating}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-5 w-5",
                              i < Math.floor(product.rating)
                                ? "fill-accent text-accent"
                                : "text-muted-foreground/30"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      Based on {product.reviewCount} reviews
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="border-t border-border bg-secondary py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-2xl font-bold text-foreground">Related Products</h2>
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
