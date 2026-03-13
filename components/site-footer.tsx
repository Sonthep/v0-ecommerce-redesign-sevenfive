import Link from "next/link"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  categories: [
    { name: "Cooking Equipment", href: "/category/cooking-equipment" },
    { name: "Refrigeration", href: "/category/refrigeration" },
    { name: "Food Preparation", href: "/category/food-preparation" },
    { name: "Beverage", href: "/category/beverage" },
    { name: "Warewashing", href: "/category/warewashing" },
  ],
  solutions: [
    { name: "Restaurants", href: "/solutions/restaurants" },
    { name: "Hotels", href: "/solutions/hotels" },
    { name: "Cafes", href: "/solutions/cafes" },
    { name: "Bakeries", href: "/solutions/bakeries" },
    { name: "Healthcare", href: "/solutions/healthcare" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Brands", href: "/brands" },
    { name: "Blog & Guides", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers" },
  ],
  support: [
    { name: "After-Sales Service", href: "/support/after-sales" },
    { name: "Warranty", href: "/support/warranty" },
    { name: "Delivery Information", href: "/support/delivery" },
    { name: "Installation", href: "/support/installation" },
    { name: "FAQ", href: "/support/faq" },
  ],
}

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight">SEVENFIVE</span>
                <span className="text-[10px] tracking-[0.2em] text-primary-foreground/60">
                  KITCHEN EQUIPMENT
                </span>
              </div>
            </Link>
            <p className="mt-6 text-sm text-primary-foreground/70 leading-relaxed max-w-sm">
              Thailand&apos;s trusted partner for professional kitchen equipment. 
              Over 30,000 products from world-leading brands with 365 days of after-sales service.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-accent text-primary-foreground transition-colors hover:bg-accent"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-accent text-primary-foreground transition-colors hover:bg-accent"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-accent text-primary-foreground transition-colors hover:bg-accent"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Categories</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Solutions</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-accent" />
                <div>
                  <p className="text-sm text-primary-foreground/70">+66 2 123 4567</p>
                  <p className="text-xs text-primary-foreground/50">Mon-Sat 8am-6pm</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-accent" />
                <p className="text-sm text-primary-foreground/70">info@sevenfive.co.th</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                <p className="text-sm text-primary-foreground/70">
                  123 Industrial District, Bangkok 10110, Thailand
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-sidebar-border">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-primary-foreground/50">
              &copy; {new Date().getFullYear()} SevenFive Co., Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-xs text-primary-foreground/50 hover:text-primary-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-primary-foreground/50 hover:text-primary-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
