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

      <div className="section-container section-spacing relative">
        <div className="max-w-2xl">
          <h1 className="hero-title">
            Start Your Study Journey in Japan
          </h1>

          <p className="hero-subtext">
            Global Ryugaku Network currently focuses on helping international students
            apply to Japanese language schools, vocational schools, and universities.
            We are building toward wider global expansion in the future.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="px-6 py-3 text-base">
              <Link href="#apply">
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/10 px-6 py-3 text-base text-white hover:bg-white/20"
            >
              <Link href="#partner">Partner With Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
