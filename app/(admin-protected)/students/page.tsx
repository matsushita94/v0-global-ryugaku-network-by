import { AdminShell } from "@/components/admin/admin-shell"
import { StudentsTable } from "@/components/admin/students-table"

export default function AdminStudentsPage() {
  return (
    <AdminShell
      title="Students"
      description="View the students table from Supabase. This is your lead management base."
    >
      <StudentsTable />
    </AdminShell>
  )
}
