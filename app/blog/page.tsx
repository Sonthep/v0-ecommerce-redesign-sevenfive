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
            <nav className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-6">
              <Link href="/" className="hover:text-primary-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary-foreground">Blog & Guides</span>
            </nav>
            <h1 className="text-4xl font-bold">Blog & Buying Guides</h1>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">
              Expert insights, buying guides, and industry knowledge to help you make 
              informed decisions about your commercial kitchen equipment.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="flex gap-3 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={cat.slug === "all" ? "/blog" : `/blog/category/${cat.slug}`}
                  className="flex-shrink-0 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:border-foreground hover:bg-secondary transition-colors"
                >
                  {cat.name}
                  <span className="ml-2 text-muted-foreground">({cat.count})</span>
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
              className="group grid gap-8 md:grid-cols-2 items-center"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                    Featured
                  </span>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-accent">{featuredPost.category}</span>
                <h2 className="mt-2 text-2xl font-bold text-foreground md:text-3xl group-hover:text-accent transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <div className="mt-6 flex items-center text-sm font-medium text-foreground group-hover:text-accent transition-colors">
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
            <h2 className="text-2xl font-bold text-foreground">Latest Articles</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:border-foreground/20"
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
                    <span className="text-xs font-medium uppercase tracking-wider text-accent">
                      {post.category}
                    </span>
                    <h3 className="mt-2 font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-12 text-center">
              <button className="inline-flex items-center justify-center rounded-md border border-border bg-card px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                Load More Articles
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="rounded-2xl bg-primary p-8 md:p-12 text-center text-primary-foreground">
              <h2 className="text-2xl font-bold md:text-3xl">Stay Updated</h2>
              <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
                Subscribe to our newsletter for the latest industry insights, 
                buying guides, and exclusive offers.
              </p>
              <form className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-md bg-sidebar-accent px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  type="submit"
                  className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors"
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
