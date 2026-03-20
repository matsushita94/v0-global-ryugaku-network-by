import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Global Ryugaku Network | Study Anywhere in the World',
  description:
    'Global Ryugaku Network helps students discover and apply to schools around the world. We guide you through every step of your international education journey.',
  generator: 'v0.app',
  icons: {
    icon: '/Logo_favicon.png',
    shortcut: '/Logo_favicon.png',
    apple: '/Logo_favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
