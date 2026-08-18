'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { StarNode } from '@/components/ui/StarNode'
import { portfolioSounds } from '@/lib/audio/retroSounds'
import { siteConfig } from '@/lib/config/siteConfig'

// ── Data (unchanged) ──────────────────────────────────────────────────────────
interface Milestone {
  period: string
  title: string
  organization: string
  duration: string
  description: string[]
}

const MILESTONES: Milestone[] = [
  {
    period: 'Now',
    title: 'Computer Engineering',
    organization: 'Universitas Brawijaya',
    duration: '2023 — Present',
    description: [
      'Pursuing Computer Engineering with a strong focus on embedded hardware, microcontrollers, and computer architecture.',
      'Active in faculty laboratory practicums and department technical events.',
    ],
  },
  {
    period: 'Hardware',
    title: 'IoT & Hardware Prototyping',
    organization: 'Independent Projects',
    duration: '2024 — Present',
    description: [
      'Built automated sorting and sensor telemetry nodes with ESP32, optical sensors, and MQTT.',
      'Designed custom PCB layouts and built real-time monitoring web dashboards.',
    ],
  },
  {
    period: 'Web',
    title: 'Full-Stack Web Engineering',
    organization: 'Open Source & Projects',
    duration: '2023 — Present',
    description: [
      'Built high-performance web apps using React, Next.js, and TypeScript.',
      'Crafted custom design systems, responsive interfaces, and accessible web experiences.',
    ],
  },
]

const BADGES = [
  { icon: '🎓', title: 'UB Student',  detail: 'Computer Eng' },
  { icon: '🛠️', title: 'IoT Builder', detail: 'ESP32 & Sensors' },
  { icon: '🚀', title: 'Web Shipper', detail: 'React / Next.js' },
  { icon: '📟', title: 'PCB Crafter', detail: 'Schematic Design' },
  { icon: '🎪', title: 'Event Staff', detail: 'UB Events' },
  { icon: '👾', title: 'Retro Gamer', detail: 'Arcade Vault' },
]

// ── Animated rail that fills based on scroll ─────────────────────────────────
function AnimatedRail({ reducedMotion }: { reducedMotion: boolean }) {
  const railRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 0.9', 'end 0.1'],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  if (reducedMotion) {
    return (
      <div
        className="absolute left-3 md:left-4 top-4 bottom-4 w-1 rounded-full"
        style={{
          background: 'linear-gradient(to bottom, var(--color-star), var(--color-comet))',
          boxShadow: '0 0 8px var(--color-star)',
        }}
        aria-hidden="true"
      />
    )
  }

  return (
    <>
      {/* Dim base rail (always visible) */}
      <div
        className="absolute left-3 md:left-4 top-4 bottom-4 w-1 rounded-full"
        style={{ background: 'rgba(255, 200, 87, 0.12)' }}
        aria-hidden="true"
      />
      {/* Bright fill rail — grows with scroll progress */}
      <motion.div
        ref={railRef}
        className="absolute left-3 md:left-4 top-4 bottom-4 w-1 rounded-full origin-top"
        style={{
          scaleY,
          background: 'linear-gradient(to bottom, var(--color-star), var(--color-comet))',
          boxShadow: '0 0 12px rgba(255, 200, 87, 0.6)',
        }}
        aria-hidden="true"
      />
    </>
  )
}

