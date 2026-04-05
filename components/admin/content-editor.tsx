"use client"

import { FormEvent, useEffect, useState } from "react"
import { getSiteContentItems, updateSiteContentValue } from "@/lib/queries/site-content"
import type { ContentRow } from "@/lib/types/admin"

export function ContentEditor() {
  const [items, setItems] = useState<ContentRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSavingId, setIsSavingId] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    let isMounted = true

    async function loadContent() {
      try {
        setIsLoading(true)
        setErrorMessage("")

        const nextItems = await getSiteContentItems()

        if (!isMounted) {
          return
        }

        setItems(nextItems)
      } catch (error) {
        if (!isMounted) {
          return
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Failed to load content."
        )
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadContent()

    return () => {
      isMounted = false
    }
  }, [])

  function handleValueChange(id: string, nextValue: string) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, value: nextValue } : item
      )
    )
  }

  async function handleSave(
    event: FormEvent<HTMLFormElement>,
    item: ContentRow
  ) {
    event.preventDefault()

    try {
      setIsSavingId(item.id)
      setErrorMessage("")
      setSuccessMessage("")

      await updateSiteContentValue(item.id, item.value)

      setSuccessMessage(`Saved ${item.section}.${item.field}`)
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to save content."
      )
    } finally {
      setIsSavingId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
        Loading content…
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {errorMessage ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      {successMessage ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          {successMessage}
        </div>
      ) : null}

      {items.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
          No site content found.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <form
              key={item.id}
              onSubmit={(event) => handleSave(event, item)}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="mb-3 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    {item.section}.{item.field}
                  </div>
                  <div className="text-xs text-slate-500">
                    Edit this value to update your public website later.
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSavingId === item.id}
                  className="mt-3 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 md:mt-0"
                >
                  {isSavingId === item.id ? "Saving..." : "Save"}
                </button>
              </div>

              <textarea
                value={item.value}
                onChange={(event) => handleValueChange(item.id, event.target.value)}
                rows={4}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
              />
            </form>
          ))}
        </div>
      )}
    </div>
  )
}
