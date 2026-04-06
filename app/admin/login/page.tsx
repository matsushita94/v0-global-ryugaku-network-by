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
      <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center">
        <div className="mb-6 w-full text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Admin
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Use your authorized admin account.
          </p>
        </div>

        <AdminLoginForm />
      </div>
    </div>
  )
}