import Navigation from "@/components/navigation"
import LegalAssist from "@/components/legal/LegalAssist"

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-2 py-3 md:px-4 md:py-6">
        <LegalAssist />
      </div>
    </div>
  )
}
