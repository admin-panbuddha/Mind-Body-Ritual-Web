'use client'

/**
 * Hero — "Breathing Calm" animation direction
 * ─────────────────────────────────────────────
 * • Staggered entrance via motion (badge → h1 → p → CTA → social → phone)
 * • Ambient CSS breathing on background gradient orbs (6s cycle)
 * • Floating stat pills via CSS @keyframes (preserved from original)
 * • Full prefers-reduced-motion support — renders static when enabled
 * • CLS-safe: only opacity + transform animated, no layout properties
 */

import { motion, useReducedMotion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { heroContainer, heroItem } from '@/lib/motion'
import { hero as heroContent } from '@/content'

// ── Sub-components ──────────────────────────────────────────────

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                     bg-[var(--sage-light)] text-forest text-xs font-body font-semibold
                     border border-forest/20 tracking-wide uppercase">
      {children}
    </span>
  )
}

// ── Main component ──────────────────────────────────────────────

export function Hero() {
  const shouldReduce = useReducedMotion()

  // Choose wrapper: motion.div for animated, plain div for reduced motion
  const Container = shouldReduce ? 'div' : motion.div
  const Item = shouldReduce ? 'div' : motion.div

  // Props only applied when animating
  const containerProps = shouldReduce ? {} : {
    variants: heroContainer,
    initial: 'hidden' as const,
    animate: 'visible' as const,
  }

  const itemProps = shouldReduce ? {} : {
    variants: heroItem,
    style: { willChange: 'opacity, transform' as const },
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-cream pt-20 pb-16">

      {/* ── LAYER 0: Hero background image (swap URL in content.ts) ─ */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {heroContent.backgroundImage ? (
          /* Real image — covers section, stays centered at any size */
          <img
            src={heroContent.backgroundImage}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        ) : (
          /* Placeholder — shows a dashed outline so you know exactly where the image will sit */
          <div className="w-full h-full flex items-center justify-center"
               style={{
                 background: 'linear-gradient(135deg, #e8f0e9 0%, #f5f3ea 50%, #eef2ec 100%)',
                 border: '2px dashed rgba(61,107,79,0.2)',
               }}>
            <span className="font-body text-xs text-forest/30 tracking-widest uppercase select-none">
              Hero background image — set URL in src/content.ts → hero.backgroundImage
            </span>
          </div>
        )}

        {/* Soft cream overlay — keeps text readable over any photo */}
        <div className="absolute inset-0"
             style={{ background: 'linear-gradient(to right, rgba(250,249,242,0.82) 40%, rgba(250,249,242,0.45) 100%)' }} />
      </div>

      {/* ── LAYER 1: Ambient breathing orbs (on top of photo, under content) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full
                        bg-gradient-to-br from-sage/20 to-forest/10 blur-3xl
                        hero-orb-breathe" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full
                        bg-gradient-to-tr from-amber/15 to-gold/10 blur-3xl
                        hero-orb-breathe hero-orb-breathe--delayed" />
      </div>

      <div className="container-wide relative z-10">
        <div className="flex items-center">

          {/* ── Left — Copy (staggered entrance) ─────────────── */}
          <Container className="max-w-xl" {...containerProps}>

            <Item className="mb-6" {...itemProps}>
              <Badge><Icon name="ui_Icon_leaf" size={14} className="inline-block -mt-0.5" /> Free during Early Access</Badge>
            </Item>

            <Item {...itemProps}>
              <h1 className="font-heading text-display-lg md:text-display-xl
                             text-forest leading-[1.08] tracking-tight mb-6">
                25 minutes.<br />
                Five rituals.<br />
                <span className="text-amber">One family.</span>
              </h1>
            </Item>

            <Item {...itemProps}>
              <p className="font-body text-body-lg text-[var(--text-light)]
                            leading-relaxed mb-8 max-w-md">
                A morning wellness routine designed for caregivers and kids ages 3+.
                Breathe, move, connect — together, every day.
              </p>
            </Item>

            <Item className="flex flex-col sm:flex-row gap-3 mb-10" {...itemProps}>
              <Button href="#download" size="lg" variant="primary">
                Get the App — Free
              </Button>
              <Button href="#how-it-works" size="lg" variant="ghost">
                See how it works ↓
              </Button>
            </Item>

            {/* Social proof row */}
            <Item className="flex items-center gap-4 flex-wrap" {...itemProps}>
              <div className="flex -space-x-2">
                {['ui_Icon_Meditation', 'ui_icon_profile', 'ui_Icon_leaf', 'ui_Icon_Lotus'].map((icon, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-sage/40 to-forest/30
                               border-2 border-cream flex items-center justify-center"
                  >
                    <Icon name={icon} size={18} />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber text-sm">
                  {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                </div>
                <p className="font-body text-xs text-[var(--text-light)] mt-0.5">
                  Loved by 2,400+ families
                </p>
              </div>
            </Item>
          </Container>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1
                      text-[var(--text-light)] animate-bounce-slow">
        <span className="font-body text-xs tracking-widest uppercase">Scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}
