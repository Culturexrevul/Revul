"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Package,
  Shirt,
  ShoppingBag,
  Zap,
  TrendingUp,
  Shield,
  QrCode,
  DollarSign,
  Users,
  Star,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Clock,
  Award,
  ImageIcon,
} from "lucide-react"
import { useState } from "react"

export default function MerchLabPage() {
  const [selectedIP, setSelectedIP] = useState<string | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [royaltyRate, setRoyaltyRate] = useState("15")
  const [itemLimit, setItemLimit] = useState("")
  const [activeTab, setActiveTab] = useState("launch")

  // Sample creator IPs
  const creatorIPs = [
    {
      id: "ip-1",
      name: "Cartoon Character IP",
      category: "Animation",
      image: "/colorful-cartoon-character-mascot-design.jpg",
      verified: true,
    },
    {
      id: "ip-2",
      name: "Animated Art NFT",
      category: "Digital Art",
      image: "/animated-digital-art-nft-futuristic-design.jpg",
      verified: true,
    },
    {
      id: "ip-3",
      name: "Abstract Painting IP",
      category: "Fine Art",
      image: "/abstract-modern-painting-colorful-art.jpg",
      verified: true,
    },
    {
      id: "ip-4",
      name: "Rap Album Cover Art",
      category: "Music",
      image: "/hip-hop-rap-album-cover-urban-street-art.jpg",
      verified: true,
    },
  ]

  // Product types
  const productTypes = [
    { id: "tshirt", name: "T-Shirt", icon: Shirt, basePrice: 25 },
    { id: "hoodie", name: "Hoodie", icon: Package, basePrice: 45 },
    { id: "cap", name: "Cap", icon: ShoppingBag, basePrice: 20 },
    { id: "jacket", name: "Jacket", icon: Package, basePrice: 65 },
    { id: "poster", name: "Poster", icon: ImageIcon, basePrice: 15 },
    { id: "sticker", name: "Sticker Pack", icon: Sparkles, basePrice: 8 },
  ]

  // Mock merch stats
  const merchStats = [
    { label: "Total Revenue", value: "$12,450", icon: DollarSign, trend: "+23%" },
    { label: "Items Sold", value: "487", icon: Package, trend: "+18%" },
    { label: "Active Drops", value: "12", icon: Zap, trend: "+5%" },
    { label: "Avg. Rating", value: "4.8", icon: Star, trend: "+0.2" },
  ]

  // Mock trending products
  const trendingProducts = [
    { name: "Abstract Vibes Hoodie", sales: 142, revenue: "$6,390", serialRange: "001-142" },
    { name: "Urban Street Tee", sales: 98, revenue: "$2,450", serialRange: "001-098" },
    { name: "Character Cap", sales: 76, revenue: "$1,520", serialRange: "001-076" },
  ]

  const handleLaunchMerch = () => {
    if (!selectedIP || selectedProducts.length === 0) {
      alert("Please select an IP and at least one product type")
      return
    }
    alert(
      `Merch launched! 
IP: ${selectedIP}
Products: ${selectedProducts.join(", ")}
Royalty: ${royaltyRate}%
${itemLimit ? `Limited to: ${itemLimit} items` : "Unlimited items"}`,
    )
  }

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 py-6 sm:py-8 px-3 sm:px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-foreground" />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">IP MerchLab</h1>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              Turn your registered IP into physical merchandise instantly with verified licensing
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger value="launch" className="text-xs sm:text-sm py-2">
                <Zap className="w-4 h-4 mr-1 sm:mr-2" />
                Launch Merch
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="text-xs sm:text-sm py-2">
                <TrendingUp className="w-4 h-4 mr-1 sm:mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="store" className="text-xs sm:text-sm py-2">
                <ShoppingBag className="w-4 h-4 mr-1 sm:mr-2" />
                My Store
              </TabsTrigger>
            </TabsList>

            {/* Launch Merch Tab */}
            <TabsContent value="launch" className="space-y-6">
              {/* Step 1: Select IP */}
              <Card className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Step 1: Select Your IP
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {creatorIPs.map((ip) => (
                    <button
                      key={ip.id}
                      onClick={() => setSelectedIP(ip.id)}
                      className={`relative p-3 sm:p-4 border-2 rounded-lg transition-all ${
                        selectedIP === ip.id
                          ? "border-foreground bg-accent/10"
                          : "border-border hover:border-foreground/50"
                      }`}
                    >
                      <div className="aspect-square rounded-md bg-muted mb-2 overflow-hidden">
                        <img
                          src={ip.image || "/placeholder.svg"}
                          alt={ip.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs font-medium line-clamp-2 mb-1">{ip.name}</p>
                      <Badge variant="outline" className="text-xs">
                        {ip.category}
                      </Badge>
                      {ip.verified && (
                        <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-green-600 bg-white rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Step 2: Select Products */}
              <Card className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Step 2: Select Product Types
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                  {productTypes.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => toggleProduct(product.id)}
                      className={`p-3 sm:p-4 border-2 rounded-lg transition-all ${
                        selectedProducts.includes(product.id)
                          ? "border-foreground bg-accent/10"
                          : "border-border hover:border-foreground/50"
                      }`}
                    >
                      <product.icon className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-xs font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">${product.basePrice}</p>
                    </button>
                  ))}
                </div>
                {selectedProducts.length > 0 && (
                  <div className="mt-4 p-3 bg-accent/5 rounded-lg">
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      <Sparkles className="w-4 h-4 inline mr-1" />
                      Auto-generating mockups for {selectedProducts.length} product
                      {selectedProducts.length > 1 ? "s" : ""}
                    </p>
                  </div>
                )}
              </Card>

              {/* Step 3: Configure */}
              <Card className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Step 3: Set Pricing & Limits
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="royalty" className="text-sm">
                      Your Royalty Rate (%)
                    </Label>
                    <Input
                      id="royalty"
                      type="number"
                      min="5"
                      max="50"
                      value={royaltyRate}
                      onChange={(e) => setRoyaltyRate(e.target.value)}
                      className="mt-1 h-9"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Recommended: 10-20%</p>
                  </div>
                  <div>
                    <Label htmlFor="limit" className="text-sm">
                      Item Limit (Optional - Leave blank for unlimited)
                    </Label>
                    <Input
                      id="limit"
                      type="number"
                      min="1"
                      value={itemLimit}
                      onChange={(e) => setItemLimit(e.target.value)}
                      placeholder="e.g., 100 for limited edition"
                      className="mt-1 h-9"
                    />
                  </div>
                </div>
              </Card>

              {/* Launch Button */}
              <div className="flex items-center justify-between p-4 sm:p-6 bg-accent/5 rounded-lg">
                <div>
                  <p className="font-medium text-sm sm:text-base">Ready to launch?</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    All items will include verification tags and license certificates
                  </p>
                </div>
                <Button
                  onClick={handleLaunchMerch}
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 h-10 sm:h-12 px-4 sm:px-6"
                >
                  Launch Merch
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </TabsContent>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {merchStats.map((stat, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <stat.icon className="w-5 h-5 text-muted-foreground" />
                      <Badge variant="outline" className="text-xs text-green-600">
                        {stat.trend}
                      </Badge>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </Card>
                ))}
              </div>

              {/* Trending Products */}
              <Card className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Top Selling Items
                </h3>
                <div className="space-y-3">
                  {trendingProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">Serial: {product.serialRange}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm">{product.revenue}</p>
                        <p className="text-xs text-muted-foreground">{product.sales} sold</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Verification Info */}
              <Card className="p-4 sm:p-6 bg-accent/5">
                <div className="flex items-start gap-3">
                  <QrCode className="w-5 h-5 mt-1" />
                  <div>
                    <h4 className="font-medium text-sm mb-1">Licensing Compliance Engine</h4>
                    <p className="text-xs text-muted-foreground">
                      Every item includes: QR verification tag, license certificate, unique serial number, and
                      blockchain timestamp. All production partners are verified Revulter Merch Facilities.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Store Tab */}
            <TabsContent value="store" className="space-y-6">
              <Card className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold">My Creator Store</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Customize your storefront</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit Store
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm">Store URL</Label>
                    <div className="flex gap-2 mt-1">
                      <Input value="revulter.com/store/your-username" readOnly className="h-9 text-xs" />
                      <Button size="sm" variant="outline">
                        Copy
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Active Drops
                      </h4>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Sold Out Items
                      </h4>
                      <p className="text-2xl font-bold">4</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Fan Licensing */}
              <Card className="p-4 sm:p-6 bg-accent/5">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 mt-1" />
                  <div>
                    <h4 className="font-medium text-sm mb-1">One-Item Fan Licensing</h4>
                    <p className="text-xs text-muted-foreground">
                      Fans can license your IP to create a single custom item. The system automatically calculates
                      royalties, issues license certificates, and adds verification tags. You earn on every fan-made
                      item.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
