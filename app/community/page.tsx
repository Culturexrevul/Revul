"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, MessageCircle, Heart, Clock } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const blogPosts = [
  {
    id: "nigerian-copyright-law",
    title: "Understanding Nigerian Copyright Law for Creative Assets",
    excerpt:
      "A comprehensive guide to copyright protection for songs, literary works, and creative assets in Nigeria, including digital and blockchain-enabled certificates.",
    author: "Legal Team",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Legal",
    likes: 24,
    comments: 12,
    image: "/nigerian-copyright-law-books-and-documents.png",
  },
  {
    id: "nigerian-isa-law",
    title: "Nigerian ISA Law and Digital Assets Recognition",
    excerpt:
      "How cryptocurrencies and digital assets are recognized under Nigerian law and their implications for creative asset ownership and licensing.",
    author: "Blockchain Team",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Regulation",
    likes: 18,
    comments: 8,
    image: "/nigerian-digital-assets-and-cryptocurrency-regulat.png",
  },
  {
    id: "blockchain-white-paper",
    title: "Nigerian Blockchain White Paper: Implications for Creative Works",
    excerpt:
      "Exploring Nigeria's blockchain white paper and its relevance for digital assets, creative works, and platform functionality.",
    author: "Research Team",
    date: "2024-01-05",
    readTime: "10 min read",
    category: "Technology",
    likes: 31,
    comments: 15,
    image: "/nigerian-blockchain-technology-and-digital-innovat.png",
  },
  {
    id: "crowdfunding-creative-works",
    title: "Crowdfunding Creative Works Through Fractional Ownership",
    excerpt:
      "How fractional ownership and NFT-like mechanisms enable fans and investors to fund music and artistic ventures while supporting creators.",
    author: "Innovation Team",
    date: "2024-01-01",
    readTime: "7 min read",
    category: "Innovation",
    likes: 42,
    comments: 23,
    image: "/crowdfunding-creative-works-and-fractional-ownersh.png",
  },
]

export default function CommunityPage() {
  const [likedPosts, setLikedPosts] = useState<string[]>([])

  const handleLike = (postId: string) => {
    setLikedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Community Hub</h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay informed about Nigerian creative law, digital assets, and innovative funding mechanisms that empower
            African creators and cultural commerce.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-8 sm:mb-12">
          <Card className="overflow-hidden border-accent/20 bg-gradient-to-r from-accent/5 to-primary/5">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="aspect-video md:aspect-auto">
                <img
                  src={blogPosts[0].image || "/placeholder.svg"}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6 sm:p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-3 bg-accent/10 text-accent border-accent/20">Featured Post</Badge>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3">{blogPosts[0].title}</h2>
                <p className="text-muted-foreground mb-4 line-clamp-3">{blogPosts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {blogPosts[0].author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(blogPosts[0].date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {blogPosts[0].readTime}
                  </div>
                </div>
                <Button asChild className="w-fit">
                  <Link href={`/community/${blogPosts[0].id}`}>Read Full Article</Link>
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <CardTitle className="text-lg sm:text-xl line-clamp-2 hover:text-accent transition-colors">
                  <Link href={`/community/${post.id}`}>{post.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1 hover:text-accent transition-colors"
                    >
                      <Heart className={`h-4 w-4 ${likedPosts.includes(post.id) ? "fill-accent text-accent" : ""}`} />
                      {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                    </button>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {post.comments}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/community/${post.id}`}>Read More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 sm:mt-16">
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-6 sm:p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">Stay Updated</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get the latest insights on Nigerian creative law, digital assets, and innovative funding mechanisms
                delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
