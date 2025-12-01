"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search, Filter, TrendingUp, Eye, Heart, Grid, List, X, CheckCircle, Users, Flame } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface IPReputationMetrics {
  signal: number
  sentiment: { positive: number; neutral: number; negative: number }
  socialTraction: { instagram: number; twitter: number; tiktok: number }
  creatorRep: string
  riskScore: number
  riskMomentum: "improving" | "stable" | "declining"
  votes: number
  buzz: string
}

const getIPMetricsForAsset = (assetId: string): IPReputationMetrics => {
  const metricsMap: Record<string, IPReputationMetrics> = {
    "1": {
      signal: 8.7,
      sentiment: { positive: 78, neutral: 15, negative: 7 },
      socialTraction: { instagram: 45600, twitter: 23400, tiktok: 128900 },
      creatorRep: "Rising: Nominated for Grammy 2024",
      riskScore: 3,
      riskMomentum: "improving",
      votes: 1240,
      buzz: "High engagement, 15% week-over-week growth",
    },
    "2": {
      signal: 7.4,
      sentiment: { positive: 82, neutral: 12, negative: 6 },
      socialTraction: { instagram: 98200, twitter: 12100, tiktok: 45600 },
      creatorRep: "Established: Featured in 12 major galleries",
      riskScore: 2,
      riskMomentum: "stable",
      votes: 2103,
      buzz: "Museum acquisition discussions ongoing",
    },
    "3": {
      signal: 9.1,
      sentiment: { positive: 85, neutral: 10, negative: 5 },
      socialTraction: { instagram: 156200, twitter: 89400, tiktok: 234500 },
      creatorRep: "Hot: Series A funded, 500k+ monthly active users",
      riskScore: 2,
      riskMomentum: "improving",
      votes: 3567,
      buzz: "Netflix adaptation in pre-production",
    },
    "4": {
      signal: 6.9,
      sentiment: { positive: 71, neutral: 18, negative: 11 },
      socialTraction: { instagram: 67300, twitter: 8900, tiktok: 34200 },
      creatorRep: "Growing: LVMH partnership in talks",
      riskScore: 4,
      riskMomentum: "declining",
      votes: 892,
      buzz: "Patent pending on unique dyeing technique",
    },
    "5": {
      signal: 8.3,
      sentiment: { positive: 81, neutral: 14, negative: 5 },
      socialTraction: { instagram: 234100, twitter: 145300, tiktok: 567800 },
      creatorRep: "Major Player: 20+ published games",
      riskScore: 2,
      riskMomentum: "improving",
      votes: 4521,
      buzz: "New AAA title announcement coming soon",
    },
    "6": {
      signal: 7.8,
      sentiment: { positive: 79, neutral: 16, negative: 5 },
      socialTraction: { instagram: 125600, twitter: 87400, tiktok: 312500 },
      creatorRep: "Emerging: $2M seed funding raised",
      riskScore: 3,
      riskMomentum: "improving",
      votes: 2345,
      buzz: "Community-driven development, strong Discord engagement",
    },
    "7": {
      signal: 8.5,
      sentiment: { positive: 84, neutral: 12, negative: 4 },
      socialTraction: { instagram: 78900, twitter: 156200, tiktok: 89400 },
      creatorRep: "Industry Leader: BAFTA Award Winner",
      riskScore: 1,
      riskMomentum: "stable",
      votes: 5234,
      buzz: "Mainstream adoption accelerating",
    },
    "8": {
      signal: 7.2,
      sentiment: { positive: 75, neutral: 19, negative: 6 },
      socialTraction: { instagram: 54300, twitter: 23100, tiktok: 125600 },
      creatorRep: "Verified: International distribution deals",
      riskScore: 3,
      riskMomentum: "stable",
      votes: 1876,
      buzz: "Regional expansion in progress",
    },
    "9": {
      signal: 8.9,
      sentiment: { positive: 87, neutral: 11, negative: 2 },
      socialTraction: { instagram: 456700, twitter: 234500, tiktok: 987600 },
      creatorRep: "Powerhouse: Multiple award nominations",
      riskScore: 1,
      riskMomentum: "improving",
      votes: 7845,
      buzz: "Cultural phenomenon, viral moments trending weekly",
    },
    "10": {
      signal: 7.6,
      sentiment: { positive: 80, neutral: 13, negative: 7 },
      socialTraction: { instagram: 89200, twitter: 45600, tiktok: 234100 },
      creatorRep: "Established: 15+ years in industry",
      riskScore: 2,
      riskMomentum: "stable",
      votes: 3456,
      buzz: "Consistent quality, loyal fanbase",
    },
    "11": {
      signal: 8.1,
      sentiment: { positive: 83, neutral: 13, negative: 4 },
      socialTraction: { instagram: 167800, twitter: 98400, tiktok: 445600 },
      creatorRep: "Innovation Leader: 5 patents filed",
      riskScore: 2,
      riskMomentum: "improving",
      votes: 2987,
      buzz: "Tech partnerships with major studios",
    },
    "12": {
      signal: 7.9,
      sentiment: { positive: 81, neutral: 14, negative: 5 },
      socialTraction: { instagram: 76500, twitter: 112300, tiktok: 334200 },
      creatorRep: "Rising Star: Festival darling",
      riskScore: 3,
      riskMomentum: "improving",
      votes: 2134,
      buzz: "Indie scene favorite with crossover potential",
    },
  }
  return metricsMap[assetId] || metricsMap["1"]
}

