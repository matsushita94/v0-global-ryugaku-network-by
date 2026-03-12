import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-students.jpg"
          alt="International students on campus"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
            Study Anywhere in the World
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/90 text-pretty">
            Global Ryugaku Network helps students discover and apply to schools around the world. 
            We guide you through every step of your international education journey.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
            <Button size="lg" asChild className="group">
              <Link href="#apply">
                Apply Now
                <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white">
              <Link href="#partner">Partner With Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
