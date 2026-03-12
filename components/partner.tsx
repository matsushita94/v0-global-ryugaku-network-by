import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building, Globe2, Users, TrendingUp, ArrowRight } from "lucide-react"

const benefits = [
  {
    icon: Globe2,
    title: "Global Reach",
    description: "Access a diverse pool of motivated students from around the world.",
  },
  {
    icon: Users,
    title: "Pre-Screened Students",
    description: "Receive applications from students who match your institution's requirements.",
  },
  {
    icon: TrendingUp,
    title: "Increased Enrollment",
    description: "Boost your international student enrollment with targeted recruitment.",
  },
  {
    icon: Building,
    title: "Dedicated Support",
    description: "Work with our experienced team who understands your institution's needs.",
  },
]

export function Partner() {
  return (
    <section id="partner" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Partner With Us
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Global Ryugaku Network works with schools and institutions seeking international students. 
              Join our growing network of partner institutions and connect with motivated students 
              from around the world.
            </p>
            <p className="mt-4 text-muted-foreground">
              Whether you&apos;re a language school, university, vocational college, or hospitality 
              institution, we can help you reach qualified international students who are ready 
              to pursue their educational goals at your institution.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild className="group">
                <Link href="#contact">
                  Become a Partner
                  <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex flex-col p-6 bg-card rounded-xl border border-border hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 text-primary mb-4">
                  <benefit.icon className="size-6" />
                </div>
                <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
