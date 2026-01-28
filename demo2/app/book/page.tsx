"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { departments, doctors, timeSlots } from "@/lib/mock-data"
import {
  Stethoscope,
  Baby,
  Bone,
  Heart,
  Sparkles,
  Eye,
  Star,
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Download,
  Share2,
  CalendarDays,
} from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  Stethoscope,
  Baby,
  Bone,
  Heart,
  Sparkles,
  Eye,
}

type BookingStep = "department" | "doctor" | "datetime" | "details" | "confirmation"

interface BookingData {
  department: string | null
  doctor: string | null
  date: Date | null
  time: string | null
  patientName: string
  patientPhone: string
  patientEmail: string
  symptoms: string
}

export default function BookAppointmentPage() {
  const [step, setStep] = useState<BookingStep>("department")
  const [bookingData, setBookingData] = useState<BookingData>({
    department: null,
    doctor: null,
    date: null,
    time: null,
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    symptoms: "",
  })
  const [tokenNumber, setTokenNumber] = useState<number | null>(null)

  const steps: BookingStep[] = ["department", "doctor", "datetime", "details", "confirmation"]
  const currentStepIndex = steps.indexOf(step)

  const selectedDepartment = departments.find((d) => d.id === bookingData.department)
  const selectedDoctor = doctors.find((d) => d.id === bookingData.doctor)
  const filteredDoctors = doctors.filter((d) => d.department === bookingData.department && d.available)

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length) {
      if (step === "details") {
        // Generate random token
        setTokenNumber(Math.floor(Math.random() * 50) + 1)
      }
      setStep(steps[nextIndex])
    }
  }

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setStep(steps[prevIndex])
    }
  }

  const canProceed = () => {
    switch (step) {
      case "department":
        return bookingData.department !== null
      case "doctor":
        return bookingData.doctor !== null
      case "datetime":
        return bookingData.date !== null && bookingData.time !== null
      case "details":
        return bookingData.patientName && bookingData.patientPhone
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          {/* Progress indicator */}
          {step !== "confirmation" && (
            <div className="max-w-3xl mx-auto mb-8">
              <div className="flex items-center justify-between">
                {["Department", "Doctor", "Date & Time", "Details"].map((label, index) => (
                  <div key={label} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                          index <= currentStepIndex
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {index < currentStepIndex ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
                      </div>
                      <span className="text-xs mt-2 text-muted-foreground hidden sm:block">{label}</span>
                    </div>
                    {index < 3 && (
                      <div
                        className={`h-0.5 w-12 sm:w-24 md:w-32 mx-2 transition-colors ${
                          index < currentStepIndex ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step content */}
          <div className="max-w-4xl mx-auto">
            {/* Department Selection */}
            {step === "department" && (
              <div>
                <div className="text-center mb-8">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">Select Department</h1>
                  <p className="text-muted-foreground">Choose the department for your appointment</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {departments.map((dept) => {
                    const Icon = iconMap[dept.icon] || Stethoscope
                    const isSelected = bookingData.department === dept.id

                    return (
                      <Card
                        key={dept.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          isSelected ? "ring-2 ring-primary border-primary" : "hover:border-primary/50"
                        }`}
                        onClick={() => setBookingData({ ...bookingData, department: dept.id, doctor: null })}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div
                              className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                                isSelected ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                              }`}
                            >
                              <Icon className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1">{dept.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{dept.description}</p>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>Avg. wait: {dept.waitTime}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Doctor Selection */}
            {step === "doctor" && (
              <div>
                <div className="text-center mb-8">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">Select Doctor</h1>
                  <p className="text-muted-foreground">Choose your preferred doctor from {selectedDepartment?.name}</p>
                </div>

                {filteredDoctors.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-muted-foreground">No doctors available in this department at the moment.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {filteredDoctors.map((doctor) => {
                      const isSelected = bookingData.doctor === doctor.id

                      return (
                        <Card
                          key={doctor.id}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            isSelected ? "ring-2 ring-primary border-primary" : "hover:border-primary/50"
                          }`}
                          onClick={() => setBookingData({ ...bookingData, doctor: doctor.id })}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <img
                                src={doctor.image || "/placeholder.svg"}
                                alt={doctor.name}
                                className="h-16 w-16 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <h3 className="font-semibold mb-1">{doctor.name}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{doctor.experience} experience</p>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-warning text-warning" />
                                    <span className="text-sm font-medium">{doctor.rating}</span>
                                  </div>
                                  <Badge variant="secondary" className="text-xs">
                                    Available
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Date & Time Selection */}
            {step === "datetime" && (
              <div>
                <div className="text-center mb-8">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">Select Date & Time</h1>
                  <p className="text-muted-foreground">Choose your preferred appointment slot</p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Select Date</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={bookingData.date || undefined}
                        onSelect={(date) => setBookingData({ ...bookingData, date: date || null })}
                        disabled={(date) => date < new Date() || date.getDay() === 0}
                        className="rounded-md border w-full"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Select Time Slot</CardTitle>
                      <CardDescription>Available slots for {bookingData.date?.toLocaleDateString()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {!bookingData.date ? (
                        <p className="text-muted-foreground text-center py-8">Please select a date first</p>
                      ) : (
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((slot) => {
                            const isSelected = bookingData.time === slot
                            // Randomly disable some slots
                            const isDisabled = Math.random() > 0.7

                            return (
                              <Button
                                key={slot}
                                variant={isSelected ? "default" : "outline"}
                                size="sm"
                                disabled={isDisabled}
                                className={`${isSelected ? "" : "bg-transparent"}`}
                                onClick={() => setBookingData({ ...bookingData, time: slot })}
                              >
                                {slot}
                              </Button>
                            )
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Patient Details */}
            {step === "details" && (
              <div className="max-w-xl mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">Patient Details</h1>
                  <p className="text-muted-foreground">Enter patient information for the appointment</p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Appointment Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                      <img
                        src={selectedDoctor?.image || "/placeholder.svg"}
                        alt={selectedDoctor?.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{selectedDoctor?.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedDepartment?.name}</p>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="text-sm font-medium">{bookingData.date?.toLocaleDateString()}</p>
                        <p className="text-sm text-muted-foreground">{bookingData.time}</p>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="patientName">Patient Name *</Label>
                        <Input
                          id="patientName"
                          placeholder="Enter patient's full name"
                          value={bookingData.patientName}
                          onChange={(e) => setBookingData({ ...bookingData, patientName: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="patientPhone">Phone Number *</Label>
                        <Input
                          id="patientPhone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={bookingData.patientPhone}
                          onChange={(e) => setBookingData({ ...bookingData, patientPhone: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="patientEmail">Email (Optional)</Label>
                        <Input
                          id="patientEmail"
                          type="email"
                          placeholder="patient@email.com"
                          value={bookingData.patientEmail}
                          onChange={(e) => setBookingData({ ...bookingData, patientEmail: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="symptoms">Symptoms / Reason for Visit (Optional)</Label>
                        <textarea
                          id="symptoms"
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          placeholder="Briefly describe your symptoms..."
                          value={bookingData.symptoms}
                          onChange={(e) => setBookingData({ ...bookingData, symptoms: e.target.value })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Confirmation */}
            {step === "confirmation" && (
              <div className="max-w-md mx-auto text-center">
                <div className="mb-8">
                  <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-10 w-10 text-success" />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">Appointment Confirmed!</h1>
                  <p className="text-muted-foreground">Your appointment has been successfully booked</p>
                </div>

                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <div className="text-6xl font-bold text-primary mb-2">#{tokenNumber}</div>
                    <p className="text-muted-foreground mb-6">Your Token Number</p>

                    <div className="space-y-4 text-left">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Patient</span>
                        <span className="font-medium">{bookingData.patientName}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Doctor</span>
                        <span className="font-medium">{selectedDoctor?.name}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Department</span>
                        <span className="font-medium">{selectedDepartment?.name}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Date</span>
                        <span className="font-medium">{bookingData.date?.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Time</span>
                        <span className="font-medium">{bookingData.time}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-3 mb-4">
                  <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>

                <Button asChild className="w-full gap-2">
                  <a href="/queue">
                    <CalendarDays className="h-4 w-4" />
                    Track Queue Status
                  </a>
                </Button>
              </div>
            )}

            {/* Navigation buttons */}
            {step !== "confirmation" && (
              <div className="flex justify-between mt-8 max-w-4xl mx-auto">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStepIndex === 0}
                  className="gap-2 bg-transparent"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!canProceed()} className="gap-2">
                  {step === "details" ? "Confirm Booking" : "Continue"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
