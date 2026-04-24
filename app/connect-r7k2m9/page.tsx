import type { Metadata } from "next"

import { ContactHubPage } from "@/components/connect/contact-hub-page"

export const metadata: Metadata = {
    title: "GRN Connect",
    description: "Private QR contact hub for Global Ryugaku Network.",
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
        },
    },
}

export default function ConnectR7K2M9Page() {
    return <ContactHubPage />
}