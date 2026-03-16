'use client'

import { useReveal } from '@/hooks/useReveal'

const steps = [
  {
    number: '01',
    emoji: '📱',
    title: 'Open the app',
    description:
      "Launch MindBodyRitual every morning. Your day's five rituals are waiting — no planning, no prep.",
  },
  {
    number: '02',
    emoji: '👨‍👧',
    title: 'Gather the family',
    description:
      'Call the kids over. Each ritual is designed for caregivers and children to do together, side by side.',
  },
  {
    number: '03',
    emoji: '🌿',
    title: 'Follow the ritual',
    description:
      'Guided audio and visuals walk you through each 5-minute ritual — breathwork, movement, gratitude, and more.',
  },
  {
    number: '04',
    emoji: '💛',
    title: 'Build the streak',
    description:
      'Track your family streak, celebrate milestones, and watch your morning ritual become the favourite part of the day.',
  },
]

export function HowItWorks() {
  const ref = useReveal()

  return (
    <section id="how-it-works" className="section-py bg-white" ref={ref}>
      <div className="container-wide">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 reveal">
          <span className="inline-block font-body text-xs font-semibold tracking-widest
                           uppercase text-forest mb-3">
            How It Works
          </span>
          <h2 className="font-heading text-heading-xl text-[var(--text)] mb-4">
            Simple enough for any morning
          </h2>
          <p className="font-body text-body-lg text-[var(--text-light)]">
            No equipment. No expertise. Just five minutes per ritual and a willingness to show up together.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`reveal reveal-delay-${i + 1}
                          relative p-6 rounded-3xl
                          border border-[var(--border-light)]
                          bg-gradient-to-br from-cream to-white
                          hover:shadow-soft transition-all duration-300
                          hover:-translate-y-1`}
            >
              {/* Connector line between steps (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-3 w-6 h-px
                                bg-gradient-to-r from-[var(--border)] to-transparent z-10" />
              )}

              <div className="flex items-start gap-3 mb-4">
                <span className="font-heading font-bold text-3xl text-[var(--border)]
                                 leading-none select-none">
                  {step.number}
                </span>
                <span className="text-3xl mt-0.5">{step.emoji}</span>
              </div>

              <h3 className="font-heading font-semibold text-heading-sm text-[var(--text)] mb-2">
                {step.title}
              </h3>
              <p className="font-body text-body-sm text-[var(--text-light)] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
