import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, FileText, Bell, Shield, Smartphone } from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "Online Booking",
    description: "Book appointments anytime, anywhere. Choose your preferred doctor, date, and time slot.",
  },
  {
    icon: Clock,
    title: "Live Queue Status",
    description: "Track your position in real-time. Know exactly when it's your turn.",
  },
  {
    icon: FileText,
    title: "Digital Records",
    description: "Access your medical history, prescriptions, and reports digitally.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Get timely alerts about your appointment and when you're next in queue.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your health data is encrypted and protected with enterprise-grade security.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Access all features on any device - phone, tablet, or desktop.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold md:text-4xl mb-4">
            Everything You Need for <span className="text-primary">Better Healthcare</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform makes managing your healthcare journey simple and stress-free.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow bg-card">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
