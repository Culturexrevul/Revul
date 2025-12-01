"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  Flame,
  Heart,
  CheckCircle,
  Music,
  Palette,
  Gamepad2,
  Pencil,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const ipAssets = [
  {
    id: "1",
    name: "Afrobeats Collective Vol. 1",
    creator: "Oladele Studios",
    category: "music",
    icon: Music,
    signal: 8.7,
    sentiment: { positive: 78, neutral: 15, negative: 7 },
    socialTraction: { instagram: 45600, twitter: 23400, tiktok: 128900 },
    creatorRep: "Rising: Nominated for Grammy 2024",
    riskScore: 3,
    riskMomentum: "improving",
    votes: 1240,
    buzz: "High engagement, 15% week-over-week growth",
  },
  {
    id: "2",
    name: "Lagos Street Art Series",
    creator: "Chidi Nwankwo",
    category: "art",
    icon: Palette,
    signal: 7.4,
    sentiment: { positive: 82, neutral: 12, negative: 6 },
    socialTraction: { instagram: 98200, twitter: 12100, tiktok: 45600 },
    creatorRep: "Established: Featured in 12 major galleries",
    riskScore: 2,
    riskMomentum: "stable",
    votes: 2103,
    buzz: "Museum acquisition discussions ongoing",
  },
  {
    id: "3",
    name: "Ancestral Legends Game IP",
    creator: "Naija Games Studio",
    category: "game",
    icon: Gamepad2,
    signal: 9.1,
    sentiment: { positive: 85, neutral: 10, negative: 5 },
    socialTraction: { instagram: 156200, twitter: 89400, tiktok: 234500 },
    creatorRep: "Hot: Series A funded, 500k+ monthly active users",
    riskScore: 2,
    riskMomentum: "improving",
    votes: 3567,
    buzz: "Netflix adaptation in pre-production",
  },
  {
    id: "4",
    name: "Adire Contemporary Collection",
    creator: "Folake Textiles",
    category: "design",
    icon: Pencil,
    signal: 6.9,
    sentiment: { positive: 71, neutral: 18, negative: 11 },
    socialTraction: { instagram: 67300, twitter: 8900, tiktok: 34200 },
    creatorRep: "Growing: LVMH partnership in talks",
    riskScore: 4,
    riskMomentum: "declining",
    votes: 892,
    buzz: "Patent pending on unique dyeing technique",
  },
]

