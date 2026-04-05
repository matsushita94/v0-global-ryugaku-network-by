import { supabase } from "@/lib/supabase"
import type { StudentRow } from "@/lib/types/admin"

export async function getStudents(): Promise<StudentRow[]> {
  const { data, error } = await supabase
    .from("students")
    .select(
      "id, created_at, first_name, last_name, email, phone, nationality, country_of_residence, desired_program, desired_city, referral_code, source, students_lead_status"
    )
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []) as StudentRow[]
}
