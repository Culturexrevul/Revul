import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ref } = body

    if (!ref) {
      return NextResponse.json({ error: "Reference code is required" }, { status: 400 })
    }

    // Mock status responses for demo
    const statuses = ["Under review", "Approved (pending pickup)", "More info required"]

    // Use reference code to determine consistent status for demo
    const hash = ref.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0)
      return a & a
    }, 0)

    const statusIndex = Math.abs(hash) % statuses.length
    const status = statuses[statusIndex]

    // TODO: In production, lookup actual status from database
    console.log("[v0] Status lookup for reference:", ref, "Status:", status)

    return NextResponse.json({
      status,
      reference: ref,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Status lookup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const ref = searchParams.get("ref")

  if (!ref) {
    return NextResponse.json({ error: "Reference code is required" }, { status: 400 })
  }

  // Reuse POST logic for GET requests
  return POST(request)
}
