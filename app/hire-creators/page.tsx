"use client"

import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  MapPin,
  Star,
  Verified,
  Users,
  TrendingUp,
  DollarSign,
  ChevronDown,
  Package,
  Shirt,
  ShoppingBag,
  Zap,
  Shield,
  Sparkles,
  ChevronRight,
  ImageIcon,
  Palette,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CommissionModal } from "@/components/creator/CommissionModal"
// import Navigation from "@/components/navigation" // This import is now redundant

interface Creator {
  id: string
  name: string
  category: "micro" | "macro" | "nano" | "artisan"
  specialty: string
  location: string
  country: string
  followers: number
  rating: number
  reviewCount: number
  hourlyRate: number
  responseTime: string
  languages: string[]
  isVerified: boolean
  hasCreatorId: boolean
  portfolio: string[]
  bio: string
  completedProjects: number
  avatar: string
  coverImage: string
  skills: string[]
}

const mockCreators: Creator[] = [
  {
    id: "1",
    name: "Adunni Okafor",
    category: "artisan",
    specialty: "Traditional Pottery & Ceramics",
    location: "Lagos, Nigeria",
    country: "Nigeria",
    followers: 15000,
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 45,
    responseTime: "2 hours",
    languages: ["English", "Yoruba", "Igbo"],
    isVerified: true,
    hasCreatorId: true,
    portfolio: ["/creator-adunni-pottery.png", "/nigerian-traditional-art-bronze.png"],
    bio: "Master potter with 15+ years creating authentic Nigerian ceramics and traditional clay art.",
    completedProjects: 89,
    avatar: "/creator-adunni-pottery.png",
    coverImage: "/nigerian-traditional-art-bronze.png",
    skills: ["Pottery", "Ceramics", "Traditional Art", "Clay Painting"],
  },
  {
    id: "2",
    name: "Kwame Asante",
    category: "macro",
    specialty: "Fashion & Lifestyle Content",
    location: "Accra, Ghana",
    country: "Ghana",
    followers: 250000,
    rating: 4.8,
    reviewCount: 203,
    hourlyRate: 150,
    responseTime: "1 hour",
    languages: ["English", "Twi", "French"],
    isVerified: true,
    hasCreatorId: true,
    portfolio: ["/creator-kwame-textiles.png", "/nigerian-ankara-fashion.png"],
    bio: "Fashion influencer showcasing authentic African style to global audiences.",
    completedProjects: 156,
    avatar: "/creator-kwame-textiles.png",
    coverImage: "/nigerian-ankara-fashion.png",
    skills: ["Fashion Photography", "Brand Partnerships", "Content Creation", "Style Consulting"],
  },
  {
    id: "3",
    name: "Amara Diallo",
    category: "artisan",
    specialty: "Tie-Dye & Textile Art",
    location: "Dakar, Senegal",
    country: "Senegal",
    followers: 8500,
    rating: 4.9,
    reviewCount: 94,
    hourlyRate: 35,
    responseTime: "3 hours",
    languages: ["French", "Wolof", "English"],
    isVerified: true,
    hasCreatorId: true,
    portfolio: ["/creator-amara-fashion.png", "/nigerian-ankara-fashion.png"],
    bio: "Traditional textile artist specializing in authentic West African tie-dye techniques.",
    completedProjects: 67,
    avatar: "/creator-amara-fashion.png",
    coverImage: "/nigerian-ankara-fashion.png",
    skills: ["Tie-Dye", "Textile Design", "Natural Dyeing", "Pattern Creation"],
  },
  {
    id: "4",
    name: "Chidi Okonkwo",
    category: "artisan",
    specialty: "Wood Carving & Sculpture",
    location: "Enugu, Nigeria",
    country: "Nigeria",
    followers: 12000,
    rating: 4.8,
    reviewCount: 76,
    hourlyRate: 55,
    responseTime: "4 hours",
    languages: ["English", "Igbo"],
    isVerified: true,
    hasCreatorId: true,
    portfolio: ["/creator-chidi-woodcarving.png", "/nigerian-traditional-art-bronze.png"],
    bio: "Master wood carver creating contemporary and traditional African sculptures.",
    completedProjects: 43,
    avatar: "/creator-chidi-woodcarving.png",
    coverImage: "/nigerian-traditional-art-bronze.png",
    skills: ["Wood Carving", "Sculpture", "Traditional Art", "Custom Commissions"],
  },
  {
    id: "5",
    name: "Zara Mwangi",
    category: "micro",
    specialty: "Beauty & Skincare",
    location: "Nairobi, Kenya",
    country: "Kenya",
    followers: 45000,
    rating: 4.7,
    reviewCount: 89,
    hourlyRate: 75,
    responseTime: "2 hours",
    languages: ["English", "Swahili"],
    isVerified: true,
    hasCreatorId: true,
    portfolio: ["/nigerian-ankara-fashion.png", "/creator-amara-fashion.png"],
    bio: "Beauty content creator promoting natural African skincare and beauty traditions.",
    completedProjects: 112,
    avatar: "/creator-amara-fashion.png",
    coverImage: "/nigerian-ankara-fashion.png",
    skills: ["Beauty Content", "Product Reviews", "Skincare Education", "Brand Collaborations"],
  },
  {
    id: "6",
    name: "Kofi Mensah",
    category: "nano",
    specialty: "Food & Culture",
    location: "Kumasi, Ghana",
    country: "Ghana",
    followers: 8900,
    rating: 4.6,
    reviewCount: 34,
    hourlyRate: 40,
    responseTime: "6 hours",
    languages: ["English", "Twi"],
    isVerified: false,
    hasCreatorId: true,
    portfolio: ["/creator-kwame-textiles.png", "/nigerian-highlife-instruments.png"],
    bio: "Food blogger sharing authentic Ghanaian recipes and cultural stories.",
    completedProjects: 28,
    avatar: "/creator-kwame-textiles.png",
    coverImage: "/nigerian-highlife-instruments.png",
    skills: ["Food Photography", "Recipe Development", "Cultural Storytelling", "Video Content"],
  },
]

