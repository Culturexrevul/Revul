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
    { href: "/train-ai", label: "TrainAI" },
    { href: "/community", label: "Community" }, // Added Community menu item
    { href: "/ipquest", label: "IP Quest" }, // Added IP Quest mini-game
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
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 shrink-0">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors font-medium px-2 py-1 rounded-md text-sm whitespace-nowrap ${
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
            <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/register">Register IP</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2 shrink-0">
            <ThemeToggle />
            <div className="h-6 w-px bg-border mx-1" />
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
                        ? "text-accent bg-accent/10 font-semibold"
                        : "text-foreground hover:text-accent hover:bg-accent/5 active:bg-accent/10"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-border my-3" />
                <div className="flex flex-col space-y-2 px-4 pb-2">
                  <Button
                    asChild
                    variant="outline"
                    className="border-accent text-accent bg-transparent h-12 justify-center"
                  >
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 justify-center"
                  >
                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                      Register IP
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
