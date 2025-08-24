"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { Check, Upload, Shield, Award, Globe } from "lucide-react"

interface CreatorIDProps {
  mode?: "benefits" | "apply" | "signin"
  compact?: boolean
}

export default function CreatorID({ mode = "benefits", compact = false }: CreatorIDProps) {
  const [activeTab, setActiveTab] = useState(mode)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    twitter: "",
    portfolio: "",
    languages: [] as string[],
    preferred: [] as string[],
    bio: "",
    attachName: "",
    consent: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [referenceCode, setReferenceCode] = useState("")
  const [statusRef, setStatusRef] = useState("")
  const [statusResult, setStatusResult] = useState("")
  const [brandDialogOpen, setBrandDialogOpen] = useState(false)
  const [brandForm, setBrandForm] = useState({
    name: "",
    organization: "",
    email: "",
    useCase: "",
  })

  const categories = ["Music", "Film & TV", "Design", "Digital Art", "Comedy", "Gaming", "Fashion"]
  const nigerianStates = ["Lagos", "Abuja", "Kano", "Rivers", "Oyo", "Kaduna", "Anambra", "Delta", "Ogun", "Imo"]
  const languages = ["English", "Pidgin", "Yoruba", "Igbo", "Hausa"]
  const benefits = ["IP fast-track", "Brand briefs", "Legal consults", "Training", "Insurance"]

  const addCategory = (category: string) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category])
      setFormData({ ...formData, categories: [...selectedCategories, category] })
    }
  }

  const removeCategory = (category: string) => {
    const updated = selectedCategories.filter((c) => c !== category)
    setSelectedCategories(updated)
    setFormData({ ...formData, categories: updated })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/creator/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          categories: selectedCategories,
        }),
      })

      const result = await response.json()

      if (result.ok) {
        setReferenceCode(result.reference)
        toast({
          title: "Application submitted",
          description: `Your reference code is ${result.reference}`,
        })
      } else {
        throw new Error("Submission failed")
      }
    } catch (error) {
      toast({
        title: "Could not submit. Try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const checkStatus = async () => {
    try {
      const response = await fetch("/api/creator/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref: statusRef }),
      })
      const result = await response.json()
      setStatusResult(result.status)
    } catch (error) {
      toast({
        title: "Could not check status",
        variant: "destructive",
      })
    }
  }

  const submitBrandRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Request received. We'll reach out shortly.",
    })
    setBrandDialogOpen(false)
    setBrandForm({ name: "", organization: "", email: "", useCase: "" })
  }

  return (
    <div className="min-h-screen bg-background">
      {!compact && (
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4 sm:mb-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">Creator ID Portal</h1>
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                Beta
              </Badge>
            </div>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
              Get an official state-backed ID for creators—your trust mark for brands, payments, and protections.
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  onClick={() => addCategory(category)}
                  className="rounded-full text-xs sm:text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-12">
            <TabsTrigger value="benefits" className="text-sm">
              Benefits
            </TabsTrigger>
            <TabsTrigger value="apply" className="text-sm">
              Apply
            </TabsTrigger>
            <TabsTrigger value="signin" className="text-sm">
              Sign In
            </TabsTrigger>
          </TabsList>

          <TabsContent value="benefits" className="space-y-6 sm:space-y-8">
            {/* Benefits Pyramid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card className="rounded-2xl">
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    Basic
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(1000)} registration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 px-4 sm:px-6">
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Verified badge</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Listing in Creator Registry</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Contract templates</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">AI legal Q&A access (limited)</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-primary">
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Award className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    Pro
                  </CardTitle>
                  <CardDescription className="text-sm">Monthly subscription</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 px-4 sm:px-6">
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Brand brief access</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Micro-grants eligibility</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Discounted legal consults</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Insurance group rates</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Creator Wallet</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-accent">
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                    Premium
                  </CardTitle>
                  <CardDescription className="text-sm">Invite/agency only</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 px-4 sm:px-6">
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Priority briefs</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Export showcases</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">IP fast-track</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Tax facilitation support</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">International exchange listing</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* How it works */}
            <Card className="rounded-2xl">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-base sm:text-lg">How it works</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm sm:text-base">1</span>
                    </div>
                    <span className="font-medium text-sm sm:text-base">Apply</span>
                  </div>
                  <div className="w-px h-8 sm:w-8 sm:h-px bg-border sm:rotate-0 rotate-90"></div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm sm:text-base">2</span>
                    </div>
                    <span className="font-medium text-sm sm:text-base">Verify</span>
                  </div>
                  <div className="w-px h-8 sm:w-8 sm:h-px bg-border sm:rotate-0 rotate-90"></div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm sm:text-base">3</span>
                    </div>
                    <span className="font-medium text-sm sm:text-base">Activate</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* For Brands & Agencies */}
            <Card className="rounded-2xl bg-accent/5">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-base sm:text-lg">For Brands & Agencies</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Access our verified creator registry to find authentic Nigerian talent for your campaigns.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <Dialog open={brandDialogOpen} onOpenChange={setBrandDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="h-10 sm:h-auto bg-transparent">
                      Request Registry Access
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md mx-auto">
                    <DialogHeader>
                      <DialogTitle className="text-base sm:text-lg">Request Registry Access</DialogTitle>
                      <DialogDescription className="text-sm">
                        Tell us about your organization and how you plan to work with creators.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitBrandRequest} className="space-y-4">
                      <Input
                        placeholder="Full name"
                        value={brandForm.name}
                        onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                        required
                        className="h-12 text-base"
                      />
                      <Input
                        placeholder="Organization"
                        value={brandForm.organization}
                        onChange={(e) => setBrandForm({ ...brandForm, organization: e.target.value })}
                        required
                        className="h-12 text-base"
                      />
                      <Input
                        type="email"
                        placeholder="Work email"
                        value={brandForm.email}
                        onChange={(e) => setBrandForm({ ...brandForm, email: e.target.value })}
                        required
                        className="h-12 text-base"
                      />
                      <Textarea
                        placeholder="Use-case (How do you plan to work with creators?)"
                        value={brandForm.useCase}
                        onChange={(e) => setBrandForm({ ...brandForm, useCase: e.target.value })}
                        required
                        className="text-base"
                      />
                      <Button type="submit" className="w-full h-12">
                        Submit Request
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="apply" className="space-y-6">
            <Card className="rounded-2xl">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-base sm:text-lg">Creator ID Application</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Complete your application to join Nigeria's official creator registry.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                {referenceCode ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Application Submitted!</h3>
                    <p className="text-muted-foreground mb-4 text-sm sm:text-base">Your reference code is:</p>
                    <div className="bg-muted p-4 rounded-lg font-mono text-base sm:text-lg">{referenceCode}</div>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-4">
                      Save this code to check your application status.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        placeholder="Full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        aria-label="Full name"
                        className="h-12 text-base"
                      />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        aria-label="Email address"
                        className="h-12 text-base"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        placeholder="Phone with country code"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        aria-label="Phone number"
                        className="h-12 text-base"
                      />
                      <Select onValueChange={(value) => setFormData({ ...formData, state: value })}>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {nigerianStates.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Input
                      placeholder="City (optional)"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      aria-label="City"
                      className="h-12 text-base"
                    />

                    <div>
                      <label className="text-sm font-medium mb-2 block">Categories</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {selectedCategories.map((category) => (
                          <Badge
                            key={category}
                            variant="secondary"
                            className="cursor-pointer text-xs"
                            onClick={() => removeCategory(category)}
                          >
                            {category} ×
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {categories
                          .filter((c) => !selectedCategories.includes(c))
                          .map((category) => (
                            <Button
                              key={category}
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addCategory(category)}
                              className="text-xs"
                            >
                              + {category}
                            </Button>
                          ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-sm font-medium">Social Media (optional)</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          placeholder="Instagram username"
                          value={formData.instagram}
                          onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                          aria-label="Instagram username"
                          className="h-12 text-base"
                        />
                        <Input
                          placeholder="TikTok username"
                          value={formData.tiktok}
                          onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                          aria-label="TikTok username"
                          className="h-12 text-base"
                        />
                        <Input
                          placeholder="YouTube channel"
                          value={formData.youtube}
                          onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                          aria-label="YouTube channel"
                          className="h-12 text-base"
                        />
                        <Input
                          placeholder="Twitter handle"
                          value={formData.twitter}
                          onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                          aria-label="Twitter handle"
                          className="h-12 text-base"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Enter usernames without @ symbol. Used for verification purposes.
                      </p>
                    </div>

                    <Input
                      placeholder="Portfolio / Drive link"
                      value={formData.portfolio}
                      onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                      aria-label="Portfolio link"
                      className="h-12 text-base"
                    />

                    <div>
                      <label className="text-sm font-medium mb-2 block">Languages</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {languages.map((lang) => (
                          <label key={lang} className="flex items-center gap-2">
                            <Checkbox
                              checked={formData.languages.includes(lang)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFormData({ ...formData, languages: [...formData.languages, lang] })
                                } else {
                                  setFormData({ ...formData, languages: formData.languages.filter((l) => l !== lang) })
                                }
                              }}
                            />
                            <span className="text-sm">{lang}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Preferred Benefits</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {benefits.map((benefit) => (
                          <label key={benefit} className="flex items-center gap-2">
                            <Checkbox
                              checked={formData.preferred.includes(benefit)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFormData({ ...formData, preferred: [...formData.preferred, benefit] })
                                } else {
                                  setFormData({
                                    ...formData,
                                    preferred: formData.preferred.filter((b) => b !== benefit),
                                  })
                                }
                              }}
                            />
                            <span className="text-sm">{benefit}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Short Bio</label>
                      <Textarea
                        placeholder="Tell us about yourself and your creative work (280-600 characters)"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        minLength={280}
                        maxLength={600}
                        aria-label="Short bio"
                        className="text-base"
                      />
                      <p className="text-xs text-muted-foreground mt-1">{formData.bio.length}/600 characters</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Attach ID / References</label>
                      <div className="border-2 border-dashed border-border rounded-lg p-4 sm:p-6 text-center">
                        <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Upload government ID or professional references
                        </p>
                        <Button type="button" variant="outline" size="sm">
                          Choose Files
                        </Button>
                        {formData.attachName && (
                          <p className="text-xs text-muted-foreground mt-2">Selected: {formData.attachName}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) => setFormData({ ...formData, consent: !!checked })}
                        required
                      />
                      <label htmlFor="consent" className="text-sm">
                        I confirm the information is accurate and I agree to verification.
                      </label>
                    </div>

                    <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      This portal provides general information and is not legal advice. For advice, consult a licensed
                      lawyer.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signin" className="space-y-6">
            <Card className="rounded-2xl">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-base sm:text-lg">Sign In</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Access your Creator ID dashboard and manage your profile.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-4 sm:px-6">
                <div className="space-y-4">
                  <Input placeholder="Email" type="email" aria-label="Email" className="h-12 text-base" />
                  <Input placeholder="Creator ID" aria-label="Creator ID" className="h-12 text-base" />
                  <Button className="w-full h-12">Continue</Button>
                  <p className="text-sm text-muted-foreground text-center">
                    Sign-in will be enabled after verification. For now, use your reference code to check status.
                  </p>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4 text-sm sm:text-base">Check Application Status</h3>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      placeholder="Reference Code (e.g., CRID-2025-00187)"
                      value={statusRef}
                      onChange={(e) => setStatusRef(e.target.value)}
                      aria-label="Reference code"
                      className="h-12 text-base flex-1"
                    />
                    <Button onClick={checkStatus} variant="outline" className="h-12 sm:w-auto bg-transparent">
                      Check Status
                    </Button>
                  </div>
                  {statusResult && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <p className="font-medium text-sm sm:text-base">Status: {statusResult}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-8 sm:mt-12">
          <p className="text-xs sm:text-sm text-muted-foreground px-2">
            By continuing, you agree to our{" "}
            <a href="/terms" className="text-primary hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