// ── Timeline dot that "pops" when entry enters viewport ───────────────────────
function AnimatedDot({
  period,
  isFirst,
  reducedMotion,
}: {
  period: string
  isFirst: boolean
  reducedMotion: boolean
}) {
  return (
    <motion.div
      className="absolute -left-[30px] md:-left-[34px] top-6 z-10"
      initial={reducedMotion ? {} : { scale: 0.92, opacity: 0 }}
      whileInView={reducedMotion ? {} : { scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 350, damping: 22, delay: 0.08 }}
      viewport={{ once: true }}
    >
      <StarNode
        label={period}
        size={20}
        state={isFirst ? 'active' : 'unlocked'}
      />
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export function FlightPath() {
  const reducedMotion = useReducedMotion() ?? false

  return (
    <section id="flight-path" className="relative px-4 sm:px-6 py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-[var(--color-star)]/30 bg-[var(--color-nebula)]/40 font-stat text-xs text-[var(--color-star)] shadow-[0_0_12px_rgba(255,200,87,0.25)]">
            <span>🚀</span>
            <span>TRAJECTORY & MILESTONES</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-[var(--color-starchart)]">
            Flight Path
          </h2>
          <p className="mt-2 font-body text-base md:text-lg text-[var(--color-ink-muted)]">
            Where I&apos;ve been, what I&apos;ve built, and where I&apos;m headed
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* ── Timeline ── */}
          <div className="lg:col-span-2 relative pl-8 md:pl-10">
            {/* Animated scroll-progress rail */}
            <AnimatedRail reducedMotion={reducedMotion} />

            <div className="space-y-8">
              {MILESTONES.map((mile, idx) => (
                <motion.div
                  key={mile.period}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  viewport={{ once: true }}
                >
                  {/* Dot: pops/glows before card fades in */}
                  <AnimatedDot
                    period={mile.period}
                    isFirst={idx === 0}
                    reducedMotion={reducedMotion}
                  />

                  <PixelPanel
                    variant="nebula"
                    className="shadow-[4px_4px_0_0_#000] p-5 md:p-6"
                    style={{ '--pixel-border-color': 'rgba(255, 200, 87, 0.3)' } as React.CSSProperties}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 mb-3">
                      <div>
                        <span className="font-stat text-xs font-bold block mb-0.5 text-[var(--color-star)]">
                          {mile.period} · {mile.duration}
                        </span>
                        <h3 className="font-display text-sm md:text-base text-[var(--color-starchart)]">
                          {mile.title}
                        </h3>
                      </div>
                      <span
                        className="rounded px-2.5 py-1 font-stat text-xs"
                        style={{
                          background: 'var(--color-void-deep)',
                          color: 'var(--color-ink-muted)',
                          border: '1px solid rgba(255,255,255,0.12)',
                        }}
                      >
                        {mile.organization}
                      </span>
                    </div>

                    <ul className="space-y-2 font-body text-sm md:text-base leading-relaxed text-[var(--color-starchart)] opacity-90">
                      {mile.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="font-display text-[10px] mt-1 text-[var(--color-star)]">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </PixelPanel>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="lg:col-span-1 space-y-6">
            {/* Operator profile */}
            <PixelPanel variant="void" className="shadow-[4px_4px_0_0_#000] p-4 md:p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <h3 className="font-display text-xs text-[var(--color-star)]">
                  About Me
                </h3>
                <motion.span
                  className="h-2.5 w-2.5 rounded-full bg-[var(--color-star)] shadow-[0_0_8px_rgba(255,200,87,0.8)]"
                  animate={reducedMotion ? {} : { opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <ul className="space-y-2.5 font-stat text-xs md:text-sm">
                {[
                  { label: 'Level',        value: `${siteConfig.level} · 94% XP`, highlight: true },
                  { label: 'Focus',        value: 'System Engineer',             highlight: false },
                  { label: 'Based in',     value: siteConfig.location,           highlight: false },
                  { label: 'Status',       value: 'Online 🚀',                   highlight: true },
                ].map(({ label, value, highlight }) => (
                  <li key={label} className="flex justify-between border-b border-white/5 pb-1.5 last:border-0">
                    <span style={{ color: 'var(--color-ink-muted)' }}>{label}:</span>
                    <span style={{ color: highlight ? 'var(--color-star)' : 'var(--color-starchart)', fontWeight: highlight ? 'bold' : 'normal' }}>
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            </PixelPanel>

            {/* Badges — hover tilt + scale + sparkle sound */}
            <PixelPanel variant="void" className="shadow-[4px_4px_0_0_#000] p-4 md:p-5">
              <h3 className="font-display text-xs mb-3 text-[var(--color-star)]">
                Badges Unlocked
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {BADGES.map((b, idx) => (
                  <motion.div
                    key={b.title}
                    className="flex flex-col items-center justify-center gap-1 rounded p-2 text-center cursor-pointer select-none"
                    style={{
                      background: 'rgba(62, 42, 99, 0.5)',
                      border: '1px solid rgba(255, 200, 87, 0.15)',
                    }}
                    initial={reducedMotion ? {} : { opacity: 0, scale: 0.94 }}
                    whileInView={reducedMotion ? {} : { opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, delay: idx * 0.05, type: 'spring', stiffness: 350, damping: 22 }}
                    viewport={{ once: true }}
                    whileHover={reducedMotion ? {} : {
                      scale: 1.06,
                      borderColor: 'rgba(255, 200, 87, 0.6)',
                      boxShadow: '0 0 14px rgba(255, 200, 87, 0.3)',
                    }}
                    whileTap={reducedMotion ? {} : { scale: 0.95 }}
                    onMouseEnter={() => portfolioSounds.playStarSparkle()}
                    onClick={() => portfolioSounds.playStarSparkle()}
                  >
                    <span className="text-2xl" aria-hidden="true">{b.icon}</span>
                    <span className="font-display text-[8px] leading-tight text-[var(--color-star)]">{b.title}</span>
                    <span className="font-stat text-[9px] text-[var(--color-ink-muted)]">{b.detail}</span>
                  </motion.div>
                ))}
              </div>
            </PixelPanel>
          </div>
        </div>
      </div>
    </section>
  )
}
