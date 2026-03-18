"use client"

import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"

const destinations = [
  "Japan",
  "Canada",
  "Australia",
  "United Kingdom",
  "Europe",
  "Southeast Asia",
  "Other",
]

const programTypes = [
  "Language School",
  "University (Undergraduate)",
  "University (Graduate)",
  "Vocational College",
  "Hospitality School",
  "Study Abroad Program",
]

interface FormData {
  full_name: string
  email: string
  phone: string
  country: string
  nationality: string
  japanese_level: string
  desired_program: string
  desired_city: string
  budget: string
  message: string
}

export const ApplicationForm = forwardRef<{ resetForm: () => void }>(function ApplicationForm(_, ref) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [refCode, setRefCode] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    phone: "",
    country: "",
    nationality: "",
    japanese_level: "",
    desired_program: "",
    desired_city: "",
    budget: "",
    message: "",
  })

  // Extract referral code from URL query parameters
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const ref = params.get("ref")
      if (ref) {
        setRefCode(ref)
      }
    }
  }, [])

  // Expose resetForm method to parent component
  useImperativeHandle(ref, () => ({
    resetForm: () => {
      setIsSubmitted(false)
      setError(null)
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        country: "",
        nationality: "",
        japanese_level: "",
        desired_program: "",
        desired_city: "",
        budget: "",
        message: "",
      })
    },
  }))

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Validate required fields
  const validateForm = (): boolean => {
    if (!formData.full_name.trim()) {
      setError("Please enter your full name")
      return false
    }
    if (!formData.email.trim()) {
      setError("Please enter your email address")
      return false
    }
    if (!formData.country.trim()) {
      setError("Please enter your country of residence")
      return false
    }
    if (!formData.desired_program) {
      setError("Please select a preferred study destination")
      return false
    }
    setError(null)
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Prepare data for Supabase insertion
      // Using environment variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
      const submitData = {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone || null,
        country: formData.country, // Maps to "Country of Residence" label
        nationality: formData.nationality || null, // Maps to "Nationality (Passport)" label
        japanese_level: formData.japanese_level || null,
        desired_program: formData.desired_program,
        desired_city: formData.desired_city || null,
        budget: formData.budget || null,
        school_assigned: null,
        intake: null,
        message: formData.message || null,
        notes: null,
        referral_code: refCode || null,
        status: "new_lead", // Default status
      }

      const { error: insertError } = await supabase
        .from("students")
        .insert([submitData])

      if (insertError) {
        throw new Error(insertError.message)
      }

      setIsSubmitted(true)
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        country: "",
        nationality: "",
        japanese_level: "",
        desired_program: "",
        desired_city: "",
        budget: "",
        message: "",
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to submit application. Please try again."
      setError(message)
      console.error("Form submission error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="apply" className="py-24 bg-primary">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center size-20 rounded-full bg-white/20 mb-6">
              <CheckCircle2 className="size-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Application Received!
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Thank you for your interest in studying abroad. Our team will review your application 
              and contact you within 2-3 business days.
            </p>
            <Button
              variant="outline"
              className="mt-8 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
              onClick={() => setIsSubmitted(false)}
            >
              Submit Another Application
            </Button>
          </div>
        </div>
      </section>
    )
  }

  // Show error message if submission failed
  const showError = error && !isSubmitted

  return (
    <section id="apply" className="py-24 bg-primary">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Start Your Journey
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Fill out the form below and one of our education consultants will contact you to discuss your options.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-xl">
          {showError && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex gap-3">
              <AlertCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <FieldGroup>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="full_name">Full Name</FieldLabel>
                <Input
                  id="full_name"
                  name="full_name"
                  type="text"
                  required
                  placeholder="Your full name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email Address</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="phone">Phone Number (Optional)</FieldLabel>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="country">Country of Residence</FieldLabel>
                <Input
                  id="country"
                  name="country"
                  type="text"
                  required
                  placeholder="Your country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="nationality">Nationality (Passport)</FieldLabel>
                <Input
                  id="nationality"
                  name="nationality"
                  type="text"
                  placeholder="Your nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="japanese_level">Japanese Level (Optional)</FieldLabel>
                <Select
                  value={formData.japanese_level}
                  onValueChange={(value) => handleSelectChange("japanese_level", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="elementary">Elementary</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="native">Native</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="desired_program">Preferred Study Destination</FieldLabel>
                <Select
                  value={formData.desired_program}
                  onValueChange={(value) => handleSelectChange("desired_program", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map((destination) => (
                      <SelectItem key={destination} value={destination.toLowerCase()}>
                        {destination}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="desired_city">Preferred City (Optional)</FieldLabel>
                <Input
                  id="desired_city"
                  name="desired_city"
                  type="text"
                  placeholder="e.g., Tokyo, Vancouver"
                  value={formData.desired_city}
                  onChange={handleInputChange}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="budget">Budget (Optional)</FieldLabel>
                <Input
                  id="budget"
                  name="budget"
                  type="text"
                  placeholder="e.g., $15,000 - $25,000"
                  value={formData.budget}
                  onChange={handleInputChange}
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="message">Message (Optional)</FieldLabel>
              <Textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us about your goals, questions, or any specific requirements..."
                value={formData.message}
                onChange={handleInputChange}
              />
            </Field>
          </FieldGroup>

          <Button
            type="submit"
            size="lg"
            className="w-full mt-8 group"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Start Your Journey"}
            {!isLoading && <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />}
          </Button>
        </form>
      </div>
    </section>
  )
})
