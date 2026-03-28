type ProgramInfoSectionProps = {
  title: string
  items: string[]
  background?: "white" | "slate"
}

export default function ProgramInfoSection({
  title,
  items,
  background = "slate",
}: ProgramInfoSectionProps) {
  const sectionBackground =
    background === "white" ? "bg-white" : "bg-slate-50"

  return (
    <section className={`section-spacing ${sectionBackground}`}>
      <div className="section-container">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            {title}
          </h2>

          <ul className="mt-8 space-y-4">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-start text-base leading-7 text-slate-600"
              >
                <span className="mr-4 mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
