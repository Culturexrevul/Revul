"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/ThemeContext"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="h-9 w-9 px-0 border-2 border-accent/30 hover:border-accent hover:bg-accent/10 dark:hover:bg-accent/20 transition-all duration-300 hover:scale-105 active:scale-95 rounded-full relative overflow-hidden bg-transparent"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative flex items-center justify-center">
        {theme === "light" ? (
          <Moon className="h-4 w-4 text-accent transition-all duration-500 rotate-0 scale-100" />
        ) : (
          <Sun className="h-4 w-4 text-accent transition-all duration-500 rotate-180 scale-100" />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-accent/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full" />
    </Button>
  )
}
