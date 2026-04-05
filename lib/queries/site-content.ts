import { supabase } from "@/lib/supabase"
import type { ContentRow } from "@/lib/types/admin"

export async function getSiteContentItems(): Promise<ContentRow[]> {
  const { data, error } = await supabase
    .from("site_content")
    .select("id, section, field, value, updated_at")
    .order("section", { ascending: true })
    .order("field", { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []) as ContentRow[]
}

export async function updateSiteContentValue(id: string, value: string) {
  const { error } = await supabase
    .from("site_content")
    .update({ value })
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }
}
