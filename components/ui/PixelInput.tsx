import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface PixelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const PixelInput = forwardRef<HTMLInputElement, PixelInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full rounded-md px-3 py-2.5 font-body text-sm transition-all outline-none',
          'bg-void-deep text-starchart border placeholder:text-ink-muted/50',
          error
            ? 'border-comet ring-1 ring-comet shadow-[0_0_10px_rgba(255,139,76,0.3)]'
            : 'border-star/25 focus:border-star focus:ring-1 focus:ring-star focus:shadow-[0_0_12px_rgba(255,200,87,0.25)]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        style={{
          backgroundColor: 'var(--color-void-deep)',
          color: 'var(--color-starchart)',
        }}
        {...props}
      />
    )
  }
)
PixelInput.displayName = 'PixelInput'

export interface PixelTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

export const PixelTextarea = forwardRef<HTMLTextAreaElement, PixelTextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full rounded-md px-3 py-2.5 font-body text-sm transition-all outline-none resize-y',
          'bg-void-deep text-starchart border placeholder:text-ink-muted/50',
          error
            ? 'border-comet ring-1 ring-comet shadow-[0_0_10px_rgba(255,139,76,0.3)]'
            : 'border-star/25 focus:border-star focus:ring-1 focus:ring-star focus:shadow-[0_0_12px_rgba(255,200,87,0.25)]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        style={{
          backgroundColor: 'var(--color-void-deep)',
          color: 'var(--color-starchart)',
        }}
        {...props}
      />
    )
  }
)
PixelTextarea.displayName = 'PixelTextarea'
