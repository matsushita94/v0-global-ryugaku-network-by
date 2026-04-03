import {
  Users,
  Handshake,
  Globe,
  TrendingUp,
} from "lucide-react"

import {
  partnerBenefits,
  type PartnerBenefit,
} from "@/data/site-content"

const iconMap = {
  Users,
  Handshake,
  Globe,
  TrendingUp,
}

export function Partner() {
  return (
    <section id="partner" className="bg-slate-50 section-spacing">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Partners</p>

          <h2 className="section-title">
            Work With Us
          </h2>

          <p className="section-subtext mx-auto">
            We are building partnerships with schools and education providers
            who are interested in connecting with international students.
          </p>
        </div>

        <div className="mx-auto mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {partnerBenefits.map((benefit: PartnerBenefit) => {
            const Icon = iconMap[benefit.iconName as keyof typeof iconMap]

            return (
              <div
                key={benefit.title}
                className="premium-card text-center"
              >
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
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
    </section>
  )
}
