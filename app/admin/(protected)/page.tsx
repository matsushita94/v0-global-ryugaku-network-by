import Link from "next/link"
import { AdminShell } from "@/components/admin/admin-shell"
import { AdminOverview } from "@/components/admin/admin-overview"

export default function AdminPage() {
  return (
    <AdminShell
      title="Admin Dashboard"
      description="This is your internal control panel for leads, partners, schools, and website content."
    >
      <div className="space-y-6">
        <AdminOverview />

        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/admin/students"
            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <h2 className="text-lg font-semibold text-slate-900">Students</h2>
            <p className="mt-2 text-sm text-slate-600">
              View submitted leads and track application status.
            </p>
          </Link>

          <Link
            href="/admin/partners"
            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <h2 className="text-lg font-semibold text-slate-900">Partners</h2>
            <p className="mt-2 text-sm text-slate-600">
              Manage referral partners, commission structure, and contact details.
            </p>
          </Link>

          <Link
            href="/admin/content"
            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <h2 className="text-lg font-semibold text-slate-900">Content</h2>
            <p className="mt-2 text-sm text-slate-600">
              Edit website text content stored in Supabase.
            </p>
          </Link>
        </div>
      </div>
    </AdminShell>
  )
}
