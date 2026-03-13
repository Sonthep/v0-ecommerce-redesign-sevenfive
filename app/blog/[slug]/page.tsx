import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Clock, User, Share2, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

// Mock data - in production this would come from an API/CMS
const post = {
  title: "The Complete Guide to Choosing a Commercial Combi Oven",
  excerpt:
    "Everything you need to know about selecting the right combi oven for your commercial kitchen. From capacity considerations to energy efficiency, we cover all the key factors.",
  image: "/images/products/combi-oven.jpg",
  author: "Kitchen Expert Team",
  date: "March 10, 2026",
  readTime: "15 min read",
  category: "Buying Guides",
  categorySlug: "buying-guides",
  content: `
    <p>A combi oven, short for combination oven, is one of the most versatile and essential pieces of equipment in any professional kitchen. Whether you're running a restaurant, hotel, or catering operation, choosing the right combi oven can significantly impact your kitchen's efficiency and the quality of food you produce.</p>
    
    <h2>What is a Combi Oven?</h2>
    <p>A combi oven combines three cooking methods in one unit: convection (hot air), steam, and a combination of both. This versatility allows chefs to bake, roast, steam, poach, grill, and even smoke foods all in the same appliance.</p>
    
    <h2>Key Factors to Consider</h2>
    
    <h3>1. Capacity (Size)</h3>
    <p>Combi ovens are sized according to their gastronorm (GN) capacity. The most common sizes are:</p>
    <ul>
      <li><strong>6 x 1/1 GN:</strong> Ideal for smaller operations serving 50-100 meals</li>
      <li><strong>10 x 1/1 GN:</strong> Suitable for medium-sized kitchens (100-200 meals)</li>
      <li><strong>20 x 1/1 GN:</strong> Best for high-volume operations (200+ meals)</li>
    </ul>
    
    <h3>2. Power Source</h3>
    <p>Combi ovens come in both electric and gas models. Consider:</p>
    <ul>
      <li><strong>Electric:</strong> More precise temperature control, easier installation, lower upfront cost</li>
      <li><strong>Gas:</strong> Lower operating costs in some regions, faster heat-up times</li>
    </ul>
    
    <h3>3. Technology Features</h3>
    <p>Modern combi ovens offer various technological advancements:</p>
    <ul>
      <li>Automatic cooking programs</li>
      <li>Multi-point temperature probes</li>
      <li>Self-cleaning systems</li>
      <li>HACCP data logging</li>
      <li>Remote monitoring capabilities</li>
    </ul>
    
    <h2>Top Brands to Consider</h2>
    <p>When investing in a combi oven, consider these industry-leading brands:</p>
    <ul>
      <li><strong>Rational:</strong> The market leader known for iCookingSuite technology</li>
      <li><strong>Electrolux:</strong> Excellent build quality and energy efficiency</li>
      <li><strong>UNOX:</strong> Innovative features at competitive prices</li>
      <li><strong>Alto-Shaam:</strong> Known for their Combitherm technology</li>
    </ul>
    
    <h2>Installation Requirements</h2>
    <p>Before purchasing, ensure your kitchen can accommodate:</p>
    <ul>
      <li>Adequate electrical or gas supply</li>
      <li>Water connection for steam generation</li>
      <li>Drainage for cleaning and steam discharge</li>
      <li>Proper ventilation (hood requirements vary by model)</li>
    </ul>
    
    <h2>Budget Considerations</h2>
    <p>Combi oven prices vary widely based on size, features, and brand. Consider not just the initial purchase price, but also:</p>
    <ul>
      <li>Operating costs (energy consumption)</li>
      <li>Maintenance and service contracts</li>
      <li>Staff training requirements</li>
      <li>Potential return on investment through improved efficiency</li>
    </ul>
    
    <h2>Conclusion</h2>
    <p>Choosing the right combi oven is a significant investment that will impact your kitchen operations for years to come. Take time to assess your needs, compare options, and consult with equipment specialists to find the perfect match for your operation.</p>
  `,
}

const relatedPosts = [
  {
    title: "How to Calculate the Right Ice Machine Capacity",
    image: "/images/products/ice-machine.jpg",
    date: "March 8, 2026",
    slug: "calculate-ice-machine-capacity",
  },
  {
    title: "Energy Efficiency in Commercial Kitchens: 2026 Guide",
    image: "/images/categories/cooking.jpg",
    date: "March 5, 2026",
    slug: "energy-efficiency-commercial-kitchens-2026",
  },
  {
    title: "Understanding HACCP Requirements for Kitchen Equipment",
    image: "/images/categories/food-prep.jpg",
    date: "February 25, 2026",
    slug: "haccp-kitchen-equipment-requirements",
  },
]

