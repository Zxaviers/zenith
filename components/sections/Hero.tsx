'use client'

import { motion } from 'framer-motion'

/**
 * VoidShip — Renders the Foozle Void Main Ship using pure CSS sprite animation.
 *
 * Sprite layout (all PNGs from Foozle Void CC0 asset):
 *   ship-base.png          → 48×48, 1 frame (static hull)
 *   engine-burst-sheet.png → 336×96, 7 frames × 48px wide each
 *                            row 0 (y=0)  = Idle frames
 *                            row 1 (y=48) = Powering frames
 *
 * The component stacks the hull + engine as absolutely positioned layers,
 * engine positioned below the ship hull centre, rotated -90deg so the
 * thrust faces downward on-screen (ship faces up, moves up-right).
 */
function VoidShip({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative flex flex-col items-center select-none ${className}`}
      aria-hidden="true"
    >
      {/* Drop-shadow teal glow around the whole assembly */}
      <div className="relative" style={{ filter: 'hue-rotate(180deg) saturate(1.4) drop-shadow(0 0 14px rgba(0,245,196,0.55))' }}>
        {/* Ship hull — static 48×48 sprite */}
        <div
          className="pixel-asset"
          style={{
            width: 96,
            height: 96,
            backgroundImage: 'url(/sprites/void/ship-base.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0 0',
            backgroundSize: '100% 100%',
            imageRendering: 'pixelated',
          }}
        />

        {/* Engine burst — positioned below hull, animated spritesheet (7 frames) */}
        <div
          className="absolute pixel-asset animate-engine-burst"
          style={{
            width: 48,
            height: 48,
            bottom: -44,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundImage: 'url(/sprites/void/engine-burst-sheet.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0 0',
            backgroundSize: '336px 96px',
            imageRendering: 'pixelated',
          }}
        />
      </div>
    </div>
  )
}

/**
 * VoidPlanet — Renders the animated Earth-like planet sprite from Foozle.
 * Spritesheet: 7392×96px, 154 frames @ 48px each.
 * Displayed at 2× scale (96×96) with CSS steps() animation.
 */
function VoidPlanet({ className = '' }: { className?: string }) {
  return (
    // Outer wrapper: STATIC — drop-shadow here avoids per-frame filter recalc
    <div
      className={`relative select-none ${className}`}
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 0 18px rgba(0,245,196,0.3))' }}
    >
      {/* Soft outer glow ring — on its own element, not affecting spritesheet */}
      <div
        className="absolute inset-0 rounded-full animate-void-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(0,245,196,0.18) 0%, transparent 70%)',
          transform: 'scale(1.6)',
        }}
      />

      {/* Planet spritesheet — 154 frames at 2× scale (96×96).
          NO filter here: filter on a steps()-animated element forces
          browser to recalculate it every frame → flicker/stutter.
          Colors kept natural (blue-green Earth) as intentional accent. */}
      <div
        className="pixel-asset animate-planet-spin"
        style={{
          width: 96,
          height: 96,
          backgroundImage: 'url(/sprites/void/planet-earth.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '0 0',
          backgroundSize: '14784px 96px',
          imageRendering: 'pixelated',
          animationDuration: '8s',
        }}
      />
    </div>
  )
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden text-center px-4 sm:px-6 pt-28 pb-16 scroll-mt-24"
    >
      {/* ── Layer 0: Solid deep void base ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: 'var(--color-void-deep)' }}
        aria-hidden="true"
      />

      {/* ── Layer 1: Foozle bg-void texture tile, slowly scrolling ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 animate-bg-scroll-slow"
        style={{
          backgroundImage: 'url(/sprites/void/bg-void.png)',
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 100%',
          backgroundPosition: '0 0',
          opacity: 0.35,
        }}
        aria-hidden="true"
      />

      {/* ── Layer 2: Star sparkles from bg-stars-3.png (faster scroll) ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/sprites/void/bg-stars-3.png)',
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 60%',
          backgroundPosition: '0 30%',
          opacity: 0.55,
          animation: 'bg-scroll-slow 40s linear infinite reverse',
        }}
        aria-hidden="true"
      />

      {/* ── Layer 3: Ambient teal + purple nebula glow ── */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] md:h-[800px] md:w-[800px] rounded-full z-0 animate-void-pulse"
        style={{
          background:
            'radial-gradient(ellipse, rgba(0,245,196,0.08) 0%, rgba(45,26,74,0.3) 50%, transparent 80%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/4 left-1/6 h-[200px] w-[200px] md:h-[320px] md:w-[320px] rounded-full z-0 animate-void-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(0,245,196,0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
          animationDelay: '3s',
        }}
        aria-hidden="true"
      />

      {/* ── Layer 4: Orbital trajectory lines ── */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20 z-10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M -50 280 Q 400 90, 800 350 T 1600 220"
          fill="none"
          stroke="var(--color-teal)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
        <path
          d="M 80 750 Q 600 420, 1050 580 T 1900 320"
          fill="none"
          stroke="var(--color-pink)"
          strokeWidth="1"
          strokeDasharray="5 7"
        />
      </svg>

      {/* ── Layer 5: Foozle Ship — top-left quadrant ── */}
      <div
        className="pointer-events-none absolute left-[6%] top-[14%] z-10 md:left-[10%] md:top-[12%] animate-float-slow"
        style={{ transform: 'rotate(-15deg) scale(1.5)' }}
      >
        <VoidShip />
      </div>

      {/* ── Layer 6: Foozle Planet — bottom-right quadrant ── */}
      <div
        className="pointer-events-none absolute bottom-[8%] right-[5%] z-10 md:right-[8%] md:bottom-[6%] animate-float-slow"
        style={{ animationDelay: '3s', animationDuration: '18s' }}
      >
        <VoidPlanet />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-30 max-w-3xl mx-auto w-full px-4 flex flex-col items-center">

        {/* Badge — satu tempat, bentuk lencana bulat playful */}
        <motion.div
          className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-body font-bold text-xs sm:text-sm cursor-default select-none"
          style={{
            background: 'var(--color-teal)',
            color: 'var(--color-void-deep)',
            boxShadow: '0 0 20px rgba(0,245,196,0.45), 2px 2px 0 rgba(0,0,0,0.5)',
            border: '1px solid rgba(0,245,196,0.6)',
          }}
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span>Lv. 20 Explorer</span>
        </motion.div>

        {/* Headline — layered pixel-shadow dipertahankan, warna disesuaikan ke Void Teal */}
        <motion.h1
          className="mb-4 font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide leading-snug"
          style={{
            color: 'var(--color-ink)',
            textShadow:
              '2px 2px 0 #2d1a4a, 4px 4px 0 #1e1030, 6px 6px 0 #130d1a, 8px 8px 0 rgba(0,0,0,0.7)',
          }}
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Welcome to{' '}
          <span
            style={{
              color: 'var(--color-teal)',
              textDecoration: 'underline',
              textDecorationColor: 'var(--color-pink)',
              textDecorationThickness: '3px',
              textUnderlineOffset: '8px',
            }}
          >
            Zenith
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mb-8 font-body text-lg sm:text-xl md:text-2xl font-medium max-w-xl mx-auto leading-relaxed"
          style={{
            color: 'var(--color-ink)',
            opacity: 0.9,
            textShadow: '1px 1px 0 #130d1a',
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Web Enthusiast &amp; IoT Embedded Explorer
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          {/* Primary CTA — teal fill */}
          <a
            href="#mission-log"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-display text-xs sm:text-sm font-bold transition-all hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            style={{
              background: 'var(--color-teal)',
              color: 'var(--color-void-deep)',
              boxShadow: '0 4px 20px rgba(0,245,196,0.4), 3px 3px 0 rgba(0,0,0,0.6)',
            }}
          >
            🚀 Launch into Mission Log
          </a>

          {/* Secondary CTA — outlined */}
          <a
            href="#send-a-transmission"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-display text-xs sm:text-sm font-bold transition-all hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            style={{
              border: '2px solid rgba(240,238,255,0.7)',
              color: 'var(--color-ink)',
              background: 'rgba(45,26,74,0.4)',
              backdropFilter: 'blur(8px)',
            }}
          >
            📡 Send a Transmission
          </a>
        </motion.div>
      </div>

      {/* ── Footer credit (Bagian 4 requirement) ── */}
      <div
        className="absolute bottom-3 right-4 z-20 font-stat text-[10px] pointer-events-none"
        style={{ color: 'var(--color-ink-muted)', opacity: 0.5 }}
        aria-hidden="true"
      >
        Space assets by Foozle (foozle.io)
      </div>
    </section>
  )
}
