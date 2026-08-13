'use client'

import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'
import { StarfieldBackground } from '@/components/ui/StarfieldBackground'
import { PixelButton } from '@/components/ui/PixelButton'

/**
 * Ported from src/Sections/Hero.jsx, rebuilt on the Fase 2 design system.
 * Adds a "launch" CTA (PixelButton) per ZENITH_PLAYBOOK.md Fase 4 §1 —
 * the original had none, just the headline + typewriter subtitle.
 */
export function Hero() {
  return (
    <section
      id="home"
      className="relative flex h-screen flex-col items-center justify-center overflow-hidden text-center scroll-mt-24"
    >
      <StarfieldBackground intensity="high" className="z-0" />

      {/* Central Nebula Glow for Composition Unity */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-nebula/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-comet/10 rounded-full blur-[80px] pointer-events-none z-0" />

      {/* Hero Sprites */}
      <div
        aria-hidden="true"
        className="absolute left-[10%] top-[25%] z-10 h-[100px] w-[100px] animate-float-slow pixel-asset md:left-[15%] md:top-[20%] md:h-[160px] md:w-[160px]"
        style={{
          backgroundImage: "url('/sprites/rocketSatu.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          transform: 'rotate(25deg)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[20%] right-[10%] z-10 h-[80px] w-[80px] animate-float-slow pixel-asset md:right-[15%] md:bottom-[15%] md:h-[140px] md:w-[140px]"
        style={{
          backgroundImage: "url('/sprites/planetMerah.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          transform: 'rotate(-15deg)',
          animationDelay: '1s',
        }}
      />

      <div className="absolute inset-0 z-20 bg-gradient-to-b from-void/40 via-void/10 to-void/95 pointer-events-none" />

      <div className="relative z-30 px-6">
        <motion.h1
          className="mb-4 font-display text-3xl text-starchart md:text-5xl"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Hello, I&apos;m Zxaviers
        </motion.h1>

        <h2 className="mb-10 font-body text-2xl font-medium text-starchart/80 md:text-3xl">
          <Typewriter
            words={[
              'Computer Engineering Student',
              'Web Enthusiast',
              'IoT Learner',
              'AI Explorer',
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </h2>

        <a href="#mission-log">
          <PixelButton variant="comet">Launch into Mission Log</PixelButton>
        </a>
      </div>
    </section>
  )
}
