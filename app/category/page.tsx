import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const categories = [
  {
    name: "Cooking Equipment",
    description: "Ranges, ovens, fryers, grills, steamers and more for professional cooking.",
    image: "/images/categories/cooking.jpg",
    href: "/category/cooking-equipment",
    productCount: 2450,
    subcategories: ["Ranges & Ovens", "Fryers", "Grills & Griddles", "Steamers", "Combi Ovens"],
  },
  {
    name: "Refrigeration",
    description: "Walk-in coolers, reach-in refrigerators, prep tables and ice machines.",
    image: "/images/categories/refrigeration.jpg",
    href: "/category/refrigeration",
    productCount: 1890,
    subcategories: ["Walk-in Coolers", "Reach-in Refrigerators", "Prep Tables", "Ice Machines"],
  },
  {
    name: "Food Preparation",
    description: "Mixers, food processors, slicers and prep equipment for efficient kitchen operations.",
    image: "/images/categories/food-prep.jpg",
    href: "/category/food-preparation",
    productCount: 1560,
    subcategories: ["Mixers", "Food Processors", "Slicers", "Prep Tables"],
  },
  {
    name: "Beverage Equipment",
    description: "Coffee machines, blenders, juice dispensers and ice cream machines.",
    image: "/images/categories/beverage.jpg",
    href: "/category/beverage",
    productCount: 980,
    subcategories: ["Coffee Machines", "Blenders", "Juice Dispensers", "Ice Cream Machines"],
  },
  {
    name: "Warewashing",
    description: "Commercial dishwashers, glass washers and sinks for efficient cleaning.",
    image: "/images/categories/warewashing.jpg",
    href: "/category/warewashing",
    productCount: 670,
    subcategories: ["Dishwashers", "Glass Washers", "Sinks", "Drying Racks"],
  },
  {
    name: "Bakery Equipment",
    description: "Professional ovens, proofers, display cases and baking accessories.",
    image: "/images/categories/bakery.jpg",
    href: "/category/bakery",
    productCount: 890,
    subcategories: ["Deck Ovens", "Proofers", "Display Cases", "Baking Accessories"],
  },
]

export default function CategoriesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="mx-auto max-w-7xl px-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-6">
              <Link href="/" className="hover:text-primary-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary-foreground">Categories</span>
            </nav>
            <h1 className="text-4xl font-bold">All Categories</h1>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">
              Browse our comprehensive selection of professional kitchen equipment 
              organized by category. Find everything you need to equip your commercial kitchen.
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:border-foreground/20"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block rounded bg-white/20 backdrop-blur-sm px-2 py-1 text-xs font-medium text-white">
                        {category.productCount.toLocaleString()} Products
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                      {category.name}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {category.description}
                    </p>

                    {/* Subcategories */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {category.subcategories.slice(0, 3).map((sub) => (
                        <span
                          key={sub}
                          className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                        >
                          {sub}
                        </span>
                      ))}
                      {category.subcategories.length > 3 && (
                        <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                          +{category.subcategories.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="mt-4 flex items-center text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      Browse Category
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="bg-secondary py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="rounded-xl bg-card p-8 md:p-12 text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                Need Help Finding Equipment?
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Our team of experts is here to help you find the perfect equipment 
                for your commercial kitchen. Get personalized recommendations based on your needs.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Contact an Expert
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  Read Buying Guides
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
