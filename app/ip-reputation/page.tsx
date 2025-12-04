"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  CheckCircle,
  Music,
  Palette,
  Gamepad2,
  ArrowRight,
  Upload,
  Video,
  MapPin,
  BarChart3,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const ipAssets = [
  {
    id: "1",
    name: "Afrobeats Collective Vol. 1",
    creator: "Oladele Studios",
    category: "music",
    icon: Music,
    signal: 8.7,
    sentiment: { positive: 78, neutral: 15, negative: 7 },
    socialTraction: { instagram: 45600, twitter: 23400, tiktok: 128900 },
    creatorRep: "Rising: Nominated for Grammy 2024",
    riskScore: 3,
    riskMomentum: "improving",
    votes: 1240,
    buzz: "High engagement, 15% week-over-week growth",
  },
  {
    id: "2",
    name: "Lagos Street Art Series",
    creator: "Chidi Nwankwo",
    category: "art",
    icon: Palette,
    signal: 7.4,
    sentiment: { positive: 82, neutral: 12, negative: 6 },
    socialTraction: { instagram: 98200, twitter: 12100, tiktok: 45600 },
    creatorRep: "Established: Featured in 12 major galleries",
    riskScore: 2,
    riskMomentum: "stable",
    votes: 2103,
    buzz: "Museum acquisition discussions ongoing",
  },
  {
    id: "3",
    name: "Ancestral Legends Game IP",
    creator: "Naija Games Studio",
    category: "game",
    icon: Gamepad2,
    signal: 9.1,
    sentiment: { positive: 85, neutral: 10, negative: 5 },
    socialTraction: { instagram: 156200, twitter: 89400, tiktok: 234500 },
    creatorRep: "Hot: Series A funded, 500k+ monthly active users",
    riskScore: 2,
    riskMomentum: "improving",
    votes: 3567,
    buzz: "Netflix adaptation in pre-production",
  },
]

const mockVigilData = [
  {
    platform: "TikTok",
    location: "Lagos, Nigeria",
    timestamp: "2024-12-03 14:32:18",
    views: "2.3M",
    engagement: "18.4%",
    context: "Dance challenge using track",
    url: "tiktok.com/@creator/video/123456",
  },
  {
    platform: "Instagram Reels",
    location: "Accra, Ghana",
    timestamp: "2024-12-02 09:15:42",
    views: "456K",
    engagement: "12.1%",
    context: "Fashion show background music",
    url: "instagram.com/reel/abc123",
  },
  {
    platform: "YouTube Shorts",
    location: "London, UK",
    timestamp: "2024-12-01 16:48:09",
    views: "892K",
    engagement: "15.7%",
    context: "Restaurant ambiance video",
    url: "youtube.com/shorts/xyz789",
  },
  {
    platform: "Twitter/X",
    location: "New York, USA",
    timestamp: "2024-11-30 11:23:55",
    views: "124K",
    engagement: "8.3%",
    context: "Viral meme compilation",
    url: "twitter.com/user/status/987654",
  },
]

