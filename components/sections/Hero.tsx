'use client'

import { motion } from 'framer-motion'
import { StarfieldBackground } from '@/components/ui/StarfieldBackground'

function RocketVisual() {
  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32 drop-shadow-[0_0_20px_rgba(255,139,76,0.5)]">
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform -rotate-12"
        aria-hidden="true"
      >
        {/* Thruster Plume Flame with Animated Pulse */}
        <path
          d="M60 86 C54 96, 52 110, 60 118 C68 110, 66 96, 60 86 Z"
          fill="url(#thrusterFlame)"
          className="animate-pulse origin-top"
        />
        <path
          d="M60 88 C56 94, 56 104, 60 108 C64 104, 64 94, 60 88 Z"
          fill="#FFC857"
          className="animate-pulse"
        />

        {/* Left Fin */}
        <path
          d="M44 68 L28 84 C26 86, 30 90, 36 88 L46 76 Z"
          fill="#FF8B4C"
          stroke="#FFC857"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Right Fin */}
        <path
          d="M76 68 L92 84 C94 86, 90 90, 84 88 L74 76 Z"
          fill="#FF8B4C"
          stroke="#FFC857"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Thruster Base Nozzle */}
        <path
          d="M52 82 H68 L64 88 H56 Z"
          fill="#3E2A63"
          stroke="#1B1235"
          strokeWidth="2"
        />

        {/* Rocket Body (Fuselage) */}
        <path
          d="M60 16 C48 36, 42 60, 44 82 H76 C78 60, 72 36, 60 16 Z"
          fill="#F5E9D6"
          stroke="#3E2A63"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Nose Cone Tip */}
        <path
          d="M60 16 C53 28, 48 40, 46 48 H74 C72 40, 67 28, 60 16 Z"
          fill="#FF8B4C"
          stroke="#3E2A63"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Cockpit Window Outer Ring */}
        <circle
          cx="60"
          cy="58"
          r="9"
          fill="#3E2A63"
          stroke="#FFC857"
          strokeWidth="2"
        />
        {/* Cockpit Glass Interior */}
        <circle
          cx="60"
          cy="58"
          r="6.5"
          fill="#6FCF97"
          className="opacity-90"
        />
        <circle
          cx="58"
          cy="56"
          r="2"
          fill="#FFFFFF"
          className="opacity-80"
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="thrusterFlame" x1="60" y1="86" x2="60" y2="118" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFC857" />
            <stop offset="55%" stopColor="#FF8B4C" />
            <stop offset="100%" stopColor="#FF8B4C" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

