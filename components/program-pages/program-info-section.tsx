type ProgramInfoSectionProps = {
  title: string
  items: string[]
}

export default function ProgramInfoSection({
  title,
  items,
}: ProgramInfoSectionProps) {
  return (
    <section className="section-spacing bg-slate-50">
      <div className="section-container">
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>

        <ul className="mt-6 space-y-3 text-slate-600">
          {items.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
