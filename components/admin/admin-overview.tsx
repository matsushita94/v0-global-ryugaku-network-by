"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type OverviewCounts = {
  students: number
  partners: number
  schools: number
  siteContent: number
}

export function AdminOverview() {
  const [counts, setCounts] = useState<OverviewCounts>({
    students: 0,
    partners: 0,
    schools: 0,
    siteContent: 0,
  })

  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    let isMounted = true

    async function loadCounts() {
      setIsLoading(true)
      setErrorMessage("")

      const [studentsRes, partnersRes, schoolsRes, contentRes] =
        await Promise.all([
          supabase.from("students").select("*", { count: "exact", head: true }),
          supabase.from("partners").select("*", { count: "exact", head: true }),
          supabase.from("schools").select("*", { count: "exact", head: true }),
          supabase
            .from("site_content")
            .select("*", { count: "exact", head: true }),
        ])

      const firstError =
        studentsRes.error ||
        partnersRes.error ||
        schoolsRes.error ||
        contentRes.error

      if (!isMounted) {
        return
      }

      if (firstError) {
        setErrorMessage(firstError.message)
        setIsLoading(false)
        return
      }

      setCounts({
        students: studentsRes.count ?? 0,
        partners: partnersRes.count ?? 0,
        schools: schoolsRes.count ?? 0,
        siteContent: contentRes.count ?? 0,
      })

      setIsLoading(false)
    }

    loadCounts()

    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
        Loading dashboard…
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        Failed to load admin overview: {errorMessage}
      </div>
    )
  }

  const cards = [
    { label: "Students", value: counts.students },
    { label: "Partners", value: counts.partners },
    { label: "Schools", value: counts.schools },
    { label: "Editable Content Items", value: counts.siteContent },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
        >
          <div className="text-sm font-medium text-slate-500">{card.label}</div>
          <div className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            {card.value}
          </div>
        </div>
      ))}
    </div>
  )
}
