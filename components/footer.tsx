import Link from "next/link"
import { Activity, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Activity className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">MediQueue</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Simplifying healthcare access with smart appointment and queue management for clinics across India.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/book" className="hover:text-foreground transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/queue" className="hover:text-foreground transition-colors">
                  Queue Status
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-foreground transition-colors">
                  Patient Login
                </Link>
              </li>
              <li>
                <Link href="/login?role=doctor" className="hover:text-foreground transition-colors">
                  Doctor Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Departments</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>General Medicine</li>
              <li>Pediatrics</li>
              <li>Cardiology</li>
              <li>Orthopedics</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@mediqueue.in</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>123 Health Street, Mumbai, Maharashtra 400001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2026 MediQueue. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
