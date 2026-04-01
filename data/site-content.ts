export type Program = {
  iconName: string
  title: string
  href?: string
  description: string
  features: string[]
}

export const programs: Program[] = [
  {
    iconName: "Languages",
    title: "Language Schools",
    href: "/language-schools",
    description:
      "Japanese language programs designed to help students build fluency, confidence, and daily communication skills.",
    features: [
      "Short-term and long-term courses",
      "Multiple proficiency levels",
      "Language and cultural immersion",
    ],
  },
  {
    iconName: "Building2",
    title: "Universities",
    description:
      "Undergraduate and postgraduate study options for students who want to pursue higher education in Japan.",
    features: [
      "Bachelor's and Master's pathways",
      "Academic progression support",
      "Long-term study opportunities",
    ],
  },
  {
    iconName: "Briefcase",
    title: "Vocational Schools",
    href: "/vocational-schools",
    description:
      "Practical, career-focused education for students who want hands-on training and industry-relevant skills.",
    features: [
      "Applied learning environment",
      "Career-oriented programs",
      "Specialized study options",
    ],
  },
  {
    iconName: "Utensils",
    title: "Hospitality Education",
    description:
      "Programs suited to students interested in hospitality, service, tourism, and related professional pathways.",
    features: [
      "Hospitality-focused learning",
      "Service industry preparation",
      "Practical career direction",
    ],
  },
  {
    iconName: "Plane",
    title: "Future Global Pathways",
    description:
      "As our network grows, we plan to expand into wider international study opportunities beyond Japan.",
    features: [
      "Careful step-by-step expansion",
      "Future destination growth",
      "Long-term global vision",
    ],
  },
]

export type AboutFeature = {
  iconName: string
  title: string
  description: string
}

export const aboutFeatures: AboutFeature[] = [
  {
    iconName: "Building2",
    title: "Japan-Focused Network",
    description:
      "We are currently focused on building relationships with schools and education providers in Japan.",
  },
  {
    iconName: "Users",
    title: "Personalized Support",
    description:
      "We provide guidance based on each student's goals, background, and study plans.",
  },
  {
    iconName: "GraduationCap",
    title: "Practical Study Paths",
    description:
      "We focus on language schools, vocational schools, and universities in Japan.",
  },
  {
    iconName: "CheckCircle",
    title: "Application Guidance",
    description:
      "We help students understand the application process and prepare for studying in Japan.",
  },
]
