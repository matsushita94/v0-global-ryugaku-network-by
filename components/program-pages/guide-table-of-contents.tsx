import Link from "next/link"
import type { GuideSectionLink } from "@/data/guides"

type GuideTableOfContentsProps = {
  items: GuideSectionLink[]
  title?: string
}

export default function GuideTableOfContents({
  items,
  title = "On this page",
}: GuideTableOfContentsProps) {
  return (
    <section className="section-spacing bg-white">
      <div className="section-container">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {items.map((item) => (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}