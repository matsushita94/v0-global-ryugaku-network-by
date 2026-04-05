import { supabase } from "@/lib/supabase"
import type { PartnerRow } from "@/lib/types/admin"

export async function getPartners(): Promise<PartnerRow[]> {
  const { data, error } = await supabase
    .from("partners")
    .select(
      "id, created_at, partner_name, partner_type, country, contact_person, contact_email, contact_phone, referral_code, commission_amount, commission_currency, payment_terms, status"
    )
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []) as PartnerRow[]
}
