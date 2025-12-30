"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Shield, Globe, Briefcase, Scale, Gamepad2, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { BrandCarousel } from "@/components/BrandCarousel"

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)

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

  const quickAccessItems = [
    { href: "/register", label: "Register IP", icon: Shield },
    { href: "/ip-reputation", label: "IP Index", icon: BarChart3 },
    { href: "/licensing", label: "Licensing Hub", icon: Briefcase },
    { href: "/hire-creators", label: "Creator Hub", icon: Globe },
    { href: "/legal", label: "Legal Assist", icon: Scale },
    { href: "/ipquest", label: "IP Quest", icon: Gamepad2 },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1">
        <section ref={heroRef} className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="max-w-xl mx-auto mb-16">
              <div className="relative p-6 sm:p-8 rounded-[2.5rem] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-2 border-white/50 dark:border-gray-700/50 shadow-[inset_0_2px_10px_rgba(255,255,255,0.8),0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_2px_10px_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.3)]">
                <div className="grid grid-cols-3 gap-4 sm:gap-6">
                  {quickAccessItems.map((item) => (
                    <Link key={item.href} href={item.href} className="group flex flex-col items-center justify-center">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 rounded-full bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-[inset_-2px_-2px_8px_rgba(255,255,255,0.9),inset_2px_2px_8px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[inset_-2px_-2px_8px_rgba(255,255,255,0.03),inset_2px_2px_8px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:shadow-[inset_-3px_-3px_10px_rgba(255,255,255,1),inset_3px_3px_10px_rgba(0,0,0,0.15),0_6px_16px_rgba(0,0,0,0.12)] dark:group-hover:shadow-[inset_-3px_-3px_10px_rgba(255,255,255,0.05),inset_3px_3px_10px_rgba(0,0,0,0.5),0_6px_16px_rgba(0,0,0,0.4)]">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <item.icon className="w-7 h-7 sm:w-8 sm:h-8 text-gray-600 dark:text-gray-400 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 text-center">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-6">Everything you need to manage your IP</p>
            </div>

            {/* Badge - Now below quick access */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background mb-8 sm:mb-10">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Blockchain-Powered IP Protection</span>
            </div>

            {/* Main headline */}
            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight tracking-tight">
              Protect, Monetize & Scale
              <br />
              Your Creative IP
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              The all-in-one platform for creators to register intellectual property on the blockchain, license creative
              assets, hire talent, and get legal guidance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button
                asChild
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 h-12 px-6 text-sm font-medium"
              >
                <Link href="/register" className="flex items-center gap-2">
                  Start Protecting Your IP
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-6 text-sm font-medium border-border bg-transparent"
              >
                <Link href="/marketplace">Explore Marketplace</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 sm:gap-16">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-foreground">50K+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">IPs Registered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-foreground">$12M+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Licensed Value</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-foreground">8K+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Active Creators</div>
              </div>
            </div>
          </div>
        </section>

        <BrandCarousel />
      </main>

      <Footer />
    </div>
  )
}
