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
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/30" />
      </div>

      <div className="section-container relative flex min-h-[88vh] items-center pt-28 pb-20 sm:pt-32 sm:pb-24">
        <div className="max-w-2xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-white/70 sm:text-sm">
            Global Ryugaku Network
          </p>

          <h1 className="hero-title">
            Start Your Study Journey in Japan
          </h1>

          <p className="hero-subtext">
            Global Ryugaku Network helps international students explore Japanese
            language schools, vocational schools, and universities with clear,
            personal guidance.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="px-6 py-3 text-base shadow-sm">
              <Link href="#apply">
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/25 bg-white/10 px-6 py-3 text-base text-white backdrop-blur-sm hover:bg-white hover:text-slate-900"
            >
              <Link href="#partner">Partner With Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
