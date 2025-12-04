"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, X, User, TrendingUp, Eye, DollarSign, ShoppingCart, Check } from "lucide-react"

export default function LicensingPage() {
  const router = useRouter()
  const [selectedLicense, setSelectedLicense] = useState<any>(null)
  const [counterOfferAmount, setCounterOfferAmount] = useState("")
  const [watchlist, setWatchlist] = useState<string[]>([])
  const [cart, setCart] = useState<string[]>([])
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null)

  const mockLicenses = [
    {
      id: "1",
      name: "Ancestral Rhythms",
      type: "Sync Licensing",
      variants: "Commercial License",
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
      image: "/afrobeat-music-album-cover-modern.jpg",
      owner: "Kofi Mensah",
      ownerAvatar: "/placeholder.svg?height=40&width=40",
      availableUnits: 5,
      totalUnits: 10,
      category: "Music",
      stats: {
        totalRevenue: 2250,
        avgPrice: 475,
        successRate: 94,
      },
    },
    {
      id: "2",
      name: "Lagos Nights",
      type: "AI Training Rights",
      variants: "Training License",
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
      image: "/african-film-cinema-poster-modern.jpg",
      owner: "Amara Okafor",
      ownerAvatar: "/placeholder.svg?height=40&width=40",
      availableUnits: 3,
      totalUnits: 5,
      category: "Film",
      stats: {
        totalRevenue: 8400,
        avgPrice: 1150,
        successRate: 89,
      },
    },
    {
      id: "3",
      name: "Ubuntu Stories",
      type: "Remix Rights",
      variants: "Remixable License",
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
      image: "/african-digital-art-geometric-colorful.jpg",
      owner: "Chinwe Adeyemi",
      ownerAvatar: "/placeholder.svg?height=40&width=40",
      availableUnits: 2,
      totalUnits: 8,
      category: "Art",
      stats: {
        totalRevenue: 4800,
        avgPrice: 800,
        successRate: 75,
      },
    },
    {
      id: "4",
      name: "Kente Fusion",
      type: "Commercial Use",
      variants: "Full Rights License",
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
      image: "/african-fashion-design-modern-clothing.jpg",
      owner: "Kwame Nkrumah",
      ownerAvatar: "/placeholder.svg?height=40&width=40",
      availableUnits: 10,
      totalUnits: 10,
      category: "Fashion",
      stats: {
        totalRevenue: 3500,
        avgPrice: 350,
        successRate: 100,
      },
    },
    {
      id: "5",
      name: "Afrobeat Revolution",
      type: "Exclusive License",
      variants: "Worldwide Rights",
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
      image: "/animated-kids-show-colorful-characters.jpg",
      owner: "Nia Williams",
      ownerAvatar: "/placeholder.svg?height=40&width=40",
      availableUnits: 1,
      totalUnits: 1,
      category: "Animation",
      stats: {
        totalRevenue: 20000,
        avgPrice: 5000,
        successRate: 100,
      },
    },
    {
      id: "6",
      name: "Maasai Portraits",
      type: "Commercial Use",
      variants: "Print & Digital",
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
      image: "/music-production-sound-waves-studio-equipment.jpg",
      owner: "Jomo Kenyatta",
      ownerAvatar: "/placeholder.svg?height=40&width=40",
      availableUnits: 7,
      totalUnits: 12,
      category: "Audio",
      stats: {
        totalRevenue: 1500,
        avgPrice: 300,
        successRate: 83,
      },
    },
    {
      id: "7",
      name: "Sahara Dreams",
      type: "Translation Rights",
      variants: "Multilingual Rights",
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
      image: "/documentary-film-africa-culture-storytelling.jpg",
      owner: "Fatima Hassan",
      ownerAvatar: "/placeholder.svg?height=40&width=40",
      availableUnits: 4,
      totalUnits: 6,
      category: "Documentary",
      stats: {
        totalRevenue: 1500,
        avgPrice: 750,
        successRate: 67,
      },
    },
    {
      id: "8",
      name: "Nollywood Rising",
      type: "Distribution Rights",
      variants: "Streaming Rights",
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
      image: "/professional-photography-african-portraits.jpg",
      owner: "Olusegun Obasanjo",
      ownerAvatar: "/placeholder.svg?height=40&width=40",
      availableUnits: 2,
      totalUnits: 4,
      category: "Photography",
      stats: {
        totalRevenue: 5000,
        avgPrice: 2500,
        successRate: 50,
      },
    },
  ]

  const filteredLicenses = mockLicenses

  const handleAddToCart = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!watchlist.includes(id)) {
      setWatchlist([...watchlist, id])
      setShowSuccessMessage("Added to watchlist!")
      setTimeout(() => setShowSuccessMessage(null), 2000)
    }
  }

  const handleSelectIP = (license: any) => {
    setSelectedLicense(license)
    setCounterOfferAmount(license.price.toString())
  }

  const handleSubmitCounterOffer = () => {
    if (!counterOfferAmount || Number.parseFloat(counterOfferAmount) <= 0) {
      alert("Please enter a valid amount")
      return
    }

    const originalPrice = selectedLicense.price
    const offerPrice = Number.parseFloat(counterOfferAmount)

    setShowSuccessMessage(
      `Counter offer of $${offerPrice.toLocaleString()} submitted! We'll notify you when the owner responds.`,
    )
    setTimeout(() => setShowSuccessMessage(null), 3000)

    setSelectedLicense(null)
    setCounterOfferAmount("")
  }

  const handleLicenseNow = () => {
    setShowSuccessMessage(`Processing license purchase for ${selectedLicense.name}...`)
    setTimeout(() => {
      setShowSuccessMessage("License purchased successfully!")
      setSelectedLicense(null)
      setTimeout(() => setShowSuccessMessage(null), 2000)
    }, 1500)
  }

  const handleAddToCartFromModal = () => {
    if (!cart.includes(selectedLicense.id)) {
      setCart([...cart, selectedLicense.id])
      setShowSuccessMessage(`${selectedLicense.name} added to cart!`)
      setTimeout(() => setShowSuccessMessage(null), 2000)
    } else {
      setShowSuccessMessage("Already in cart!")
      setTimeout(() => setShowSuccessMessage(null), 2000)
    }
  }

  return (
    <main className="min-h-screen bg-background pt-16">
      {showSuccessMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm">
          <Check className="w-4 h-4" />
          {showSuccessMessage}
        </div>
      )}

      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
        {/* IP Listings Grid */}
        <div className="grid grid-cols-2 gap-3 md:gap-6">
          {filteredLicenses.map((license) => (
            <Card
              key={license.id}
              className="group relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white dark:bg-gray-900"
              onClick={() => handleSelectIP(license)}
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  src={license.image || "/placeholder.svg"}
                  alt={license.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Add Button */}
                <button
                  onClick={(e) => handleAddToCart(license.id, e)}
                  className={`absolute bottom-3 right-3 md:bottom-4 md:right-4 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all ${
                    watchlist.includes(license.id) ? "bg-green-500 text-white" : "bg-white dark:bg-black"
                  }`}
                  aria-label="Add to watchlist"
                >
                  {watchlist.includes(license.id) ? (
                    <Check className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    <Plus className="w-4 h-4 md:w-5 md:h-5" />
                  )}
                </button>
              </div>

              {/* Product Info */}
              <div className="p-3 md:p-4">
                <h3 className="font-semibold text-sm md:text-base mb-1 line-clamp-1">{license.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-2">
                  {license.type} • {license.variants}
                </p>
                <p className="font-bold text-sm md:text-base">${license.price.toLocaleString()}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {selectedLicense && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
          onClick={() => setSelectedLicense(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 w-full md:max-w-lg md:rounded-lg overflow-hidden max-h-[85vh] overflow-y-auto rounded-t-2xl md:rounded-t-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedLicense(null)}
              className="absolute top-3 right-3 z-10 w-7 h-7 md:w-8 md:h-8 bg-white dark:bg-black rounded-full flex items-center justify-center shadow-lg"
            >
              <X className="w-3 h-3 md:w-4 md:h-4" />
            </button>

            {/* IP Image */}
            <div className="relative w-full h-48 md:h-64 bg-gray-100 dark:bg-gray-800">
              <Image
                src={selectedLicense.image || "/placeholder.svg"}
                alt={selectedLicense.name}
                fill
                className="object-cover"
              />
            </div>

            {/* IP Details */}
            <div className="p-3 md:p-5 space-y-3 md:space-y-4">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h2 className="text-base md:text-xl font-bold mb-0.5">{selectedLicense.name}</h2>
                    <p className="text-xs text-muted-foreground">{selectedLicense.category}</p>
                  </div>
                  <Badge
                    variant={selectedLicense.availability === "Available" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {selectedLicense.availability}
                  </Badge>
                </div>
                <p className="text-xl md:text-2xl font-bold">${selectedLicense.price.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{selectedLicense.term} term</p>
              </div>

              {/* Owner Info */}
              <div className="flex items-center gap-2 p-2 md:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <User className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-muted-foreground">Owner</p>
                  <p className="font-semibold text-xs md:text-sm">{selectedLicense.owner}</p>
                </div>
              </div>

              {/* License Info */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between py-1.5 border-b dark:border-gray-800">
                  <span className="text-xs text-muted-foreground">License Type</span>
                  <span className="font-medium text-xs">{selectedLicense.type}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b dark:border-gray-800">
                  <span className="text-xs text-muted-foreground">Available Units</span>
                  <span className="font-medium text-xs">
                    {selectedLicense.availableUnits} / {selectedLicense.totalUnits}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b dark:border-gray-800">
                  <span className="text-xs text-muted-foreground">Expires</span>
                  <span className="font-medium text-xs">{selectedLicense.expires}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                  <Eye className="w-3 h-3 md:w-4 md:h-4 mx-auto mb-0.5 text-muted-foreground" />
                  <p className="text-sm md:text-base font-bold">{selectedLicense.views}</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground">Views</p>
                </div>
                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4 mx-auto mb-0.5 text-muted-foreground" />
                  <p className="text-sm md:text-base font-bold">{selectedLicense.stats.successRate}%</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground">Success</p>
                </div>
                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                  <DollarSign className="w-3 h-3 md:w-4 md:h-4 mx-auto mb-0.5 text-muted-foreground" />
                  <p className="text-sm md:text-base font-bold">${selectedLicense.stats.avgPrice}</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground">Avg Price</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-sm mb-1.5">Description</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{selectedLicense.description}</p>
              </div>

              {/* Counter Offer Section */}
              {selectedLicense.negotiable && (
                <div className="space-y-2 pt-3 border-t dark:border-gray-800">
                  <h3 className="font-semibold text-sm">Submit Counter Offer</h3>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={counterOfferAmount}
                      onChange={(e) => setCounterOfferAmount(e.target.value)}
                      className="flex-1 h-9 text-sm"
                    />
                    <Button
                      onClick={handleSubmitCounterOffer}
                      disabled={!counterOfferAmount || Number.parseFloat(counterOfferAmount) <= 0}
                      className="whitespace-nowrap h-9 text-sm"
                    >
                      Submit
                    </Button>
                  </div>
                  <p className="text-[10px] md:text-xs text-muted-foreground">
                    Original price: ${selectedLicense.price.toLocaleString()}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button onClick={handleLicenseNow} className="flex-1 h-9 text-sm">
                  License Now
                </Button>
                <Button
                  onClick={handleAddToCartFromModal}
                  variant="outline"
                  className="flex-1 bg-transparent h-9 text-sm flex items-center justify-center gap-1"
                >
                  {cart.includes(selectedLicense.id) ? (
                    <>
                      <Check className="w-3 h-3" />
                      In Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-3 h-3" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
