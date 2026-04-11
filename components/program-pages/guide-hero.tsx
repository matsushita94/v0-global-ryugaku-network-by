import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { GuideFact, GuideHeroAction } from "@/data/guides"

type GuideHeroProps = {
  eyebrow: string
  title: string
  description: string
  lastUpdatedLabel: string
  lastUpdatedValue: string
  actions: GuideHeroAction[]
  quickFacts: GuideFact[]
}

export default function GuideHero({
  eyebrow,
  title,
  description,
  lastUpdatedLabel,
  lastUpdatedValue,
  actions,
  quickFacts,
}: GuideHeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 pb-20 pt-36 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.22),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),_transparent_35%)]" />

      <div className="section-container relative">
        <div className="mx-auto max-w-4xl">
          <p className="section-eyebrow !text-blue-300">{eyebrow}</p>

          <h1 className="section-title !text-white">{title}</h1>

          <p className="section-subtext mt-4 !text-slate-300">{description}</p>

          <div className="mt-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
            <span className="font-medium">{lastUpdatedLabel}:</span>
            <span className="ml-2">{lastUpdatedValue}</span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {actions.map((action) => {
              const isPrimary = action.variant !== "secondary"

              return (
                <Button
                  key={`${action.label}-${action.href}`}
                  asChild
                  variant={isPrimary ? "default" : "outline"}
                  size="lg"
                  className={
                    isPrimary
                      ? "min-w-[220px]"
                      : "min-w-[220px] border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  }
                >
                  <Link href={action.href}>{action.label}</Link>
                </Button>
              )
            })}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <p className="text-sm font-medium text-slate-300">{fact.label}</p>
                <p className="mt-2 text-base font-semibold text-white">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}