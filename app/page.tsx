"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Globe, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useAssets } from "@/contexts/AssetContext"
import { BrandCarousel } from "@/components/BrandCarousel"

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const showcaseRef = useRef<HTMLElement>(null)
  const { assets } = useAssets()
  const [showWhyRevulter, setShowWhyRevulter] = useState(false)

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
    { href: "/register", label: "Register IP" },
    { href: "/ip-reputation", label: "IP Index" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/licensing", label: "Licensing Hub" },
    { href: "/legal", label: "Legal Assist" },
    { href: "/creator-id", label: "Creator ID" },
    { href: "/hire-creators", label: "Creator Hub" },
    { href: "/dashboard", label: "Investor Dashboard" },
  ]

  const featuredAssets = assets.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        <div className="relative bg-black">
          <div className="relative">
            <section ref={heroRef} className="relative py-20 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-12 overflow-hidden">
              <div className="absolute inset-0 z-0">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-5">
                  <source src="/african-pattern-loop.mp4" type="video/mp4" />
                </video>
              </div>

              <div className="relative z-10 max-w-7xl mx-auto text-center">
                <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 sm:mb-8 leading-none tracking-tighter animate-fade-in-up">
                  Own. Protect.
                  <br />
                  <span className="text-yellow-400 animate-fade-in-up animation-delay-200">Trade Creative IP</span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto mb-12 sm:mb-16 leading-relaxed animate-fade-in-up animation-delay-400 px-4 font-light tracking-wide">
                  Where creativity becomes global, export-ready.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto animate-fade-in-up animation-delay-600 p-4">
                  {quickAccessItems.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="bg-white text-black p-4 sm:p-5 h-auto min-h-[60px] sm:min-h-[70px] hover:bg-gray-100 transition-colors duration-200 animate-fade-in-up text-xs sm:text-sm font-black rounded-lg flex items-center justify-center uppercase tracking-wide"
                      style={{ animationDelay: `${600 + index * 100}ms` }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        <BrandCarousel />

        <section ref={showcaseRef} className="py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-12 scroll-animate bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 sm:mb-20 animate-fade-in">
              <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 tracking-tighter uppercase">
                Featured Assets
              </h2>
              <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto font-normal tracking-wider uppercase">
                Discover trending creative assets
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {featuredAssets.map((asset, index) => (
                <Link
                  key={asset.id}
                  href={`/asset/${asset.id}`}
                  className="group relative aspect-[3/4] overflow-hidden bg-black animate-fade-in-up hover:opacity-90 transition-opacity duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0">
                    <Image src={asset.image || "/placeholder.svg"} alt={asset.title} fill className="object-cover" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                    <h3 className="font-black text-xl sm:text-2xl md:text-3xl uppercase tracking-tight mb-2">
                      {asset.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400 uppercase tracking-wider font-normal">
                      {asset.category}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2 uppercase tracking-wide">View now</p>
                  </div>

                  {(asset.isTrending || asset.isFeatured) && (
                    <div
                      className={`absolute top-4 left-4 z-10 ${asset.isTrending ? "bg-red-500" : "bg-yellow-500"} text-white px-3 py-1 text-xs sm:text-sm font-bold uppercase tracking-wider`}
                    >
                      {asset.isTrending ? "Trending" : "Featured"}
                    </div>
                  )}
                </Link>
              ))}
            </div>

            <div className="text-center mt-12 sm:mt-16">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-black font-bold uppercase tracking-wider px-10 h-14 text-sm transition-all duration-200 bg-transparent"
              >
                <Link href="/marketplace">View All Assets</Link>
              </Button>
            </div>
          </div>
        </section>

        <section ref={featuresRef} className="py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-12 bg-muted/30 scroll-animate">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 sm:mb-20 animate-fade-in">
              <button
                onClick={() => setShowWhyRevulter(!showWhyRevulter)}
                className="w-full max-w-2xl mx-auto flex items-center justify-center gap-3 group"
              >
                <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-4 tracking-tighter uppercase">
                  Why Revulter
                </h2>
                <svg
                  className={`w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-300 ${showWhyRevulter ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto font-normal tracking-wider uppercase mb-2">
                The modern IP commerce platform
              </p>
            </div>

            {showWhyRevulter && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 animate-fade-in-up">
                <Card className="border border-border bg-card hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <CardHeader className="p-4 sm:p-6 space-y-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-foreground flex items-center justify-center">
                      <Shield className="h-6 w-6 sm:h-7 sm:w-7 text-background" />
                    </div>
                    <CardTitle className="font-bold text-lg sm:text-xl uppercase tracking-wide text-foreground">
                      IP Registration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Protect your creative rights in minutes with our streamlined registration process and automated
                      certification.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="border border-border bg-card hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <CardHeader className="p-4 sm:p-6 space-y-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-foreground flex items-center justify-center">
                      <Globe className="h-6 w-6 sm:h-7 sm:w-7 text-background" />
                    </div>
                    <CardTitle className="font-bold text-lg sm:text-xl uppercase tracking-wide text-foreground">
                      Global Marketplace
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Sell and license your works globally to reach new audiences, collectors, and international markets
                      seamlessly.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="border border-border bg-card hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <CardHeader className="p-4 sm:p-6 space-y-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-foreground flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 text-background" />
                    </div>
                    <CardTitle className="font-bold text-lg sm:text-xl uppercase tracking-wide text-foreground">
                      Fractional Trading
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Trade shares in music, art, and film to diversify your creative portfolio and unlock new
                      investment opportunities.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>
      </main>

      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-foreground text-background lg:hidden">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter mb-4">TrainAI</h3>
          <p className="text-sm sm:text-base text-background/80 mb-8 font-normal tracking-wide uppercase max-w-2xl mx-auto">
            Specialized datasets for inclusive AI models
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border border-foreground text-foreground hover:bg-foreground hover:text-background font-bold uppercase tracking-wider px-6 sm:px-8 h-11 sm:h-12 text-xs sm:text-sm transition-all duration-200 bg-transparent"
          >
            <Link href="/train-ai">Explore TrainAI</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
