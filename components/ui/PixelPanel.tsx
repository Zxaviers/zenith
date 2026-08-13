import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface PixelPanelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * `nebula` — light text on a dark nebula-violet fill with a star-gold
   * border. The default; used for most cockpit-HUD style cards.
   *
   * `starchart` — dark text on a cream "star chart" fill with a
   * nebula-violet border. Use sparingly for panels that want to read like
   * an old astronomer's paper chart rather than a HUD display.
   */
  variant?: 'nebula' | 'starchart'
  children: ReactNode
}

const variantStyles: Record<
  NonNullable<PixelPanelProps['variant']>,
  { style: Record<string, string>; text: string }
> = {
  nebula: {
    style: {
      '--pixel-fill-color': 'var(--color-nebula)',
      '--pixel-border-color': 'var(--color-star)',
    },
    text: 'text-starchart',
  },
  starchart: {
    style: {
      '--pixel-fill-color': 'var(--color-starchart)',
      '--pixel-border-color': 'var(--color-nebula)',
    },
    text: 'text-void',
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
      {children}
    </div>
  )
}
