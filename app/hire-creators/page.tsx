"use client"

import { useState, useEffect, useRef } from "react"
import { Search, MapPin, Star, Verified, Users, Palette, X, Upload, DollarSign } from "lucide-react"
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

    // Country filter
    if (selectedCountry !== "all") {
      filtered = filtered.filter((creator) => creator.country === selectedCountry)
    }

    // Specialty filter
    if (selectedSpecialty !== "all") {
      filtered = filtered.filter(
        (creator) =>
          creator.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase()) ||
          creator.skills.some((skill) => skill.toLowerCase().includes(selectedSpecialty.toLowerCase())),
      )
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
  }, [searchTerm, selectedCategory, selectedCountry, selectedSpecialty, sortBy, creators])

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
      <section className="bg-gradient-to-r from-deep-green to-accent py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Hire Authentic African Creators</h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Connect with verified creators and master artisans to bring authentic African culture to your brand. From
            micro-influencers to traditional craftspeople, find the perfect talent for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-deep-green hover:bg-gray-100" onClick={scrollToCreators}>
              Browse Creators
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-deep-green bg-transparent"
              onClick={() => setShowPostProjectModal(true)}
            >
              Post a Project
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-deep-green">500+</div>
              <div className="text-gray-600">Verified Creators</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-deep-green">50+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-deep-green">2M+</div>
              <div className="text-gray-600">Combined Reach</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-deep-green">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search creators, skills, or specialties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
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
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Country" />
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
                <SelectTrigger>
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
                <SelectTrigger>
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
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section ref={creatorsRef} className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{filteredCreators.length} Creators Found</h2>
            <div className="text-sm text-gray-600">Showing verified creators with authentic African expertise</div>
          </div>

          {filteredCreators.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No creators found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCreators.map((creator) => (
                <Card key={creator.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={creator.coverImage || "/placeholder.svg"}
                      alt={`${creator.name}'s work`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={getCategoryColor(creator.category)}>
                        {getCategoryIcon(creator.category)}
                        <span className="ml-1 capitalize">{creator.category}</span>
                      </Badge>
                    </div>
                    {creator.hasCreatorId && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary text-primary-foreground">
                          <Verified className="h-3 w-3 mr-1" />
                          Creator ID
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
                          <AvatarFallback>
                            {creator.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg flex items-center">
                            {creator.name}
                            {creator.isVerified && <Verified className="h-4 w-4 text-blue-500 ml-1" />}
                          </h3>
                          <p className="text-sm text-gray-600">{creator.specialty}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {creator.location}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="font-medium">{creator.rating}</span>
                          <span className="text-gray-600 ml-1">({creator.reviewCount})</span>
                        </div>
                        <div className="text-sm text-gray-600">{creator.followers.toLocaleString()} followers</div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {creator.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {creator.skills.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{creator.skills.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <div className="font-semibold text-lg">${creator.hourlyRate}/hr</div>
                          <div className="text-xs text-gray-600">Responds in {creator.responseTime}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{creator.completedProjects} projects</div>
                          <div className="text-xs text-gray-600">completed</div>
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-4">
                        <Link href={`/creator/${creator.id}`} className="flex-1">
                          <Button variant="outline" className="w-full bg-transparent">
                            View Profile
                          </Button>
                        </Link>
                        <Button className="flex-1" onClick={() => handleCommission(creator)}>
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

      {showPostProjectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Post a Project</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowPostProjectModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="projectTitle">Project Title *</Label>
                  <Input
                    id="projectTitle"
                    placeholder="e.g., Need authentic African fashion content"
                    value={postProjectForm.title}
                    onChange={(e) => setPostProjectForm((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={postProjectForm.category}
                    onValueChange={(value) => setPostProjectForm((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budget">Budget (USD) *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="budget"
                      type="number"
                      placeholder="1000"
                      className="pl-10"
                      value={postProjectForm.budget}
                      onChange={(e) => setPostProjectForm((prev) => ({ ...prev, budget: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="timeline">Timeline</Label>
                  <Input
                    id="timeline"
                    placeholder="e.g., 2 weeks"
                    value={postProjectForm.timeline}
                    onChange={(e) => setPostProjectForm((prev) => ({ ...prev, timeline: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project, goals, and what you're looking for in a creator..."
                  rows={4}
                  value={postProjectForm.description}
                  onChange={(e) => setPostProjectForm((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="email">Contact Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={postProjectForm.email}
                  onChange={(e) => setPostProjectForm((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload reference files (optional)</p>
                <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                  Choose Files
                </Button>
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowPostProjectModal(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handlePostProject}
                  disabled={
                    !postProjectForm.title ||
                    !postProjectForm.category ||
                    !postProjectForm.description ||
                    !postProjectForm.email
                  }
                >
                  Post Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
