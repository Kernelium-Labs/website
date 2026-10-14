import { createFileRoute } from "@tanstack/react-router"
import { Separator } from "@workspace/ui/components/separator"

import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { Navbar } from "@/components/navbar"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="mx-auto max-w-5xl px-4">
          <Separator />
        </div>
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
