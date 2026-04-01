import {
  Building2,
  Users,
  GraduationCap,
  CheckCircle,
} from "lucide-react"

import { aboutFeatures } from "@/data/site-content"

const iconMap = {
  Building2,
  Users,
  GraduationCap,
  CheckCircle,
}

type AboutFeature = {
  iconName: keyof typeof iconMap
  title: string
  description: string
}

export function About() {
  return (
    <section id="about" className="bg-white section-spacing">
      <div className="section-container">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="section-eyebrow">About Us</p>

            <h2 className="section-title">
              A More Personal Way to Explore Study in Japan
            </h2>

            <p className="section-subtext mt-6">
              Global Ryugaku Network is currently focused on helping students
              explore study opportunities in Japan with clear, practical guidance.
            </p>

            <p className="mt-6 text-base leading-8 text-slate-600">
              Our goal is to make the process feel more approachable, more
              transparent, and more personal for students planning their next step.
            </p>

            <p className="mt-6 text-base leading-8 text-slate-600">
              While our long-term vision is to build a global education network,
              we are starting with Japan and growing carefully over time.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {aboutFeatures.map((feature: AboutFeature) => {
              const Icon = iconMap[feature.iconName]

              return (
                <div key={feature.title} className="premium-card">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
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
