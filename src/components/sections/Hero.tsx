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
import { heroContainer, heroItem, heroPhone } from '@/lib/motion'

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

function StatPill({
  value,
  label,
  className,
  style,
}: {
  value: string
  label: string
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`absolute bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2.5
                  shadow-soft border border-[var(--border-light)]
                  flex flex-col items-center min-w-[90px] ${className ?? ''}`}
      style={style}
    >
      <span className="font-heading font-bold text-lg text-forest leading-none">{value}</span>
      <span className="font-body text-[10px] text-[var(--text-light)] mt-0.5 text-center leading-tight">{label}</span>
    </div>
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

  const phoneProps = shouldReduce ? {} : {
    variants: heroPhone,
    style: { willChange: 'opacity, transform' as const },
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden
                        bg-gradient-to-br from-cream via-[#F5F3EA] to-[#EEF2EC]
                        pt-20 pb-16">

      {/* ── Ambient breathing background orbs ──────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full
                        bg-gradient-to-br from-sage/20 to-forest/10 blur-3xl
                        hero-orb-breathe" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full
                        bg-gradient-to-tr from-amber/15 to-gold/10 blur-3xl
                        hero-orb-breathe hero-orb-breathe--delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[800px] h-[800px] rounded-full
                        bg-gradient-radial from-[#F0EDE4]/60 to-transparent blur-2xl
                        hero-orb-breathe hero-orb-breathe--slow" />
      </div>

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

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

          {/* ── Right — Phone mockup (arrives last) ──────────── */}
          <div className="relative flex justify-center lg:justify-end">
            <Container className="relative" {...containerProps}>
              <Item {...phoneProps}>
                {/* Glow behind phone */}
                <div className="absolute inset-0 scale-110 rounded-[48px]
                                bg-gradient-to-br from-forest/20 via-sage/15 to-amber/20
                                blur-2xl" />

                {/* Phone shell */}
                <div className="relative w-[280px] sm:w-[320px] aspect-[9/19.5]
                                bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d]
                                rounded-[48px] shadow-[0_32px_80px_rgba(0,0,0,0.35)]
                                border-[5px] border-[#333] overflow-hidden">

                  {/* Status bar */}
                  <div className="absolute top-0 left-0 right-0 h-10 bg-cream/95 flex items-center
                                  justify-between px-5 text-[10px] font-body font-medium text-[var(--text)] z-10">
                    <span>9:41</span>
                    <div className="w-20 h-4 bg-[#1a1a1a] rounded-full mx-auto" />
                    <span>●●●</span>
                  </div>

                  {/* App screen */}
                  <div className="absolute inset-0 pt-10 bg-cream">
                    <div className="px-4 py-3 flex items-center justify-between
                                    border-b border-[var(--border-light)]">
                      <span className="font-heading font-semibold text-sm text-forest flex items-center gap-1">
                        Good morning <Icon name="ui_Icon_leaf" size={14} />
                      </span>
                      <span className="text-lg">🐼</span>
                    </div>

                    <div className="px-4 py-4">
                      <p className="font-body text-[10px] text-[var(--text-light)] uppercase tracking-wider mb-2">
                        Today's Ritual
                      </p>
                      <div className="bg-gradient-to-br from-forest to-[#2d5a3d]
                                      rounded-2xl p-4 text-white mb-3">
                        <div className="mb-1"><Icon name="ui_Icon_Breath" size={28} className="invert brightness-200" /></div>
                        <p className="font-heading font-semibold text-sm">Morning Breathwork</p>
                        <p className="font-body text-[10px] text-white/70 mt-0.5">5 min · Ages 3+</p>
                        <div className="mt-3 bg-white/20 rounded-full h-1.5">
                          <div className="bg-white rounded-full h-1.5 w-3/5" />
                        </div>
                      </div>

                      {[
                        { icon: 'ui_Icon_Sun', name: 'Wake-Up Stretch', done: true },
                        { icon: 'ui_Icon_Breath', name: 'Breathwork', done: true },
                        { icon: 'ui_Icon_Flow', name: 'Movement Flow', done: false },
                        { icon: 'ui_Icon_leaf', name: 'Nature Moment', done: false },
                        { icon: 'ui_Icon_Lotus', name: 'Gratitude', done: false },
                      ].map((r, i) => (
                        <div key={i} className="flex items-center gap-2.5 py-1.5">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px]
                                          ${r.done
                              ? 'bg-forest text-white'
                              : 'bg-[var(--sage-light)] text-[var(--text-light)]'
                            }`}>
                            {r.done ? '✓' : <Icon name={r.icon} size={12} />}
                          </div>
                          <span className={`font-body text-[11px]
                                           ${r.done ? 'line-through text-[var(--text-light)]' : 'text-[var(--text)]'}`}>
                            {r.name}
                          </span>
                          <span className="ml-auto font-body text-[9px] text-[var(--text-light)]">5 min</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating stat pills */}
                <StatPill
                  value="25 min"
                  label="Daily ritual"
                  className="-left-12 top-16 animate-float"
                />
                <StatPill
                  value="5 rituals"
                  label="Per session"
                  className="-right-10 top-1/3 animate-float"
                  style={{ animationDelay: '0.8s' }}
                />
                <StatPill
                  value="Ages 3+"
                  label="Family-friendly"
                  className="-left-8 bottom-24 animate-float"
                  style={{ animationDelay: '1.4s' }}
                />
              </Item>
            </Container>
          </div>
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
