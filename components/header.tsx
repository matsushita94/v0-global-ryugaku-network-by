"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const homeNavigation = [
  { name: "About", href: "#about" },
  { name: "Language Schools", href: "/language-schools" },
  { name: "Vocational Schools", href: "/vocational-schools" },
  { name: "Programs", href: "#programs" },
  { name: "Why Japan", href: "#why-study-abroad" },
  { name: "Partner", href: "#partner" },
  { name: "Contact", href: "#contact" },
]

const innerNavigation = [
  { name: "Home", href: "/" },
  { name: "Language Schools", href: "/language-schools" },
  { name: "Vocational Schools", href: "/vocational-schools" },
  { name: "Contact", href: "/#contact" },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isHomePage = pathname === "/"

  const navigation = useMemo(
    () => (isHomePage ? homeNavigation : innerNavigation),
    [isHomePage]
  )

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="section-container pt-4">
        <div
          className={`rounded-2xl border transition-all duration-300 ${
            scrolled
              ? "border-slate-200/80 bg-white/92 shadow-sm backdrop-blur-md"
              : "border-white/15 bg-white/8 backdrop-blur-sm"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-4">
            <Link href="/" className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ring-1 transition-all ${
                  scrolled
                    ? "bg-slate-900 text-white ring-slate-900/10"
                    : "bg-white/10 text-white ring-white/20"
                }`}
              >
                <span className="text-sm font-semibold">GR</span>
              </div>

              <div className="flex flex-col">
                <span
                  className={`text-sm font-semibold uppercase tracking-[0.18em] ${
                    scrolled ? "text-slate-900" : "text-white/85"
                  }`}
                >
                  Global Ryugaku Network
                </span>
                <span className={`text-xs ${scrolled ? "text-slate-500" : "text-white/60"}`}>
                  Study in Japan
                </span>
              </div>
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    scrolled
                      ? "text-slate-700 hover:text-slate-900"
                      : "text-white/85 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <Button asChild size="sm" className="px-5">
                <Link href={isHomePage ? "#apply" : "/#apply"}>
                  Get Started
                </Link>
              </Button>
            </nav>

            <button
              type="button"
              className={`inline-flex items-center justify-center rounded-xl border p-2 transition md:hidden ${
                scrolled
                  ? "border-slate-200 bg-white text-slate-900"
                  : "border-white/20 bg-white/10 text-white"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="border-t border-slate-200/10 px-5 pb-5 md:hidden">
              <nav className="flex flex-col gap-3 pt-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                      scrolled
                        ? "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                        : "text-white/85 hover:bg-white/10 hover:text-white"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <Button asChild className="mt-2 w-full">
                  <Link
                    href={isHomePage ? "#apply" : "/#apply"}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </Button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
