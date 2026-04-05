"use client"

import { useEffect, useMemo, useState } from "react"
import { formatAdminDate, formatCommission } from "@/lib/admin-formatters"
import { getPartners } from "@/lib/queries/partners"
import type { PartnerRow } from "@/lib/types/admin"

export function PartnersTable() {
  const [partners, setPartners] = useState<PartnerRow[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    let isMounted = true

    async function loadPartners() {
      try {
        setIsLoading(true)
        setErrorMessage("")

        const nextPartners = await getPartners()

        if (!isMounted) {
          return
        }

        setPartners(nextPartners)
      } catch (error) {
        if (!isMounted) {
          return
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Failed to load partners."
        )
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadPartners()

    return () => {
      isMounted = false
    }
  }, [])

  const filteredPartners = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase()

    if (!normalized) {
      return partners
    }

    return partners.filter((partner) => {
      const values = [
        partner.partner_name ?? "",
        partner.partner_type ?? "",
        partner.country ?? "",
        partner.contact_person ?? "",
        partner.contact_email ?? "",
        partner.contact_phone ?? "",
        partner.referral_code ?? "",
        partner.payment_terms ?? "",
        partner.status ?? "",
      ]

      return values.some((value) => value.toLowerCase().includes(normalized))
    })
  }, [searchTerm, partners])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search partners..."
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-slate-900 md:max-w-sm"
        />

        <div className="text-sm text-slate-500">
          Total shown: {filteredPartners.length}
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
          Loading partners…
        </div>
      ) : errorMessage ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          Failed to load partners: {errorMessage}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-3 font-semibold text-slate-700">Date</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Partner</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Type</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Country</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Contact Person</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Email</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Phone</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Referral Code</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Commission</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Terms</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPartners.length === 0 ? (
                  <tr>
                    <td
                      colSpan={11}
                      className="px-4 py-8 text-center text-slate-500"
                    >
                      No partners found.
                    </td>
                  </tr>
                ) : (
                  filteredPartners.map((partner) => (
                    <tr
                      key={partner.id}
                      className="border-b border-slate-100 last:border-b-0"
                    >
                      <td className="px-4 py-3 text-slate-600">
                        {formatAdminDate(partner.created_at)}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {partner.partner_name || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {partner.partner_type || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {partner.country || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {partner.contact_person || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {partner.contact_email || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {partner.contact_phone || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {partner.referral_code || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {formatCommission(
                          partner.commission_amount,
                          partner.commission_currency
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {partner.payment_terms || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {partner.status || "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
