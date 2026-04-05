import { AdminShell } from "@/components/admin/admin-shell"
import { PartnersTable } from "@/components/admin/partners-table"

export default function AdminPartnersPage() {
  return (
    <AdminShell
      title="Partners"
      description="View referral partners, commission information, and contact details."
    >
      <PartnersTable />
    </AdminShell>
  )
}
