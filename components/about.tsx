import { Building2, Users, GraduationCap, CheckCircle } from "lucide-react"

const features = [
  {
    icon: Building2,
    title: "Japan-Focused Network",
    description:
      "We are currently focused on building relationships with schools and education providers in Japan.",
  },
  {
    icon: Users,
    title: "Personalized Support",
    description:
      "We provide guidance based on each student's goals, background, and study plans.",
  },
  {
    icon: GraduationCap,
    title: "Practical Study Paths",
    description:
      "We focus on language schools, vocational schools, and universities in Japan.",
  },
  {
    icon: CheckCircle,
    title: "Application Guidance",
    description:
      "We help students understand the application process and prepare for studying in Japan.",
  },
]

export function About() {
  return (
    <section id="about" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              About Us
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              About Global Ryugaku Network
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Global Ryugaku Network is currently focused on helping students explore
              study opportunities in Japan.
            </p>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              Our goal is to make the process of studying abroad clearer, more
              approachable, and more personal.
            </p>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              While our long-term vision is to build a global education network,
              we are starting with Japan and expanding step by step.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-blue-50 p-3 text-blue-600">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {feature.description}
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
