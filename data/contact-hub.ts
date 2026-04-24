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
    iconName: ContactHubIconName
    enabled: boolean
    external?: boolean
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
    title: "Connect with Global Ryugaku Network",
    subtitle:
        "Choose the fastest way to reach us for student guidance, enquiries, and partner discussions.",
    footerNote:
        "This page is intentionally unlisted and used for direct QR access only.",
    logoSrc: "/logo%20-%20complete.svg",
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
            iconName: "Phone",
            enabled: true,
            external: true,
        },
        {
            id: "line",
            label: "LINE",
            description: "Connect with us on LINE",
            href: "https://line.me/ti/p/7SKND95wR6",
            iconName: "Globe",
            enabled: true,
            external: true,
        },
        {
            id: "wechat",
            label: "WeChat",
            description: "Add us on WeChat",
            href: "https://u.wechat.com/kOV_uDeUO81bVmAv-hRfV6E?s=3",
            iconName: "Globe",
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
            iconName: "Globe",
            enabled: true,
        },
        {
            id: "contact-form",
            label: "Contact Form",
            description: "Send a message from the website",
            href: "/#contact",
            iconName: "FileText",
            enabled: true,
        },
        {
            id: "partner",
            label: "Partner With Us",
            description: "School and institution enquiries",
            href: "/#partner",
            iconName: "Handshake",
            enabled: true,
        },
    ],
}