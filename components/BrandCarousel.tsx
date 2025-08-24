"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CarouselSlide {
  id: number
  brandName: string
  hashtag: string
  type: "image" | "embed"
  content: string
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    brandName: "Indomitable",
    hashtag: "#IndomitableForever",
    type: "image",
    content: "/nigerian-traditional-art-bronze.png", // Using existing image instead of broken URL
  },
  {
    id: 2,
    brandName: "Afrobeat Legends",
    hashtag: "#AfrobeatLegends",
    type: "image",
    content: "/nigerian-afrobeat-musician.png",
  },
  {
    id: 3,
    brandName: "Nollywood Stars",
    hashtag: "#NollywoodStars",
    type: "image",
    content: "/nollywood-film-scene.png",
  },
  {
    id: 4,
    brandName: "Ankara Fashion",
    hashtag: "#AnkaraFashion",
    type: "image",
    content: "/nigerian-ankara-fashion.png",
  },
  {
    id: 5,
    brandName: "Cultural Heritage",
    hashtag: "#CulturalHeritage",
    type: "image",
    content: "/nigerian-highlife-instruments.png",
  },
]

export default function BrandCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Featured Brand Collaborations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover how leading brands are leveraging African creativity through our platform
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-xl bg-card border shadow-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide) => (
                <div key={slide.id} className="w-full flex-shrink-0">
                  <div className="aspect-video relative bg-gradient-to-br from-accent/20 to-terracotta/20">
                    {slide.type === "image" ? (
                      <img
                        src={slide.content || "/placeholder.svg"}
                        alt={slide.brandName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <h3 className="text-xl font-semibold text-foreground mb-2">{slide.brandName}</h3>
                          <p className="text-muted-foreground">{slide.hashtag}</p>
                        </div>
                      </div>
                    )}

                    {/* Overlay Content */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">
                      <div className="text-white">
                        <h3 className="text-xl md:text-2xl font-bold mb-2">{slide.brandName}</h3>
                        <p className="text-sm md:text-base mb-4 opacity-90">{slide.hashtag}</p>
                        <Link href="/licensing">
                          <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                            Create Derivative Work
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide ? "bg-accent scale-110" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { BrandCarousel }
