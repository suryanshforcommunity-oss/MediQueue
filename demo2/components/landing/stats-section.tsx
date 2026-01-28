"use client"

import { stats } from "@/lib/mock-data"
import { Users, UserCheck, Stethoscope, Building2 } from "lucide-react"

const statItems = [
  { label: "Appointments Served", value: stats.appointmentsServed, icon: Users, suffix: "+" },
  { label: "Happy Patients", value: stats.happyPatients, icon: UserCheck, suffix: "+" },
  { label: "Expert Doctors", value: stats.doctors, icon: Stethoscope, suffix: "" },
  { label: "Partner Clinics", value: stats.clinics, icon: Building2, suffix: "" },
]

export function StatsSection() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statItems.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="h-8 w-8 mx-auto mb-3 opacity-80" />
              <p className="text-3xl md:text-4xl font-bold mb-1">
                {stat.value.toLocaleString()}
                {stat.suffix}
              </p>
              <p className="text-sm opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
