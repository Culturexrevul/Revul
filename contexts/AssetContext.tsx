"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface CoOwner {
  name: string
  percentage: number
}

export interface Asset {
  id: string
  title: string
  description: string
  category: string
  ownership: string
  coOwners?: CoOwner[] // New field for co-owners
  youtubeLink?: string
  youtubeData?: {
    title: string
    thumbnail: string
    viewCount: string
    likeCount: string
    videoId: string
  }
  image: string
  price: number
  available: string
  createdAt: Date
  isTrending?: boolean
  isFeatured?: boolean
}

interface AssetContextType {
  assets: Asset[]
  addAsset: (asset: Omit<Asset, "id" | "createdAt">) => string
  getAssets: () => Asset[]
  isLoading: boolean
  error: string | null
}

const AssetContext = createContext<AssetContextType | undefined>(undefined)

const defaultAssets: Asset[] = [
  {
    id: "1",
    title: "Ancestral Rhythms",
    description: "Traditional Nigerian bronze art piece",
    category: "art",
    ownership: "100",
    image: "/nigerian-traditional-art-bronze.png",
    price: 50,
    available: "25%",
    createdAt: new Date("2024-01-15"),
    isTrending: true,
  },
  {
    id: "2",
    title: "Lagos Nights",
    description: "Afrobeat music album",
    category: "music",
    ownership: "100",
    image: "/afrobeat-album-cover.png",
    price: 125,
    available: "40%",
    createdAt: new Date("2024-01-10"),
    isFeatured: true,
  },
  {
    id: "3",
    title: "Ubuntu Stories",
    description: "Nollywood short film",
    category: "film",
    ownership: "100",
    image: "/african-short-film-still.png",
    price: 200,
    available: "15%",
    createdAt: new Date("2024-01-12"),
    isTrending: true,
  },
  {
    id: "4",
    title: "Kente Fusion",
    description: "Modern African fashion design",
    category: "fashion",
    ownership: "100",
    image: "/african-fashion-modern.png",
    price: 75,
    available: "60%",
    createdAt: new Date("2024-01-08"),
    isFeatured: true,
  },
  {
    id: "5",
    title: "Adekunle Quest",
    description: "African fantasy game character",
    category: "game",
    ownership: "100",
    image: "/abstract-african-geometric-art.png",
    price: 150,
    available: "35%",
    createdAt: new Date("2024-01-14"),
    isTrending: false,
  },
  {
    id: "6",
    title: "Spirit Dance",
    description: "3D animation short film",
    category: "animation",
    ownership: "100",
    image: "/3d-animation-with-african-cultural-elements.jpg",
    price: 180,
    available: "50%",
    createdAt: new Date("2024-01-11"),
    isFeatured: false,
  },
  {
    id: "7",
    title: "Cyber Knights",
    description: "Sci-fi action game soundtrack",
    category: "game",
    ownership: "100",
    image: "/sci-fi-futuristic-game-interface-neon-cyberpunk.jpg",
    price: 160,
    available: "45%",
    createdAt: new Date("2024-01-13"),
    isTrending: true,
  },
  {
    id: "8",
    title: "Urban Legends",
    description: "Western indie game character design",
    category: "game",
    ownership: "100",
    image: "/western-video-game-character-design-urban-street.jpg",
    price: 140,
    available: "30%",
    createdAt: new Date("2024-01-09"),
    isFeatured: true,
  },
  {
    id: "9",
    title: "Pixel Evolution",
    description: "Retro gaming animation collection",
    category: "animation",
    ownership: "100",
    image: "/pixel-art-animation-retro-video-game-style.jpg",
    price: 95,
    available: "55%",
    createdAt: new Date("2024-01-07"),
    isTrending: false,
  },
  {
    id: "10",
    title: "Neon Dreams",
    description: "Synthwave animation series",
    category: "animation",
    ownership: "100",
    image: "/synthwave-animation-neon-retro-80s-style.jpg",
    price: 210,
    available: "20%",
    createdAt: new Date("2024-01-06"),
    isFeatured: true,
  },
  {
    id: "11",
    title: "Global Beats",
    description: "Electronic dance music album",
    category: "music",
    ownership: "100",
    image: "/electronic-music-album-cover-dark-professional.jpg",
    price: 110,
    available: "65%",
    createdAt: new Date("2024-01-05"),
    isTrending: true,
  },
  {
    id: "12",
    title: "Digital Canvas",
    description: "Modern digital art collection",
    category: "art",
    ownership: "100",
    image: "/modern-digital-art-contemporary-abstract.jpg",
    price: 130,
    available: "40%",
    createdAt: new Date("2024-01-04"),
    isFeatured: false,
  },
]

export function AssetProvider({ children }: { children: React.ReactNode }) {
  const [assets, setAssets] = useState<Asset[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const savedAssets = localStorage.getItem("revulter-assets")
      if (savedAssets) {
        const parsedAssets = JSON.parse(savedAssets).map((asset: any) => ({
          ...asset,
          createdAt: new Date(asset.createdAt),
        }))
        setAssets([...defaultAssets, ...parsedAssets])
      } else {
        setAssets(defaultAssets)
      }
    } catch (err) {
      console.error("Error loading assets:", err)
      setAssets(defaultAssets)
    }
  }, [])

  useEffect(() => {
    if (assets.length > defaultAssets.length) {
      const userAssets = assets.slice(defaultAssets.length)
      localStorage.setItem("revulter-assets", JSON.stringify(userAssets))
    }
  }, [assets])

  const addAsset = (assetData: Omit<Asset, "id" | "createdAt">): string => {
    setIsLoading(true)
    setError(null)

    try {
      const newAsset: Asset = {
        ...assetData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        isFeatured: true,
        image: getCategoryImage(assetData.category),
        price: Math.floor(Math.random() * 200) + 50,
        available: `${Math.floor(Math.random() * 80) + 10}%`,
      }

      setAssets((prev) => [newAsset, ...prev])
      setIsLoading(false)
      return newAsset.id
    } catch (err) {
      setError("Failed to save asset. Please try again.")
      setIsLoading(false)
      throw err
    }
  }

  const getAssets = () => {
    return assets.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  return (
    <AssetContext.Provider value={{ assets, addAsset, getAssets, isLoading, error }}>{children}</AssetContext.Provider>
  )
}

function getCategoryImage(category: string): string {
  const categoryImages: { [key: string]: string } = {
    music: "/afrobeat-album-cover.png",
    art: "/nigerian-traditional-art-bronze.png",
    film: "/african-short-film-still.png",
    fashion: "/african-fashion-modern.png",
    game: "/abstract-african-geometric-art.png",
    animation: "/3d-animation-with-african-cultural-elements.jpg",
    literature: "/african-literature-book-cover.jpg",
  }
  return categoryImages[category] || "/nigerian-traditional-art-bronze.png"
}

export function useAssets() {
  const context = useContext(AssetContext)
  if (context === undefined) {
    throw new Error("useAssets must be used within an AssetProvider")
  }
  return context
}
