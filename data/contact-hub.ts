export type ContactHubIconName =
    | "Phone"
    | "Mail"
    | "Globe"
    | "FileText"
    | "Handshake"

export type ContactHubLink = {
    id: string
    label: string
    description: string
    href: string
    enabled: boolean
    external?: boolean
    iconName?: ContactHubIconName
    iconSrc?: string
    iconAlt?: string
}

export type ContactHubContent = {
    eyebrow: string
    title: string
    subtitle: string
    footerNote: string
    logoSrc: string
    logoAlt: string
    phoneDisplay: string
    phoneHref: string
    emailDisplay: string
    emailHref: string
    location: string
    hours: string
    links: ContactHubLink[]
}

export const contactHubContent: ContactHubContent = {
    eyebrow: "Quick Contact",
    title: "",
    subtitle:
        "",
    footerNote:
        "",
    logoSrc: "/images/logos/grn-logo.svg",
    logoAlt: "Global Ryugaku Network logo",
    phoneDisplay: "+81 70-9066-5906",
    phoneHref: "tel:+817090665906",
    emailDisplay: "info@globalryugakunetwork.com",
    emailHref: "mailto:info@globalryugakunetwork.com",
    location: "Wakayama-shi, Japan",
    hours: "24 hours",
    links: [
        {
            id: "call",
            label: "Call Us",
            description: "Direct phone contact",
            href: "tel:+817090665906",
            iconName: "Phone",
            enabled: true,
        },
        {
            id: "whatsapp",
            label: "WhatsApp",
            description: "Chat with us on WhatsApp",
            href: "https://wa.me/qr/OF6PKJJSM7QKA1",
            iconSrc: "/icons/whatsapp-icon.png",
            iconAlt: "WhatsApp icon",
            enabled: true,
            external: true,
        },
        {
            id: "line",
            label: "LINE",
            description: "Connect with us on LINE",
            href: "https://line.me/ti/p/7SKND95wR6",
            iconSrc: "/icons/line-icon.png",
            iconAlt: "LINE icon",
            enabled: true,
            external: true,
        },
        {
            id: "wechat",
            label: "WeChat",
            description: "Add us on WeChat",
            href: "https://u.wechat.com/kOV_uDeUO81bVmAv-hRfV6E?s=3",
            iconSrc: "/icons/wechat-icon.png",
            iconAlt: "WeChat icon",
            enabled: true,
            external: true,
        },
        {
            id: "email",
            label: "Email Us",
            description: "Business enquiries",
            href: "mailto:info@globalryugakunetwork.com",
            iconName: "Mail",
            enabled: true,
        },
        {
            id: "website",
            label: "Official Website",
            description: "Visit the main GRN site",
            href: "/",
            iconSrc: "/images/logos/grn-logo-initials.svg",
            iconAlt: "GRN initials logo",
            enabled: true,
        },
    ],
}
