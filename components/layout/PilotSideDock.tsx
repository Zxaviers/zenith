'use client'

import Image from 'next/image'

export function PilotSideDock() {
  return (
    <aside className="hidden xl:flex fixed left-4 top-24 z-40 flex-col p-3 gap-3 bg-nebula/95 rounded border-2 border-star/50 shadow-[6px_6px_0px_0px_#000] backdrop-blur-md w-48 glint-top">
      {/* Pilot Avatar Frame */}
      <div className="p-3 text-center border-b-2 border-white/10 mb-1">
        <div className="relative w-16 h-16 mx-auto bg-void border-2 border-star p-1 mb-2 shadow-[3px_3px_0px_0px_#000]">
          <Image
            src="/sprites/icon_zx.png"
            alt="Pilot Zxaviers"
            width={64}
            height={64}
            className="w-full h-full pixel-asset object-contain"
          />
          <span className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full bg-aurora ring-2 ring-void animate-pulse" />
        </div>
        <h3 className="font-display text-xs text-star leading-tight">PILOT: ZX</h3>
        <p className="font-stat text-xs text-comet mt-0.5 font-bold">LV. 20 // 94% EXP</p>
      </div>

      {/* Quick Telemetry Indicators */}
      <div className="flex flex-col gap-1.5 font-stat text-xs">
        <div className="bg-void/80 px-2.5 py-1.5 rounded border border-white/10 flex items-center justify-between">
          <span className="text-starchart/70">CLASS</span>
          <span className="text-star font-bold">SYS_ENG</span>
        </div>
        <div className="bg-void/80 px-2.5 py-1.5 rounded border border-white/10 flex items-center justify-between">
          <span className="text-starchart/70">SECTOR</span>
          <span className="text-comet font-bold">IoT &amp; WEB</span>
        </div>
        <div className="bg-void/80 px-2.5 py-1.5 rounded border border-white/10 flex items-center justify-between">
          <span className="text-starchart/70">STATUS</span>
          <span className="text-aurora font-bold">NOMINAL</span>
        </div>
      </div>

      {/* Mini Power LED Meter */}
      <div className="pt-2 border-t border-white/10">
        <div className="flex justify-between font-stat text-[10px] text-starchart/60 mb-1">
          <span>HULL INTEGRITY</span>
          <span className="text-aurora">100%</span>
        </div>
        <div className="segment-bar py-0.5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="segment flex-1 h-2 rounded-[1px] bg-aurora shadow-[0_0_4px_#6fcf97]" />
          ))}
        </div>
      </div>
    </aside>
  )
}
