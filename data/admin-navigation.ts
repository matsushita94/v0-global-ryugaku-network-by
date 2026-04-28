export type AdminNavigationItem = {
  label: string
  href: string
  description: string
}

export const adminNavigation: AdminNavigationItem[] = [
  {
    label: "Overview",
    href: "/admin",
    description: "Admin home",
  },
  {
    label: "Students",
    href: "/admin/students",
    description: "Manage student leads",
  },
  {
    label: "Partners",
    href: "/admin/partners",
    description: "Manage partners and referral codes",
  },
  {
    label: "Content",
    href: "/admin/content",
    description: "Edit website text content",
  },
]

// ADD THIS NEW EXPORT:
export const adminDashboardCards = [
  {
    href: "/admin/students",
    title: "Students",
    description: "View submitted leads and track application status.",
  },
  {
    href: "/admin/partners",
    title: "Partners",
    description: "Manage referral partners, commission structure, and contact details.",
  },
  {
    href: "/admin/content",
    title: "Content",
    description: "Edit website text content stored in Supabase.",
  },
]
