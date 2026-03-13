import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Truck, Shield, HeadphonesIcon, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"

const categories = [
  {
    name: "Cooking Equipment",
    description: "Ranges, ovens, fryers & more",
    image: "/images/categories/cooking.jpg",
    href: "/category/cooking-equipment",
  },
  {
    name: "Refrigeration",
    description: "Walk-ins, reach-ins & ice machines",
    image: "/images/categories/refrigeration.jpg",
    href: "/category/refrigeration",
  },
  {
    name: "Food Preparation",
    description: "Mixers, processors & slicers",
    image: "/images/categories/food-prep.jpg",
    href: "/category/food-preparation",
  },
  {
    name: "Beverage",
    description: "Coffee machines & blenders",
    image: "/images/categories/beverage.jpg",
    href: "/category/beverage",
  },
  {
    name: "Warewashing",
    description: "Dishwashers & glass washers",
    image: "/images/categories/warewashing.jpg",
    href: "/category/warewashing",
  },
  {
    name: "Bakery Equipment",
    description: "Ovens, proofers & displays",
    image: "/images/categories/bakery.jpg",
    href: "/category/bakery",
  },
]

const featuredProducts = [
  {
    id: "1",
    name: "Rational iCombi Pro 10-1/1 Electric Combi Oven",
    brand: "Rational",
    price: 485000,
    originalPrice: 520000,
    image: "/images/products/combi-oven.jpg",
    slug: "rational-icombi-pro-10-1-1",
    category: "Cooking Equipment",
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Hoshizaki IM-240ANE Ice Machine",
    brand: "Hoshizaki",
    price: 125000,
    image: "/images/products/ice-machine.jpg",
    slug: "hoshizaki-im-240ane",
    category: "Refrigeration",
    isNew: true,
  },
  {
    id: "3",
    name: "La Marzocco Linea PB Espresso Machine",
    brand: "La Marzocco",
    price: 380000,
    image: "/images/products/espresso-machine.jpg",
    slug: "la-marzocco-linea-pb",
    category: "Beverage",
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
]

const brands = [
  { name: "Rational", logo: "/images/brands/rational.svg" },
  { name: "Hoshizaki", logo: "/images/brands/hoshizaki.svg" },
  { name: "La Marzocco", logo: "/images/brands/la-marzocco.svg" },
  { name: "True", logo: "/images/brands/true.svg" },
  { name: "Electrolux", logo: "/images/brands/electrolux.svg" },
  { name: "Winterhalter", logo: "/images/brands/winterhalter.svg" },
]

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "On orders over 5,000 THB",
  },
  {
    icon: Shield,
    title: "Best Price Guarantee",
    description: "Competitive pricing always",
  },
  {
    icon: HeadphonesIcon,
    title: "365 Days Support",
    description: "24/7 after-sales service",
  },
  {
    icon: Award,
    title: "30,000+ Products",
    description: "Extensive selection",
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-5" />
          <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-32 lg:py-40">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
              <div className="max-w-xl">
                <p className="text-primary-foreground/60 text-sm font-medium tracking-widest uppercase">
                  Professional Kitchen Solutions
                </p>
                <h1 className="font-display mt-4 text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">
                  Equip Your Kitchen for Excellence
                </h1>
                <p className="text-primary-foreground/80 mt-6 text-lg leading-relaxed">
                  Thailand&apos;s trusted partner for commercial kitchen equipment. Over 30,000
                  products from world-leading brands with expert consultation and comprehensive
                  after-sales support.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                    asChild
                  >
                    <Link href="/category">
                      Browse Products
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                    asChild
                  >
                    <Link href="/contact">Get a Quote</Link>
                  </Button>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src="/images/hero-kitchen.jpg"
                    alt="Professional commercial kitchen"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Stats overlay */}
                <div className="bg-card absolute -bottom-6 -left-6 rounded-xl p-6 shadow-xl">
                  <p className="text-foreground text-4xl font-bold">30K+</p>
                  <p className="text-muted-foreground text-sm">Products Available</p>
                </div>
                <div className="bg-card absolute top-1/4 -right-6 rounded-xl p-6 shadow-xl">
                  <p className="text-foreground text-4xl font-bold">25+</p>
                  <p className="text-muted-foreground text-sm">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bar */}
        <section className="border-border bg-card border-b">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-center gap-4">
                  <div className="bg-secondary flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                    <feature.icon className="text-foreground h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-medium">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase">
                  Shop by Category
                </p>
                <h2 className="font-display text-foreground mt-2 text-3xl font-bold">
                  Equipment Categories
                </h2>
              </div>
              <Link
                href="/category"
                className="text-foreground hover:text-accent hidden items-center gap-2 text-sm font-medium transition-colors sm:flex"
              >
                View All Categories
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className={`group relative overflow-hidden rounded-xl ${
                    index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
                  }`}
                >
                  <div
                    className={`relative ${index === 0 ? "aspect-[2/1] lg:aspect-square" : "aspect-[4/3]"}`}
                  >
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <h3
                        className={`font-semibold text-white ${index === 0 ? "text-2xl lg:text-3xl" : "text-xl"}`}
                      >
                        {category.name}
                      </h3>
                      <p className="mt-1 text-sm text-white/80">{category.description}</p>
                      <span className="group-hover:text-accent mt-3 inline-flex items-center text-sm font-medium text-white transition-colors">
                        Shop Now
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="bg-secondary py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase">
                  Curated Selection
                </p>
                <h2 className="font-display text-foreground mt-2 text-3xl font-bold">
                  Featured Products
                </h2>
              </div>
              <Link
                href="/products"
                className="text-foreground hover:text-accent hidden items-center gap-2 text-sm font-medium transition-colors sm:flex"
              >
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Industry Solutions */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase">
                Tailored Solutions
              </p>
              <h2 className="font-display text-foreground mt-2 text-3xl font-bold">
                Solutions by Industry
              </h2>
              <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
                We understand that every business has unique requirements. Our experts can help
                design the perfect kitchen setup for your specific needs.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: "Restaurants",
                  image: "/images/solutions/restaurant.jpg",
                  href: "/solutions/restaurants",
                },
                { name: "Hotels", image: "/images/solutions/hotel.jpg", href: "/solutions/hotels" },
                { name: "Cafes", image: "/images/solutions/cafe.jpg", href: "/solutions/cafes" },
                {
                  name: "Bakeries",
                  image: "/images/solutions/bakery.jpg",
                  href: "/solutions/bakeries",
                },
              ].map((solution) => (
                <Link
                  key={solution.name}
                  href={solution.href}
                  className="group relative aspect-[3/4] overflow-hidden rounded-xl"
                >
                  <Image
                    src={solution.image}
                    alt={solution.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-semibold text-white">{solution.name}</h3>
                    <span className="group-hover:text-accent mt-2 inline-flex items-center text-sm font-medium text-white/80 transition-colors">
                      Explore Solutions
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Brands */}
        <section className="border-border bg-card border-y py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase">
                Trusted Partners
              </p>
              <h2 className="font-display text-foreground mt-2 text-3xl font-bold">
                World-Leading Brands
              </h2>
            </div>

            <div className="grid grid-cols-3 items-center gap-8 md:grid-cols-6">
              {brands.map((brand) => (
                <Link
                  key={brand.name}
                  href={`/brands/${brand.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-center justify-center p-4 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                >
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={120}
                    height={60}
                    className="h-8 w-auto object-contain"
                  />
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/brands"
                className="text-foreground hover:text-accent inline-flex items-center gap-2 text-sm font-medium transition-colors"
              >
                View All Brands
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h2 className="font-display text-3xl font-bold text-balance md:text-4xl">
              Ready to Equip Your Kitchen?
            </h2>
            <p className="text-primary-foreground/80 mx-auto mt-4 max-w-2xl text-lg">
              Our team of experts is ready to help you find the perfect equipment for your
              commercial kitchen. Get in touch for a personalized consultation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                asChild
              >
                <Link href="/contact">
                  Request a Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/blog">Read Buying Guides</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
