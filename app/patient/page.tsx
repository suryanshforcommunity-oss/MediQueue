"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { mockPatientHistory } from "@/lib/mock-data"
import {
  Activity,
  Calendar,
  Clock,
  FileText,
  Download,
  ChevronDown,
  User,
  LogOut,
  Settings,
  Bell,
  Search,
  Filter,
  Stethoscope,
  Pill,
  CalendarCheck,
  Moon,
  Sun,
  Plus,
} from "lucide-react"

const extendedHistory = [
  ...mockPatientHistory,
  {
    id: "v4",
    date: "2025-10-05",
    doctor: "Dr. Rajesh Kumar",
    department: "General Medicine",
    diagnosis: "Routine annual health checkup. Blood pressure normal. Recommended blood tests.",
    prescription: ["Continue multivitamins", "Annual blood work recommended"],
    followUp: "2026-10-05",
  },
  {
    id: "v5",
    date: "2025-08-15",
    doctor: "Dr. Suresh Reddy",
    department: "Dermatology",
    diagnosis: "Minor skin allergy due to seasonal changes. Antihistamines prescribed.",
    prescription: ["Cetirizine 10mg - Once daily for 7 days", "Calamine lotion - Apply as needed"],
    followUp: null,
  },
]

function PatientDashboardContent() {
  const [isDark, setIsDark] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterDoctor, setFilterDoctor] = useState<string>("all")
  const [expandedVisits, setExpandedVisits] = useState<string[]>([extendedHistory[0].id])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const toggleVisit = (id: string) => {
    setExpandedVisits((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]))
  }

  const uniqueDoctors = [...new Set(extendedHistory.map((h) => h.doctor))]

  const filteredHistory = extendedHistory.filter((visit) => {
    const matchesSearch =
      visit.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.department.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDoctor = filterDoctor === "all" || visit.doctor === filterDoctor
    return matchesSearch && matchesDoctor
  })

  const upcomingAppointment = {
    date: "January 17, 2026",
    time: "10:30 AM",
    doctor: "Dr. Priya Sharma",
    department: "General Medicine",
    token: 12,
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">MediQueue</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/patient" className="text-sm font-medium text-foreground">
              Dashboard
            </Link>
            <Link href="/book" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Book Appointment
            </Link>
            <Link href="/queue" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Queue Status
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground flex items-center justify-center">
                1
              </span>
              <span className="sr-only">Notifications</span>
            </Button>

            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/indian-man-portrait.png" />
                    <AvatarFallback>RG</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">Ramesh Gupta</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome back, Ramesh!</h1>
          <p className="text-muted-foreground">Here's an overview of your health journey</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CalendarCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{extendedHistory.length}</p>
                  <p className="text-sm text-muted-foreground">Total Visits</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Stethoscope className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{uniqueDoctors.length}</p>
                  <p className="text-sm text-muted-foreground">Doctors Consulted</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm text-muted-foreground">Upcoming Appointment</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">Medical History</CardTitle>
                    <CardDescription>Your past visits and prescriptions</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative flex-1 md:w-48">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search visits..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select value={filterDoctor} onValueChange={setFilterDoctor}>
                      <SelectTrigger className="w-40">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Doctors</SelectItem>
                        {uniqueDoctors.map((doctor) => (
                          <SelectItem key={doctor} value={doctor}>
                            {doctor}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

                  <div className="space-y-4">
                    {filteredHistory.map((visit, index) => (
                      <Collapsible
                        key={visit.id}
                        open={expandedVisits.includes(visit.id)}
                        onOpenChange={() => toggleVisit(visit.id)}
                      >
                        <div className="relative pl-10">
                          <div
                            className={`absolute left-2 top-4 h-5 w-5 rounded-full border-2 border-background ${
                              index === 0 ? "bg-primary" : "bg-muted-foreground/30"
                            }`}
                          />

                          <Card className="transition-shadow hover:shadow-md">
                            <CollapsibleTrigger asChild>
                              <CardHeader className="cursor-pointer">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <Badge variant="outline">{visit.department}</Badge>
                                      {index === 0 && (
                                        <Badge className="bg-primary/10 text-primary hover:bg-primary/10">Latest</Badge>
                                      )}
                                    </div>
                                    <CardTitle className="text-base">{visit.doctor}</CardTitle>
                                    <CardDescription className="flex items-center gap-2 mt-1">
                                      <Calendar className="h-3 w-3" />
                                      {new Date(visit.date).toLocaleDateString("en-IN", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })}
                                    </CardDescription>
                                  </div>
                                  <ChevronDown
                                    className={`h-5 w-5 text-muted-foreground transition-transform ${
                                      expandedVisits.includes(visit.id) ? "rotate-180" : ""
                                    }`}
                                  />
                                </div>
                              </CardHeader>
                            </CollapsibleTrigger>

                            <CollapsibleContent>
                              <CardContent className="pt-0">
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-muted-foreground" />
                                      Diagnosis
                                    </h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{visit.diagnosis}</p>
                                  </div>

                                  <div>
                                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                                      <Pill className="h-4 w-4 text-muted-foreground" />
                                      Prescription
                                    </h4>
                                    <ul className="space-y-1">
                                      {visit.prescription.map((med, i) => (
                                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                          <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                          {med}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {visit.followUp && (
                                    <div className="flex items-center gap-2 text-sm">
                                      <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-muted-foreground">Follow-up:</span>
                                      <span className="font-medium">
                                        {new Date(visit.followUp).toLocaleDateString("en-IN", {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        })}
                                      </span>
                                    </div>
                                  )}

                                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                                    <Download className="h-4 w-4" />
                                    Download Report
                                  </Button>
                                </div>
                              </CardContent>
                            </CollapsibleContent>
                          </Card>
                        </div>
                      </Collapsible>
                    ))}
                  </div>
                </div>

                {filteredHistory.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">No visits found matching your search.</div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Appointment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Date</span>
                    <span className="font-medium">{upcomingAppointment.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Time</span>
                    <span className="font-medium">{upcomingAppointment.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Doctor</span>
                    <span className="font-medium">{upcomingAppointment.doctor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Token</span>
                    <Badge className="bg-primary text-primary-foreground">#{upcomingAppointment.token}</Badge>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t flex gap-2">
                  <Button asChild className="flex-1 gap-2" size="sm">
                    <Link href="/queue">
                      <Clock className="h-4 w-4" />
                      Track Queue
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Button asChild variant="outline" className="justify-start gap-2 bg-transparent">
                  <Link href="/book">
                    <Plus className="h-4 w-4" />
                    Book New Appointment
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Download All Records
                </Button>
                <Button variant="outline" className="justify-start gap-2 bg-transparent">
                  <FileText className="h-4 w-4" />
                  Request Medical Certificate
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg">Health Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Stay hydrated! Drinking 8 glasses of water daily helps maintain optimal body function and keeps you
                  energized throughout the day.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function PatientDashboard() {
  return (
    <Suspense fallback={null}>
      <PatientDashboardContent />
    </Suspense>
  )
}
