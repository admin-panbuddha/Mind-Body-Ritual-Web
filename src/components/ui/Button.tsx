'use client'

/**
 * Button — MindBodyRitual design system.
 *
 * Uses motion (Framer Motion v12) for hover + tap micro-interactions.
 * Micro-interactions are disabled automatically when the user has
 * prefers-reduced-motion: reduce set.
 */

import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { buttonHover, buttonHoverSubtle } from '@/lib/motion'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
}

const variants: Record<Variant, string> = {
  primary:   'bg-forest text-cream hover:bg-forest-deep shadow-soft-md hover:shadow-soft-lg',
  secondary: 'bg-amber text-forest-deep hover:bg-gold shadow-soft-sm hover:shadow-soft-md',
  ghost:     'bg-transparent text-forest hover:bg-sage-light',
  outline:   'bg-transparent border-2 border-forest text-forest hover:bg-forest hover:text-cream',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-base rounded-2xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
}

/** Subtle variants get a lighter scale effect. */
const subtleVariants: Variant[] = ['ghost', 'outline']

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const shouldReduce = useReducedMotion()

  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-body font-semibold',
    'cursor-pointer transition-colors duration-200',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    variants[variant],
    sizes[size],
    className
  )

  const motionProps = shouldReduce
    ? {}
    : subtleVariants.includes(variant)
      ? buttonHoverSubtle
      : buttonHover

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        {...motionProps}
        style={{ willChange: 'transform', display: 'inline-flex' }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      className={classes}
      {...motionProps}
      style={{ willChange: 'transform' }}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  )
}

Button.displayName = 'Button'
