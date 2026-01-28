import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Ramesh Gupta",
    role: "Patient",
    content:
      "MediQueue has completely changed how I visit doctors. No more waiting for hours in crowded waiting rooms!",
    rating: 5,
    image: "/indian-man-portrait.png",
  },
  {
    name: "Dr. Sunita Verma",
    role: "Physician",
    content:
      "As a doctor, this system helps me manage my patients efficiently. The digital records feature is a game-changer.",
    rating: 5,
    image: "/indian-female-doctor-portrait.jpg",
  },
  {
    name: "Priyanka Shah",
    role: "Mother of 2",
    content:
      "Taking my kids to the pediatrician is so much easier now. I can track the queue from home and arrive just in time.",
    rating: 5,
    image: "/indian-woman-portrait.png",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold md:text-4xl mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thousands of patients and doctors trust MediQueue for better healthcare experiences
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-sm bg-card">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
