"use client"

import { useEffect, useMemo, useState } from "react"
import { supabase } from "@/lib/supabase"

type StudentRow = {
  id: string
  created_at: string | null
  first_name: string | null
  last_name: string | null
  email: string | null
  phone: string | null
  nationality: string | null
  country_of_residence: string | null
  desired_program: string | null
  desired_city: string | null
  referral_code: string | null
  source: string | null
  students_lead_status: string | null
}

function formatDate(dateValue: string | null) {
  if (!dateValue) return "—"

  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) return "—"

  return date.toLocaleDateString()
}

function buildStudentName(firstName: string | null, lastName: string | null) {
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim()
  return fullName || "—"
}

export function StudentsTable() {
  const [students, setStudents] = useState<StudentRow[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    let isMounted = true

    async function loadStudents() {
      setIsLoading(true)
      setErrorMessage("")

      const { data, error } = await supabase
        .from("students")
        .select(
          "id, created_at, first_name, last_name, email, phone, nationality, country_of_residence, desired_program, desired_city, referral_code, source, students_lead_status"
        )
        .order("created_at", { ascending: false })

      if (!isMounted) {
        return
      }

      if (error) {
        setErrorMessage(error.message)
        setIsLoading(false)
        return
      }

      setStudents((data ?? []) as StudentRow[])
      setIsLoading(false)
    }

    loadStudents()

    return () => {
      isMounted = false
    }
  }, [])

  const filteredStudents = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase()

    if (!normalized) return students

    return students.filter((student) => {
      const values = [
        buildStudentName(student.first_name, student.last_name),
        student.email ?? "",
        student.phone ?? "",
        student.nationality ?? "",
        student.country_of_residence ?? "",
        student.desired_program ?? "",
        student.desired_city ?? "",
        student.referral_code ?? "",
        student.source ?? "",
        student.students_lead_status ?? "",
      ]

      return values.some((value) => value.toLowerCase().includes(normalized))
    })
  }, [searchTerm, students])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search students..."
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-slate-900 md:max-w-sm"
        />

        <div className="text-sm text-slate-500">
          Total shown: {filteredStudents.length}
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
          Loading students…
        </div>
      ) : errorMessage ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          Failed to load students: {errorMessage}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-3 font-semibold text-slate-700">Date</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Name</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Email</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Phone</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Nationality</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Residence</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Program</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">City</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Referral</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Source</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td
                      colSpan={11}
                      className="px-4 py-8 text-center text-slate-500"
                    >
                      No students found.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b border-slate-100 last:border-b-0"
                    >
                      <td className="px-4 py-3 text-slate-600">
                        {formatDate(student.created_at)}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {buildStudentName(student.first_name, student.last_name)}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {student.email || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {student.phone || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {student.nationality || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {student.country_of_residence || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {student.desired_program || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {student.desired_city || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {student.referral_code || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {student.source || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {student.students_lead_status || "—"}
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
