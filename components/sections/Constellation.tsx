'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { StarNode } from '@/components/ui/StarNode'
import { portfolioSounds } from '@/lib/audio/retroSounds'
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
  category?: SkillCategory
}

const SKILL_SYSTEMS: Record<
  SkillCategory,
  { title: string; subtitle: string; skills: Skill[]; links: [string, string][] }
> = {
  web: {
    title: 'Web Systems',
    subtitle: 'Frontend, full-stack frameworks & interactive rendering',
    skills: [
      { id: 'react',      name: 'React.js',        level: 'Proficient', levelScore: 92, description: 'Core engine for modern interactive web apps — component architecture, custom hooks, and state management.', icon: '⚛️', x: 50, y: 38, category: 'web' },
      { id: 'nextjs',     name: 'Next.js',          level: 'Proficient', levelScore: 88, description: 'App router, SSR, SSG, edge performance optimizations, and API routes.', icon: '▲', x: 25, y: 24, category: 'web' },
      { id: 'typescript', name: 'TypeScript',        level: 'Proficient', levelScore: 86, description: 'Type safety, interfaces, refactoring confidence, and large-scale app stability.', icon: '🔷', x: 75, y: 24, category: 'web' },
      { id: 'tailwind',   name: 'Tailwind CSS',     level: 'Proficient', levelScore: 94, description: 'Rapid UI engineering, design system tokens, responsive utilities, and micro-animations.', icon: '🎨', x: 50, y: 68, category: 'web' },
      { id: 'htmlcss',    name: 'HTML5 & CSS3',     level: 'Proficient', levelScore: 96, description: 'Semantic markup, accessibility, Grid, Flexbox, responsive layouts, and SVG animation.', icon: '🌐', x: 22, y: 62, category: 'web' },
      { id: 'javascript', name: 'JavaScript ES6+',  level: 'Proficient', levelScore: 92, description: 'Modern async programming, DOM APIs, event loops, and high-performance client scripting.', icon: '⚡', x: 78, y: 62, category: 'web' },
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
    subtitle: 'Microcontrollers, sensor networks & hardware firmware',
    skills: [
      { id: 'esp32',      name: 'ESP32 Wi-Fi/BT',       level: 'Proficient', levelScore: 90, description: 'Dual-core microcontroller programming, HTTP/MQTT wireless, sensor interfacing, smart device firmware.', icon: '📡', x: 50, y: 32, category: 'iot' },
      { id: 'arduino',    name: 'Arduino C++',           level: 'Proficient', levelScore: 88, description: 'Hardware abstraction, GPIO control, PWM signals, analog sensors, and rapid prototyping.', icon: '🔌', x: 25, y: 28, category: 'iot' },
      { id: 'sensors',    name: 'Sensor Networks',       level: 'Familiar',   levelScore: 82, description: 'Interfacing ultrasonic, temperature, humidity, load cells, and optical encoders.', icon: '🧭', x: 75, y: 28, category: 'iot' },
      { id: 'pcb',        name: 'PCB Schematic Design',  level: 'Familiar',   levelScore: 78, description: 'Circuit routing, footprint creation, component selection, EasyEDA prototyping, and manufacturing prep.', icon: '📟', x: 50, y: 68, category: 'iot' },
      { id: 'cplusplus',  name: 'C / C++',              level: 'Proficient', levelScore: 85, description: 'Low-level memory management, embedded algorithms, timing loops, and hardware driver development.', icon: '⚙️', x: 24, y: 62, category: 'iot' },
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
    subtitle: 'Version control, build tooling & developer workflow',
    skills: [
      { id: 'git',    name: 'Git & GitHub',          level: 'Proficient', levelScore: 92, description: 'Branching workflows, version control discipline, remote sync, and open-source collaboration.', icon: '🐙', x: 50, y: 32, category: 'tools' },
      { id: 'vscode', name: 'VS Code & Antigravity',  level: 'Proficient', levelScore: 95, description: 'Custom IDE setups, keyboard shortcuts, linting automation, and AI pair programming.', icon: '💻', x: 25, y: 30, category: 'tools' },
      { id: 'vite',   name: 'Vite & Build Tools',    level: 'Proficient', levelScore: 90, description: 'Module bundling, HMR, PostCSS pipelines, and bundle size optimization.', icon: '⚡', x: 75, y: 30, category: 'tools' },
      { id: 'figma',  name: 'Figma & Stitch',        level: 'Familiar',   levelScore: 82, description: 'UI/UX wireframing, design tokens, pixel-art sprite creation, and vibe-to-code design systems.', icon: '🎯', x: 50, y: 68, category: 'tools' },
      { id: 'linux',  name: 'Linux / Terminal',      level: 'Familiar',   levelScore: 80, description: 'Bash scripting, package management, CLI automation, and SSH remote server navigation.', icon: '🐧', x: 24, y: 62, category: 'tools' },
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

const LEVEL_SIZE: Record<SkillLevel, number> = { Proficient: 26, Familiar: 20, Basic: 15 }

/* Unified Cosmic Explorer level badge styling */
const LEVEL_BADGE: Record<SkillLevel, { bg: string; text: string; border: string }> = {
  Proficient: { bg: 'rgba(255, 200, 87, 0.15)', text: 'var(--color-star)',      border: 'rgba(255, 200, 87, 0.5)' },
  Familiar:   { bg: 'rgba(255, 139, 76, 0.15)', text: 'var(--color-comet)',     border: 'rgba(255, 139, 76, 0.5)' },
  Basic:      { bg: 'rgba(245, 233, 214, 0.1)',  text: 'var(--color-starchart)', border: 'rgba(245, 233, 214, 0.3)' },
}

export function Constellation() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('web')
  const [viewMode, setViewMode] = useState<'map' | 'matrix'>('map')
  const currentSystem = SKILL_SYSTEMS[activeCategory]
  const [selectedSkill, setSelectedSkill] = useState<Skill>(currentSystem.skills[0])
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null)
  const reducedMotion = useReducedMotion() ?? false

  const handleCategoryChange = (cat: SkillCategory) => {
    portfolioSounds.playSelect()
    setActiveCategory(cat)
    setSelectedSkill(SKILL_SYSTEMS[cat].skills[0])
    setHoveredSkillId(null)
  }

  const handleSkillSelect = (skill: Skill) => {
    portfolioSounds.playBlip(800)
    setSelectedSkill(skill)
  }

  const allSkills = [
    ...SKILL_SYSTEMS.web.skills,
    ...SKILL_SYSTEMS.iot.skills,
    ...SKILL_SYSTEMS.tools.skills,
  ]

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
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-[var(--color-star)]/30 bg-[var(--color-nebula)]/40 font-stat text-xs text-[var(--color-star)] shadow-[0_0_12px_rgba(255,200,87,0.25)]">
            <span>✨</span>
            <span>SKILL TREE TELEMETRY</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-[var(--color-starchart)]">
            Constellation
          </h2>
          <p className="mt-2 font-body text-base md:text-lg text-[var(--color-ink-muted)]">
            Skills mapped as stars — click any node to read capabilities and mastery depth
          </p>
        </motion.div>

        <PixelPanel variant="nebula" className="shadow-[6px_6px_0_0_#000] p-4 md:p-8">
          {/* Header Controls: Categories & View Mode Switcher */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {(['web', 'iot', 'tools'] as SkillCategory[]).map((cat) => {
                const isActive = activeCategory === cat
                return (
                  <motion.button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={cn('px-4 py-2 rounded-md font-display text-xs transition-all cursor-pointer select-none')}
                    style={
                      isActive
                        ? {
                            background: 'var(--color-star)',
                            color: 'var(--color-void)',
                            fontWeight: 'bold',
                            boxShadow: '3px 3px 0 0 #000, 0 0 16px rgba(255, 200, 87, 0.45)',
                            border: '2px solid var(--color-star)',
                          }
                        : {
                            background: 'var(--color-void)',
                            color: 'var(--color-starchart)',
                            border: '1px solid rgba(255,255,255,0.12)',
                          }
                    }
                    whileHover={reducedMotion ? {} : { scale: isActive ? 1 : 1.04 }}
                    whileTap={reducedMotion ? {} : { scale: 0.96 }}
                  >
                    {SKILL_SYSTEMS[cat].title}
                  </motion.button>
                )
              })}
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 rounded-lg bg-[var(--color-void)] p-1 border border-white/10 font-stat text-xs">
              <button
                type="button"
                onClick={() => {
                  portfolioSounds.playBlip(700)
                  setViewMode('map')
                }}
                className={cn(
                  'px-3 py-1.5 rounded transition-all cursor-pointer font-bold',
                  viewMode === 'map'
                    ? 'bg-[var(--color-nebula)] text-[var(--color-star)] shadow-[0_0_8px_rgba(255,200,87,0.3)]'
                    : 'text-[var(--color-ink-muted)] hover:text-[var(--color-starchart)]'
                )}
              >
                🌌 Star Map
              </button>
              <button
                type="button"
                onClick={() => {
                  portfolioSounds.playBlip(700)
                  setViewMode('matrix')
                }}
                className={cn(
                  'px-3 py-1.5 rounded transition-all cursor-pointer font-bold',
                  viewMode === 'matrix'
                    ? 'bg-[var(--color-nebula)] text-[var(--color-star)] shadow-[0_0_8px_rgba(255,200,87,0.3)]'
                    : 'text-[var(--color-ink-muted)] hover:text-[var(--color-starchart)]'
                )}
              >
                📊 Skill Matrix
              </button>
            </div>
          </div>

          {viewMode === 'map' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Star map canvas */}
              <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-3 px-2 text-[11px] font-stat text-[var(--color-ink-muted)]">
                  <span className="font-bold text-[var(--color-star)] tracking-wider">
                    ✦ {currentSystem.title.toUpperCase()}
                  </span>
                  <span>{currentSystem.subtitle}</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                    animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="relative mx-auto aspect-square w-full max-w-lg rounded-xl p-4 overflow-hidden select-none"
                    style={{
                      background: 'radial-gradient(ellipse at center, var(--color-nebula) 0%, var(--color-void) 80%)',
                      border: '2px solid rgba(255, 200, 87, 0.25)',
                      boxShadow: 'inset 0 0 30px rgba(0,0,0,0.85), 0 0 20px rgba(62,42,99,0.5)',
                    }}
                  >
                    {/* Radar sweep animation */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
                      <div className="h-full w-full rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(255,200,87,0.08)_360deg)] animate-[spin_10s_linear_infinite]" />
                    </div>

                    {/* Celestial coordinate grid */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20" aria-hidden="true">
                      <div className="h-4/5 w-4/5 rounded-full border border-dashed border-[var(--color-star)]" />
                      <div className="absolute h-3/5 w-3/5 rounded-full border border-dashed border-[var(--color-comet)]" />
                      <div className="absolute h-2/5 w-2/5 rounded-full border border-[var(--color-star)]" />
                      <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-[var(--color-starchart)] to-transparent opacity-30" />
                      <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-starchart)] to-transparent opacity-30" />
                    </div>

                    {/* SVG Asterism Lines — Perfectly centered to (src.x%, src.y%) */}
                    <svg
                      className="pointer-events-none absolute inset-0 h-full w-full"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient id="asterism-active" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="var(--color-star)" stopOpacity="1" />
                          <stop offset="100%" stopColor="var(--color-comet)" stopOpacity="1" />
                        </linearGradient>
                        <linearGradient id="asterism-inactive" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="var(--color-star)" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="var(--color-comet)" stopOpacity="0.3" />
                        </linearGradient>
                        <filter id="asterism-glow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="1.2" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      {currentSystem.links.map(([sourceId, targetId]) => {
                        const src = currentSystem.skills.find((s) => s.id === sourceId)
                        const tgt = currentSystem.skills.find((s) => s.id === targetId)
                        if (!src || !tgt) return null

                        const isHighlit =
                          selectedSkill?.id === sourceId ||
                          selectedSkill?.id === targetId ||
                          hoveredSkillId === sourceId ||
                          hoveredSkillId === targetId

                        return (
                          <line
                            key={`${sourceId}-${targetId}`}
                            x1={`${src.x}%`}
                            y1={`${src.y}%`}
                            x2={`${tgt.x}%`}
                            y2={`${tgt.y}%`}
                            stroke={isHighlit ? 'url(#asterism-active)' : 'url(#asterism-inactive)'}
                            strokeWidth={isHighlit ? 2.2 : 1.2}
                            strokeDasharray={isHighlit ? 'none' : '3 3'}
                            filter={isHighlit ? 'url(#asterism-glow)' : undefined}
                            style={{ transition: 'all 0.25s ease' }}
                          />
                        )
                      })}
                    </svg>

                    {/* Star Nodes — Centered exactly at (skill.x%, skill.y%) */}
                    {currentSystem.skills.map((skill, skillIdx) => {
                      const isSelected = selectedSkill?.id === skill.id
                      const isHovered = hoveredSkillId === skill.id
                      const badge = LEVEL_BADGE[skill.level]
                      const labelAbove = skill.y > 65

                      return (
                        <div
                          key={skill.id}
                          className="absolute z-20"
                          style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
                        >
                          {/* The Star Node Button itself is centered on (0, 0) */}
                          <div className="absolute -translate-x-1/2 -translate-y-1/2">
                            <StarNode
                              label={`${skill.name} — ${skill.level}`}
                              size={LEVEL_SIZE[skill.level]}
                              level={skill.level}
                              state={isSelected ? 'active' : isHovered ? 'active' : 'unlocked'}
                              onClick={() => handleSkillSelect(skill)}
                              onMouseEnter={() => setHoveredSkillId(skill.id)}
                              onMouseLeave={() => setHoveredSkillId(null)}
                            />
                          </div>

                          {/* Text Label & Badge floating cleanly below/above the star */}
                          <motion.div
                            className={cn(
                              'absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none whitespace-nowrap z-20',
                              labelAbove ? 'bottom-3.5 mb-1' : 'top-3.5 mt-1'
                            )}
                            initial={reducedMotion ? {} : { opacity: 0, scale: 0.92 }}
                            whileInView={reducedMotion ? {} : { opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.25,
                              delay: skillIdx * 0.04,
                              type: 'spring',
                              stiffness: 350,
                              damping: 22,
                            }}
                            viewport={{ once: true }}
                          >
                            {/* Skill name pill */}
                            <span
                              className="font-display text-[9px] md:text-[10px] px-1.5 py-0.5 rounded shadow-[2px_2px_0_0_#000] transition-colors"
                              style={
                                isSelected || isHovered
                                  ? {
                                      background: 'var(--color-void)',
                                      color: 'var(--color-star)',
                                      fontWeight: 'bold',
                                      border: '1.5px solid var(--color-star)',
                                      boxShadow: '0 0 10px rgba(255,200,87,0.4), 2px 2px 0 0 #000',
                                    }
                                  : {
                                      color: 'var(--color-starchart)',
                                      background: 'rgba(27, 18, 53, 0.88)',
                                      border: '1px solid rgba(255, 255, 255, 0.15)',
                                    }
                              }
                            >
                              {skill.icon} {skill.name}
                            </span>

                            {/* Level badge */}
                            <span
                              className="font-stat text-[8px] md:text-[9px] mt-0.5 px-1.5 py-0.2 rounded uppercase tracking-wider font-bold"
                              style={{
                                background: badge.bg,
                                color: badge.text,
                                border: `1px solid ${badge.border}`,
                              }}
                            >
                              {skill.level}
                            </span>
                          </motion.div>
                        </div>
                      )
                    })}
                  </motion.div>
                </AnimatePresence>
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
                          <span className="text-2xl" aria-hidden="true">
                            {selectedSkill.icon}
                          </span>
                          <h3 className="font-display text-xs md:text-sm text-[var(--color-star)]">
                            {selectedSkill.name}
                          </h3>
                        </div>
                        <span
                          className="rounded px-2 py-0.5 font-stat text-xs font-bold uppercase tracking-wider"
                          style={{
                            background: LEVEL_BADGE[selectedSkill.level].bg,
                            color: LEVEL_BADGE[selectedSkill.level].text,
                            border: `1px solid ${LEVEL_BADGE[selectedSkill.level].border}`,
                          }}
                        >
                          {selectedSkill.level}
                        </span>
                      </div>

                      {/* Mastery Bar */}
                      <div className="mb-4 space-y-2">
                        <div className="flex justify-between items-center font-stat text-xs text-[var(--color-ink-muted)]">
                          <span className="text-[var(--color-star)] font-bold">Proficiency Telemetry</span>
                          <span className="text-[var(--color-starchart)] font-bold">{selectedSkill.levelScore}%</span>
                        </div>
                        <div className="segment-bar py-1">
                          {Array.from({ length: 10 }).map((_, idx) => {
                            const isFilled = (idx + 1) * 10 <= selectedSkill.levelScore
                            return (
                              <div
                                key={idx}
                                className="segment flex-1 h-3 rounded-[1px] transition-all duration-300"
                                style={
                                  isFilled
                                    ? {
                                        background:
                                          idx >= 8
                                            ? 'var(--color-star)'
                                            : idx >= 5
                                              ? 'var(--color-comet)'
                                              : 'rgba(255, 139, 76, 0.75)',
                                        boxShadow: `0 0 8px ${idx >= 8 ? 'var(--color-star)' : 'var(--color-comet)'}`,
                                      }
                                    : { background: 'rgba(245, 233, 214, 0.08)' }
                                }
                              />
                            )
                          })}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="font-body text-sm md:text-base leading-relaxed text-[var(--color-starchart)] opacity-90">
                        {selectedSkill.description}
                      </p>
                    </PixelPanel>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          ) : (
            /* Matrix Grid View: Quick scannability of all skills */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentSystem.skills.map((skill) => {
                const isSelected = selectedSkill?.id === skill.id
                return (
                  <motion.div
                    key={skill.id}
                    onClick={() => handleSkillSelect(skill)}
                    className={cn(
                      'p-4 rounded-lg cursor-pointer transition-all border select-none',
                      isSelected
                        ? 'bg-[var(--color-void-deep)] border-[var(--color-star)] shadow-[0_0_14px_rgba(255,200,87,0.35)]'
                        : 'bg-[var(--color-void-deep)]/70 border-white/10 hover:border-white/25 hover:bg-[var(--color-void-deep)]'
                    )}
                    whileHover={reducedMotion ? {} : { y: -2 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{skill.icon}</span>
                        <h4 className="font-display text-xs text-[var(--color-starchart)]">{skill.name}</h4>
                      </div>
                      <span
                        className="font-stat text-[10px] px-2 py-0.5 rounded uppercase font-bold"
                        style={{
                          background: LEVEL_BADGE[skill.level].bg,
                          color: LEVEL_BADGE[skill.level].text,
                          border: `1px solid ${LEVEL_BADGE[skill.level].border}`,
                        }}
                      >
                        {skill.level}
                      </span>
                    </div>

                    <p className="font-body text-xs text-[var(--color-ink-muted)] line-clamp-2 mb-3">
                      {skill.description}
                    </p>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-stat text-[var(--color-ink-muted)]">
                        <span>MASTERY</span>
                        <span className="text-[var(--color-star)] font-bold">{skill.levelScore}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--color-star)] rounded-full transition-all duration-500"
                          style={{ width: `${skill.levelScore}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </PixelPanel>
      </div>
    </section>
  )
}
