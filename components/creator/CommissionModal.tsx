"use client"

import { useState } from "react"
import { X, Calendar, DollarSign, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CommissionModalProps {
  creator: any
  service?: any
  isOpen: boolean
  onClose: () => void
}

export function CommissionModal({ creator, service, isOpen, onClose }: CommissionModalProps) {
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectType: service?.title || "",
    budget: service?.price || "",
    timeline: "",
    description: "",
    requirements: "",
    contactEmail: "",
    companyName: "",
    urgency: "normal",
  })

  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Mock API call
    try {
      const response = await fetch("/api/commission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorId: creator.id,
          serviceId: service?.id,
          ...formData,
        }),
      })

      if (response.ok) {
        setStep(3) // Success step
      }
    } catch (error) {
      console.error("Commission request failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const projectTypes = [
    "Custom Pottery Commission",
    "Traditional Clay Painting",
    "Pottery Workshop",
    "Content Creation",
    "Brand Partnership",
    "Product Photography",
    "Cultural Consultation",
    "Custom Artwork",
    "Other",
  ]

  const urgencyLevels = [
    { value: "low", label: "Standard (2-4 weeks)", color: "bg-green-100 text-green-800" },
    { value: "normal", label: "Priority (1-2 weeks)", color: "bg-yellow-100 text-yellow-800" },
    { value: "high", label: "Rush (3-7 days)", color: "bg-red-100 text-red-800" },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
              <AvatarFallback>
                {creator.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">Commission {creator.name}</h2>
              <p className="text-sm text-gray-600">{creator.specialty}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNum}
                </div>
                {stepNum < 3 && <div className={`w-12 h-0.5 mx-2 ${step > stepNum ? "bg-primary" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>Project Details</span>
            <span>Review & Submit</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Step 1: Project Details */}
        {step === 1 && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="projectTitle">Project Title *</Label>
                <Input
                  id="projectTitle"
                  placeholder="e.g., Custom ceramic dinnerware set"
                  value={formData.projectTitle}
                  onChange={(e) => handleInputChange("projectTitle", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="projectType">Project Type *</Label>
                <Select value={formData.projectType} onValueChange={(value) => handleInputChange("projectType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget">Budget (USD) *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="budget"
                    type="number"
                    placeholder="500"
                    className="pl-10"
                    value={formData.budget}
                    onChange={(e) => handleInputChange("budget", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="timeline">Preferred Timeline</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="timeline"
                    placeholder="e.g., 3 weeks"
                    className="pl-10"
                    value={formData.timeline}
                    onChange={(e) => handleInputChange("timeline", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="urgency">Project Urgency</Label>
              <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {urgencyLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      <div className="flex items-center space-x-2">
                        <Badge className={level.color}>{level.label}</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Project Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your project in detail. What do you want to create? What's the purpose? Any specific style preferences?"
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="requirements">Specific Requirements</Label>
              <Textarea
                id="requirements"
                placeholder="Any specific materials, dimensions, colors, cultural elements, or other requirements?"
                rows={3}
                value={formData.requirements}
                onChange={(e) => handleInputChange("requirements", e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <Button
                onClick={() => setStep(2)}
                disabled={!formData.projectTitle || !formData.projectType || !formData.description}
              >
                Continue to Review
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Review & Contact Info */}
        {step === 2 && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactEmail">Contact Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="companyName">Company/Organization</Label>
                <Input
                  id="companyName"
                  placeholder="Your company name (optional)"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                />
              </div>
            </div>

            {/* Project Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Project:</span>
                  <span className="font-medium">{formData.projectTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{formData.projectType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Budget:</span>
                  <span className="font-medium">${formData.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Timeline:</span>
                  <span className="font-medium">{formData.timeline || "Flexible"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Urgency:</span>
                  <Badge className={urgencyLevels.find((l) => l.value === formData.urgency)?.color}>
                    {urgencyLevels.find((l) => l.value === formData.urgency)?.label}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* File Upload */}
            <div>
              <Label>Reference Files (Optional)</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload reference images, sketches, or documents</p>
                <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                  Choose Files
                </Button>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={!formData.contactEmail || isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Commission Request"}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="p-6 text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Commission Request Sent!</h3>
              <p className="text-gray-600">
                Your commission request has been sent to {creator.name}. They typically respond within{" "}
                {creator.responseTime}.
              </p>
            </div>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">What happens next?</h4>
                <ul className="text-sm text-gray-600 space-y-1 text-left">
                  <li>• {creator.name} will review your project details</li>
                  <li>• You'll receive a response within {creator.responseTime}</li>
                  <li>• If accepted, you'll discuss timeline and payment</li>
                  <li>• Work begins after agreement and deposit</li>
                </ul>
              </CardContent>
            </Card>

            <div className="flex space-x-3">
              <Button onClick={onClose}>Close</Button>
              <Button variant="outline">View My Requests</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
