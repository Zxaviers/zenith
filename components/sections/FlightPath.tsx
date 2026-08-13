'use client'

import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { PixelPanel } from '@/components/ui/PixelPanel'

const experiences = [
  {
    role: 'IoT & Automation Developer (Student Project)',
    company: 'University of Brawijaya',
    duration: '2024 - Now',
    description: [
      'Designed an IoT-based vehicle alignment system using ESP32, ADS1115, and MPU6050 sensors for toe and camber simulation.',
      'Implemented real-time data monitoring and visualization using React and Firebase.',
      'Focused on power-efficient sensor integration and wireless data acquisition.',
    ],
  },
  {
    role: 'Web Developer',
    company: 'Freelance & Personal Projects',
    duration: '2023 - Now',
    description: [
      'Built and deployed responsive websites using React, Tailwind CSS, and Netlify Hosting.',
      'Developed the website zxaviers.site and pcb-custom-malang.web.app for personal and client showcase.',
      'Managed version control and CI/CD pipelines using GitHub and Vercel.',
    ],
  },
  {
    role: 'Computer Engineering Student',
    company: 'University of Malang',
    duration: '2024 - Now',
    description: [
      'Concentrating on Embedded Systems, AI/ML, and IoT Integration.',
      'Active in faculty events as Staff Perkap (PKKMB FILKOM 2025) and Staff PR (Scholarship Festival 2025).',
      'GPA: 3.73 at the end of Semester 2.',
    ],
  },
]

const achievements = [
  { icon: '🎓', label: 'Honor Roll', detail: '3.73 GPA' },
  { icon: '🛠️', label: 'Event Staff', detail: 'PKKMB FILKOM 2025' },
  { icon: '🎗️', label: 'Event Staff', detail: 'Scholarship Fest 2025' },
  { icon: '🚀', label: 'IoT Builder', detail: 'ESP32 Alignment System' },
  { icon: '🌐', label: 'Web Shipper', detail: '2+ Live Projects' },
  { icon: '🕹️', label: 'Secret Agent', detail: 'Found the Secret Level' },
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
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const motionValue = useSpring(0, { damping: 100, stiffness: 100 })

  useEffect(() => {
    if (isInView && typeof value === 'number') motionValue.set(value)
  }, [isInView, value, motionValue])

  return (
    <li ref={ref} className="flex items-center justify-between font-body text-lg text-starchart/80 md:text-xl">
      <span className="text-starchart/60">{label}:</span>
      <span className={`font-display text-xs ${valueClassName}`}>
        {isAnimated && typeof value === 'number' ? <AnimatedNumber motionValue={motionValue} /> : value}
      </span>
    </li>
  )
}

export function FlightPath() {
  return (
    <section id="flight-path" className="relative px-6 py-12 scroll-mt-24">
      <PixelPanel variant="nebula" className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center font-display text-2xl text-starchart md:text-3xl">
          Flight Path
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2 divide-y divide-comet/20">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.role}
                className="p-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h3 className="mb-1 font-display text-sm text-comet">{exp.role}</h3>
                <p className="mb-4 font-body text-base text-starchart/60 md:text-lg">
                  {exp.company} | {exp.duration}
                </p>
                <ul className="space-y-2 font-body text-lg text-starchart/80 md:text-xl">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 font-display text-xs text-comet">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="md:col-span-1 space-y-6">
            <PixelPanel variant="nebula">
              <h3 className="mb-4 text-center font-display text-sm text-comet">Agent Status</h3>
              <ul className="space-y-3">
                <StatItem label="Level" value={20} valueClassName="text-comet" isAnimated />
                <StatItem label="Class" value="Engineer" />
                <StatItem label="Planet" value="Earth" />
                <StatItem label="Focus" value="IoT & Web" />
                <StatItem label="Status" value="Online" valueClassName="text-aurora" />
              </ul>
            </PixelPanel>

            <PixelPanel variant="nebula">
              <h3 className="mb-4 text-center font-display text-sm text-comet">Active Objective</h3>
              <p className="text-center font-body text-lg text-starchart/90 md:text-xl">
                Currently mastering web development with React and expanding IoT knowledge.
              </p>
            </PixelPanel>

            <PixelPanel variant="nebula">
              <h3 className="mb-4 text-center font-display text-sm text-comet">
                Achievements Unlocked
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {achievements.map((a) => (
                  <div
                    key={a.label + a.detail}
                    className="flex flex-col items-center gap-1 rounded-sm border border-white/10 p-2 text-center"
                    title={a.detail}
                  >
                    <span className="text-2xl" aria-hidden="true">
                      {a.icon}
                    </span>
                    <span className="font-display text-[9px] leading-tight text-star">
                      {a.label}
                    </span>
                  </div>
                ))}
              </div>
            </PixelPanel>
          </div>
        </div>
      </PixelPanel>
    </section>
  )
}
