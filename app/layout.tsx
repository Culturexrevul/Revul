import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { AssetProvider } from "@/contexts/AssetContext"
import { ThemeProvider } from "@/contexts/ThemeContext"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Revulter Cultural Commerce",
  description: "Own. Protect. Trade African Creativity.",
  generator: "v0.app",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <body className="font-sans bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          <AssetProvider>{children}</AssetProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
