import { Badge } from "@/components/ui/badge"

const steps = [
  {
    number: "01",
    title: "Select Department & Doctor",
    description: "Choose from various departments and select your preferred doctor based on availability and ratings.",
  },
  {
    number: "02",
    title: "Book Your Slot",
    description: "Pick a convenient date and time slot. Receive instant confirmation with your unique token number.",
  },
  {
    number: "03",
    title: "Track & Visit",
    description: "Monitor queue status in real-time. Arrive on time and skip the waiting room chaos.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Simple Process
          </Badge>
          <h2 className="text-3xl font-bold md:text-4xl mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Book your appointment in just 3 simple steps</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
              )}

              <div className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold mb-4">
                {step.number}
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
