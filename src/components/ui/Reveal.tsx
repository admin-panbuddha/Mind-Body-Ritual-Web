'use client'

/**
 * Reveal primitives — scroll-triggered entrance animations.
 *
 * Three exports:
 *
 *   <Reveal>          — single element fade (heading, paragraph, image)
 *   <RevealStagger>   — parent that staggers its children
 *   <RevealItem>      — child inside <RevealStagger>
 *
 * Accessibility
 *   All three components call useReducedMotion(). When the user has
 *   prefers-reduced-motion: reduce set, they render as plain <div>s
 *   with no animation and no invisible initial state — zero flash,
 *   zero delay.
 *
 * CLS safety
 *   Only `opacity` and `transform` (y / x / scale) are animated.
 *   These run on the GPU compositor and never trigger layout reflow,
 *   so Cumulative Layout Shift = 0.
 *
 * viewport margin
 *   `margin: '-60px'` means the animation fires ~60 px before the
 *   element reaches the viewport edge — feels natural on all devices.
 */

import { motion, useReducedMotion, type Variants } from 'motion/react'
import { staggerItem, DUR, EASE } from '@/lib/motion'

// ── Reveal ───────────────────────────────────────────────────────

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** Seconds before the animation starts (default 0). */
  delay?: number
  /** Which direction the element slides in from (default 'up'). */
  direction?: Direction
  /** Re-animate every time it re-enters the viewport (default false). */
  repeat?: boolean
}

const dirOffset: Record<Direction, { x?: number; y?: number }> = {
  up:    { y: 28 },
  down:  { y: -28 },
  left:  { x: -28 },
  right: { x: 28 },
  none:  {},
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  repeat = false,
}: RevealProps) {
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    return <div className={className}>{children}</div>
  }

  const variants: Variants = {
    hidden: { opacity: 0, ...dirOffset[direction] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: DUR.normal,
        ease: EASE.out,
        delay,
      },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, margin: '-60px' }}
      variants={variants}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  )
}

// ── RevealStagger ────────────────────────────────────────────────

interface RevealStaggerProps {
  children: React.ReactNode
  className?: string
  /** Seconds between each child's animation start (default 0.1). */
  stagger?: number
  /** Delay before the first child starts (default 0.05). */
  delay?: number
  repeat?: boolean
}

export function RevealStagger({
  children,
  className,
  stagger = 0.1,
  delay = 0.05,
  repeat = false,
}: RevealStaggerProps) {
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

// ── RevealItem ───────────────────────────────────────────────────

interface RevealItemProps {
  children: React.ReactNode
  className?: string
  /** Override the default staggerItem variant with a custom one. */
  variants?: Variants
}

export function RevealItem({
  children,
  className,
  variants = staggerItem,
}: RevealItemProps) {
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  )
}
