'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function Maintenance() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12 text-center select-none">
      {/* ── Background Starfield & Void Layer ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'var(--color-void-deep)',
          backgroundImage: 'url(/sprites/void/bg-void.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '320px 320px',
          opacity: 0.65,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 animate-bg-scroll-slow"
        style={{
          backgroundImage: 'url(/sprites/void/bg-stars-3.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '640px 640px',
          opacity: 0.8,
        }}
        aria-hidden="true"
      />

      {/* Radial soft spotlight in center */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(0, 245, 196, 0.12) 0%, rgba(30, 16, 48, 0.4) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* ── Central Maintenance Card ── */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-xl rounded-xl p-6 sm:p-8 shadow-[8px_8px_0_0_#000]"
        style={{
          background: 'rgba(29, 16, 48, 0.92)',
          border: '2px solid var(--color-teal)',
          backdropFilter: 'blur(12px)',
        }}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Animated Ship in Drydock */}
        <div className="relative mx-auto mb-6 flex h-28 w-28 items-center justify-center">
          <div
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(0,245,196,0.25) 0%, transparent 70%)',
            }}
          />

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative flex flex-col items-center"
          >
            <div
              className="relative"
              style={{
                filter: 'hue-rotate(180deg) saturate(1.4) drop-shadow(0 0 16px rgba(0,245,196,0.7))',
              }}
            >
              {/* Ship Hull */}
              <div
                className="pixel-asset"
                style={{
                  width: 72,
                  height: 72,
                  backgroundImage: 'url(/sprites/void/ship-base.png)',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: '0 0',
                  backgroundSize: '100% 100%',
                  imageRendering: 'pixelated',
                }}
              />
              {/* Engine burst animation */}
              <div
                className="absolute pixel-asset animate-engine-burst"
                style={{
                  width: 36,
                  height: 36,
                  bottom: -32,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundImage: 'url(/sprites/void/engine-burst-sheet.png)',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: '0 0',
                  backgroundSize: '252px 72px',
                  imageRendering: 'pixelated',
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Status Pill */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1"
             style={{
               background: 'rgba(0, 245, 196, 0.1)',
               border: '1px solid rgba(0, 245, 196, 0.35)',
             }}>
          <span className="h-2 w-2 rounded-full animate-ping" style={{ background: 'var(--color-teal)' }} />
          <span className="font-stat text-xs tracking-wider" style={{ color: 'var(--color-teal)' }}>
            ORBITAL DRYDOCK // UNDER MAINTENANCE
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-display text-xl sm:text-2xl tracking-wide mb-3"
          style={{ color: 'var(--color-ink)' }}
        >
          ZENITH
        </h1>

        {/* Description */}
        <p
          className="font-body text-sm sm:text-base leading-relaxed mb-6 mx-auto max-w-md"
          style={{ color: 'var(--color-ink-muted)' }}
        >
          Station systems are currently undergoing engine calibration and orbital upgrades. We will be back online shortly.
        </p>

        {/* Diagnostic Status Box */}
        <div
          className="mb-6 rounded-lg p-3 text-left font-stat text-xs sm:text-sm space-y-1.5"
          style={{
            background: 'var(--color-void-deep)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: 'inset 2px 2px 0 0 rgba(0,0,0,0.6)',
          }}
        >
          <div className="flex justify-between">
            <span style={{ color: 'var(--color-ink-muted)' }}>Status:</span>
            <span style={{ color: 'var(--color-pink)', fontWeight: 'bold' }}>Refurbishing Modules...</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: 'var(--color-ink-muted)' }}>Pilot / Engineer:</span>
            <span style={{ color: 'var(--color-ink)' }}>Rizky Mardhani // Zenith</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: 'var(--color-ink-muted)' }}>Next Trajectory:</span>
            <span style={{ color: 'var(--color-teal)' }}>Zenith v3 Deployment</span>
          </div>
        </div>

        {/* Social / Contact Uplinks */}
        <div className="pt-2 border-t border-white/10">
          <p className="font-stat text-xs mb-3" style={{ color: 'var(--color-ink-muted)' }}>
            Need to reach out? Contact through direct frequencies:
          </p>
          <div className="flex items-center justify-center gap-3">
            {[
              { href: 'https://github.com/zxaviers', src: '/sprites/github.png', label: 'GitHub' },
              { href: 'https://linkedin.com/in/rizky-mardhani1st', src: '/sprites/linkedin.png', label: 'LinkedIn' },
              { href: 'https://www.instagram.com/ryzennth_/', src: '/sprites/Instagram.png', label: 'Instagram' },
            ].map(({ href, src, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all hover:scale-105"
                style={{
                  background: 'var(--color-void-deep)',
                  border: '1px solid rgba(0, 245, 196, 0.25)',
                  boxShadow: '2px 2px 0 0 #000',
                }}
              >
                <Image src={src} alt="" width={20} height={20} className="h-5 w-5 pixel-asset" />
                <span className="font-stat text-xs" style={{ color: 'var(--color-ink)' }}>{label}</span>
              </a>
            ))}
          </div>

          <div className="mt-4">
            <a
              href="mailto:riskimardhani@gmail.com"
              className="font-stat text-xs underline transition-opacity hover:opacity-80"
              style={{ color: 'var(--color-teal)' }}
            >
              ✉ riskimardhani@gmail.com
            </a>
          </div>
        </div>
      </motion.div>

      {/* Footer text */}
      <p className="relative z-10 mt-6 font-stat text-xs" style={{ color: 'var(--color-ink-muted)', opacity: 0.6 }}>
        © {new Date().getFullYear()} Zenith // All Systems Nominal
      </p>
    </main>
  )
}
