import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-semibold text-[var(--text)] font-body">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-3 rounded-xl border text-[var(--text)] font-body text-base',
            'bg-white placeholder:text-[var(--text-muted)]',
            'transition-all duration-250',
            'focus:outline-none focus:ring-2 focus:ring-forest/40 focus:border-forest',
            error
              ? 'border-red-400 focus:ring-red-200'
              : 'border-[var(--border)] hover:border-[var(--sage)]',
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-500 font-body">{error}</p>}
        {hint && !error && <p className="text-sm text-[var(--text-muted)] font-body">{hint}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-semibold text-[var(--text)] font-body">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={4}
          className={cn(
            'w-full px-4 py-3 rounded-xl border text-[var(--text)] font-body text-base resize-vertical',
            'bg-white placeholder:text-[var(--text-muted)]',
            'transition-all duration-250',
            'focus:outline-none focus:ring-2 focus:ring-forest/40 focus:border-forest',
            error
              ? 'border-red-400 focus:ring-red-200'
              : 'border-[var(--border)] hover:border-[var(--sage)]',
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-500 font-body">{error}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
