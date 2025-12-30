"use client"

import { useState, useEffect, useRef } from "react"
import { Search, MapPin, Star, Verified, Users, Palette, Upload, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import Image from "next/image"
import { CommissionModal } from "@/components/creator/CommissionModal"
import Navigation from "@/components/navigation"

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
  const [selectedCountry, setSelectedCountry] = useState("all")
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
  const [activeTab, setActiveTab] = useState<"hire" | "post" | "studios">("hire")

  // Added state for new filters
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedBudget, setSelectedBudget] = useState("all")
  const [selectedExperience, setSelectedExperience] = useState("all")

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
    }
    if (selectedExperience !== "all") {
      // Placeholder for experience filtering logic
      // For example: if selectedExperience is "experienced", filter creators with completedProjects > 50
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
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postProjectForm),
      })

      if (response.ok) {
        setShowPostProjectModal(false)
        setPostProjectForm({
          title: "",
          category: "",
          budget: "",
          timeline: "",
          description: "",
          email: "",
        })
        alert("Project posted successfully! Creators will be notified.")
      }
    } catch (error) {
      console.error("Failed to post project:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-foreground py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-background mb-2 sm:mb-3 uppercase tracking-tight">
            Creator Hub
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-background/90 mb-3 sm:mb-4 max-w-3xl mx-auto px-2">
            Hire verified creators, post projects, or book our professional studios with automatic IP registration.
          </p>
        </div>
      </section>

      {/* Tab navigation for three main sections */}
      <section className="bg-card border-b border-border sticky top-16 sm:top-20 z-40">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex gap-1 sm:gap-3 overflow-x-auto py-2 no-scrollbar">
            <button
              onClick={() => setActiveTab("hire")}
              className={`px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all border-b-2 ${
                activeTab === "hire"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Hire Creators
            </button>
            <button
              onClick={() => setActiveTab("post")}
              className={`px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all border-b-2 ${
                activeTab === "post"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Post Project
            </button>
            <button
              onClick={() => setActiveTab("studios")}
              className={`px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all border-b-2 ${
                activeTab === "studios"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Studio Bookings
            </button>
          </div>
        </div>
      </section>

      {/* Hire Creators section */}
      {activeTab === "hire" && (
        <>
          <section className="py-4 sm:py-8 bg-muted/50 border-b border-border">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
                <div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-deep-green">500+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Verified Creators</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-deep-green">50+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Countries</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-deep-green">2M+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Combined Reach</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-deep-green">98%</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>
          </section>

          {/* Search and Filters */}
          <section className="py-4 sm:py-6 bg-muted/50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
              <div className="bg-card rounded-lg shadow-sm p-3 sm:p-4 border border-border">
                <div className="space-y-3">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search creators..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 h-10 text-sm"
                    />
                  </div>

                  {/* Filter Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="h-10 text-xs sm:text-sm">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger className="h-10 text-xs sm:text-sm">
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                      <SelectTrigger className="h-10 text-xs sm:text-sm">
                        <SelectValue placeholder="Specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty.value} value={specialty.value}>
                            {specialty.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="h-10 text-xs sm:text-sm">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="followers">Most Followers</SelectItem>
                        <SelectItem value="projects">Most Projects</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                      </SelectContent>
                    </Select>
                    {/* New filters for budget and experience */}
                    <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                      <SelectTrigger className="h-10 text-xs sm:text-sm">
                        <SelectValue placeholder="Budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Budgets</SelectItem>
                        <SelectItem value="low">Low ($0-$50/hr)</SelectItem>
                        <SelectItem value="medium">Medium ($50-$150/hr)</SelectItem>
                        <SelectItem value="high">High ($150+/hr)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                      <SelectTrigger className="h-10 text-xs sm:text-sm">
                        <SelectValue placeholder="Experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Experience</SelectItem>
                        <SelectItem value="entry">Entry-Level</SelectItem>
                        <SelectItem value="mid">Mid-Level</SelectItem>
                        <SelectItem value="experienced">Experienced</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedCategory("all")
                        setSelectedLocation("all") // Reset to all locations
                        setSelectedSpecialty("all")
                        setSortBy("rating")
                        setSelectedBudget("all") // Reset budget
                        setSelectedExperience("all") // Reset experience
                        setSearchTerm("")
                      }}
                      className="h-10 bg-transparent text-xs sm:text-sm"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Creators Grid */}
          <section ref={creatorsRef} className="py-4 sm:py-8">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-foreground">
                  {filteredCreators.length} Creators Found
                </h2>
                <div className="text-xs sm:text-sm text-muted-foreground">Showing verified creators</div>
              </div>

              {filteredCreators.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-muted-foreground mb-3">
                    <Search className="h-10 w-10 mx-auto" />
                  </div>
                  <h3 className="text-base font-medium text-foreground mb-2">No creators found</h3>
                  <p className="text-muted-foreground text-sm px-2">Try adjusting your search criteria or filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                  {filteredCreators.map((creator) => (
                    <Card key={creator.id} className="overflow-hidden hover:shadow-lg transition-shadow border-border">
                      <div className="relative h-32 sm:h-40">
                        <Image
                          src={creator.coverImage || "/placeholder.svg"}
                          alt={`${creator.name}'s work`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className={`${getCategoryColor(creator.category)} text-xs`}>
                            {getCategoryIcon(creator.category)}
                            <span className="ml-1 capitalize">{creator.category}</span>
                          </Badge>
                        </div>
                        {creator.hasCreatorId && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-primary text-primary-foreground text-xs">
                              <Verified className="h-3 w-3 mr-0.5" />
                              ID
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardHeader className="pb-2 px-3 sm:px-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2 min-w-0 flex-1">
                            <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                              <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
                              <AvatarFallback className="text-xs">
                                {creator.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-sm sm:text-base flex items-center">
                                <span className="truncate">{creator.name}</span>
                                {creator.isVerified && (
                                  <Verified className="h-3 w-3 text-blue-500 ml-1 flex-shrink-0" />
                                )}
                              </h3>
                              <p className="text-xs text-muted-foreground truncate">{creator.specialty}</p>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 px-3 sm:px-4 pb-3">
                        <div className="space-y-2">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{creator.location}</span>
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-400 mr-0.5" />
                              <span className="font-medium">{creator.rating}</span>
                              <span className="text-muted-foreground ml-0.5">({creator.reviewCount})</span>
                            </div>
                            <div className="text-muted-foreground">{creator.followers.toLocaleString()} followers</div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {creator.skills.slice(0, 2).map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs py-0 px-1.5">
                                {skill}
                              </Badge>
                            ))}
                            {creator.skills.length > 2 && (
                              <Badge variant="secondary" className="text-xs py-0 px-1.5">
                                +{creator.skills.length - 2}
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <div>
                              <div className="font-semibold text-sm sm:text-base">${creator.hourlyRate}/hr</div>
                              <div className="text-xs text-muted-foreground">{creator.responseTime}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-medium">{creator.completedProjects} projects</div>
                              <div className="text-xs text-muted-foreground">completed</div>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row space-y-1.5 sm:space-y-0 sm:space-x-2 pt-2">
                            <Link href={`/creator/${creator.id}`} className="flex-1">
                              <Button variant="outline" className="w-full bg-transparent h-9 text-xs sm:text-sm">
                                View Profile
                              </Button>
                            </Link>
                            <Button className="flex-1 h-9 text-xs sm:text-sm" onClick={() => handleCommission(creator)}>
                              Commission
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* Post Project section */}
      {activeTab === "post" && (
        <section className="py-4 sm:py-8">
          <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6">
            <div className="bg-card rounded-lg border border-border p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Post a Project</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Describe your project and connect with the perfect creator for your needs.
              </p>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="projectTitle" className="text-sm">
                    Project Title *
                  </Label>
                  <Input
                    id="projectTitle"
                    placeholder="e.g., Need authentic African fashion content"
                    value={postProjectForm.title}
                    onChange={(e) => setPostProjectForm((prev) => ({ ...prev, title: e.target.value }))}
                    className="h-10 text-sm mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-sm">
                    Category *
                  </Label>
                  <Select
                    value={postProjectForm.category}
                    onValueChange={(value) => setPostProjectForm((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="h-10 text-sm mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fashion">Fashion & Style</SelectItem>
                      <SelectItem value="beauty">Beauty & Skincare</SelectItem>
                      <SelectItem value="food">Food & Culture</SelectItem>
                      <SelectItem value="pottery">Pottery & Ceramics</SelectItem>
                      <SelectItem value="textiles">Textiles & Tie-Dye</SelectItem>
                      <SelectItem value="woodwork">Wood Carving & Sculpture</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="music">Music & Entertainment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="budget" className="text-sm">
                      Budget (USD) *
                    </Label>
                    <div className="relative mt-1">
                      <DollarSign className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="budget"
                        type="number"
                        placeholder="1000"
                        className="pl-9 h-10 text-sm"
                        value={postProjectForm.budget}
                        onChange={(e) => setPostProjectForm((prev) => ({ ...prev, budget: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="timeline" className="text-sm">
                      Timeline
                    </Label>
                    <Input
                      id="timeline"
                      placeholder="e.g., 2 weeks"
                      value={postProjectForm.timeline}
                      onChange={(e) => setPostProjectForm((prev) => ({ ...prev, timeline: e.target.value }))}
                      className="h-10 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm">
                    Project Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project, goals, and what you're looking for in a creator..."
                    rows={3}
                    value={postProjectForm.description}
                    onChange={(e) => setPostProjectForm((prev) => ({ ...prev, description: e.target.value }))}
                    className="text-sm mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm">
                    Contact Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={postProjectForm.email}
                    onChange={(e) => setPostProjectForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="h-10 text-sm mt-1"
                  />
                </div>

                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                  <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground mb-2">Upload reference files (optional)</p>
                  <Button variant="outline" size="sm" className="bg-transparent text-xs">
                    Choose Files
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-2">
                  <Button
                    onClick={handlePostProject}
                    disabled={
                      !postProjectForm.title ||
                      !postProjectForm.category ||
                      !postProjectForm.description ||
                      !postProjectForm.email
                    }
                    className="h-10 text-sm"
                  >
                    Post Project
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Studio Bookings section */}
      {activeTab === "studios" && (
        <section className="py-4 sm:py-8">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
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

      {/* Commission Modal (moved outside conditional renders) */}
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
    </div>
  )
}
