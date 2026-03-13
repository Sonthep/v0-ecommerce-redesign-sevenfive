"use client"

import * as React from "react"

export interface CompareProduct {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  slug: string
  category: string
  specs?: Record<string, string>
}

interface ComparisonContextType {
  compareList: CompareProduct[]
  addToCompare: (product: CompareProduct) => void
  removeFromCompare: (productId: string) => void
  clearCompare: () => void
  isInCompare: (productId: string) => boolean
  maxItems: number
}

const ComparisonContext = React.createContext<ComparisonContextType | undefined>(undefined)

const MAX_COMPARE_ITEMS = 4

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = React.useState<CompareProduct[]>([])

  const addToCompare = React.useCallback((product: CompareProduct) => {
    setCompareList((prev) => {
      if (prev.length >= MAX_COMPARE_ITEMS) {
        return prev
      }
      if (prev.some((p) => p.id === product.id)) {
        return prev
      }
      return [...prev, product]
    })
  }, [])

  const removeFromCompare = React.useCallback((productId: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId))
  }, [])

  const clearCompare = React.useCallback(() => {
    setCompareList([])
  }, [])

  const isInCompare = React.useCallback(
    (productId: string) => compareList.some((p) => p.id === productId),
    [compareList]
  )

  return (
    <ComparisonContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        maxItems: MAX_COMPARE_ITEMS,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparison() {
  const context = React.useContext(ComparisonContext)
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider")
  }
  return context
}
