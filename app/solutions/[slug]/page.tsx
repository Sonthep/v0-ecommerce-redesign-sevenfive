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

export default function SolutionDetailPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-80 md:h-96 overflow-hidden">
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
              <nav className="flex items-center gap-2 text-sm text-white/60 mb-4">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/solutions" className="hover:text-white transition-colors">
                  Solutions
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">{solutionData.name}</span>
              </nav>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {solutionData.name}
              </h1>
              <p className="mt-2 text-lg text-white/80 max-w-2xl">
                {solutionData.tagline}
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  Tailored Solutions for Your Restaurant
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
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
                    className="group rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md hover:border-foreground/20"
                  >
                    <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{cat.count} products</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-secondary py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-2xl font-bold text-foreground text-center md:text-3xl">
              What We Offer
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {solutionData.features.map((feature, index) => (
                <div key={feature.title} className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                    0{index + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recommended Products */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Recommended Equipment</h2>
                <p className="mt-2 text-muted-foreground">
                  Popular choices for restaurant kitchens
                </p>
              </div>
              <Link
                href="/category"
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
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
            <h2 className="text-2xl font-bold text-foreground text-center md:text-3xl">
              Success Stories
            </h2>
            <p className="mt-2 text-muted-foreground text-center">
              See how we&apos;ve helped restaurants like yours
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {solutionData.caseStudies.map((study) => (
                <div
                  key={study.name}
                  className="rounded-xl border border-border bg-card p-8"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{study.name}</h3>
                      <p className="text-sm text-muted-foreground">{study.location}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">{study.description}</p>
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-foreground">Results:</h4>
                    <ul className="mt-2 space-y-2">
                      {study.results.map((result) => (
                        <li key={result} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
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
            <div className="rounded-2xl bg-primary p-8 md:p-12 text-primary-foreground">
              <div className="grid gap-8 lg:grid-cols-2 items-center">
                <div>
                  <h2 className="text-2xl font-bold md:text-3xl">
                    Ready to Discuss Your Project?
                  </h2>
                  <p className="mt-4 text-primary-foreground/80">
                    Our restaurant specialists are ready to help you design the perfect kitchen. 
                    Get a free consultation and quote today.
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
                  <div className="flex items-center gap-4 rounded-lg bg-sidebar-accent p-4">
                    <Phone className="h-5 w-5 text-accent" />
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-sm text-primary-foreground/70">+66 2 123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-lg bg-sidebar-accent p-4">
                    <Mail className="h-5 w-5 text-accent" />
                    <div>
                      <p className="font-medium">Email Us</p>
                      <p className="text-sm text-primary-foreground/70">solutions@sevenfive.co.th</p>
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
