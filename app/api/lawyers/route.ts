import { NextResponse } from "next/server"

export async function GET() {
  try {
    // TODO: Connect to actual database
    // For now, return mock lawyer data

    const lawyers = [
      {
        id: "1",
        name: "Adunni Okafor",
        specialties: ["Copyright", "Entertainment Law"],
        rate: 35000,
        location: "Lagos",
        language: ["English", "Yoruba"],
        bio: "Specializing in music and film IP protection with 8+ years experience working with major Nigerian artists and production companies.",
        rating: 4.9,
        experience: 8,
        verified: true,
        availability: "Available this week",
      },
      {
        id: "2",
        name: "Chukwuma Nwankwo",
        specialties: ["Trademark", "Contracts"],
        rate: 28000,
        location: "Abuja",
        language: ["English", "Igbo"],
        bio: "Expert in brand protection and commercial agreements for creative businesses. Former corporate counsel for major media companies.",
        rating: 4.8,
        experience: 6,
        verified: true,
        availability: "Available next week",
      },
      {
        id: "3",
        name: "Fatima Al-Hassan",
        specialties: ["Licensing", "Copyright"],
        rate: 42000,
        location: "Kano",
        language: ["English", "Hausa"],
        bio: "International licensing specialist with focus on cross-border IP deals. Extensive experience with music publishing and distribution agreements.",
        rating: 4.9,
        experience: 10,
        verified: true,
        availability: "Available today",
      },
      {
        id: "4",
        name: "Emeka Okonkwo",
        specialties: ["Entertainment Law", "Contracts"],
        rate: 38000,
        location: "Port Harcourt",
        language: ["English", "Igbo"],
        bio: "Nollywood legal advisor with extensive experience in film and TV contracts, talent agreements, and production legal matters.",
        rating: 4.7,
        experience: 7,
        verified: true,
        availability: "Available this week",
      },
      {
        id: "5",
        name: "Aisha Bello",
        specialties: ["Copyright", "Trademark"],
        rate: 31000,
        location: "Ibadan",
        language: ["English", "Yoruba"],
        bio: "Creative industry lawyer helping artists protect and monetize their work. Specializes in digital rights and online content protection.",
        rating: 4.8,
        experience: 5,
        verified: true,
        availability: "Available tomorrow",
      },
      {
        id: "6",
        name: "Tunde Adebayo",
        specialties: ["Licensing", "Contracts"],
        rate: 45000,
        location: "Lagos",
        language: ["English", "Yoruba"],
        bio: "Senior partner specializing in high-value IP transactions and licensing deals. Represents major record labels and publishing companies.",
        rating: 5.0,
        experience: 12,
        verified: true,
        availability: "Available next month",
      },
    ]

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      lawyers,
      total: lawyers.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Lawyers API error:", error)
    return NextResponse.json({ error: "Failed to fetch lawyers" }, { status: 500 })
  }
}
