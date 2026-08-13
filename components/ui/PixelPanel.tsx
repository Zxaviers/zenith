import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface PixelPanelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * `nebula` — light text on a dark nebula-violet fill with a star-gold border.
   * `starchart` — dark text on a cream star chart fill with a nebula border.
   * `void` — deep space dark fill with a subtle comet/star border for nested telemetry.
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
  void: {
    style: {
      '--pixel-fill-color': 'var(--color-void)',
      '--pixel-border-color': 'rgba(255, 139, 76, 0.4)',
    },
    text: 'text-starchart',
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
