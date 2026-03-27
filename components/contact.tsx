"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Clock, Send, CheckCircle2 } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@globalryugakunetwork.com",
    href: "mailto:info@globalryugakunetwork.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+81 70-9066-5906",
    href: "tel:+817090665906",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Wakayama-shi, Japan",
    href: null,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "24 hours",
    href: null,
  },
]

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <section id="contact" className="bg-white section-spacing">
      <div className="section-container">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="section-eyebrow">Contact</p>

            <h2 className="section-title">
              Contact Us
            </h2>

            <p className="section-subtext">
              We currently help students study in Japan and are expanding globally.
            </p>

            {isSubmitted ? (
              <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    Message received
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Thank you for contacting us. We will get back to you as soon as possible.
                </p>

                <Button
                  type="button"
                  variant="outline"
                  className="mt-4"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Name
                  </label>
                  <Input id="name" name="name" placeholder="Your name" required />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Write your message"
                    className="min-h-[140px]"
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
            <h3 className="text-xl font-semibold text-slate-900">Get in touch</h3>

            <div className="mt-8 space-y-6">
              {contactInfo.map((item) => {
                const Icon = item.icon

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
              <h4 className="font-semibold text-slate-900">Current focus</h4>
              <p className="mt-2 text-sm text-slate-600">
                We are currently focused on helping students study in Japan and expanding globally step by step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
