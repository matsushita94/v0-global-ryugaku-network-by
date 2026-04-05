import { AdminShell } from "@/components/admin/admin-shell"
import { ContentEditor } from "@/components/admin/content-editor"

export default function AdminContentPage() {
  return (
    <AdminShell
      title="Website Content"
      description="Edit text values from the site_content table. This is the first step toward a real CMS."
    >
      <ContentEditor />
    </AdminShell>
  )
}
