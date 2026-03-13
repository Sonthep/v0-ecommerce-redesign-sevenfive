"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Minus, Plus, Share2, CheckCircle2, Star, GitCompareArrows } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { useComparison, type CompareProduct } from "@/contexts/comparison-context"
import { cn } from "@/lib/utils"

interface ProductSpec {
  name: string
  value: string
}

interface ProductDetailClientProps {
  product: {
    id: string
    name: string
    brand: string
    price: number
    originalPrice?: number
    sku: string
    images: string[]
    description: string
    features: string[]
    specifications: ProductSpec[]
    inStock: boolean
    stockCount: number
    deliveryDays: number
    warranty: string
    category: string
    categorySlug: string
    rating: number
    reviewCount: number
  }
  discount: number | null
}

export function ProductDetailClient({ product, discount }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = React.useState(0)
  const [quantity, setQuantity] = React.useState(1)
  const [activeTab, setActiveTab] = React.useState<"description" | "specifications" | "reviews">(
    "description"
  )
  const t = useTranslations("product")
  const { addToCompare, removeFromCompare, isInCompare, maxItems, compareList } = useComparison()

  const inCompare = isInCompare(product.id)
  const canAddMore = compareList.length < maxItems

  const handleCompareClick = () => {
    if (inCompare) {
      removeFromCompare(product.id)
    } else if (canAddMore) {
      const compareProduct: CompareProduct = {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        slug: product.id,
        category: product.category,
      }
      addToCompare(compareProduct)
    }
  }

  return (
    <>
      {/* Image Gallery */}
      <div>
        <div className="bg-muted relative aspect-square overflow-hidden rounded-xl">
          <Image
            src={product.images[selectedImage]}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          {discount && (
            <span className="bg-destructive absolute top-4 left-4 rounded px-2 py-1 text-xs font-semibold tracking-wider text-white uppercase">
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
                "bg-muted relative aspect-square overflow-hidden rounded-lg transition-all",
                selectedImage === index
                  ? "ring-foreground ring-2 ring-offset-2"
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
          className="text-muted-foreground hover:text-accent text-sm font-medium tracking-wider uppercase transition-colors"
        >
          {product.brand}
        </Link>

        {/* Name */}
        <h1 className="text-foreground font-display mt-2 text-2xl font-bold text-balance md:text-3xl">
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
          <span className="text-muted-foreground text-sm">
            {product.rating} ({product.reviewCount} {t("reviews")})
          </span>
        </div>

        {/* Price */}
        <div className="mt-6 flex items-baseline gap-3">
          <span className="text-foreground text-3xl font-bold">
            {new Intl.NumberFormat("th-TH", {
              style: "currency",
              currency: "THB",
              minimumFractionDigits: 0,
            }).format(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-muted-foreground text-lg line-through">
              {new Intl.NumberFormat("th-TH", {
                style: "currency",
                currency: "THB",
                minimumFractionDigits: 0,
              }).format(product.originalPrice)}
            </span>
          )}
        </div>

        {/* SKU */}
        <p className="text-muted-foreground mt-2 text-sm">SKU: {product.sku}</p>

        {/* Stock Status */}
        <div className="mt-6 flex items-center gap-2">
          {product.inStock ? (
            <>
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">
                {t("inStock")} ({product.stockCount} {t("available")})
              </span>
            </>
          ) : (
            <span className="text-destructive text-sm font-medium">{t("outOfStock")}</span>
          )}
        </div>

        {/* Quantity & Add to Cart */}
        <div className="mt-8 flex flex-wrap gap-4">
          <div className="border-border flex items-center rounded-md border">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-muted-foreground hover:text-foreground flex h-12 w-12 items-center justify-center transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-foreground w-12 text-center font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-muted-foreground hover:text-foreground flex h-12 w-12 items-center justify-center transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <Button size="lg" className="min-w-[200px] flex-1" disabled={!product.inStock}>
            {t("addToCart")}
          </Button>
          <Button size="lg" variant="outline" className="w-12" asChild>
            <button>
              <Heart className="h-5 w-5" />
              <span className="sr-only">{t("addToWishlist")}</span>
            </button>
          </Button>
          <Button size="lg" variant="outline" className="w-12" asChild>
            <button>
              <Share2 className="h-5 w-5" />
              <span className="sr-only">{t("share")}</span>
            </button>
          </Button>
          <Button
            size="lg"
            variant={inCompare ? "default" : "outline"}
            className="w-12"
            onClick={handleCompareClick}
            disabled={!canAddMore && !inCompare}
          >
            <GitCompareArrows className="h-5 w-5" />
            <span className="sr-only">
              {inCompare ? t("removeFromCompare") : t("addToCompare")}
            </span>
          </Button>
        </div>

        {/* Benefits */}
        <div className="bg-secondary mt-8 grid gap-4 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-card flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
              <svg
                className="text-foreground h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8l1.6 11.2A2 2 0 008.6 21h6.8a2 2 0 001.999-1.8L19 8"
                />
              </svg>
            </div>
            <div>
              <p className="text-foreground font-medium">{t("freeDelivery")}</p>
              <p className="text-muted-foreground text-sm">
                {t("deliveryDays", { days: product.deliveryDays })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-card flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
              <svg
                className="text-foreground h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <p className="text-foreground font-medium">{t("warranty")}</p>
              <p className="text-muted-foreground text-sm">{product.warranty}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-card flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
              <svg
                className="text-foreground h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <div>
              <p className="text-foreground font-medium">{t("support")}</p>
              <p className="text-muted-foreground text-sm">{t("supportDesc")}</p>
            </div>
          </div>
        </div>

        {/* Quick Contact */}
        <div className="border-border mt-6 rounded-xl border p-6">
          <p className="text-foreground font-medium">{t("needHelp")}</p>
          <p className="text-muted-foreground mt-1 text-sm">{t("needHelpDesc")}</p>
          <div className="mt-4 flex gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/contact">{t("contactUs")}</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="tel:+6621234567">{t("call")}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Product Details Tabs — full width, rendered below the grid */}
      <div className="border-border col-span-full mt-4 border-t py-12">
        {/* Tabs */}
        <div className="border-border flex gap-8 border-b">
          {(["description", "specifications", "reviews"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "-mb-px border-b-2 pb-4 text-sm font-medium capitalize transition-colors",
                activeTab === tab
                  ? "border-foreground text-foreground"
                  : "text-muted-foreground hover:text-foreground border-transparent"
              )}
            >
              {t(`tabs.${tab}`)}
              {tab === "reviews" && (
                <span className="text-muted-foreground ml-2">({product.reviewCount})</span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {activeTab === "description" && (
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-foreground text-lg font-semibold">{t("productDescription")}</h3>
                <p className="text-muted-foreground mt-4 leading-relaxed">{product.description}</p>
              </div>
              <div>
                <h3 className="text-foreground text-lg font-semibold">{t("keyFeatures")}</h3>
                <ul className="mt-4 space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="text-accent mt-0.5 h-5 w-5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "specifications" && (
            <div className="max-w-2xl">
              <h3 className="text-foreground text-lg font-semibold">{t("technicalSpecs")}</h3>
              <div className="divide-border border-border mt-6 divide-y rounded-xl border">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="grid grid-cols-2 p-4">
                    <span className="text-foreground font-medium">{spec.name}</span>
                    <span className="text-muted-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="max-w-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-foreground text-lg font-semibold">{t("customerReviews")}</h3>
                <Button>{t("writeReview")}</Button>
              </div>
              <div className="border-border mt-6 rounded-xl border p-8 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-foreground text-4xl font-bold">{product.rating}</span>
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
                <p className="text-muted-foreground mt-2">
                  {t("basedOnReviews", { count: product.reviewCount })}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