export async function generateStaticParams() {
  return [
    { slug: "choosing-commercial-combi-oven" },
    { slug: "energy-efficiency-commercial-kitchen" },
    { slug: "haccp-kitchen-equipment-requirements" },
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  await params
  return {
    title: `${post.title} | SevenFive Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  await params
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-secondary border-border border-b">
          <div className="mx-auto max-w-4xl px-4 py-8">
            <nav className="text-muted-foreground mb-6 flex items-center gap-2 text-sm">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                href={`/blog/category/${post.categorySlug}`}
                className="hover:text-foreground transition-colors"
              >
                {post.category}
              </Link>
            </nav>
            <span className="text-accent text-sm font-medium">{post.category}</span>
            <h1 className="text-foreground font-display mt-2 text-3xl font-bold text-balance md:text-4xl">
              {post.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">{post.excerpt}</p>
            <div className="text-muted-foreground mt-6 flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
              <span>{post.date}</span>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-8">
          <div className="mx-auto max-w-4xl px-4">
            <div className="relative aspect-[2/1] overflow-hidden rounded-xl">
              <Image src={post.image} alt={post.title} fill className="object-cover" priority />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-16">
          <div className="mx-auto max-w-4xl px-4">
            <div className="grid gap-8 lg:grid-cols-12">
              {/* Share buttons (sticky sidebar) */}
              <aside className="hidden lg:col-span-1 lg:block">
                <div className="sticky top-24 flex flex-col gap-3">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                </div>
              </aside>

              {/* Article content */}
              <article className="lg:col-span-11">
                <div
                  className="prose prose-lg prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-a:text-accent prose-a:no-underline hover:prose-a:underline max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                <div className="border-border mt-12 flex flex-wrap gap-2 border-t pt-8">
                  {["Combi Ovens", "Buying Guide", "Kitchen Equipment", "Cooking"].map((tag) => (
                    <span
                      key={tag}
                      className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Author */}
                <div className="bg-secondary mt-8 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
                      <User className="text-muted-foreground h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-foreground font-semibold">{post.author}</p>
                      <p className="text-muted-foreground mt-1 text-sm">
                        Our team of kitchen equipment specialists with decades of combined
                        experience helping businesses find the right equipment.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="border-border mt-12 grid gap-4 border-t pt-8 sm:grid-cols-2">
                  <Link
                    href="/blog"
                    className="group border-border hover:border-foreground/20 flex items-center gap-3 rounded-lg border p-4 transition-colors"
                  >
                    <ArrowLeft className="text-muted-foreground h-5 w-5 transition-transform group-hover:-translate-x-1" />
                    <div>
                      <p className="text-muted-foreground text-xs">Previous</p>
                      <p className="text-foreground text-sm font-medium">Back to Blog</p>
                    </div>
                  </Link>
                  <Link
                    href="/blog/calculate-ice-machine-capacity"
                    className="group border-border hover:border-foreground/20 flex items-center justify-between gap-3 rounded-lg border p-4 transition-colors"
                  >
                    <div className="text-right">
                      <p className="text-muted-foreground text-xs">Next Article</p>
                      <p className="text-foreground line-clamp-1 text-sm font-medium">
                        How to Calculate Ice Machine Capacity
                      </p>
                    </div>
                    <ArrowRight className="text-muted-foreground h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="bg-secondary py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-foreground font-display text-2xl font-bold">Related Articles</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group border-border bg-card hover:border-foreground/20 overflow-hidden rounded-xl border transition-all hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-foreground group-hover:text-accent line-clamp-2 font-semibold transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm">{relatedPost.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="bg-primary text-primary-foreground rounded-2xl p-8 text-center md:p-12">
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Ready to Choose Your Equipment?
              </h2>
              <p className="text-primary-foreground/80 mx-auto mt-4 max-w-xl">
                Our experts are here to help you find the perfect equipment for your kitchen. Get
                personalized recommendations and competitive pricing.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-colors"
                >
                  Contact an Expert
                </Link>
                <Link
                  href="/category"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 inline-flex items-center justify-center rounded-md border px-6 py-3 text-sm font-medium transition-colors"
                >
                  Browse Products
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
