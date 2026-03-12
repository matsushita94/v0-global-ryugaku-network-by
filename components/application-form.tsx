"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { ArrowRight, CheckCircle2 } from "lucide-react"

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

export function ApplicationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle form submission here
    setIsSubmitted(true)
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
          <FieldGroup>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your full name"
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
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="country">Country of Residence</FieldLabel>
                <Input
                  id="country"
                  name="country"
                  type="text"
                  required
                  placeholder="Your country"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="destination">Preferred Study Destination</FieldLabel>
                <Select name="destination" required>
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
            </div>

            <Field>
              <FieldLabel htmlFor="program">Program Type</FieldLabel>
              <Select name="program" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select program type" />
                </SelectTrigger>
                <SelectContent>
                  {programTypes.map((program) => (
                    <SelectItem key={program} value={program.toLowerCase().replace(/\s+/g, "-")}>
                      {program}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="message">Message (Optional)</FieldLabel>
              <Textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us about your goals, questions, or any specific requirements..."
              />
            </Field>
          </FieldGroup>

          <Button type="submit" size="lg" className="w-full mt-8 group">
            Start Your Journey
            <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </form>
      </div>
    </section>
  )
}
