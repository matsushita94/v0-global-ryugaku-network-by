import Image from "next/image"
import {
    ArrowUpRight,
    Clock3,
    Globe,
    Handshake,
    Mail,
    MapPin,
    Phone,
    FileText,
    type LucideIcon,
} from "lucide-react"

import {
    contactHubContent,
    type ContactHubIconName,
    type ContactHubLink,
} from "@/data/contact-hub"

const iconMap: Record<ContactHubIconName, LucideIcon> = {
    Phone,
    Mail,
    Globe,
    FileText,
    Handshake,
}

function LinkIcon({ link }: { link: ContactHubLink }) {
    if (link.iconSrc) {
        return (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 group-hover:border-slate-300 group-hover:shadow">
                <Image
                    src={link.iconSrc}
                    alt={link.iconAlt ?? link.label}
                    width={30}
                    height={30}
                    className="h-7 w-7 object-contain"
                />
            </div>
        )
    }

    if (link.iconName) {
        const Icon = iconMap[link.iconName]

        return (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition-colors duration-200 group-hover:bg-blue-50 group-hover:text-blue-700">
                <Icon className="h-6 w-6" />
            </div>
        )
    }

    return (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100" />
    )
}

export function ContactHubPage() {
    const visibleLinks = contactHubContent.links.filter(
        (link) => link.enabled && link.href.trim().length > 0,
    )

    return (
        <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.10),_transparent_34%),linear-gradient(180deg,#f8fbff_0%,#ffffff_48%,#fffaf2_100%)]">
            <div className="absolute inset-x-0 top-0 h-72 bg-[linear-gradient(135deg,rgba(59,130,246,0.08),rgba(220,38,38,0.04),rgba(245,158,11,0.08))]" />
            <div className="absolute -left-16 top-24 h-48 w-48 rounded-full bg-blue-200/30 blur-3xl" />
            <div className="absolute -right-16 bottom-16 h-56 w-56 rounded-full bg-amber-200/20 blur-3xl" />

            <section className="section-container relative py-10 sm:py-14">
                <div className="mx-auto max-w-2xl">
                    <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/95 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
                        <div className="border-b border-slate-100 px-6 py-7 sm:px-8 sm:py-8">
                            <div className="mt-5">
                                <Image
                                    src={contactHubContent.logoSrc}
                                    alt={contactHubContent.logoAlt}
                                    width={760}
                                    height={140}
                                    priority
                                    className="h-auto w-full max-w-[360px]"
                                />
                            </div>

                            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                                {contactHubContent.title}
                            </h1>

                            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                                {contactHubContent.subtitle}
                            </p>
                        </div>

                        <div className="px-6 py-6 sm:px-8 sm:py-8">
                            <div className="grid gap-3 sm:grid-cols-2">
                                {visibleLinks.map((link) => {
                                    const opensNewTab =
                                        link.external === true ||
                                        link.href.startsWith("http://") ||
                                        link.href.startsWith("https://")

                                    return (
                                        <a
                                            key={link.id}
                                            href={link.href}
                                            target={opensNewTab ? "_blank" : undefined}
                                            rel={opensNewTab ? "noopener noreferrer" : undefined}
                                            className="group flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                                        >
                                            <div className="flex min-w-0 items-center gap-4">
                                                <LinkIcon link={link} />

                                                <div className="min-w-0">
                                                    <p className="text-base font-semibold text-slate-900">
                                                        {link.label}
                                                    </p>
                                                    <p className="text-sm text-slate-500">
                                                        {link.description}
                                                    </p>
                                                </div>
                                            </div>

                                            <ArrowUpRight className="ml-4 h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-700" />
                                        </a>
                                    )
                                })}
                            </div>

                            <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-slate-50/90 p-5 sm:p-6">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <a
                                        href={contactHubContent.phoneHref}
                                        className="flex items-start gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm transition hover:shadow-md"
                                    >
                                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                                            <Phone className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-500">Phone</p>
                                            <p className="mt-1 text-sm font-semibold text-slate-900 sm:text-base">
                                                {contactHubContent.phoneDisplay}
                                            </p>
                                        </div>
                                    </a>

                                    <a
                                        href={contactHubContent.emailHref}
                                        className="flex items-start gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm transition hover:shadow-md"
                                    >
                                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                                            <Mail className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-500">Email</p>
                                            <p className="mt-1 break-all text-sm font-semibold text-slate-900 sm:text-base">
                                                {contactHubContent.emailDisplay}
                                            </p>
                                        </div>
                                    </a>

                                    <div className="flex items-start gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm">
                                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                                            <MapPin className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-500">Location</p>
                                            <p className="mt-1 text-sm font-semibold text-slate-900 sm:text-base">
                                                {contactHubContent.location}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm">
                                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-700">
                                            <Clock3 className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-500">Hours</p>
                                            <p className="mt-1 text-sm font-semibold text-slate-900 sm:text-base">
                                                {contactHubContent.hours}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="mt-5 text-center text-xs font-medium tracking-wide text-slate-500">
                                {contactHubContent.footerNote}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}