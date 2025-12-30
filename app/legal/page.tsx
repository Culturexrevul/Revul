import Navigation from "@/components/navigation"
import LegalAssist from "@/components/legal/LegalAssist"

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <LegalAssist />
      </div>
    </div>
  )
}
