"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import Image from "next/image"
import {
  ShoppingCart,
  Clock,
  DollarSign,
  FileText,
  CheckCircle,
  Heart,
  Eye,
  MessageSquare,
  TrendingUp,
  Star,
  Gavel,
  AlertCircle,
} from "lucide-react"
import { useState, useMemo } from "react"

export default function LicensingHubPage() {
  const [selectedLicense, setSelectedLicense] = useState<any>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isBidModalOpen, setIsBidModalOpen] = useState(false)
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false)
  const [isCustomRequestOpen, setIsCustomRequestOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLicenseType, setSelectedLicenseType] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([])
  const [bidAmount, setBidAmount] = useState("")
  const [bidMessage, setBidMessage] = useState("")
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false)
  const [selectedIP, setSelectedIP] = useState<any>(null)

  const licenses = [
    {
      id: "1",
      assetName: "Ancestral Rhythms",
      artist: "Amara Okafor",
      category: "Digital Art",
      licenseType: "Commercial Use",
      price: 500,
      term: "2 Years",
      description: "Full commercial rights for marketing, advertising, and product placement",
      availability: "Available",
      expires: "2026-12-31",
      views: 1247,
      bids: 3,
      rating: 4.8,
      lastSold: 450,
      trending: true,
      negotiable: true,
      preview: true,
    },
    {
      id: "2",
      assetName: "Lagos Nights",
      artist: "Kemi Adebayo",
      category: "Music Album",
      licenseType: "AI Training Rights",
      price: 1200,
      term: "Perpetual",
      description: "Rights to use music for AI model training and development",
      availability: "Available",
      expires: "Never",
      views: 892,
      bids: 7,
      rating: 4.9,
      lastSold: 1100,
      trending: false,
      negotiable: true,
      preview: true,
    },
    {
      id: "3",
      assetName: "Ubuntu Stories",
      artist: "Thabo Mthembu",
      category: "Short Film",
      licenseType: "Remix Rights",
      price: 800,
      term: "1 Year",
      description: "Permission to create derivative works and remixes",
      availability: "Limited",
      expires: "2025-06-15",
      views: 654,
      bids: 2,
      rating: 4.6,
      lastSold: 750,
      trending: true,
      negotiable: false,
      preview: false,
    },
    {
      id: "4",
      assetName: "Kente Fusion",
      artist: "Esi Mensah",
      category: "Fashion Design",
      licenseType: "Commercial Use",
      price: 350,
      term: "5 Years",
      description: "Commercial manufacturing and distribution rights",
      availability: "Available",
      expires: "2029-03-20",
      views: 423,
      bids: 1,
      rating: 4.7,
      lastSold: 320,
      trending: false,
      negotiable: true,
      preview: true,
    },
    {
      id: "5",
      assetName: "Afrobeat Revolution",
      artist: "Seun Kuti",
      category: "Music Album",
      licenseType: "Exclusive License",
      price: 5000,
      term: "Perpetual",
      description: "Exclusive worldwide distribution and performance rights",
      availability: "Premium",
      expires: "Never",
      views: 2156,
      bids: 12,
      rating: 5.0,
      lastSold: 4800,
      trending: true,
      negotiable: true,
      preview: false,
    },
    {
      id: "6",
      assetName: "Maasai Portraits",
      artist: "Grace Wanjiku",
      category: "Photography",
      licenseType: "Commercial Use",
      price: 300,
      term: "3 Years",
      description: "Commercial usage for publications and media",
      availability: "Available",
      expires: "2027-09-10",
      views: 567,
      bids: 0,
      rating: 4.5,
      lastSold: 280,
      trending: false,
      negotiable: true,
      preview: true,
    },
    {
      id: "7",
      assetName: "Sahara Dreams",
      artist: "Fatima Al-Zahra",
      category: "Literature",
      licenseType: "Translation Rights",
      price: 750,
      term: "2 Years",
      description: "Rights to translate and publish in multiple languages",
      availability: "Available",
      expires: "2026-11-30",
      views: 334,
      bids: 4,
      rating: 4.8,
      lastSold: 700,
      trending: false,
      negotiable: true,
      preview: true,
    },
    {
      id: "8",
      assetName: "Nollywood Rising",
      artist: "Chioma Okafor",
      category: "Feature Film",
      licenseType: "Distribution Rights",
      price: 2500,
      term: "5 Years",
      description: "Regional distribution rights for streaming platforms",
      availability: "Limited",
      expires: "2029-08-15",
      views: 1089,
      bids: 8,
      rating: 4.9,
      lastSold: 2300,
      trending: true,
      negotiable: true,
      preview: false,
    },
  ]

  const ipAssets = [
    {
      id: "1",
      name: "Afrobeat Symphony EP",
      variant: "Full Rights License",
      price: 2500,
      image: "/afrobeat-music-album-cover-modern.jpg",
      category: "Music",
    },
    {
      id: "2",
      name: "Lagos Chronicles Film",
      variant: "Distribution Rights",
      price: 8500,
      image: "/african-film-cinema-poster-modern.jpg",
      category: "Film",
    },
    {
      id: "3",
      name: "Digital Art Collection",
      variant: "Commercial Use",
      price: 1200,
      image: "/african-digital-art-geometric-colorful.jpg",
      category: "Art",
    },
    {
      id: "4",
      name: "Heritage Fashion Line",
      variant: "Exclusive License",
      price: 5000,
      image: "/african-fashion-design-modern-clothing.jpg",
      category: "Fashion",
    },
    {
      id: "5",
      name: "Animation Series IP",
      variant: "Syndication Rights",
      price: 15000,
      image: "/animated-kids-show-colorful-characters.jpg",
      category: "Animation",
    },
    {
      id: "6",
      name: "Sound Pack Pro",
      variant: "Unlimited Use",
      price: 800,
      image: "/music-production-sound-waves-studio-equipment.jpg",
      category: "Audio",
    },
    {
      id: "7",
      name: "Documentary Series",
      variant: "Broadcast Rights",
      price: 12000,
      image: "/documentary-film-africa-culture-storytelling.jpg",
      category: "Film",
    },
    {
      id: "8",
      name: "Photography Portfolio",
      variant: "Print & Digital",
      price: 3500,
      image: "/professional-photography-african-portraits.jpg",
      category: "Photography",
    },
  ]

  const filteredLicenses = useMemo(() => {
    return licenses.filter((license) => {
      const matchesSearch =
        searchTerm === "" ||
        license.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        license.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        license.licenseType.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === "all" || license.category === selectedCategory
      const matchesLicenseType = selectedLicenseType === "all" || license.licenseType === selectedLicenseType

      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "0-500" && license.price <= 500) ||
        (priceRange === "500-1000" && license.price > 500 && license.price <= 1000) ||
        (priceRange === "1000-2500" && license.price > 1000 && license.price <= 2500) ||
        (priceRange === "2500+" && license.price > 2500)

      const matchesAvailability = !showOnlyAvailable || license.availability === "Available"

      return matchesSearch && matchesCategory && matchesLicenseType && matchesPrice && matchesAvailability
    })
  }, [searchTerm, selectedCategory, selectedLicenseType, priceRange, showOnlyAvailable])

  const handleBuyLicense = (license: any) => {
    setSelectedLicense(license)
    setIsCheckoutOpen(true)
  }

  const handleMakeOffer = (license: any) => {
    setSelectedLicense(license)
    setIsBidModalOpen(true)
  }

  const handleToggleFavorite = (licenseId: string) => {
    setFavorites((prev) => (prev.includes(licenseId) ? prev.filter((id) => id !== licenseId) : [...prev, licenseId]))
  }

  const handleToggleCompare = (licenseId: string) => {
    setSelectedForCompare((prev) => {
      if (prev.includes(licenseId)) {
        return prev.filter((id) => id !== licenseId)
      } else if (prev.length < 3) {
        return [...prev, licenseId]
      }
      return prev
    })
  }

  const handleSubmitBid = () => {
    alert(`Offer of $${bidAmount} submitted for ${selectedLicense?.assetName}! The creator will be notified.`)
    setIsBidModalOpen(false)
    setBidAmount("")
    setBidMessage("")
    setSelectedLicense(null)
  }

  const handleCheckoutComplete = () => {
    setIsCheckoutOpen(false)
    alert(`License purchased successfully for ${selectedLicense?.assetName}!`)
    setSelectedLicense(null)
  }

  const handleAddToCart = (ip: any) => {
    alert(`Added ${ip.name} to your licensing cart!`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Licensing Hub</h1>
            <p className="text-muted-foreground">License authentic creative works for your projects</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {ipAssets.map((ip) => (
              <div
                key={ip.id}
                className="group relative bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative aspect-[4/5] bg-muted overflow-hidden">
                  <Image
                    src={ip.image || "/placeholder.svg"}
                    alt={ip.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <button
                    onClick={() => handleAddToCart(ip)}
                    className="absolute bottom-4 right-4 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors shadow-lg"
                    aria-label="Add to cart"
                  >
                    <Plus className="h-6 w-6 text-foreground" />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg text-foreground mb-1">{ip.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{ip.variant}</p>
                  <p className="text-lg font-semibold text-foreground">${ip.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-8">
            <Card className="border-0 shadow-sm">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">{filteredLicenses.length}</div>
                <div className="text-sm text-muted-foreground">Available Licenses</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-accent mb-1">$850</div>
                <div className="text-sm text-muted-foreground">Avg. License Price</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-terracotta mb-1">24</div>
                <div className="text-sm text-muted-foreground">Licenses Sold Today</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-secondary mb-1">156</div>
                <div className="text-sm text-muted-foreground">Active Negotiations</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">89%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-primary">Available Licenses</CardTitle>
              <CardDescription>Browse, compare, and negotiate licenses for creative works</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="space-y-4">
                  {filteredLicenses.map((license) => (
                    <div
                      key={license.id}
                      className="border rounded-lg p-6 hover:shadow-md transition-all duration-200 relative"
                    >
                      {license.trending && (
                        <Badge className="absolute top-4 right-4 bg-accent text-white">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}

                      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 items-center">
                        <div className="lg:col-span-2">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-primary text-lg mb-1">{license.assetName}</h3>
                              <p className="text-sm text-muted-foreground mb-2">by {license.artist}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleFavorite(license.id)}
                              className="p-1"
                            >
                              <Heart
                                className={`h-4 w-4 ${favorites.includes(license.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
                              />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {license.category}
                            </Badge>
                            {license.preview && (
                              <Badge variant="secondary" className="text-xs">
                                <Eye className="h-3 w-3 mr-1" />
                                Preview
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {license.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Gavel className="h-3 w-3" />
                              {license.bids} bids
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {license.rating}
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <FileText className="h-4 w-4 text-accent" />
                            <span className="font-medium text-primary">{license.licenseType}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{license.description}</p>
                          {license.lastSold && (
                            <p className="text-xs text-muted-foreground">Last sold: ${license.lastSold}</p>
                          )}
                        </div>

                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            <DollarSign className="h-4 w-4 text-accent" />
                            <span className="font-bold text-xl text-accent">${license.price}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {license.negotiable ? "Negotiable" : "Fixed price"}
                          </p>
                        </div>

                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            <Clock className="h-4 w-4 text-secondary" />
                            <span className="font-medium text-primary">{license.term}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {license.expires === "Never" ? "No expiry" : `Until ${license.expires}`}
                          </p>
                        </div>

                        <div className="text-center">
                          <Badge
                            variant={
                              license.availability === "Available"
                                ? "default"
                                : license.availability === "Limited"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className="mb-3"
                          >
                            {license.availability}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleBuyLicense(license)}
                              size="sm"
                              className="flex-1 bg-primary hover:bg-primary/90"
                            >
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Buy Now
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleCompare(license.id)}
                              className={selectedForCompare.includes(license.id) ? "bg-accent/10" : ""}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                          {license.negotiable && (
                            <Button
                              onClick={() => handleMakeOffer(license)}
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              <Gavel className="h-4 w-4 mr-1" />
                              Make Offer
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary">Purchase License</DialogTitle>
            <DialogDescription>Complete your license purchase for {selectedLicense?.assetName}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-muted/30">
              <h4 className="font-semibold text-primary mb-2">{selectedLicense?.assetName}</h4>
              <p className="text-sm text-muted-foreground mb-2">{selectedLicense?.licenseType}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Price:</span>
                <span className="font-bold text-accent text-lg">${selectedLicense?.price}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleCheckoutComplete} className="flex-1 bg-primary hover:bg-primary/90">
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Purchase
              </Button>
              <Button variant="outline" onClick={() => setIsCheckoutOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isBidModalOpen} onOpenChange={setIsBidModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary">Make an Offer</DialogTitle>
            <DialogDescription>Submit a custom offer for {selectedLicense?.assetName}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-muted/30">
              <h4 className="font-semibold text-primary mb-1">{selectedLicense?.assetName}</h4>
              <p className="text-sm text-muted-foreground mb-2">Listed at ${selectedLicense?.price}</p>
              {selectedLicense?.lastSold && (
                <p className="text-xs text-muted-foreground">Last sold for ${selectedLicense.lastSold}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Your Offer Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="Enter your offer"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Message to Creator (Optional)</label>
              <Textarea
                placeholder="Explain your offer or intended use..."
                value={bidMessage}
                onChange={(e) => setBidMessage(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              <span>Offers are valid for 7 days. The creator will be notified immediately.</span>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleSubmitBid} className="flex-1 bg-accent hover:bg-accent/90" disabled={!bidAmount}>
                <Gavel className="h-4 w-4 mr-2" />
                Submit Offer
              </Button>
              <Button variant="outline" onClick={() => setIsBidModalOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isCustomRequestOpen} onOpenChange={setIsCustomRequestOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary">Custom License Request</DialogTitle>
            <DialogDescription>Request a custom license that's not currently available</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Asset or Creator</label>
              <Input placeholder="Specify the asset or creator you're interested in" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">License Type Needed</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select license type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="commercial">Commercial Use</SelectItem>
                  <SelectItem value="exclusive">Exclusive Rights</SelectItem>
                  <SelectItem value="ai-training">AI Training</SelectItem>
                  <SelectItem value="remix">Remix Rights</SelectItem>
                  <SelectItem value="distribution">Distribution Rights</SelectItem>
                  <SelectItem value="custom">Custom Terms</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Budget Range</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-500">$0 - $500</SelectItem>
                  <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                  <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                  <SelectItem value="5000+">$5,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Project Details</label>
              <Textarea placeholder="Describe your project and how you plan to use the licensed content..." rows={4} />
            </div>

            <div className="flex space-x-2">
              <Button className="flex-1 bg-primary hover:bg-primary/90">
                <MessageSquare className="h-4 w-4 mr-2" />
                Submit Request
              </Button>
              <Button variant="outline" onClick={() => setIsCustomRequestOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isCompareModalOpen} onOpenChange={setIsCompareModalOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary">Compare Licenses</DialogTitle>
            <DialogDescription>Side-by-side comparison of selected licenses</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {selectedForCompare.map((licenseId) => {
              const license = licenses.find((l) => l.id === licenseId)
              if (!license) return null

              return (
                <Card key={license.id} className="border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{license.assetName}</CardTitle>
                    <CardDescription>{license.artist}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Price:</span>
                      <span className="font-bold text-accent">${license.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span>{license.licenseType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Term:</span>
                      <span>{license.term}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating:</span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {license.rating}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Negotiable:</span>
                      <span>{license.negotiable ? "Yes" : "No"}</span>
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => {
                        handleBuyLicense(license)
                        setIsCompareModalOpen(false)
                      }}
                    >
                      Select This License
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setSelectedForCompare([])}>
              Clear All
            </Button>
            <Button variant="outline" onClick={() => setIsCompareModalOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
