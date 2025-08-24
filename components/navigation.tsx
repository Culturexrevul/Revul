"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X, ArrowLeft, Home } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/ThemeToggle"

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/register", label: "Register IP" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/licensing", label: "Licensing Hub" },
    { href: "/legal", label: "Legal Assist" },
    { href: "/creator-id", label: "Creator ID" },
    { href: "/hire-creators", label: "Creator Hub" },
    { href: "/dashboard", label: "Investor Dashboard" },
    { href: "/about", label: "About" },
  ]

  const isActivePath = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push("/")
    }
  }

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            {pathname !== "/" && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="p-2 hover:bg-accent/10 back-button"
                  aria-label="Go back"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="p-2 hover:bg-accent/10"
                  aria-label="Go to homepage"
                >
                  <Link href="/">
                    <Home className="h-4 w-4" />
                  </Link>
                </Button>
              </>
            )}
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="font-display font-bold text-xl text-foreground">Revulter Cultural Commerce</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors font-medium px-2 py-1 rounded-md ${
                  isActivePath(item.href)
                    ? "text-accent bg-accent/10 font-semibold"
                    : "text-foreground hover:text-accent hover:bg-accent/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="h-6 w-px bg-border mx-2" />
            <ThemeToggle />
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/register">Register IP</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <div className="h-6 w-px bg-border mx-1" />
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors font-medium px-2 py-3 rounded-md touch-target mobile-nav-item ${
                    isActivePath(item.href)
                      ? "text-accent bg-accent/10 font-semibold mobile-nav-active"
                      : "text-foreground hover:text-accent hover:bg-accent/5"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center justify-between px-2 py-2 border-t border-border mt-4 pt-4">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
              <div className="flex flex-col space-y-2 pt-2">
                <Button
                  asChild
                  variant="outline"
                  className="border-accent text-accent bg-transparent h-12 touch-target"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 touch-target">
                  <Link href="/register">Register IP</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
export { Navigation }
