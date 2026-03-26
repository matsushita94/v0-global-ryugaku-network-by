import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-900">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-students.jpg"
          alt="International students on campus"
          fill
          className="object-cover opacity-35"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/55" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
            Start Your Study Journey in Japan
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-white/90 text-pretty">
            Global Ryugaku Network currently focuses on helping international students
            apply to Japanese language schools, vocational schools, and universities.
            We are building toward wider global expansion in the future.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="#apply">
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              <Link href="#partner">Partner With Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
