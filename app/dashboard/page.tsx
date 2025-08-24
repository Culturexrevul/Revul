"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
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
  ]

  const assetAllocationData = [
    { category: "Music", value: 5334, percentage: 33.9 },
    { category: "Art", value: 3458, percentage: 22.0 },
    { category: "Fashion", value: 3208, percentage: 20.4 },
    { category: "Film", value: 2400, percentage: 15.2 },
    { category: "Literature", value: 1620, percentage: 10.3 },
    { category: "Photography", value: 1400, percentage: 8.9 },
  ]

  const roiByAssetData = portfolio.map((asset) => ({
    name: asset.assetName.length > 15 ? asset.assetName.substring(0, 15) + "..." : asset.assetName,
    roi: asset.roi,
    value: asset.currentValue,
  }))

  const COLORS = ["#D4AF37", "#2D5016", "#CD853F", "#8B4513", "#DAA520", "#556B2F"]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-display font-bold text-4xl lg:text-5xl text-primary mb-4">
              Investor <span className="text-accent">Dashboard</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Track your cultural asset investments and portfolio performance.
            </p>
          </div>

          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-border bg-card shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Portfolio Value</p>
                    <p className="text-2xl font-bold text-foreground">${portfolioStats.totalValue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Return</p>
                    <p className="text-2xl font-bold text-secondary">+${portfolioStats.totalReturn.toLocaleString()}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-secondary" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">ROI</p>
                    <p className="text-2xl font-bold text-terracotta">+{portfolioStats.returnPercentage}%</p>
                  </div>
                  <Percent className="h-8 w-8 text-terracotta" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Active Assets</p>
                    <p className="text-2xl font-bold text-foreground">{portfolioStats.activeAssets}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Portfolio Performance Over Time */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Portfolio Performance Over Time */}
            <Card className="border-border bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="font-display text-xl text-foreground">Portfolio Performance</CardTitle>
                <CardDescription>Your investment growth over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Portfolio Value",
                      color: "hsl(var(--accent))",
                    },
                    roi: {
                      label: "ROI %",
                      color: "hsl(var(--secondary))",
                    },
                  }}
                  className="h-64"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={portfolioPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="value"
                        stroke="var(--color-value)"
                        strokeWidth={3}
                        dot={{ fill: "var(--color-value)", strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="roi"
                        stroke="var(--color-roi)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: "var(--color-roi)", strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Asset Allocation */}
            <Card className="border-border bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="font-display text-xl text-foreground">Asset Allocation</CardTitle>
                <CardDescription>Distribution of your investments by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Value",
                      color: "hsl(var(--accent))",
                    },
                  }}
                  className="h-64"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={assetAllocationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
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
                </ChartContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {assetAllocationData.map((item, index) => (
                    <div key={item.category} className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm text-muted-foreground">{item.category}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ROI by Asset */}
          <Card className="border-border bg-card shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="font-display text-xl text-foreground">ROI by Asset</CardTitle>
              <CardDescription>Return on investment for each of your assets</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  roi: {
                    label: "ROI %",
                    color: "hsl(var(--secondary))",
                  },
                }}
                className="h-64"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={roiByAssetData} margin={{ bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={12} />
                    <YAxis />
                    <ChartTooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                              <p className="font-semibold text-foreground">{label}</p>
                              <p className="text-sm text-secondary">ROI: {data.roi}%</p>
                              <p className="text-sm text-muted-foreground">Value: ${data.value.toLocaleString()}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar dataKey="roi" fill="var(--color-roi)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Portfolio Table */}
          <Card className="border-border bg-card shadow-lg">
            <CardHeader>
              <CardTitle className="font-display text-xl text-foreground">Your Assets</CardTitle>
              <CardDescription>Detailed view of your cultural asset investments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="space-y-4">
                  {portfolio.map((asset) => (
                    <div
                      key={asset.id}
                      className="border border-border bg-card rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 items-center">
                        <div className="lg:col-span-2">
                          <h3 className="font-semibold text-foreground text-lg mb-1">{asset.assetName}</h3>
                          <p className="text-sm text-muted-foreground mb-2">by {asset.artist}</p>
                          <Badge variant="outline" className="text-xs border-border">
                            {asset.category}
                          </Badge>
                        </div>

                        <div className="text-center">
                          <div className="text-lg font-bold text-foreground mb-1">{asset.ownershipPercent}%</div>
                          <p className="text-sm text-muted-foreground">{asset.sharesOwned} shares</p>
                        </div>

                        <div className="text-center">
                          <div className="text-lg font-bold text-accent mb-1">
                            ${asset.currentValue.toLocaleString()}
                          </div>
                          <p className="text-sm text-muted-foreground">Current Value</p>
                        </div>

                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            {asset.trend === "up" ? (
                              <TrendingUp className="h-4 w-4 text-secondary" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-destructive" />
                            )}
                            <span
                              className={`font-bold text-lg ${
                                asset.trend === "up" ? "text-secondary" : "text-destructive"
                              }`}
                            >
                              +{asset.roi}%
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">ROI</p>
                        </div>

                        <div className="text-center">
                          <div className="text-sm text-muted-foreground mb-1">Last Updated</div>
                          <div className="text-sm font-medium text-foreground">{asset.lastUpdate}</div>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Buy More
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-terracotta text-terracotta hover:bg-terracotta hover:text-terracotta-foreground bg-transparent"
                          >
                            <Minus className="h-4 w-4 mr-1" />
                            Sell Shares
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="mt-8 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/marketplace">
                  <Plus className="h-5 w-5 mr-2" />
                  Discover New Assets
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
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
