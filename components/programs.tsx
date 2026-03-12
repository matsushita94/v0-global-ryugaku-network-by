import { Languages, Building2, Briefcase, Utensils, Plane } from "lucide-react"

const programs = [
  {
    icon: Languages,
    title: "Language Schools",
    description: "Intensive language programs to help you achieve fluency and cultural immersion in your destination country.",
    features: ["Short-term & long-term courses", "Multiple proficiency levels", "Cultural activities included"],
  },
  {
    icon: Building2,
    title: "Universities",
    description: "Bachelor's and Master's degree programs at accredited institutions around the world.",
    features: ["Undergraduate programs", "Graduate studies", "Research opportunities"],
  },
  {
    icon: Briefcase,
    title: "Vocational Colleges",
    description: "Practical, career-focused training programs that lead to industry-recognized certifications.",
    features: ["Hands-on training", "Industry partnerships", "Job placement support"],
  },
  {
    icon: Utensils,
    title: "Hospitality Schools",
    description: "Specialized programs in hospitality management, culinary arts, and tourism.",
    features: ["Culinary arts programs", "Hotel management", "Internship placements"],
  },
  {
    icon: Plane,
    title: "Study Abroad Programs",
    description: "Semester or year-long exchange programs that combine academics with cultural exploration.",
    features: ["Credit transfer options", "Cultural immersion", "Travel opportunities"],
  },
]

export function Programs() {
  return (
    <section id="programs" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Programs
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We offer a wide range of educational programs to match your goals and interests.
          </p>
        </div>

        <div className="mx-auto mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <div
              key={program.title}
              className="flex flex-col bg-card rounded-xl p-8 shadow-sm border border-border hover:shadow-md hover:border-primary/20 transition-all"
            >
              <div className="flex items-center justify-center size-14 rounded-xl bg-primary text-primary-foreground mb-6">
                <program.icon className="size-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">{program.title}</h3>
              <p className="mt-3 text-muted-foreground flex-grow">{program.description}</p>
              <ul className="mt-6 space-y-2">
                {program.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-muted-foreground">
                    <span className="mr-2 size-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
