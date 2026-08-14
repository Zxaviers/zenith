'use client'

import { motion } from 'framer-motion'
import { StarfieldBackground } from '@/components/ui/StarfieldBackground'
import { PixelButton } from '@/components/ui/PixelButton'

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-center px-4 sm:px-6 pt-28 pb-16 scroll-mt-24"
    >
      {/* 1. Organic Random Starfield (Deep Base) */}
      <StarfieldBackground intensity="high" className="z-0" />

      {/* 2. Cohesive Connecting Atmospheric Nebula Glows (Eliminates isolated sticker feel) */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] md:h-[900px] md:w-[900px] rounded-full bg-nebula/40 blur-[130px] z-0 animate-nebula-pulse"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 left-1/4 h-[320px] w-[320px] md:h-[480px] md:w-[480px] rounded-full bg-comet/15 blur-[90px] z-0 animate-nebula-pulse"
        style={{ animationDelay: '1.5s' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/3 right-1/4 h-[300px] w-[300px] md:h-[450px] md:w-[450px] rounded-full bg-star/10 blur-[100px] z-0 animate-nebula-pulse"
        style={{ animationDelay: '3s' }}
        aria-hidden="true"
      />

      {/* 3. Connecting Celestial Orbital Dust & Flight Path Lines (SVG Scene Glue) */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-30 z-10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M -100 300 Q 300 150, 600 380 T 1400 250"
          fill="none"
          stroke="var(--color-star)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          className="opacity-40"
        />
        <path
          d="M 100 800 Q 500 500, 900 650 T 1800 400"
          fill="none"
          stroke="var(--color-comet)"
          strokeWidth="1"
          strokeDasharray="4 6"
          className="opacity-30"
        />
        <circle cx="20%" cy="30%" r="90" fill="none" stroke="var(--color-star)" strokeWidth="0.75" strokeDasharray="3 5" className="opacity-20" />
        <circle cx="82%" cy="68%" r="110" fill="none" stroke="var(--color-comet)" strokeWidth="0.75" strokeDasharray="3 5" className="opacity-20" />
      </svg>

      {/* 4. Layered Floating Celestial Illustrations with Atmospheric Backglow */}
      {/* Left Rocket with Propulsion Aura */}
      <div className="pointer-events-none absolute left-[4%] top-[22%] z-10 md:left-[10%] md:top-[20%]">
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-comet/20 blur-lg animate-pulse" />
          <div
            aria-hidden="true"
            className="h-[90px] w-[90px] md:h-[150px] md:w-[150px] animate-float-slow pixel-asset"
            style={{
              backgroundImage: "url('/sprites/rocketSatu.png')",
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              transform: 'rotate(18deg)',
            }}
          />
        </div>
      </div>

      {/* Right Celestial Planet with Nebula Halo */}
      <div className="pointer-events-none absolute bottom-[18%] right-[4%] z-10 md:right-[10%] md:bottom-[16%]">
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-star/20 blur-xl animate-pulse" />
          <div
            aria-hidden="true"
            className="h-[80px] w-[80px] md:h-[140px] md:w-[140px] animate-float-slow pixel-asset"
            style={{
              backgroundImage: "url('/sprites/planetMerah.png')",
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              transform: 'rotate(-10deg)',
              animationDelay: '1.8s',
            }}
          />
        </div>
      </div>

      {/* 5. Foreground Hero Content & HUD Console */}
      <div className="relative z-30 max-w-4xl mx-auto w-full px-2">
        {/* Telemetry Status Chip */}
        <motion.div
          className="mb-6 inline-flex items-center gap-2 rounded-md border border-star/40 bg-void/90 px-4 py-1.5 shadow-[2px_2px_0_0_#000] backdrop-blur-md glint-top"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="h-2 w-2 rounded-full bg-aurora animate-pulse shadow-[0_0_8px_#6fcf97]" />
          <span className="font-stat text-xs md:text-sm text-star uppercase tracking-widest">
            MISSION STATUS: ACTIVE // ORBIT LOCKED
          </span>
        </motion.div>

        {/* Main Headline (Must render on ONE line or wrap naturally without truncation) */}
        <motion.h1
          className="mb-3 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-starchart tracking-wide leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Hello, I&apos;m <span className="text-comet">Zxaviers</span>
        </motion.h1>

        {/* Subtitle: Web Enthusiast in warm, rounded sans-serif */}
        <motion.h2
          className="mb-8 font-body text-xl sm:text-2xl md:text-3xl font-medium text-starchart/90 tracking-normal max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Web Enthusiast
        </motion.h2>

        {/* Single Primary CTA Button with High-Contrast Readable Text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <a href="#mission-log" className="focus-visible:outline-none">
            <PixelButton
              variant="comet"
              className="text-xs sm:text-sm md:text-base px-8 py-4 uppercase tracking-wider font-display font-bold shadow-[4px_4px_0_0_#ffc857]"
            >
              🚀 Launch into Mission Log
            </PixelButton>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
