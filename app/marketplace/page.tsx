"use client"

import { useState, useMemo } from "react"
import { Search, Heart, DollarSign, Filter, X, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import Image from "next/image"
import Navigation from "@/components/navigation"

const defaultAssets = [
  {
    id: "1",
    title: "Cyber Knights",
    artist: "Digital Rebellion",
    category: "game-design",
    image: "/sci-fi-futuristic-game-interface-neon-cyberpunk.jpg",
    pricePerShare: 45,
    availableShares: 35,
    growth: "+18.5%",
    isHot: true,
  },
  {
    id: "2",
    title: "Urban Legends",
    artist: "Street Vision",
    category: "game-design",
    image: "/western-video-game-character-design-urban-street.jpg",
    pricePerShare: 65,
    availableShares: 22,
    growth: "+22.3%",
    isHot: true,
  },
  {
    id: "3",
    title: "Pixel Evolution",
    artist: "RetroWave Studios",
    category: "animation",
    image: "/pixel-art-animation-retro-video-game-style.jpg",
    pricePerShare: 38,
    availableShares: 48,
    growth: "+12.7%",
    isHot: false,
  },
  {
    id: "4",
    title: "Neon Dreams",
    artist: "Synthwave Collective",
    category: "animation",
    image: "/synthwave-animation-neon-retro-80s-style.jpg",
    pricePerShare: 52,
    availableShares: 30,
    growth: "+15.8%",
    isHot: false,
  },
  {
    id: "5",
    title: "Electronic Horizons",
    artist: "Beat Makers",
    category: "music",
    image: "/electronic-music-album-cover-dark-professional.jpg",
    pricePerShare: 42,
    availableShares: 28,
    growth: "+10.2%",
    isHot: false,
  },
  {
    id: "6",
    title: "Contemporary Visions",
    artist: "Modern Art Collective",
    category: "art",
    image: "/modern-digital-art-contemporary-abstract.jpg",
    pricePerShare: 75,
    availableShares: 18,
    growth: "+25.4%",
    isHot: true,
  },
  {
    id: "7",
    title: "Afrobeat Revolution",
    artist: "Lagos Sound",
    category: "music",
    image: "/afrobeat-album-cover.png",
    pricePerShare: 55,
    availableShares: 32,
    growth: "+14.6%",
    isHot: false,
  },
  {
    id: "8",
    title: "Spirit Dance",
    artist: "Cultural Animations",
    category: "animation",
    image: "/3d-animation-with-african-cultural-elements.jpg",
    pricePerShare: 48,
    availableShares: 25,
    growth: "+16.9%",
    isHot: true,
  },
  {
    id: "9",
    title: "Abstract Geometry",
    artist: "Pattern Masters",
    category: "art",
    image: "/abstract-african-geometric-art.png",
    pricePerShare: 62,
    availableShares: 20,
    growth: "+19.3%",
    isHot: false,
  },
  {
    id: "10",
    title: "Modern Fashion",
    artist: "Style Innovators",
    category: "fashion",
    image: "/african-fashion-modern.png",
    pricePerShare: 88,
    availableShares: 15,
    growth: "+28.7%",
    isHot: true,
  },
  {
    id: "11",
    title: "Short Film Collection",
    artist: "Cinema Africa",
    category: "film",
    image: "/african-short-film-still.png",
    pricePerShare: 95,
    availableShares: 12,
    growth: "+32.1%",
    isHot: true,
  },
  {
    id: "12",
    title: "Stories Untold",
    artist: "Literary Voices",
    category: "literature",
    image: "/african-literature-book-cover.jpg",
    pricePerShare: 35,
    availableShares: 40,
    growth: "+8.4%",
    isHot: false,
  },
]

function getIPMetricsForAsset(assetId: string) {
  const metrics: Record<string, any> = {
    "1": { signal: 87, sentiment: { positive: 78, neutral: 15, negative: 7 }, risk: "Low", momentum: "High" },
    "2": { signal: 92, sentiment: { positive: 85, neutral: 10, negative: 5 }, risk: "Very Low", momentum: "Very High" },
    "3": { signal: 76, sentiment: { positive: 68, neutral: 22, negative: 10 }, risk: "Medium", momentum: "Moderate" },
    "4": { signal: 81, sentiment: { positive: 72, neutral: 18, negative: 10 }, risk: "Low", momentum: "High" },
    "5": { signal: 74, sentiment: { positive: 65, neutral: 25, negative: 10 }, risk: "Medium", momentum: "Moderate" },
    "6": { signal: 95, sentiment: { positive: 90, neutral: 8, negative: 2 }, risk: "Very Low", momentum: "Very High" },
    "7": { signal: 83, sentiment: { positive: 75, neutral: 17, negative: 8 }, risk: "Low", momentum: "High" },
    "8": { signal: 89, sentiment: { positive: 80, neutral: 14, negative: 6 }, risk: "Low", momentum: "High" },
    "9": { signal: 86, sentiment: { positive: 77, neutral: 16, negative: 7 }, risk: "Low", momentum: "High" },
    "10": { signal: 94, sentiment: { positive: 88, neutral: 9, negative: 3 }, risk: "Very Low", momentum: "Very High" },
    "11": { signal: 96, sentiment: { positive: 92, neutral: 6, negative: 2 }, risk: "Very Low", momentum: "Very High" },
    "12": { signal: 71, sentiment: { positive: 62, neutral: 28, negative: 10 }, risk: "Medium", momentum: "Moderate" },
  }
  return (
    metrics[assetId] || {
      signal: 75,
      sentiment: { positive: 70, neutral: 20, negative: 10 },
      risk: "Medium",
      momentum: "Moderate",
    }
  )
}

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("trending")
  const [priceRange, setPriceRange] = useState([0, 300])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [favorites, setFavorites] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedAsset, setSelectedAsset] = useState<any>(null) // Changed from specific type to any to match updates
  const assetsPerPage = 12 // Renamed from itemsPerPage to assetsPerPage for clarity

  const toggleFavorite = (assetId: string) => {
    setFavorites((prev) => (prev.includes(assetId) ? prev.filter((id) => id !== assetId) : [...prev, assetId]))
  }

  const filteredAndSortedAssets = useMemo(() => {
    const filtered = defaultAssets.filter((asset) => {
      // Changed from assets to defaultAssets
      const matchesSearch =
        asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.artist.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || asset.category === selectedCategory // Simplified category matching
      const matchesPrice = asset.pricePerShare >= priceRange[0] && asset.pricePerShare <= priceRange[1]
      return matchesSearch && matchesCategory && matchesPrice
    })

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.pricePerShare - b.pricePerShare
        case "price-high":
          return b.pricePerShare - a.pricePerShare
        case "availability":
          return b.availableShares - a.availableShares
        case "newest": // Removed old logic, replaced with placeholder
          return 0
        default: // Trending case
          return (
            Number.parseFloat(b.growth.replace("+", "").replace("%", "")) -
            Number.parseFloat(a.growth.replace("+", "").replace("%", ""))
          )
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, priceRange, sortBy])

  // Changed to use currentPage and assetsPerPage for pagination logic
  const paginatedAssets = filteredAndSortedAssets.slice(0, currentPage * assetsPerPage)
  const hasMoreAssets = filteredAndSortedAssets.length > paginatedAssets.length

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-foreground mb-3 tracking-tight uppercase">
              Cultural Marketplace
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Discover and invest in authentic creative works
            </p>
          </div>

          <div className="space-y-4 mb-8 sm:mb-10">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search assets..."
                  className="pl-10 h-11 text-sm border-foreground/20 focus:border-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-11 text-sm border-foreground/20 sm:w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="art">Digital Art</SelectItem>
                  <SelectItem value="film">Film</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="literature">Literature</SelectItem>
                  <SelectItem value="animation">Animation</SelectItem>
                  <SelectItem value="game-design">Game Design</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-11 text-sm border-foreground/20 sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="availability">Most Available</SelectItem>
                </SelectContent>
              </Select>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="h-11 text-sm border-foreground/20 font-medium bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-auto rounded-t-2xl">
                  <SheetHeader className="pb-6">
                    <SheetTitle className="text-lg font-bold uppercase">Filters</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-semibold mb-3 block uppercase tracking-wide">
                        Price Range: ${priceRange[0]} - ${priceRange[1]}
                      </label>
                      <Slider value={priceRange} onValueChange={setPriceRange} max={300} min={0} step={5} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold mb-3 block uppercase tracking-wide">View Mode</label>
                      <div className="flex gap-2">
                        <Button
                          variant={viewMode === "grid" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setViewMode("grid")}
                          className="flex-1 h-10"
                        >
                          <Grid className="h-4 w-4 mr-2" />
                          Grid
                        </Button>
                        <Button
                          variant={viewMode === "list" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setViewMode("list")}
                          className="flex-1 h-10"
                        >
                          <List className="h-4 w-4 mr-2" />
                          List
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8 sm:mb-10">
            <div className="bg-card border border-border p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-foreground mb-1">
                {filteredAndSortedAssets.length}
              </div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Assets</div>
            </div>
            <div className="bg-card border border-border p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-foreground mb-1">$2.4M</div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Market Value</div>
            </div>
            <div className="bg-card border border-border p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-foreground mb-1">89</div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Artists</div>
            </div>
            <div className="bg-card border border-border p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-metric-green mb-1">+12.8%</div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Growth</div>
            </div>
          </div>

          {filteredAndSortedAssets.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground uppercase">No assets found</h3>
              <p className="text-muted-foreground mb-6 text-sm">Try adjusting your filters</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                  setPriceRange([0, 300])
                }}
                variant="outline"
                className="h-11 px-6 font-semibold text-sm border-foreground"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {paginatedAssets.map((asset) => {
                  const ipMetrics = getIPMetricsForAsset(asset.id)
                  return (
                    <div
                      key={asset.id}
                      className="group bg-card border border-border overflow-hidden hover:border-foreground transition-all duration-200 cursor-pointer"
                      onClick={() => setSelectedAsset(asset)}
                    >
                      <div className="relative bg-muted aspect-square overflow-hidden">
                        <Image
                          src={asset.image || "/placeholder.svg"}
                          alt={asset.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {asset.isHot && (
                          <div className="absolute top-2 left-2 bg-foreground text-background px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                            Hot
                          </div>
                        )}
                        <button
                          className="absolute top-2 right-2 h-7 w-7 bg-background/90 hover:bg-background border border-border transition-colors flex items-center justify-center"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(asset.id)
                          }}
                        >
                          <Heart
                            className={`h-3.5 w-3.5 ${
                              favorites.includes(asset.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="p-3 sm:p-4">
                        <div className="mb-2">
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1 font-semibold">
                            {asset.category.replace("-", " ")}
                          </div>
                          <h3 className="font-bold text-sm sm:text-base text-foreground mb-0.5 line-clamp-1">
                            {asset.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">by {asset.artist}</p>
                        </div>

                        <div className="space-y-1.5 mb-3">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-muted-foreground">Available</span>
                            <span className="font-bold text-foreground">{asset.availableShares}%</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-muted-foreground">IP Signal</span>
                            <span className="font-bold text-metric-green">{ipMetrics.signal}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg sm:text-xl font-black text-foreground">${asset.pricePerShare}</span>
                          <span className="text-xs font-bold text-metric-green">{asset.growth}</span>
                        </div>

                        <Button className="w-full h-9 text-xs font-bold uppercase tracking-wide">Invest Now</Button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {hasMoreAssets && (
                <div className="text-center mt-8 sm:mt-12">
                  <Button
                    variant="outline"
                    className="border-foreground text-foreground hover:bg-foreground hover:text-background h-11 px-8 font-semibold text-sm bg-transparent"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Load More ({filteredAndSortedAssets.length - paginatedAssets.length} remaining)
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {selectedAsset && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setSelectedAsset(null)}
        >
          <div
            className="bg-background w-full sm:max-w-4xl sm:rounded-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-background border-b border-border p-4 flex justify-between items-center z-10">
              <h2 className="text-lg font-bold uppercase">{selectedAsset.title}</h2>
              <button
                onClick={() => setSelectedAsset(null)}
                className="h-8 w-8 flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="relative bg-muted aspect-square">
                  <Image
                    src={selectedAsset.image || "/placeholder.svg"}
                    alt={selectedAsset.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <div className="mb-4">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2 font-semibold">
                      {selectedAsset.category.replace("-", " ")}
                    </div>
                    <h3 className="text-2xl font-black mb-1">{selectedAsset.title}</h3>
                    <p className="text-sm text-muted-foreground">by {selectedAsset.artist}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Price per Share</span>
                      <span className="text-xl font-black">${selectedAsset.pricePerShare}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Available Shares</span>
                      <span className="font-bold">{selectedAsset.availableShares}%</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Growth</span>
                      <span className="font-bold text-metric-green">{selectedAsset.growth}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 h-11 font-bold uppercase text-sm">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Invest Now
                    </Button>
                    <Button variant="outline" className="h-11 px-4 border-foreground bg-transparent">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* IP Reputation Section */}
              {(() => {
                const metrics = getIPMetricsForAsset(selectedAsset.id)
                return (
                  <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-bold uppercase mb-4">IP Reputation Index</h3>

                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div className="bg-card border border-border p-4 text-center">
                        <div className="text-4xl font-black text-foreground mb-2">{metrics.signal}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                          IP Signal Score
                        </div>
                      </div>
                      <div className="bg-card border border-border p-4 text-center">
                        <div className="text-4xl font-black text-metric-green mb-2">{metrics.risk}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                          Risk Level
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-xs font-semibold uppercase">Positive Sentiment</span>
                          <span className="text-xs font-bold">{metrics.sentiment.positive}%</span>
                        </div>
                        <div className="h-2 bg-muted overflow-hidden">
                          <div className="h-full bg-metric-green" style={{ width: `${metrics.sentiment.positive}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-xs font-semibold uppercase">Neutral Sentiment</span>
                          <span className="text-xs font-bold">{metrics.sentiment.neutral}%</span>
                        </div>
                        <div className="h-2 bg-muted overflow-hidden">
                          <div
                            className="h-full bg-muted-foreground"
                            style={{ width: `${metrics.sentiment.neutral}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-xs font-semibold uppercase">Negative Sentiment</span>
                          <span className="text-xs font-bold">{metrics.sentiment.negative}%</span>
                        </div>
                        <div className="h-2 bg-muted overflow-hidden">
                          <div className="h-full bg-metric-red" style={{ width: `${metrics.sentiment.negative}%` }} />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-card border border-border p-3 text-center">
                        <div className="text-sm font-bold text-foreground mb-1">{metrics.momentum}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">
                          Momentum
                        </div>
                      </div>
                      <div className="bg-card border border-border p-3 text-center">
                        <div className="text-sm font-bold text-metric-green mb-1">Active</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">
                          Status
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Removed Footer component as it was not present in updates */}
    </div>
  )
}
