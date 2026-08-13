import type { Metadata } from 'next'
import { Press_Start_2P, Nunito, VT323 } from 'next/font/google'
import './globals.css'

// Self-hosted at build time by next/font (no runtime request to Google
// Fonts, per ZENITH_PLAYBOOK.md §3 typography brief).
const pixelDisplay = Press_Start_2P({
  variable: '--font-press-start-2p',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const body = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  display: 'swap',
})

const stat = VT323({
  variable: '--font-vt323',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

// Placeholder metadata — replaced with the full Zenith brand + Metadata API
// setup in Fase 3/6. Kept intentionally minimal for the Fase 1/2 scaffold.
export const metadata: Metadata = {
  title: 'Zenith (Next.js scaffold)',
  description:
    'Next.js App Router scaffold for the Zenith rework. Content migration in progress.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${pixelDisplay.variable} ${body.variable} ${stat.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
