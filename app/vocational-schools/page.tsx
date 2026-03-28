import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import ProgramHero from "@/components/program-pages/program-hero"
import ProgramInfoSection from "@/components/program-pages/program-info-section"
import ProgramCTA from "@/components/program-pages/program-cta"

export default function VocationalSchoolsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <ProgramHero
        title="Vocational Schools in Japan"
        subtitle="We help students explore practical and career-focused education in Japan, including fields such as hospitality, business, IT, design, and other specialized pathways."
        image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
      />

      <ProgramInfoSection
        title="Who vocational schools are for"
        items={[
          "Students who want practical skills for a specific career path.",
          "Students interested in hands-on learning rather than purely academic study.",
          "People aiming to build expertise in industries such as hospitality, IT, business, design, and service-related work.",
        ]}
      />

      <ProgramInfoSection
        title="Common study fields"
        items={[
          "Hospitality and tourism.",
          "Business and management.",
          "Information technology and digital skills.",
          "Design, creative fields, and other specialized training areas.",
        ]}
      />

      <ProgramInfoSection
        title="Important things to know"
        items={[
          "Vocational schools often require a clearer career goal than language schools.",
          "Some programs may expect a higher level of Japanese ability depending on the course.",
          "We help students understand which pathways may be realistic based on their background and goals.",
        ]}
      />

      <ProgramCTA />

      <Footer />
    </main>
  )
}
