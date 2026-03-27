import { Globe2, TrendingUp, Users2, Award } from "lucide-react"

const benefits = [
  {
    icon: Globe2,
    title: "International Experience",
    description:
      "Living and studying in another country can help students build independence, adaptability, and confidence.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description:
      "Studying abroad can strengthen language ability, cultural understanding, and future career options.",
  },
  {
    icon: Users2,
    title: "Cultural Exposure",
    description:
      "Students can experience new perspectives, communities, and ways of life through overseas study.",
  },
  {
    icon: Award,
    title: "Educational Opportunity",
    description:
      "Studying in Japan can open access to language learning and specialized programs that may not be available at home.",
  },
]

const highlights = [
  { value: "🇯🇵", label: "Japan-Focused" },
  { value: "🎓", label: "Study Guidance" },
  { value: "🤝", label: "Personal Support" },
  { value: "🌏", label: "Global Vision" },
]

export function WhyStudyAbroad() {
  return (
    <section id="why-study-abroad" className="bg-white section-spacing">
      <div className="section-container">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="section-eyebrow">Why Japan</p>

            <h2 className="section-title">
              Why Study in Japan?
            </h2>

            <p className="section-subtext">
              Studying abroad is not only about education. It is also about personal
              growth, language development, and new life experience. We currently focus
              on helping students who want to study in Japan.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-slate-50 p-6 text-center ring-1 ring-slate-200"
                >
                  <div className="text-3xl">{item.value}</div>
                  <div className="mt-3 text-sm font-medium text-slate-700">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon

              return (
                <div key={benefit.title} className="premium-card">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon className="h-6 w-6" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {benefit.title}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
