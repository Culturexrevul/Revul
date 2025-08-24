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
    image: "/nigerian-afrobeat-musician.png",
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
    image: "/nollywood-film-scene.png",
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
    image: "/nigerian-ankara-fashion.png",
    price: 75,
    available: "60%",
    createdAt: new Date("2024-01-08"),
    isFeatured: true,
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
  const categoryImages = {
    music: "/nigerian-afrobeat-musician.png",
    art: "/nigerian-traditional-art-bronze.png",
    film: "/nollywood-film-scene.png",
    fashion: "/nigerian-ankara-fashion.png",
    literature: "/nigerian-literature-book.png",
  }
  return categoryImages[category as keyof typeof categoryImages] || "/nigerian-traditional-art-bronze.png"
}

export function useAssets() {
  const context = useContext(AssetContext)
  if (context === undefined) {
    throw new Error("useAssets must be used within an AssetProvider")
  }
  return context
}
