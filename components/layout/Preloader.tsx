'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const BOOT_LOGS = [
  'INITIALIZING ZENITH OS v1.0...',
  'CALIBRATING ASTRONOMICAL SENSORS...',
  'OPERATOR CALLSIGN: ZXAVIERS // AUTHENTICATED',
  'WARM NEBULA STAR CHART: SYNCHRONIZED',
  'ALL SYSTEMS NOMINAL // LAUNCH READY',
]

export function Preloader() {
  const [loading, setLoading] = useState(true)
  const [logIndex, setLogIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    // If user prefers reduced motion, skip boot sequence immediately
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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void px-6 text-center select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          {/* Central Spinning Celestial Core */}
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-comet/20 blur-xl animate-pulse" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Image
                src="/sprites/planetUnik.png"
                alt=""
                width={80}
                height={80}
                className="h-20 w-20 pixel-asset drop-shadow-[0_0_15px_rgba(255,200,87,0.4)]"
                priority
              />
            </motion.div>
          </div>

          <h1 className="font-display text-2xl tracking-wider text-starchart md:text-3xl">
            ZENITH
          </h1>

          {/* Telemetry Terminal Boot Stream */}
          <div className="mt-4 h-6 font-stat text-sm md:text-base text-star">
            <motion.span
              key={logIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block"
            >
              &gt; {BOOT_LOGS[logIndex]}
            </motion.span>
          </div>

          {/* Progress Loading Bar */}
          <div className="mt-6 w-48 overflow-hidden rounded-full bg-nebula/80 p-0.5 border border-star/30">
            <motion.div
              className="h-1.5 rounded-full bg-gradient-to-r from-comet via-star to-aurora"
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
