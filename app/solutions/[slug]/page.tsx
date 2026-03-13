import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ArrowRight, CheckCircle2, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"

// Mock data - in production this would come from an API/database
const solutionData = {
  name: "Restaurant Solutions",
  tagline: "Complete Kitchen Solutions for Every Restaurant Concept",
  image: "/images/solutions/restaurant.jpg",
  description:
    "Whether you're opening a fine dining establishment, a fast-casual concept, or a high-volume quick-service restaurant, we have the expertise and equipment to make your kitchen vision a reality. Our restaurant solutions are designed to maximize efficiency, ensure food quality, and optimize your workflow.",
  features: [
    {
      title: "Custom Kitchen Design",
      description:
        "Our expert team designs kitchen layouts that optimize workflow, maximize space utilization, and ensure smooth operations during peak hours.",
    },
    {
      title: "Equipment Selection",
      description:
        "We help you choose the right equipment from our extensive catalog, balancing performance, energy efficiency, and budget requirements.",
    },
    {
      title: "Installation & Training",
      description:
        "Professional installation by certified technicians, followed by comprehensive training for your kitchen staff.",
    },
    {
      title: "Ongoing Support",
      description:
        "24/7 after-sales support, preventive maintenance programs, and rapid response for any issues that arise.",
    },
  ],
  categories: [
    { name: "Cooking Equipment", count: 450, href: "/category/cooking-equipment" },
    { name: "Refrigeration", count: 320, href: "/category/refrigeration" },
    { name: "Food Preparation", count: 280, href: "/category/food-preparation" },
    { name: "Warewashing", count: 120, href: "/category/warewashing" },
  ],
  caseStudies: [
    {
      name: "Fine Dining Restaurant",
      location: "Bangkok",
      description: "Complete kitchen renovation for a 120-seat upscale restaurant.",
      results: ["40% improved efficiency", "30% energy savings", "Michelin-ready kitchen"],
    },
    {
      name: "Fast Casual Chain",
      location: "Multiple Locations",
      description: "Standardized kitchen equipment across 15 locations.",
      results: ["Consistent food quality", "Simplified training", "Reduced maintenance costs"],
    },
  ],
}

const recommendedProducts = [
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
    name: "True TWT-72SD-HC Work Top Refrigerator",
    brand: "True",
    price: 89000,
    originalPrice: 98000,
    image: "/images/products/worktop-refrigerator.jpg",
    slug: "true-twt-72sd-hc",
    category: "Refrigeration",
  },
  {
    id: "3",
    name: "Winterhalter UC-M Undercounter Dishwasher",
    brand: "Winterhalter",
    price: 145000,
    image: "/images/products/combi-oven.jpg",
    slug: "winterhalter-uc-m",
    category: "Warewashing",
    isNew: true,
  },
  {
    id: "4",
    name: "Robot Coupe R301 Ultra Food Processor",
    brand: "Robot Coupe",
    price: 38000,
    image: "/images/products/combi-oven.jpg",
    slug: "robot-coupe-r301-ultra",
    category: "Food Preparation",
  },
]

export async function generateStaticParams() {
  return [
    { slug: "restaurant" },
    { slug: "hotel" },
    { slug: "cafe" },
    { slug: "catering" },
    { slug: "bakery" },
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  await params
  return {
    title: `${solutionData.name} | SevenFive`,
    description: solutionData.description,
    openGraph: {
      title: solutionData.name,
      description: solutionData.description,
      images: [solutionData.image],
    },
  }
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  await params
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-80 overflow-hidden md:h-96">
          <Image
            src={solutionData.image}
            alt={solutionData.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="mx-auto w-full max-w-7xl px-4 pb-12">
              <nav className="mb-4 flex items-center gap-2 text-sm text-white/60">
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/solutions" className="transition-colors hover:text-white">
                  Solutions
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">{solutionData.name}</span>
              </nav>
              <h1 className="font-display text-3xl font-bold text-white md:text-4xl">
                {solutionData.name}
              </h1>
              <p className="mt-2 max-w-2xl text-lg text-white/80">{solutionData.tagline}</p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-foreground text-2xl font-bold md:text-3xl">
                  Tailored Solutions for Your Restaurant
                </h2>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  {solutionData.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">
                      Get a Free Consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/category">Browse Equipment</Link>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {solutionData.categories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className="group border-border bg-card hover:border-foreground/20 rounded-xl border p-6 transition-all hover:shadow-md"
                  >
                    <h3 className="text-foreground group-hover:text-accent font-semibold transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-sm">{cat.count} products</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-secondary py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-foreground text-center text-2xl font-bold md:text-3xl">
              What We Offer
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {solutionData.features.map((feature, index) => (
                <div key={feature.title} className="relative">
                  <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold">
                    0{index + 1}
                  </div>
                  <h3 className="text-foreground mt-4 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recommended Products */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-foreground text-2xl font-bold">Recommended Equipment</h2>
                <p className="text-muted-foreground mt-2">
                  Popular choices for restaurant kitchens
                </p>
              </div>
              <Link
                href="/category"
                className="text-foreground hover:text-accent hidden items-center gap-2 text-sm font-medium transition-colors sm:flex"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="bg-secondary py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-foreground text-center text-2xl font-bold md:text-3xl">
              Success Stories
            </h2>
            <p className="text-muted-foreground mt-2 text-center">
              See how we&apos;ve helped restaurants like yours
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {solutionData.caseStudies.map((study) => (
                <div key={study.name} className="border-border bg-card rounded-xl border p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-foreground text-lg font-semibold">{study.name}</h3>
                      <p className="text-muted-foreground text-sm">{study.location}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-4">{study.description}</p>
                  <div className="mt-6">
                    <h4 className="text-foreground text-sm font-medium">Results:</h4>
                    <ul className="mt-2 space-y-2">
                      {study.results.map((result) => (
                        <li key={result} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="text-accent h-4 w-4 shrink-0" />
                          <span className="text-muted-foreground">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12">
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <h2 className="text-2xl font-bold md:text-3xl">Ready to Discuss Your Project?</h2>
                  <p className="text-primary-foreground/80 mt-4">
                    Our restaurant specialists are ready to help you design the perfect kitchen. Get
                    a free consultation and quote today.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Button
                      size="lg"
                      className="bg-accent text-accent-foreground hover:bg-accent/90"
                      asChild
                    >
                      <Link href="/contact">
                        Schedule Consultation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-sidebar-accent flex items-center gap-4 rounded-lg p-4">
                    <Phone className="text-accent h-5 w-5" />
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-primary-foreground/70 text-sm">+66 2 123 4567</p>
                    </div>
                  </div>
                  <div className="bg-sidebar-accent flex items-center gap-4 rounded-lg p-4">
                    <Mail className="text-accent h-5 w-5" />
                    <div>
                      <p className="font-medium">Email Us</p>
                      <p className="text-primary-foreground/70 text-sm">
                        solutions@sevenfive.co.th
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
