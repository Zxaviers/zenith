import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export type StarNodeState = 'locked' | 'unlocked' | 'active'
export type SkillLevel = 'Proficient' | 'Familiar' | 'Basic'

export interface StarNodeProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  /** Accessible label — also used as the native tooltip via `title`. */
  label: string
  state?: StarNodeState
  level?: SkillLevel
  /** Diameter in pixels. */
  size?: number
}

/* Glow intensities keyed to mastery level — Warm Nebula / Cosmic Explorer tokens */
const levelGlow: Record<SkillLevel, string> = {
  Proficient: '0 0 14px 3px rgba(255, 200, 87, 0.9), 0 0 26px 6px rgba(255, 139, 76, 0.45)',
  Familiar:   '0 0 10px 2px rgba(255, 200, 87, 0.7),  0 0 18px 3px rgba(255, 139, 76, 0.3)',
  Basic:      '0 0 6px 1px rgba(245, 233, 214, 0.5),  0 0 12px 2px rgba(245, 233, 214, 0.2)',
}

const stateColor: Record<StarNodeState, string> = {
  locked:   '#475569',
  unlocked: 'var(--color-comet)',
  active:   'var(--color-star)',
}

/**
 * StarNode — A celestial, glowing star node in the Constellation skill tree.
 * Features a multi-layer glowing stellar core and 4-point diffraction sparkle spikes for proficient/active stars.
 */
export function StarNode({
  label,
  state = 'unlocked',
  level = 'Familiar',
  size = 22,
  className,
  style,
  disabled,
  ...props
}: StarNodeProps) {
  const isLocked = state === 'locked'
  const isActive = state === 'active'
  const isProficient = level === 'Proficient'

  const glowShadow = isLocked
    ? 'none'
    : isActive
      ? '0 0 18px 5px rgba(255, 200, 87, 1), 0 0 32px 8px rgba(255, 139, 76, 0.7), inset 0 0 6px rgba(255, 255, 255, 0.8)'
      : levelGlow[level]

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled ?? isLocked}
      className={cn(
        'group relative inline-flex shrink-0 items-center justify-center rounded-full transition-all duration-200 ease-out select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'focus-visible:ring-[var(--color-star)] focus-visible:ring-offset-[var(--color-void)]',
        isActive && 'scale-125 ring-2 ring-[var(--color-star)] ring-offset-2 ring-offset-[var(--color-void)] z-30',
        !isLocked && !isActive && 'cursor-pointer hover:scale-125 hover:ring-2 hover:ring-[var(--color-star)]/80 active:scale-95 z-20',
        isLocked && 'cursor-not-allowed opacity-40 z-10',
        className
      )}
      style={{
        width: size,
        height: size,
        background: isLocked
          ? stateColor[state]
          : `radial-gradient(circle, #fff 0%, ${stateColor[state]} 60%, var(--color-nebula) 100%)`,
        boxShadow: glowShadow,
        border: isLocked ? '1px solid rgba(255,255,255,0.2)' : '1.5px solid rgba(255, 255, 255, 0.85)',
        ...style,
      }}
      {...props}
    >
      {/* 4-Point Diffraction Star Sparkle (for proficient or active celestial stars) */}
      {!isLocked && (isProficient || isActive) && (
        <svg
          viewBox="0 0 24 24"
          className={cn(
            'pointer-events-none absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)] transition-transform duration-300',
            isActive ? 'scale-110 opacity-100 animate-[spin_20s_linear_infinite]' : 'opacity-70 group-hover:scale-110 group-hover:opacity-100'
          )}
          style={{ filter: 'drop-shadow(0 0 4px rgba(255,200,87,0.8))' }}
          aria-hidden="true"
        >
          {/* Vertical & Horizontal soft diffraction beams */}
          <path
            d="M12 2 Q12 12 2 12 Q12 12 12 22 Q12 12 22 12 Q12 12 12 2 Z"
            fill="var(--color-star)"
            opacity="0.85"
          />
          <circle cx="12" cy="12" r="3" fill="#ffffff" />
        </svg>
      )}

      {/* Stellar center core shine */}
      {!isLocked && (
        <span
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-white opacity-90"
          style={{ boxShadow: '0 0 4px 1px #fff' }}
          aria-hidden="true"
        />
      )}
    </button>
  )
}

