'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { StarfieldBackground } from '@/components/ui/StarfieldBackground'
import { PixelButton } from '@/components/ui/PixelButton'

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[95vh] flex-col items-center justify-center overflow-hidden text-center px-4 sm:px-6 pt-28 pb-16 scroll-mt-24"
    >
      {/* 1. Dynamic Interactive Cosmic Starfield */}
      <StarfieldBackground intensity="high" className="z-0" />

      {/* 2. Seamless Cohesive Volumetric Atmospheric Nebula Glows */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] md:h-[750px] md:w-[750px] rounded-full bg-nebula/60 blur-[120px] z-0 animate-nebula-pulse"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/4 left-1/4 h-[280px] w-[280px] md:h-[380px] md:w-[380px] rounded-full bg-comet/20 blur-[80px] z-0 animate-nebula-pulse"
        style={{ animationDelay: '2s' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-[260px] w-[260px] md:h-[360px] md:w-[360px] rounded-full bg-star/15 blur-[90px] z-0 animate-nebula-pulse"
        style={{ animationDelay: '4s' }}
        aria-hidden="true"
      />

      {/* 3. Celestial Orbital Trajectory Rings & Flight Beacons */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40 z-10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M -100 320 Q 350 120, 700 380 T 1500 260"
          fill="none"
          stroke="var(--color-star)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          className="opacity-50"
        />
        <path
          d="M 50 820 Q 550 460, 950 640 T 1850 360"
          fill="none"
          stroke="var(--color-comet)"
          strokeWidth="1"
          strokeDasharray="4 6"
          className="opacity-40"
        />
      </svg>

      {/* 4. Integrated Cozy Pixel Sprites (Rocket & Celestial Planets) */}
      <div className="pointer-events-none absolute left-[4%] top-[22%] z-10 md:left-[8%] md:top-[20%]">
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-comet/30 blur-lg animate-pulse" />
          <Image
            src="/sprites/rocketSatu.png"
            alt=""
            width={120}
            height={120}
            priority
            className="h-[75px] w-[75px] md:h-[120px] md:w-[120px] animate-float-slow pixel-asset drop-shadow-[0_0_16px_rgba(255,139,76,0.6)] transform rotate-12"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-[12%] right-[4%] z-10 md:right-[8%] md:bottom-[10%]">
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-star/25 blur-xl animate-pulse" />
          <Image
            src="/sprites/planetMerah.png"
            alt=""
            width={110}
            height={110}
            className="h-[70px] w-[70px] md:h-[110px] md:w-[110px] animate-float-slow pixel-asset drop-shadow-[0_0_16px_rgba(255,200,87,0.45)] transform -rotate-12"
            style={{ animationDelay: '2.5s' }}
          />
        </div>
      </div>

      {/* 5. Center RPG Command Console */}
      <div className="relative z-30 max-w-4xl mx-auto w-full px-2">
        {/* Operator Callsign & Status Pill */}
        <motion.div
          className="mb-6 inline-flex flex-wrap items-center justify-center gap-2.5 rounded-md border-2 border-star bg-void/90 px-4 py-2 shadow-[4px_4px_0_0_#000] backdrop-blur-md glint-top"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-aurora animate-pulse shadow-[0_0_8px_#6fcf97]" />
            <span className="font-stat text-xs md:text-sm text-star font-bold tracking-wider">
              OPERATOR // ZXAVIERS
            </span>
          </div>
          <span className="text-white/20">|</span>
          <span className="font-stat text-xs md:text-sm text-comet font-bold tracking-wider">
            MISSION // ZENITH
          </span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <div className="hidden sm:flex items-center gap-1 font-stat text-xs text-starchart/80">
            <span>SYS_INTEGRITY:</span>
            <span className="text-aurora font-bold">100% NOMINAL</span>
          </div>
        </motion.div>

        {/* Main Headline (Always readable on one line or wraps naturally) */}
        <motion.h1
          className="mb-4 font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-starchart tracking-wide leading-tight drop-shadow-[4px_4px_0_#000]"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Hello, I&apos;m <span className="text-comet underline decoration-star decoration-4 underline-offset-8">Zxaviers</span>
        </motion.h1>

        {/* Subtitle in Warm Rounded Nunito */}
        <motion.p
          className="mb-8 font-body text-xl sm:text-2xl md:text-3xl font-medium text-starchart/95 tracking-normal max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Web Enthusiast &amp; IoT Embedded Explorer
        </motion.p>

        {/* RPG Pilot Telemetry Strip */}
        <motion.div
          className="mb-10 mx-auto max-w-xl grid grid-cols-3 gap-2.5 p-3 rounded-lg bg-nebula/80 border-2 border-star/40 shadow-[4px_4px_0_0_#000] text-left backdrop-blur-sm"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <div className="bg-void/90 p-2.5 rounded border border-white/10 flex flex-col">
            <span className="font-stat text-[11px] text-starchart/60">CLASS</span>
            <span className="font-display text-[10px] md:text-xs text-star">SYSTEM ENG</span>
          </div>
          <div className="bg-void/90 p-2.5 rounded border border-white/10 flex flex-col">
            <span className="font-stat text-[11px] text-starchart/60">SECTOR FOCUS</span>
            <span className="font-display text-[10px] md:text-xs text-comet">IoT &amp; WEB</span>
          </div>
          <div className="bg-void/90 p-2.5 rounded border border-white/10 flex flex-col">
            <span className="font-stat text-[11px] text-starchart/60">CURRENT EXP</span>
            <span className="font-display text-[10px] md:text-xs text-aurora">LV. 20 // 94%</span>
          </div>
        </motion.div>

        {/* Tactical Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-1"
        >
          <a href="#mission-log" className="focus-visible:outline-none">
            <PixelButton
              variant="comet"
              className="text-xs sm:text-sm px-7 py-4 uppercase tracking-wider font-display font-bold shadow-[4px_4px_0_0_#ffc857]"
            >
              🚀 Launch into Mission Log
            </PixelButton>
          </a>

          <a href="#send-a-transmission" className="focus-visible:outline-none">
            <PixelButton
              variant="ghost"
              className="text-xs sm:text-sm px-7 py-4 uppercase tracking-wider font-display font-bold"
            >
              📡 Send a Transmission
            </PixelButton>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
