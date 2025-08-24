import { NextResponse } from "next/server"

// Mock creator data
const creators = [
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
    completedProjects: 156,
    avatar: "/creator-kwame-textiles.png",
    coverImage: "/nigerian-ankara-fashion.png",
    skills: ["Fashion Photography", "Brand Partnerships", "Content Creation", "Style Consulting"],
  },
  // Add more creators as needed
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const country = searchParams.get("country")
  const specialty = searchParams.get("specialty")
  const search = searchParams.get("search")

  let filteredCreators = creators

  // Apply filters
  if (category && category !== "all") {
    filteredCreators = filteredCreators.filter((creator) => creator.category === category)
  }

  if (country && country !== "all") {
    filteredCreators = filteredCreators.filter((creator) => creator.country === country)
  }

  if (specialty && specialty !== "all") {
    filteredCreators = filteredCreators.filter(
      (creator) =>
        creator.specialty.toLowerCase().includes(specialty.toLowerCase()) ||
        creator.skills.some((skill) => skill.toLowerCase().includes(specialty.toLowerCase())),
    )
  }

  if (search) {
    filteredCreators = filteredCreators.filter(
      (creator) =>
        creator.name.toLowerCase().includes(search.toLowerCase()) ||
        creator.specialty.toLowerCase().includes(search.toLowerCase()) ||
        creator.skills.some((skill) => skill.toLowerCase().includes(search.toLowerCase())),
    )
  }

  return NextResponse.json({
    creators: filteredCreators,
    total: filteredCreators.length,
    success: true,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // TODO: Implement creator registration logic
    // - Validate creator data
    // - Check Creator ID verification
    // - Store in database
    // - Send welcome email

    console.log("New creator registration:", body)

    return NextResponse.json({
      success: true,
      message: "Creator registration submitted successfully",
      creatorId: `creator_${Date.now()}`,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to register creator" }, { status: 500 })
  }
}
