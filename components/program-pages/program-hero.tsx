type ProgramHeroProps = {
  title: string
  subtitle: string
  image: string
}

export default function ProgramHero({
  title,
  subtitle,
  image,
}: ProgramHeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 pb-20 pt-36 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.22),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),_transparent_35%)]" />

      <div className="section-container relative grid items-center gap-12 md:grid-cols-2">
        <div>
          <p className="section-eyebrow !text-blue-300">Programs</p>

          <h1 className="section-title !text-white">
            {title}
          </h1>

          <p className="section-subtext mt-4 !text-slate-300">
            {subtitle}
          </p>
        </div>

        <div>
          <img
            src={image}
            alt={title}
            className="rounded-2xl object-cover shadow-2xl ring-1 ring-white/10"
          />
        </div>
      </div>
    </section>
  )
}
