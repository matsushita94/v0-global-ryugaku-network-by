export type OverviewCounts = {
  students: number
  partners: number
  schools: number
  siteContent: number
}

export type StudentRow = {
  id: string
  created_at: string | null
  first_name: string | null
  last_name: string | null
  email: string | null
  phone: string | null
  nationality: string | null
  country_of_residence: string | null
  desired_program: string | null
  desired_city: string | null
  referral_code: string | null
  source: string | null
  students_lead_status: string | null
}

export type PartnerRow = {
  id: string
  created_at: string | null
  partner_name: string | null
  partner_type: string | null
  country: string | null
  contact_person: string | null
  contact_email: string | null
  contact_phone: string | null
  referral_code: string | null
  commission_amount: number | null
  commission_currency: string | null
  payment_terms: string | null
  status: string | null
}

export type ContentRow = {
  id: string
  section: string
  field: string
  value: string
  updated_at: string | null
}
