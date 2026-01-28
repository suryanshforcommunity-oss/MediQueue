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
import { doctorDashboardData } from "@/lib/mock-data"
import {
  Activity,
  Users,
  Clock,
  CheckCircle2,
  Timer,
  Phone,
  FileText,
  Search,
  Bell,
  ChevronRight,
  PlayCircle,
  SkipForward,
  User,
  LogOut,
  Settings,
  Calendar,
  Moon,
  Sun,
} from "lucide-react"

function DoctorDashboardContent() {
  const [currentPatient, setCurrentPatient] = useState(doctorDashboardData.currentPatient)
  const [queue, setQueue] = useState(doctorDashboardData.queue)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const handleCallNext = () => {
    const nextPatient = queue.find((p) => p.status === "next")
    if (nextPatient) {
      setCurrentPatient({
        token: nextPatient.token,
        name: nextPatient.name,
        age: nextPatient.age,
        gender: "Male",
        phone: "+91 98765 00000",
        symptoms: nextPatient.symptoms,
        visitHistory: 1,
      })

      setQueue(
        queue.map((p, index) => {
          if (p.token === nextPatient.token) {
            return { ...p, status: "serving" as const }
          }
          if (queue[index - 1]?.token === nextPatient.token && index < queue.length) {
            return { ...p, status: "next" as const }
          }
          return p
        }),
      )
    }
  }

  const filteredQueue = queue.filter(
    (p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.token.toString().includes(searchQuery),
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">MediQueue</span>
            <Badge variant="secondary" className="ml-2">
              Doctor
            </Badge>
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground flex items-center justify-center">
                3
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
                    <AvatarImage src="/indian-female-doctor-portrait.jpg" />
                    <AvatarFallback>PS</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">Dr. Priya Sharma</span>
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{doctorDashboardData.todayAppointments}</p>
                  <p className="text-sm text-muted-foreground">Today's Appointments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{doctorDashboardData.queueLength}</p>
                  <p className="text-sm text-muted-foreground">Current Queue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{doctorDashboardData.patientsServed}</p>
                  <p className="text-sm text-muted-foreground">Patients Served</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Timer className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{doctorDashboardData.avgConsultTime}</p>
                  <p className="text-sm text-muted-foreground">Avg. Consult Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PlayCircle className="h-5 w-5 text-success" />
                    Current Patient
                  </CardTitle>
                  <CardDescription>Token #{currentPatient.token}</CardDescription>
                </div>
                <Badge className="bg-success text-success-foreground">In Consultation</Badge>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-lg">{currentPatient.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">{currentPatient.name}</h3>
                        <p className="text-muted-foreground">
                          {currentPatient.age} years, {currentPatient.gender}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{currentPatient.phone}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span>
                          <strong>Symptoms:</strong> {currentPatient.symptoms}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{currentPatient.visitHistory} previous visits</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 md:w-48">
                    <Button asChild className="gap-2">
                      <Link href={`/doctor/patient/${currentPatient.token}`}>
                        <FileText className="h-4 w-4" />
                        View History
                      </Link>
                    </Button>
                    <Button variant="outline" className="gap-2 bg-transparent" onClick={handleCallNext}>
                      <SkipForward className="h-4 w-4" />
                      Complete & Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Patient Queue</CardTitle>
                  <CardDescription>{queue.length} patients waiting</CardDescription>
                </div>
                <div className="w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or token"
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredQueue.map((patient) => (
                    <div
                      key={patient.token}
                      className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                        patient.status === "serving"
                          ? "bg-success/10 border border-success/20"
                          : patient.status === "next"
                            ? "bg-warning/10 border border-warning/20"
                            : "bg-muted/50 hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${
                            patient.status === "serving"
                              ? "bg-success text-success-foreground"
                              : patient.status === "next"
                                ? "bg-warning text-warning-foreground"
                                : "bg-muted-foreground/20 text-foreground"
                          }`}
                        >
                          {patient.token}
                        </div>
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {patient.age} yrs • {patient.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground hidden md:block max-w-32 truncate">
                          {patient.symptoms}
                        </span>
                        <Badge
                          variant={
                            patient.status === "serving"
                              ? "default"
                              : patient.status === "next"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            patient.status === "serving"
                              ? "bg-success text-success-foreground"
                              : patient.status === "next"
                                ? "bg-warning text-warning-foreground"
                                : ""
                          }
                        >
                          {patient.status === "serving" ? "Serving" : patient.status === "next" ? "Next" : "Waiting"}
                        </Badge>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <p className="text-sm opacity-80 mb-2">Next in Queue</p>
                <p className="text-4xl font-bold mb-4">#{queue.find((p) => p.status === "next")?.token || "--"}</p>
                <Button variant="secondary" className="w-full gap-2" size="lg" onClick={handleCallNext}>
                  <PlayCircle className="h-5 w-5" />
                  Call Next Patient
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Today</CardTitle>
                <CardDescription>Afternoon appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {doctorDashboardData.upcomingAppointments.map((apt) => (
                    <div key={apt.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">{apt.patient.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{apt.patient}</p>
                          <p className="text-xs text-muted-foreground">{apt.time}</p>
                        </div>
                      </div>
                      <Badge variant={apt.type === "New" ? "default" : "outline"}>{apt.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Button variant="outline" className="justify-start gap-2 bg-transparent">
                  <Calendar className="h-4 w-4" />
                  View Full Schedule
                </Button>
                <Button variant="outline" className="justify-start gap-2 bg-transparent">
                  <Search className="h-4 w-4" />
                  Search All Patients
                </Button>
                <Button variant="outline" className="justify-start gap-2 bg-transparent">
                  <FileText className="h-4 w-4" />
                  Add Consultation Notes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function DoctorDashboard() {
  return (
    <Suspense fallback={null}>
      <DoctorDashboardContent />
    </Suspense>
  )
}
