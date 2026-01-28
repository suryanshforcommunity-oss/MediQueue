"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calendar, Clock, Users } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="flex flex-col gap-6">
            <Badge variant="secondary" className="w-fit">
              <span className="mr-1">✨</span> Trusted by 100+ Clinics in India
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
              Skip the Wait, <span className="text-primary">Book Your Appointment</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Say goodbye to long queues and waiting rooms. Book appointments online, track your position in real-time,
              and get notified when it's your turn.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button size="lg" asChild className="gap-2">
                <Link href="/book">
                  <Calendar className="h-4 w-4" />
                  Book Appointment
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2 bg-transparent">
                <Link href="/queue">
                  <Clock className="h-4 w-4" />
                  Check Queue Status
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-6 mt-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                      <img
                        src={`/indian-patient-face-.jpg?height=32&width=32&query=indian patient face ${i}`}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  <strong className="text-foreground">98,500+</strong> Happy Patients
                </span>
              </div>
            </div>
          </div>

          {/* Hero Image / Dashboard Preview */}
          <div className="relative">
            <div className="relative rounded-2xl border bg-card p-4 shadow-2xl">
              <div className="rounded-xl bg-muted/50 p-6">
                {/* Mini Dashboard Preview */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Live Queue Status</span>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      Live
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-card p-4 text-center">
                      <p className="text-3xl font-bold text-primary">08</p>
                      <p className="text-xs text-muted-foreground">Now Serving</p>
                    </div>
                    <div className="rounded-lg bg-card p-4 text-center">
                      <p className="text-3xl font-bold text-foreground">12</p>
                      <p className="text-xs text-muted-foreground">Your Token</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Estimated Wait</span>
                      <span className="font-medium">~20 mins</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div className="h-2 w-2/3 rounded-full bg-primary transition-all" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>4 patients ahead of you</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-4 -left-4 rounded-lg border bg-card p-3 shadow-lg animate-float">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium">Appointment Confirmed!</p>
                  <p className="text-xs text-muted-foreground">Token #12 • 10:30 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
