import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface PixelPanelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * `nebula` — Void surface fill with teal border (primary panel).
   * `starchart` — light text panel (unused in v3 but kept for compat).
   * `void` — deepest dark fill for nested/inner panels.
   */
  variant?: 'nebula' | 'starchart' | 'void'
  children: ReactNode
}

const variantStyles: Record<
  NonNullable<PixelPanelProps['variant']>,
  { style: Record<string, string>; text: string }
> = {
  nebula: {
    style: {
      '--pixel-fill-color': 'var(--color-void-surface)',
      '--pixel-border-color': 'var(--color-teal)',
    },
    text: 'text-ink',
  },
  starchart: {
    style: {
      '--pixel-fill-color': 'var(--color-void-mid)',
      '--pixel-border-color': 'var(--color-teal-dim)',
    },
    text: 'text-ink',
  },
  void: {
    style: {
      '--pixel-fill-color': 'var(--color-void-mid)',
      '--pixel-border-color': 'rgba(255, 200, 87, 0.3)',
    },
    text: 'text-ink',
  },
}

export function PixelPanel({
  variant = 'nebula',
  className,
  style,
  children,
  ...props
}: PixelPanelProps) {
  const { style: variantStyle, text } = variantStyles[variant]

  return (
    <div
      className={cn('pixel-frame p-4 md:p-6', text, className)}
      style={{ ...variantStyle, ...style }}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  )
}
