export function formatAdminDate(dateValue: string | null) {
  if (!dateValue) return "—"

  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) {
    return "—"
  }

  return date.toLocaleDateString()
}

export function buildStudentName(
  firstName: string | null,
  lastName: string | null
) {
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim()
  return fullName || "—"
}

export function formatCommission(
  amount: number | null,
  currency: string | null
) {
  if (amount === null || amount === undefined) {
    return "—"
  }

  return `${amount}${currency ? ` ${currency}` : ""}`
}
