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
    subtitle: 'Frontend, full-stack frameworks & interactive rendering',
    skills: [
      { id: 'react',      name: 'React.js',        level: 'Proficient', levelScore: 92, description: 'Core engine for modern interactive web apps — component architecture, custom hooks, state management.', icon: '⚛️', x: 50, y: 42 },
      { id: 'nextjs',     name: 'Next.js',          level: 'Proficient', levelScore: 88, description: 'App router, SSR, SSG, edge performance optimizations, and API routes.', icon: '▲', x: 24, y: 26 },
      { id: 'typescript', name: 'TypeScript',        level: 'Proficient', levelScore: 86, description: 'Type safety, interfaces, refactoring confidence, and large-scale app stability.', icon: '🔷', x: 76, y: 26 },
      { id: 'tailwind',   name: 'Tailwind CSS',     level: 'Proficient', levelScore: 94, description: 'Rapid UI engineering, design system tokens, responsive utilities, and micro-animations.', icon: '🎨', x: 50, y: 78 },
      { id: 'htmlcss',    name: 'HTML5 & CSS3',     level: 'Proficient', levelScore: 96, description: 'Semantic markup, accessibility, Grid, Flexbox, responsive layouts, and SVG animation.', icon: '🌐', x: 20, y: 70 },
      { id: 'javascript', name: 'JavaScript ES6+',  level: 'Proficient', levelScore: 92, description: 'Modern async programming, DOM APIs, event loops, and high-performance client scripting.', icon: '⚡', x: 80, y: 70 },
    ],
    links: [['react','nextjs'],['react','typescript'],['react','tailwind'],['tailwind','htmlcss'],['tailwind','javascript'],['nextjs','htmlcss'],['typescript','javascript']],
  },
  iot: {
    title: 'IoT & Embedded',
    subtitle: 'Microcontrollers, sensor networks & hardware firmware',
    skills: [
      { id: 'esp32',    name: 'ESP32 Wi-Fi/BT',       level: 'Proficient', levelScore: 90, description: 'Dual-core microcontroller programming, HTTP/MQTT wireless, sensor interfacing, smart device firmware.', icon: '📡', x: 50, y: 35 },
      { id: 'arduino',  name: 'Arduino C++',           level: 'Proficient', levelScore: 88, description: 'Hardware abstraction, GPIO control, PWM signals, analog sensors, and rapid prototyping.', icon: '🔌', x: 25, y: 30 },
      { id: 'sensors',  name: 'Sensor Networks',       level: 'Familiar',   levelScore: 82, description: 'Interfacing ultrasonic, temperature, humidity, load cells, and optical encoders.', icon: '🧭', x: 75, y: 30 },
      { id: 'pcb',      name: 'PCB Schematic Design',  level: 'Familiar',   levelScore: 78, description: 'Circuit routing, footprint creation, component selection, EasyEDA prototyping, and manufacturing prep.', icon: '📟', x: 50, y: 75 },
      { id: 'cplusplus', name: 'C / C++',              level: 'Proficient', levelScore: 85, description: 'Low-level memory management, embedded algorithms, timing loops, and hardware driver development.', icon: '⚙️', x: 22, y: 70 },
    ],
    links: [['esp32','arduino'],['esp32','sensors'],['esp32','pcb'],['arduino','cplusplus'],['pcb','cplusplus']],
  },
  tools: {
    title: 'Tools & DevOps',
    subtitle: 'Version control, build tooling & developer workflow',
    skills: [
      { id: 'git',    name: 'Git & GitHub',          level: 'Proficient', levelScore: 92, description: 'Branching workflows, version control discipline, remote sync, and open-source collaboration.', icon: '🐙', x: 50, y: 35 },
      { id: 'vscode', name: 'VS Code & Antigravity',  level: 'Proficient', levelScore: 95, description: 'Custom IDE setups, keyboard shortcuts, linting automation, and AI pair programming.', icon: '💻', x: 25, y: 35 },
      { id: 'vite',   name: 'Vite & Build Tools',    level: 'Proficient', levelScore: 90, description: 'Module bundling, HMR, PostCSS pipelines, and bundle size optimization.', icon: '⚡', x: 75, y: 35 },
      { id: 'figma',  name: 'Figma & Stitch',        level: 'Familiar',   levelScore: 82, description: 'UI/UX wireframing, design tokens, pixel-art sprite creation, and vibe-to-code design systems.', icon: '🎯', x: 50, y: 75 },
      { id: 'linux',  name: 'Linux / Terminal',      level: 'Familiar',   levelScore: 80, description: 'Bash scripting, package management, CLI automation, and SSH remote server navigation.', icon: '🐧', x: 22, y: 70 },
    ],
    links: [['git','vscode'],['git','vite'],['git','figma'],['vscode','linux'],['figma','linux']],
  },
}

