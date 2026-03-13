"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, GitCompareArrows } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useComparison, type CompareProduct } from "@/contexts/comparison-context"

export interface ProductCardProduct {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  slug: string
  category: string
  isNew?: boolean
  isBestSeller?: boolean
}

interface ProductCardProps {
  product: ProductCardProduct
  variant?: "default" | "compact"
  showCompare?: boolean
}

export function ProductCard({ product, variant = "default", showCompare = true }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToCompare, removeFromCompare, isInCompare, maxItems, compareList } = useComparison()
  
  const inCompare = isInCompare(product.id)
  const canAddMore = compareList.length < maxItems
  
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inCompare) {
      removeFromCompare(product.id)
    } else if (canAddMore) {
      const compareProduct: CompareProduct = {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        slug: product.slug,
        category: product.category,
      }
      addToCompare(compareProduct)
    }
  }

  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg hover:border-foreground/20",
        variant === "compact" && "border-0 shadow-none hover:shadow-none"
      )}
    >
      {/* Image */}
      <div className={cn(
        "relative aspect-square overflow-hidden bg-muted",
        variant === "compact" && "rounded-lg"
      )}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        
        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="rounded bg-foreground px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-background">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="rounded bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
              Best Seller
            </span>
          )}
          {discount && (
            <span className="rounded bg-destructive px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
              -{discount}%
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full shadow-md transition-colors",
              isWishlisted 
                ? "bg-accent text-accent-foreground" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
            onClick={handleWishlistClick}
          >
            <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
            <span className="sr-only">Add to wishlist</span>
          </button>
          
          {showCompare && (
            <button
              type="button"
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full shadow-md transition-colors",
                inCompare 
                  ? "bg-foreground text-background" 
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                !canAddMore && !inCompare && "opacity-50 cursor-not-allowed"
              )}
              onClick={handleCompareClick}
              disabled={!canAddMore && !inCompare}
            >
              <GitCompareArrows className="h-4 w-4" />
              <span className="sr-only">
                {inCompare ? "Remove from compare" : "Add to compare"}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={cn(
        "flex flex-1 flex-col p-4",
        variant === "compact" && "p-3 pt-3"
      )}>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.brand}
        </p>
        <h3 className={cn(
          "mt-1 font-medium text-foreground leading-snug line-clamp-2 group-hover:text-accent transition-colors",
          variant === "compact" ? "text-sm" : "text-base"
        )}>
          {product.name}
        </h3>
        <div className="mt-auto pt-3 flex items-baseline gap-2">
          <span className={cn(
            "font-semibold text-foreground",
            variant === "compact" ? "text-base" : "text-lg"
          )}>
            {new Intl.NumberFormat("th-TH", {
              style: "currency",
              currency: "THB",
              minimumFractionDigits: 0,
            }).format(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {new Intl.NumberFormat("th-TH", {
                style: "currency",
                currency: "THB",
                minimumFractionDigits: 0,
              }).format(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
