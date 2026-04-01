"use client"

import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { SearchableSelect, type SearchableSelectOption } from "@/components/ui/searchable-select"
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"
import {
  programTypes,
  japaneseLevels,
  urgencyOptions,
  preferredContactMethods,
  budgetRanges,
} from "@/data/form-options"
import { countryData } from "@/data/countries"

type StartDateOption = {
  label: string
  value: string
}

type FormData = {
  full_name: string
  email: string
  phone_country: string
  phone_number: string
  country_of_residence: string
  nationality: string
  japanese_level: string
  desired_program: string
  desired_city: string
  desired_start_date: string
  urgency: string
  preferred_contact_method: string
  budget_range: string
  message: string
  referral_code: string
}

const initialFormData: FormData = {
  full_name: "",
  email: "",
  phone_country: "",
  phone_number: "",
  country_of_residence: "",
  nationality: "",
  japanese_level: "",
  desired_program: "",
  desired_city: "",
  desired_start_date: "",
  urgency: "Just exploring",
  preferred_contact_method: "Email",
  budget_range: "",
  message: "",
  referral_code: "",
}

function generateDesiredStartDates(count = 6): StartDateOption[] {
  const intakeMonths = [1, 4, 7, 10]
  const monthLabels: Record<number, string> = {
    1: "January",
    4: "April",
    7: "July",
    10: "October",
  }

  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  const options: StartDateOption[] = []
  let year = currentYear

  while (options.length < count) {
    for (const month of intakeMonths) {
      if (year === currentYear && month < currentMonth) {
        continue
      }

      const paddedMonth = String(month).padStart(2, "0")

      options.push({
        label: `${monthLabels[month]} ${year}`,
        value: `${year}-${paddedMonth}-01`,
      })

      if (options.length === count) {
        break
      }
    }

    year += 1
  }

  options.push({
    label: "Not Sure Yet",
    value: "not_sure_yet",
  })

  return options
}

function uniqueSortedStrings(values: string[]): string[] {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b))
}

function buildCountryOptions(): SearchableSelectOption[] {
  return uniqueSortedStrings(countryData.map((item) => item.country)).map(
    (country) => ({
      value: country,
      label: country,
    })
  )
}

function buildNationalityOptions(): SearchableSelectOption[] {
  return uniqueSortedStrings(countryData.map((item) => item.nationality)).map(
    (nationality) => ({
      value: nationality,
      label: nationality,
    })
  )
}

function buildPhoneCodeOptions(): SearchableSelectOption[] {
  const seen = new Set<string>()
  const options: SearchableSelectOption[] = []

  for (const item of countryData) {
    if (seen.has(item.phoneCode)) continue
    seen.add(item.phoneCode)

    options.push({
      value: item.phoneCode,
      label: `${item.country} (${item.phoneCode})`,
    })
  }

  return options.sort((a, b) => a.label.localeCompare(b.label))
}

const desiredStartDates = generateDesiredStartDates()
const countryOptions = buildCountryOptions()
const nationalityOptions = buildNationalityOptions()
const phoneCodeOptions = buildPhoneCodeOptions()