const LEVEL_SIZE: Record<SkillLevel, number> = { Proficient: 28, Familiar: 20, Basic: 14 }

/* Teal palette level badge colors */
const LEVEL_BADGE: Record<SkillLevel, { bg: string; text: string; border: string }> = {
  Proficient: { bg: 'rgba(0,245,196,0.15)', text: 'var(--color-teal)',     border: 'rgba(0,245,196,0.4)' },
  Familiar:   { bg: 'rgba(255,107,157,0.12)', text: 'var(--color-pink)',   border: 'rgba(255,107,157,0.4)' },
  Basic:      { bg: 'rgba(240,238,255,0.08)', text: 'var(--color-ink)',    border: 'rgba(240,238,255,0.2)' },
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
          <h2 className="font-display text-2xl md:text-3xl" style={{ color: 'var(--color-ink)' }}>
            Constellation
          </h2>
          <p className="mt-2 font-body text-base md:text-lg" style={{ color: 'var(--color-ink-muted)' }}>
            Skills mapped as stars — click any node to read what I can do with it
          </p>
        </motion.div>

        <PixelPanel variant="nebula" className="shadow-[6px_6px_0_0_#000] p-4 md:p-8">
          {/* Category tabs */}
          <div className="mb-8 flex flex-wrap justify-center gap-3 border-b border-white/10 pb-5">
            {(['web', 'iot', 'tools'] as SkillCategory[]).map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={cn('px-4 py-2.5 rounded-md font-display text-xs transition-all cursor-pointer')}
                  style={
                    isActive
                      ? { background: 'var(--color-teal)', color: 'var(--color-void-deep)', fontWeight: 'bold', boxShadow: '3px 3px 0 0 #000', border: '2px solid var(--color-teal)' }
                      : { background: 'var(--color-void-deep)', color: 'var(--color-ink)', border: '1px solid rgba(255,255,255,0.1)' }
                  }
                >
                  {SKILL_SYSTEMS[cat].title}
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Star map */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-2 px-2 text-[11px] font-stat" style={{ color: 'var(--color-ink-muted)' }}>
                <span style={{ color: 'var(--color-teal)', fontWeight: 'bold' }}>{currentSystem.title.toUpperCase()}</span>
                <span>{currentSystem.subtitle}</span>
              </div>

              <div
                className="relative mx-auto aspect-square w-full max-w-lg rounded-lg p-4 overflow-hidden"
                style={{
                  background: 'var(--color-void-deep)',
                  border: '2px solid rgba(0,245,196,0.2)',
                  boxShadow: 'inset 4px 4px 0 0 rgba(0,0,0,0.8)',
                }}
              >
                {/* Radar sweep — teal tint */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
                  <div className="h-full w-full rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(0,245,196,0.08)_360deg)] animate-[spin_8s_linear_infinite]" />
                </div>

                {/* Grid rings */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-15" aria-hidden="true">
                  <div className="h-3/4 w-3/4 rounded-full border border-dashed" style={{ borderColor: 'var(--color-ink-muted)' }} />
                  <div className="absolute h-1/2 w-1/2 rounded-full border border-dashed" style={{ borderColor: 'var(--color-ink-muted)' }} />
                  <div className="absolute h-1/4 w-1/4 rounded-full border" style={{ borderColor: 'var(--color-ink-muted)' }} />
                  <div className="absolute h-full w-0.5" style={{ background: 'rgba(152,144,196,0.2)' }} />
                  <div className="absolute w-full h-0.5" style={{ background: 'rgba(152,144,196,0.2)' }} />
                </div>

                {/* Connection lines */}
                <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {currentSystem.links.map(([sourceId, targetId]) => {
                    const src = currentSystem.skills.find((s) => s.id === sourceId)
                    const tgt = currentSystem.skills.find((s) => s.id === targetId)
                    if (!src || !tgt) return null
                    const isActive = selectedSkill?.id === sourceId || selectedSkill?.id === targetId || hoveredSkillId === sourceId || hoveredSkillId === targetId
                    return (
                      <line
                        key={`${sourceId}-${targetId}`}
                        x1={`${src.x}%`} y1={`${src.y}%`}
                        x2={`${tgt.x}%`} y2={`${tgt.y}%`}
                        stroke={isActive ? 'var(--color-teal)' : 'var(--color-teal-dim)'}
                        strokeWidth={isActive ? 2 : 1}
                        strokeDasharray={isActive ? 'none' : '3 3'}
                        className="transition-all duration-300 opacity-50"
                      />
                    )
                  })}
                </svg>

                {/* Star nodes */}
                {currentSystem.skills.map((skill) => {
                  const isSelected = selectedSkill?.id === skill.id
                  const isHovered = hoveredSkillId === skill.id
                  const badge = LEVEL_BADGE[skill.level]
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
                      <div className="flex flex-col items-center mt-1 pointer-events-none">
                        <span
                          className="font-display text-[9px] md:text-[10px] px-1.5 py-0.5 rounded transition-all whitespace-nowrap"
                          style={
                            isSelected || isHovered
                              ? { background: 'var(--color-void-deep)', color: 'var(--color-teal)', fontWeight: 'bold', border: '1px solid var(--color-teal)', boxShadow: '2px 2px 0 0 #000' }
                              : { color: 'var(--color-ink)', background: 'rgba(19,13,26,0.85)', border: '1px solid rgba(255,255,255,0.1)' }
                          }
                        >
                          {skill.icon} {skill.name}
                        </span>
                        <span
                          className="font-stat text-[8px] md:text-[9px] mt-0.5 px-1 rounded uppercase tracking-wider font-bold"
                          style={{ background: badge.bg, color: badge.text, border: `1px solid ${badge.border}` }}
                        >
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Skill detail panel */}
            <div className="lg:col-span-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSkill.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <PixelPanel variant="void" className="shadow-[4px_4px_0_0_#000] p-4 md:p-5">
                    {/* Header */}
                    <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl" aria-hidden="true">{selectedSkill.icon}</span>
                        <h3 className="font-display text-xs md:text-sm" style={{ color: 'var(--color-teal)' }}>{selectedSkill.name}</h3>
                      </div>
                      <span
                        className="rounded px-2 py-0.5 font-stat text-xs font-bold uppercase"
                        style={{
                          background: LEVEL_BADGE[selectedSkill.level].bg,
                          color: LEVEL_BADGE[selectedSkill.level].text,
                          border: `1px solid ${LEVEL_BADGE[selectedSkill.level].border}`,
                        }}
                      >
                        {selectedSkill.level}
                      </span>
                    </div>

                    {/* Mastery bar — teal segments */}
                    <div className="mb-4 space-y-2">
                      <div className="flex justify-between items-center font-stat text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                        <span style={{ color: 'var(--color-teal)', fontWeight: 'bold' }}>Mastery</span>
                        <span style={{ color: 'var(--color-ink)', fontWeight: 'bold' }}>{selectedSkill.levelScore}%</span>
                      </div>
                      <div className="segment-bar py-1">
                        {Array.from({ length: 10 }).map((_, idx) => {
                          const isFilled = (idx + 1) * 10 <= selectedSkill.levelScore
                          return (
                            <div
                              key={idx}
                              className="segment flex-1 h-3 rounded-[1px]"
                              style={
                                isFilled
                                  ? {
                                      background: idx >= 8 ? 'var(--color-teal)' : idx >= 5 ? 'var(--color-teal-dim)' : 'rgba(0,191,160,0.7)',
                                      boxShadow: `0 0 6px ${idx >= 8 ? 'var(--color-teal)' : 'var(--color-teal-dim)'}`,
                                    }
                                  : { background: 'rgba(240,238,255,0.08)' }
                              }
                            />
                          )
                        })}
                      </div>
                    </div>

                    {/* Description — no "NODE_ID / STATUS: CALIBRATED" */}
                    <p className="font-body text-sm md:text-base leading-relaxed" style={{ color: 'var(--color-ink)', opacity: 0.9 }}>
                      {selectedSkill.description}
                    </p>
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
