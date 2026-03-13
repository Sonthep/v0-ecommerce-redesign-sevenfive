import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const brands = [
  {
    name: "Rational",
    logo: "/images/brands/rational.svg",
    description:
      "World leader in combi-steamer technology. German engineering excellence for professional kitchens.",
    productCount: 156,
    categories: ["Combi Ovens", "Self-Cooking Centers", "Accessories"],
    country: "Germany",
    featured: true,
  },
  {
    name: "Hoshizaki",
    logo: "/images/brands/hoshizaki.svg",
    description:
      "Premium Japanese ice machines and refrigeration equipment known for reliability and efficiency.",
    productCount: 234,
    categories: ["Ice Machines", "Refrigerators", "Display Cases"],
    country: "Japan",
    featured: true,
  },
  {
    name: "La Marzocco",
    logo: "/images/brands/la-marzocco.svg",
    description:
      "Iconic Italian espresso machines crafted in Florence since 1927. The gold standard for specialty coffee.",
    productCount: 45,
    categories: ["Espresso Machines", "Grinders", "Accessories"],
    country: "Italy",
    featured: true,
  },
  {
    name: "True",
    logo: "/images/brands/true.svg",
    description:
      "American-made commercial refrigeration with industry-leading energy efficiency and durability.",
    productCount: 312,
    categories: ["Refrigerators", "Freezers", "Prep Tables", "Display Cases"],
    country: "USA",
    featured: true,
  },
  {
    name: "Electrolux Professional",
    logo: "/images/brands/electrolux.svg",
    description:
      "Complete kitchen solutions from cooking to warewashing. Scandinavian design meets functionality.",
    productCount: 567,
    categories: ["Cooking Equipment", "Refrigeration", "Warewashing"],
    country: "Sweden",
    featured: true,
  },
  {
    name: "Winterhalter",
    logo: "/images/brands/winterhalter.svg",
    description:
      "German warewashing specialists. Premium dishwashers and glasswashers for demanding environments.",
    productCount: 89,
    categories: ["Dishwashers", "Glasswashers", "Water Treatment"],
    country: "Germany",
    featured: true,
  },
  {
    name: "Garland",
    logo: "/images/brands/rational.svg",
    description: "Heavy-duty cooking equipment built for high-volume commercial kitchens.",
    productCount: 178,
    categories: ["Ranges", "Griddles", "Charbroilers"],
    country: "USA",
    featured: false,
  },
  {
    name: "Blodgett",
    logo: "/images/brands/rational.svg",
    description: "Industry-leading convection ovens and pizza ovens since 1848.",
    productCount: 98,
    categories: ["Convection Ovens", "Pizza Ovens", "Deck Ovens"],
    country: "USA",
    featured: false,
  },
  {
    name: "Vulcan",
    logo: "/images/brands/rational.svg",
    description: "Reliable and durable cooking equipment for every commercial kitchen.",
    productCount: 245,
    categories: ["Ranges", "Fryers", "Steam Equipment"],
    country: "USA",
    featured: false,
  },
  {
    name: "Hobart",
    logo: "/images/brands/rational.svg",
    description: "Food equipment solutions including mixers, slicers, and dishwashers.",
    productCount: 189,
    categories: ["Mixers", "Slicers", "Dishwashers"],
    country: "USA",
    featured: false,
  },
  {
    name: "Robot Coupe",
    logo: "/images/brands/rational.svg",
    description: "The original food processor brand. French innovation for food preparation.",
    productCount: 67,
    categories: ["Food Processors", "Blenders", "Vegetable Prep"],
    country: "France",
    featured: false,
  },
  {
    name: "Vitamix",
    logo: "/images/brands/rational.svg",
    description: "Premium commercial blenders trusted by chefs worldwide.",
    productCount: 34,
    categories: ["Blenders", "Drink Machines"],
    country: "USA",
    featured: false,
  },
]

const featuredBrands = brands.filter((b) => b.featured)
const allBrandsAlphabetical = [...brands].sort((a, b) => a.name.localeCompare(b.name))

export default function BrandsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="mx-auto max-w-7xl px-4">
            <nav className="text-primary-foreground/60 mb-6 flex items-center gap-2 text-sm">
              <Link href="/" className="hover:text-primary-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary-foreground">Brands</span>
            </nav>
            <h1 className="font-display text-4xl font-bold">Our Brands</h1>
            <p className="text-primary-foreground/80 mt-4 max-w-2xl text-lg">
              We partner with the world&apos;s leading manufacturers to bring you the finest
              commercial kitchen equipment. Quality, reliability, and performance guaranteed.
            </p>
          </div>
        </section>

        {/* Featured Brands */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="font-display text-foreground text-2xl font-bold">Featured Brands</h2>
            <p className="text-muted-foreground mt-2">
              Premium brands we&apos;re proud to represent
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredBrands.map((brand) => (
                <Link
                  key={brand.name}
                  href={`/brands/${brand.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group border-border bg-card hover:border-foreground/20 rounded-xl border p-6 transition-all hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-16 w-32 items-center">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={120}
                        height={60}
                        className="h-8 w-auto object-contain"
                      />
                    </div>
                    <span className="bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs font-medium">
                      {brand.country}
                    </span>
                  </div>
                  <h3 className="text-foreground group-hover:text-accent mt-4 text-lg font-semibold transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
                    {brand.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {brand.categories.slice(0, 3).map((cat) => (
                      <span
                        key={cat}
                        className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      {brand.productCount} products
                    </span>
                    <span className="text-foreground group-hover:text-accent flex items-center text-sm font-medium transition-colors">
                      View Products
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Brands A-Z */}
        <section className="bg-secondary py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="font-display text-foreground text-2xl font-bold">All Brands A-Z</h2>
            <p className="text-muted-foreground mt-2">Browse our complete brand portfolio</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allBrandsAlphabetical.map((brand) => (
                <Link
                  key={brand.name}
                  href={`/brands/${brand.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group border-border bg-card hover:border-foreground/20 flex items-center justify-between rounded-lg border p-4 transition-all"
                >
                  <div>
                    <h3 className="text-foreground group-hover:text-accent font-medium transition-colors">
                      {brand.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">{brand.productCount} products</p>
                  </div>
                  <ArrowRight className="text-muted-foreground group-hover:text-accent h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Become a Partner CTA */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="bg-primary text-primary-foreground rounded-2xl p-8 text-center md:p-12">
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Interested in Partnership?
              </h2>
              <p className="text-primary-foreground/80 mx-auto mt-4 max-w-2xl">
                We&apos;re always looking to expand our brand portfolio with quality manufacturers.
                If you represent a premium kitchen equipment brand, let&apos;s talk.
              </p>
              <Link
                href="/contact"
                className="bg-accent text-accent-foreground hover:bg-accent/90 mt-6 inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-colors"
              >
                Contact Our Team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
