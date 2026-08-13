import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export type StarNodeState = 'locked' | 'unlocked' | 'active'

export interface StarNodeProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  /** Accessible label — also used as the native tooltip via `title`. */
  label: string
  state?: StarNodeState
  /** Diameter in pixels. */
  size?: number
}

const stateColor: Record<StarNodeState, string> = {
  locked: '#475569',
  unlocked: 'var(--color-star)',
  active: 'var(--color-comet)',
}

const stateGlow: Record<StarNodeState, string> = {
  locked: 'none',
  unlocked: '0 0 8px 2px var(--color-star)',
  active: '0 0 14px 4px var(--color-comet)',
}

/**
 * A single node on the star map / constellation skill tree. Purely a
 * visual + interaction primitive here (Fase 2) — grouping, connector
 * lines, and rich tooltips are composed around it in Fase 4.
 */
export function StarNode({
  label,
  state = 'unlocked',
  size = 20,
  className,
  style,
  disabled,
  ...props
}: StarNodeProps) {
  const isLocked = state === 'locked'

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled ?? isLocked}
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center rounded-full transition-transform duration-150',
        'focus-visible:outline focus-visible:outline-3 focus-visible:outline-aurora focus-visible:outline-offset-2',
        state === 'active' && 'scale-125',
        !isLocked && 'cursor-pointer hover:scale-125',
        isLocked && 'cursor-not-allowed',
        className
      )}
      style={{
        width: size,
        height: size,
        backgroundColor: stateColor[state],
        boxShadow: stateGlow[state],
        imageRendering: 'pixelated',
        ...style,
      }}
      {...props}
    />
  )
}
