"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "About", href: "#about" },
  { name: "Why Japan", href: "#why-study-abroad" },
  { name: "Partner", href: "#partner" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="section-container">
        <div className="flex items-center justify-between py-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm">
              <span className="text-sm font-semibold">GR</span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
                Global Ryugaku Network
              </span>
              <span className="text-xs text-white/60">
                Study in Japan
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-white/85 transition-colors hover:text-white"
              >
                {item.name}
              </Link>
            ))}

            <Button asChild size="sm" className="px-5">
              <Link href="#contact">Get Started</Link>
            </Button>
          </nav>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/20 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="rounded-2xl border border-white/15 bg-slate-900/95 p-4 shadow-lg backdrop-blur md:hidden">
            <nav className="flex flex-col gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <Button asChild className="mt-2 w-full">
                <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
