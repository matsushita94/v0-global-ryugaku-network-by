import { redirect } from "next/navigation"
import { AdminLoginForm } from "@/components/admin/admin-login-form"
import { createClient } from "@/lib/supabase/server"

function parseAdminEmails(value: string | undefined) {
  if (!value) {
    return []
  }

  return value
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

export default async function AdminLoginPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const adminEmails = parseAdminEmails(process.env.ADMIN_EMAILS)
  const isAllowedAdmin =
    !!user &&
    (adminEmails.length === 0 ||
      adminEmails.includes((user.email ?? "").toLowerCase()))

  if (isAllowedAdmin) {
    redirect("/admin")
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10 text-slate-900 md:px-6">
      <AdminLoginForm />
    </div>
  )
}
