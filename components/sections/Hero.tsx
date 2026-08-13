'use client'

import { motion } from 'framer-motion'
import { TypewriterText } from '@/components/ui/TypewriterText'
import { StarfieldBackground } from '@/components/ui/StarfieldBackground'
import { PixelButton } from '@/components/ui/PixelButton'

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-center px-6 pt-24 pb-16 scroll-mt-24"
    >
      <StarfieldBackground intensity="high" className="z-0" />

      {/* Central Warm Nebula Core Glows with Breathing Animation */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] md:h-[700px] md:w-[700px] rounded-full bg-nebula/30 blur-[120px] z-0 animate-nebula-pulse"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[280px] w-[280px] md:h-[400px] md:w-[400px] rounded-full bg-comet/15 blur-[80px] z-0 animate-nebula-pulse"
        style={{ animationDelay: '2s' }}
        aria-hidden="true"
      />

      {/* Floating Space Assets */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[6%] top-[20%] z-10 h-[100px] w-[100px] animate-float-slow pixel-asset md:left-[12%] md:top-[18%] md:h-[160px] md:w-[160px]"
        style={{
          backgroundImage: "url('/sprites/rocketSatu.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          transform: 'rotate(20deg)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[18%] right-[6%] z-10 h-[90px] w-[90px] animate-float-slow pixel-asset md:right-[12%] md:bottom-[15%] md:h-[150px] md:w-[150px]"
        style={{
          backgroundImage: "url('/sprites/planetMerah.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          transform: 'rotate(-12deg)',
          animationDelay: '1.5s',
        }}
      />

      {/* Foreground Hero Content */}
      <div className="relative z-30 max-w-3xl mx-auto">
        {/* Status Chip */}
        <motion.div
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-star/40 bg-void/85 px-4 py-1.5 shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="h-2 w-2 rounded-full bg-aurora animate-ping" />
          <span className="font-stat text-xs md:text-sm text-starchart uppercase tracking-wider">
            MISSION STATUS: ACTIVE // ORBIT LOCKED
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="mb-4 font-display text-3xl sm:text-4xl md:text-6xl text-starchart tracking-wide leading-tight drop-shadow-md"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Hello, I&apos;m <span className="text-comet">Zxaviers</span>
        </motion.h1>

        {/* Dynamic Subtitle */}
        <h2 className="mb-10 font-body text-xl sm:text-2xl md:text-3xl font-medium text-starchart/90">
          <TypewriterText
            words={[
              'Computer Engineering Student',
              'Web & Systems Developer',
              'IoT & Embedded Hardware Learner',
              'AI & Data Explorer',
            ]}
            typeSpeed={60}
            deleteSpeed={35}
            delaySpeed={2000}
          />
        </h2>

        {/* Launch CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#mission-log">
            <PixelButton variant="comet" className="text-sm px-6 py-3">
              🚀 Launch into Mission Log
            </PixelButton>
          </a>
          <a href="#mission-control">
            <PixelButton variant="ghost" className="text-sm px-6 py-3">
              📡 Mission Control
            </PixelButton>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
