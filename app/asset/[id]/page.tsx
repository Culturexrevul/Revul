"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, Users, TrendingUp, FileText, Gavel } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function AssetProfilePage({ params }: { params: { id: string } }) {
  const [licenseForm, setLicenseForm] = useState({
    type: "",
    price: "",
    term: "",
  })

  const handleLicenseSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate license offer submission
    alert("License offer submitted successfully!")
  }

  // Mock asset data
  const asset = {
    id: params.id,
    title: "Ancestral Rhythms",
    description:
      "A vibrant digital art piece that celebrates African heritage through contemporary geometric patterns and traditional color palettes. This work explores the intersection of ancestral wisdom and modern artistic expression.",
    category: "Digital Art",
    owner: "Amara Okafor",
    registrationDate: "2024-01-15",
    estimatedValue: "$2,500",
    totalShares: 100,
    availableShares: 25,
    pricePerShare: "$50",
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Asset Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div
              className="aspect-square rounded-lg overflow-hidden bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url(https://www.cosmos.so/e/1228178463)",
              }}
            >
              <Image
                src="/placeholder.svg?height=600&width=600&text=Ancestral+Rhythms"
                alt={asset.title}
                width={600}
                height={600}
                className="w-full h-full object-cover opacity-0"
              />
            </div>

            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {asset.category}
                </Badge>
                <h1 className="font-display font-bold text-4xl text-primary mb-4">{asset.title}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">{asset.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="h-5 w-5 text-accent" />
                      <span className="font-semibold text-primary">Estimated Value</span>
                    </div>
                    <div className="text-2xl font-bold text-accent">{asset.estimatedValue}</div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-5 w-5 text-terracotta" />
                      <span className="font-semibold text-primary">Available Shares</span>
                    </div>
                    <div className="text-2xl font-bold text-terracotta">{asset.availableShares}%</div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Owner:</span>
                  <span className="font-semibold text-primary">{asset.owner}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Registration Date:</span>
                  <span className="font-semibold text-primary">{asset.registrationDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Price per Share:</span>
                  <span className="font-semibold text-accent">{asset.pricePerShare}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="licensing">Licensing</TabsTrigger>
              <TabsTrigger value="history">Transaction History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Ownership Breakdown */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-display text-xl text-primary">Ownership Breakdown</CardTitle>
                    <CardDescription>Current distribution of asset ownership</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Original Owner</span>
                        <span className="font-semibold text-primary">75%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-accent h-2 rounded-full" style={{ width: "75%" }}></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Available for Sale</span>
                        <span className="font-semibold text-terracotta">25%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-terracotta h-2 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Metrics */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-display text-xl text-primary">Performance Metrics</CardTitle>
                    <CardDescription>Asset performance and market data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-5 w-5 text-secondary" />
                          <span className="text-muted-foreground">30-Day Growth</span>
                        </div>
                        <span className="font-semibold text-secondary">+12.5%</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-5 w-5 text-accent" />
                          <span className="text-muted-foreground">Days Listed</span>
                        </div>
                        <span className="font-semibold text-primary">45</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Users className="h-5 w-5 text-terracotta" />
                          <span className="text-muted-foreground">Total Investors</span>
                        </div>
                        <span className="font-semibold text-primary">3</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="licensing" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-display text-xl text-primary">Create License Offer</CardTitle>
                  <CardDescription>Set terms for licensing this creative work to third parties</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLicenseSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-base font-medium">License Type *</Label>
                        <Select onValueChange={(value) => setLicenseForm((prev) => ({ ...prev, type: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select license type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="commercial">Commercial Use</SelectItem>
                            <SelectItem value="ai-training">AI Training Rights</SelectItem>
                            <SelectItem value="remix">Remix Rights</SelectItem>
                            <SelectItem value="exclusive">Exclusive License</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="price" className="text-base font-medium">
                          License Price *
                        </Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="Enter price in USD"
                          value={licenseForm.price}
                          onChange={(e) => setLicenseForm((prev) => ({ ...prev, price: e.target.value }))}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-base font-medium">Term Length *</Label>
                        <Select onValueChange={(value) => setLicenseForm((prev) => ({ ...prev, term: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select term length" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-year">1 Year</SelectItem>
                            <SelectItem value="2-years">2 Years</SelectItem>
                            <SelectItem value="5-years">5 Years</SelectItem>
                            <SelectItem value="perpetual">Perpetual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90">
                      <Gavel className="h-5 w-5 mr-2" />
                      Submit License Offer
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-display text-xl text-primary">Transaction History</CardTitle>
                  <CardDescription>Recent transactions and ownership changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-accent" />
                        <div>
                          <p className="font-semibold text-primary">Asset Registered</p>
                          <p className="text-sm text-muted-foreground">Initial registration by {asset.owner}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">100%</p>
                        <p className="text-sm text-muted-foreground">Jan 15, 2024</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <TrendingUp className="h-5 w-5 text-terracotta" />
                        <div>
                          <p className="font-semibold text-primary">Shares Listed</p>
                          <p className="text-sm text-muted-foreground">25% made available for purchase</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-terracotta">25%</p>
                        <p className="text-sm text-muted-foreground">Jan 20, 2024</p>
                      </div>
                    </div>

                    <div className="text-center py-8 text-muted-foreground">
                      <p>No additional transactions yet</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
