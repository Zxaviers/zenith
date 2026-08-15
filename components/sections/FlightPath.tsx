'use client'

import { motion } from 'framer-motion'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { StarNode } from '@/components/ui/StarNode'

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
    organization: 'Politeknik Kota Malang',
    duration: '2023 — Present',
    description: [
      'Maintaining a 3.73 GPA across embedded systems, computer architecture, and networking courses.',
      'Active in laboratory practicums and department technical events.',
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
  { icon: '🎓', title: 'Honor Roll',  detail: '3.73 GPA' },
  { icon: '🛠️', title: 'IoT Builder', detail: 'ESP32 & Sensors' },
  { icon: '🚀', title: 'Web Shipper', detail: 'React / Next.js' },
  { icon: '📟', title: 'PCB Crafter', detail: 'Schematic Design' },
  { icon: '🎪', title: 'Event Staff', detail: 'Poltek Event' },
  { icon: '👾', title: 'Retro Gamer', detail: 'Secret Level' },
]

export function FlightPath() {
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
          <h2 className="font-display text-2xl md:text-3xl" style={{ color: 'var(--color-ink)' }}>
            Flight Path
          </h2>
          <p className="mt-2 font-body text-base md:text-lg" style={{ color: 'var(--color-ink-muted)' }}>
            Where I&apos;ve been, what I&apos;ve built, and where I&apos;m headed
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Timeline */}
          <div className="lg:col-span-2 relative pl-8 md:pl-10">
            {/* Rail line — teal gradient */}
            <div
              className="absolute left-3 md:left-4 top-4 bottom-4 w-1 rounded-full"
              style={{
                background: 'linear-gradient(to bottom, var(--color-teal), var(--color-teal-dim), var(--color-pink))',
                boxShadow: '0 0 8px var(--color-teal)',
              }}
              aria-hidden="true"
            />

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
                  <div className="absolute -left-[30px] md:-left-[34px] top-6 z-10">
                    <StarNode
                      label={mile.period}
                      size={20}
                      state={idx === 0 ? 'active' : 'unlocked'}
                    />
                  </div>

                  <PixelPanel
                    variant="nebula"
                    className="shadow-[4px_4px_0_0_#000] p-5 md:p-6"
                    style={{ '--pixel-border-color': 'rgba(0,245,196,0.3)' } as React.CSSProperties}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 mb-3">
                      <div>
                        <span className="font-stat text-xs font-bold block mb-0.5" style={{ color: 'var(--color-teal)' }}>
                          {mile.period} · {mile.duration}
                        </span>
                        <h3 className="font-display text-sm md:text-base" style={{ color: 'var(--color-ink)' }}>
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

                    <ul className="space-y-2 font-body text-sm md:text-base leading-relaxed" style={{ color: 'var(--color-ink)', opacity: 0.9 }}>
                      {mile.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="font-display text-[10px] mt-1" style={{ color: 'var(--color-teal)' }}>▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </PixelPanel>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Operator profile — clean labels, no military jargon */}
            <PixelPanel variant="void" className="shadow-[4px_4px_0_0_#000] p-4 md:p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <h3 className="font-display text-xs" style={{ color: 'var(--color-teal)' }}>
                  About Me
                </h3>
                <span className="h-2.5 w-2.5 rounded-full animate-pulse" style={{ background: 'var(--color-teal)' }} />
              </div>
              <ul className="space-y-2.5 font-stat text-xs md:text-sm">
                {[
                  { label: 'Level',         value: 'Lv. 20 · 94% XP', highlight: true },
                  { label: 'Focus',         value: 'System Engineer',  highlight: false },
                  { label: 'Based in',      value: 'Indonesia 🇮🇩',     highlight: false },
                  { label: 'Availability',  value: 'Open to work ✓',   highlight: true },
                ].map(({ label, value, highlight }) => (
                  <li key={label} className="flex justify-between border-b border-white/5 pb-1.5 last:border-0">
                    <span style={{ color: 'var(--color-ink-muted)' }}>{label}:</span>
                    <span style={{ color: highlight ? 'var(--color-teal)' : 'var(--color-ink)', fontWeight: highlight ? 'bold' : 'normal' }}>
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            </PixelPanel>

            {/* Badges */}
            <PixelPanel variant="void" className="shadow-[4px_4px_0_0_#000] p-4 md:p-5">
              <h3 className="font-display text-xs mb-3" style={{ color: 'var(--color-teal)' }}>
                Badges Unlocked
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {BADGES.map((b) => (
                  <div
                    key={b.title}
                    className="flex flex-col items-center justify-center gap-1 rounded p-2 text-center transition-all"
                    style={{
                      background: 'rgba(45,26,74,0.5)',
                      border: '1px solid rgba(0,245,196,0.1)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,196,0.4)'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,196,0.1)'
                    }}
                  >
                    <span className="text-2xl" aria-hidden="true">{b.icon}</span>
                    <span className="font-display text-[8px] leading-tight" style={{ color: 'var(--color-teal)' }}>{b.title}</span>
                    <span className="font-stat text-[9px]" style={{ color: 'var(--color-ink-muted)' }}>{b.detail}</span>
                  </div>
                ))}
              </div>
            </PixelPanel>
          </div>
        </div>
      </div>
    </section>
  )
}
