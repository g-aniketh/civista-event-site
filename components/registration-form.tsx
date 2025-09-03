"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2, QrCode, Calendar, Users, IndianRupee } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { PaymentQR } from "./payment-qr"
import { config } from "@/lib/config"

interface FormData {
  name: string
  roll: string
  dept: string
  email: string
  event: string
  college: string
}

interface FormErrors {
  [key: string]: string
}

const events = config.events
const schedule = [
  { time: "9:10 AM - 12:40 PM", event: "Match the Logo", venue: "Main Hall" },
  { time: "10:30 AM - 12:00 PM", event: "Science Sprint Puzzle", venue: "Lab 1" },
  { time: "1:40 PM - 3:00 PM", event: "Geo Capital Challenge", venue: "Auditorium" },
  { time: "Morning & Afternoon Sessions", event: "Tower Trouble", venue: "Innovation Lab" }
]

export function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    roll: "",
    dept: "",
    email: "",
    event: "",
    college: ""
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long"
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = "Name can only contain letters and spaces"
    }

    // Roll number validation
    if (!formData.roll.trim()) {
      newErrors.roll = "Roll number is required"
    } else if (!/^\d{1,10}$/.test(formData.roll.trim())) {
      newErrors.roll = "Roll number must contain only numbers (1-10 digits)"
    }

    // Department validation
    if (!formData.dept.trim()) {
      newErrors.dept = "Department is required"
    } else if (!/^[A-Z]{2,4}$/.test(formData.dept.trim().toUpperCase())) {
      newErrors.dept = "Department should be 2-4 letters (e.g., CSE, ECE, ME)"
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address"
    } else if (!formData.email.trim().endsWith('.edu') && !formData.email.trim().includes('@gmail.com')) {
      newErrors.email = "Please use your college email or Gmail"
    }

    // Event validation
    if (!formData.event) {
      newErrors.event = "Please select an event"
    }

    // College validation
    if (!formData.college.trim()) {
      newErrors.college = "College name is required"
    } else if (formData.college.trim().length < 3) {
      newErrors.college = "College name must be at least 3 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError("")

    try {
      // Google Sheets Web App URL from config
      const WEB_APP_URL = config.googleSheetsUrl
      
      const params = new URLSearchParams({
        name: formData.name.trim(),
        roll: formData.roll.trim(),
        dept: formData.dept.trim().toUpperCase(),
        email: formData.email.trim(),
        event: formData.event,
        college: formData.college.trim()
      })

      const response = await fetch(`${WEB_APP_URL}?${params.toString()}`)
      
      if (response.ok) {
        setIsSubmitted(true)
        // Reset form
        setFormData({
          name: "",
          roll: "",
          dept: "",
          email: "",
          event: "",
          college: ""
        })
      } else {
        throw new Error("Failed to submit registration")
      }
    } catch (error) {
      console.error("Registration error:", error)
      setSubmitError("Something went wrong. Please try again or contact support.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedEvent = events.find(e => e.id === formData.event)

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-green-900 mb-2">Registration Successful!</h3>
          <p className="text-green-700 mb-4">
            Thank you for registering for {selectedEvent?.name}. We've sent a confirmation to your email.
          </p>
          <p className="text-sm text-green-600">
            Please complete your payment of ₹{selectedEvent?.price} to confirm your spot.
          </p>
        </div>
        <Button
          onClick={() => setIsSubmitted(false)}
          className="bg-green-600 hover:bg-green-700"
        >
          Register Another Person
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Event Information */}
      <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
            <Calendar className="w-5 h-5" />
            Event Date: {config.eventDate}
          </CardTitle>
          <CardDescription className="text-blue-700 dark:text-blue-300">
            Mark your calendar and prepare for an exciting day of competitions!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {schedule.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white/50 dark:bg-blue-950/30 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-medium text-blue-900 dark:text-blue-100">{item.event}</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">{item.time}</div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">{item.venue}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Registration Form and Payment Side by Side */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Registration Form */}
        <Card className="border-0 bg-gradient-to-br from-white to-gray-50 shadow-xl dark:from-gray-800 dark:to-gray-900">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold text-foreground">Event Registration Form</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Fill in your details to register for the Civista Club events. All fields are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    className={`h-12 ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"}`}
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <Alert variant="destructive" className="py-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription className="text-sm">{errors.name}</AlertDescription>
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roll" className="text-sm font-medium">
                    Roll Number *
                  </Label>
                  <Input
                    id="roll"
                    value={formData.roll}
                    onChange={(e) => handleInputChange("roll", e.target.value)}
                    placeholder="Enter your roll number"
                    className={`h-12 ${errors.roll ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"}`}
                  />
                  <AnimatePresence>
                    {errors.roll && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <Alert variant="destructive" className="py-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription className="text-sm">{errors.roll}</AlertDescription>
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dept" className="text-sm font-medium">
                    Department *
                  </Label>
                  <Input
                    id="dept"
                    value={formData.dept}
                    onChange={(e) => handleInputChange("dept", e.target.value)}
                    placeholder="CSE, ECE, ME, etc."
                    className={`h-12 ${errors.dept ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"}`}
                  />
                  <AnimatePresence>
                    {errors.dept && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <Alert variant="destructive" className="py-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription className="text-sm">{errors.dept}</AlertDescription>
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@college.edu"
                    className={`h-12 ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"}`}
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <Alert variant="destructive" className="py-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription className="text-sm">{errors.email}</AlertDescription>
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Event Selection */}
              <div className="space-y-2">
                <Label htmlFor="event" className="text-sm font-medium">
                  Select Event *
                </Label>
                <Select value={formData.event} onValueChange={(value) => handleInputChange("event", value)}>
                  <SelectTrigger className={`h-12 ${errors.event ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"}`}>
                    <SelectValue placeholder="Choose an event to participate in" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{event.name}</span>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <IndianRupee className="w-3 h-3" />
                            {event.price}
                            <Users className="w-3 h-3" />
                            {event.teamSize}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <AnimatePresence>
                  {errors.event && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Alert variant="destructive" className="py-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-sm">{errors.event}</AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* College Name */}
              <div className="space-y-2">
                <Label htmlFor="college" className="text-sm font-medium">
                  College Name *
                </Label>
                <Input
                  id="college"
                  value={formData.college}
                  onChange={(e) => handleInputChange("college", e.target.value)}
                  placeholder="Enter your college name"
                  className={`h-12 ${errors.college ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"}`}
                />
                <AnimatePresence>
                  {errors.college && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Alert variant="destructive" className="py-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-sm">{errors.college}</AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Selected Event Details */}
              {selectedEvent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-900 dark:text-blue-100">Event Details</span>
                  </div>
                  <div className="grid gap-2 text-sm text-blue-800 dark:text-blue-200">
                    <div><strong>Event:</strong> {selectedEvent.name}</div>
                    <div><strong>Team Size:</strong> {selectedEvent.teamSize} {selectedEvent.teamSize === 1 ? 'participant' : 'participants'}</div>
                    <div><strong>Registration Fee:</strong> ₹{selectedEvent.price}</div>
                    <div><strong>Description:</strong> {selectedEvent.description}</div>
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Registration"
                )}
              </Button>

              {/* Submit Error */}
              <AnimatePresence>
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{submitError}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </CardContent>
        </Card>

        {/* Payment Section */}
        <div className="space-y-6">
          <PaymentQR />
          
          {/* Additional Information */}
          <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-green-900 dark:text-green-100">
                What Happens Next?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm text-green-800 dark:text-green-200">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Submit your registration form</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Complete payment via QR code</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Receive confirmation email</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Join us on September 15th!</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
