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
    <section className="section-spacing bg-white">
      <div className="section-container grid items-center gap-12 md:grid-cols-2">
        <div>
          <h1 className="section-title">{title}</h1>
          <p className="section-subtext mt-4">{subtitle}</p>
        </div>

        <div>
          <img
            src={image}
            alt={title}
            className="rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  )
}
