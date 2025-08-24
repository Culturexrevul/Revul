"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Shield,
  Globe,
  TrendingUp,
  Eye,
  ShoppingBag,
  FileText,
  Scale,
  Award as IdCard,
  Users,
  Info,
  Flame,
  Star,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { useAssets } from "@/contexts/AssetContext"
import { BrandCarousel } from "@/components/BrandCarousel"

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const showcaseRef = useRef<HTMLElement>(null)
  const { assets } = useAssets()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".scroll-animate")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    console.log("[v0] Homepage assets updated:", assets.length)
  }, [assets])

  const quickAccessItems = [
    { href: "/register", label: "Register IP", icon: Shield, description: "Protect your creative work" },
    { href: "/marketplace", label: "Marketplace", icon: ShoppingBag, description: "Buy & sell creative assets" },
    { href: "/licensing", label: "Licensing Hub", icon: FileText, description: "License your content globally" },
    { href: "/legal", label: "Legal Assist", icon: Scale, description: "Get legal guidance & support" },
    { href: "/creator-id", label: "Creator ID", icon: IdCard, description: "Apply for verified status" },
    { href: "/hire-creators", label: "Creator Hub", icon: Users, description: "Hire African creators & artisans" },
    { href: "/dashboard", label: "Investor Dashboard", icon: TrendingUp, description: "Track your investments" },
    { href: "/about", label: "About", icon: Info, description: "Learn about our mission" },
  ]

  const featuredAssets = assets.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-12 sm:py-16 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-10 dark:opacity-5">
              <source src="/african-pattern-loop.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90 dark:from-background/95 dark:via-background/80 dark:to-background/95" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-foreground mb-4 sm:mb-6 leading-tight animate-fade-in-up">
              Own. Protect. Trade
              <br />
              <span className="text-accent animate-fade-in-up animation-delay-200">African Creativity.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed animate-fade-in-up animation-delay-400 px-2">
              From music and film to fashion and art — register your work, license it worldwide, and unlock new revenue
              streams.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 max-w-6xl mx-auto animate-fade-in-up animation-delay-600">
              {quickAccessItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <Button
                    key={item.href}
                    asChild
                    variant="outline"
                    size="sm"
                    className="group border-border hover:bg-accent hover:text-accent-foreground hover:border-accent bg-card/80 backdrop-blur-sm p-2 sm:p-3 h-auto min-h-[60px] sm:min-h-[70px] hover:scale-105 transition-all duration-300 animate-fade-in-up text-xs sm:text-sm shadow-sm flex-col"
                    style={{ animationDelay: `${600 + index * 100}ms` }}
                  >
                    <Link href={item.href} className="flex flex-col items-center gap-1 sm:gap-2 text-center w-full">
                      <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-300 shrink-0" />
                      <span className="font-medium leading-tight">{item.label}</span>
                    </Link>
                  </Button>
                )
              })}
            </div>
          </div>
        </section>

        <BrandCarousel />

        <section ref={showcaseRef} className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 scroll-animate">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in">
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-5xl text-foreground mb-4 sm:mb-6">
                Featured Cultural Assets
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
                Discover trending and featured authentic African creativity from emerging and established artists.
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                Showing {featuredAssets.length} of {assets.length} total assets
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {featuredAssets.map((asset, index) => (
                <Card
                  key={asset.id}
                  className={`group hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border-border bg-card shadow-lg overflow-hidden animate-fade-in-up`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="aspect-square bg-gradient-to-br from-accent/20 to-terracotta/20 relative overflow-hidden">
                    {(asset.isTrending || asset.isFeatured) && (
                      <div
                        className={`absolute top-2 left-2 z-10 ${asset.isTrending ? "bg-red-500 dark:bg-red-600" : "bg-yellow-500 dark:bg-yellow-600"} text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm`}
                      >
                        {asset.isTrending ? <Flame className="h-3 w-3" /> : <Star className="h-3 w-3" />}
                        <span className="hidden xs:inline sm:hidden lg:inline">
                          {asset.isTrending ? "Trending" : "Featured"}
                        </span>
                      </div>
                    )}
                    <Image
                      src={asset.image || "/placeholder.svg"}
                      alt={asset.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardHeader className="pb-2 px-4 sm:px-6 pt-4">
                    <CardTitle className="font-display text-base sm:text-lg leading-tight">{asset.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground capitalize">
                      {asset.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 px-4 sm:px-6 pb-4">
                    <div className="flex justify-between items-center mb-3 text-sm">
                      <span className="text-muted-foreground">Available: {asset.available}</span>
                      <span className="font-semibold text-accent">${asset.price}/share</span>
                    </div>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent text-sm h-10 transition-all duration-200"
                    >
                      <Link href={`/asset/${asset.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        <span>View Asset</span>
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          ref={featuresRef}
          className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-muted/50 dark:bg-muted/30 scroll-animate transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in">
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-5xl text-foreground mb-4 sm:mb-6">
                Why Choose Revulter?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
                We're building the future of African creative commerce with cutting-edge technology and deep cultural
                understanding.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <Card className="text-center border-border bg-card shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-slide-up p-2 sm:p-0">
                <CardHeader className="pb-4 px-4 sm:px-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-accent/10 dark:bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-accent/20 dark:hover:bg-accent/30 hover:scale-110 transition-all duration-300">
                    <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-accent" />
                  </div>
                  <CardTitle className="font-display text-xl sm:text-2xl text-foreground">IP Registration</CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <CardDescription className="text-base sm:text-lg text-muted-foreground">
                    Protect your rights in minutes with our streamlined registration process.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center border-border bg-card shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-slide-up animation-delay-200 p-2 sm:p-0">
                <CardHeader className="pb-4 px-4 sm:px-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-terracotta/10 dark:bg-terracotta/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-terracotta/20 dark:hover:bg-terracotta/30 hover:scale-110 transition-all duration-300">
                    <Globe className="h-7 w-7 sm:h-8 sm:w-8 text-terracotta" />
                  </div>
                  <CardTitle className="font-display text-xl sm:text-2xl text-foreground">
                    Cultural Marketplace
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <CardDescription className="text-base sm:text-lg text-muted-foreground">
                    Sell and license your works globally to reach new audiences and markets.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center border-border bg-card shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-slide-up animation-delay-400 p-2 sm:p-0">
                <CardHeader className="pb-4 px-4 sm:px-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-secondary/10 dark:bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-secondary/20 dark:hover:bg-secondary/30 hover:scale-110 transition-all duration-300">
                    <TrendingUp className="h-7 w-7 sm:h-8 sm:w-8 text-secondary" />
                  </div>
                  <CardTitle className="font-display text-xl sm:text-2xl text-foreground">
                    Fractional Ownership
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <CardDescription className="text-base sm:text-lg text-muted-foreground">
                    Trade shares in music, art & film to diversify your creative portfolio.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-accent/5 dark:bg-accent/10 lg:hidden">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-lg font-semibold text-foreground mb-3">Specialized AI Training Data</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Access unique African cultural datasets for training more inclusive AI models
          </p>
          <Button
            asChild
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
          >
            <Link href="/train-ai">Explore TrainAI</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