export default function IPReputationIndexPage() {
  const [selectedIP, setSelectedIP] = useState<string | null>(null)
  const [serviceTab, setServiceTab] = useState<"index" | "vigil">("index")
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [vigilResults, setVigilResults] = useState<typeof mockVigilData | null>(null)
  const selectedAsset = ipAssets.find((a) => a.id === selectedIP)

  const handleVigilAnalysis = () => {
    // Simulate analysis
    setTimeout(() => {
      setVigilResults(mockVigilData)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navigation />

      <main className="flex-1 py-4 sm:py-6 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="h-4 w-4 text-white" />
              <h1 className="font-bold text-lg sm:text-xl text-white">REVULTER IP INTELLIGENCE</h1>
            </div>
            <p className="text-xs text-gray-400">
              Real-time IP reputation tracking & video surveillance powered by Argus VIGIL
            </p>
          </div>

          <div className="flex gap-1 mb-4 border-b border-white/10">
            <button
              onClick={() => setServiceTab("index")}
              className={`px-3 py-1.5 text-xs font-semibold transition-all ${
                serviceTab === "index" ? "text-white border-b-2 border-white" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              IP INDEX
            </button>
            <button
              onClick={() => setServiceTab("vigil")}
              className={`px-3 py-1.5 text-xs font-semibold transition-all ${
                serviceTab === "vigil" ? "text-white border-b-2 border-white" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              VIDEO IP INTELLIGENCE
            </button>
          </div>

          {serviceTab === "index" ? (
            <div className="grid lg:grid-cols-3 gap-3">
              <div className="lg:col-span-1 space-y-1">
                {ipAssets.map((asset) => {
                  const IconComponent = asset.icon
                  return (
                    <button
                      key={asset.id}
                      onClick={() => setSelectedIP(asset.id)}
                      className={`w-full text-left p-2 transition-all border-l-2 ${
                        selectedIP === asset.id
                          ? "border-l-white bg-white/5"
                          : "border-l-transparent hover:border-l-gray-600 hover:bg-white/[0.02]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-3 w-3 text-white flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold text-xs text-white truncate">{asset.name}</h3>
                            <span
                              className={`text-xs font-bold ${
                                asset.signal >= 8.5
                                  ? "text-green-400"
                                  : asset.signal >= 7
                                    ? "text-blue-400"
                                    : "text-yellow-400"
                              }`}
                            >
                              {asset.signal}
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-500 truncate">{asset.creator}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="lg:col-span-2">
                {selectedAsset ? (
                  <div className="space-y-2">
                    {/* IP Signal Score - Terminal Style */}
                    <div className="bg-white/5 border border-white/10 p-3">
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase mb-0.5">Signal</p>
                          <div className="flex items-center gap-1">
                            <span className="text-2xl font-bold text-white">{selectedAsset.signal}</span>
                            {selectedAsset.riskMomentum === "improving" ? (
                              <TrendingUp className="h-3 w-3 text-green-400" />
                            ) : selectedAsset.riskMomentum === "declining" ? (
                              <TrendingDown className="h-3 w-3 text-red-400" />
                            ) : (
                              <CheckCircle className="h-3 w-3 text-blue-400" />
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase mb-0.5">Risk</p>
                          <span
                            className={`text-2xl font-bold ${
                              selectedAsset.riskScore <= 2
                                ? "text-green-400"
                                : selectedAsset.riskScore <= 3
                                  ? "text-yellow-400"
                                  : "text-red-400"
                            }`}
                          >
                            {selectedAsset.riskScore}/10
                          </span>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase mb-0.5">Votes</p>
                          <span className="text-2xl font-bold text-white">{selectedAsset.votes.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Sentiment & Social - Compact Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white/5 border border-white/10 p-2">
                        <p className="text-[10px] text-gray-500 uppercase mb-2">Sentiment</p>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-green-400">POS</span>
                            <span className="text-xs font-bold text-white">{selectedAsset.sentiment.positive}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-blue-400">NEU</span>
                            <span className="text-xs font-bold text-white">{selectedAsset.sentiment.neutral}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-red-400">NEG</span>
                            <span className="text-xs font-bold text-white">{selectedAsset.sentiment.negative}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 border border-white/10 p-2">
                        <p className="text-[10px] text-gray-500 uppercase mb-2">Social Reach</p>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-gray-400">IG</span>
                            <span className="text-xs font-bold text-white">
                              {(selectedAsset.socialTraction.instagram / 1000).toFixed(1)}K
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-gray-400">X</span>
                            <span className="text-xs font-bold text-white">
                              {(selectedAsset.socialTraction.twitter / 1000).toFixed(1)}K
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-gray-400">TT</span>
                            <span className="text-xs font-bold text-white">
                              {(selectedAsset.socialTraction.tiktok / 1000).toFixed(1)}K
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Creator Rep */}
                    <div className="bg-white/5 border border-white/10 p-2">
                      <p className="text-[10px] text-gray-500 uppercase mb-1">Creator Profile</p>
                      <p className="text-xs text-white">{selectedAsset.creatorRep}</p>
                    </div>

                    {/* Buzz */}
                    <div className="bg-white/5 border border-white/10 p-2">
                      <p className="text-[10px] text-gray-500 uppercase mb-1">Market Buzz</p>
                      <p className="text-xs text-white mb-2">{selectedAsset.buzz}</p>
                      <Button asChild size="sm" className="w-full h-7 text-xs bg-white text-black hover:bg-gray-200">
                        <Link href={`/licensing?asset=${selectedAsset.id}`}>
                          EXPLORE LICENSING <ArrowRight className="h-3 w-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/5 border border-white/10 h-full flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                      <BarChart3 className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                      <p className="text-xs text-gray-500">SELECT AN IP TO VIEW METRICS</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/5 border border-white/10 p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Video className="h-4 w-4 text-white" />
                  <h2 className="text-sm font-bold text-white uppercase">Argus VIGIL</h2>
                  <span className="text-[10px] text-gray-500 uppercase">Video Intelligence Guard Layer</span>
                </div>
                <p className="text-xs text-gray-400 mb-4">
                  Upload your IP asset or paste a link to track unauthorized usage across social media platforms
                </p>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="vigil-upload" className="text-xs text-gray-400 mb-1">
                      Upload Asset (Video, Audio, Image)
                    </Label>
                    <div className="border-2 border-dashed border-white/20 rounded p-4 text-center hover:border-white/40 transition-colors">
                      <Upload className="h-6 w-6 text-gray-500 mx-auto mb-2" />
                      <Input
                        id="vigil-upload"
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setUploadedFile(e.target.files[0].name)
                          }
                        }}
                      />
                      <label htmlFor="vigil-upload" className="text-xs text-gray-400 cursor-pointer hover:text-white">
                        {uploadedFile || "Click to upload or drag and drop"}
                      </label>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="text-[10px] text-gray-500 uppercase">or</span>
                  </div>

                  <div>
                    <Label htmlFor="vigil-link" className="text-xs text-gray-400 mb-1">
                      Paste Asset URL
                    </Label>
                    <Input
                      id="vigil-link"
                      placeholder="https://example.com/your-asset"
                      className="bg-black border-white/20 text-white text-xs h-8"
                    />
                  </div>

                  <Button
                    onClick={handleVigilAnalysis}
                    className="w-full bg-white text-black hover:bg-gray-200 h-8 text-xs"
                  >
                    RUN VIGIL ANALYSIS
                  </Button>
                </div>
              </div>

              {/* Results */}
              {vigilResults && (
                <div className="space-y-2">
                  <div className="bg-white/5 border border-white/10 p-3 mb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase">Detections</p>
                        <p className="text-2xl font-bold text-white">{vigilResults.length}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase">Total Views</p>
                        <p className="text-2xl font-bold text-green-400">3.8M</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase">Avg Engagement</p>
                        <p className="text-2xl font-bold text-blue-400">13.6%</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {vigilResults.map((result, idx) => (
                      <div
                        key={idx}
                        className="bg-white/5 border border-white/10 p-2 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold text-white">{result.platform}</span>
                              <span className="text-[10px] text-gray-500">{result.timestamp}</span>
                            </div>
                            <div className="flex items-center gap-3 mb-1">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-gray-500" />
                                <span className="text-[10px] text-gray-400">{result.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3 text-gray-500" />
                                <span className="text-[10px] text-gray-400">{result.views}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="h-3 w-3 text-gray-500" />
                                <span className="text-[10px] text-gray-400">{result.engagement}</span>
                              </div>
                            </div>
                            <p className="text-[10px] text-gray-500 truncate">{result.context}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 text-[10px] border-white/20 text-white hover:bg-white hover:text-black bg-transparent"
                            asChild
                          >
                            <a href={`https://${result.url}`} target="_blank" rel="noopener noreferrer">
                              VIEW
                            </a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
