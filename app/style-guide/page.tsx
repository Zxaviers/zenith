import { PixelPanel } from '@/components/ui/PixelPanel'
import { PixelButton } from '@/components/ui/PixelButton'
import { StarNode } from '@/components/ui/StarNode'
import { StarfieldBackground } from '@/components/ui/StarfieldBackground'

const COLORS = [
  { name: 'Comet Orange', varName: '--color-comet', className: 'bg-comet' },
  { name: 'Star Gold', varName: '--color-star', className: 'bg-star' },
  { name: 'Void Indigo', varName: '--color-void', className: 'bg-void' },
  { name: 'Nebula Violet', varName: '--color-nebula', className: 'bg-nebula' },
  { name: 'Star Chart Cream', varName: '--color-starchart', className: 'bg-starchart' },
  { name: 'Aurora Green', varName: '--color-aurora', className: 'bg-aurora' },
]

export default function StyleGuidePage() {
  return (
    <main className="relative min-h-screen space-y-16 px-6 py-16 md:px-12">
      <StarfieldBackground intensity="medium" className="-z-10" />

      <header className="relative z-10">
        <h1 className="font-display text-2xl text-starchart md:text-4xl">Warm Nebula</h1>
        <p className="mt-4 max-w-2xl font-body text-lg text-starchart/80">
          Zenith design system preview — colors, typography, and the core
          `components/ui` primitives from ZENITH_PLAYBOOK.md §2/Fase 2. This
          page is a working reference, not final page content.
        </p>
      </header>

      <section className="relative z-10 space-y-4">
        <h2 className="font-display text-lg text-star">Colors</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {COLORS.map((color) => (
            <div key={color.name} className="space-y-2">
              <div className={`h-20 w-full rounded-sm border border-white/10 ${color.className}`} />
              <p className="font-stat text-sm text-starchart">{color.name}</p>
              <p className="font-stat text-xs text-starchart/60">{color.varName}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 space-y-4">
        <h2 className="font-display text-lg text-star">Typography</h2>
        <div className="space-y-3">
          <p className="font-display text-xl text-starchart md:text-3xl">
            Display — Press Start 2P
          </p>
          <p className="font-body text-lg text-starchart md:text-xl">
            Body — Nunito. Used for every paragraph of real content; the
            pixel font stays limited to short headlines and labels so
            longer text stays comfortably readable.
          </p>
          <p className="font-stat text-xl text-starchart md:text-2xl">
            Stat/tag — VT323 — Lv. 20 · React · ESP32 · 3.73 GPA
          </p>
        </div>
      </section>

      <section className="relative z-10 space-y-4">
        <h2 className="font-display text-lg text-star">PixelPanel</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <PixelPanel variant="nebula">
            <h3 className="font-display text-sm">Nebula variant</h3>
            <p className="mt-2 font-body text-base">
              Default HUD-style panel — light text on a dark nebula fill
              with a star-gold notched border and hard offset shadow.
            </p>
          </PixelPanel>
          <PixelPanel variant="starchart">
            <h3 className="font-display text-sm">Starchart variant</h3>
            <p className="mt-2 font-body text-base">
              Reads like an astronomer&apos;s paper chart — dark text on a
              cream fill with a nebula-violet border. Use sparingly.
            </p>
          </PixelPanel>
        </div>
      </section>

      <section className="relative z-10 space-y-4">
        <h2 className="font-display text-lg text-star">PixelButton</h2>
        <div className="flex flex-wrap gap-6">
          <PixelButton variant="comet">Launch</PixelButton>
          <PixelButton variant="ghost">View repo</PixelButton>
          <PixelButton variant="comet" disabled>
            Disabled
          </PixelButton>
        </div>
      </section>

      <section className="relative z-10 space-y-4">
        <h2 className="font-display text-lg text-star">StarNode</h2>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <StarNode label="Locked skill" state="locked" size={28} />
            <span className="font-stat text-sm text-starchart/70">locked</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <StarNode label="Unlocked skill" state="unlocked" size={28} />
            <span className="font-stat text-sm text-starchart/70">unlocked</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <StarNode label="Active skill" state="active" size={28} />
            <span className="font-stat text-sm text-starchart/70">active</span>
          </div>
        </div>
      </section>

      <section className="relative z-10 space-y-4">
        <h2 className="font-display text-lg text-star">StarfieldBackground</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {(['low', 'medium', 'high'] as const).map((intensity) => (
            <div key={intensity} className="relative h-40 overflow-hidden rounded-sm border border-white/10">
              <StarfieldBackground intensity={intensity} />
              <span className="absolute bottom-2 left-2 z-10 font-stat text-sm text-starchart">
                {intensity}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
