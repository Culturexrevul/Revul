"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Star, MapPin, Clock, Users, Verified, MessageCircle, Calendar, Award, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { CommissionModal } from "@/components/creator/CommissionModal"

// Mock data - in real app, this would come from API
const mockCreator = {
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
  portfolio: [
    "/creator-adunni-pottery.png",
    "/nigerian-traditional-art-bronze.png",
    "/creator-kwame-textiles.png",
    "/creator-amara-fashion.png",
  ],
  bio: "Master potter with 15+ years creating authentic Nigerian ceramics and traditional clay art. I specialize in creating custom pieces that blend traditional Yoruba pottery techniques with contemporary design aesthetics. My work has been featured in galleries across West Africa and I have trained over 50 apprentices in traditional pottery methods.",
  completedProjects: 89,
  avatar: "/creator-adunni-pottery.png",
  coverImage: "/nigerian-traditional-art-bronze.png",
  skills: ["Pottery", "Ceramics", "Traditional Art", "Clay Painting", "Glazing", "Kiln Firing"],
  experience: "15+ years",
  education: "Master Craftsperson Certification, Lagos State Pottery Guild",
  achievements: [
    "Featured in African Art Today Magazine",
    "Winner - Best Traditional Craft 2023",
    "UNESCO Cultural Heritage Ambassador",
    "Trained 50+ apprentices",
  ],
  services: [
    {
      title: "Custom Pottery Commission",
      description: "Handcrafted ceramic pieces designed to your specifications",
      price: 150,
      duration: "2-3 weeks",
    },
    {
      title: "Traditional Clay Painting",
      description: "Authentic Nigerian clay painting techniques on pottery",
      price: 75,
      duration: "1 week",
    },
    {
      title: "Pottery Workshop",
      description: "Learn traditional pottery techniques in hands-on sessions",
      price: 200,
      duration: "1 day",
    },
  ],
  reviews: [
    {
      id: 1,
      client: "Sarah Johnson",
      company: "Afrocentric Designs",
      rating: 5,
      comment:
        "Adunni created the most beautiful ceramic collection for our showroom. Her attention to detail and cultural authenticity is unmatched.",
      date: "2024-01-15",
      project: "Ceramic Collection",
    },
    {
      id: 2,
      client: "Marcus Williams",
      company: "Global Arts Ltd",
      rating: 5,
      comment:
        "Working with Adunni was incredible. She delivered beyond expectations and taught us so much about traditional Nigerian pottery.",
      date: "2024-01-08",
      project: "Cultural Workshop",
    },
    {
      id: 3,
      client: "Emma Thompson",
      company: "Heritage Hotels",
      rating: 4,
      comment:
        "Beautiful work and great communication throughout the project. The pottery pieces are now centerpieces in our lobby.",
      date: "2023-12-20",
      project: "Hotel Decor",
    },
  ],
}

export default function CreatorProfilePage() {
  const params = useParams()
  const [showCommissionModal, setShowCommissionModal] = useState(false)
  const [selectedService, setSelectedService] = useState<any>(null)

  // In real app, fetch creator data based on params.id
  const creator = mockCreator

  const handleCommission = (service?: any) => {
    setSelectedService(service)
    setShowCommissionModal(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80">
        <Image
          src={creator.coverImage || "/placeholder.svg"}
          alt={`${creator.name}'s work`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Profile Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-20 md:-mt-24">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white shadow-lg">
                <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
                <AvatarFallback className="text-2xl">
                  {creator.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold flex items-center">
                      {creator.name}
                      {creator.isVerified && <Verified className="h-6 w-6 text-blue-500 ml-2" />}
                    </h1>
                    <p className="text-lg text-gray-600 mt-1">{creator.specialty}</p>
                    <div className="flex items-center text-gray-600 mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {creator.location}
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end mt-4 md:mt-0">
                    <div className="flex items-center mb-2">
                      <Star className="h-5 w-5 text-yellow-400 mr-1" />
                      <span className="font-semibold text-lg">{creator.rating}</span>
                      <span className="text-gray-600 ml-1">({creator.reviewCount} reviews)</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">${creator.hourlyRate}/hr</div>
                    <div className="text-sm text-gray-600">Responds in {creator.responseTime}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {creator.hasCreatorId && (
                    <Badge className="bg-primary text-primary-foreground">
                      <Verified className="h-3 w-3 mr-1" />
                      Creator ID Verified
                    </Badge>
                  )}
                  <Badge variant="secondary" className="capitalize">
                    {creator.category}
                  </Badge>
                  <Badge variant="outline">
                    <Users className="h-3 w-3 mr-1" />
                    {creator.followers.toLocaleString()} followers
                  </Badge>
                  <Badge variant="outline">
                    <Award className="h-3 w-3 mr-1" />
                    {creator.completedProjects} projects
                  </Badge>
                </div>

                <div className="flex space-x-3 mt-6">
                  <Button size="lg" onClick={() => handleCommission()}>
                    Commission Work
                  </Button>
                  <Button size="lg" variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button size="lg" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {creator.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-700 leading-relaxed">{creator.bio}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Experience</h4>
                        <p className="text-gray-600">{creator.experience}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Education</h4>
                        <p className="text-gray-600">{creator.education}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Skills & Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {creator.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Languages</h4>
                      <div className="flex items-center space-x-4">
                        <Languages className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{creator.languages.join(", ")}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Achievements</h4>
                      <ul className="space-y-2">
                        {creator.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-center">
                            <Award className="h-4 w-4 text-primary mr-2" />
                            <span className="text-gray-600">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="portfolio" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {creator.portfolio.map((image, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Portfolio piece ${index + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services" className="mt-6">
                <div className="space-y-4">
                  {creator.services.map((service, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                            <p className="text-gray-600 mb-4">{service.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {service.duration}
                              </div>
                            </div>
                          </div>
                          <div className="text-right ml-6">
                            <div className="text-2xl font-bold text-primary mb-2">${service.price}</div>
                            <Button onClick={() => handleCommission(service)}>Commission</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  {creator.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-semibold">{review.client}</h4>
                            <p className="text-sm text-gray-600">{review.company}</p>
                            <p className="text-xs text-gray-500 mt-1">{review.project}</p>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2">{review.comment}</p>
                        <p className="text-xs text-gray-500">{review.date}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-medium">{creator.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Projects Completed</span>
                  <span className="font-medium">{creator.completedProjects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Repeat Clients</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">On-Time Delivery</span>
                  <span className="font-medium">98%</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" onClick={() => handleCommission()}>
                  Commission Work
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Call
                </Button>
              </CardContent>
            </Card>

            {/* Similar Creators */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Creators</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Discover other talented creators in {creator.specialty.toLowerCase()}
                </p>
                <Button variant="outline" className="w-full mt-3 bg-transparent">
                  Browse Similar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Commission Modal */}
      {showCommissionModal && (
        <CommissionModal
          creator={creator}
          service={selectedService}
          isOpen={showCommissionModal}
          onClose={() => {
            setShowCommissionModal(false)
            setSelectedService(null)
          }}
        />
      )}
    </div>
  )
}
