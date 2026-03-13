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
    description:
      "Mixers, food processors, slicers and prep equipment for efficient kitchen operations.",
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
            <nav className="text-primary-foreground/60 mb-6 flex items-center gap-2 text-sm">
              <Link href="/" className="hover:text-primary-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary-foreground">Categories</span>
            </nav>
            <h1 className="font-display text-4xl font-bold">All Categories</h1>
            <p className="text-primary-foreground/80 mt-4 max-w-2xl text-lg">
              Browse our comprehensive selection of professional kitchen equipment organized by
              category. Find everything you need to equip your commercial kitchen.
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
                  className="group border-border bg-card hover:border-foreground/20 relative overflow-hidden rounded-xl border transition-all hover:shadow-lg"
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
                    <div className="absolute right-4 bottom-4 left-4">
                      <span className="inline-block rounded bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {category.productCount.toLocaleString()} Products
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-foreground group-hover:text-accent text-xl font-semibold transition-colors">
                      {category.name}
                    </h2>
                    <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
                      {category.description}
                    </p>

                    {/* Subcategories */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {category.subcategories.slice(0, 3).map((sub) => (
                        <span
                          key={sub}
                          className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs"
                        >
                          {sub}
                        </span>
                      ))}
                      {category.subcategories.length > 3 && (
                        <span className="bg-secondary text-muted-foreground rounded-full px-3 py-1 text-xs">
                          +{category.subcategories.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="text-foreground group-hover:text-accent mt-4 flex items-center text-sm font-medium transition-colors">
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
            <div className="bg-card rounded-xl p-8 text-center md:p-12">
              <h2 className="font-display text-foreground text-2xl font-bold md:text-3xl">
                Need Help Finding Equipment?
              </h2>
              <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
                Our team of experts is here to help you find the perfect equipment for your
                commercial kitchen. Get personalized recommendations based on your needs.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-colors"
                >
                  Contact an Expert
                </Link>
                <Link
                  href="/blog"
                  className="border-border text-foreground hover:bg-secondary inline-flex items-center justify-center rounded-md border px-6 py-3 text-sm font-medium transition-colors"
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
