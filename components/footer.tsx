import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and tagline */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <span className="font-display font-bold text-xl text-secondary-foreground">
                Revulter Cultural Commerce
              </span>
            </Link>
            <p className="text-lg font-medium text-accent mb-4">Powering Africa's Creative Economy.</p>
            <p className="text-secondary-foreground/80 max-w-md">
              Empowering African creatives with secure ownership, global exposure, and fair monetization of their
              cultural works.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-secondary-foreground mb-4">Legal</h3>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-secondary-foreground/80 hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-secondary-foreground/80 hover:text-accent transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="block text-secondary-foreground/80 hover:text-accent transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-secondary-foreground mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-secondary-foreground/80 hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-secondary-foreground/80 hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-secondary-foreground/80 hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-secondary-foreground/80 hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-secondary-foreground/60">© 2024 Revulter Cultural Commerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
