"use client"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Destinations } from "@/components/destinations"
import { Programs } from "@/components/programs"
import { WhyStudyAbroad } from "@/components/why-study-abroad"
import { ApplicationForm } from "@/components/application-form"
import { Partner } from "@/components/partner"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Destinations />
      <Programs />
      <WhyStudyAbroad />
      <ApplicationForm />
      <Partner />
      <Contact />
      <Footer />
    </main>
  )
}