export const ApplicationForm = forwardRef<{ resetForm: () => void }>(
  function ApplicationForm(_, ref) {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState<FormData>(initialFormData)

    useEffect(() => {
      const params = new URLSearchParams(window.location.search)
      const refCode = params.get("ref") || ""

      if (refCode) {
        setFormData((prev) => ({
          ...prev,
          referral_code: refCode,
        }))
      }
    }, [])

    const resetForm = () => {
      setIsSubmitted(false)
      setError(null)
      setIsLoading(false)
      setFormData((prev) => ({
        ...initialFormData,
        referral_code: prev.referral_code,
      }))
    }

    useImperativeHandle(ref, () => ({
      resetForm,
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

    const handleSelectChange = (name: keyof FormData, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

    const validateForm = () => {
      if (!formData.full_name.trim()) return "Please enter your full name"
      if (!formData.email.trim()) return "Please enter your email"
      if (!formData.country_of_residence.trim()) {
        return "Please select your country of residence"
      }
      if (!formData.nationality.trim()) return "Please select your nationality"
      if (!formData.desired_program) return "Please select a desired program"
      if (!formData.desired_start_date) return "Please select a desired start date"
      if (!formData.japanese_level) return "Please select your Japanese level"

      const hasPhoneCountry = formData.phone_country.trim().length > 0
      const hasPhoneNumber = formData.phone_number.trim().length > 0

      if (hasPhoneCountry !== hasPhoneNumber) {
        return "Please complete both phone fields or leave both blank"
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
        const startDateValue =
          formData.desired_start_date === "not_sure_yet"
            ? null
            : formData.desired_start_date

        const fullPhone = `${formData.phone_country} ${formData.phone_number}`
          .replace(/\s+/g, " ")
          .trim()

        const payload = {
          full_name: formData.full_name.trim(),
          email: formData.email.trim(),
          phone: fullPhone || null,
          country_of_residence: formData.country_of_residence.trim(),
          nationality: formData.nationality.trim(),
          japanese_level: formData.japanese_level,
          desired_program: formData.desired_program,
          desired_city: formData.desired_city.trim() || null,
          desired_start_date: startDateValue,
          urgency: formData.urgency || null,
          preferred_contact_method:
            formData.preferred_contact_method || null,
          budget_range: formData.budget_range || null,
          message: formData.message.trim() || null,
          referral_code: formData.referral_code.trim() || null,
          source: "website",
        }

        const { error: insertError } = await supabase
          .from("students")
          .insert([payload])

        if (insertError) {
          throw new Error(insertError.message)
        }

        setIsSubmitted(true)
        setFormData((prev) => ({
          ...initialFormData,
          referral_code: prev.referral_code,
        }))
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Submission failed. Please try again."
        )
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
              Thank you. We will review your details and contact you soon.
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

            <h2 className="section-title">Start Your Journey</h2>

            <p className="section-subtext mx-auto">
              Fill in the form and we will guide you step by step based on your
              study goals, timing, and current situation.
            </p>
          </div>

          {error && (
            <div className="mx-auto mt-8 flex max-w-3xl gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="premium-card mx-auto mt-10 max-w-3xl"
          >
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
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel>Phone</FieldLabel>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <SearchableSelect
                        value={formData.phone_country}
                        onValueChange={(value) =>
                          handleSelectChange("phone_country", value)
                        }
                        options={phoneCodeOptions}
                        placeholder="Code"
                        searchPlaceholder="Search country or code..."
                        emptyMessage="No phone code found."
                      />
                    </div>

                    <Input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      placeholder="90 1234 5678"
                      className="col-span-2"
                    />
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Example: +81 90 1234 5678
                  </p>
                </Field>

                <Field>
                  <FieldLabel>Country of Residence</FieldLabel>
                  <SearchableSelect
                    value={formData.country_of_residence}
                    onValueChange={(value) =>
                      handleSelectChange("country_of_residence", value)
                    }
                    options={countryOptions}
                    placeholder="Select country"
                    searchPlaceholder="Search country..."
                    emptyMessage="No country found."
                  />
                </Field>

                <Field>
                  <FieldLabel>Nationality</FieldLabel>
                  <SearchableSelect
                    value={formData.nationality}
                    onValueChange={(value) =>
                      handleSelectChange("nationality", value)
                    }
                    options={nationalityOptions}
                    placeholder="Select nationality"
                    searchPlaceholder="Search nationality..."
                    emptyMessage="No nationality found."
                  />
                </Field>

                <Field>
                  <FieldLabel>Desired City</FieldLabel>
                  <Input
                    name="desired_city"
                    value={formData.desired_city}
                    onChange={handleInputChange}
                    placeholder="Tokyo, Osaka, Kyoto, or Not Sure Yet"
                  />
                </Field>

                <Field>
                  <FieldLabel>Desired Program</FieldLabel>
                  <Select
                    value={formData.desired_program}
                    onValueChange={(value) =>
                      handleSelectChange("desired_program", value)
                    }
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
                  <FieldLabel>Desired Start Date</FieldLabel>
                  <Select
                    value={formData.desired_start_date}
                    onValueChange={(value) =>
                      handleSelectChange("desired_start_date", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select start date" />
                    </SelectTrigger>
                    <SelectContent>
                      {desiredStartDates.map((date) => (
                        <SelectItem key={date.value} value={date.value}>
                          {date.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel>Japanese Level</FieldLabel>
                  <Select
                    value={formData.japanese_level}
                    onValueChange={(value) =>
                      handleSelectChange("japanese_level", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Japanese level" />
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
                  <FieldLabel>Budget Range</FieldLabel>
                  <Select
                    value={formData.budget_range}
                    onValueChange={(value) =>
                      handleSelectChange("budget_range", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel>Urgency</FieldLabel>
                  <Select
                    value={formData.urgency}
                    onValueChange={(value) =>
                      handleSelectChange("urgency", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel>Preferred Contact Method</FieldLabel>
                  <Select
                    value={formData.preferred_contact_method}
                    onValueChange={(value) =>
                      handleSelectChange("preferred_contact_method", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select contact method" />
                    </SelectTrigger>
                    <SelectContent>
                      {preferredContactMethods.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <Field className="mt-6">
                <FieldLabel>Message</FieldLabel>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Tell us about your goals, timing, or any questions you have."
                />
              </Field>
            </FieldGroup>

            <Button type="submit" className="mt-8 w-full" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Start Your Journey"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>
        </div>
      </section>
    )
  }
)
