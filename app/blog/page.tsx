import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ArrowRight, Clock, User } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const categories = [
  { name: "All", slug: "all", count: 45 },
  { name: "Buying Guides", slug: "buying-guides", count: 18 },
  { name: "Industry Trends", slug: "industry-trends", count: 12 },
  { name: "Tips & Best Practices", slug: "tips", count: 9 },
  { name: "Case Studies", slug: "case-studies", count: 6 },
]

const featuredPost = {
  title: "The Complete Guide to Choosing a Commercial Combi Oven",
  excerpt:
    "Everything you need to know about selecting the right combi oven for your commercial kitchen. From capacity considerations to energy efficiency, we cover all the key factors.",
  image: "/images/products/combi-oven.jpg",
  author: "Kitchen Expert Team",
  date: "March 10, 2026",
  readTime: "15 min read",
  category: "Buying Guides",
  slug: "complete-guide-commercial-combi-oven",
}

const posts = [
  {
    title: "How to Calculate the Right Ice Machine Capacity",
    excerpt:
      "Learn the formula for determining the perfect ice production capacity based on your establishment type and peak usage.",
    image: "/images/products/ice-machine.jpg",
    author: "Technical Team",
    date: "March 8, 2026",
    readTime: "8 min read",
    category: "Buying Guides",
    slug: "calculate-ice-machine-capacity",
  },
  {
    title: "Energy Efficiency in Commercial Kitchens: 2026 Guide",
    excerpt:
      "Discover the latest energy-efficient equipment and practices that can reduce your kitchen's operating costs by up to 30%.",
    image: "/images/categories/cooking.jpg",
    author: "Sustainability Team",
    date: "March 5, 2026",
    readTime: "10 min read",
    category: "Industry Trends",
    slug: "energy-efficiency-commercial-kitchens-2026",
  },
  {
    title: "Setting Up a Coffee Station: Essential Equipment List",
    excerpt:
      "A comprehensive checklist of equipment needed to create a profitable and efficient coffee station in your cafe or restaurant.",
    image: "/images/products/espresso-machine.jpg",
    author: "Barista Consultant",
    date: "March 1, 2026",
    readTime: "12 min read",
    category: "Tips & Best Practices",
    slug: "coffee-station-equipment-list",
  },
  {
    title: "Understanding HACCP Requirements for Kitchen Equipment",
    excerpt:
      "A guide to ensuring your commercial kitchen equipment meets HACCP standards for food safety compliance.",
    image: "/images/categories/food-prep.jpg",
    author: "Compliance Team",
    date: "February 25, 2026",
    readTime: "7 min read",
    category: "Tips & Best Practices",
    slug: "haccp-kitchen-equipment-requirements",
  },
  {
    title: "Walk-in vs. Reach-in: Choosing the Right Refrigeration",
    excerpt:
      "Compare the pros and cons of walk-in coolers versus reach-in refrigerators for different kitchen sizes and needs.",
    image: "/images/categories/refrigeration.jpg",
    author: "Kitchen Expert Team",
    date: "February 20, 2026",
    readTime: "9 min read",
    category: "Buying Guides",
    slug: "walk-in-vs-reach-in-refrigeration",
  },
  {
    title: "Case Study: How We Designed a 5-Star Hotel Kitchen",
    excerpt:
      "An inside look at the planning, equipment selection, and installation process for a luxury hotel's central kitchen.",
    image: "/images/solutions/hotel.jpg",
    author: "Project Team",
    date: "February 15, 2026",
    readTime: "14 min read",
    category: "Case Studies",
    slug: "case-study-5-star-hotel-kitchen",
  },
]

export default function BlogPage() {
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
              <span className="text-primary-foreground">Blog & Guides</span>
            </nav>
            <h1 className="font-display text-4xl font-bold">Blog & Buying Guides</h1>
            <p className="text-primary-foreground/80 mt-4 max-w-2xl text-lg">
              Expert insights, buying guides, and industry knowledge to help you make informed
              decisions about your commercial kitchen equipment.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="border-border bg-card border-b">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="scrollbar-hide -mb-2 flex gap-3 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={cat.slug === "all" ? "/blog" : `/blog/category/${cat.slug}`}
                  className="border-border bg-background text-foreground hover:border-foreground hover:bg-secondary flex-shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                >
                  {cat.name}
                  <span className="text-muted-foreground ml-2">({cat.count})</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group grid items-center gap-8 md:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-accent text-accent-foreground rounded-full px-3 py-1 text-xs font-medium">
                    Featured
                  </span>
                </div>
              </div>
              <div>
                <span className="text-accent text-sm font-medium">{featuredPost.category}</span>
                <h2 className="font-display text-foreground group-hover:text-accent mt-2 text-2xl font-bold transition-colors md:text-3xl">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground mt-4 leading-relaxed">{featuredPost.excerpt}</p>
                <div className="text-muted-foreground mt-6 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <div className="text-foreground group-hover:text-accent mt-6 flex items-center text-sm font-medium transition-colors">
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* All Posts */}
        <section className="bg-secondary py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="font-display text-foreground text-2xl font-bold">Latest Articles</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group border-border bg-card hover:border-foreground/20 overflow-hidden rounded-xl border transition-all hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-accent text-xs font-medium tracking-wider uppercase">
                      {post.category}
                    </span>
                    <h3 className="text-foreground group-hover:text-accent mt-2 line-clamp-2 font-semibold transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
                      {post.excerpt}
                    </p>
                    <div className="text-muted-foreground mt-4 flex items-center gap-4 text-xs">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-12 text-center">
              <button className="border-border bg-card text-foreground hover:bg-secondary inline-flex items-center justify-center rounded-md border px-6 py-3 text-sm font-medium transition-colors">
                Load More Articles
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="bg-primary text-primary-foreground rounded-2xl p-8 text-center md:p-12">
              <h2 className="font-display text-2xl font-bold md:text-3xl">Stay Updated</h2>
              <p className="text-primary-foreground/80 mx-auto mt-4 max-w-xl">
                Subscribe to our newsletter for the latest industry insights, buying guides, and
                exclusive offers.
              </p>
              <form className="mx-auto mt-8 flex max-w-md flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-sidebar-accent text-primary-foreground placeholder:text-primary-foreground/50 focus:ring-accent flex-1 rounded-md px-4 py-3 text-sm focus:ring-2 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-md px-6 py-3 text-sm font-medium transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
