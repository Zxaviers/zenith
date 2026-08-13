import { cn } from '@/lib/utils'

export interface StarfieldBackgroundProps {
  /**
   * Controls star density/layer count. `high` is meant for the Hero
   * (busy, multi-layer parallax candidate for Fase 4); `low`/`medium` for
   * calmer sections so the Hero and the Constellation signature component
   * stay the most visually "loud" things on the page.
   */
  intensity?: 'low' | 'medium' | 'high'
  className?: string
}

const LAYER_PRESETS = {
  low: [{ size: 160, opacity: 0.25, duration: '140s', animated: false }],
  medium: [
    { size: 160, opacity: 0.3, duration: '140s', animated: true },
    { size: 90, opacity: 0.2, duration: '90s', animated: true },
  ],
  high: [
    { size: 160, opacity: 0.35, duration: '140s', animated: true },
    { size: 90, opacity: 0.25, duration: '90s', animated: true },
    { size: 50, opacity: 0.4, duration: '55s', animated: true },
  ],
} as const

/**
 * Reusable ambient starfield + nebula haze backdrop. Pure CSS (no canvas,
 * no client JS) so it can render on the server and stay cheap wherever
 * it's used. Fase 4 layers scroll/mouse-linked parallax on top of this in
 * the Hero specifically — this component only handles the base "always
 * on" ambient field, and already degrades gracefully under
 * prefers-reduced-motion (layers stay visible, just static).
 */
export function StarfieldBackground({
  intensity = 'medium',
  className,
}: StarfieldBackgroundProps) {
  const layers = LAYER_PRESETS[intensity]

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden bg-void', className)}
    >
      {intensity !== 'low' && <div className="starfield-nebula-haze" />}
      {layers.map((layer, index) => (
        <div
          key={index}
          className="starfield-layer"
          data-animated={layer.animated}
          style={{
            backgroundSize: `${layer.size}px ${layer.size}px`,
            opacity: layer.opacity,
            animationDuration: layer.duration,
          }}
        />
      ))}
    </div>
  )
}
