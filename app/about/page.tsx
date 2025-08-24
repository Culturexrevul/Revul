import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Globe, Shield, Users, Target, Eye } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Authenticity",
      description: "We protect and celebrate genuine African cultural expressions and creative works.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connecting African creativity with worldwide audiences and opportunities.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a supportive ecosystem where creators and investors thrive together.",
    },
    {
      icon: Heart,
      title: "Fair Trade",
      description: "Ensuring creators receive fair compensation for their intellectual property.",
    },
  ]

  const team = [
    {
      name: "Jaydean Fame Agbai",
      role: "CEO",
      background: "Former IP lawyer with 15 years experience in creative rights",
      image: "/nigerian-professional-woman-1.png",
    },
    {
      name: "Jacob Tucker (PIP LABS)",
      role: "Technical Advisor",
      background: "Blockchain engineer and digital rights advocate",
      image: "/nigerian-professional-man-1.png",
    },
    {
      name: "Fatima Al-Rashid",
      role: "Head of Partnerships",
      background: "International business development in creative industries",
      image: "/nigerian-professional-woman-2.png",
    },
    {
      name: "Thabo Mthembu",
      role: "Creative Director",
      background: "Award-winning filmmaker and cultural curator",
      image: "/nigerian-professional-man-2.png",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display font-bold text-4xl lg:text-6xl text-primary mb-6">
              About <span className="text-accent">Revulter Cultural Commerce</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              We're building the future of African creative ownership, where artists control their work and investors
              support authentic cultural expression.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display font-bold text-3xl lg:text-4xl text-primary mb-6">Our Story</h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Revulter Cultural Commerce was born from a simple yet powerful observation: African creativity is
                    reshaping global culture, yet many creators struggle to protect and monetize their work fairly.
                  </p>
                  <p>
                    Founded in 2024 by a team of legal experts, technologists, and cultural advocates, we recognized
                    that traditional intellectual property systems often failed to serve African creators. Language
                    barriers, complex legal processes, and limited access to global markets created unnecessary
                    obstacles.
                  </p>
                  <p>
                    We envisioned a platform where a musician in Lagos could register their work in minutes, a fashion
                    designer in Accra could license globally, and investors worldwide could support authentic African
                    creativity while sharing in its success.
                  </p>
                </div>
              </div>
              <div className="aspect-square bg-gradient-to-br from-accent/20 to-terracotta/20 rounded-lg overflow-hidden">
                <Image
                  src="/nigerian-creative-community.png"
                  alt="Nigerian Creative Community"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg bg-secondary text-secondary-foreground">
                <CardHeader className="text-center pb-8">
                  <Target className="h-12 w-12 text-accent mx-auto mb-4" />
                  <CardTitle className="font-display text-3xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-xl leading-relaxed">
                    Empowering African creatives with secure ownership, global exposure, and fair monetization of their
                    cultural works.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-accent text-accent-foreground">
                <CardHeader className="text-center pb-8">
                  <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="font-display text-3xl text-primary">Our Vision</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-xl leading-relaxed text-primary">
                    A borderless creative economy for Africa, where cultural heritage drives innovation and prosperity.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-primary mb-6">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The principles that guide everything we do at Revulter Cultural Commerce.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-accent" />
                    </div>
                    <CardTitle className="font-display text-xl text-primary">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-muted-foreground">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-primary mb-6">Meet Our Team</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Passionate advocates for African creativity and cultural preservation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-accent/20 to-terracotta/20">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="font-display text-xl text-primary">{member.name}</CardTitle>
                    <Badge variant="secondary" className="mt-2">
                      {member.role}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-muted-foreground">{member.background}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary text-secondary-foreground">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6">Our Impact</h2>
              <p className="text-xl max-w-3xl mx-auto opacity-90">
                Building a thriving ecosystem for African creativity since 2024.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">500+</div>
                <div className="text-lg opacity-90">Registered Assets</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">$2.4M</div>
                <div className="text-lg opacity-90">Creator Earnings</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">89</div>
                <div className="text-lg opacity-90">Active Artists</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">25</div>
                <div className="text-lg opacity-90">Countries Served</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-primary mb-6">Join the Movement</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Whether you're a creator looking to protect your work or an investor seeking authentic cultural assets,
              Revulter Cultural Commerce is your gateway to Africa's creative economy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Start Creating
              </a>
              <a
                href="/marketplace"
                className="inline-flex items-center justify-center px-8 py-4 border border-accent text-accent font-semibold rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Explore Assets
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
