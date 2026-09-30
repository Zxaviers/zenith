'use client'

import { motion } from 'framer-motion'

export interface StarMapIndicatorProps {
  count: number
  active: number
  onDotClick: (i: number) => void
}

export function StarMapIndicator({
  count,
  active,
  onDotClick,
}: StarMapIndicatorProps) {
  return (
    // md:hidden — only shown on mobile where carousel is active
    <div className="md:hidden flex items-center justify-center gap-2 mt-6">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to project ${i + 1}`}
          aria-current={i === active ? true : undefined}
          onClick={() => onDotClick(i)}
          className="relative flex items-center justify-center transition-all focus-visible:outline-none"
          style={{ width: 28, height: 12 }}
        >
          {i > 0 && (
            <div
              className="absolute right-full top-1/2 -translate-y-1/2 h-px"
              style={{
                width: 10,
                background: i <= active ? 'var(--color-teal)' : 'rgba(255,255,255,0.2)',
                transition: 'background 0.3s',
              }}
            />
          )}
          <motion.div
            className="rounded-full"
            style={{ background: i === active ? 'var(--color-teal)' : 'rgba(255,255,255,0.25)' }}
            animate={{ width: i === active ? 12 : 6, height: i === active ? 12 : 6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
          {i === active && (
            <motion.div
              className="absolute rounded-full"
              style={{ width: 18, height: 18, border: '1px solid var(--color-teal)', opacity: 0.4 }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
