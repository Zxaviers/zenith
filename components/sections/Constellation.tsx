'use client'

import { useId, useState } from 'react'
import { motion } from 'framer-motion'
import { StarNode } from '@/components/ui/StarNode'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { cn } from '@/lib/utils'

interface Skill {
  id: string
  name: string
  description: string
  level: 'Proficient' | 'Familiar' | 'Basic'
  icon: string
  /** Position within the constellation, as a percentage of the container. */
  x: number
  y: number
}

// Ported from src/Sections/Skills.jsx's SKILL_DATA — same skills/levels,
// repositioned from a CSS grid (row/col) onto percentage coordinates so
// they can be connected with real constellation lines instead of grid
// divider lines.
const SKILL_DATA: Record<string, { title: string; skills: Skill[] }> = {
  web: {
    title: '🌐 Web Development',
    skills: [
      { id: 'react', name: 'React', description: 'Building reactive UIs for web applications.', level: 'Proficient', icon: '⚛️', x: 50, y: 15 },
      { id: 'tailwind', name: 'Tailwind', description: 'Rapid styling with utility-first CSS.', level: 'Proficient', icon: '🍃', x: 15, y: 50 },
      { id: 'laravel', name: 'Laravel', description: 'Server-side logic with PHP framework.', level: 'Familiar', icon: '🐘', x: 85, y: 50 },
      { id: 'firebase', name: 'Firebase', description: 'Real-time DB, Auth, & Hosting.', level: 'Familiar', icon: '🔥', x: 50, y: 85 },
    ],
  },
  iot: {
    title: '⚙️ IoT & Embedded',
    skills: [
      { id: 'cpp', name: 'C/C++', description: 'Low-level, high-performance programming.', level: 'Proficient', icon: '💻', x: 50, y: 15 },
      { id: 'esp32', name: 'ESP32', description: 'Microcontroller programming.', level: 'Proficient', icon: '🤖', x: 15, y: 50 },
      { id: 'sensors', name: 'Sensors', description: 'Data acquisition and integration.', level: 'Familiar', icon: '🌡️', x: 85, y: 50 },
      { id: 'arduino', name: 'Arduino', description: 'Microcontroller programming.', level: 'Proficient', icon: '📟', x: 50, y: 85 },
    ],
  },
  tools: {
    title: '🧰 Tools & Workflow',
    skills: [
      { id: 'git', name: 'Git/VS Code', description: 'Version control & code editing.', level: 'Proficient', icon: '🛠️', x: 50, y: 15 },
      { id: 'ps', name: 'Photoshop', description: 'Pixel art & asset creation.', level: 'Familiar', icon: '🎨', x: 15, y: 50 },
      { id: 'blender', name: 'Blender', description: '3D modeling basics.', level: 'Basic', icon: '🧊', x: 85, y: 50 },
      { id: 'linux', name: 'Linux', description: 'Server management & OS.', level: 'Familiar', icon: '🐧', x: 50, y: 85 },
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
  const gradientId = useId()

  const currentSkills = SKILL_DATA[activeTab].skills

  const handleTabClick = (key: string) => {
    setActiveTab(key)
    setSelectedSkill(null)
  }

  // Connect every skill to the constellation's center point — reads as a
  // small rasi bintang (star cluster) rather than a rigid grid.
  const centerX = 50
  const centerY = 50

  return (
    <section id="constellation" className="relative px-6 py-24">
      <motion.h2
        className="mb-12 text-center font-display text-2xl text-starchart md:text-3xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Constellation
      </motion.h2>

      <PixelPanel variant="nebula" className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap justify-center gap-2 border-b border-white/10 pb-4">
          {CATEGORY_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => handleTabClick(key)}
              className={cn(
                'rounded-sm px-4 py-2 font-display text-[10px] transition-colors',
                activeTab === key
                  ? 'bg-void text-comet'
                  : 'text-starchart/80 hover:text-starchart'
              )}
              aria-pressed={activeTab === key}
            >
              {SKILL_DATA[key].title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--color-star)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="var(--color-comet)" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                {currentSkills.map((skill) => (
                  <line
                    key={skill.id}
                    x1={centerX}
                    y1={centerY}
                    x2={skill.x}
                    y2={skill.y}
                    stroke={`url(#${gradientId})`}
                    strokeWidth={0.6}
                    strokeDasharray="2 2"
                  />
                ))}
              </svg>

              {currentSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
                  style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
                >
                  <StarNode
                    label={`${skill.name} — ${skill.level}`}
                    size={LEVEL_SIZE[skill.level]}
                    state={selectedSkill?.id === skill.id ? 'active' : 'unlocked'}
                    onClick={() => setSelectedSkill(skill)}
                  />
                  <span
                    className="font-stat text-xs text-starchart/80 md:text-sm"
                    aria-hidden="true"
                  >
                    {skill.icon} {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <SkillDescription skill={selectedSkill} />
          </div>
        </div>
      </PixelPanel>
    </section>
  )
}

function SkillDescription({ skill }: { skill: Skill | null }) {
  if (!skill) {
    return (
      <PixelPanel variant="nebula" className="h-full">
        <h4 className="mb-2 font-display text-sm text-starchart/80">Select a star</h4>
        <p className="font-body text-base text-starchart/80">
          Click a node on the constellation to view its details.
        </p>
      </PixelPanel>
    )
  }

  return (
    <motion.div key={skill.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
      <PixelPanel variant="nebula" className="h-full">
        <h4 className="mb-2 font-display text-sm text-comet">{skill.name.toUpperCase()}</h4>
        <span className="rounded-sm bg-star px-2 py-1 font-stat text-sm text-void">
          Lv. {skill.level}
        </span>
        <p className="mt-6 font-body text-base text-starchart/90 md:text-lg">
          {skill.description}
        </p>
      </PixelPanel>
    </motion.div>
  )
}
