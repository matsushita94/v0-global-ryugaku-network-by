-- Create students table for Global Ryugaku Network lead tracking
-- This table stores student inquiries from the application form

CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Contact Information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Location & Background
  country TEXT NOT NULL,
  nationality TEXT,
  japanese_level TEXT,
  
  -- Study Preferences
  desired_program TEXT NOT NULL,
  desired_city TEXT,
  budget TEXT,
  
  -- Administrative
  school_assigned TEXT,
  intake TEXT,
  message TEXT,
  notes TEXT,
  referral_code TEXT,
  status TEXT DEFAULT 'new_lead'
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS students_email_idx ON public.students(email);

-- Create index on status for filtering leads
CREATE INDEX IF NOT EXISTS students_status_idx ON public.students(status);

-- Create index on referral_code for tracking referrals
CREATE INDEX IF NOT EXISTS students_referral_code_idx ON public.students(referral_code);

-- Enable Row Level Security
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for the public form)
-- This allows anyone to submit an application without authentication
CREATE POLICY "Allow anonymous inserts" ON public.students
  FOR INSERT
  WITH CHECK (true);

-- Note: For admin access to read/update/delete students, 
-- you would add additional policies with authentication checks
