'use client'

import { useReveal } from '@/hooks/useReveal'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Everything you need to start your family ritual.',
    cta: 'Get Started Free',
    ctaVariant: 'outline' as const,
    highlight: false,
    features: [
      '5 guided ritual sessions',
      'Breathwork & movement library',
      'Family streak tracker',
      'Progress insights',
      'Ages 3+ content',
      'iOS & Android app',
    ],
    missing: ['Unlimited session library', 'Premium audio guides', 'Family sharing (up to 6)', 'Offline mode'],
  },
  {
    name: 'Family',
    price: '$9.99',
    period: 'per month',
    annualNote: 'or $79.99/year (save 33%)',
    description: 'Unlimited access for your whole family. Cancel anytime.',
    cta: 'Start Free Trial',
    ctaVariant: 'primary' as const,
    highlight: true,
    badge: 'Most Popular',
    features: [
      'Everything in Free',
      'Unlimited session library',
      'Premium audio guides',
      'Family sharing (up to 6)',
      'Offline mode',
      'Priority support',
      'New content weekly',
      'Milestone celebrations',
    ],
    missing: [],
  },
]

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
      <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg className="w-4 h-4 text-[var(--border)] flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
      <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PricingSection() {
  const ref = useReveal()

  return (
    <section id="pricing" className="section-py bg-white" ref={ref}>
      <div className="container-wide">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 reveal">
          <span className="inline-block font-body text-xs font-semibold tracking-widest
                           uppercase text-forest mb-3">
            Pricing
          </span>
          <h2 className="font-heading text-heading-xl text-[var(--text)] mb-4">
            Simple, transparent pricing
          </h2>
          <p className="font-body text-body-lg text-[var(--text-light)]">
            Start free. Upgrade when you're ready. No surprise charges.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={cn(
                `reveal reveal-delay-${i + 1}
                 relative rounded-3xl p-8
                 border transition-all duration-300`,
                plan.highlight
                  ? 'bg-forest border-forest shadow-[0_8px_40px_rgba(61,107,79,0.25)] scale-[1.02]'
                  : 'bg-white border-[var(--border-light)] hover:shadow-soft'
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-amber text-white font-body font-semibold text-xs
                                   px-3 py-1 rounded-full shadow-sm">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={cn(
                  'font-heading font-semibold text-heading-sm mb-1',
                  plan.highlight ? 'text-white' : 'text-[var(--text)]'
                )}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={cn(
                    'font-heading font-bold text-[2.5rem] leading-none',
                    plan.highlight ? 'text-white' : 'text-[var(--text)]'
                  )}>
                    {plan.price}
                  </span>
                  <span className={cn(
                    'font-body text-sm',
                    plan.highlight ? 'text-white/70' : 'text-[var(--text-light)]'
                  )}>
                    /{plan.period}
                  </span>
                </div>
                {plan.annualNote && (
                  <p className="font-body text-xs text-white/60 mb-2">{plan.annualNote}</p>
                )}
                <p className={cn(
                  'font-body text-sm',
                  plan.highlight ? 'text-white/80' : 'text-[var(--text-light)]'
                )}>
                  {plan.description}
                </p>
              </div>

              <Button
                href={plan.highlight ? '#download' : '#download'}
                variant={plan.highlight ? 'secondary' : 'outline'}
                size="md"
                className="w-full justify-center mb-7"
              >
                {plan.cta}
              </Button>

              <ul className="space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    {plan.highlight
                      ? <span className="text-white/80 mt-0.5">✓</span>
                      : <CheckIcon />
                    }
                    <span className={cn(
                      'font-body text-sm',
                      plan.highlight ? 'text-white/90' : 'text-[var(--text)]'
                    )}>
                      {f}
                    </span>
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 opacity-40">
                    <XIcon />
                    <span className="font-body text-sm text-[var(--text-light)]">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust line */}
        <p className="reveal text-center font-body text-sm text-[var(--text-muted)] mt-8">
          🔒 Secure checkout · Cancel anytime · No credit card required to start free
        </p>
      </div>
    </section>
  )
}
