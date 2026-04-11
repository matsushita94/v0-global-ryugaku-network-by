import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import ProgramHero from "@/components/program-pages/program-hero"
import ProgramInfoSection from "@/components/program-pages/program-info-section"
import ProgramHighlightGrid from "@/components/program-pages/program-highlight-grid"
import ProgramCTA from "@/components/program-pages/program-cta"
import { languageSchoolsPageData } from "@/data/program-pages"

export default function LanguageSchoolsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <ProgramHero
        title={languageSchoolsPageData.hero.title}
        subtitle={languageSchoolsPageData.hero.subtitle}
        image={languageSchoolsPageData.hero.image}
        eyebrow={languageSchoolsPageData.hero.eyebrow}
        imageAlt={languageSchoolsPageData.hero.imageAlt}
      />

      <ProgramHighlightGrid
        title={languageSchoolsPageData.highlightSection.title}
        items={languageSchoolsPageData.highlightSection.items}
      />

      {languageSchoolsPageData.infoSections.map((section) => (
        <ProgramInfoSection
          key={section.title}
          title={section.title}
          background={section.background}
          items={section.items}
        />
      ))}

      <ProgramCTA
        title={languageSchoolsPageData.cta.title}
        subtitle={languageSchoolsPageData.cta.subtitle}
      />

      <Footer />
    </main>
  )
}