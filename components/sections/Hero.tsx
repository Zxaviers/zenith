'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { StarfieldBackground } from '@/components/ui/StarfieldBackground'
import { PixelButton } from '@/components/ui/PixelButton'

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden text-center px-4 sm:px-6 pt-24 pb-16 scroll-mt-24"
    >
      {/* 1. Starfield Base Background */}
      <StarfieldBackground intensity="high" className="z-0" />

      {/* 2. Cohesive Volumetric Atmospheric Nebula Glows */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] md:h-[800px] md:w-[800px] rounded-full bg-nebula/50 blur-[120px] z-0 animate-nebula-pulse"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 left-1/4 h-[300px] w-[300px] md:h-[420px] md:w-[420px] rounded-full bg-comet/20 blur-[90px] z-0 animate-nebula-pulse"
        style={{ animationDelay: '1.5s' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/3 right-1/4 h-[280px] w-[280px] md:h-[400px] md:w-[400px] rounded-full bg-star/15 blur-[100px] z-0 animate-nebula-pulse"
        style={{ animationDelay: '3s' }}
        aria-hidden="true"
      />

      {/* 3. Connecting Celestial Orbital Dust & Flight Path Lines */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-35 z-10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M -100 280 Q 300 140, 600 360 T 1400 240"
          fill="none"
          stroke="var(--color-star)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          className="opacity-40"
        />
        <path
          d="M 100 780 Q 500 480, 900 620 T 1800 380"
          fill="none"
          stroke="var(--color-comet)"
          strokeWidth="1"
          strokeDasharray="4 6"
          className="opacity-30"
        />
        <circle cx="18%" cy="28%" r="80" fill="none" stroke="var(--color-star)" strokeWidth="0.75" strokeDasharray="3 5" className="opacity-25" />
        <circle cx="82%" cy="65%" r="100" fill="none" stroke="var(--color-comet)" strokeWidth="0.75" strokeDasharray="3 5" className="opacity-25" />
      </svg>

      {/* 4. Floating Celestial Sprite Illustrations */}
      <div className="pointer-events-none absolute left-[4%] top-[20%] z-10 md:left-[10%] md:top-[18%]">
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-comet/25 blur-lg animate-pulse" />
          <Image
            src="/sprites/rocketSatu.png"
            alt=""
            width={130}
            height={130}
            priority
            className="h-[80px] w-[80px] md:h-[130px] md:w-[130px] animate-float-slow pixel-asset drop-shadow-[0_0_15px_rgba(255,139,76,0.5)] transform rotate-12"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-[14%] right-[4%] z-10 md:right-[10%] md:bottom-[12%]">
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-star/25 blur-xl animate-pulse" />
          <Image
            src="/sprites/planetMerah.png"
            alt=""
            width={120}
            height={120}
            className="h-[75px] w-[75px] md:h-[120px] md:w-[120px] animate-float-slow pixel-asset drop-shadow-[0_0_15px_rgba(255,200,87,0.4)] transform -rotate-12"
            style={{ animationDelay: '2s' }}
          />
        </div>
      </div>

      {/* 5. Foreground Hero Cockpit Console & Content */}
      <div className="relative z-30 max-w-4xl mx-auto w-full px-2">
        {/* RPG Pilot Telemetry Header */}
        <motion.div
          className="mb-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-md border-2 border-star/40 bg-void/90 px-4 py-2 shadow-[4px_4px_0_0_#000] backdrop-blur-md glint-top"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-aurora animate-pulse shadow-[0_0_8px_#6fcf97]" />
            <span className="font-stat text-xs md:text-sm text-star font-bold tracking-wider">
              OPERATOR // ZXAVIERS
            </span>
          </div>
          <span className="text-white/20">|</span>
          <span className="font-stat text-xs md:text-sm text-comet tracking-wider">
            MISSION // ZENITH
          </span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <div className="hidden sm:flex items-center gap-1 font-stat text-xs text-starchart/80">
            <span>SYS_INTEGRITY:</span>
            <span className="text-aurora font-bold">100% NOMINAL</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="mb-3 font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-starchart tracking-wide leading-tight drop-shadow-[3px_3px_0_#000]"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Hello, I&apos;m <span className="text-comet underline decoration-star decoration-2 underline-offset-8">Zxaviers</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mb-8 font-body text-lg sm:text-xl md:text-2xl font-medium text-starchart/90 tracking-normal max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Web Enthusiast &amp; Computer Engineering Explorer
        </motion.p>

        {/* RPG Quick Stat HUD Strip */}
        <motion.div
          className="mb-8 mx-auto max-w-xl grid grid-cols-3 gap-2 p-2 rounded-md bg-nebula/60 border border-white/10 shadow-lg text-left"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <div className="bg-void/80 p-2 rounded border border-star/20 flex flex-col">
            <span className="font-stat text-[10px] text-starchart/60">CLASS</span>
            <span className="font-display text-[10px] md:text-xs text-star">SYSTEM ENG</span>
          </div>
          <div className="bg-void/80 p-2 rounded border border-star/20 flex flex-col">
            <span className="font-stat text-[10px] text-starchart/60">SECTOR FOCUS</span>
            <span className="font-display text-[10px] md:text-xs text-comet">IoT &amp; WEB</span>
          </div>
          <div className="bg-void/80 p-2 rounded border border-star/20 flex flex-col">
            <span className="font-stat text-[10px] text-starchart/60">CURRENT EXP</span>
            <span className="font-display text-[10px] md:text-xs text-aurora">LV. 20 // 94%</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-1"
        >
          <a href="#mission-log" className="focus-visible:outline-none">
            <PixelButton
              variant="comet"
              className="text-xs sm:text-sm px-6 py-3.5 uppercase tracking-wider font-display font-bold shadow-[4px_4px_0_0_#ffc857]"
            >
              🚀 Launch into Mission Log
            </PixelButton>
          </a>

          <a href="#send-a-transmission" className="focus-visible:outline-none">
            <PixelButton
              variant="ghost"
              className="text-xs sm:text-sm px-6 py-3.5 uppercase tracking-wider font-display font-bold"
            >
              📡 Send a Transmission
            </PixelButton>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
