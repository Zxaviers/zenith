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

// Full Metadata API (title template, OG/Twitter tags, JSON-LD) lands in
// Fase 6. This is the Fase 3 brand-copy pass — same title/description now
// used by index.html and public/manifest.json, so both apps agree while
// they coexist.
export const metadata: Metadata = {
  title: 'Zenith | Computer Engineering Student & Web Developer',
  description:
    'Portfolio Zenith (Rizky Mardhani) \u2014 Computer Engineering student exploring web development, IoT, and AI.',
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
