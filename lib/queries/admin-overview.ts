import { supabase } from "@/lib/supabase"
import type { OverviewCounts } from "@/lib/types/admin"

export async function getAdminOverviewCounts(): Promise<OverviewCounts> {
  const [studentsRes, partnersRes, schoolsRes, contentRes] = await Promise.all([
    supabase.from("students").select("*", { count: "exact", head: true }),
    supabase.from("partners").select("*", { count: "exact", head: true }),
    supabase.from("schools").select("*", { count: "exact", head: true }),
    supabase.from("site_content").select("*", { count: "exact", head: true }),
  ])

  const firstError =
    studentsRes.error ||
    partnersRes.error ||
    schoolsRes.error ||
    contentRes.error

  if (firstError) {
    throw new Error(firstError.message)
  }

  return {
    students: studentsRes.count ?? 0,
    partners: partnersRes.count ?? 0,
    schools: schoolsRes.count ?? 0,
    siteContent: contentRes.count ?? 0,
  }
}
