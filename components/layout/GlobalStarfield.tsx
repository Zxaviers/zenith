'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface Star {
  id: number
  left: string
  top: string
  size: number
  opacity: number
  dur: string
  delay: string
  color: string
}

const STAR_COLORS = [
  'var(--color-star)',     // Golden Star #ffc857
  '#ffffff',               // Pure White
  'var(--color-comet)',    // Comet Orange #ff8b4c
  'var(--color-aurora)',   // Teal Aurora #00f5c4
  '#e2d9f3',               // Starchart Lavender
]

export function GlobalStarfield({ starCount = 140 }: { starCount?: number }) {
  const [stars, setStars] = useState<Star[]>([])
  const reducedMotion = useReducedMotion() ?? false

  useEffect(() => {
    // Generate organic cosmic distribution client-side
    const generated: Star[] = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      left: `${(Math.random() * 100).toFixed(2)}%`,
      top: `${(Math.random() * 100).toFixed(2)}%`,
      size: Math.random() * 2.4 + 1,
      opacity: Math.random() * 0.6 + 0.25,
      dur: `${(Math.random() * 3 + 2).toFixed(2)}s`,
      delay: `${(Math.random() * 5).toFixed(2)}s`,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    }))
    setStars(generated)
  }, [starCount])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      {/* ── Atmospheric Nebula Backdrops across the whole viewport ── */}
      <div
        className="absolute -left-48 top-10 h-[700px] w-[700px] rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(62,42,99,0.4) 0%, rgba(27,18,53,0) 70%)' }}
      />
      <div
        className="absolute -right-40 top-1/3 h-[800px] w-[800px] rounded-full opacity-35 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(255,139,76,0.15) 0%, rgba(27,18,53,0) 65%)' }}
      />
      <div
        className="absolute left-1/4 bottom-10 h-[600px] w-[600px] rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(0,245,196,0.12) 0%, rgba(27,18,53,0) 70%)' }}
      />

      {/* ── Twinkling Star Points ── */}
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: s.left,
            top: s.top,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            backgroundColor: s.color,
            boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
            animation: reducedMotion ? undefined : `twinkle ${s.dur} ease-in-out infinite`,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  )
}
