import { PixelPanel } from '@/components/ui/PixelPanel'
import { PixelButton } from '@/components/ui/PixelButton'
import { StarNode } from '@/components/ui/StarNode'
import { StarfieldBackground } from '@/components/ui/StarfieldBackground'

const COLORS = [
  { name: 'Void Deep', varName: '--color-void-deep', className: 'bg-void-deep' },
  { name: 'Void Mid', varName: '--color-void-mid', className: 'bg-void-mid' },
  { name: 'Void Surface', varName: '--color-void-surface', className: 'bg-void-surface' },
  { name: 'Teal', varName: '--color-teal', className: 'bg-teal' },
  { name: 'Teal Dim', varName: '--color-teal-dim', className: 'bg-teal-dim' },
  { name: 'Pink', varName: '--color-pink', className: 'bg-pink' },
  { name: 'Ink', varName: '--color-ink', className: 'bg-ink' },
  { name: 'Ink Muted', varName: '--color-ink-muted', className: 'bg-ink-muted' },
]

export default function StyleGuidePage() {
  return (
    <main className="relative min-h-screen space-y-16 px-6 py-16 md:px-12">
      <StarfieldBackground intensity="medium" className="-z-10" />

      <header className="relative z-10">
        <h1 className="font-display text-2xl text-ink md:text-4xl">Void Teal</h1>
        <p className="mt-4 max-w-2xl font-body text-lg text-ink-muted">
          Zenith design system preview — colors, typography, and the core
          `components/ui` primitives. The palette is derived from the Foozle
          Void (CC0) pixel assets. This page is a working reference, not
          final page content.
        </p>
      </header>

      <section className="relative z-10 space-y-4">
        <h2 className="font-display text-lg text-teal">Colors</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {COLORS.map((color) => (
            <div key={color.name} className="space-y-2">
              <div className={`h-20 w-full rounded-sm border border-white/10 ${color.className}`} />
              <p className="font-stat text-sm text-ink">{color.name}</p>
              <p className="font-stat text-xs text-ink-muted">{color.varName}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 space-y-4">
        <h2 className="font-display text-lg text-teal">Typography</h2>
        <div className="space-y-3">
          <p className="font-display text-xl text-ink md:text-3xl">
            Display — Press Start 2P
          </p>
          <p className="font-body text-lg text-ink md:text-xl">
            Body — Nunito. Used for every paragraph of real content; the
            pixel font stays limited to short headlines and labels so
            longer text stays comfortably readable.
          </p>
          <p className="font-stat text-xl text-ink md:text-2xl">
            Stat/tag — VT323 — Lv. 20 · React · ESP32 · 3.73 GPA
          </p>
        </div>
      </section>

      <section className="relative z-10 space-y-4">
        <h2 className="font-display text-lg text-teal">PixelPanel</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <PixelPanel variant="nebula">
            <h3 className="font-display text-sm">Nebula variant</h3>
            <p className="mt-2 font-body text-base">
              Default HUD-style panel — light ink text on a void-surface
              fill with a teal notched border and hard offset shadow.
            </p>
          </PixelPanel>
          <PixelPanel variant="void">
            <h3 className="font-display text-sm">Void variant</h3>
            <p className="mt-2 font-body text-base">
              Deepest dark fill for nested/inner panels — a dim teal border
              on a void-mid surface. Use for a panel inside a panel.
            </p>
          </PixelPanel>
        </div>
      </section>

      <section className="relative z-10 space-y-4">
        <h2 className="font-display text-lg text-teal">PixelButton</h2>
        <div className="flex flex-wrap gap-6">
          <PixelButton variant="comet">Launch</PixelButton>
          <PixelButton variant="ghost">View repo</PixelButton>
          <PixelButton variant="comet" disabled>
            Disabled
          </PixelButton>
        </div>
      </section>

      <section className="relative z-10 space-y-4">
        <h2 className="font-display text-lg text-teal">StarNode</h2>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <StarNode label="Locked skill" state="locked" size={28} />
            <span className="font-stat text-sm text-ink-muted">locked</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <StarNode label="Unlocked skill" state="unlocked" size={28} />
            <span className="font-stat text-sm text-ink-muted">unlocked</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <StarNode label="Active skill" state="active" size={28} />
            <span className="font-stat text-sm text-ink-muted">active</span>
          </div>
        </div>
      </section>

      <section className="relative z-10 space-y-4">
        <h2 className="font-display text-lg text-teal">StarfieldBackground</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {(['low', 'medium', 'high'] as const).map((intensity) => (
            <div key={intensity} className="relative h-40 overflow-hidden rounded-sm border border-white/10">
              <StarfieldBackground intensity={intensity} />
              <span className="absolute bottom-2 left-2 z-10 font-stat text-sm text-ink">
                {intensity}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
