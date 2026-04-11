export type GuideHeroAction = {
  label: string
  href: string
  variant?: "primary" | "secondary"
}

export type GuideFact = {
  label: string
  value: string
}

export type GuideSectionLink = {
  label: string
  href: string
}

export type GuideTimelineItem = {
  stage: string
  description: string
}

export type GuideFaqItem = {
  question: string
  answer: string
}

export type GuideRelatedItem = {
  title: string
  description: string
  href: string
}

export type GuidePageData = {
  seo: {
    title: string
    description: string
  }
  hero: {
    eyebrow: string
    title: string
    description: string
    lastUpdatedLabel: string
    lastUpdatedValue: string
    actions: GuideHeroAction[]
    quickFacts: GuideFact[]
  }
  tableOfContents: GuideSectionLink[]
  introSection: {
    id: string
    title: string
    paragraphs: string[]
  }
  timelineSection: {
    id: string
    title: string
    items: GuideTimelineItem[]
  }
  faqSection: {
    id: string
    title: string
    items: GuideFaqItem[]
  }
  relatedSection: {
    title: string
    items: GuideRelatedItem[]
  }
  ctaSection: {
    id: string
    title: string
    subtitle: string
  }
}

export const japanStudentVisaGuideData: GuidePageData = {
  seo: {
    title: "Japan Student Visa Guide | COE, Process, and Requirements",
    description:
      "Understand the Japan student visa process, including COE, basic timeline, common requirements, and practical next steps.",
  },
  hero: {
    eyebrow: "Japan Student Visa Guide",
    title: "Japan Student Visa: COE, Process, and Requirements",
    description:
      "A clear guide to how the Japan student visa process usually works, including school application flow, COE, visa application, and what students should prepare for.",
    lastUpdatedLabel: "Updated",
    lastUpdatedValue: "April 2026",
    actions: [
      {
        label: "Start Your Application",
        href: "#apply",
        variant: "primary",
      },
      {
        label: "Jump to Timeline",
        href: "#timeline",
        variant: "secondary",
      },
    ],
    quickFacts: [
      {
        label: "Core process",
        value: "School → COE → Visa",
      },
      {
        label: "Best preparation",
        value: "Several months ahead",
      },
      {
        label: "Main goal",
        value: "Student visa approval",
      },
    ],
  },
  tableOfContents: [
    { label: "What the visa process looks like", href: "#overview" },
    { label: "Step-by-step timeline", href: "#timeline" },
    { label: "Frequently asked questions", href: "#faq" },
    { label: "Apply now", href: "#apply" },
  ],
  introSection: {
    id: "overview",
    title: "What the Visa Process Usually Looks Like",
    paragraphs: [
      "For many students, the visa process starts with choosing a suitable school and preparing the school application documents. The school usually checks the application first before submitting materials for immigration review.",
      "After acceptance and document review, the school may proceed with the Certificate of Eligibility process, often called the COE. Once the COE is issued, the student usually applies for the actual visa at a Japanese embassy or consulate.",
      "Exact requirements can differ depending on the school, the student’s background, and the local embassy or consulate handling the visa.",
    ],
  },
  timelineSection: {
    id: "timeline",
    title: "Step-by-Step Visa Timeline",
    items: [
      {
        stage: "Choose a school and prepare your file",
        description:
          "Compare schools, confirm your intake timing, and gather the core academic, identity, and financial documents needed for screening.",
      },
      {
        stage: "Submit your school application",
        description:
          "The school reviews your application and may request corrections, extra documents, or written explanations.",
      },
      {
        stage: "COE submission process",
        description:
          "After the school accepts your application, it may submit the immigration-related documents for Certificate of Eligibility processing.",
      },
      {
        stage: "Receive the COE",
        description:
          "If approved, the COE is issued and used as part of the next visa step.",
      },
      {
        stage: "Apply for the student visa",
        description:
          "The student normally applies at the appropriate Japanese embassy or consulate using the required documents for that location.",
      },
      {
        stage: "Prepare for travel and arrival",
        description:
          "After visa approval, the student finalizes travel, accommodation, and school arrival instructions.",
      },
    ],
  },
  faqSection: {
    id: "faq",
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What is a COE?",
        answer:
          "COE stands for Certificate of Eligibility. It is commonly used in the student visa process before applying for the actual visa.",
      },
      {
        question: "Do I apply for the visa myself?",
        answer:
          "In many cases, yes. After the COE stage, the student typically applies at the relevant Japanese embassy or consulate.",
      },
      {
        question: "How long does the process take?",
        answer:
          "The full process can take several months depending on the school, document readiness, corrections, and immigration timing.",
      },
      {
        question: "Can requirements vary?",
        answer:
          "Yes. Schools and embassies can request different supporting documents depending on the case.",
      },
    ],
  },
  relatedSection: {
    title: "Related Guides",
    items: [
      {
        title: "Study in Japan Guide",
        description:
          "See the wider application, timing, and document picture for studying in Japan.",
        href: "/study-in-japan-guide",
      },
      {
        title: "Language Schools",
        description:
          "Explore the most common starting path for students beginning their study journey in Japan.",
        href: "/language-schools",
      },
      {
        title: "Vocational Schools",
        description:
          "See practical and career-focused education options in Japan.",
        href: "/vocational-schools",
      },
    ],
  },
  ctaSection: {
    id: "apply",
    title: "Start Your Japan Study Plan",
    subtitle:
      "Tell us about your goals and timeline, and we will guide you toward a suitable next step.",
  },
}