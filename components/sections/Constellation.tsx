'use client'

import { useId, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StarNode } from '@/components/ui/StarNode'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { cn } from '@/lib/utils'

interface Skill {
  id: string
  name: string
  description: string
  level: 'Proficient' | 'Familiar' | 'Basic'
  levelScore: number
  icon: string
  x: number
  y: number
}

interface ConstellationCategory {
  title: string
  shortLabel: string
  skills: Skill[]
  links: [string, string][]
}

const SKILL_DATA: Record<string, ConstellationCategory> = {
  web: {
    title: '🌐 Web Development',
    shortLabel: 'Web',
    skills: [
      { id: 'react', name: 'React', description: 'Component architecture, hooks, state management, and modern reactive UIs.', level: 'Proficient', levelScore: 90, icon: '⚛️', x: 28, y: 25 },
      { id: 'tailwind', name: 'Tailwind', description: 'Utility-first rapid responsive styling and custom design systems.', level: 'Proficient', levelScore: 92, icon: '🍃', x: 72, y: 22 },
      { id: 'laravel', name: 'Laravel', description: 'Robust backend REST APIs, MVC structure, and relational DB integration.', level: 'Familiar', levelScore: 75, icon: '🐘', x: 78, y: 75 },
      { id: 'firebase', name: 'Firebase', description: 'Real-time database, cloud authentication, storage, and hosting solutions.', level: 'Familiar', levelScore: 78, icon: '🔥', x: 22, y: 72 },
    ],
    links: [
      ['react', 'tailwind'],
      ['tailwind', 'laravel'],
      ['laravel', 'firebase'],
      ['firebase', 'react'],
      ['react', 'laravel'],
    ],
  },
  iot: {
    title: '⚙️ IoT & Embedded',
    shortLabel: 'IoT',
    skills: [
      { id: 'cpp', name: 'C/C++', description: 'Low-level hardware registers, firmware efficiency, and real-time execution.', level: 'Proficient', levelScore: 88, icon: '💻', x: 50, y: 15 },
      { id: 'esp32', name: 'ESP32', description: 'Dual-core WiFi/BLE microcontroller firmware, telemetry, and FreeRTOS.', level: 'Proficient', levelScore: 92, icon: '🤖', x: 18, y: 55 },
      { id: 'sensors', name: 'Sensors', description: 'ADS1115, MPU6050, I2C/SPI bus integration, and signal filtration.', level: 'Familiar', levelScore: 82, icon: '🌡️', x: 82, y: 52 },
      { id: 'arduino', name: 'Arduino', description: 'Rapid hardware prototyping, sensor interfacing, and actuator control.', level: 'Proficient', levelScore: 85, icon: '📟', x: 50, y: 85 },
    ],
    links: [
      ['cpp', 'esp32'],
      ['cpp', 'sensors'],
      ['esp32', 'arduino'],
      ['sensors', 'arduino'],
      ['esp32', 'sensors'],
    ],
  },
  tools: {
    title: '🧰 Tools & Workflow',
    shortLabel: 'Tools',
    skills: [
      { id: 'git', name: 'Git & GitHub', description: 'Distributed version control, branching strategies, and CI/CD pipelines.', level: 'Proficient', levelScore: 88, icon: '🛠️', x: 20, y: 28 },
      { id: 'linux', name: 'Linux / CLI', description: 'Server administration, bash scripting, and environment configuration.', level: 'Familiar', levelScore: 75, icon: '🐧', x: 50, y: 48 },
      { id: 'ps', name: 'Photoshop', description: 'Pixel art asset creation, sprite alignment, and graphic design.', level: 'Familiar', levelScore: 80, icon: '🎨', x: 80, y: 22 },
      { id: 'blender', name: 'Blender', description: '3D spatial reasoning, low-poly asset modeling, and rendering basics.', level: 'Basic', levelScore: 55, icon: '🧊', x: 75, y: 78 },
    ],
    links: [
      ['git', 'linux'],
      ['linux', 'ps'],
      ['ps', 'blender'],
      ['linux', 'blender'],
    ],
  },
}

const CATEGORY_KEYS = Object.keys(SKILL_DATA)

const LEVEL_SIZE: Record<Skill['level'], number> = {
  Proficient: 26,
  Familiar: 20,
  Basic: 16,
}

