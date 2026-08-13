'use client'

import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { StarNode } from '@/components/ui/StarNode'

const experiences = [
  {
    role: 'IoT & Automation Developer (Student Project)',
    company: 'University of Brawijaya',
    duration: '2024 - Now',
    waypoint: 'WP-03 // CURRENT ORBIT',
    description: [
      'Designed an IoT-based vehicle alignment telemetry system using ESP32, ADS1115, and MPU6050 sensors for toe and camber simulation.',
      'Implemented real-time data monitoring and dashboard visualization using React and Firebase.',
      'Optimized power-efficient sensor sampling rates and low-latency wireless data acquisition.',
    ],
  },
  {
    role: 'Web Developer',
    company: 'Freelance & Personal Projects',
    duration: '2023 - Now',
    waypoint: 'WP-02 // FREELANCE SECTOR',
    description: [
      'Architected and shipped modern high-performance web applications using React, Tailwind CSS, and Netlify Hosting.',
      'Developed and deployed production domains including zxaviers.site and custom client showcases.',
      'Maintained Git version control, semantic releases, and CI/CD deployment pipelines.',
    ],
  },
  {
    role: 'Computer Engineering Student',
    company: 'University of Malang',
    duration: '2024 - Now',
    waypoint: 'WP-01 // BASE ACADEMY',
    description: [
      'Academic specialization in Embedded Systems, Machine Learning algorithms, and IoT edge computing.',
      'Active leadership in engineering faculty events (Staff Perkap PKKMB 2025 & Staff PR Scholarship Fest 2025).',
      'Cumulative Academic GPA: 3.73 / 4.00.',
    ],
  },
]

const achievements = [
  { icon: '🎓', label: 'Honor Roll', detail: '3.73 GPA' },
  { icon: '🛠️', label: 'Event Staff', detail: 'PKKMB FILKOM 2025' },
  { icon: '🎗️', label: 'PR Lead', detail: 'Scholarship Fest 2025' },
  { icon: '🚀', label: 'IoT Builder', detail: 'ESP32 Alignment System' },
  { icon: '🌐', label: 'Web Shipper', detail: 'Production Live Apps' },
  { icon: '🕹️', label: 'Secret Agent', detail: 'Discovered Secret Level' },
]

function AnimatedNumber({ motionValue }: { motionValue: ReturnType<typeof useSpring> }) {
  const rounded = useTransform(motionValue, (latest) => Math.round(latest))
  return <motion.span>{rounded}</motion.span>
}

function StatItem({
  label,
  value,
  valueClassName = 'text-starchart',
  isAnimated = false,
}: {
  label: string
  value: string | number
  valueClassName?: string
  isAnimated?: boolean
}) {
  const ref = useRef<HTMLLIElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const motionValue = useSpring(0, { damping: 30, stiffness: 80 })

  useEffect(() => {
    if (isInView && typeof value === 'number') motionValue.set(value)
  }, [isInView, value, motionValue])

  return (
    <li ref={ref} className="flex items-center justify-between font-body text-base text-starchart/80 md:text-lg border-b border-white/5 pb-2">
      <span>{label}:</span>
      <span className={`font-display text-xs ${valueClassName}`}>
        {isAnimated && typeof value === 'number' ? <AnimatedNumber motionValue={motionValue} /> : value}
      </span>
    </li>
  )
}

export function FlightPath() {
  return (
    <section id="flight-path" className="relative px-6 py-20 scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-2xl text-starchart md:text-3xl">Flight Path</h2>
          <p className="mt-2 font-body text-base text-starchart/80 md:text-lg">
            Mission trajectory milestones & operational achievements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 items-start">
          {/* Vertical Flight Trajectory Column */}
          <div className="lg:col-span-2 relative pl-6 md:pl-10">
            {/* Vertical Trajectory Line */}
            <div
              className="absolute left-2.5 md:left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-comet via-star to-aurora/40"
              aria-hidden="true"
            />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.role}
                  className="relative group"
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true, amount: 0.25 }}
                >
                  {/* Waypoint Star Node on Line */}
                  <div className="absolute -left-[30px] md:-left-[38px] top-6 z-10">
                    <StarNode
                      label={exp.waypoint}
                      size={18}
                      state={index === 0 ? 'active' : 'unlocked'}
                    />
                  </div>

                  <PixelPanel variant="nebula" className="transition-transform duration-200 group-hover:translate-x-1 border border-star/20">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 mb-3">
                      <div>
                        <span className="font-stat text-xs text-comet block mb-1">
                          {exp.waypoint}
                        </span>
                        <h3 className="font-display text-sm md:text-base text-starchart">
                          {exp.role}
                        </h3>
                      </div>
                      <span className="rounded bg-void/80 px-2.5 py-1 font-stat text-xs text-star border border-star/30">
                        {exp.company} // {exp.duration}
                      </span>
                    </div>

                    <ul className="space-y-2 font-body text-base text-starchart/85 md:text-lg">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="mt-1 font-display text-[10px] text-comet shrink-0">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </PixelPanel>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Telemetry & Badges */}
          <div className="lg:col-span-1 space-y-6">
            {/* Agent Status Card */}
            <PixelPanel variant="void" className="border border-star/40 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <h3 className="font-display text-xs text-comet tracking-wider">
                  &gt; AGENT TELEMETRY
                </h3>
                <span className="h-2 w-2 rounded-full bg-aurora animate-ping" />
              </div>
              <ul className="space-y-3">
                <StatItem label="Operator Level" value={20} valueClassName="text-star" isAnimated />
                <StatItem label="Class" value="System Engineer" />
                <StatItem label="Origin Planet" value="Earth (ID)" />
                <StatItem label="Core Focus" value="IoT & Web Systems" />
                <StatItem label="Signal Status" value="Online // Active" valueClassName="text-aurora" />
              </ul>
            </PixelPanel>

            {/* Active Directive */}
            <PixelPanel variant="void" className="border border-comet/30">
              <h3 className="mb-2 font-display text-xs text-star">
                &gt; CURRENT DIRECTIVE
              </h3>
              <p className="font-body text-sm md:text-base text-starchart/90 leading-relaxed">
                Engineering high-efficiency embedded sensor networks while building ultra-responsive web interfaces with modern React ecosystem.
              </p>
            </PixelPanel>

            {/* Achievements Matrix */}
            <PixelPanel variant="void" className="border border-white/10">
              <h3 className="mb-3 font-display text-xs text-starchart/90 tracking-wider">
                &gt; UNLOCKED BADGES
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {achievements.map((a) => (
                  <div
                    key={a.label + a.detail}
                    className="flex flex-col items-center justify-center gap-1 rounded-sm border border-white/10 bg-void/80 p-2 text-center transition-all duration-200 hover:border-star/50 hover:bg-void"
                    title={a.detail}
                  >
                    <span className="text-2xl" aria-hidden="true">
                      {a.icon}
                    </span>
                    <span className="font-display text-[9px] leading-tight text-star">
                      {a.label}
                    </span>
                    <span className="font-stat text-[10px] text-starchart/60">
                      {a.detail}
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
