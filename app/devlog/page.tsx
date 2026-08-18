import type { Metadata } from 'next'
import Link from 'next/link'
import { devlogPosts } from '@/lib/data/devlogPosts'
import { DevlogListClient } from './DevlogListClient'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { BookOpen, ArrowLeft, Home, Send } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Devlog | Zenith — Rizky Mardhani',
  description: 'Catatan teknis, arsitektur sistem IoT, dan rekayasa web oleh Rizky Mardhani.',
}

export default function DevlogListPage() {
  return (
    <section className="relative px-4 sm:px-6 py-24 min-h-screen">
      {/* Background ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 200, 87, 0.12) 0%, rgba(27, 18, 53, 0) 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Top Navigation Bar: Back to Home */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[var(--color-void-deep)] border border-[var(--color-star)]/40 font-display text-xs text-[var(--color-star)] hover:bg-[var(--color-star)]/15 transition-all shadow-[0_0_12px_rgba(255,200,87,0.2)]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>← KEMBALI KE BERANDA (HOME)</span>
          </Link>

          <Link
            href="/arcade"
            className="hidden sm:inline-flex items-center gap-1.5 font-stat text-xs text-[var(--color-comet)] hover:underline"
          >
            <span>🕹️ Mainkan Void Miner →</span>
          </Link>
        </div>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-3 rounded-full border border-[var(--color-star)]/30 bg-[var(--color-nebula)]/40 font-stat text-xs text-[var(--color-star)] shadow-[0_0_15px_rgba(255,200,87,0.25)]">
            <BookOpen className="h-3.5 w-3.5" />
            <span>MISSION DEVLOGS & RESEARCH</span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl text-[var(--color-starchart)] mb-3">
            Engineering Logs
          </h1>
          <p className="font-body text-base md:text-lg text-[var(--color-ink-muted)] max-w-xl mx-auto">
            Dokumentasi teknis, riset mikrokontroler ESP32, arsitektur full-stack, dan eksperimen frontend.
          </p>
        </div>

        <DevlogListClient posts={devlogPosts} />

        {/* Bottom CTA Box: Return to Home & Send Transmission */}
        <div className="mt-14 pt-8 border-t border-white/10">
          <PixelPanel variant="nebula" className="p-6 text-center border border-white/15 shadow-[4px_4px_0_0_#000]">
            <h3 className="font-display text-base text-[var(--color-star)] mb-2">
              Ingin berkolaborasi atau membahas proyek teknis?
            </h3>
            <p className="font-body text-xs md:text-sm text-[var(--color-ink-muted)] mb-5 max-w-md mx-auto">
              Jelajahi seluruh modul interaktif di beranda utama atau kirimkan pesan transmisi langsung.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--color-void-deep)] border border-[var(--color-star)]/50 font-display text-xs text-[var(--color-star)] hover:bg-[var(--color-star)]/15 transition-all shadow-[2px_2px_0_0_#000]"
              >
                <Home className="h-4 w-4" />
                <span>KEMBALI KE BERANDA (HOME)</span>
              </Link>
              <Link
                href="/#send-a-transmission"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--color-comet)] text-[var(--color-void)] font-display text-xs font-bold hover:scale-105 transition-all shadow-[2px_2px_0_0_#000]"
              >
                <Send className="h-4 w-4" />
                <span>KIRIM TRANSMISI →</span>
              </Link>
            </div>
          </PixelPanel>
        </div>
      </div>
    </section>
  )
}
