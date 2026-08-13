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

      <div
        aria-hidden="true"
        className="absolute left-[5%] top-[15%] z-10 h-[120px] w-[120px] animate-float-slow pixel-asset md:left-[10%] md:h-[200px] md:w-[200px]"
        style={{
          backgroundImage: "url('/sprites/rocketSatu.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          transform: 'rotate(10deg)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[15%] right-[5%] z-10 h-[100px] w-[100px] animate-float-slow pixel-asset md:right-[10%] md:h-[180px] md:w-[180px]"
        style={{
          backgroundImage: "url('/sprites/planetMerah.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          transform: 'rotate(-10deg)',
        }}
      />

      <div className="absolute inset-0 z-20 bg-gradient-to-b from-void/60 via-void/20 to-void/90" />

      <div className="relative z-30 px-6">
        <motion.h1
          className="mb-4 font-display text-3xl text-starchart md:text-5xl"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Hello, I&apos;m Zxa
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
