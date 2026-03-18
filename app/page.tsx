"use client"

import { useRef } from "react"
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
  const applicationFormRef = useRef<{ resetForm: () => void } | null>(null)

  const handleApplyClick = () => {
    // Reset the form state in the ApplicationForm component
    applicationFormRef.current?.resetForm()
    
    // Scroll to the apply section
    const applySection = document.getElementById("apply")
    if (applySection) {
      applySection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <main className="min-h-screen">
      <Header onApplyClick={handleApplyClick} />
      <Hero />
      <About />
      <Destinations />
      <Programs />
      <WhyStudyAbroad />
      <ApplicationForm ref={applicationFormRef} />
      <Partner />
      <Contact />
      <Footer />
    </main>
  )
}
