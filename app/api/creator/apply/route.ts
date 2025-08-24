import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { name, email, phone, consent } = body

    if (!name || !email || !phone || !consent) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 })
    }

    // Generate a mock reference code
    const timestamp = Date.now()
    const randomNum = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    const reference = `CRID-2025-${randomNum}${timestamp.toString().slice(-2)}`

    // TODO: In production, save to database and trigger verification workflow
    console.log("[v0] Creator application received:", {
      name,
      email,
      reference,
      categories: body.categories || [],
      timestamp: new Date().toISOString(),
    })

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      ok: true,
      reference,
      message: "Application submitted successfully",
    })
  } catch (error) {
    console.error("[v0] Creator application error:", error)
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 })
  }
}
