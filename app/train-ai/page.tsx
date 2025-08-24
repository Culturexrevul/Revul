"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Database, Zap, Users, ArrowRight, CheckCircle } from "lucide-react"
import { useState } from "react"

export default function TrainAIPage() {
  const [requestSubmitted, setRequestSubmitted] = useState(false)

  const handleDatasetRequest = () => {
    setRequestSubmitted(true)
    setTimeout(() => setRequestSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 text-sm font-medium">
            AI Training Data Platform
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Specialized AI Training Data for African Cultural Intelligence
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Access unique, culturally-rich datasets that capture authentic African perspectives, eccentric viewpoints,
            and specialized knowledge for training more inclusive AI models.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleDatasetRequest}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {requestSubmitted ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Request Submitted
                </>
              ) : (
                <>
                  Get Specialized Data
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
            <Button variant="outline" size="lg">
              Contribute Datasets
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Why Specialized Training Data Matters
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Traditional AI models often lack cultural context and diverse perspectives. Our specialized datasets
              bridge this gap with authentic African voices and experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <Brain className="w-10 h-10 text-accent mb-2" />
                <CardTitle className="text-lg">Cultural Context</CardTitle>
                <CardDescription>
                  Rich datasets capturing African cultural nuances, traditions, and contemporary perspectives
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <Database className="w-10 h-10 text-accent mb-2" />
                <CardTitle className="text-lg">Unique POV Data</CardTitle>
                <CardDescription>
                  Eccentric and diverse viewpoints that challenge conventional AI training approaches
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <Zap className="w-10 h-10 text-accent mb-2" />
                <CardTitle className="text-lg">High-Quality Curation</CardTitle>
                <CardDescription>
                  Professionally curated and verified datasets ready for machine learning applications
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Dataset Types */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
            Available Dataset Categories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-xl">Cultural & Linguistic Data</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• African language corpora and translations</li>
                  <li>• Cultural storytelling and oral traditions</li>
                  <li>• Regional dialects and linguistic variations</li>
                  <li>• Contemporary African literature and media</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-xl">Visual & Creative Data</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Traditional and contemporary African art</li>
                  <li>• Fashion and textile pattern recognition</li>
                  <li>• Architectural and design elements</li>
                  <li>• Music and audio cultural datasets</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-xl">Behavioral & Social Data</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Social interaction patterns and customs</li>
                  <li>• Economic and business practices</li>
                  <li>• Educational and learning methodologies</li>
                  <li>• Community governance and decision-making</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-xl">Specialized Domain Data</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Healthcare and traditional medicine</li>
                  <li>• Agricultural and environmental knowledge</li>
                  <li>• Technology adoption and innovation</li>
                  <li>• Urban planning and development</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <Users className="w-16 h-16 text-accent mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Join the AI Training Revolution</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you need specialized datasets for your AI models or want to contribute unique cultural data, TrainAI
            connects you with authentic African perspectives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleDatasetRequest}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {requestSubmitted ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Request Submitted
                </>
              ) : (
                "Request Custom Dataset"
              )}
            </Button>
            <Button variant="outline" size="lg">
              Learn More About Contributing
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
