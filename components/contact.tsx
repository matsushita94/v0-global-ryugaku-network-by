"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@globalryugaku.com",
    href: "mailto:info@globalryugaku.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "123 Education Street, Suite 100, Tokyo, Japan",
    href: null,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon-Fri: 9:00 AM - 6:00 PM (JST)",
    href: null,
  },
]

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Have questions? We&apos;re here to help. Reach out to our team and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="mx-auto mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="flex items-center justify-center size-16 rounded-full bg-primary/10 mb-6">
                  <CheckCircle2 className="size-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Message Sent!</h3>
                <p className="mt-2 text-muted-foreground">
                  Thank you for reaching out. We&apos;ll respond within 24 hours.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-semibold text-foreground mb-6">Send us a message</h3>
                <FieldGroup>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="contact-name">Name</FieldLabel>
                      <Input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="contact-email">Email</FieldLabel>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                      />
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel htmlFor="contact-subject">Subject</FieldLabel>
                    <Input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="How can we help?"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="contact-message">Message</FieldLabel>
                    <Textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Your message..."
                    />
                  </Field>
                </FieldGroup>
                <Button type="submit" className="w-full mt-6 group">
                  Send Message
                  <Send className="size-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-foreground mb-8">Get in touch</h3>
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex items-center justify-center size-12 shrink-0 rounded-lg bg-primary/10 text-primary">
                    <item.icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-muted/50 rounded-xl">
              <h4 className="font-semibold text-foreground">Office Locations</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                We have offices in Tokyo, Vancouver, Sydney, and London to better serve our 
                students and partner institutions worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
