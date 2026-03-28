type ProgramHighlightGridProps = {
  title: string
  items: {
    title: string
    description: string
  }[]
}

export default function ProgramHighlightGrid({
  title,
  items,
}: ProgramHighlightGridProps) {
  return (
    <section className="section-spacing bg-white">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title">{title}</h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="premium-card">
              <h3 className="text-xl font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
