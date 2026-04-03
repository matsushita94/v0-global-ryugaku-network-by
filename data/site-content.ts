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
export type StudyAbroadBenefit = {
  title: string
  description: string
}

export const studyAbroadBenefits: StudyAbroadBenefit[] = [
  {
    title: "Access to New Opportunities",
    description:
      "Studying abroad can open doors to new academic, cultural, and personal experiences that are difficult to gain from staying in one place.",
  },
  {
    title: "Language and Communication Growth",
    description:
      "Living and studying in a different environment helps students improve communication skills, cultural understanding, and confidence.",
  },
  {
    title: "Personal Development",
    description:
      "Students often become more independent, adaptable, and resilient through the experience of studying in another country.",
  },
  {
    title: "Broader Career Perspective",
    description:
      "International study can help students build a wider perspective that supports future career planning and long-term goals.",
  },
]

export type StudyAbroadHighlight = {
  value: string
  label: string
}

export const studyAbroadHighlights: StudyAbroadHighlight[] = [
  {
    value: "Japan",
    label: "Current main focus",
  },
  {
    value: "Step by step",
    label: "Careful network growth",
  },
  {
    value: "Personal",
    label: "Guidance approach",
  },
]
export type Destination = {
  name: string
  description: string
  image: string
}

export const destinations: Destination[] = [
  {
    name: "Tokyo",
    description:
      "A dynamic global city with a wide range of language schools, universities, and career-focused study opportunities.",
    image: "/images/Tokyo.jpg",
  },
  {
    name: "Osaka",
    description:
      "Known for its energy, accessibility, and friendly atmosphere, Osaka is a popular choice for students seeking both study and city life.",
    image: "/images/Osaka.jpg",
  },
  {
    name: "Nagoya",
    description:
      "A major industrial and education hub offering a balance between city life and affordability, with strong opportunities in engineering, manufacturing, and practical study paths.",
    image: "/images/Nagoya.jpg",
  },
  {
    name: "Kyoto",
    description:
      "A city that blends traditional culture with modern education, offering a unique environment for international students.",
    image: "/images/Kyoto.jpg",
  },
]
