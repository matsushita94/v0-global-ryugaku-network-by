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

const currencies = [
  { code: "USD", label: "US Dollar" },
  { code: "EUR", label: "Euro" },
  { code: "GBP", label: "British Pound" },
  { code: "JPY", label: "Japanese Yen" },
  { code: "AUD", label: "Australian Dollar" },
  { code: "CAD", label: "Canadian Dollar" },
  { code: "CNY", label: "Chinese Yuan" },
  { code: "INR", label: "Indian Rupee" },
  { code: "PHP", label: "Philippine Peso" },
  { code: "NPR", label: "Nepalese Rupee" },
  { code: "SGD", label: "Singapore Dollar" },
  { code: "THB", label: "Thai Baht" },
  { code: "VND", label: "Vietnamese Dong" },
  { code: "KRW", label: "South Korean Won" },
  { code: "MYR", label: "Malaysian Ringgit" },
  { code: "IDR", label: "Indonesian Rupiah" },
  { code: "NZD", label: "New Zealand Dollar" },
  { code: "CHF", label: "Swiss Franc" },
  { code: "SEK", label: "Swedish Krona" },
  { code: "NOK", label: "Norwegian Krone" },
  { code: "DKK", label: "Danish Krone" },
  { code: "BRL", label: "Brazilian Real" },
  { code: "ZAR", label: "South African Rand" },
  { code: "HKD", label: "Hong Kong Dollar" },
  { code: "TWD", label: "Taiwan Dollar" },
]

const countryPhoneCodes = [
  { code: "+81", label: "Japan (+81)" },
  { code: "+1", label: "United States / Canada (+1)" },
  { code: "+44", label: "United Kingdom (+44)" },
  { code: "+61", label: "Australia (+61)" },
  { code: "+64", label: "New Zealand (+64)" },
  { code: "+33", label: "France (+33)" },
  { code: "+49", label: "Germany (+49)" },
  { code: "+39", label: "Italy (+39)" },
  { code: "+34", label: "Spain (+34)" },
  { code: "+31", label: "Netherlands (+31)" },
  { code: "+41", label: "Switzerland (+41)" },
  { code: "+46", label: "Sweden (+46)" },
  { code: "+47", label: "Norway (+47)" },
  { code: "+45", label: "Denmark (+45)" },
  { code: "+65", label: "Singapore (+65)" },
  { code: "+60", label: "Malaysia (+60)" },
  { code: "+66", label: "Thailand (+66)" },
  { code: "+62", label: "Indonesia (+62)" },
  { code: "+63", label: "Philippines (+63)" },
  { code: "+84", label: "Vietnam (+84)" },
  { code: "+82", label: "South Korea (+82)" },
  { code: "+86", label: "China (+86)" },
  { code: "+852", label: "Hong Kong (+852)" },
  { code: "+886", label: "Taiwan (+886)" },
  { code: "+91", label: "India (+91)" },
  { code: "+977", label: "Nepal (+977)" },
  { code: "+55", label: "Brazil (+55)" },
  { code: "+27", label: "South Africa (+27)" },
]

const budgetPeriods = ["Total budget", "Per year", "Per month"]

type FormData = {
  full_name: string
  email: string
  phone_country_code: string
  phone_local_number: string
  country: string
  nationality: string
  japanese_level: string
  desired_program: string
  desired_city: string
  budget_amount: string
  budget_currency: string
  budget_period: string
  message: string
}

const initialFormData: FormData = {
  full_name: "",
  email: "",
  phone_country_code: "+81",
  phone_local_number: "",
  country: "",
  nationality: "",
  japanese_level: "",
  desired_program: "",
  desired_city: "",
  budget_amount: "",
  budget_currency: "",
  budget_period: "",
  message: "",
}

