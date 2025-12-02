"use client"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  // Mock portfolio data
  const portfolio = [
    {
      id: 1,
      ticker: "AFTR",
      assetName: "After Hours",
      creator: "DJ Afrowave",
      category: "Music",
      invested: 2500,
      currentValue: 3200,
      roi: 28.0,
      shares: 50,
      streams: "2.4M",
      monthlyGrowth: 15.2,
      chartData: [45, 52, 48, 55, 58, 62, 59, 65, 70, 68, 72, 75],
      trend: "up",
    },
    {
      id: 2,
      ticker: "URBN",
      assetName: "Urban Legends",
      creator: "Studio Naija",
      category: "Film",
      invested: 5000,
      currentValue: 6800,
      roi: 36.0,
      shares: 100,
      ticketsSold: "125K",
      boxOffice: "$890K",
      chartData: [60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115],
      trend: "up",
    },
    {
      id: 3,
      ticker: "ANCS",
      assetName: "Ancestors' Tales",
      creator: "Heritage Studios",
      category: "Animation",
      invested: 3000,
      currentValue: 2700,
      roi: -10.0,
      shares: 75,
      views: "850K",
      episodes: 12,
      chartData: [100, 95, 90, 85, 88, 82, 80, 78, 75, 73, 70, 68],
      trend: "down",
    },
    {
      id: 4,
      ticker: "KLBD",
      assetName: "Calabash Designs",
      creator: "Ife Artworks",
      category: "Art",
      invested: 1500,
      currentValue: 1950,
      roi: 30.0,
      shares: 30,
      sales: 245,
      avgPrice: "$450",
      chartData: [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95],
      trend: "up",
    },
    {
      id: 5,
      ticker: "AFBT",
      assetName: "Afrobeats Pack Vol.3",
      creator: "Sound Library Africa",
      category: "Sound Pack",
      invested: 800,
      currentValue: 1100,
      roi: 37.5,
      shares: 20,
      downloads: "5.2K",
      rating: 4.8,
      chartData: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85],
      trend: "up",
    },
    {
      id: 6,
      ticker: "LGSG",
      assetName: "Lagos Street Style",
      creator: "Fashionova Africa",
      category: "Fashion",
      invested: 2200,
      currentValue: 2640,
      roi: 20.0,
      shares: 55,
      orders: "1.8K",
      revenue: "$45K",
      chartData: [70, 75, 72, 78, 80, 85, 88, 92, 95, 98, 102, 105],
      trend: "up",
    },
    {
      id: 7,
      ticker: "KNGD",
      assetName: "Kingdom Chronicles",
      creator: "Nollywood Prime",
      category: "Film",
      invested: 4000,
      currentValue: 3600,
      roi: -10.0,
      shares: 80,
      ticketsSold: "89K",
      boxOffice: "$520K",
      chartData: [120, 115, 110, 105, 100, 95, 90, 85, 80, 78, 75, 72],
      trend: "down",
    },
    {
      id: 8,
      ticker: "SPRT",
      assetName: "Spirit Dance",
      creator: "Ayo Animation",
      category: "Animation",
      invested: 1800,
      currentValue: 2340,
      roi: 30.0,
      shares: 45,
      views: "1.2M",
      episodes: 8,
      chartData: [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105],
      trend: "up",
    },
  ]

  // Portfolio summary stats
  const portfolioStats = {
    totalValue: portfolio.reduce((sum, asset) => sum + asset.currentValue, 0),
    totalInvested: portfolio.reduce((sum, asset) => sum + asset.invested, 0),
    totalReturn: portfolio.reduce((sum, asset) => sum + (asset.currentValue - asset.invested), 0),
    returnPercentage: (
      (portfolio.reduce((sum, asset) => sum + (asset.currentValue - asset.invested), 0) /
        portfolio.reduce((sum, asset) => sum + asset.invested, 0)) *
      100
    ).toFixed(1),
    activeAssets: portfolio.length,
  }

  const generateSparklinePath = (data: number[]) => {
    const width = 120
    const height = 40
    const padding = 2
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * (width - 2 * padding) + padding
      const y = height - padding - ((value - min) / range) * (height - 2 * padding)
      return `${x},${y}`
    })

    return `M ${points.join(" L ")}`
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navigation />

      <main className="flex-grow container mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2">Investor Dashboard</h1>
          <p className="text-base sm:text-lg text-gray-400">Track your cultural IP investments in real-time</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-400 mb-1">Total Portfolio</p>
              <p className="text-2xl font-bold text-white">${portfolioStats.totalValue.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-400 mb-1">Total Return</p>
              <p className="text-2xl font-bold text-green-500">+${portfolioStats.totalReturn.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-400 mb-1">ROI</p>
              <p className="text-2xl font-bold text-yellow-500">+{portfolioStats.returnPercentage}%</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-400 mb-1">Active Assets</p>
              <p className="text-2xl font-bold text-white">{portfolioStats.activeAssets}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-xl text-white">Your IP Investments</CardTitle>
            <CardDescription className="text-gray-400">Real-time performance tracking</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/10">
              {portfolio.map((asset) => (
                <div key={asset.id} className="p-4 sm:p-6 hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Left: Asset info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <h3 className="text-lg sm:text-2xl font-bold text-white uppercase tracking-tight">
                          {asset.ticker}
                        </h3>
                        <span className="text-xs text-gray-500 uppercase">{asset.category}</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{asset.assetName}</p>

                      {/* Streaming/Performance metrics */}
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                        {asset.streams && (
                          <span>
                            <span className="text-gray-600">Streams:</span> {asset.streams}
                          </span>
                        )}
                        {asset.ticketsSold && (
                          <>
                            <span>
                              <span className="text-gray-600">Tickets:</span> {asset.ticketsSold}
                            </span>
                            <span>
                              <span className="text-gray-600">Box Office:</span> {asset.boxOffice}
                            </span>
                          </>
                        )}
                        {asset.views && (
                          <>
                            <span>
                              <span className="text-gray-600">Views:</span> {asset.views}
                            </span>
                            <span>
                              <span className="text-gray-600">Episodes:</span> {asset.episodes}
                            </span>
                          </>
                        )}
                        {asset.sales && (
                          <>
                            <span>
                              <span className="text-gray-600">Sales:</span> {asset.sales}
                            </span>
                            <span>
                              <span className="text-gray-600">Avg Price:</span> {asset.avgPrice}
                            </span>
                          </>
                        )}
                        {asset.downloads && (
                          <>
                            <span>
                              <span className="text-gray-600">Downloads:</span> {asset.downloads}
                            </span>
                            <span>
                              <span className="text-gray-600">Rating:</span> {asset.rating}/5
                            </span>
                          </>
                        )}
                        {asset.orders && (
                          <>
                            <span>
                              <span className="text-gray-600">Orders:</span> {asset.orders}
                            </span>
                            <span>
                              <span className="text-gray-600">Revenue:</span> {asset.revenue}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Center: Sparkline chart */}
                    <div className="flex items-center justify-center sm:flex-1 sm:max-w-[180px]">
                      <svg
                        width="120"
                        height="40"
                        viewBox="0 0 120 40"
                        className="w-full h-auto"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient id={`gradient-${asset.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop
                              offset="0%"
                              stopColor={asset.trend === "up" ? "#22c55e" : "#ef4444"}
                              stopOpacity="0.3"
                            />
                            <stop
                              offset="100%"
                              stopColor={asset.trend === "up" ? "#22c55e" : "#ef4444"}
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>

                        {/* Fill area under the line */}
                        <path
                          d={`${generateSparklinePath(asset.chartData)} L 120,40 L 0,40 Z`}
                          fill={`url(#gradient-${asset.id})`}
                        />

                        {/* Dashed baseline */}
                        <line
                          x1="0"
                          y1="20"
                          x2="120"
                          y2="20"
                          stroke={asset.trend === "up" ? "#22c55e" : "#ef4444"}
                          strokeWidth="0.5"
                          strokeDasharray="2,2"
                          opacity="0.3"
                        />

                        {/* Main line */}
                        <path
                          d={generateSparklinePath(asset.chartData)}
                          fill="none"
                          stroke={asset.trend === "up" ? "#22c55e" : "#ef4444"}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>

                    {/* Right: Value and ROI */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="text-right">
                        <p className="text-xl sm:text-2xl font-bold text-white">
                          {asset.currentValue.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">${asset.invested.toLocaleString()} invested</p>
                      </div>
                      <div className={`px-3 py-2 rounded-lg ${asset.roi >= 0 ? "bg-green-500/20" : "bg-red-500/20"}`}>
                        <p
                          className={`text-base sm:text-lg font-bold ${
                            asset.roi >= 0 ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {asset.roi >= 0 ? "+" : ""}
                          {asset.roi.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
