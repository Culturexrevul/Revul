"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { Check, Shield, Award, Globe, Zap, DollarSign, Gamepad2, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

interface CreatorIDProps {
  mode?: "benefits" | "apply" | "signin"
  compact?: boolean
}

export default function CreatorID({ mode = "benefits", compact = false }: CreatorIDProps) {
  const [paymentMethod, setPaymentMethod] = useState<"pay" | "quest" | null>(null)
  const [showDetailedBenefits, setShowDetailedBenefits] = useState(false)

  const quickBenefits = [
    "Verified Creator Badge",
    "Official Registry Listing",
    "Studio Access & Discounts",
    "Branding & Promotion Support",
    "Legal Support (70% Off)",
    "International Showcases",
    "Monetization & Brand Deals",
    "Publishing Assistance",
    "IP Fast-Track Protection",
    "Business Setup Support",
    "Priority Opportunities",
  ]

  const comprehensiveBenefits = [
    { icon: Shield, title: "Verified Creator Badge", desc: "Stand out with official verification on all platforms" },
    { icon: Globe, title: "Creator Registry Listing", desc: "Featured in the official creator database" },
    { icon: Zap, title: "Exclusive Studio Access", desc: "Book premium studios nationwide at member-only rates" },
    { icon: Award, title: "Branding Support", desc: "Professional branding consultation and design resources" },
    { icon: Globe, title: "Promotion Support", desc: "Featured promotion across Revulter's marketing channels" },
    { icon: Shield, title: "Discounted Legal Support", desc: "Up to 70% off legal consultations and contract reviews" },
    { icon: Award, title: "Export Showcases", desc: "Priority placement in international creator showcases" },
    { icon: DollarSign, title: "Monetization Access", desc: "Unlock advanced revenue streams and brand partnerships" },
    { icon: Globe, title: "Publishing Assistance", desc: "Distribution support for music, film, and digital content" },
    { icon: Zap, title: "IP Fast-Track", desc: "Expedited IP registration and protection services" },
    {
      icon: Award,
      title: "Creator Business Setup",
      desc: "Business registration, tax planning, and entity structuring",
    },
    { icon: Shield, title: "Insurance Group Rates", desc: "Access to creator-specific insurance at group pricing" },
    { icon: Globe, title: "International Network", desc: "Connect with global brands and distribution partners" },
    { icon: Zap, title: "Priority Brand Briefs", desc: "First access to high-value brand collaboration opportunities" },
    { icon: DollarSign, title: "Revenue Analytics", desc: "Advanced dashboard tracking all income streams and trends" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        <div className="text-center mb-8 sm:mb-10">
          <Badge className="mb-3" variant="outline">
            Official Creator Registry
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 tracking-tight">Revulter Creator ID</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Get verified. Access exclusive resources. Unlock career opportunities.
          </p>
        </div>

        <div className="mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {/* Payment Option */}
            <Card className="rounded-2xl border-2 hover:border-primary transition-colors">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl sm:text-2xl font-black">Pay $2,000</CardTitle>
                </div>
                <CardDescription className="text-sm">Instant access, lifetime benefits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4 bg-primary/5 rounded-xl">
                  <div className="text-4xl sm:text-5xl font-black text-primary mb-1">$2,000</div>
                  <p className="text-xs text-muted-foreground">One-time payment</p>
                </div>
                <Button
                  className="w-full h-11 text-base font-bold"
                  size="lg"
                  onClick={() => {
                    setPaymentMethod("pay")
                    toast({
                      title: "Payment Processing",
                      description: "Redirecting to secure payment gateway...",
                    })
                  }}
                >
                  Start Now
                </Button>
              </CardContent>
            </Card>

            {/* Quest Option */}
            <Card className="rounded-2xl border-2 hover:border-accent transition-colors">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Gamepad2 className="h-5 w-5 text-accent" />
                  <CardTitle className="text-xl sm:text-2xl font-black">Play IP Quest</CardTitle>
                </div>
                <CardDescription className="text-sm">Free access through gameplay</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4 bg-accent/5 rounded-xl">
                  <div className="text-4xl sm:text-5xl font-black text-accent mb-1">FREE</div>
                  <p className="text-xs text-muted-foreground">15-20 min quest</p>
                </div>
                <Link href="/ipquest" className="block">
                  <Button className="w-full h-11 text-base font-bold bg-transparent" variant="outline" size="lg">
                    Start Quest
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-black mb-6 text-center">What You Get</h2>

          {/* Quick bullet points */}
          <div className="max-w-3xl mx-auto mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {quickBenefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => setShowDetailedBenefits(!showDetailedBenefits)}
              className="font-bold"
            >
              {showDetailedBenefits ? (
                <>
                  Hide Details <ChevronUp className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  View Detailed Benefits <ChevronDown className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          {/* Detailed benefits dropdown */}
          {showDetailedBenefits && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 animate-in fade-in duration-300">
              {comprehensiveBenefits.map((benefit, idx) => (
                <Card key={idx} className="rounded-xl hover:border-primary transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-sm sm:text-base mb-1">{benefit.title}</CardTitle>
                        <CardDescription className="text-xs">{benefit.desc}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Card className="rounded-2xl bg-primary/5 border-none mb-8">
          <CardContent className="py-8">
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-primary mb-2">10x</div>
                <p className="text-xs sm:text-sm font-bold mb-1">Brand Deals</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-primary mb-2">70%</div>
                <p className="text-xs sm:text-sm font-bold mb-1">Cost Savings</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-primary mb-2">24/7</div>
                <p className="text-xs sm:text-sm font-bold mb-1">Support</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black mb-4">Ready to Level Up?</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-xl mx-auto">
            Join verified creators building sustainable creative businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="h-12 px-8 font-bold"
              onClick={() => {
                setPaymentMethod("pay")
                toast({
                  title: "Payment Processing",
                  description: "Redirecting to secure payment gateway...",
                })
              }}
            >
              Pay $2,000 & Start Now
            </Button>
            <Link href="/ipquest">
              <Button size="lg" variant="outline" className="h-12 px-8 font-bold w-full sm:w-auto bg-transparent">
                Play IP Quest Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
