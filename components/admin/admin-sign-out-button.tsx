"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export function AdminSignOutButton() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSignOut() {
    const supabase = createClient()

    try {
      setIsSubmitting(true)
      await supabase.auth.signOut()
      router.push("/admin/login")
      router.refresh()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isSubmitting}
      className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isSubmitting ? "Signing out..." : "Sign out"}
    </button>
  )
}
