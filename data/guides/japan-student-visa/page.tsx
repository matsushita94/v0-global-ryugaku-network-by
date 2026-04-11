import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import GuideHero from "@/components/program-pages/guide-hero"
import GuideTimeline from "@/components/program-pages/guide-timeline"
import GuideFaq from "@/components/program-pages/guide-faq"

import { visaGuideHero } from "@/data/guides/japan-student-visa/hero"
import { visaTimeline } from "@/data/guides/japan-student-visa/timeline"
import { visaFaq } from "@/data/guides/japan-student-visa/faq"

export default function VisaGuidePage() {
  return (
    <>
      <Header />

      <main>
        <GuideHero
          eyebrow={visaGuideHero.eyebrow}
          title={visaGuideHero.title}
          description={visaGuideHero.description}
          lastUpdatedLabel="Updated"
          lastUpdatedValue={visaGuideHero.lastUpdated}
          actions={[
            { label: "Apply Now", href: "/#apply" },
            { label: "See Timeline", href: "#timeline", variant: "secondary" },
          ]}
          quickFacts={[
            { label: "Main process", value: "COE → Visa" },
            { label: "Processing time", value: "2–6 months" },
            { label: "Required", value: "School acceptance" },
          ]}
        />

        <GuideTimeline title="Visa Process" items={visaTimeline} />

        <GuideFaq title="Visa FAQ" items={visaFaq} />
      </main>

      <Footer />
    </>
  )
}