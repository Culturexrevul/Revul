"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Send, User, Bot, Calendar, MapPin, DollarSign, Languages, FileText, Clock } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface Lawyer {
  id: string
  name: string
  specialties: string[]
  rate: number
  location: string
  language: string[]
  bio: string
  rating: number
  experience: number
}

interface LegalAssistProps {
  mode?: "ai" | "book"
  compact?: boolean
}

export default function LegalAssist({ mode = "ai", compact = false }: LegalAssistProps) {
  const [activeTab, setActiveTab] = useState(mode)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [lawyers, setLawyers] = useState<Lawyer[]>([])
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null)
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const quickPrompts = [
    "What's the difference between copyright and trademark?",
    "How do I register my song for copyright protection?",
    "What licensing do I need for using music in film?",
    "How should I split royalties with collaborators?",
  ]

  const practiceAreas = ["All", "Copyright", "Trademark", "Contracts", "Licensing", "Entertainment Law"]
  const budgetRanges = ["All", "₦10,000-25,000", "₦25,000-50,000", "₦50,000-100,000", "₦100,000+"]

  // Mock lawyers data
  const mockLawyers: Lawyer[] = [
    {
      id: "1",
      name: "Adunni Okafor",
      specialties: ["Copyright", "Entertainment Law"],
      rate: 35000,
      location: "Lagos",
      language: ["English", "Yoruba"],
      bio: "Specializing in music and film IP protection with 8+ years experience.",
      rating: 4.9,
      experience: 8,
    },
    {
      id: "2",
      name: "Chukwuma Nwankwo",
      specialties: ["Trademark", "Contracts"],
      rate: 28000,
      location: "Abuja",
      language: ["English", "Igbo"],
      bio: "Expert in brand protection and commercial agreements for creative businesses.",
      rating: 4.8,
      experience: 6,
    },
    {
      id: "3",
      name: "Fatima Al-Hassan",
      specialties: ["Licensing", "Copyright"],
      rate: 42000,
      location: "Kano",
      language: ["English", "Hausa"],
      bio: "International licensing specialist with focus on cross-border IP deals.",
      rating: 4.9,
      experience: 10,
    },
    {
      id: "4",
      name: "Emeka Okonkwo",
      specialties: ["Entertainment Law", "Contracts"],
      rate: 38000,
      location: "Port Harcourt",
      language: ["English", "Igbo"],
      bio: "Nollywood legal advisor with extensive experience in film and TV contracts.",
      rating: 4.7,
      experience: 7,
    },
    {
      id: "5",
      name: "Aisha Bello",
      specialties: ["Copyright", "Trademark"],
      rate: 31000,
      location: "Ibadan",
      language: ["English", "Yoruba"],
      bio: "Creative industry lawyer helping artists protect and monetize their work.",
      rating: 4.8,
      experience: 5,
    },
    {
      id: "6",
      name: "Tunde Adebayo",
      specialties: ["Licensing", "Contracts"],
      rate: 45000,
      location: "Lagos",
      language: ["English", "Yoruba"],
      bio: "Senior partner specializing in high-value IP transactions and licensing deals.",
      rating: 5.0,
      experience: 12,
    },
  ]

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputMessage }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      // TODO: Show toast error message
      console.error("Failed to send message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadLawyers = async () => {
    try {
      const response = await fetch("/api/lawyers")
      const data = await response.json()
      setLawyers(data.lawyers || mockLawyers)
    } catch (error) {
      setLawyers(mockLawyers)
    }
  }

  const bookConsultation = async (formData: any) => {
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lawyerId: selectedLawyer?.id,
          ...formData,
        }),
      })

      const data = await response.json()

      if (data.ok) {
        setBookingSuccess(data.reference)
        setIsSheetOpen(false)
        // TODO: Show success toast
      }
    } catch (error) {
      // TODO: Show error toast
      console.error("Booking failed:", error)
    }
  }

  // Load lawyers when switching to book tab
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value === "book" && lawyers.length === 0) {
      loadLawyers()
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  if (compact) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Legal Assist</CardTitle>
            <Badge variant="secondary" className="text-xs">
              Beta
            </Badge>
          </div>
          <CardDescription>Quick IP guidance or book a lawyer consultation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setActiveTab("ai")}>
              Ask AI
            </Button>
            <Button variant="outline" size="sm" onClick={() => setActiveTab("book")}>
              Book Lawyer
            </Button>
          </div>
          {/* Compact version content would go here */}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-4xl font-bold text-foreground">Hi, AI Lawyer</h1>
          <Badge variant="secondary">Beta</Badge>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Ask quick IP questions or book a session with a licensed professional.
        </p>

        {/* CTA Chips */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {quickPrompts.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-sm bg-transparent"
              onClick={() => {
                setInputMessage(prompt)
                setActiveTab("ai")
              }}
            >
              {prompt.split("?")[0]}?
            </Button>
          ))}
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ai">Ask AI</TabsTrigger>
          <TabsTrigger value="book">Consult a Lawyer</TabsTrigger>
        </TabsList>

        {/* Ask AI Tab */}
        <TabsContent value="ai" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              {/* Chat Messages */}
              <div className="space-y-4 mb-6 min-h-[300px] max-h-[500px] overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                    <div className="text-center space-y-2">
                      <Bot className="h-12 w-12 mx-auto opacity-50" />
                      <p>Ask a quick question about IP, licensing, or contracts.</p>
                    </div>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <div className="flex-shrink-0">
                          {message.role === "user" ? (
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-primary-foreground" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                              <Bot className="h-4 w-4 text-accent-foreground" />
                            </div>
                          )}
                        </div>
                        <div
                          className={`rounded-lg p-3 ${
                            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-accent-foreground" />
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Prompts */}
              <div className="flex flex-wrap gap-2 mb-4">
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => setInputMessage(prompt)}
                  >
                    {prompt.split(" ").slice(0, 3).join(" ")}...
                  </Button>
                ))}
              </div>

              {/* Input Area */}
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about copyright, licensing, contracts..."
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    disabled={isLoading}
                  />
                  <Button onClick={sendMessage} disabled={isLoading || !inputMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">
                    This tool provides general information only and is not legal advice.
                  </p>

                  <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm">
                        Escalate to a Lawyer
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:max-w-md">
                      <SheetHeader>
                        <SheetTitle>Book a Lawyer</SheetTitle>
                        <SheetDescription>Schedule a consultation with a licensed professional</SheetDescription>
                      </SheetHeader>
                      <BookingForm onSubmit={bookConsultation} lawyers={lawyers} />
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Consult a Lawyer Tab */}
        <TabsContent value="book" className="space-y-6">
          {bookingSuccess ? (
            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Booking Confirmed!</h3>
                <p className="text-muted-foreground">Your consultation request has been submitted.</p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-medium">Reference Code</p>
                  <p className="text-lg font-mono">{bookingSuccess}</p>
                </div>
                <Button onClick={() => setBookingSuccess(null)}>Return to Legal Home</Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Filter Toolbar */}
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium">Practice Area</label>
                      <select className="w-full mt-1 p-2 border rounded-md">
                        {practiceAreas.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Budget</label>
                      <select className="w-full mt-1 p-2 border rounded-md">
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Location</label>
                      <Input placeholder="Any location" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Language</label>
                      <Input placeholder="Any language" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lawyers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lawyers.map((lawyer) => (
                  <Card key={lawyer.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                          {lawyer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{lawyer.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {lawyer.location}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {lawyer.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {formatCurrency(lawyer.rate)}/hour
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {lawyer.experience}+ years
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">{lawyer.bio}</p>

                        <div className="flex items-center gap-2 text-sm">
                          <Languages className="h-3 w-3" />
                          {lawyer.language.join(", ")}
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full" onClick={() => setSelectedLawyer(lawyer)}>
                              View Availability
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Book with {lawyer.name}</DialogTitle>
                              <DialogDescription>Select a time slot for your consultation</DialogDescription>
                            </DialogHeader>
                            <AvailabilityCalendar lawyer={lawyer} onBook={bookConsultation} />
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* How it Works Section */}
      <Card>
        <CardHeader>
          <CardTitle>How it Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mx-auto">
                1
              </div>
              <h3 className="font-semibold">Ask</h3>
              <p className="text-sm text-muted-foreground">
                Start with our AI for quick guidance or browse our lawyer directory
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mx-auto">
                2
              </div>
              <h3 className="font-semibold">Review</h3>
              <p className="text-sm text-muted-foreground">
                Get instant AI responses or review lawyer profiles and availability
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mx-auto">
                3
              </div>
              <h3 className="font-semibold">Book</h3>
              <p className="text-sm text-muted-foreground">
                Schedule a consultation with your chosen legal professional
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* For Lawyers Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">For Lawyers</h3>
              <p className="text-muted-foreground">Join our network of vetted IP and entertainment law professionals</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Apply to Join</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Apply to Join Our Network</DialogTitle>
                  <DialogDescription>We're looking for qualified IP and entertainment lawyers</DialogDescription>
                </DialogHeader>
                <LawyerApplicationForm />
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Legal Notice */}
      <div className="text-center text-xs text-muted-foreground">
        <p>
          By continuing, you agree to our{" "}
          <a href="/terms" className="underline hover:text-foreground">
            Terms
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}

// Booking Form Component
function BookingForm({ onSubmit, lawyers }: { onSubmit: (data: any) => void; lawyers: Lawyer[] }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    format: "video",
    consent: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div>
        <label className="text-sm font-medium">Full Name</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium">Email</label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium">Phone</label>
        <Input
          value={formData.phone}
          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium">Matter Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Briefly describe your legal matter..."
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium">Preferred Format</label>
        <select
          className="w-full mt-1 p-2 border rounded-md"
          value={formData.format}
          onChange={(e) => setFormData((prev) => ({ ...prev, format: e.target.value }))}
        >
          <option value="video">Video Call</option>
          <option value="phone">Phone Call</option>
          <option value="in-person">In Person</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium">Attach Files (Optional)</label>
        <div className="mt-1 p-4 border-2 border-dashed rounded-md text-center text-muted-foreground">
          <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">TODO: File upload functionality</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="consent"
          checked={formData.consent}
          onChange={(e) => setFormData((prev) => ({ ...prev, consent: e.target.checked }))}
          required
        />
        <label htmlFor="consent" className="text-sm">
          I consent to being contacted about this consultation
        </label>
      </div>
      <Button type="submit" className="w-full" disabled={!formData.consent}>
        Submit Request
      </Button>
    </form>
  )
}

// Availability Calendar Component
function AvailabilityCalendar({ lawyer, onBook }: { lawyer: Lawyer; onBook: (data: any) => void }) {
  // Generate sample time slots for the next few days
  const generateTimeSlots = () => {
    const slots = []
    const today = new Date()

    for (let i = 1; i <= 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      // Generate 2-3 random slots per day
      const times = ["09:00", "11:00", "14:00", "16:00"]
      const availableTimes = times.slice(0, Math.floor(Math.random() * 3) + 1)

      availableTimes.forEach((time) => {
        slots.push({
          date: date.toDateString(),
          time,
          datetime: `${date.toDateString()} ${time}`,
        })
      })
    }

    return slots
  }

  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const timeSlots = generateTimeSlots()

  const handleBookSlot = () => {
    if (selectedSlot) {
      onBook({
        lawyerId: lawyer.id,
        slot: selectedSlot,
        name: "Sample User", // TODO: Get from form
        email: "user@example.com", // TODO: Get from form
        phone: "+234 123 456 7890", // TODO: Get from form
        description: "Sample consultation request", // TODO: Get from form
        format: "video", // TODO: Get from form
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center p-4 bg-muted rounded-lg">
        <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm text-muted-foreground">TODO: Integrate with calendar system</p>
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {timeSlots.map((slot, index) => (
          <button
            key={index}
            className={`w-full p-3 text-left rounded-lg border transition-colors ${
              selectedSlot === slot.datetime ? "border-primary bg-primary/10" : "border-border hover:bg-muted"
            }`}
            onClick={() => setSelectedSlot(slot.datetime)}
          >
            <div className="font-medium">{slot.date}</div>
            <div className="text-sm text-muted-foreground">{slot.time}</div>
          </button>
        ))}
      </div>

      <Button className="w-full" disabled={!selectedSlot} onClick={handleBookSlot}>
        Book Selected Time
      </Button>
    </div>
  )
}

// Lawyer Application Form Component
function LawyerApplicationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    firm: "",
    experience: "",
    specialties: "",
    barNumber: "",
    bio: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Submit application
    console.log("Lawyer application:", formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Full Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Phone</label>
          <Input
            value={formData.phone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Law Firm</label>
          <Input
            value={formData.firm}
            onChange={(e) => setFormData((prev) => ({ ...prev, firm: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Years of Experience</label>
          <Input
            type="number"
            value={formData.experience}
            onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Bar Number</label>
          <Input
            value={formData.barNumber}
            onChange={(e) => setFormData((prev) => ({ ...prev, barNumber: e.target.value }))}
            required
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Practice Areas</label>
        <Input
          value={formData.specialties}
          onChange={(e) => setFormData((prev) => ({ ...prev, specialties: e.target.value }))}
          placeholder="e.g., Copyright, Trademark, Entertainment Law"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium">Professional Bio</label>
        <Textarea
          value={formData.bio}
          onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
          placeholder="Brief description of your experience and expertise..."
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Submit Application
      </Button>
    </form>
  )
}
