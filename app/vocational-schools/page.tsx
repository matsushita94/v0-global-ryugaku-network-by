import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import ProgramHero from "@/components/program-pages/program-hero"
import ProgramInfoSection from "@/components/program-pages/program-info-section"
import ProgramHighlightGrid from "@/components/program-pages/program-highlight-grid"
import ProgramCTA from "@/components/program-pages/program-cta"
import { vocationalSchoolsPageData } from "@/data/program-pages"

export default function VocationalSchoolsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <ProgramHero
        title={vocationalSchoolsPageData.hero.title}
        subtitle={vocationalSchoolsPageData.hero.subtitle}
        image={vocationalSchoolsPageData.hero.image}
        eyebrow={vocationalSchoolsPageData.hero.eyebrow}
        imageAlt={vocationalSchoolsPageData.hero.imageAlt}
      />

      <ProgramHighlightGrid
        title={vocationalSchoolsPageData.highlightSection.title}
        items={vocationalSchoolsPageData.highlightSection.items}
      />

      {vocationalSchoolsPageData.infoSections.map((section) => (
        <ProgramInfoSection
          key={section.title}
          title={section.title}
          background={section.background}
          items={section.items}
        />
      ))}

      <ProgramCTA
        title={vocationalSchoolsPageData.cta.title}
        subtitle={vocationalSchoolsPageData.cta.subtitle}
      />

      <Footer />
    </main>
  )
}
