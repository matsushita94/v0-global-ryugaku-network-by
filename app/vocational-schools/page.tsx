import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import ProgramHero from "@/components/program-pages/program-hero"
import ProgramInfoSection from "@/components/program-pages/program-info-section"
import ProgramHighlightGrid from "@/components/program-pages/program-highlight-grid"
import ProgramCTA from "@/components/program-pages/program-cta"

export default function VocationalSchoolsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <ProgramHero
        title="Vocational Schools in Japan"
        subtitle="We help students explore practical and career-focused education in Japan, including fields such as hospitality, business, IT, design, and other specialized pathways."
        image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
        eyebrow="Vocational Schools"
        imageAlt="Students in a practical learning environment"
      />

      <ProgramHighlightGrid
        title="Why students choose vocational schools"
        items={[
          {
            title: "Career Focused",
            description:
              "Vocational schools are suited to students who want practical training connected to real industries and job skills.",
          },
          {
            title: "Hands-On Learning",
            description:
              "Many students prefer vocational education because it is more applied and skill-based than a purely academic path.",
          },
          {
            title: "Specialized Direction",
            description:
              "These schools can help students move toward focused industries such as hospitality, business, IT, design, and service fields.",
          },
        ]}
      />

      <ProgramInfoSection
        title="Who vocational schools are for"
        background="slate"
        items={[
          "Students who want practical skills for a specific career path.",
          "Students interested in hands-on learning rather than purely academic study.",
          "People aiming to build expertise in industries such as hospitality, IT, business, design, and service-related work.",
        ]}
      />

      <ProgramInfoSection
        title="Common study fields"
        background="white"
        items={[
          "Hospitality and tourism.",
          "Business and management.",
          "Information technology and digital skills.",
          "Design, creative fields, and other specialized training areas.",
        ]}
      />

      <ProgramInfoSection
        title="Important things to know"
        background="slate"
        items={[
          "Vocational schools often require a clearer career goal than language schools.",
          "Some programs may expect a higher level of Japanese ability depending on the course.",
          "We help students understand which pathways may be realistic based on their background and goals.",
        ]}
      />

      <ProgramCTA
        title="Ask About Vocational School Pathways"
        subtitle="Tell us your interests, study goals, and Japanese level so we can help you explore realistic vocational options in Japan."
      />

      <Footer />
    </main>
  )
}
