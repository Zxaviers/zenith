import type { Metadata } from 'next'
import Link from 'next/link'
import { VoidMinerGame } from '@/components/sections/VoidMinerGame'
import { PixelButton } from '@/components/ui/PixelButton'

export const metadata: Metadata = {
  title: 'Arcade — Void Miner | Zenith',
  description: 'Play Void Miner: Asteroid Harvester — 360° Zero-G Newtonian space mining arcade simulator.',
}

export default function ArcadePage() {
  return (
    <main className="relative min-h-screen px-4 sm:px-6 py-20 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Navigation & Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/">
            <PixelButton variant="comet" className="text-xs py-2 px-3 font-display">
              ← Return to Mission Base
            </PixelButton>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-star)]/30 bg-[var(--color-nebula)]/40 font-stat text-xs text-[var(--color-star)]">
            <span className="animate-pulse">🔴</span>
            <span>ZENITH SIMULATION DECK</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-display text-2xl md:text-4xl text-[var(--color-starchart)] mb-2">
            Void Miner : Asteroid Harvester
          </h1>
          <p className="font-body text-base md:text-lg text-[var(--color-ink-muted)] max-w-2xl mx-auto">
            Zero-G Newtonian physics mining simulator. Shatter volatile asteroids, tractor-beam stardust crystals into your cargo hold, and charge your quantum hyperdrive.
          </p>
        </div>

        {/* Game Canvas Container */}
        <VoidMinerGame />
      </div>
    </main>
  )
}
