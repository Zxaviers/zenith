'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { StarNode } from '@/components/ui/StarNode'
import { cn } from '@/lib/utils'

export type SkillCategory = 'web' | 'iot' | 'tools'
export type SkillLevel = 'Proficient' | 'Familiar' | 'Basic'

export interface Skill {
  id: string
  name: string
  level: SkillLevel
  levelScore: number
  description: string
  icon: string
  x: number
  y: number
}

const SKILL_SYSTEMS: Record<
  SkillCategory,
  { title: string; subtitle: string; skills: Skill[]; links: [string, string][] }
> = {
  web: {
    title: 'Web Systems',
    subtitle: 'Sector A: Frontend, full-stack frameworks & interactive rendering',
    skills: [
      {
        id: 'react',
        name: 'React.js',
        level: 'Proficient',
        levelScore: 92,
        description: 'Core engine for modern interactive web applications, component architecture, custom hooks, and state management.',
        icon: '⚛️',
        x: 50,
        y: 42,
      },
      {
        id: 'nextjs',
        name: 'Next.js',
        level: 'Proficient',
        levelScore: 88,
        description: 'App router architecture, server-side rendering (SSR), static site generation (SSG), and edge performance optimizations.',
        icon: '▲',
        x: 24,
        y: 26,
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        level: 'Proficient',
        levelScore: 86,
        description: 'Robust type safety, advanced interfaces, refactoring confidence, and large-scale application stability.',
        icon: '🔷',
        x: 76,
        y: 26,
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        level: 'Proficient',
        levelScore: 94,
        description: 'Rapid UI engineering, design system tokens, responsive utilities, and custom micro-animations.',
        icon: '🎨',
        x: 50,
        y: 78,
      },
      {
        id: 'htmlcss',
        name: 'HTML5 & CSS3',
        level: 'Proficient',
        levelScore: 96,
        description: 'Semantic markup, accessibility, CSS Grid, Flexbox, responsive layouts, and SVG animation techniques.',
        icon: '🌐',
        x: 20,
        y: 70,
      },
      {
        id: 'javascript',
        name: 'JavaScript ES6+',
        level: 'Proficient',
        levelScore: 92,
        description: 'Modern asynchronous programming, DOM APIs, event loops, and high-performance client scripting.',
        icon: '⚡',
        x: 80,
        y: 70,
      },
    ],
    links: [
      ['react', 'nextjs'],
      ['react', 'typescript'],
      ['react', 'tailwind'],
      ['tailwind', 'htmlcss'],
      ['tailwind', 'javascript'],
      ['nextjs', 'htmlcss'],
      ['typescript', 'javascript'],
    ],
  },
  iot: {
    title: 'IoT & Embedded',
    subtitle: 'Sector B: Microcontrollers, sensor telemetry & hardware firmware',
    skills: [
      {
        id: 'esp32',
        name: 'ESP32 Wi-Fi/BT',
        level: 'Proficient',
        levelScore: 90,
        description: 'Dual-core microcontroller programming, HTTP/MQTT wireless telemetry, sensor interfacing, and smart device firmware.',
        icon: '📡',
        x: 50,
        y: 35,
      },
      {
        id: 'arduino',
        name: 'Arduino C++',
        level: 'Proficient',
        levelScore: 88,
        description: 'Hardware abstraction, GPIO manipulation, PWM signal control, analog sensor readings, and rapid prototyping.',
        icon: '🔌',
        x: 25,
        y: 30,
      },
      {
        id: 'sensors',
        name: 'Sensor Networks',
        level: 'Familiar',
        levelScore: 82,
        description: 'Interfacing ultrasonic, temperature, humidity, load cells, optical encoders, and environmental sensor arrays.',
        icon: '🧭',
        x: 75,
        y: 30,
      },
      {
        id: 'pcb',
        name: 'PCB Schematic Design',
        level: 'Familiar',
        levelScore: 78,
        description: 'Circuit routing, footprint creation, component selection, Eagle/EasyEDA prototyping, and manufacturing preparation.',
        icon: '📟',
        x: 50,
        y: 75,
      },
      {
        id: 'cplusplus',
        name: 'C / C++',
        level: 'Proficient',
        levelScore: 85,
        description: 'Low-level memory management, embedded algorithms, timing loops, and hardware driver development.',
        icon: '⚙️',
        x: 22,
        y: 70,
      },
    ],
    links: [
      ['esp32', 'arduino'],
      ['esp32', 'sensors'],
      ['esp32', 'pcb'],
      ['arduino', 'cplusplus'],
      ['pcb', 'cplusplus'],
    ],
  },
  tools: {
    title: 'Tools & DevOps',
    subtitle: 'Sector C: Version control, build tooling & developer workflow',
    skills: [
      {
        id: 'git',
        name: 'Git & GitHub',
        level: 'Proficient',
        levelScore: 92,
        description: 'Branching workflows, version control discipline, remote synchronization, and open-source collaboration.',
        icon: '🐙',
        x: 50,
        y: 35,
      },
      {
        id: 'vscode',
        name: 'VS Code & Antigravity',
        level: 'Proficient',
        levelScore: 95,
        description: 'Custom IDE setups, keyboard shortcuts, linting automation, and pair programming agents.',
        icon: '💻',
        x: 25,
        y: 35,
      },
      {
        id: 'vite',
        name: 'Vite & Build Tools',
        level: 'Proficient',
        levelScore: 90,
        description: 'Module bundling, Hot Module Replacement (HMR), PostCSS pipelines, and bundle size optimization.',
        icon: '⚡',
        x: 75,
        y: 35,
      },
      {
        id: 'figma',
        name: 'Figma & Stitch',
        level: 'Familiar',
        levelScore: 82,
        description: 'UI/UX wireframing, design tokens, pixel-art sprite creation, and vibe-to-code design systems.',
        icon: '🎯',
        x: 50,
        y: 75,
      },
      {
        id: 'linux',
        name: 'Linux / Terminal',
        level: 'Familiar',
        levelScore: 80,
        description: 'Bash scripting, package management, CLI automation, and SSH remote server navigation.',
        icon: '🐧',
        x: 22,
        y: 70,
      },
    ],
    links: [
      ['git', 'vscode'],
      ['git', 'vite'],
      ['git', 'figma'],
      ['vscode', 'linux'],
      ['figma', 'linux'],
    ],
  },
}

