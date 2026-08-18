import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface FormGroupProps {
  label: string
  htmlFor: string
  required?: boolean
  hint?: string
  error?: string
  children: ReactNode
  className?: string
}

export function FormGroup({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
  className,
}: FormGroupProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={htmlFor}
          className="font-stat text-sm font-semibold tracking-wide"
          style={{ color: 'var(--color-starchart)' }}
        >
          {label}
          {required && <span className="ml-1 text-comet" aria-hidden="true">*</span>}
        </label>
        {hint && (
          <span className="font-stat text-xs" style={{ color: 'var(--color-ink-muted)' }}>
            {hint}
          </span>
        )}
      </div>

      {children}

      {error && (
        <span
          id={`${htmlFor}-error`}
          role="alert"
          className="font-stat text-xs font-medium text-comet mt-0.5"
        >
          ⚠ {error}
        </span>
      )}
    </div>
  )
}
