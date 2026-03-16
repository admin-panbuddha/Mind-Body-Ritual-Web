'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  asChild?: boolean
  href?: string
}

const variants: Record<Variant, string> = {
  primary:   'bg-forest text-cream hover:bg-forest-deep shadow-soft-md hover:shadow-soft-lg active:scale-[.98]',
  secondary: 'bg-amber text-forest-deep hover:bg-gold shadow-soft-sm hover:shadow-soft-md active:scale-[.98]',
  ghost:     'bg-transparent text-forest hover:bg-sage-light active:scale-[.98]',
  outline:   'bg-transparent border-2 border-forest text-forest hover:bg-forest hover:text-cream active:scale-[.98]',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-base rounded-2xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, href, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center gap-2 font-body font-semibold',
      'cursor-pointer transition-all duration-250 ease-wellness',
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-2',
      'disabled:opacity-50 disabled:pointer-events-none',
      variants[variant],
      sizes[size],
      className
    )

    if (href) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      )
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
