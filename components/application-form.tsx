"use client"

import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react"
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
import {
  SearchableSelect,
  type SearchableSelectOption,
} from "@/components/ui/searchable-select"
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
  first_name: string
  last_name: string
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
  first_name: "",
  last_name: "",
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

function buildCountryOptions(): SearchableSelectOption[] {
  const countryMap = new Map<
    string,
    {
      country: string
      isoCode: string
      region: string
      keywords: string[]
    }
  >()

  for (const item of countryData) {
    if (!countryMap.has(item.country)) {
      countryMap.set(item.country, {
        country: item.country,
        isoCode: item.isoCode,
        region: item.region,
        keywords: [
          item.country,
          item.isoCode,
          item.nationality,
          item.phoneCode,
        ],
      })
    }
  }

  return Array.from(countryMap.values())
    .sort((a, b) => a.country.localeCompare(b.country))
    .map((item) => ({
      value: item.country,
      label: `${item.country} (${item.isoCode})`,
      group: item.region,
      keywords: item.keywords,
    }))
}

function buildNationalityOptions(): SearchableSelectOption[] {
  const nationalityMap = new Map<
    string,
    {
      nationality: string
      isoCode: string
      region: string
      keywords: string[]
    }
  >()

  for (const item of countryData) {
    if (!nationalityMap.has(item.nationality)) {
      nationalityMap.set(item.nationality, {
        nationality: item.nationality,
        isoCode: item.isoCode,
        region: item.region,
        keywords: [
          item.nationality,
          item.country,
          item.isoCode,
          item.phoneCode,
        ],
      })
    }
  }

  return Array.from(nationalityMap.values())
    .sort((a, b) => a.nationality.localeCompare(b.nationality))
    .map((item) => ({
      value: item.nationality,
      label: `${item.nationality} (${item.isoCode})`,
      group: item.region,
      keywords: item.keywords,
    }))
}

function buildPhoneCodeOptions(): SearchableSelectOption[] {
  const codeMap = new Map<
    string,
    {
      phoneCode: string
      countries: string[]
      isoCodes: string[]
      regions: string[]
      keywords: string[]
    }
  >()

  for (const item of countryData) {
    const existing = codeMap.get(item.phoneCode)

    if (existing) {
      existing.countries.push(item.country)
      existing.isoCodes.push(item.isoCode)
      existing.regions.push(item.region)
      existing.keywords.push(
        item.country,
        item.isoCode,
        item.phoneCode,
        item.nationality
      )
    } else {
      codeMap.set(item.phoneCode, {
        phoneCode: item.phoneCode,
        countries: [item.country],
        isoCodes: [item.isoCode],
        regions: [item.region],
        keywords: [
          item.country,
          item.isoCode,
          item.phoneCode,
          item.nationality,
        ],
      })
    }
  }

  return Array.from(codeMap.values())
    .sort((a, b) => a.phoneCode.localeCompare(b.phoneCode))
    .map((item) => {
      const uniqueCountries = Array.from(new Set(item.countries))
      const uniqueIsoCodes = Array.from(new Set(item.isoCodes))
      const uniqueRegions = Array.from(new Set(item.regions))
      const uniqueKeywords = Array.from(new Set(item.keywords))

      return {
        value: item.phoneCode,
        label: `${item.phoneCode} — ${uniqueCountries.join(" / ")} (${uniqueIsoCodes.join(" / ")})`,
        group: uniqueRegions[0] ?? "Other",
        keywords: [...uniqueKeywords, ...uniqueCountries, ...uniqueIsoCodes],
      }
    })
}

function findPhoneCodeByCountry(country: string): string {
  const matchedCountry = countryData.find((item) => item.country === country)
  return matchedCountry?.phoneCode ?? ""
}

