'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

const BOOT_LOGS = [
  'INITIALIZING ZENITH v3...',
  'LOADING VOID ASSETS...',
  'AUTHENTICATED: ZENITH CORE',
  'PALETTE: VOID TEAL // LOCKED IN',
  'ALL SYSTEMS GO 🚀',
]

export function Preloader() {
  const [loading, setLoading] = useState(() => {
    if (typeof window === 'undefined') return true
    try {
      return !sessionStorage.getItem('zenith:boot-seen')
    } catch {
      return true
    }
  })
  const [logIndex, setLogIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem('zenith:boot-seen', 'true')
    } catch {}
    setLoading(false)
  }, [])

  useEffect(() => {
    if (shouldReduceMotion) {
      setLoading(false)
      return
    }

    try {
      if (sessionStorage.getItem('zenith:boot-seen')) {
        setLoading(false)
        return
      }
    } catch {}

    const interval = setInterval(() => {
      setLogIndex((prev) => {
        if (prev < BOOT_LOGS.length - 1) return prev + 1
        return prev
      })
    }, 200)

    const timer = setTimeout(() => {
      dismiss()
    }, 1100)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dismiss()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [shouldReduceMotion, dismiss])

  if (shouldReduceMotion) return null

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          data-preloader-overlay=""
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-6 text-center select-none"
          style={{ background: 'var(--color-void-deep)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Skip button — visible, keyboard-focusable */}
          <button
            type="button"
            onClick={dismiss}
            aria-label="Skip intro"
            className="absolute top-6 right-6 px-3.5 py-1.5 font-stat text-xs text-[var(--color-star)] hover:text-white bg-[var(--color-void)]/90 border border-[var(--color-star)]/40 hover:border-[var(--color-star)] rounded transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-star)] focus-visible:outline-offset-2 cursor-pointer shadow-[2px_2px_0_0_#000]"
          >
            Skip [Esc] →
          </button>

          {/* Ship sprite with teal glow */}
          <div className="relative mb-6">
            <div
              className="absolute inset-0 rounded-full blur-xl animate-pulse"
              style={{ background: 'rgba(255, 200, 87,0.15)' }}
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Void ship sprite */}
              <div
                className="pixel-asset"
                style={{
                  width: 80,
                  height: 80,
                  backgroundImage: 'url(/sprites/void/ship-base.png)',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: '0 0',
                  backgroundSize: '100% 100%',
                  imageRendering: 'pixelated',
                  filter: 'drop-shadow(0 0 16px rgba(255, 200, 87,0.7)) hue-rotate(160deg) saturate(1.2)',
                }}
                aria-hidden="true"
              />
            </motion.div>
          </div>

          <p
            className="font-display text-2xl tracking-wider md:text-3xl"
            style={{ color: 'var(--color-ink)' }}
          >
            ZENITH
          </p>

          {/* Boot stream — teal color */}
          <div className="mt-4 h-6 font-stat text-sm md:text-base" style={{ color: 'var(--color-teal)' }}>
            <motion.span
              key={logIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block"
            >
              &gt; {BOOT_LOGS[logIndex]}
            </motion.span>
          </div>

          {/* Progress bar — teal */}
          <div
            className="mt-6 w-48 overflow-hidden rounded-full p-0.5"
            style={{ background: 'var(--color-void-surface)', border: '1px solid rgba(255, 200, 87,0.2)' }}
          >
            <motion.div
              className="h-1.5 rounded-full"
              style={{ background: 'linear-gradient(to right, var(--color-teal-dim), var(--color-teal))' }}
              initial={{ width: '5%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.0, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
