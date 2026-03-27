import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building, Globe2, Users, TrendingUp, ArrowRight } from "lucide-react"

const benefits = [
  {
    icon: Globe2,
    title: "Japan Market Focus",
    description:
      "We are currently focused on building relationships with schools and institutions in Japan.",
  },
  {
    icon: Users,
    title: "Student Guidance",
    description:
      "We aim to help students understand application steps before they contact schools.",
  },
  {
    icon: TrendingUp,
    title: "Long-Term Growth",
    description:
      "Our goal is to build steady, credible partnerships that grow over time.",
  },
  {
    icon: Building,
    title: "Direct Communication",
    description:
      "We want to work clearly and honestly with schools that value transparent student support.",
  },
]

export function Partner() {
  return (
    <section id="partner" className="bg-slate-50 section-spacing">
      <div className="section-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="section-eyebrow">Partner With Us</p>

            <h2 className="section-title">
              For Schools and Education Partners in Japan
            </h2>

            <p className="section-subtext">
              Global Ryugaku Network is currently focused on building relationships with
              schools and education providers in Japan. We are still growing, and we want
              to build partnerships carefully and honestly.
            </p>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              If you are a language school, vocational school, university, or other
              education provider in Japan, we would be glad to hear from you.
            </p>

            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="#contact">
                  Become a Partner
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => {
              const Icon = benefit.icon

              return (
                <div key={benefit.title} className="premium-card">
                  <div className="mb-4 inline-flex rounded-xl bg-blue-50 p-3 text-blue-600">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
