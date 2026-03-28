import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import ProgramHero from "@/components/program-pages/program-hero"
import ProgramInfoSection from "@/components/program-pages/program-info-section"
import ProgramCTA from "@/components/program-pages/program-cta"

export default function LanguageSchoolsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <ProgramHero
        title="Japanese Language Schools in Japan"
        subtitle="We help students explore suitable language school options in Japan based on their goals, current Japanese level, and preferred city."
        image="https://images.unsplash.com/photo-1526481280690-7b7d5a4d2ecb?auto=format&fit=crop&w=1200&q=80"
      />

      <ProgramInfoSection
        title="Who language schools are for"
        items={[
          "Students who want to start learning Japanese from beginner to advanced level.",
          "Students preparing for vocational school or university in Japan.",
          "People who want structured language study combined with life experience in Japan.",
        ]}
      />

      <ProgramInfoSection
        title="Common study goals"
        items={[
          "Improve speaking, listening, reading, and writing skills.",
          "Prepare for JLPT exams such as N5 to N2.",
          "Build a pathway toward further study or future work opportunities in Japan.",
        ]}
      />

      <ProgramInfoSection
        title="Typical intake periods"
        items={[
          "Many language schools in Japan accept students in April, July, October, and January.",
          "The best intake depends on your timing, documents, and school availability.",
          "We help guide students toward a realistic starting period based on their situation.",
        ]}
      />

      <ProgramCTA />

      <Footer />
    </main>
  )
}
