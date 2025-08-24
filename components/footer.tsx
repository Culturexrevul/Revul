import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <span className="font-display font-bold text-lg sm:text-xl text-secondary-foreground">
                <span className="sm:hidden">Revulter</span>
                <span className="hidden sm:inline">Revulter Cultural Commerce</span>
              </span>
            </Link>
            <p className="text-base sm:text-lg font-medium text-accent mb-3 sm:mb-4">
              Powering Africa's Creative Economy.
            </p>
            <p className="text-sm sm:text-base text-secondary-foreground/80 max-w-md leading-relaxed">
              Empowering African creatives with secure ownership, global exposure, and fair monetization of their
              cultural works.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-secondary-foreground mb-3 sm:mb-4 text-sm sm:text-base">Legal</h3>
            <div className="space-y-2">
              <Link
                href="/privacy"
                className="block text-sm sm:text-base text-secondary-foreground/80 hover:text-accent transition-colors py-1"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block text-sm sm:text-base text-secondary-foreground/80 hover:text-accent transition-colors py-1"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="block text-sm sm:text-base text-secondary-foreground/80 hover:text-accent transition-colors py-1"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-secondary-foreground mb-3 sm:mb-4 text-sm sm:text-base">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-secondary-foreground/80 hover:text-accent transition-colors p-2 -m-2"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-secondary-foreground/80 hover:text-accent transition-colors p-2 -m-2"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-secondary-foreground/80 hover:text-accent transition-colors p-2 -m-2"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-secondary-foreground/80 hover:text-accent transition-colors p-2 -m-2"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-secondary-foreground/60">
            © 2024 Revulter Cultural Commerce. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
