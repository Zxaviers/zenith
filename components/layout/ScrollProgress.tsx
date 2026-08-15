'use client'

import { useEffect, useRef, useState } from 'react'

/** Ported from src/components/ScrollProgress.jsx, unchanged behavior. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const pct = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0
      setProgress(Math.min(100, Math.max(0, pct)))
      rafId.current = null
    }

    const handleScroll = () => {
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(updateProgress)
      }
    }

    updateProgress()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 z-[60] h-[3px] w-full bg-transparent"
      role="progressbar"
      aria-label="Mission progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full"
        style={{ width: `${progress}%`, background: 'var(--color-teal)', boxShadow: '0 0 8px 1px var(--color-teal)' }}
      />
    </div>
  )
}
