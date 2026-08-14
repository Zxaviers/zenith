'use client'

import { motion } from 'framer-motion'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { StarNode } from '@/components/ui/StarNode'

interface Milestone {
  waypoint: string
  title: string
  organization: string
  duration: string
  description: string[]
}

const MILESTONES: Milestone[] = [
  {
    waypoint: 'WP-03 // CURRENT',
    title: 'Computer Engineering Expedition',
    organization: 'Politeknik Kota Malang',
    duration: '2023 — Present',
    description: [
      'Maintaining a 3.73 Cumulative GPA across embedded systems, computer architecture, and networking.',
      'Active leadership in laboratory practicums and department technical events.',
    ],
  },
  {
    waypoint: 'WP-02 // HARDWARE',
    title: 'Hardware & IoT Prototyping',
    organization: 'Independent Lab Research',
    duration: '2024 — Present',
    description: [
      'Engineered automated sorting and sensor telemetry nodes using ESP32, optical sensors, and MQTT.',
      'Designed custom PCB layouts and implemented real-time monitoring web dashboards.',
    ],
  },
  {
    waypoint: 'WP-01 // FOUNDATION',
    title: 'Full-Stack Web Engineering',
    organization: 'Open Source & Projects',
    duration: '2023 — Present',
    description: [
      'Developed high-performance web applications using React, Next.js, and modern TypeScript.',
      'Crafted custom design systems, responsive interfaces, and accessible web experiences.',
    ],
  },
]

const BADGES = [
  { icon: '🎓', title: 'Honor Roll', detail: '3.73 GPA' },
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
          <h2 className="font-display text-2xl text-starchart md:text-3xl">
            Flight Path
          </h2>
          <p className="mt-2 font-body text-base text-starchart/80 md:text-lg">
            Mission trajectory milestones &amp; operational achievements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Vertical Flight Rail */}
          <div className="lg:col-span-2 relative pl-8 md:pl-10">
            {/* Trajectory Rail Line */}
            <div
              className="absolute left-3 md:left-4 top-4 bottom-4 w-1 bg-gradient-to-b from-star via-comet to-aurora rounded-full shadow-[0_0_8px_var(--color-star)]"
              aria-hidden="true"
            />

            <div className="space-y-8">
              {MILESTONES.map((mile, idx) => (
                <motion.div
                  key={mile.waypoint}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  viewport={{ once: true }}
                >
                  {/* Waypoint Star Node on Rail */}
                  <div className="absolute -left-[30px] md:-left-[34px] top-6 z-10">
                    <StarNode
                      label={mile.waypoint}
                      size={20}
                      state={idx === 0 ? 'active' : 'unlocked'}
                    />
                  </div>

                  <PixelPanel
                    variant="nebula"
                    className="border-2 border-star/40 shadow-[4px_4px_0_0_#000] p-5 md:p-6 glint-top"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-white/10 pb-3 mb-3">
                      <div>
                        <span className="font-stat text-xs text-comet font-bold block mb-0.5">
                          {mile.waypoint}
                        </span>
                        <h3 className="font-display text-sm md:text-base text-star">
                          {mile.title}
                        </h3>
                      </div>
                      <span className="rounded bg-void px-2.5 py-1 font-stat text-xs text-starchart border border-white/15">
                        {mile.organization} // {mile.duration}
                      </span>
                    </div>

                    <ul className="space-y-2 font-body text-sm md:text-base text-starchart/90 leading-relaxed">
                      {mile.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="font-display text-[10px] text-comet mt-1">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </PixelPanel>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Achievements & Status */}
          <div className="lg:col-span-1 space-y-6">
            {/* Operator Telemetry Panel */}
            <PixelPanel variant="void" className="border-2 border-star/40 shadow-[4px_4px_0_0_#000] p-4 md:p-5">
              <div className="flex items-center justify-between border-b-2 border-white/10 pb-3 mb-4">
                <h3 className="font-display text-xs text-star">
                  &gt; OPERATOR PROFILE
                </h3>
                <span className="h-2.5 w-2.5 rounded-full bg-aurora animate-pulse" />
              </div>
              <ul className="space-y-2.5 font-stat text-xs md:text-sm">
                <li className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-starchart/70">Operator Level:</span>
                  <span className="text-star font-bold">LV. 20 (94% EXP)</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-starchart/70">Class Specialization:</span>
                  <span className="text-starchart">System Engineer</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-starchart/70">Home Sector:</span>
                  <span className="text-starchart">Indonesia // ID</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-starchart/70">Uplink Status:</span>
                  <span className="text-aurora font-bold">ACTIVE &amp; NOMINAL</span>
                </li>
              </ul>
            </PixelPanel>

            {/* Achievement Badges Matrix */}
            <PixelPanel variant="void" className="border-2 border-white/15 shadow-[4px_4px_0_0_#000] p-4 md:p-5">
              <h3 className="font-display text-xs text-star mb-3">
                &gt; UNLOCKED BADGES
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {BADGES.map((b) => (
                  <div
                    key={b.title}
                    className="flex flex-col items-center justify-center gap-1 rounded bg-nebula/60 border border-white/10 p-2 text-center hover:border-star transition-colors"
                  >
                    <span className="text-2xl" aria-hidden="true">{b.icon}</span>
                    <span className="font-display text-[8px] leading-tight text-star">
                      {b.title}
                    </span>
                    <span className="font-stat text-[9px] text-starchart/60">
                      {b.detail}
                    </span>
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