function getShortPhoneCodeLabel(phoneCode: string): string {
  return phoneCode || "Code"
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
    const [phoneCodeTouched, setPhoneCodeTouched] = useState(false)
    const [formData, setFormData] = useState(initialFormData)

    const resetForm = () => {
      setIsSubmitted(false)
      setError(null)
      setIsLoading(false)
      setPhoneCodeTouched(false)
      setFormData((prev) => ({
        ...initialFormData,
        referral_code: prev.referral_code,
      }))
    }

    useImperativeHandle(ref, () => ({
      resetForm,
    }))

    useEffect(() => {
      const params = new URLSearchParams(window.location.search)
      const refCode = params.get("ref") || ""

      if (refCode) {
        setFormData((prev) => ({
          ...prev,
          referral_code: refCode.toUpperCase(),
        }))
      }
    }, [])

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target

      setFormData((prev) => ({
        ...prev,
        [name]:
          name === "referral_code"
            ? value.toUpperCase()
            : value,
      }))
    }

    const handleSelectChange = (name: keyof FormData, value: string) => {
      if (name === "phone_country") {
        setPhoneCodeTouched(true)
      }

      setFormData((prev) => {
        const nextFormData = {
          ...prev,
          [name]: value,
        }

        if (name === "country_of_residence") {
          const suggestedPhoneCode = findPhoneCodeByCountry(value)

          if (suggestedPhoneCode && !phoneCodeTouched) {
            nextFormData.phone_country = suggestedPhoneCode
          }
        }

        return nextFormData
      })
    }

    const validateForm = () => {
      if (!formData.first_name.trim())
      return "Please enter your first name"
      if (!formData.last_name.trim())
      return "Please enter your last name"
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

    const handleSubmit = async (e: React.FormEvent) => {
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
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim(),
          full_name: `${formData.first_name} ${formData.last_name}`.trim(),
          email: formData.email.trim(),
          phone: fullPhone || null,
          country_of_residence: formData.country_of_residence.trim(),
          nationality: formData.nationality.trim(),
          japanese_level: formData.japanese_level,
          desired_program: formData.desired_program,
          desired_city: formData.desired_city.trim() || null,
          desired_start_date: startDateValue,
          urgency: formData.urgency || null,
          preferred_contact_method: formData.preferred_contact_method || null,
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
        setPhoneCodeTouched(false)
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
        <section id="application-form" className="bg-white section-spacing">
          <div className="section-container">
            <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <p className="mt-6 section-eyebrow">Application Received</p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Thank you
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-600">
                We will review your details and contact you soon.
              </p>

              <Button
                type="button"
                className="mt-8"
                onClick={resetForm}
              >
                Submit Another
              </Button>
            </div>
          </div>
        </section>
      )
    }

    return (
      <section id="application-form" className="bg-white section-spacing">
        <div className="section-container">
          <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-eyebrow">Apply</p>

              <h2 className="section-title">Start Your Journey</h2>

              <p className="section-subtext mx-auto">
                Fill in the form and we will guide you step by step based on your
                study goals, timing, and current situation.
              </p>
            </div>

            {error && (
              <div className="mt-8 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8">
              <FieldGroup>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
  <Field>
    <FieldLabel htmlFor="first_name">First Name</FieldLabel>
    <Input
      id="first_name"
      name="first_name"
      value={formData.first_name}
      onChange={handleInputChange}
      placeholder="First name"
      autoComplete="given-name"
    />
  </Field>

  <Field>
    <FieldLabel htmlFor="last_name">Last Name</FieldLabel>
    <Input
      id="last_name"
      name="last_name"
      value={formData.last_name}
      onChange={handleInputChange}
      placeholder="Last name"
      autoComplete="family-name"
    />
  </Field>
</div>

                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                  </Field>
                </div>

                <Field>
                  <FieldLabel>Phone</FieldLabel>
                  <div className="grid grid-cols-[160px_1fr] gap-3">
                    <SearchableSelect
                      value={formData.phone_country}
                      onValueChange={(value) =>
                        handleSelectChange("phone_country", value)
                      }
                      options={phoneCodeOptions}
                      placeholder="Code"
                      searchPlaceholder="Search country, ISO, or code..."
                      emptyMessage="No phone code found."
                      dropdownClassName="w-max"
                      selectedLabel={getShortPhoneCodeLabel(formData.phone_country)}
                    />

                    <Input
                      id="phone_number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                      autoComplete="tel-national"
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    Example: +81 90 1234 5678
                  </p>
                </Field>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Field>
                    <FieldLabel>Country of Residence</FieldLabel>
                    <SearchableSelect
                      value={formData.country_of_residence}
                      onValueChange={(value) =>
                        handleSelectChange("country_of_residence", value)
                      }
                      options={countryOptions}
                      placeholder="Select country"
                      searchPlaceholder="Search country or ISO..."
                      emptyMessage="No country found."
                      dropdownClassName="w-full"
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
                      searchPlaceholder="Search nationality or ISO..."
                      emptyMessage="No nationality found."
                      dropdownClassName="w-full"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="desired_city">Desired City</FieldLabel>
                    <Input
                      id="desired_city"
                      name="desired_city"
                      value={formData.desired_city}
                      onChange={handleInputChange}
                      placeholder="e.g. Tokyo, Osaka, Nagoya"
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
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                </div>

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

                <Field>
                  <FieldLabel htmlFor="referral_code">
                    Referral Code (optional)
                  </FieldLabel>
                  <Input
                    id="referral_code"
                    name="referral_code"
                    value={formData.referral_code}
                    onChange={handleInputChange}
                    placeholder="Enter referral code if you have one"
                  />
                  <p className="mt-2 text-xs text-slate-500">
                    If someone referred you, please enter their referral code.
                  </p>
                </Field>

                <Field>
                  <FieldLabel htmlFor="message">Message</FieldLabel>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your goals or questions"
                    rows={6}
                  />
                </Field>
              </FieldGroup>

              <Button
                type="submit"
                className="mt-8 w-full"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Start Your Journey"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </div>
        </div>
      </section>
    )
  }
)
