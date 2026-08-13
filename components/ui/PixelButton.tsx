import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * `comet` — the primary "launch" CTA look: comet-orange fill, star-gold
   * border. `ghost` — quieter secondary action: nebula fill, starchart
   * border, for things like a project's secondary "View repo" link.
   */
  variant?: 'comet' | 'ghost'
  children: ReactNode
}

const variantStyles: Record<
  NonNullable<PixelButtonProps['variant']>,
  { style: Record<string, string>; text: string }
> = {
  comet: {
    style: {
      '--pixel-fill-color': 'var(--color-comet)',
      '--pixel-border-color': 'var(--color-star)',
    },
    text: 'text-void',
  },
  ghost: {
    style: {
      '--pixel-fill-color': 'var(--color-nebula)',
      '--pixel-border-color': 'var(--color-starchart)',
    },
    text: 'text-starchart',
  },
}

export function PixelButton({
  variant = 'comet',
  className,
  style,
  children,
  ...props
}: PixelButtonProps) {
  const { style: variantStyle, text } = variantStyles[variant]

  return (
    <button
      className={cn(
        'pixel-frame pixel-frame-pressable px-5 py-2.5 font-display text-xs md:text-sm',
        text,
        className
      )}
      style={{ ...variantStyle, ...style }}
      {...props}
    >
      {children}
    </button>
  )
}
