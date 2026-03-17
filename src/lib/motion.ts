/**
 * Shared Motion (Framer Motion v12) config for MindBodyRitual.
 *
 * ALL animation variants live here so values stay consistent across
 * every component. Components never hard-code durations or easings.
 *
 * Accessibility: every component that uses these variants must call
 * useReducedMotion() and skip animation when it returns true.
 * The <Reveal> and <PageTransition> primitives do this automatically.
 */

// ── Easing curves ────────────────────────────────────────────────
export const EASE = {
  /** Smooth deceleration — good for entrances */
  out: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  /** Symmetric — good for hovers */
  inOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
} as const

// ── Durations (seconds) ──────────────────────────────────────────
export const DUR = {
  instant: 0.12,
  fast:    0.2,
  normal:  0.42,
  slow:    0.65,
} as const

// ── Section / card scroll-reveal ─────────────────────────────────
/** Generic fade-up used for headings, paragraphs, and stand-alone elements. */
export const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.normal, ease: EASE.out },
  },
}

/** Fade from left — good for sub-headings coming in from the edge. */
export const fadeLeft = {
  hidden:  { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR.normal, ease: EASE.out },
  },
}

/** Scale + fade — for icons, badges, stat pills. */
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DUR.normal, ease: EASE.out },
  },
}

// ── Stagger orchestration ────────────────────────────────────────
/**
 * Parent container — triggers staggered children.
 * Pair with staggerItem or any variant that has hidden/visible keys.
 */
export const staggerContainer = (
  staggerChildren = 0.1,
  delayChildren = 0.05,
) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
})

/** Generic child item used inside a staggerContainer. */
export const staggerItem = {
  hidden:  { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.normal, ease: EASE.out },
  },
}

// ── Page / route transition ──────────────────────────────────────
/** Soft fade + slight upward slide on page mount. */
export const pageTransition = {
  initial:  { opacity: 0, y: 10 },
  animate:  { opacity: 1, y: 0, transition: { duration: DUR.normal, ease: EASE.out } },
  exit:     { opacity: 0, y: -6, transition: { duration: DUR.fast, ease: EASE.inOut } },
}

// ── Button / interactive element micro-interactions ──────────────
/** Lift + subtle scale on hover; confirm-press on tap. */
export const buttonHover = {
  whileHover: { scale: 1.04, transition: { duration: DUR.fast, ease: EASE.inOut } },
  whileTap:   { scale: 0.96, transition: { duration: DUR.instant } },
}

/** Lighter version for ghost/outline buttons. */
export const buttonHoverSubtle = {
  whileHover: { scale: 1.025, transition: { duration: DUR.fast, ease: EASE.inOut } },
  whileTap:   { scale: 0.975, transition: { duration: DUR.instant } },
}

/** Icon-only micro-interaction (rotate + scale). */
export const iconSpin = {
  whileHover: {
    rotate: 12,
    scale: 1.12,
    transition: { duration: DUR.fast, ease: EASE.inOut },
  },
}
