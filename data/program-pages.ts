export type ProgramPageHero = {
  title: string
  subtitle: string
  image: string
  eyebrow: string
  imageAlt: string
}

export type ProgramPageHighlightItem = {
  title: string
  description: string
}

export type ProgramPageInfoSection = {
  title: string
  background: "white" | "slate"
  items: string[]
}

export type ProgramPageCta = {
  title: string
  subtitle: string
}

export type ProgramPageData = {
  hero: ProgramPageHero
  highlightSection: {
    title: string
    items: ProgramPageHighlightItem[]
  }
  infoSections: ProgramPageInfoSection[]
  cta: ProgramPageCta
}

export const languageSchoolsPageData: ProgramPageData = {
  hero: {
    title: "Japanese Language Schools in Japan",
    subtitle:
      "We help students explore suitable language school options in Japan based on their goals, current Japanese level, and preferred city.",
    image:
      "https://images.unsplash.com/photo-1526481280690-7b7d5a4d2ecb?auto=format&fit=crop&w=1200&q=80",
    eyebrow: "Language Schools",
    imageAlt: "Students studying in Japan",
  },
  highlightSection: {
    title: "Why students choose language schools",
    items: [
      {
        title: "Beginner Friendly",
        description:
          "Language schools are one of the most accessible starting points for students who want to begin studying Japanese in Japan.",
      },
      {
        title: "Flexible Pathways",
        description:
          "They can support students who want to improve daily communication, prepare for JLPT, or continue toward higher education.",
      },
      {
        title: "Structured Learning",
        description:
          "Students benefit from a clear learning environment, regular classes, and immersion in Japanese daily life.",
      },
    ],
  },
  infoSections: [
    {
      title: "Who language schools are for",
      background: "slate",
      items: [
        "Students who want to start learning Japanese from beginner to advanced level.",
        "Students preparing for vocational school or university in Japan.",
        "People who want structured language study combined with life experience in Japan.",
      ],
    },
    {
      title: "Common study goals",
      background: "white",
      items: [
        "Improve speaking, listening, reading, and writing skills.",
        "Prepare for JLPT exams such as N5 to N2.",
        "Build a pathway toward further study or future work opportunities in Japan.",
      ],
    },
    {
      title: "Typical intake periods",
      background: "slate",
      items: [
        "Many language schools in Japan accept students in April, July, October, and January.",
        "The best intake depends on your timing, documents, and school availability.",
        "We help guide students toward a realistic starting period based on their situation.",
      ],
    },
  ],
  cta: {
    title: "Ask About Language School Options",
    subtitle:
      "Tell us your study goals, preferred city, and current Japanese level so we can guide you toward a suitable next step.",
  },
}

export const vocationalSchoolsPageData: ProgramPageData = {
  hero: {
    title: "Vocational Schools in Japan",
    subtitle:
      "We help students explore practical and career-focused education in Japan, including fields such as hospitality, business, IT, design, and other specialized pathways.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    eyebrow: "Vocational Schools",
    imageAlt: "Students in a practical learning environment",
  },
  highlightSection: {
    title: "Why students choose vocational schools",
    items: [
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
    ],
  },
  infoSections: [
    {
      title: "Who vocational schools are for",
      background: "slate",
      items: [
        "Students who want practical skills for a specific career path.",
        "Students interested in hands-on learning rather than purely academic study.",
        "People aiming to build expertise in industries such as hospitality, IT, business, design, and service-related work.",
      ],
    },
    {
      title: "Common study fields",
      background: "white",
      items: [
        "Hospitality and tourism.",
        "Business and management.",
        "Information technology and digital skills.",
        "Design, creative fields, and other specialized training areas.",
      ],
    },
    {
      title: "Important things to know",
      background: "slate",
      items: [
        "Vocational schools often require a clearer career goal than language schools.",
        "Some programs may expect a higher level of Japanese ability depending on the course.",
        "We help students understand which pathways may be realistic based on their background and goals.",
      ],
    },
  ],
  cta: {
    title: "Ask About Vocational School Pathways",
    subtitle:
      "Tell us your interests, study goals, and Japanese level so we can help you explore realistic vocational options in Japan.",
  },
}
