'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/** Ported from src/components/Preloader.jsx. "Zxaviers" boot wordmark is
 * now "Zenith" per the Fase 3 rebrand. */
export function Preloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <motion.img
              src="/sprites/planetUnik.png"
              alt="Loading..."
              className="h-24 w-24 pixel-asset"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.5, 1.1, 1], rotate: 360, opacity: 1 }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                scale: { duration: 0.8, ease: 'easeInOut' },
                opacity: { duration: 0.5 },
              }}
            />
            <motion.h1
              className="mt-6 font-display text-2xl text-starchart"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              Zenith
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
