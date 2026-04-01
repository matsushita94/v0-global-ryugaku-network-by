import Link from "next/link"
import {
  Languages,
  Building2,
  Briefcase,
  Utensils,
  Plane,
} from "lucide-react"

import { programs } from "@/data/site-content"

const iconMap = {
  Languages,
  Building2,
  Briefcase,
  Utensils,
  Plane,
}

type Program = {
  iconName: keyof typeof iconMap
  title: string
  href?: string
  description: string
  features: string[]
}

function ProgramCardContent({ program }: { program: Program }) {
  const Icon = iconMap[program.iconName]

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
