"use client"

import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"

const japaneseLevels = ["Beginner", "Elementary", "Intermediate", "Advanced", "Native"]

const programTypes = [
  "Language School",
  "University (Undergraduate)",
  "University (Graduate)",
  "Vocational College",
  "Hospitality School",
  "Study Abroad Program",
]

type FormData = {
  full_name: string
  email: string
  phone: string
  country: string
  desired_program: string
  message: string
}

const initialFormData: FormData = {
  full_name: "",
  email: "",
  phone: "",
  country: "",
  desired_program: "",
  message: "",
}

export const ApplicationForm = forwardRef<{ resetForm: () => void }>(function ApplicationForm(_, ref) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const resetForm = () => {
    setIsSubmitted(false)
    setError(null)
    setIsLoading(false)
    setFormData(initialFormData)
  }

  useImperativeHandle(ref, () => ({
    resetForm,
  }))

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      desired_program: value,
    }))
  }

  const validateForm = () => {
    if (!formData.full_name.trim()) return "Please enter your full name"
    if (!formData.email.trim()) return "Please enter your email"
    if (!formData.country.trim()) return "Please enter your country"
    if (!formData.desired_program) return "Please select a program"
    return null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { error: insertError } = await supabase.from("students").insert([
        {
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone || null,
          country: formData.country,
          desired_program: formData.desired_program,
          message: formData.message || null,
          status: "new_lead",
        },
      ])

      if (insertError) throw new Error(insertError.message)

      setIsSubmitted(true)
      setFormData(initialFormData)
    } catch (err) {
      setError("Submission failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="apply" className="bg-blue-700 section-spacing text-white">
        <div className="section-container text-center">
          <CheckCircle2 className="mx-auto mb-6 h-16 w-16" />
          <h2 className="section-title text-white">Application Received</h2>
          <p className="mt-4 text-lg opacity-90">
            We will contact you within 1–2 days.
          </p>

          <Button
            variant="outline"
            className="mt-6 border-white text-white hover:bg-white hover:text-blue-700"
            onClick={resetForm}
          >
            Submit Another
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section id="apply" className="bg-slate-50 section-spacing">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Apply</p>

          <h2 className="section-title">
            Start Your Journey
          </h2>

          <p className="section-subtext mx-auto">
            Fill in the form and we will guide you step by step.
          </p>
        </div>

        {error && (
          <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 flex gap-3">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-10 premium-card max-w-3xl mx-auto">
          <FieldGroup>
            <div className="grid gap-6 md:grid-cols-2">
              <Field>
                <FieldLabel>Full Name</FieldLabel>
                <Input name="full_name" value={formData.full_name} onChange={handleInputChange} required />
              </Field>

              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              </Field>

              <Field>
                <FieldLabel>Phone (Optional)</FieldLabel>
                <Input name="phone" value={formData.phone} onChange={handleInputChange} />
              </Field>

              <Field>
                <FieldLabel>Country</FieldLabel>
                <Input name="country" value={formData.country} onChange={handleInputChange} required />
              </Field>

              <Field className="md:col-span-2">
                <FieldLabel>Desired Program</FieldLabel>
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select program" />
                  </SelectTrigger>
                  <SelectContent>
                    {programTypes.map((program) => (
                      <SelectItem key={program} value={program}>
                        {program}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field className="mt-6">
              <FieldLabel>Message (Optional)</FieldLabel>
              <Textarea name="message" value={formData.message} onChange={handleInputChange} rows={4} />
            </Field>
          </FieldGroup>

          <Button type="submit" className="w-full mt-8" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Start Your Journey"}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </div>
    </section>
  )
})
