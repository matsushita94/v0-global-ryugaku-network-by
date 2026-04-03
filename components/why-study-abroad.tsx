import {
  studyAbroadBenefits,
  studyAbroadHighlights,
  type StudyAbroadBenefit,
  type StudyAbroadHighlight,
} from "@/data/site-content"

export function WhyStudyAbroad() {
  return (
    <section id="why-study-abroad" className="bg-white section-spacing">
      <div className="section-container">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="section-eyebrow">Why Study Abroad</p>

            <h2 className="section-title">
              More Than Education
            </h2>

            <p className="section-subtext mt-6">
              Studying abroad is not only about entering a school. It is also
              about gaining new perspectives, developing confidence, and building
              a foundation for future opportunities.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {studyAbroadHighlights.map((highlight: StudyAbroadHighlight) => (
                <div
                  key={highlight.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center"
                >
                  <div className="text-lg font-semibold text-slate-900">
                    {highlight.value}
                  </div>
                  <div className="mt-2 text-sm text-slate-600">
                    {highlight.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {studyAbroadBenefits.map((benefit: StudyAbroadBenefit) => (
              <div
                key={benefit.title}
                className="premium-card"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
