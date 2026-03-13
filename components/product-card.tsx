"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface ProductCardProps {
  product: {
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
  variant?: "default" | "compact"
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
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
