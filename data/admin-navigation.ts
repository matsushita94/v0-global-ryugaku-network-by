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