const LEVEL_SIZE: Record<SkillLevel, number> = {
  Proficient: 28,
  Familiar: 20,
  Basic: 14,
}

export function Constellation() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('web')
  const currentSystem = SKILL_SYSTEMS[activeCategory]
  const [selectedSkill, setSelectedSkill] = useState<Skill>(currentSystem.skills[0])
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null)

  const handleCategoryChange = (cat: SkillCategory) => {
    setActiveCategory(cat)
    setSelectedSkill(SKILL_SYSTEMS[cat].skills[0])
    setHoveredSkillId(null)
  }

  return (
    <section id="constellation" className="relative px-4 sm:px-6 py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-2xl text-starchart md:text-3xl">
            Constellation
          </h2>
          <p className="mt-2 font-body text-base text-starchart/80 md:text-lg">
            Interactive Astronomical Observatory &amp; Technical Competency Star Chart
          </p>
        </motion.div>

        <PixelPanel variant="nebula" className="shadow-[6px_6px_0_0_#000] border-2 border-star glint-top p-4 md:p-8">
          {/* Category Selector Tabs */}
          <div className="mb-8 flex flex-wrap justify-center gap-3 border-b-2 border-white/10 pb-5">
            {(['web', 'iot', 'tools'] as SkillCategory[]).map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={cn(
                    'px-4 py-2.5 rounded-md font-display text-xs transition-all cursor-pointer',
                    isActive
                      ? 'bg-star text-void font-bold shadow-[3px_3px_0_0_#000] border-2 border-star'
                      : 'bg-void/80 text-starchart hover:text-star hover:bg-void border border-white/10'
                  )}
                >
                  {SKILL_SYSTEMS[cat].title}
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Interactive Constellation Star Map */}
            <div className="lg:col-span-2">
              {/* Radar Coordinate Header */}
              <div className="flex justify-between items-center mb-2 px-2 text-[11px] font-stat text-starchart/70">
                <span className="text-star font-bold">SECTOR // {activeCategory.toUpperCase()}_CONSTELLATION</span>
                <span>OBSERVATORY // LIVE ASTROMETRY</span>
              </div>

              <div className="relative mx-auto aspect-square w-full max-w-lg rounded-lg border-2 border-star/40 bg-void/90 p-4 shadow-[inset_4px_4px_0_0_rgba(0,0,0,0.8)] overflow-hidden">
                {/* Rotating 360 Radar Sweep */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
                  <div className="h-full w-full rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(255,200,87,0.12)_360deg)] animate-[spin_8s_linear_infinite]" />
                </div>

                {/* Radar Grid Lines */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20" aria-hidden="true">
                  <div className="h-3/4 w-3/4 rounded-full border border-dashed border-starchart" />
                  <div className="absolute h-1/2 w-1/2 rounded-full border border-dashed border-starchart" />
                  <div className="absolute h-1/4 w-1/4 rounded-full border border-starchart" />
                  <div className="absolute h-full w-0.5 bg-starchart/20" />
                  <div className="absolute w-full h-0.5 bg-starchart/20" />
                </div>

                {/* SVG Asterism Connection Lines */}
                <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {currentSystem.links.map(([sourceId, targetId]) => {
                    const src = currentSystem.skills.find((s) => s.id === sourceId)
                    const tgt = currentSystem.skills.find((s) => s.id === targetId)
                    if (!src || !tgt) return null

                    const isActive = selectedSkill?.id === sourceId || selectedSkill?.id === targetId || hoveredSkillId === sourceId || hoveredSkillId === targetId

                    return (
                      <line
                        key={`${sourceId}-${targetId}`}
                        x1={`${src.x}%`}
                        y1={`${src.y}%`}
                        x2={`${tgt.x}%`}
                        y2={`${tgt.y}%`}
                        stroke={isActive ? 'var(--color-star)' : 'var(--color-comet)'}
                        strokeWidth={isActive ? 2 : 1}
                        strokeDasharray={isActive ? 'none' : '3 3'}
                        className="transition-all duration-300 opacity-60"
                      />
                    )
                  })}
                </svg>

                {/* Scaled Star Nodes with Dual Name & Level Labels */}
                {currentSystem.skills.map((skill) => {
                  const isSelected = selectedSkill?.id === skill.id
                  const isHovered = hoveredSkillId === skill.id

                  return (
                    <div
                      key={skill.id}
                      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center z-20"
                      style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
                      onMouseEnter={() => setHoveredSkillId(skill.id)}
                      onMouseLeave={() => setHoveredSkillId(null)}
                    >
                      <StarNode
                        label={`${skill.name} — ${skill.level}`}
                        size={LEVEL_SIZE[skill.level]}
                        level={skill.level}
                        state={isSelected ? 'active' : isHovered ? 'active' : 'unlocked'}
                        onClick={() => setSelectedSkill(skill)}
                      />

                      {/* Name & Level Badge Underneath */}
                      <div className="flex flex-col items-center mt-1 pointer-events-none">
                        <span
                          className={cn(
                            'font-display text-[9px] md:text-[10px] px-1.5 py-0.5 rounded transition-all whitespace-nowrap',
                            isSelected || isHovered
                              ? 'bg-void text-star font-bold shadow-[2px_2px_0_0_#000] border border-star'
                              : 'text-starchart bg-void/85 border border-white/10'
                          )}
                        >
                          {skill.icon} {skill.name}
                        </span>
                        <span
                          className={cn(
                            'font-stat text-[8px] md:text-[9px] mt-0.5 px-1 rounded uppercase tracking-wider font-bold',
                            skill.level === 'Proficient' && 'text-aurora bg-aurora/15 border border-aurora/40',
                            skill.level === 'Familiar' && 'text-star bg-star/15 border border-star/40',
                            skill.level === 'Basic' && 'text-starchart/80 bg-starchart/15 border border-starchart/30'
                          )}
                        >
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Side Telemetry Intel Panel */}
            <div className="lg:col-span-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSkill.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <PixelPanel variant="void" className="border-2 border-star/40 shadow-[4px_4px_0_0_#000] p-4 md:p-5">
                    {/* Header */}
                    <div className="mb-4 flex items-center justify-between border-b-2 border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl" aria-hidden="true">{selectedSkill.icon}</span>
                        <h3 className="font-display text-xs md:text-sm text-star">{selectedSkill.name}</h3>
                      </div>
                      <span
                        className={cn(
                          'rounded px-2 py-0.5 font-stat text-xs font-bold uppercase',
                          selectedSkill.level === 'Proficient' && 'bg-aurora/20 text-aurora border border-aurora/40',
                          selectedSkill.level === 'Familiar' && 'bg-star/20 text-star border border-star/40',
                          selectedSkill.level === 'Basic' && 'bg-starchart/20 text-starchart border border-starchart/40'
                        )}
                      >
                        {selectedSkill.level}
                      </span>
                    </div>

                    {/* 10-Segment Discrete LED Power Bar */}
                    <div className="mb-4 space-y-2">
                      <div className="flex justify-between items-center font-stat text-xs text-starchart/80">
                        <span className="text-comet font-bold">MASTERY // INTEGRITY</span>
                        <span className="text-aurora font-bold">{selectedSkill.levelScore}%</span>
                      </div>

                      <div className="segment-bar py-1">
                        {Array.from({ length: 10 }).map((_, idx) => {
                          const isFilled = (idx + 1) * 10 <= selectedSkill.levelScore
                          return (
                            <div
                              key={idx}
                              className={cn(
                                'segment flex-1 h-3 rounded-[1px]',
                                isFilled
                                  ? idx >= 8
                                    ? 'bg-aurora shadow-[0_0_6px_#6fcf97]'
                                    : idx >= 5
                                      ? 'bg-star shadow-[0_0_6px_#ffc857]'
                                      : 'bg-comet shadow-[0_0_6px_#ff8b4c]'
                                  : 'segment-empty'
                              )}
                            />
                          )
                        })}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="font-body text-sm md:text-base text-starchart/90 leading-relaxed mb-4">
                      {selectedSkill.description}
                    </p>

                    <div className="pt-3 border-t border-white/10 flex justify-between items-center font-stat text-[11px] text-starchart/60">
                      <span>NODE_ID: {selectedSkill.id.toUpperCase()}</span>
                      <span className="text-aurora">STATUS: CALIBRATED</span>
                    </div>
                  </PixelPanel>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </PixelPanel>
      </div>
    </section>
  )
}
