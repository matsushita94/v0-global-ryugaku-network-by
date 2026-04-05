"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import { adminNavigation } from "@/data/admin-navigation"

type AdminShellProps = {
  title: string
  description?: string
  children: ReactNode
}

export function AdminShell({ title, description, children }: AdminShellProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 md:px-6 lg:flex-row lg:gap-8">
        <aside className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:sticky lg:top-6 lg:w-72 lg:self-start">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Admin
            </p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              Ryugaku Network
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Manage website content, students, and partners.
            </p>
          </div>

          <nav className="space-y-2">
            {adminNavigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "block rounded-xl border px-3 py-3 transition",
                    isActive
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100",
                  ].join(" ")}
                >
                  <div className="text-sm font-semibold">{item.label}</div>
                  <div
                    className={[
                      "mt-1 text-xs",
                      isActive ? "text-slate-200" : "text-slate-500",
                    ].join(" ")}
                  >
                    {item.description}
                  </div>
                </Link>
              )
            })}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
          <header className="mb-6 border-b border-slate-200 pb-4">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              {title}
            </h1>
            {description ? (
              <p className="mt-2 text-sm text-slate-600">{description}</p>
            ) : null}
          </header>

          {children}
        </main>
      </div>
    </div>
  )
}