const categories = [
  { value: "all", label: "All Categories" },
  { value: "micro", label: "Micro Influencers (10K-100K)" },
  { value: "macro", label: "Macro Influencers (100K+)" },
  { value: "nano", label: "Nano Influencers (<10K)" },
  { value: "artisan", label: "Traditional Artisans" },
]

const countries = [
  { value: "all", label: "All Countries" },
  { value: "Nigeria", label: "Nigeria" },
  { value: "Ghana", label: "Ghana" },
  { value: "Kenya", label: "Kenya" },
  { value: "Senegal", label: "Senegal" },
  { value: "South Africa", label: "South Africa" },
  { value: "Morocco", label: "Morocco" },
  { value: "Egypt", label: "Egypt" },
]

const specialties = [
  { value: "all", label: "All Specialties" },
  { value: "fashion", label: "Fashion & Style" },
  { value: "beauty", label: "Beauty & Skincare" },
  { value: "food", label: "Food & Culture" },
  { value: "pottery", label: "Pottery & Ceramics" },
  { value: "textiles", label: "Textiles & Tie-Dye" },
  { value: "woodwork", label: "Wood Carving & Sculpture" },
  { value: "photography", label: "Photography" },
  { value: "music", label: "Music & Entertainment" },
]

export default function HireCreatorsPage() {
  const [creators, setCreators] = useState<Creator[]>(mockCreators)
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>(mockCreators)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCountry, setSelectedCountry] = useState("all") // Kept for potential legacy or other uses, but selectedLocation is used in filter
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const [showCommissionModal, setShowCommissionModal] = useState(false)
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null)
  const [showPostProjectModal, setShowPostProjectModal] = useState(false)
  const [postProjectForm, setPostProjectForm] = useState({
    title: "",
    category: "",
    budget: "",
    timeline: "",
    description: "",
    email: "",
  })
  const creatorsRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState<"hire" | "merchlab" | "studios">("hire") // Removed "post" from tab options

  // Added state for new filters
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedBudget, setSelectedBudget] = useState("all")
  const [selectedExperience, setSelectedExperience] = useState("all")

  const [selectedIP, setSelectedIP] = useState<string | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [royaltyRate, setRoyaltyRate] = useState("15")
  const [itemLimit, setItemLimit] = useState("")
  const [merchTab, setMerchTab] = useState("launch")
  const [showPostProject, setShowPostProject] = useState(false) // This is for the dropdown, distinct from showPostProjectModal

  useEffect(() => {
    let filtered = creators

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (creator) =>
          creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          creator.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
          creator.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((creator) => creator.category === selectedCategory)
    }

    // Country filter (now using selectedLocation)
    if (selectedLocation !== "all") {
      filtered = filtered.filter((creator) => creator.country === selectedLocation)
    }

    // Specialty filter
    if (selectedSpecialty !== "all") {
      filtered = filtered.filter(
        (creator) =>
          creator.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase()) ||
          creator.skills.some((skill) => skill.toLowerCase().includes(selectedSpecialty.toLowerCase())),
      )
    }

    // Added filters for budget and experience (assuming these would be mapped to specific values)
    if (selectedBudget !== "all") {
      // Placeholder for budget filtering logic
      // For example: if selectedBudget is "high", filter creators with hourlyRate > 100
      if (selectedBudget === "low") {
        filtered = filtered.filter((creator) => creator.hourlyRate >= 0 && creator.hourlyRate <= 50)
      } else if (selectedBudget === "medium") {
        filtered = filtered.filter((creator) => creator.hourlyRate > 50 && creator.hourlyRate <= 150)
      } else if (selectedBudget === "high") {
        filtered = filtered.filter((creator) => creator.hourlyRate > 150)
      }
    }
    if (selectedExperience !== "all") {
      // Placeholder for experience filtering logic
      // For example: if selectedExperience is "experienced", filter creators with completedProjects > 50
      if (selectedExperience === "entry") {
        filtered = filtered.filter((creator) => creator.completedProjects < 20)
      } else if (selectedExperience === "mid") {
        filtered = filtered.filter((creator) => creator.completedProjects >= 20 && creator.completedProjects <= 50)
      } else if (selectedExperience === "experienced") {
        filtered = filtered.filter((creator) => creator.completedProjects > 50)
      }
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "followers":
          return b.followers - a.followers
        case "price-low":
          return a.hourlyRate - b.hourlyRate
        case "price-high":
          return b.hourlyRate - a.hourlyRate
        case "projects":
          return b.completedProjects - a.completedProjects
        default:
          return 0
      }
    })

    setFilteredCreators(filtered)
  }, [
    searchTerm,
    selectedCategory,
    selectedLocation, // Changed from selectedCountry
    selectedSpecialty,
    sortBy,
    creators,
    selectedBudget, // Added
    selectedExperience, // Added
  ])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "micro":
      case "macro":
      case "nano":
        return <Users className="h-4 w-4" />
      case "artisan":
        return <Palette className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "macro":
        return "bg-primary text-primary-foreground"
      case "micro":
        return "bg-accent text-accent-foreground"
      case "nano":
        return "bg-terracotta text-white"
      case "artisan":
        return "bg-deep-green text-white"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleCommission = (creator: Creator) => {
    setSelectedCreator(creator)
    setShowCommissionModal(true)
  }

  const scrollToCreators = () => {
    creatorsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handlePostProject = async () => {
    // Basic validation
    if (!postProjectForm.title || !postProjectForm.category || !postProjectForm.description || !postProjectForm.email) {
      alert("Please fill in all required fields.")
      return
    }

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postProjectForm),
      })

      if (response.ok) {
        setShowPostProjectModal(false) // This closes the modal if it were used
        setShowPostProject(false) // This closes the dropdown menu
        setPostProjectForm({
          title: "",
          category: "",
          budget: "",
          timeline: "",
          description: "",
          email: "",
        })
        alert("Project posted successfully! Creators will be notified.")
      } else {
        // Handle error response
        const errorData = await response.json()
        alert(`Failed to post project: ${errorData.message || response.statusText}`)
      }
    } catch (error) {
      console.error("Failed to post project:", error)
      alert("An error occurred while posting your project. Please try again later.")
    }
  }

  const creatorIPs = [
    {
      id: "ip-1",
      name: "Cartoon Character IP",
      category: "Animation",
      image: "/colorful-cartoon-character-mascot-design.jpg",
      verified: true,
    },
    {
      id: "ip-2",
      name: "Animated Art NFT",
      category: "Digital Art",
      image: "/animated-digital-art-nft-futuristic-design.jpg",
      verified: true,
    },
    {
      id: "ip-3",
      name: "Abstract Painting IP",
      category: "Fine Art",
      image: "/abstract-modern-painting-colorful-art.jpg",
      verified: true,
    },
    {
      id: "ip-4",
      name: "Rap Album Cover Art",
      category: "Music",
      image: "/hip-hop-rap-album-cover-urban-street-art.jpg",
      verified: true,
    },
  ]

  const productTypes = [
    { id: "tshirt", name: "T-Shirt", icon: Shirt, basePrice: 25 },
    { id: "hoodie", name: "Hoodie", icon: Package, basePrice: 45 },
    { id: "cap", name: "Cap", icon: ShoppingBag, basePrice: 20 },
    { id: "jacket", name: "Jacket", icon: Package, basePrice: 65 },
    { id: "poster", name: "Poster", icon: ImageIcon, basePrice: 15 },
    { id: "sticker", name: "Sticker Pack", icon: Sparkles, basePrice: 8 },
  ]

  const merchStats = [
    { label: "Total Revenue", value: "$12,450", icon: DollarSign, trend: "+23%" },
    { label: "Items Sold", value: "487", icon: Package, trend: "+18%" },
    { label: "Active Drops", value: "12", icon: Zap, trend: "+5%" },
    { label: "Avg. Rating", value: "4.8", icon: Star, trend: "+0.2" },
  ]

  const trendingProducts = [
    { name: "Abstract Vibes Hoodie", sales: 142, revenue: "$6,390", serialRange: "001-142" },
    { name: "Urban Street Tee", sales: 98, revenue: "$2,450", serialRange: "001-098" },
    { name: "Character Cap", sales: 76, revenue: "$1,520", serialRange: "001-076" },
  ]

  const handleLaunchMerch = () => {
    if (!selectedIP || selectedProducts.length === 0) {
      alert("Please select an IP and at least one product type")
      return
    }
    alert(`Merch launched for IP ${selectedIP} with products ${selectedProducts.join(", ")}!`)
  }

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <section className="py-4 sm:py-6 px-3 sm:px-4 bg-muted/30 border-b">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold mb-1">Creator Hub</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">Find verified talent for your projects</p>
        </div>
      </section>

      <section className="bg-card border-b sticky top-16 sm:top-20 z-40">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex items-center gap-1 sm:gap-2 py-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("hire")}
              className={`px-2 sm:px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all border-b-2 ${
                activeTab === "hire"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Hire Creators
            </button>

            <button
              onClick={() => setActiveTab("merchlab")}
              className={`px-2 sm:px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all border-b-2 ${
                activeTab === "merchlab"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Package className="w-3 h-3 inline mr-1" />
              MerchLab
            </button>

            <button
              onClick={() => setActiveTab("studios")}
              className={`px-2 sm:px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all border-b-2 ${
                activeTab === "studios"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Studios
            </button>
          </div>
        </div>
      </section>

      {/* Hire Creators section */}
      {activeTab === "hire" && (
        <>
          <div className="bg-card border-b">
            <div className="max-w-7xl mx-auto px-2 sm:px-4">
              <button
                onClick={() => setShowPostProject(!showPostProject)}
                className="w-full text-left px-2 py-2 text-xs font-medium text-muted-foreground hover:text-foreground flex items-center justify-between"
              >
                <span>Post Project</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${showPostProject ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

          {showPostProject && (
            <div className="bg-card border-b shadow-sm">
              <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3">
                <div className="space-y-2">
                  <Input
                    placeholder="Project Title"
                    className="h-8 text-xs"
                    value={postProjectForm.title}
                    onChange={(e) => setPostProjectForm((prev) => ({ ...prev, title: e.target.value }))}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Select
                      value={postProjectForm.category}
                      onValueChange={(value) => setPostProjectForm((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fashion">Fashion</SelectItem>
                        <SelectItem value="beauty">Beauty</SelectItem>
                        <SelectItem value="music">Music</SelectItem>
                        <SelectItem value="artisan">Artisan</SelectItem>
                        <SelectItem value="photography">Photography</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Budget ($)"
                      type="number"
                      className="h-8 text-xs"
                      value={postProjectForm.budget}
                      onChange={(e) => setPostProjectForm((prev) => ({ ...prev, budget: e.target.value }))}
                    />
                  </div>
                  <Textarea
                    placeholder="Description"
                    rows={2}
                    className="text-xs"
                    value={postProjectForm.description}
                    onChange={(e) => setPostProjectForm((prev) => ({ ...prev, description: e.target.value }))}
                  />
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Contact Email"
                      type="email"
                      className="h-8 text-xs"
                      value={postProjectForm.email}
                      onChange={(e) => setPostProjectForm((prev) => ({ ...prev, email: e.target.value }))}
                    />
                    <Button onClick={handlePostProject} size="sm" className="h-8 text-xs">
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <section className="bg-muted/30 border-b">
            <div className="max-w-7xl mx-auto px-3 sm:px-4">
              <div className="grid grid-cols-4 gap-2 text-center">
                <div>
                  <div className="text-base sm:text-lg font-bold">500+</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">Creators</div>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold">50+</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">Countries</div>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold">2M+</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">Reach</div>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold">98%</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">Success</div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-2 bg-muted/50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4">
              <div className="space-y-1.5">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-3 w-3" />
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-7 h-7 text-xs"
                  />
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="h-7 text-[10px] sm:text-xs">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value} className="text-xs">
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="h-7 text-[10px] sm:text-xs">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value} className="text-xs">
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger className="h-7 text-[10px] sm:text-xs">
                      <SelectValue placeholder="Specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty.value} value={specialty.value} className="text-xs">
                          {specialty.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-7 text-[10px] sm:text-xs">
                      <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating" className="text-xs">
                        Top Rated
                      </SelectItem>
                      <SelectItem value="followers" className="text-xs">
                        Most Followers
                      </SelectItem>
                      <SelectItem value="price-low" className="text-xs">
                        Price Low
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                    <SelectTrigger className="h-7 text-[10px] sm:text-xs">
                      <SelectValue placeholder="Budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" className="text-xs">
                        All Budgets
                      </SelectItem>
                      <SelectItem value="low" className="text-xs">
                        Low ($0-$50/hr)
                      </SelectItem>
                      <SelectItem value="medium" className="text-xs">
                        Medium ($50-$150/hr)
                      </SelectItem>
                      <SelectItem value="high" className="text-xs">
                        High ($150+/hr)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                    <SelectTrigger className="h-7 text-[10px] sm:text-xs">
                      <SelectValue placeholder="Experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" className="text-xs">
                        All Experience
                      </SelectItem>
                      <SelectItem value="entry" className="text-xs">
                        Entry-Level
                      </SelectItem>
                      <SelectItem value="mid" className="text-xs">
                        Mid-Level
                      </SelectItem>
                      <SelectItem value="experienced" className="text-xs">
                        Experienced
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory("all")
                      setSelectedLocation("all")
                      setSelectedSpecialty("all")
                      setSortBy("rating")
                      setSearchTerm("")
                      setSelectedBudget("all")
                      setSelectedExperience("all")
                    }}
                    className="h-7 text-[10px] sm:text-xs"
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Creator grid */}
          <section ref={creatorsRef} className="py-3 sm:py-4">
            <div className="max-w-7xl mx-auto px-3 sm:px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                {filteredCreators.map((creator) => (
                  <Card key={creator.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-24 sm:h-32">
                      <Image
                        src={creator.coverImage || "/placeholder.svg"}
                        alt={creator.name}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute top-1.5 left-1.5 text-[10px] h-5 px-1.5">{creator.category}</Badge>
                    </div>
                    <CardHeader className="p-2 sm:p-3 pb-1">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                          <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-[10px]">
                            {creator.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-xs flex items-center gap-1">
                            <span className="truncate">{creator.name}</span>
                            {creator.isVerified && <Verified className="h-2.5 w-2.5 text-blue-500" />}
                          </h3>
                          <p className="text-[10px] text-muted-foreground truncate">{creator.specialty}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-2 sm:p-3 pt-0 space-y-1.5">
                      <div className="flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-0.5">
                          <Star className="h-2.5 w-2.5 text-yellow-400" />
                          <span className="font-medium">{creator.rating}</span>
                          <span className="text-muted-foreground ml-0.5">({creator.reviewCount})</span>
                        </div>
                        <span className="text-muted-foreground">{creator.followers.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <div className="font-semibold text-xs">${creator.hourlyRate}/hr</div>
                        <div className="text-[10px] text-muted-foreground">{creator.completedProjects} jobs</div>
                      </div>
                      <div className="flex gap-1.5 pt-1">
                        <Link href={`/creator/${creator.id}`} className="flex-1">
                          <Button variant="outline" className="w-full h-7 text-[10px] bg-transparent">
                            View
                          </Button>
                        </Link>
                        <Button className="flex-1 h-7 text-[10px]" onClick={() => handleCommission(creator)}>
                          Hire
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {activeTab === "merchlab" && (
        <section className="py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-3 sm:px-4">
            <Tabs value={merchTab} onValueChange={setMerchTab} className="space-y-3">
              <TabsList className="grid w-full grid-cols-3 h-auto p-0.5">
                <TabsTrigger value="launch" className="text-[10px] sm:text-xs py-1.5">
                  <Zap className="w-3 h-3 mr-1" />
                  Launch
                </TabsTrigger>
                <TabsTrigger value="dashboard" className="text-[10px] sm:text-xs py-1.5">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Stats
                </TabsTrigger>
                <TabsTrigger value="store" className="text-[10px] sm:text-xs py-1.5">
                  <ShoppingBag className="w-3 h-3 mr-1" />
                  Store
                </TabsTrigger>
              </TabsList>

              <TabsContent value="launch" className="space-y-3 mt-3">
                <Card className="p-3">
                  <h3 className="text-xs sm:text-sm font-bold mb-2 flex items-center gap-1.5">
                    <Shield className="w-4 h-4" />
                    Select Your IP
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {creatorIPs.map((ip) => (
                      <button
                        key={ip.id}
                        onClick={() => setSelectedIP(ip.id)}
                        className={`relative p-2 border-2 rounded-lg transition-all ${
                          selectedIP === ip.id ? "border-foreground" : "border-border"
                        }`}
                      >
                        <div className="aspect-square rounded bg-muted mb-1.5 overflow-hidden">
                          <img
                            src={ip.image || "/placeholder.svg"}
                            alt={ip.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-[10px] font-medium line-clamp-2">{ip.name}</p>
                        <Badge variant="outline" className="text-[9px] mt-1 h-4 px-1">
                          {ip.category}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </Card>

                <Card className="p-3">
                  <h3 className="text-xs sm:text-sm font-bold mb-2 flex items-center gap-1.5">
                    <Package className="w-4 h-4" />
                    Select Products
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {productTypes.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => toggleProduct(product.id)}
                        className={`p-2 border-2 rounded-lg transition-all ${
                          selectedProducts.includes(product.id) ? "border-foreground" : "border-border"
                        }`}
                      >
                        <product.icon className="w-6 h-6 mx-auto mb-1" />
                        <p className="text-[10px] font-medium">{product.name}</p>
                        <p className="text-[9px] text-muted-foreground">${product.basePrice}</p>
                      </button>
                    ))}
                  </div>
                </Card>

                <Card className="p-3">
                  <h3 className="text-xs sm:text-sm font-bold mb-2">Configure</h3>
                  <div className="space-y-2">
                    <div>
                      <Label className="text-[10px]">Royalty (%)</Label>
                      <Input
                        type="number"
                        value={royaltyRate}
                        onChange={(e) => setRoyaltyRate(e.target.value)}
                        className="h-7 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-[10px]">Item Limit (optional)</Label>
                      <Input
                        type="number"
                        value={itemLimit}
                        onChange={(e) => setItemLimit(e.target.value)}
                        placeholder="Unlimited"
                        className="h-7 text-xs mt-1"
                      />
                    </div>
                  </div>
                </Card>

                <Button onClick={handleLaunchMerch} className="w-full h-8 text-xs">
                  Launch Merch
                  <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </TabsContent>

              <TabsContent value="dashboard" className="space-y-3 mt-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {merchStats.map((stat, i) => (
                    <Card key={i} className="p-2">
                      <div className="flex items-center justify-between mb-1">
                        <stat.icon className="w-4 h-4 text-muted-foreground" />
                        <Badge variant="outline" className="text-[9px] h-4 px-1 text-green-600">
                          {stat.trend}
                        </Badge>
                      </div>
                      <p className="text-base font-bold">{stat.value}</p>
                      <p className="text-[9px] text-muted-foreground">{stat.label}</p>
                    </Card>
                  ))}
                </div>

                <Card className="p-3">
                  <h3 className="text-xs font-bold mb-2">Top Selling</h3>
                  <div className="space-y-2">
                    {trendingProducts.map((product, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-accent/5 rounded text-[10px]">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-muted-foreground">{product.serialRange}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{product.revenue}</p>
                          <p className="text-muted-foreground">{product.sales} sold</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="store" className="space-y-3 mt-3">
                <Card className="p-3">
                  <h3 className="text-xs font-bold mb-2">My Store</h3>
                  <div className="space-y-2">
                    <div>
                      <Label className="text-[10px]">Store URL</Label>
                      <Input value="revulter.com/store/username" readOnly className="h-7 text-[10px] mt-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 border rounded">
                        <p className="text-[10px] text-muted-foreground mb-1">Active Drops</p>
                        <p className="text-lg font-bold">8</p>
                      </div>
                      <div className="p-2 border rounded">
                        <p className="text-[10px] text-muted-foreground mb-1">Sold Out</p>
                        <p className="text-lg font-bold">4</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      )}

      {activeTab === "studios" && (
        <section className="py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-3 sm:px-4">
            {/* Studio Intro */}
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Professional Studio Access</h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-3xl">
                Book world-class studios across Africa for your creative projects. Every production receives automatic
                IP registration on Revulter, protecting your creative work instantly.
              </p>
            </div>

            {/* Studio Types Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
              {[
                {
                  title: "Music Production Studios",
                  description: "Professional recording, mixing, and mastering facilities",
                  icon: "🎵",
                  specs: ["4K monitoring", "Analog & Digital gear", "Soundproof booths"],
                  price: "$50-150/hour",
                },
                {
                  title: "Podcast & Voiceover Studios",
                  description: "Broadcast-quality audio recording environments",
                  icon: "🎙️",
                  specs: ["Acoustic treatment", "Multiple mic options", "Editing suites"],
                  price: "$30-80/hour",
                },
                {
                  title: "Photography Studios",
                  description: "Versatile spaces with professional lighting and backdrops",
                  icon: "📸",
                  specs: ["Studio lighting", "Backdrop options", "Props & styling"],
                  price: "$40-120/hour",
                },
                {
                  title: "Filming & Video Studios",
                  description: "Full production facilities with green screen and equipment",
                  icon: "🎬",
                  specs: ["Green screen", "Cinema lighting", "Equipment rental"],
                  price: "$75-250/hour",
                },
              ].map((studio, index) => (
                <Card key={index} className="border-2 hover:border-deep-green transition-colors">
                  <CardHeader className="p-3 sm:p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-3xl">{studio.icon}</div>
                      <Badge variant="secondary" className="bg-deep-green/10 text-deep-green text-xs">
                        {studio.price}
                      </Badge>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold">{studio.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{studio.description}</p>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 pt-0 space-y-3">
                    <div>
                      <p className="text-xs font-semibold mb-1.5">Amenities:</p>
                      <ul className="space-y-1">
                        {studio.specs.map((spec, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                            <span className="w-1 h-1 bg-deep-green rounded-full"></span>
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full h-9 text-xs sm:text-sm">Book Now</Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Subscription Plans */}
            <div className="bg-card border border-border rounded-lg p-4 sm:p-6 mb-6">
              <h3 className="text-lg sm:text-xl font-bold mb-4">Monthly Subscription Plans</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {[
                  {
                    name: "Creator",
                    rate: "$199/month",
                    hours: "8 hours/month",
                    discount: "15% savings",
                    features: ["All studio types", "Priority booking", "IP auto-registration", "Flexible scheduling"],
                  },
                  {
                    name: "Professional",
                    rate: "$499/month",
                    hours: "24 hours/month",
                    discount: "25% savings",
                    features: [
                      "All studio types",
                      "Priority support",
                      "IP auto-registration",
                      "Equipment included",
                      "Guest passes",
                    ],
                  },
                  {
                    name: "Enterprise",
                    rate: "$999/month",
                    hours: "60 hours/month",
                    discount: "35% savings",
                    features: [
                      "All studio types",
                      "24/7 access",
                      "IP auto-registration",
                      "Full equipment",
                      "Dedicated support",
                      "Team accounts",
                    ],
                  },
                ].map((plan, index) => (
                  <Card key={index} className="border-2">
                    <CardHeader className="p-3 sm:p-4">
                      <Badge variant="secondary" className="w-fit mb-2 text-xs">
                        {plan.discount}
                      </Badge>
                      <h4 className="text-lg sm:text-xl font-bold">{plan.name}</h4>
                      <div className="text-xl sm:text-2xl font-bold text-deep-green">{plan.rate}</div>
                      <div className="text-xs text-muted-foreground">{plan.hours}</div>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-0">
                      <ul className="space-y-1.5 mb-4">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="text-xs flex items-start gap-2">
                            <span className="text-deep-green mt-0.5">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full h-9 text-xs sm:text-sm">Subscribe</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* IP Registration Benefit */}
            <div className="bg-gradient-to-r from-deep-green/10 to-accent/10 border border-deep-green/20 rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-2">
                <span className="text-xl">🛡️</span>
                Automatic IP Registration
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 max-w-3xl">
                Every production recorded in our studios is automatically registered on Revulter, giving you immediate
                copyright protection and IP rights documentation. Your creative work is protected from day one.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["Instant copyright registration", "IP rights protection", "Documented timestamp & metadata"].map(
                  (benefit, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="text-deep-green font-bold">✓</span>
                      <p className="text-xs sm:text-sm">{benefit}</p>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Studios Near You */}
            <div className="mt-6">
              <h3 className="text-lg sm:text-xl font-bold mb-4">Studios Near You</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { city: "Lagos, Nigeria", studios: 12, distance: "5 min away" },
                  { city: "Accra, Ghana", studios: 8, distance: "12 min away" },
                  { city: "Nairobi, Kenya", studios: 6, distance: "15 min away" },
                  { city: "Johannesburg, South Africa", studios: 14, distance: "20 min away" },
                ].map((location, index) => (
                  <Card key={index}>
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-base sm:text-lg">{location.city}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {location.distance}
                          </p>
                        </div>
                        <Badge className="bg-deep-green text-xs">{location.studios} studios</Badge>
                      </div>
                      <Button variant="outline" className="w-full bg-transparent h-9 text-xs sm:text-sm">
                        Browse Studios
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Commission Modal */}
      {showCommissionModal && selectedCreator && (
        <CommissionModal
          creator={selectedCreator}
          isOpen={showCommissionModal}
          onClose={() => {
            setShowCommissionModal(false)
            setSelectedCreator(null)
          }}
        />
      )}

      <Footer />
    </div>
  )
}