function PlanetVisual() {
  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
      {/* Outer Soft Warm Halo Glow */}
      <div className="absolute inset-0 rounded-full bg-comet/30 blur-xl animate-pulse" />

      {/* Planet Sphere with Radial Gradient & Depth */}
      <div
        className="relative w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-star/40 shadow-[inset_-8px_-8px_16px_rgba(27,18,53,0.85),0_0_24px_rgba(255,139,76,0.45)] overflow-hidden"
        style={{
          background:
            'radial-gradient(circle at 35% 30%, #FFC857 0%, #FF8B4C 45%, #3E2A63 80%, #1B1235 100%)',
        }}
      >
        {/* Subtle Surface Texture Bands */}
        <div className="absolute top-[28%] left-0 right-0 h-2 bg-star/25 rounded-full blur-[1px] transform -rotate-12" />
        <div className="absolute top-[52%] left-0 right-0 h-3 bg-nebula/40 rounded-full blur-[1px] transform -rotate-12" />
        <div className="absolute top-[70%] left-0 right-0 h-1.5 bg-comet/30 rounded-full blur-[1px] transform -rotate-12" />
      </div>

      {/* Planetary Ring Overlay */}
      <svg
        viewBox="0 0 140 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-[135%] h-[135%] pointer-events-none transform -rotate-15"
        aria-hidden="true"
      >
        <ellipse
          cx="70"
          cy="35"
          rx="60"
          ry="14"
          stroke="url(#ringGradient)"
          strokeWidth="3"
          strokeDasharray="160 40"
          strokeLinecap="round"
          className="opacity-90"
        />
        <defs>
          <linearGradient id="ringGradient" x1="10" y1="35" x2="130" y2="35" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF8B4C" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#FFC857" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#F5E9D6" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden text-center px-4 sm:px-6 pt-28 pb-16 scroll-mt-24"
    >
      {/* 1. Fix #2: Rebalanced Warm Cosmic Gradient Palette */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#1B1235] via-[#2A1B4B] to-[#3E2A63]"
        aria-hidden="true"
      />

      {/* 2. Organic Starfield Background */}
      <StarfieldBackground intensity="medium" className="z-0 opacity-85" />

      {/* 3. Expansive Ambient Warm Glows */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] md:h-[850px] md:w-[850px] rounded-full bg-gradient-to-tr from-comet/20 via-nebula/40 to-star/15 blur-[140px] z-0 animate-nebula-pulse"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-10 inset-x-0 h-[360px] bg-gradient-to-t from-comet/25 via-star/15 to-transparent blur-[90px] z-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/4 left-1/6 h-[260px] w-[260px] md:h-[380px] md:w-[380px] rounded-full bg-star/20 blur-[90px] z-0 animate-nebula-pulse"
        style={{ animationDelay: '2s' }}
        aria-hidden="true"
      />

      {/* 4. Celestial Orbital Trajectory Rings */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-35 z-10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M -50 280 Q 400 90, 800 350 T 1600 220"
          fill="none"
          stroke="var(--color-star)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
        <path
          d="M 80 750 Q 600 420, 1050 580 T 1900 320"
          fill="none"
          stroke="var(--color-comet)"
          strokeWidth="1"
          strokeDasharray="5 7"
        />
      </svg>

      {/* 5. Fix #3: Code-Generated SVG Visuals with Smooth Floating Bob */}
      <div className="pointer-events-none absolute left-[5%] top-[18%] z-10 md:left-[10%] md:top-[16%] animate-float-slow">
        <RocketVisual />
      </div>

      <div
        className="pointer-events-none absolute bottom-[10%] right-[5%] z-10 md:right-[10%] md:bottom-[8%] animate-float-slow"
        style={{ animationDelay: '2.5s' }}
      >
        <PlanetVisual />
      </div>

      {/* 6. Center Playful Content */}
      <div className="relative z-30 max-w-3xl mx-auto w-full px-4 flex flex-col items-center">
        {/* Playful Game Level Badge */}
        <motion.div
          className="mb-5 inline-flex items-center gap-2 rounded-full bg-star text-void px-4 py-1.5 font-body font-bold text-xs sm:text-sm shadow-[0_0_15px_rgba(255,200,87,0.4)] border border-star/60 cursor-default select-none"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <svg
            className="w-3.5 h-3.5 fill-void"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span>Lv. 20 Explorer</span>
        </motion.div>

        {/* Fix #3: Headline with Layered Multi-Tone Pixel Drop Shadow */}
        <motion.h1
          className="mb-4 font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-starchart tracking-wide leading-snug"
          style={{
            textShadow:
              '2px 2px 0 #3E2A63, 4px 4px 0 #2A1B47, 6px 6px 0 #1B1235, 8px 8px 0 rgba(0, 0, 0, 0.65)',
          }}
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Hello, I&apos;m{' '}
          <span className="text-comet underline decoration-star decoration-4 underline-offset-8">
            Zxaviers
          </span>
        </motion.h1>

        {/* Subtitle in Warm Rounded Body Font */}
        <motion.p
          className="mb-8 font-body text-lg sm:text-xl md:text-2xl font-medium text-starchart/95 max-w-xl mx-auto leading-relaxed drop-shadow-[1px_1px_0_#1b1235]"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Web Enthusiast &amp; IoT Embedded Explorer
        </motion.p>

        {/* Primary & Secondary Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <a
            href="#mission-log"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-comet text-void font-display text-xs sm:text-sm font-bold shadow-[0_4px_16px_rgba(255,139,76,0.4)] hover:shadow-[0_6px_22px_rgba(255,139,76,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-star"
          >
            🚀 Launch into Mission Log
          </a>

          <a
            href="#send-a-transmission"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border-2 border-starchart/80 text-starchart font-display text-xs sm:text-sm font-bold hover:bg-starchart/10 hover:border-starchart hover:-translate-y-0.5 active:translate-y-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-star"
          >
            📡 Send a Transmission
          </a>
        </motion.div>
      </div>
    </section>
  )
}
