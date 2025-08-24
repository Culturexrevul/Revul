"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Shield, Clock, Globe, ExternalLink, Eye, ThumbsUp, CheckCircle, Plus, Minus, Users, Info } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAssets, type CoOwner } from "@/contexts/AssetContext"

interface YouTubeVideoData {
  title: string
  thumbnail: string
  viewCount: string
  likeCount: string
  videoId: string
}

export default function RegisterPage() {
  const router = useRouter()
  const { addAsset, isLoading: contextLoading, error: contextError } = useAssets()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    ownership: "",
    youtubeLink: "",
  })

  const [hasCoOwners, setHasCoOwners] = useState(false)
  const [coOwners, setCoOwners] = useState<CoOwner[]>([{ name: "", percentage: 100 }])
  const [ownershipError, setOwnershipError] = useState("")

  const [youtubeData, setYoutubeData] = useState<YouTubeVideoData | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoadingYoutube, setIsLoadingYoutube] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  const fetchYouTubeData = async (videoId: string): Promise<YouTubeVideoData | null> => {
    try {
      const apiKey = "AIzaSyAnxAKqYhWrlUWCw_mNz2ciRlnViYzImOw"
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`,
      )

      if (!response.ok) throw new Error("Failed to fetch YouTube data")

      const data = await response.json()
      if (data.items && data.items.length > 0) {
        const video = data.items[0]
        return {
          title: video.snippet.title,
          thumbnail: video.snippet.thumbnails.medium.url,
          viewCount: Number.parseInt(video.statistics.viewCount).toLocaleString(),
          likeCount: Number.parseInt(video.statistics.likeCount).toLocaleString(),
          videoId: videoId,
        }
      }
      return null
    } catch (error) {
      console.error("Error fetching YouTube data:", error)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (hasCoOwners) {
      const total = coOwners.reduce((sum, owner) => sum + (owner.percentage || 0), 0)
      if (total !== 100) {
        setOwnershipError("Total ownership must equal 100% before submitting.")
        return
      }

      const hasEmptyNames = coOwners.some((owner) => !owner.name.trim())
      if (hasEmptyNames) {
        setOwnershipError("All co-owner names must be filled in.")
        return
      }
    }

    setIsLoadingYoutube(true)

    try {
      let ytData = null

      if (formData.category === "music" && formData.youtubeLink) {
        const videoId = extractVideoId(formData.youtubeLink)
        if (videoId) {
          ytData = await fetchYouTubeData(videoId)
          setYoutubeData(ytData)
        }
      }

      const assetId = addAsset({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        ownership: hasCoOwners ? "Multiple Owners" : formData.ownership,
        coOwners: hasCoOwners ? coOwners : undefined,
        youtubeLink: formData.youtubeLink,
        youtubeData: ytData || undefined,
        image: "",
        price: 0,
        available: "",
      })

      setIsLoadingYoutube(false)
      setRegistrationSuccess(true)
      setIsSubmitted(true)

      setTimeout(() => {
        router.push(`/asset/${assetId}`)
      }, 2000)
    } catch (error) {
      console.error("Registration failed:", error)
      setIsLoadingYoutube(false)
      setIsSubmitted(true)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addCoOwner = () => {
    setCoOwners([...coOwners, { name: "", percentage: 0 }])
  }

  const removeCoOwner = (index: number) => {
    if (coOwners.length > 1) {
      setCoOwners(coOwners.filter((_, i) => i !== index))
    }
  }

  const updateCoOwner = (index: number, field: keyof CoOwner, value: string | number) => {
    const updated = coOwners.map((owner, i) => (i === index ? { ...owner, [field]: value } : owner))
    setCoOwners(updated)
    validateOwnership(updated)
  }

  const validateOwnership = (owners: CoOwner[]) => {
    const total = owners.reduce((sum, owner) => sum + (owner.percentage || 0), 0)
    if (total !== 100) {
      setOwnershipError(`Total ownership is ${total}%. Must equal 100%.`)
    } else {
      setOwnershipError("")
    }
  }

  const handleOwnershipToggle = (checked: boolean) => {
    setHasCoOwners(checked)
    if (!checked) {
      setCoOwners([{ name: "", percentage: 100 }])
      setOwnershipError("")
    } else {
      setCoOwners([
        { name: "", percentage: 50 },
        { name: "", percentage: 50 },
      ])
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div
                className={`w-16 h-16 ${registrationSuccess ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                {registrationSuccess ? (
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                ) : (
                  <Shield className="w-8 h-8 text-red-600 dark:text-red-400" />
                )}
              </div>
              <h1 className="font-display font-bold text-3xl text-foreground mb-4">
                {registrationSuccess ? "Registration Successful!" : "Registration Failed"}
              </h1>
              <p className="text-muted-foreground mb-6">
                {registrationSuccess
                  ? `Your creative work "${formData.title}" has been successfully registered and is now visible on the homepage.`
                  : "There was an error registering your asset. Please try again."}
              </p>
              {contextError && <p className="text-red-600 dark:text-red-400 text-sm mb-4">{contextError}</p>}
            </div>

            {youtubeData && formData.category === "music" && (
              <Card className="mb-8 border-border bg-card shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">YouTube Track Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <img
                      src={youtubeData.thumbnail || "/placeholder.svg"}
                      alt={youtubeData.title}
                      className="w-full md:w-48 h-36 object-cover rounded-lg"
                    />
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">{youtubeData.title}</h3>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">{youtubeData.viewCount} views</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ThumbsUp className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">{youtubeData.likeCount} likes</span>
                        </div>
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <a
                          href={`https://youtube.com/watch?v=${youtubeData.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View on YouTube
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-4 justify-center">
              <Button onClick={() => router.push("/")} variant="outline" className="bg-transparent">
                View on Homepage
              </Button>
              {registrationSuccess && (
                <Button
                  onClick={() => router.push(`/asset/${Math.random().toString(36).substr(2, 9)}`)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  View Asset Profile
                </Button>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display font-bold text-4xl lg:text-5xl text-foreground mb-6">
              Register Your <span className="text-accent">Creative Work</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Protect your intellectual property and unlock new revenue opportunities in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="border-border bg-card shadow-lg">
                <CardHeader>
                  <CardTitle className="font-display text-2xl text-foreground">Asset Details</CardTitle>
                  <CardDescription>
                    Provide information about your creative work to begin the registration process.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TooltipProvider>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-base font-medium">
                          Asset Title *
                        </Label>
                        <Input
                          id="title"
                          placeholder="Enter the title of your creative work"
                          value={formData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          required
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-base font-medium">
                          Description *
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your creative work, its inspiration, and unique elements"
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          required
                          rows={4}
                          className="resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-base font-medium">Category *</Label>
                        <Select onValueChange={(value) => handleInputChange("category", value)} required>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select the category of your work" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="music">Music</SelectItem>
                            <SelectItem value="art">Art</SelectItem>
                            <SelectItem value="film">Film</SelectItem>
                            <SelectItem value="fashion">Fashion</SelectItem>
                            <SelectItem value="literature">Literature</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.category === "music" && (
                        <div className="space-y-2">
                          <Label htmlFor="youtubeLink" className="text-base font-medium">
                            YouTube Link (Optional)
                          </Label>
                          <Input
                            id="youtubeLink"
                            type="url"
                            placeholder="Enter YouTube link to your song"
                            value={formData.youtubeLink}
                            onChange={(e) => handleInputChange("youtubeLink", e.target.value)}
                            className="h-12"
                          />
                          <p className="text-sm text-muted-foreground">
                            Add a YouTube link to display track statistics with your registration
                          </p>
                        </div>
                      )}

                      <div className="space-y-4 border-t border-border pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Users className="h-5 w-5 text-accent" />
                            <Label className="text-base font-medium">Ownership Structure</Label>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  Choose whether this work has a single owner or multiple co-owners. All ownership
                                  percentages must add up to 100%.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor="co-owners-toggle" className="text-sm">
                              {hasCoOwners ? "Multiple Co-Owners" : "Single Owner"}
                            </Label>
                            <Switch
                              id="co-owners-toggle"
                              checked={hasCoOwners}
                              onCheckedChange={handleOwnershipToggle}
                            />
                          </div>
                        </div>

                        {!hasCoOwners ? (
                          <div className="space-y-2">
                            <Label htmlFor="ownership" className="text-base font-medium">
                              Ownership Percentage *
                            </Label>
                            <Input
                              id="ownership"
                              type="number"
                              min="1"
                              max="100"
                              placeholder="Enter your ownership percentage (1-100)"
                              value={formData.ownership}
                              onChange={(e) => handleInputChange("ownership", e.target.value)}
                              required
                              className="h-12"
                            />
                            <p className="text-sm text-muted-foreground">
                              Specify what percentage of this work you own (e.g., 100% for sole ownership)
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <Label className="text-base font-medium">Co-Owners *</Label>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addCoOwner}
                                className="flex items-center gap-2 bg-transparent"
                              >
                                <Plus className="h-4 w-4" />
                                Add Co-Owner
                              </Button>
                            </div>

                            <div className="space-y-3">
                              {coOwners.map((owner, index) => (
                                <div key={index} className="flex gap-3 items-end">
                                  <div className="flex-1">
                                    <Label className="text-sm font-medium">Co-Owner {index + 1} Name</Label>
                                    <Input
                                      placeholder="Enter co-owner name"
                                      value={owner.name}
                                      onChange={(e) => updateCoOwner(index, "name", e.target.value)}
                                      required
                                      className="h-10"
                                    />
                                  </div>
                                  <div className="w-24">
                                    <Label className="text-sm font-medium">%</Label>
                                    <Input
                                      type="number"
                                      min="0"
                                      max="100"
                                      placeholder="0"
                                      value={owner.percentage || ""}
                                      onChange={(e) => updateCoOwner(index, "percentage", Number(e.target.value))}
                                      required
                                      className="h-10"
                                    />
                                  </div>
                                  {coOwners.length > 1 && (
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => removeCoOwner(index)}
                                      className="h-10 w-10 p-0 flex-shrink-0"
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>

                            {ownershipError && (
                              <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                                {ownershipError}
                              </div>
                            )}

                            <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                              <strong>Total Ownership:</strong>{" "}
                              {coOwners.reduce((sum, owner) => sum + (owner.percentage || 0), 0)}%
                              {coOwners.reduce((sum, owner) => sum + (owner.percentage || 0), 0) === 100 && (
                                <span className="text-green-600 dark:text-green-400 ml-2">✓ Valid</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg"
                        disabled={isLoadingYoutube || contextLoading || (hasCoOwners && ownershipError !== "")}
                      >
                        {isLoadingYoutube ? "Processing..." : contextLoading ? "Saving..." : "Register Asset"}
                      </Button>
                    </form>
                  </TooltipProvider>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-border bg-card shadow-lg">
                <CardHeader>
                  <CardTitle className="font-display text-xl text-foreground">Why Register?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Legal Protection</h4>
                      <p className="text-sm text-muted-foreground">
                        Establish ownership and protect against unauthorized use
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Globe className="h-6 w-6 text-terracotta mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Global Reach</h4>
                      <p className="text-sm text-muted-foreground">
                        License your work to international markets and platforms
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Quick Process</h4>
                      <p className="text-sm text-muted-foreground">Complete registration in minutes, not months</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-accent/10 dark:bg-accent/5 shadow-lg">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-foreground mb-2">Registration Fee</h4>
                  <div className="text-3xl font-bold text-accent mb-2">$25</div>
                  <p className="text-sm text-muted-foreground">
                    One-time fee includes blockchain registration, legal documentation, and marketplace listing.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