export function Constellation() {
  const [activeTab, setActiveTab] = useState<string>('web')
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null)
  const gradientId = useId()

  const currentCategory = SKILL_DATA[activeTab]
  const currentSkills = currentCategory.skills
  const currentLinks = currentCategory.links

  const handleTabClick = (key: string) => {
    setActiveTab(key)
    setSelectedSkill(null)
    setHoveredSkillId(null)
  }

  const activeFocusId = hoveredSkillId || selectedSkill?.id

  return (
    <section id="constellation" className="relative px-6 py-24 scroll-mt-24">
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-2xl text-starchart md:text-3xl">Constellation</h2>
        <p className="mt-2 font-body text-base text-starchart/80 md:text-lg">
          Interactive star map telemetry & technical competencies
        </p>
      </motion.div>

      <PixelPanel variant="nebula" className="mx-auto max-w-5xl">
        {/* Category Tabs */}
        <div
          role="tablist"
          aria-label="Skill Categories"
          className="mb-8 flex flex-wrap justify-center gap-3 border-b border-white/10 pb-5"
        >
          {CATEGORY_KEYS.map((key) => {
            const isSelected = activeTab === key
            return (
              <button
                key={key}
                role="tab"
                id={`tab-${key}`}
                aria-controls={`panel-${key}`}
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => handleTabClick(key)}
                className={cn(
                  'relative rounded-sm px-4 py-2 font-display text-xs transition-all duration-200 cursor-pointer',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-aurora focus-visible:outline-offset-2',
                  isSelected
                    ? 'bg-void text-star shadow-[0_0_12px_rgba(255,200,87,0.3)] border border-star/40'
                    : 'text-starchart/80 hover:text-starchart hover:bg-void/40'
                )}
              >
                {SKILL_DATA[key].title}
              </button>
            )
          })}
        </div>

        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="grid grid-cols-1 gap-8 md:grid-cols-3 items-center"
        >
          {/* Interactive Constellation Map */}
          <div className="md:col-span-2">
            <div className="relative mx-auto aspect-square w-full max-w-md rounded-lg border border-white/5 bg-void/60 p-4 shadow-inner">
              {/* Radial radar ring guides */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-15">
                <div className="h-3/4 w-3/4 rounded-full border border-dashed border-starchart" />
                <div className="absolute h-1/2 w-1/2 rounded-full border border-dashed border-starchart" />
                <div className="absolute h-1/4 w-1/4 rounded-full border border-starchart" />
              </div>

              {/* Constellation Link SVG */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--color-star)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="var(--color-comet)" stopOpacity="0.8" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {currentLinks.map(([sourceId, targetId]) => {
                  const source = currentSkills.find((s) => s.id === sourceId)
                  const target = currentSkills.find((s) => s.id === targetId)
                  if (!source || !target) return null

                  const isLinkActive = activeFocusId === sourceId || activeFocusId === targetId

                  return (
                    <line
                      key={`${sourceId}-${targetId}`}
                      x1={`${source.x}%`}
                      y1={`${source.y}%`}
                      x2={`${target.x}%`}
                      y2={`${target.y}%`}
                      stroke={isLinkActive ? 'var(--color-star)' : `url(#${gradientId})`}
                      strokeWidth={isLinkActive ? 1.4 : 0.8}
                      strokeDasharray={isLinkActive ? 'none' : '3 3'}
                      filter={isLinkActive ? 'url(#glow)' : undefined}
                      className="transition-all duration-300"
                    />
                  )
                })}
              </svg>

              {/* Star Nodes */}
              {currentSkills.map((skill) => {
                const isSelected = selectedSkill?.id === skill.id
                const isHovered = hoveredSkillId === skill.id

                return (
                  <div
                    key={skill.id}
                    className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 z-20"
                    style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
                    onMouseEnter={() => setHoveredSkillId(skill.id)}
                    onMouseLeave={() => setHoveredSkillId(null)}
                  >
                    <StarNode
                      label={`${skill.name} — ${skill.level}`}
                      size={LEVEL_SIZE[skill.level]}
                      state={isSelected ? 'active' : isHovered ? 'active' : 'unlocked'}
                      onClick={() => setSelectedSkill(skill)}
                    />
                    <span
                      className={cn(
                        'font-stat text-xs md:text-sm px-1.5 py-0.5 rounded transition-colors',
                        isSelected || isHovered
                          ? 'bg-void text-star font-bold shadow'
                          : 'text-starchart/85 bg-void/40'
                      )}
                      aria-hidden="true"
                    >
                      {skill.icon} {skill.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Skill Telemetry & Detail Panel */}
          <div className="md:col-span-1">
            <SkillDescription skill={selectedSkill || currentSkills[0]} />
          </div>
        </div>
      </PixelPanel>
    </section>
  )
}

function SkillDescription({ skill }: { skill: Skill }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={skill.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
      >
        <PixelPanel variant="void" className="border border-star/30">
          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl" aria-hidden="true">{skill.icon}</span>
              <h3 className="font-display text-sm text-comet">{skill.name.toUpperCase()}</h3>
            </div>
            <span
              className={cn(
                'rounded-sm px-2 py-0.5 font-stat text-xs font-bold uppercase tracking-wider',
                skill.level === 'Proficient' && 'bg-aurora/20 text-aurora border border-aurora/40',
                skill.level === 'Familiar' && 'bg-star/20 text-star border border-star/40',
                skill.level === 'Basic' && 'bg-starchart/20 text-starchart border border-starchart/40'
              )}
            >
              {skill.level}
            </span>
          </div>

          {/* Proficiency Power Gauge */}
          <div className="mb-5 space-y-1.5">
            <div className="flex justify-between font-stat text-xs text-starchart/80">
              <span>MASTERY FREQUENCY</span>
              <span className="text-star">{skill.levelScore}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-sm bg-nebula/60 border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-comet via-star to-aurora"
                initial={{ width: 0 }}
                animate={{ width: `${skill.levelScore}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
          </div>

          <p className="font-body text-base leading-relaxed text-starchart/90">
            {skill.description}
          </p>

          <div className="mt-6 pt-3 border-t border-white/10 text-right">
            <span className="font-stat text-xs text-starchart/60">
              [TELEMETRY NODE // SYNCHRONIZED]
            </span>
          </div>
        </PixelPanel>
      </motion.div>
    </AnimatePresence>
  )
}
