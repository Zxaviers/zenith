'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const BOOT_LOGS = [
  'INITIALIZING ZENITH v3...',
  'LOADING VOID ASSETS...',
  'AUTHENTICATED: ZENITH CORE',
  'PALETTE: VOID TEAL // LOCKED IN',
  'ALL SYSTEMS GO 🚀',
]

export function Preloader() {
  const [loading, setLoading] = useState(true)
  const [logIndex, setLogIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) {
      setLoading(false)
      return
    }

    const interval = setInterval(() => {
      setLogIndex((prev) => {
        if (prev < BOOT_LOGS.length - 1) return prev + 1
        return prev
      })
    }, 280)

    const timer = setTimeout(() => {
      setLoading(false)
    }, 1600)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [shouldReduceMotion])

  if (shouldReduceMotion) return null

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-6 text-center select-none"
          style={{ background: 'var(--color-void-deep)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          {/* Ship sprite with teal glow */}
          <div className="relative mb-6">
            <div
              className="absolute inset-0 rounded-full blur-xl animate-pulse"
              style={{ background: 'rgba(0,245,196,0.15)' }}
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Void ship sprite at 2× */}
              <div
                className="pixel-asset animate-engine-burst"
                style={{
                  width: 80,
                  height: 80,
                  backgroundImage: 'url(/sprites/void/ship-base.png)',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: '0 0',
                  backgroundSize: '100% 100%',
                  imageRendering: 'pixelated',
                  filter: 'drop-shadow(0 0 16px rgba(0,245,196,0.7)) hue-rotate(160deg) saturate(1.2)',
                }}
                aria-hidden="true"
              />
            </motion.div>
          </div>

          <h1
            className="font-display text-2xl tracking-wider md:text-3xl"
            style={{ color: 'var(--color-ink)' }}
          >
            ZENITH
          </h1>

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
            style={{ background: 'var(--color-void-surface)', border: '1px solid rgba(0,245,196,0.2)' }}
          >
            <motion.div
              className="h-1.5 rounded-full"
              style={{ background: 'linear-gradient(to right, var(--color-teal-dim), var(--color-teal))' }}
              initial={{ width: '5%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
