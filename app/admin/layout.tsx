import { redirect } from "next/navigation"
import { ReactNode } from "react"
import { createClient } from "@/lib/supabase/server"

type AdminLayoutProps = {
  children: ReactNode
}

function parseAdminEmails(value: string | undefined) {
  if (!value) {
    return []
  }

  return value
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const adminEmails = parseAdminEmails(process.env.ADMIN_EMAILS)
  const isAllowedAdmin =
    !!user &&
    (adminEmails.length === 0 ||
      adminEmails.includes((user.email ?? "").toLowerCase()))

  if (!isAllowedAdmin) {
    redirect("/admin/login")
  }

  return children
}
