"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { X, ArrowRight, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useComparison } from "@/contexts/comparison-context"
import { cn } from "@/lib/utils"

export function ComparisonBar() {
  const { compareList, removeFromCompare, clearCompare, maxItems } = useComparison()

  if (compareList.length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card shadow-lg">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Product Thumbnails */}
          <div className="flex items-center gap-3 overflow-x-auto">
            <span className="flex-shrink-0 text-sm font-medium text-foreground">
              Compare ({compareList.length}/{maxItems})
            </span>
            
            <div className="flex items-center gap-2">
              {compareList.map((product) => (
                <div
                  key={product.id}
                  className="group relative flex-shrink-0 rounded-lg border border-border bg-background p-1"
                >
                  <div className="relative h-12 w-12 overflow-hidden rounded">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background shadow-md transition-transform hover:scale-110"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {product.name}</span>
                  </button>
                  <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 group-hover:block">
                    <div className="whitespace-nowrap rounded bg-foreground px-2 py-1 text-xs text-background shadow-lg">
                      {product.name}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Empty Slots */}
              {Array.from({ length: maxItems - compareList.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-border"
                >
                  <span className="text-xs text-muted-foreground">+</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCompare}
              className="text-muted-foreground hover:text-foreground"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Clear</span>
            </Button>
            
            <Button
              asChild
              size="sm"
              disabled={compareList.length < 2}
              className={cn(
                compareList.length < 2 && "opacity-50 pointer-events-none"
              )}
            >
              <Link href="/compare">
                Compare Now
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
