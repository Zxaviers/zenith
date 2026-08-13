import type { Metadata } from 'next'
import './globals.css'

// Placeholder metadata — replaced with the full Zenith brand + Metadata API
// setup in Fase 3/6. Kept intentionally minimal for the Fase 1 scaffold.
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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
