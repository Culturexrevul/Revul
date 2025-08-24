import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    // TODO: Integrate with actual AI service (OpenAI, Anthropic, etc.)
    // For now, return mock responses based on keywords

    let reply = "I understand you're asking about legal matters. "

    if (message.toLowerCase().includes("copyright")) {
      reply +=
        "Copyright protects original creative works like music, art, literature, and films. In Nigeria, copyright protection is automatic upon creation, but registration with the Nigerian Copyright Commission provides additional legal benefits. Copyright typically lasts for the author's lifetime plus 70 years."
    } else if (message.toLowerCase().includes("trademark")) {
      reply +=
        "Trademarks protect brand names, logos, and distinctive signs used in business. In Nigeria, you can register trademarks with the Trademarks Registry. Unlike copyright, trademark protection requires registration and can last indefinitely with proper renewals."
    } else if (message.toLowerCase().includes("licensing")) {
      reply +=
        "Licensing allows you to grant others permission to use your intellectual property while retaining ownership. Key considerations include scope of use, territory, duration, royalty rates, and exclusivity. Always ensure licensing agreements are properly documented."
    } else if (message.toLowerCase().includes("royalty") || message.toLowerCase().includes("split")) {
      reply +=
        "Royalty splits should be agreed upon before creation and documented in writing. Common arrangements include equal splits among collaborators, or percentage-based splits reflecting each person's contribution. Consider both creative and business contributions when determining splits."
    } else if (message.toLowerCase().includes("contract")) {
      reply +=
        "Contracts should clearly define all parties' rights, obligations, payment terms, deliverables, and dispute resolution mechanisms. For creative work, include provisions for intellectual property ownership, credit, and usage rights."
    } else {
      reply +=
        "This is a complex area of law that may require specific legal advice. I recommend consulting with a qualified IP lawyer for detailed guidance on your specific situation."
    }

    reply +=
      "\n\nPlease note: This is general information only and not legal advice. For specific legal matters, consider consulting with a qualified attorney."

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    return NextResponse.json({
      reply,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("AI API error:", error)
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}
