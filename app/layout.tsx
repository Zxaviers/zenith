import type { Metadata, Viewport } from 'next'
import { Press_Start_2P, Nunito, VT323, Space_Grotesk, Quicksand } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/lib/config/siteConfig'

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

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
})

const quicksand = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1b1235',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.socials.liveSite),
  title: {
    default: `${siteConfig.handle} | ${siteConfig.name} — ${siteConfig.role}`,
    template: `%s | ${siteConfig.handle}`,
  },
  description: `Portfolio ${siteConfig.handle} (${siteConfig.name}) — ${siteConfig.role} at ${siteConfig.university}.`,
  openGraph: {
    title: `${siteConfig.handle} | ${siteConfig.name}`,
    description: `Portfolio ${siteConfig.handle} (${siteConfig.name}) — ${siteConfig.role} at ${siteConfig.university}.`,
    url: siteConfig.socials.liveSite,
    siteName: siteConfig.handle,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.handle} | ${siteConfig.name}`,
    description: `Portfolio ${siteConfig.handle} (${siteConfig.name}) — ${siteConfig.role} at ${siteConfig.university}.`,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteConfig.socials.liveSite}/#person`,
      name: siteConfig.name,
      url: siteConfig.socials.liveSite,
      description: `${siteConfig.role} at ${siteConfig.university}.`,
      sameAs: [
        siteConfig.socials.github,
        siteConfig.socials.linkedin,
        siteConfig.socials.instagram,
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.socials.liveSite}/#website`,
      url: siteConfig.socials.liveSite,
      name: siteConfig.handle,
      description: `Portfolio ${siteConfig.handle} (${siteConfig.name})`,
      publisher: {
        '@id': `${siteConfig.socials.liveSite}/#person`,
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${pixelDisplay.variable} ${body.variable} ${stat.variable} ${spaceGrotesk.variable} ${quicksand.variable}`}>
      <body className="antialiased overflow-x-hidden min-h-screen bg-[var(--color-void)] text-[var(--color-starchart)]">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
