"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Shield, Globe, Briefcase, Scale, Gamepad2, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".scroll-animate")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const playClickSound = () => {
    try {
      const audio = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mixkit-on-or-off-light-switch-tap-2585-9r0FDWj4cHZwRtJhuTU9q6VKyUgoYh.wav")
      audio.volume = 1.0
      audio.play().catch(() => {})
    } catch (error) {
      console.error("Failed to play click sound:", error)
    }
  }

  const quickAccessItems = [
    { href: "/register", label: "Register IP", icon: Shield },
    { href: "/ip-reputation", label: "IP Index", icon: BarChart3 },
    { href: "/licensing", label: "Licensing Hub", icon: Briefcase },
    { href: "/hire-creators", label: "Creator Hub", icon: Globe },
    { href: "/legal", label: "Legal Assist", icon: Scale },
    { href: "/ipquest", label: "IP Quest", icon: Gamepad2 },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1">
        <section ref={heroRef} className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="max-w-xl mx-auto mb-16">
              <div className="relative p-6 sm:p-8 rounded-[2.5rem] bg-gradient-to-br from-white to-white border-2 border-white/50 shadow-[inset_0_2px_10px_rgba(255,255,255,0.8),0_8px_32px_rgba(0,0,0,0.08)] text-gray-800 dark:text-gray-800">
                <div className="grid grid-cols-3 gap-4 sm:gap-6">
                  {quickAccessItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex flex-col items-center justify-center"
                      onClick={playClickSound}
                    >
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 rounded-full bg-gradient-to-br from-white to-white shadow-[inset_-2px_-2px_8px_rgba(255,255,255,0.9),inset_2px_2px_8px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:shadow-[inset_-3px_-3px_10px_rgba(255,255,255,1),inset_3px_3px_10px_rgba(0,0,0,0.15),0_6px_16px_rgba(0,0,0,0.12)]">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <item.icon className="w-7 h-7 sm:w-8 sm:h-8 text-gray-600 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-600 text-center">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-6 ml-0">
                All you need to manage your IP, choose a button above.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