export default function IPReputationIndexPage() {
  const [selectedIP, setSelectedIP] = useState<string | null>(null)
  const selectedAsset = ipAssets.find((a) => a.id === selectedIP)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-2 sm:mb-4">
              IP Reputation Index
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl">
              Assess investment risk and licensing potential for creative IP with real-time sentiment analysis, social traction metrics, and creator reputation insights.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* IP Assets List */}
            <div className="lg:col-span-1">
              <div className="space-y-3 sm:space-y-4">
                <h2 className="font-semibold text-lg text-foreground">IP Assets</h2>
                {ipAssets.map((asset) => {
                  const IconComponent = asset.icon
                  return (
                    <button
                      key={asset.id}
                      onClick={() => setSelectedIP(asset.id)}
                      className={`w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedIP === asset.id
                          ? "border-accent bg-accent/10 dark:bg-accent/20"
                          : "border-border bg-card hover:border-accent/50 hover:bg-muted/50 dark:hover:bg-muted/30"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-accent mt-1 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">{asset.name}</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground truncate">{asset.creator}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div
                              className={`text-xs font-bold px-2 py-1 rounded ${
                                asset.signal >= 8.5
                                  ? "bg-green-500/20 text-green-700 dark:text-green-400"
                                  : asset.signal >= 7
                                    ? "bg-blue-500/20 text-blue-700 dark:text-blue-400"
                                    : "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                              }`}
                            >
                              Score: {asset.signal}
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Detail View */}
            <div className="lg:col-span-2">
              {selectedAsset ? (
                <div className="space-y-4 sm:space-y-6">
                  {/* IP Signal Score - Bloomberg Style */}
                  <Card className="border-border bg-card shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-accent/20 to-terracotta/20 dark:from-accent/30 dark:to-terracotta/30 p-4 sm:p-6">
                      <div className="text-center">
                        <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                          IP Signal Score
                        </p>
                        <div className="text-6xl sm:text-7xl font-bold text-accent font-display mb-3">
                          {selectedAsset.signal}
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          {selectedAsset.riskMomentum === "improving" ? (
                            <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                          ) : selectedAsset.riskMomentum === "declining" ? (
                            <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          )}
                          <span className="text-sm font-semibold capitalize text-foreground">
                            {selectedAsset.riskMomentum}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {/* Sentiment Breakdown */}
                    <Card className="border-border bg-card">
                      <CardHeader className="pb-3 px-3 sm:px-6 pt-4 sm:pt-6">
                        <CardTitle className="text-sm sm:text-base">Sentiment Breakdown</CardTitle>
                      </CardHeader>
                      <CardContent className="px-3 sm:px-6 pb-4 space-y-2">
                        <div>
                          <div className="flex justify-between text-xs sm:text-sm mb-1">
                            <span className="text-green-600 dark:text-green-400 font-semibold">Positive</span>
                            <span className="font-bold">{selectedAsset.sentiment.positive}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${selectedAsset.sentiment.positive}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs sm:text-sm mb-1">
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">Neutral</span>
                            <span className="font-bold">{selectedAsset.sentiment.neutral}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${selectedAsset.sentiment.neutral}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs sm:text-sm mb-1">
                            <span className="text-red-600 dark:text-red-400 font-semibold">Negative</span>
                            <span className="font-bold">{selectedAsset.sentiment.negative}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-red-500 h-2 rounded-full"
                              style={{ width: `${selectedAsset.sentiment.negative}%` }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Risk Score */}
                    <Card className="border-border bg-card">
                      <CardHeader className="pb-3 px-3 sm:px-6 pt-4 sm:pt-6">
                        <CardTitle className="text-sm sm:text-base">Risk Assessment</CardTitle>
                      </CardHeader>
                      <CardContent className="px-3 sm:px-6 pb-4">
                        <div className="text-center">
                          <div
                            className={`text-4xl sm:text-5xl font-bold font-display mb-2 ${
                              selectedAsset.riskScore <= 2
                                ? "text-green-600 dark:text-green-400"
                                : selectedAsset.riskScore <= 3
                                  ? "text-yellow-600 dark:text-yellow-400"
                                  : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {selectedAsset.riskScore}/10
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {selectedAsset.riskScore <= 2
                              ? "Low Risk"
                              : selectedAsset.riskScore <= 3
                                ? "Moderate Risk"
                                : "Higher Risk"}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Social Traction */}
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg">Social Traction</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between p-2 sm:p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm text-muted-foreground">Instagram</span>
                        <span className="font-bold text-foreground text-sm sm:text-base">
                          {(selectedAsset.socialTraction.instagram / 1000).toFixed(1)}K
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 sm:p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm text-muted-foreground">Twitter</span>
                        <span className="font-bold text-foreground text-sm sm:text-base">
                          {(selectedAsset.socialTraction.twitter / 1000).toFixed(1)}K
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 sm:p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm text-muted-foreground">TikTok</span>
                        <span className="font-bold text-foreground text-sm sm:text-base">
                          {(selectedAsset.socialTraction.tiktok / 1000).toFixed(1)}K
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Creator Reputation */}
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                        <Users className="h-5 w-5 text-accent" />
                        Creator Reputation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm sm:text-base text-foreground">{selectedAsset.creatorRep}</p>
                    </CardContent>
                  </Card>

                  {/* Community & Buzz */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <Card className="border-border bg-card">
                      <CardHeader className="pb-3 px-3 sm:px-6 pt-4 sm:pt-6">
                        <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                          <Heart className="h-4 w-4 text-accent" />
                          Community Votes
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-3 sm:px-6 pb-4">
                        <div className="text-2xl sm:text-3xl font-bold text-accent font-display">
                          {selectedAsset.votes.toLocaleString()}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-border bg-card">
                      <CardHeader className="pb-3 px-3 sm:px-6 pt-4 sm:pt-6">
                        <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                          <Flame className="h-4 w-4 text-terracotta" />
                          Buzz Score
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-3 sm:px-6 pb-4">
                        <div className="text-lg sm:text-xl font-semibold text-terracotta">Hot</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Buzz Timeline */}
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg">Recent Buzz</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm sm:text-base text-foreground mb-4">{selectedAsset.buzz}</p>
                      <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href={`/licensing?asset=${selectedAsset.id}`}>
                          Explore Licensing <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="border-border bg-card h-full flex items-center justify-center min-h-[400px]">
                  <CardContent className="text-center">
                    <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-lg text-muted-foreground">Select an IP asset to view reputation metrics</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
