import { ApplicationForm } from "@/components/application-form"

type ProgramCTAProps = {
  title?: string
  subtitle?: string
}

export default function ProgramCTA({
  title = "Start Your Application",
  subtitle = "Tell us about your study goals and we will help guide you toward a suitable path in Japan.",
}: ProgramCTAProps) {
  return (
    <section className="section-spacing bg-slate-50">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Apply</p>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtext mx-auto">{subtitle}</p>
        </div>

        <div className="mt-12">
          <ApplicationForm />
        </div>
      </div>
    </section>
  )
}
