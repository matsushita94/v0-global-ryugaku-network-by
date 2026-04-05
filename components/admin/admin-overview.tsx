"use client"

import { useEffect, useState } from "react"
import { getAdminOverviewCounts } from "@/lib/queries/admin-overview"
import type { OverviewCounts } from "@/lib/types/admin"

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
      try {
        setIsLoading(true)
        setErrorMessage("")

        const nextCounts = await getAdminOverviewCounts()

        if (!isMounted) {
          return
        }

        setCounts(nextCounts)
      } catch (error) {
        if (!isMounted) {
          return
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Failed to load overview."
        )
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
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
