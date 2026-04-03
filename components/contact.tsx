"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react"

import {
  contactInfo,
  type ContactInfoItem,
} from "@/data/site-content"

const iconMap = {
  Mail,
  MapPin,
  Phone,
  Clock,
}

type ContactFormEvent = React.FormEvent<HTMLFormElement>

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: ContactFormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <section id="contact" className="bg-white section-spacing">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Contact</p>

          <h2 className="section-title">
            Contact Us
          </h2>

          <p className="section-subtext mx-auto">
            We currently help students study in Japan and are expanding globally.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-10 lg:grid-cols-2">
          <div className="premium-card">
            {isSubmitted ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-slate-900">
                  Message received
                </h3>

                <p className="mt-3 max-w-md text-slate-600">
                  Thank you for contacting us. We will get back to you as soon as possible.
                </p>

                <Button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-name"
                      className="text-sm font-medium text-slate-700"
                    >
                      Name
                    </label>
                    <Input
                      id="contact-name"
                      name="name"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="contact-email"
                      className="text-sm font-medium text-slate-700"
                    >
                      Email
                    </label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="Your email address"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-medium text-slate-700"
                  >
                    Message
                  </label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="How can we help you?"
                    className="min-h-[160px]"
                    required
                  />
                </div>

                <Button type="submit" className="group w-full sm:w-auto">
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-slate-900">
              Get in touch
            </h3>

            <div className="mt-8 space-y-6">
              {contactInfo.map((item: ContactInfoItem) => {
                const Icon = iconMap[item.iconName as keyof typeof iconMap]

                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {item.label}
                      </p>

                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-slate-900 transition-colors hover:text-blue-600"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-slate-900">{item.value}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-10 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <h4 className="font-semibold text-slate-900">
                Current focus
              </h4>

              <p className="mt-2 text-sm text-slate-600">
                We are currently focused on helping students study in Japan and expanding globally.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
