import Link from "next/link"
import { AdminShell } from "@/components/admin/admin-shell"
import { AdminOverview } from "@/components/admin/admin-overview"
import { adminDashboardCards } from "@/data/admin-navigation"

export default function AdminPage() {
  return (
    <AdminShell
      title="Admin Dashboard"
      description="This is your internal control panel for leads, partners, schools, and website content."
    >
      <div className="space-y-6">
        <AdminOverview />

        <div className="grid gap-4 md:grid-cols-3">
          {adminDashboardCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <h2 className="text-lg font-semibold text-slate-900">{card.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </AdminShell>
  )
}
