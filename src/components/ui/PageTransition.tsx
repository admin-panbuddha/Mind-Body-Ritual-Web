'use client'

/**
 * PageTransition
 * ─────────────
 * Wraps the page in a gentle fade + slide-up on every route mount.
 * Lives in layout.tsx so it fires on every navigation.
 *
 * Accessibility: skips animation entirely when the user has
 * prefers-reduced-motion: reduce set in their OS / browser.
 *
 * CLS safety: only animates opacity + transform (GPU compositor
 * layers) — never height, width, or layout properties.
 */

import { motion, useReducedMotion } from 'motion/react'
import { pageTransition } from '@/lib/motion'

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    // Render immediately with no animation wrapper overhead
    return <>{children}</>
  }

  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      // key is intentionally not set here — the parent (layout) should
      // pass a route-derived key if exit animations are needed.
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  )
}
