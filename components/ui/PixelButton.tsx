import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * `comet` → primary CTA: teal fill, deep bg text.
   * `ghost` → secondary action: void-surface fill, ink text.
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
      '--pixel-fill-color': 'var(--color-teal)',
      '--pixel-border-color': 'var(--color-teal-dim)',
    },
    text: 'text-void-deep',
  },
  ghost: {
    style: {
      '--pixel-fill-color': 'var(--color-void-surface)',
      '--pixel-border-color': 'rgba(245, 233, 214, 0.4)',
    },
    text: 'text-ink',
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
      <span className="relative z-10">{children}</span>
    </button>
  )
}
