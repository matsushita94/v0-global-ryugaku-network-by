import Link from "next/link"
import { Languages, Building2, Briefcase, Utensils, Plane } from "lucide-react"

const programs = [
  {
    icon: Languages,
    title: "Language Schools",
    href: "/language-schools",
    description:
      "Japanese language programs designed to help students build fluency, confidence, and daily communication skills.",
    features: [
      "Short-term and long-term courses",
      "Multiple proficiency levels",
      "Language and cultural immersion",
    ],
  },
  {
    icon: Building2,
    title: "Universities",
    description:
      "Undergraduate and postgraduate study options for students who want to pursue higher education in Japan.",
    features: [
      "Bachelor's and Master's pathways",
      "Academic progression support",
      "Long-term study opportunities",
    ],
  },
  {
    icon: Briefcase,
    title: "Vocational Schools",
    href: "/vocational-schools",
    description:
      "Practical, career-focused education for students who want hands-on training and industry-relevant skills.",
    features: [
      "Applied learning environment",
      "Career-oriented programs",
      "Specialized study options",
    ],
  },
  {
    icon: Utensils,
    title: "Hospitality Education",
    description:
      "Programs suited to students interested in hospitality, service, tourism, and related professional pathways.",
    features: [
      "Hospitality-focused learning",
      "Service industry preparation",
      "Practical career direction",
    ],
  },
  {
    icon: Plane,
    title: "Future Global Pathways",
    description:
      "As our network grows, we plan to expand into wider international study opportunities beyond Japan.",
    features: [
      "Careful step-by-step expansion",
      "Future destination growth",
      "Long-term global vision",
    ],
  },
]

type Program = {
  icon: typeof Languages
  title: string
  href?: string
  description: string
  features: string[]
}

function ProgramCardContent({ program }: { program: Program }) {
  const Icon = program.icon

  return (
    <>
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
        <Icon className="h-7 w-7" />
      </div>

      <h3 className="text-xl font-semibold text-slate-900">
        {program.title}
      </h3>

      <p className="mt-3 flex-grow text-sm leading-7 text-slate-600">
        {program.description}
      </p>

      <ul className="mt-6 space-y-3">
        {program.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start text-sm leading-6 text-slate-600"
          >
            <span className="mr-3 mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

export function Programs() {
  return (
    <section id="programs" className="bg-slate-50 section-spacing">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Programs</p>

          <h2 className="section-title">
            Study Paths We Focus On
          </h2>

          <p className="section-subtext mx-auto">
            We currently focus on helping students explore realistic study opportunities
            in Japan, with plans to expand our network over time.
          </p>
        </div>

        <div className="mx-auto mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) =>
            program.href ? (
              <Link
                key={program.title}
                href={program.href}
                className="premium-card flex flex-col transition duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <ProgramCardContent program={program} />
              </Link>
            ) : (
              <div
                key={program.title}
                className="premium-card flex flex-col"
              >
                <ProgramCardContent program={program} />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
