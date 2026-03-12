import { Globe2, TrendingUp, Users2, Award } from "lucide-react"

const benefits = [
  {
    icon: Globe2,
    title: "International Experience",
    description: "Gain invaluable life experience by living and studying in a different country. Develop independence, adaptability, and a global perspective that will serve you throughout life.",
  },
  {
    icon: TrendingUp,
    title: "Global Career Opportunities",
    description: "Stand out to employers with international qualifications and cross-cultural competence. Open doors to career opportunities across multiple countries and industries.",
  },
  {
    icon: Users2,
    title: "Cultural Exposure",
    description: "Immerse yourself in new cultures, traditions, and ways of thinking. Build lasting friendships with people from around the world and expand your worldview.",
  },
  {
    icon: Award,
    title: "World-Class Education",
    description: "Access top-ranked institutions and specialized programs that may not be available in your home country. Learn from renowned faculty and cutting-edge facilities.",
  },
]

export function WhyStudyAbroad() {
  return (
    <section id="why-study-abroad" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Study Abroad?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Studying abroad is more than just education—it&apos;s a transformative experience that 
              shapes who you become. Here&apos;s why thousands of students choose to study internationally 
              every year.
            </p>
            
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-4xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground mt-1">Partner Institutions</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-4xl font-bold text-primary">30+</div>
                <div className="text-sm text-muted-foreground mt-1">Countries</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-4xl font-bold text-primary">10,000+</div>
                <div className="text-sm text-muted-foreground mt-1">Students Placed</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-4xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground mt-1">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="flex gap-5 p-5 rounded-xl bg-card border border-border hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center size-12 shrink-0 rounded-lg bg-primary/10 text-primary">
                  <benefit.icon className="size-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
