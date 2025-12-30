"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X, ArrowLeft, ArrowRight, Home } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/ThemeToggle"

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { href: "/register", label: "Register IP" },
    { href: "/ip-reputation", label: "IP Index" },
    { href: "/licensing", label: "Licensing Hub" },
    { href: "/hire-creators", label: "Creator Hub" },
    { href: "/legal", label: "Legal Assist" },
    { href: "/merchlab", label: "MerchLab" },
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
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center space-x-1 sm:space-x-2 min-w-0 flex-1">
            {pathname !== "/" && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="p-2 hover:bg-accent/10 back-button shrink-0"
                  aria-label="Go back"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="p-2 hover:bg-accent/10 shrink-0"
                  aria-label="Go to homepage"
                >
                  <Link href="/">
                    <Home className="h-4 w-4" />
                  </Link>
                </Button>
              </>
            )}
            <Link href="/" className="flex items-center min-w-0">
              <span className="font-display font-bold text-base sm:text-lg lg:text-xl text-foreground truncate">
                <span className="sm:hidden">Revulter</span>
                <span className="hidden sm:inline">Revulter Cultural Commerce</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActivePath(item.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <ArrowRight className="w-4 h-4" />
              Sign In
            </Link>
            <Button
              asChild
              size="sm"
              className="bg-foreground text-background hover:bg-foreground/90 h-9 px-4 text-sm font-medium"
            >
              <Link href="/register">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2 shrink-0">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 min-h-[44px] min-w-[44px]"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="max-h-[calc(100vh-4rem)] overflow-y-auto py-3">
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`transition-colors font-medium px-4 py-3 rounded-md min-h-[48px] flex items-center ${
                      isActivePath(item.href)
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-border my-3" />
                <a
                  href="https://www.revulter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Revulter Website
                </a>
                <Link
                  href="/login"
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <div className="px-4 pt-2">
                  <Button asChild className="w-full bg-foreground text-background hover:bg-foreground/90">
                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
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
