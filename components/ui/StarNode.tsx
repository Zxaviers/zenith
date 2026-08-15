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

/* Glow intensities keyed to mastery level — now teal/cyan palette */
const levelGlow: Record<SkillLevel, string> = {
  Proficient: '0 0 16px 4px rgba(0, 245, 196, 0.95), 0 0 28px 8px rgba(0, 191, 160, 0.5)',
  Familiar:   '0 0 10px 2px rgba(0, 245, 196, 0.75), 0 0 18px 4px rgba(0, 245, 196, 0.35)',
  Basic:      '0 0 6px 1px rgba(240, 238, 255, 0.5),  0 0 12px 2px rgba(240, 238, 255, 0.2)',
}

const stateColor: Record<StarNodeState, string> = {
  locked:   '#475569',
  unlocked: 'var(--color-teal-dim)',
  active:   'var(--color-teal)',
}

/**
 * A single glowing node on the star map / constellation skill tree.
 * Size and glow intensity scale proportionally with technical mastery.
 */
export function StarNode({
  label,
  state = 'unlocked',
  level = 'Familiar',
  size = 20,
  className,
  style,
  disabled,
  ...props
}: StarNodeProps) {
  const isLocked = state === 'locked'
  const isActive = state === 'active'

  const glowShadow = isLocked
    ? 'none'
    : isActive
      ? '0 0 20px 6px rgba(0, 245, 196, 1), 0 0 36px 10px rgba(0, 191, 160, 0.7)'
      : levelGlow[level]

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled ?? isLocked}
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center rounded-full transition-all duration-300',
        'focus-visible:outline focus-visible:outline-3 focus-visible:outline-teal focus-visible:outline-offset-2',
        isActive && 'scale-125 ring-2 ring-teal ring-offset-2 ring-offset-void-deep animate-pulse',
        !isLocked && !isActive && 'cursor-pointer hover:scale-125 hover:ring-2 hover:ring-teal/70',
        isLocked && 'cursor-not-allowed opacity-40',
        className
      )}
      style={{
        width: size,
        height: size,
        backgroundColor: stateColor[state],
        boxShadow: glowShadow,
        imageRendering: 'pixelated',
        ...style,
      }}
      {...props}
    />
  )
}
