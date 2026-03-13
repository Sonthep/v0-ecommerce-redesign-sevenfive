import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ArrowRight, CheckCircle2 } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const industries = [
  {
    name: "Restaurants",
    slug: "restaurants",
    image: "/images/solutions/restaurant.jpg",
    description:
      "From fine dining to fast casual, we provide complete kitchen solutions tailored to your restaurant concept.",
    features: [
      "Custom kitchen layout design",
      "High-volume cooking equipment",
      "Efficient workflow optimization",
      "Energy-efficient solutions",
    ],
  },
  {
    name: "Hotels",
    slug: "hotels",
    image: "/images/solutions/hotel.jpg",
    description:
      "Comprehensive hospitality kitchen solutions for hotels of all sizes, from boutique to large-scale operations.",
    features: [
      "Multiple kitchen coordination",
      "Banquet and event equipment",
      "Room service solutions",
      "24/7 operation capability",
    ],
  },
  {
    name: "Cafes & Coffee Shops",
    slug: "cafes",
    image: "/images/solutions/cafe.jpg",
    description:
      "Specialty coffee equipment and cafe solutions to create the perfect customer experience.",
    features: [
      "Premium espresso machines",
      "Display and merchandising",
      "Compact space solutions",
      "Quick-service equipment",
    ],
  },
  {
    name: "Bakeries",
    slug: "bakeries",
    image: "/images/solutions/bakery.jpg",
    description:
      "Professional baking equipment for artisan bakeries, patisseries, and large-scale production facilities.",
    features: [
      "Deck and convection ovens",
      "Proofers and retarders",
      "Mixing equipment",
      "Display solutions",
    ],
  },
  {
    name: "Healthcare",
    slug: "healthcare",
    image: "/images/solutions/restaurant.jpg",
    description:
      "Specialized kitchen equipment for hospitals, clinics, and healthcare facilities with strict hygiene requirements.",
    features: [
      "HACCP-compliant equipment",
      "Dietary management systems",
      "Efficient meal production",
      "Easy-clean surfaces",
    ],
  },
  {
    name: "Education",
    slug: "education",
    image: "/images/solutions/hotel.jpg",
    description:
      "School and university kitchen solutions designed for high-volume meal production and safety.",
    features: [
      "High-capacity equipment",
      "Safety-focused design",
      "Nutritional compliance",
      "Budget-conscious options",
    ],
  },
]

const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "25+", label: "Years Experience" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "24/7", label: "Support Available" },
]

export default function SolutionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="mx-auto max-w-7xl px-4">
            <nav className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-6">
              <Link href="/" className="hover:text-primary-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary-foreground">Solutions</span>
            </nav>
            <h1 className="text-4xl font-bold">Industry Solutions</h1>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">
              Every business has unique needs. Our team of experts designs customized 
              kitchen solutions that maximize efficiency, quality, and return on investment.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-foreground md:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">Solutions by Industry</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Select your industry to explore tailored equipment solutions and see 
                how we&apos;ve helped similar businesses succeed.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/solutions/${industry.slug}`}
                  className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:border-foreground/20"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={industry.image}
                      alt={industry.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-semibold text-white">{industry.name}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground">{industry.description}</p>
                    <ul className="mt-4 space-y-2">
                      {industry.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex items-center text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="bg-secondary py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">Our Process</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                From initial consultation to after-sales support, we guide you through 
                every step of your kitchen project.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Consultation",
                  description:
                    "We discuss your requirements, budget, and vision for your commercial kitchen.",
                },
                {
                  step: "02",
                  title: "Design",
                  description:
                    "Our experts create a customized layout and equipment plan optimized for your space.",
                },
                {
                  step: "03",
                  title: "Installation",
                  description:
                    "Professional installation by certified technicians with minimal disruption.",
                },
                {
                  step: "04",
                  title: "Support",
                  description:
                    "Ongoing maintenance, training, and 24/7 support to keep your kitchen running.",
                },
              ].map((item) => (
                <div key={item.step} className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    {item.step}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="rounded-2xl bg-primary p-8 md:p-12 text-center text-primary-foreground">
              <h2 className="text-2xl font-bold md:text-3xl text-balance">
                Ready to Transform Your Kitchen?
              </h2>
              <p className="mt-4 text-primary-foreground/80 max-w-2xl mx-auto">
                Let our experts design the perfect solution for your business. 
                Get a free consultation and quote today.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors"
                >
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/category"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/30 px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
                >
                  Browse Equipment
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
