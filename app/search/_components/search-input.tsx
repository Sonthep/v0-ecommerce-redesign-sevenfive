"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"

interface SearchInputProps {
  initialQuery: string
}

export function SearchInput({ initialQuery }: SearchInputProps) {
  const router = useRouter()
  const [value, setValue] = React.useState(initialQuery)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = value.trim()
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl">
      <Search className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products, brands, categories..."
        className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 focus:bg-primary-foreground/15 focus:ring-primary-foreground/30 w-full rounded-xl border py-3.5 pr-12 pl-12 focus:ring-2 focus:outline-none"
        autoComplete="off"
        autoFocus
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            setValue("")
            inputRef.current?.focus()
          }}
          className="text-primary-foreground/60 hover:text-primary-foreground absolute top-1/2 right-4 -translate-y-1/2 rounded p-0.5 transition-colors"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear</span>
        </button>
      )}
    </form>
  )
}
