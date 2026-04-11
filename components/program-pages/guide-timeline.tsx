import type { GuideTimelineItem } from "@/data/guides"

type GuideTimelineProps = {
  id: string
  title: string
  items: GuideTimelineItem[]
}

export default function GuideTimeline({
  id,
  title,
  items,
}: GuideTimelineProps) {
  return (
    <section id={id} className="section-spacing scroll-mt-28 bg-slate-50">
      <div className="section-container">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            {title}
          </h2>

          <div className="mt-10 space-y-5">
            {items.map((item, index) => (
              <div
                key={`${item.stage}-${index}`}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
                  {index + 1}
                </div>

                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  {item.stage}
                </h3>

                <p className="mt-3 text-base leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}