import { Globe, Users, GraduationCap, CheckCircle } from "lucide-react"
import Image from "next/image"

const features = [
  {
    icon: Globe,
    title: "Global Network",
    description: "Access to educational institutions in over 30 countries worldwide.",
  },
  {
    icon: Users,
    title: "Personalized Guidance",
    description: "One-on-one support from experienced education consultants.",
  },
  {
    icon: GraduationCap,
    title: "Diverse Programs",
    description: "From language schools to universities, we cover all education levels.",
  },
  {
    icon: CheckCircle,
    title: "Full Support",
    description: "Assistance with applications, visas, and pre-departure preparation.",
  },
]

export function About() {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            About Global Ryugaku Network
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Global Ryugaku Network connects students with educational institutions globally and helps 
            simplify the process of studying abroad. Whether you dream of learning a new language in 
            Japan, pursuing a degree in Canada, or gaining international work experience, we are here 
            to make your journey seamless.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="relative bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 text-primary mb-4">
                  {feature.title === "Global Network" ? (
  <Image
    src="/logo - complete.svg"
    alt="Global Ryugaku Network"
    width={24}
    height={24}
    className="object-contain"
  />
) : (
  <feature.icon className="size-6" />
)}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
