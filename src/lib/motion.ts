/**
 * MindBodyRitual — Motion Design Tokens
 * ──────────────────────────────────────
 * Aligned with MOTION-SPEC.md (competitive research → timing tokens).
 *
 * Timing is intentionally SLOW compared to typical SaaS sites.
 * Wellness sites use 300–800ms for reveals because "slow = premium."
 * See MOTION-SPEC.md for the full rationale.
 */

// ── Easing curves ────────────────────────────────────────────────
export const EASE = {
  /** Smooth deceleration — all entrances and scroll reveals */
  out: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  /** Symmetric — hover states, interactive feedback */
  inOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
  /** Extra-gentle arrival — hero headline, premium entrance */
  gentle: [0.16, 1, 0.3, 1] as [number, number, number, number],
} as const

// ── Durations (seconds) ──────────────────────────────────────────
export const DUR = {
  instant: 0.12,   // color changes, icon swap
  fast:    0.25,   // button hover scale, tooltip appear
  normal:  0.5,    // section reveals, card entrances
  slow:    0.8,    // hero headline entrance
} as const

// ── Hero entrance ────────────────────────────────────────────────
/** Staggered entrance for the hero section elements. */
export const heroContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,    // let page paint first
    },
  },
}

export const heroItem = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slow, ease: EASE.gentle },
  },
}

/** Phone mockup — slightly larger motion, arrives last. */
export const heroPhone = {
  hidden:  { opacity: 0, y: 36, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, ease: EASE.gentle },
  },
}

// ── Section / card scroll-reveal ─────────────────────────────────
/** Generic fade-up used for headings, paragraphs, stand-alone elements. */
export const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.normal, ease: EASE.out },
  },
}

/** Fade from left — for sub-headings or asymmetric layouts. */
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
export const staggerContainer = (
  staggerChildren = 0.12,
  delayChildren = 0.05,
) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
})

/** Generic child item used inside a staggerContainer. */
export const staggerItem = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.normal, ease: EASE.out },
  },
}

// ── Page / route transition ──────────────────────────────────────
export const pageTransition = {
  initial:  { opacity: 0, y: 10 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE.out } },
  exit:     { opacity: 0, y: -6, transition: { duration: DUR.fast, ease: EASE.inOut } },
}

// ── Button / interactive micro-interactions ──────────────────────
export const buttonHover = {
  whileHover: { scale: 1.04, transition: { duration: DUR.fast, ease: EASE.inOut } },
  whileTap:   { scale: 0.96, transition: { duration: DUR.instant } },
}

export const buttonHoverSubtle = {
  whileHover: { scale: 1.025, transition: { duration: DUR.fast, ease: EASE.inOut } },
  whileTap:   { scale: 0.975, transition: { duration: DUR.instant } },
}

export const iconSpin = {
  whileHover: {
    rotate: 12,
    scale: 1.12,
    transition: { duration: DUR.fast, ease: EASE.inOut },
  },
}
