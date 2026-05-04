export type ProgramItem = {
  title: string
  description: string
}

export const programs: ProgramItem[] = [
  {
    title: "Language Schools",
    description:
      "Study Japanese in Japan through beginner to advanced programs designed for international students.",
  },
  {
    title: "Vocational Schools",
    description:
      "Build practical skills in areas such as business, IT, design, hospitality, and more.",
  },
  {
    title: "University Pathways",
    description:
      "Prepare for higher education opportunities in Japan with guidance on study routes and requirements.",
  },
]

export type AboutFeatureIconName =
  | "Building2"
  | "Users"
  | "GraduationCap"
  | "CheckCircle"

export type AboutFeature = {
  iconName: AboutFeatureIconName
  title: string
  description: string
}

export const aboutFeatures: AboutFeature[] = [
  {
    iconName: "Building2",
    title: "Japan-Focused Support",
    description:
      "We are currently focused on helping students explore education opportunities in Japan with practical guidance and clear next steps.",
  },
  {
    iconName: "Users",
    title: "Student-Centered Approach",
    description:
      "We aim to make the process easier to understand by keeping communication personal, clear, and supportive.",
  },
  {
    iconName: "GraduationCap",
    title: "Education Pathway Guidance",
    description:
      "From language schools to vocational and future academic pathways, we help students understand their available options.",
  },
  {
    iconName: "CheckCircle",
    title: "Growing Step by Step",
    description:
      "Our long-term vision is global, but we are building carefully by starting with Japan and improving the system over time.",
  },
]

export type StudyAbroadReason = {
  title: string
  description: string
}

export const whyStudyAbroadReasons: StudyAbroadReason[] = [
  {
    title: "Broaden your perspective",
    description:
      "Experience new cultures, new ways of thinking, and a more global view of education and life.",
  },
  {
    title: "Build language skills",
    description:
      "Improve communication skills through real-world daily use and immersive learning environments.",
  },
  {
    title: "Grow personally",
    description:
      "Living and studying abroad can help build confidence, independence, and adaptability.",
  },
  {
    title: "Create future opportunities",
    description:
      "International study can open paths to new academic, career, and personal possibilities.",
  },
]

export type DestinationItem = {
  title: string
  description: string
  image: string
}

export const destinations: DestinationItem[] = [
  {
    title: "Tokyo",
    description:
      "A dynamic global city with a wide range of schools, lifestyles, and opportunities.",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Osaka",
    description:
      "A lively city known for its energy, culture, and strong student appeal.",
    image:
      "https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Kyoto",
    description:
      "A city that blends tradition and study in a unique cultural setting.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
  },
]

export type ContactInfoItem = {
  label: string
  value: string
  href?: string
}

export const contactInfo: ContactInfoItem[] = [
  {
    label: "Email",
    value: "info@globalryugakunetwork.com",
    href: "mailto:info@globalryugakunetwork.com",
  },
  {
    label: "Phone",
    value: "+81 70-9066-5906",
    href: "tel:+817090665906",
  },
  {
    label: "Location",
    value: "Wakayama, Japan",
  },
]

export type PartnerFeature = {
  title: string
  description: string
}

export const partnerFeatures: PartnerFeature[] = [
  {
    title: "School Partnerships",
    description:
      "We aim to build relationships with schools and education providers that value student support and clear communication.",
  },
  {
    title: "Referral Opportunities",
    description:
      "We are building a network where trusted partners can connect students with the right education opportunities.",
  },
  {
    title: "Long-Term Growth",
    description:
      "Our goal is to grow a reliable education network step by step, starting with Japan.",
  },
]