export const ApplicationForm = forwardRef<{ resetForm: () => void }>(function ApplicationForm(_, ref) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [refCode, setRefCode] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>(initialFormData)

  useEffect(() => {
    if (typeof window === "undefined") return
    const params = new URLSearchParams(window.location.search)
    const ref = params.get("ref")
    if (ref) setRefCode(ref)
  }, [])

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

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const normalizePhoneNumber = (countryCode: string, localNumber: string) => {
    const digitsOnly = localNumber.replace(/\D/g, "")
    if (!digitsOnly) return null

    const normalizedLocal = digitsOnly.startsWith("0") ? digitsOnly.slice(1) : digitsOnly
    return `${countryCode}${normalizedLocal}`
  }

  const validateForm = () => {
    if (!formData.full_name.trim()) return "Please enter your full name"
    if (!formData.email.trim()) return "Please enter your email address"
    if (!formData.country.trim()) return "Please enter your country of residence"
    if (!formData.desired_program) return "Please select your desired program"

    if (formData.phone_local_number && !formData.phone_country_code) {
      return "Please select a phone country code"
    }

    if (formData.budget_amount && Number(formData.budget_amount) <= 0) {
      return "Budget amount must be greater than 0"
    }

    if (formData.budget_amount && !formData.budget_currency) {
      return "Please select a budget currency"
    }

    if (formData.budget_amount && !formData.budget_period) {
      return "Please select a budget period"
    }

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
      const combinedPhone = normalizePhoneNumber(
        formData.phone_country_code,
        formData.phone_local_number
      )

      const submitData = {
        full_name: formData.full_name,
        email: formData.email,
        phone: combinedPhone,
        country: formData.country,
        nationality: formData.nationality || null,
        japanese_level: formData.japanese_level || null,
        desired_program: formData.desired_program,
        desired_city: formData.desired_city || null,
        budget_amount: formData.budget_amount ? Number(formData.budget_amount) : null,
        budget_currency: formData.budget_currency || null,
        budget_period: formData.budget_period || null,
        school_assigned: null,
        intake: null,
        message: formData.message || null,
        notes: null,
        referral_code: refCode || null,
        status: "new_lead",
      }

      const { error: insertError } = await supabase.from("students").insert([submitData])

      if (insertError) {
        console.error("Supabase insert error:", insertError)
        throw new Error(insertError.message)
      }

      setIsSubmitted(true)
      setFormData(initialFormData)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to submit application. Please try again."
      setError(message)
      console.error("Form submission error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="apply" className="py-20 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-2xl">
            <CheckCircle2 className="mx-auto mb-6 h-16 w-16" />
            <h2 className="text-4xl font-bold mb-4">Application Received!</h2>
            <p className="text-xl opacity-90 mb-8">
              Thank you for your interest in studying abroad. Our team will review your application and
              contact you within 2–3 business days.
            </p>
            <Button
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white hover:text-blue-700"
              onClick={resetForm}
            >
              Submit Another Application
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="apply" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">Start Your Journey</h2>
            <p className="text-lg text-slate-600">
              Fill out the form below and one of our education consultants will contact you to discuss your
              options.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-sm border">
            <FieldGroup>
              <div className="grid gap-6 md:grid-cols-2">
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel>Email Address</FieldLabel>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel>Phone Country Code (Optional)</FieldLabel>
                  <Select
                    value={formData.phone_country_code}
                    onValueChange={(value) => handleSelectChange("phone_country_code", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country code" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryPhoneCodes.map((item) => (
                        <SelectItem key={item.code} value={item.code}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel>Phone Number (Optional)</FieldLabel>
                  <Input
                    name="phone_local_number"
                    value={formData.phone_local_number}
                    onChange={handleInputChange}
                    placeholder="Enter number without country code"
                  />
                </Field>

                <Field>
                  <FieldLabel>Country of Residence</FieldLabel>
                  <Input
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel>Nationality (Passport)</FieldLabel>
                  <Input
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                  />
                </Field>

                <Field>
                  <FieldLabel>Japanese Level (Optional)</FieldLabel>
                  <Select
                    value={formData.japanese_level}
                    onValueChange={(value) => handleSelectChange("japanese_level", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {japaneseLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel>Desired Program</FieldLabel>
                  <Select
                    value={formData.desired_program}
                    onValueChange={(value) => handleSelectChange("desired_program", value)}
                  >
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

                <Field>
                  <FieldLabel>Preferred City (Optional)</FieldLabel>
                  <Input
                    name="desired_city"
                    value={formData.desired_city}
                    onChange={handleInputChange}
                  />
                </Field>

                <Field>
                  <FieldLabel>Budget Amount (Optional)</FieldLabel>
                  <Input
                    type="number"
                    min="0"
                    step="any"
                    name="budget_amount"
                    value={formData.budget_amount}
                    onChange={handleInputChange}
                    placeholder="e.g. 1000000"
                  />
                </Field>

                <Field>
                  <FieldLabel>Budget Currency (Optional)</FieldLabel>
                  <Select
                    value={formData.budget_currency}
                    onValueChange={(value) => handleSelectChange("budget_currency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.code} - {currency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel>Budget Period (Optional)</FieldLabel>
                  <Select
                    value={formData.budget_period}
                    onValueChange={(value) => handleSelectChange("budget_period", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetPeriods.map((period) => (
                        <SelectItem key={period} value={period}>
                          {period}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <Field className="mt-6">
                <FieldLabel>Message (Optional)</FieldLabel>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                />
              </Field>
            </FieldGroup>

            <Button type="submit" size="lg" className="w-full mt-8 group" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Start Your Journey"}
              {!isLoading && (
                <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
})
