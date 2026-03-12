import Link from "next/link"
import { Globe } from "lucide-react"

const navigation = {
  main: [
    { name: "About", href: "#about" },
    { name: "Destinations", href: "#destinations" },
    { name: "Programs", href: "#programs" },
    { name: "Apply", href: "#apply" },
    { name: "Partner With Us", href: "#partner" },
    { name: "Contact", href: "#contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Globe className="size-8 text-primary-foreground" />
            <span className="text-xl font-semibold text-primary-foreground">
              Global Ryugaku Network
            </span>
          </Link>

          {/* Main Navigation */}
          <nav className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4">
            {navigation.main.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Legal Links */}
          <nav className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navigation.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs text-primary-foreground/50 hover:text-primary-foreground/70 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="mt-10 text-center text-sm text-primary-foreground/50">
            &copy; {new Date().getFullYear()} Global Ryugaku Network. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
