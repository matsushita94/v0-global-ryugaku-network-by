import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ApplicationForm } from "@/components/application-form"
import {
  japanStudentVisaGuideSeo,
  japanStudentVisaGuideHero,
  japanStudentVisaGuideQuickFacts,
  japanStudentVisaGuideOverview,
  japanStudentVisaGuideTimeline,
  japanStudentVisaGuideFaq,
} from "@/data/japan-student-visa-guide"

export const metadata: Metadata = {
  title: japanStudentVisaGuideSeo.title,
  description: japanStudentVisaGuideSeo.description,
}

export default function JapanStudentVisaGuidePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-slate-50 pb-16 pt-28">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            {japanStudentVisaGuideHero.eyebrow}
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {japanStudentVisaGuideHero.title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {japanStudentVisaGuideHero.description}
          </p>

          <p className="mt-6 text-sm text-slate-500">
            Updated: {japanStudentVisaGuideHero.lastUpdated}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {japanStudentVisaGuideQuickFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm font-medium text-slate-500">{fact.label}</p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="overview" className="py-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            {japanStudentVisaGuideOverview.title}
          </h2>

          <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
            {japanStudentVisaGuideOverview.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="timeline" className="bg-slate-50 py-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            Visa Timeline
          </h2>

          <div className="mt-8 space-y-4">
            {japanStudentVisaGuideTimeline.map((item, index) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-semibold text-blue-700">
                  Step {index + 1}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>

          <div className="mt-8 space-y-4">
            {japanStudentVisaGuideFaq.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.question}
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="bg-slate-50 py-16">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
              Apply
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Start Your Japan Study Plan
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Tell us about your goals and we will guide you step by step.
            </p>
          </div>

          <ApplicationForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}