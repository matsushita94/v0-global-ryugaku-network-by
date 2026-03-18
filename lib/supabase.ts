import { createClient } from '@supabase/supabase-js'

// Environment variables used:
// - NEXT_PUBLIC_SUPABASE_URL: The public Supabase project URL
// - NEXT_PUBLIC_SUPABASE_ANON_KEY: The public Supabase anonymous key for client-side authentication

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY)')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