export default function MarketplacePage() {
  // Mock marketplace data
  const assets = [
    {
      id: "1",
      title: "Ancestral Rhythms",
      category: "Digital Art",
      artist: "Amara Okafor",
      image: "/nigerian-traditional-art-bronze.png",
      availableShares: 25,
      pricePerShare: 50,
      totalValue: 2500,
      growth: "+12.5%",
      isHot: true,
    },
    {
      id: "2",
      title: "Lagos Nights",
      category: "Music Album",
      artist: "Kemi Adebayo",
      image: "/nigerian-afrobeat-musician.png",
      availableShares: 40,
      pricePerShare: 125,
      totalValue: 5000,
      growth: "+8.2%",
      isHot: false,
    },
    {
      id: "3",
      title: "Ubuntu Stories",
      category: "Short Film",
      artist: "Thabo Mthembu",
      image: "/nollywood-film-scene.png",
      availableShares: 15,
      pricePerShare: 200,
      totalValue: 8000,
      growth: "+15.7%",
      isHot: true,
    },
    {
      id: "4",
      title: "Kente Fusion",
      category: "Fashion Design",
      artist: "Esi Mensah",
      image: "/nigerian-ankara-fashion.png",
      availableShares: 60,
      pricePerShare: 75,
      totalValue: 3200,
      growth: "+5.1%",
      isHot: false,
    },
    {
      id: "5",
      title: "Sahara Dreams",
      category: "Literature",
      artist: "Fatima Al-Zahra",
      image: "/nigerian-literature-book.png",
      availableShares: 30,
      pricePerShare: 90,
      totalValue: 4500,
      growth: "+9.8%",
      isHot: false,
    },
    {
      id: "6",
      title: "Afrobeat Revolution",
      category: "Music Album",
      artist: "Seun Kuti",
      image: "/nigerian-highlife-instruments.png",
      availableShares: 20,
      pricePerShare: 180,
      totalValue: 7200,
      growth: "+18.3%",
      isHot: true,
    },
    {
      id: "7",
      title: "Maasai Portraits",
      category: "Photography",
      artist: "Grace Wanjiku",
      image: "/nigerian-cultural-photography.png",
      availableShares: 45,
      pricePerShare: 65,
      totalValue: 2800,
      growth: "+3.7%",
      isHot: false,
    },
    {
      id: "8",
      title: "Nollywood Rising",
      category: "Feature Film",
      artist: "Chioma Okafor",
      image: "/nollywood-movie-poster.png",
      availableShares: 35,
      pricePerShare: 250,
      totalValue: 12000,
      growth: "+22.1%",
      isHot: true,
    },
    {
      id: "9",
      title: "Adinkra Symbols",
      category: "Digital Art",
      artist: "Kwame Asante",
      image: "/nigerian-adinkra-symbols.png",
      availableShares: 50,
      pricePerShare: 45,
      totalValue: 1800,
      growth: "+6.4%",
      isHot: false,
    },
    {
      id: "10",
      title: "Highlife Classics",
      category: "Music Album",
      artist: "Nana Ampadu Jr.",
      image: "/nigerian-highlife-band.png",
      availableShares: 25,
      pricePerShare: 110,
      totalValue: 4400,
      growth: "+11.2%",
      isHot: false,
    },
    {
      id: "11",
      title: "Baobab Tales",
      category: "Literature",
      artist: "Aminata Sow",
      image: "/nigerian-storytelling-scene.png",
      availableShares: 40,
      pricePerShare: 80,
      totalValue: 3600,
      growth: "+7.9%",
      isHot: false,
    },
    {
      id: "12",
      title: "Ankara Couture",
      category: "Fashion Design",
      artist: "Folake Coker",
      image: "/nigerian-couture-fashion.png",
      availableShares: 55,
      pricePerShare: 95,
      totalValue: 4200,
      growth: "+13.6%",
      isHot: true,
    },
  ]

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("trending")
  const [priceRange, setPriceRange] = useState([0, 300])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [favorites, setFavorites] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedAsset, setSelectedAsset] = useState<(typeof assets)[0] | null>(null)
  const [showReputationModal, setShowReputationModal] = useState(false)
  const itemsPerPage = 8

  const filteredAndSortedAssets = useMemo(() => {
    const filtered = assets.filter((asset) => {
      const matchesSearch =
        asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === "all" || asset.category.toLowerCase().includes(selectedCategory.toLowerCase())

      const matchesPrice = asset.pricePerShare >= priceRange[0] && asset.pricePerShare <= priceRange[1]

      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.pricePerShare - b.pricePerShare
        case "price-high":
          return b.pricePerShare - a.pricePerShare
        case "newest":
          return Number.parseInt(b.id) - Number.parseInt(a.id)
        case "availability":
          return b.availableShares - a.availableShares
        case "trending":
        default:
          return (
            Number.parseFloat(b.growth.replace("+", "").replace("%", "")) -
            Number.parseFloat(a.growth.replace("+", "").replace("%", ""))
          )
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, sortBy, priceRange])

  const paginatedAssets = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedAssets.slice(0, startIndex + itemsPerPage)
  }, [filteredAndSortedAssets, currentPage])

  const hasMoreAssets = paginatedAssets.length < filteredAndSortedAssets.length

  const toggleFavorite = (assetId: string) => {
    setFavorites((prev) => (prev.includes(assetId) ? prev.filter((id) => id !== assetId) : [...prev, assetId]))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary mb-4 sm:mb-6">
              Cultural <span className="text-accent">Marketplace</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
              Discover, invest in, and trade shares of authentic creative works from talented artists across the
              continent.
            </p>
          </div>

          {/* Filters and Search */}
          <div className="space-y-4 mb-6 sm:mb-8">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search assets, artists, or categories..."
                className="pl-10 h-12 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Mobile Filters Row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="art">Digital Art</SelectItem>
                  <SelectItem value="film">Film</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="literature">Literature</SelectItem>
                  <SelectItem value="photography">Photography</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12 text-base">
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
                  <Button
                    variant="outline"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent h-12 flex-shrink-0"
                  >
                    <Filter className="h-5 w-5 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh] sm:h-auto sm:max-w-md sm:mx-auto">
                  <SheetHeader className="pb-4">
                    <SheetTitle>Filter Assets</SheetTitle>
                    <SheetDescription>Refine your search with advanced filters</SheetDescription>
                  </SheetHeader>
                  <div className="space-y-6 overflow-y-auto max-h-[60vh] sm:max-h-none">
                    <div>
                      <label className="text-sm font-medium mb-3 block">
                        Price Range: ${priceRange[0]} - ${priceRange[1]}
                      </label>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={300}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-3 block">View Mode</label>
                      <div className="flex gap-2">
                        <Button
                          variant={viewMode === "grid" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setViewMode("grid")}
                          className="flex-1"
                        >
                          <Grid className="h-4 w-4 mr-2" />
                          Grid
                        </Button>
                        <Button
                          variant={viewMode === "list" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setViewMode("list")}
                          className="flex-1"
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

          {/* Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Card className="border-border bg-card shadow-sm">
              <CardContent className="pt-3 sm:pt-4 text-center px-3 sm:px-6">
                <div className="text-lg sm:text-2xl font-bold text-foreground mb-1">
                  {filteredAndSortedAssets.length}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {searchQuery || selectedCategory !== "all" ? "Filtered" : "Total"} Assets
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card shadow-sm">
              <CardContent className="pt-3 sm:pt-4 text-center px-3 sm:px-6">
                <div className="text-lg sm:text-2xl font-bold text-accent mb-1">$2.4M</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Market Value</div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card shadow-sm">
              <CardContent className="pt-3 sm:pt-4 text-center px-3 sm:px-6">
                <div className="text-lg sm:text-2xl font-bold text-terracotta mb-1">89</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Active Artists</div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card shadow-sm">
              <CardContent className="pt-3 sm:pt-4 text-center px-3 sm:px-6">
                <div className="text-lg sm:text-2xl font-bold text-secondary mb-1">+12.8%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Avg. Growth</div>
              </CardContent>
            </Card>
          </div>

          {filteredAndSortedAssets.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">No assets found</h3>
              <p className="text-muted-foreground mb-4 text-sm sm:text-base px-2">
                Try adjusting your search terms or filters
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                  setPriceRange([0, 300])
                }}
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground h-12"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              {/* Asset Grid/List */}
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-6"
                    : "space-y-4"
                }
              >
                {paginatedAssets.map((asset) => {
                  const ipMetrics = getIPMetricsForAsset(asset.id)
                  return (
                    <Card
                      key={asset.id}
                      className={`group hover:shadow-xl transition-all duration-300 border-border bg-card shadow-lg overflow-hidden ${
                        viewMode === "list" ? "flex flex-col sm:flex-row" : ""
                      }`}
                    >
                      <div className={`relative ${viewMode === "list" ? "sm:w-48 sm:flex-shrink-0" : ""}`}>
                        <div
                          className={`bg-gradient-to-br from-accent/20 to-terracotta/20 relative overflow-hidden ${
                            viewMode === "list" ? "aspect-video sm:aspect-square" : "aspect-square"
                          }`}
                        >
                          <Image
                            src={asset.image || "/placeholder.svg"}
                            alt={asset.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        {asset.isHot && (
                          <Badge className="absolute top-2 left-2 bg-terracotta hover:bg-terracotta text-terracotta-foreground text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            <span className="hidden xs:inline">Hot</span>
                          </Badge>
                        )}
                        <div className="absolute top-2 right-2 flex gap-1 sm:gap-2">
                          <Badge
                            variant="secondary"
                            className="bg-background/90 dark:bg-card/90 text-foreground border border-border text-xs"
                          >
                            {asset.growth}
                          </Badge>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-6 w-6 p-0 bg-background/90 dark:bg-card/90 hover:bg-accent hover:text-accent-foreground border border-border"
                            onClick={() => toggleFavorite(asset.id)}
                          >
                            <Heart
                              className={`h-3 w-3 ${
                                favorites.includes(asset.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                              }`}
                            />
                          </Button>
                        </div>
                      </div>

                      <div className={viewMode === "list" ? "flex-1" : ""}>
                        <CardHeader className="pb-2 px-4 sm:px-6">
                          <div className="flex justify-between items-start mb-2">
                            <Badge variant="outline" className="text-xs">
                              {asset.category}
                            </Badge>
                          </div>
                          <CardTitle className="font-display text-base sm:text-lg line-clamp-1">
                            {asset.title}
                          </CardTitle>
                          <CardDescription className="text-sm text-muted-foreground">by {asset.artist}</CardDescription>
                        </CardHeader>

                        <CardContent className="pt-0 px-4 sm:px-6">
                          <div className="space-y-2 sm:space-y-3">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Available:</span>
                              <span className="font-semibold text-primary">{asset.availableShares}%</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Price/Share:</span>
                              <span className="font-semibold text-accent">${asset.pricePerShare}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Total Value:</span>
                              <span className="font-semibold text-primary">${asset.totalValue.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Signal:</span>
                              <span className="font-semibold text-accent">{ipMetrics.signal}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Sentiment:</span>
                              <span className="font-semibold text-primary">
                                {ipMetrics.sentiment.positive}% Positive, {ipMetrics.sentiment.neutral}% Neutral,{" "}
                                {ipMetrics.sentiment.negative}% Negative
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Social Traction:</span>
                              <span className="font-semibold text-accent">
                                IG: {ipMetrics.socialTraction.instagram.toLocaleString()}, TW:{" "}
                                {ipMetrics.socialTraction.twitter.toLocaleString()}, TT:{" "}
                                {ipMetrics.socialTraction.tiktok.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Creator Reputation:</span>
                              <span className="font-semibold text-primary">{ipMetrics.creatorRep}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Risk Score:</span>
                              <span className="font-semibold text-accent">{ipMetrics.riskScore}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Risk Momentum:</span>
                              <span className="font-semibold text-primary">{ipMetrics.riskMomentum}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Votes:</span>
                              <span className="font-semibold text-accent">{ipMetrics.votes.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Buzz:</span>
                              <span className="font-semibold text-primary">{ipMetrics.buzz}</span>
                            </div>

                            <Button
                              size="sm"
                              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-3 sm:mt-4 h-10 sm:h-9"
                              onClick={() => {
                                setSelectedAsset(asset)
                                setShowReputationModal(true)
                              }}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Asset & Reputation
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  )
                })}
              </div>

              {hasMoreAssets && (
                <div className="text-center mt-8 sm:mt-12">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent h-12 w-full sm:w-auto"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Load More Assets ({filteredAndSortedAssets.length - paginatedAssets.length} remaining)
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {showReputationModal && selectedAsset && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
          <div className="w-full sm:max-w-4xl bg-card dark:bg-card border border-border rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-b from-card to-card/95 z-10 p-4 sm:p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground">{selectedAsset.title}</h2>
                <p className="text-sm text-muted-foreground">by {selectedAsset.artist}</p>
              </div>
              <button
                onClick={() => {
                  setShowReputationModal(false)
                  setSelectedAsset(null)
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-6">
              {/* Asset Image */}
              <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-muted border border-border/50">
                <Image
                  src={selectedAsset.image || "/placeholder.svg"}
                  alt={selectedAsset.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Bloomberg Style IP Signal Score */}
              <div className="bg-gradient-to-r from-accent/15 to-accent/5 dark:from-accent/25 dark:to-accent/10 border border-accent/20 rounded-xl p-6 sm:p-8">
                <div className="text-center">
                  <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                    IP Signal Score
                  </p>
                  <div className="text-7xl sm:text-8xl font-display font-bold text-accent mb-4">
                    {getIPMetricsForAsset(selectedAsset.id).signal}
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    {getIPMetricsForAsset(selectedAsset.id).riskMomentum === "improving" ? (
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    ) : getIPMetricsForAsset(selectedAsset.id).riskMomentum === "declining" ? (
                      <TrendingUp className="h-5 w-5 text-red-500" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                    )}
                    <span className="text-sm sm:text-base font-semibold capitalize text-foreground">
                      Momentum: {getIPMetricsForAsset(selectedAsset.id).riskMomentum}
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {/* Risk Score */}
                <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
                  <p className="text-xs sm:text-sm text-muted-foreground font-semibold mb-2">Risk Score</p>
                  <div
                    className={`text-4xl sm:text-5xl font-display font-bold ${
                      getIPMetricsForAsset(selectedAsset.id).riskScore <= 2
                        ? "text-green-500"
                        : getIPMetricsForAsset(selectedAsset.id).riskScore <= 3
                          ? "text-yellow-500"
                          : "text-red-500"
                    }`}
                  >
                    {getIPMetricsForAsset(selectedAsset.id).riskScore}/10
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {getIPMetricsForAsset(selectedAsset.id).riskScore <= 2
                      ? "Low Risk"
                      : getIPMetricsForAsset(selectedAsset.id).riskScore <= 3
                        ? "Moderate"
                        : "Higher Risk"}
                  </p>
                </div>

                {/* Community Votes */}
                <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
                  <p className="text-xs sm:text-sm text-muted-foreground font-semibold mb-2">Community Votes</p>
                  <div className="text-3xl sm:text-4xl font-display font-bold text-accent">
                    {(getIPMetricsForAsset(selectedAsset.id).votes / 1000).toFixed(1)}K
                  </div>
                </div>

                {/* Buzz Score */}
                <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
                  <p className="text-xs sm:text-sm text-muted-foreground font-semibold mb-2">Buzz Status</p>
                  <div className="text-2xl font-display font-bold text-terracotta">
                    {getIPMetricsForAsset(selectedAsset.id).buzz.includes("High") ||
                    getIPMetricsForAsset(selectedAsset.id).buzz.includes("Hot")
                      ? "🔥 Hot"
                      : "Steady"}
                  </div>
                </div>
              </div>

              {/* Sentiment Breakdown */}
              <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
                <h3 className="font-semibold text-lg mb-4">Sentiment Breakdown</h3>
                <div className="space-y-3">
                  {[
                    {
                      label: "Positive",
                      value: getIPMetricsForAsset(selectedAsset.id).sentiment.positive,
                      color: "bg-green-500",
                    },
                    {
                      label: "Neutral",
                      value: getIPMetricsForAsset(selectedAsset.id).sentiment.neutral,
                      color: "bg-blue-500",
                    },
                    {
                      label: "Negative",
                      value: getIPMetricsForAsset(selectedAsset.id).sentiment.negative,
                      color: "bg-red-500",
                    },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-bold text-foreground">{item.value}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div
                          className={`${item.color} h-3 rounded-full transition-all duration-300`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Traction */}
              <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  Creator Reputation
                </h3>
                <p className="text-foreground">{getIPMetricsForAsset(selectedAsset.id).creatorRep}</p>
              </div>

              {/* Recent Buzz */}
              <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Flame className="h-5 w-5 text-terracotta" />
                  Recent Buzz
                </h3>
                <p className="text-foreground mb-4">{getIPMetricsForAsset(selectedAsset.id).buzz}</p>
                <div className="grid grid-cols-2 gap-3">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                    <Link href={`/licensing?asset=${selectedAsset.id}`}>Explore Licensing</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => setShowReputationModal(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
