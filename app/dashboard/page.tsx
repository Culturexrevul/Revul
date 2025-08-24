"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartTooltip } from "@/components/ui/chart"
import { TrendingUp, TrendingDown, DollarSign, Percent, Calendar, Plus, Minus, BarChart3 } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"
import Link from "next/link"

export default function InvestorDashboardPage() {
  // Mock portfolio data
  const portfolioStats = {
    totalValue: 15750,
    totalInvested: 12500,
    totalReturn: 3250,
    returnPercentage: 26.0,
    activeAssets: 8,
    totalShares: 245,
  }

  const portfolio = [
    {
      id: "1",
      assetName: "Ancestral Rhythms",
      artist: "Amara Okafor",
      category: "Digital Art",
      ownershipPercent: 15,
      sharesOwned: 15,
      purchasePrice: 750,
      currentValue: 950,
      roi: 26.7,
      lastUpdate: "2024-01-20",
      trend: "up",
    },
    {
      id: "2",
      assetName: "Lagos Nights",
      artist: "Kemi Adebayo",
      category: "Music Album",
      ownershipPercent: 25,
      sharesOwned: 25,
      purchasePrice: 3125,
      currentValue: 3750,
      roi: 20.0,
      lastUpdate: "2024-01-19",
      trend: "up",
    },
    {
      id: "3",
      assetName: "Ubuntu Stories",
      artist: "Thabo Mthembu",
      category: "Short Film",
      ownershipPercent: 10,
      sharesOwned: 10,
      purchasePrice: 2000,
      currentValue: 2400,
      roi: 20.0,
      lastUpdate: "2024-01-18",
      trend: "up",
    },
    {
      id: "4",
      assetName: "Kente Fusion",
      artist: "Esi Mensah",
      category: "Fashion Design",
      ownershipPercent: 30,
      sharesOwned: 30,
      purchasePrice: 2250,
      currentValue: 2700,
      roi: 20.0,
      lastUpdate: "2024-01-17",
      trend: "up",
    },
    {
      id: "5",
      assetName: "Maasai Portraits",
      artist: "Grace Wanjiku",
      category: "Photography",
      ownershipPercent: 20,
      sharesOwned: 20,
      purchasePrice: 1300,
      currentValue: 1400,
      roi: 7.7,
      lastUpdate: "2024-01-16",
      trend: "up",
    },
    {
      id: "6",
      assetName: "Highlife Classics",
      artist: "Nana Ampadu Jr.",
      category: "Music Album",
      ownershipPercent: 12,
      sharesOwned: 12,
      purchasePrice: 1320,
      currentValue: 1584,
      roi: 20.0,
      lastUpdate: "2024-01-15",
      trend: "up",
    },
    {
      id: "7",
      assetName: "Baobab Tales",
      artist: "Aminata Sow",
      category: "Literature",
      ownershipPercent: 18,
      sharesOwned: 18,
      purchasePrice: 1440,
      currentValue: 1620,
      roi: 12.5,
      lastUpdate: "2024-01-14",
      trend: "up",
    },
    {
      id: "8",
      assetName: "Ankara Couture",
      artist: "Folake Coker",
      category: "Fashion Design",
      ownershipPercent: 22,
      sharesOwned: 22,
      purchasePrice: 2090,
      currentValue: 2508,
      roi: 20.0,
      lastUpdate: "2024-01-13",
      trend: "up",
    },
  ]

  const portfolioPerformanceData = [
    { month: "Jan", value: 12500, roi: 0 },
    { month: "Feb", value: 13200, roi: 5.6 },
    { month: "Mar", value: 13800, roi: 10.4 },
    { month: "Apr", value: 14500, roi: 16.0 },
    { month: "May", value: 15100, roi: 20.8 },
    { month: "Jun", value: 15750, roi: 26.0 },
  ].filter((item) => item.value && item.roi !== undefined)

  const assetAllocationData = [
    { category: "Music", value: 5334, percentage: 33.9, name: "Music" },
    { category: "Art", value: 3458, percentage: 22.0, name: "Art" },
    { category: "Fashion", value: 3208, percentage: 20.4, name: "Fashion" },
    { category: "Film", value: 2400, percentage: 15.2, name: "Film" },
    { category: "Literature", value: 1620, percentage: 10.3, name: "Literature" },
    { category: "Photography", value: 1400, percentage: 8.9, name: "Photography" },
  ].filter((item) => item.value && item.category)

  const roiByAssetData = portfolio
    .map((asset) => ({
      name: asset.assetName.length > 15 ? asset.assetName.substring(0, 15) + "..." : asset.assetName,
      roi: asset.roi,
      value: asset.currentValue,
      label: asset.assetName.length > 15 ? asset.assetName.substring(0, 15) + "..." : asset.assetName,
    }))
    .filter((item) => item.roi !== undefined && item.value)

  const COLORS = ["#D4AF37", "#2D5016", "#CD853F", "#8B4513", "#DAA520", "#556B2F"]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary mb-3 sm:mb-4">
              Investor <span className="text-accent">Dashboard</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
              Track your cultural asset investments and portfolio performance.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
            <Card className="border-border bg-card shadow-lg">
              <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Portfolio Value</p>
                    <p className="text-lg sm:text-2xl font-bold text-foreground">
                      ${portfolioStats.totalValue.toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-accent self-end sm:self-auto" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card shadow-lg">
              <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Return</p>
                    <p className="text-lg sm:text-2xl font-bold text-secondary">
                      +${portfolioStats.totalReturn.toLocaleString()}
                    </p>
                  </div>
                  <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-secondary self-end sm:self-auto" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card shadow-lg">
              <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">ROI</p>
                    <p className="text-lg sm:text-2xl font-bold text-terracotta">+{portfolioStats.returnPercentage}%</p>
                  </div>
                  <Percent className="h-6 w-6 sm:h-8 sm:w-8 text-terracotta self-end sm:self-auto" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card shadow-lg">
              <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">Active Assets</p>
                    <p className="text-lg sm:text-2xl font-bold text-foreground">{portfolioStats.activeAssets}</p>
                  </div>
                  <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-accent self-end sm:self-auto" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 sm:space-y-8 mb-6 sm:mb-8">
            {/* Portfolio Performance Over Time */}
            <Card className="border-border bg-card shadow-lg">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="font-display text-lg sm:text-xl text-foreground">Portfolio Performance</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Your investment growth over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="h-48 sm:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={portfolioPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" fontSize={12} stroke="hsl(var(--muted-foreground))" />
                      <YAxis yAxisId="left" fontSize={12} stroke="hsl(var(--muted-foreground))" />
                      <YAxis yAxisId="right" orientation="right" fontSize={12} stroke="hsl(var(--muted-foreground))" />
                      <ChartTooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                                <p className="font-semibold text-foreground">{label}</p>
                                {payload.map((entry, index) => (
                                  <p key={index} className="text-sm" style={{ color: entry.color }}>
                                    {entry.dataKey === "value" ? "Portfolio Value" : "ROI"}:{" "}
                                    {entry.dataKey === "value"
                                      ? `$${entry.value?.toLocaleString()}`
                                      : `${entry.value}%`}
                                  </p>
                                ))}
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--accent))"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="roi"
                        stroke="hsl(var(--secondary))"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Asset Allocation */}
            <Card className="border-border bg-card shadow-lg">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="font-display text-lg sm:text-xl text-foreground">Asset Allocation</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Distribution of your investments by category
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="h-48 sm:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={assetAllocationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={60}
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="category"
                      >
                        {assetAllocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload
                            return (
                              <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                                <p className="font-semibold text-foreground">{data.category}</p>
                                <p className="text-sm text-muted-foreground">
                                  ${data.value.toLocaleString()} ({data.percentage}%)
                                </p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                  {assetAllocationData.map((item, index) => (
                    <div key={item.category} className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-xs sm:text-sm text-muted-foreground truncate">{item.category}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border bg-card shadow-lg mb-6 sm:mb-8">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="font-display text-lg sm:text-xl text-foreground">ROI by Asset</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Return on investment for each of your assets
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="h-48 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={roiByAssetData} margin={{ bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      fontSize={10}
                      interval={0}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                              <p className="font-semibold text-foreground text-sm">{label}</p>
                              <p className="text-sm text-secondary">ROI: {data.roi}%</p>
                              <p className="text-sm text-muted-foreground">Value: ${data.value.toLocaleString()}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar dataKey="roi" fill="hsl(var(--secondary))" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card shadow-lg">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="font-display text-lg sm:text-xl text-foreground">Your Assets</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Detailed view of your cultural asset investments
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="space-y-4">
                {portfolio.map((asset) => (
                  <div
                    key={asset.id}
                    className="border border-border bg-card rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-4">
                      {/* Asset Info */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1">{asset.assetName}</h3>
                          <p className="text-sm text-muted-foreground mb-2">by {asset.artist}</p>
                          <Badge variant="outline" className="text-xs border-border">
                            {asset.category}
                          </Badge>
                        </div>

                        <div className="flex items-center space-x-1 sm:space-x-2">
                          {asset.trend === "up" ? (
                            <TrendingUp className="h-4 w-4 text-secondary" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-destructive" />
                          )}
                          <span
                            className={`font-bold text-base sm:text-lg ${
                              asset.trend === "up" ? "text-secondary" : "text-destructive"
                            }`}
                          >
                            +{asset.roi}%
                          </span>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                        <div className="text-center">
                          <div className="text-base sm:text-lg font-bold text-foreground mb-1">
                            {asset.ownershipPercent}%
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground">{asset.sharesOwned} shares</p>
                        </div>

                        <div className="text-center">
                          <div className="text-base sm:text-lg font-bold text-accent mb-1">
                            ${asset.currentValue.toLocaleString()}
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground">Current Value</p>
                        </div>

                        <div className="text-center">
                          <div className="text-xs sm:text-sm text-muted-foreground mb-1">Last Updated</div>
                          <div className="text-xs sm:text-sm font-medium text-foreground">{asset.lastUpdate}</div>
                        </div>

                        <div className="text-center">
                          <div className="text-xs sm:text-sm text-muted-foreground mb-1">Purchase Price</div>
                          <div className="text-xs sm:text-sm font-medium text-foreground">
                            ${asset.purchasePrice.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent h-10 flex-1"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Buy More
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-terracotta text-terracotta hover:bg-terracotta hover:text-terracotta-foreground bg-transparent h-10 flex-1"
                        >
                          <Minus className="h-4 w-4 mr-1" />
                          Sell Shares
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 sm:mt-8 text-center">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground h-12">
                <Link href="/marketplace">
                  <Plus className="h-5 w-5 mr-2" />
                  Discover New Assets
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent h-12"
              >
                <Link href="/licensing">
                  <Calendar className="h-5 w-5 mr-2" />
                  Browse Licenses
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
