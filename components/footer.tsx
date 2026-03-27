import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

const navigation = [
  { name: "About", href: "#about" },
  { name: "Programs", href: "#programs" },
  { name: "Why Japan", href: "#why-study-abroad" },
  { name: "Partner", href: "#partner" },
  { name: "Contact", href: "#contact" },
]

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="section-container py-16 sm:py-20">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                <span className="text-sm font-semibold">GR</span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white/85">
                  Global Ryugaku Network
                </span>
                <span className="text-xs text-white/50">
                  Study in Japan
                </span>
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/65">
              We currently help students explore study opportunities in Japan and are
              building a global education network step by step.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
              Navigation
            </h3>

            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
              Contact
            </h3>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-white/50" />
                <a
                  href="mailto:info@globalryugakunetwork.com"
                  className="text-sm text-white/65 transition-colors hover:text-white"
                >
                  info@globalryugakunetwork.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-white/50" />
                <a
                  href="tel:+817090665906"
                  className="text-sm text-white/65 transition-colors hover:text-white"
                >
                  +81 70-9066-5906
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-white/50" />
                <span className="text-sm text-white/65">
                  Wakayama-shi, Japan
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Global Ryugaku Network. All rights reserved.</p>
          <p>Focused on Japan, expanding globally.</p>
        </div>
      </div>
    </footer>
  )
}
