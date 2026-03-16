'use client'

import { useReveal } from '@/hooks/useReveal'

const testimonials = [
  {
    quote:
      "We've tried so many 'family wellness' things that fell apart after a week. This actually stuck. My daughter literally asks for it now every morning.",
    author: 'Sarah M.',
    role: 'Mom of two, Vancouver',
    avatar: '👩',
    stars: 5,
  },
  {
    quote:
      "The breathwork section alone has been transformative for my anxious 5-year-old. We do it together every morning and I swear it sets the tone for the whole day.",
    author: 'David K.',
    role: 'Dad, Toronto',
    avatar: '👨',
    stars: 5,
  },
  {
    quote:
      "I was skeptical — 25 minutes sounds like a lot. But it goes by so fast and my kids are so engaged. We haven't missed a morning in 6 weeks.",
    author: 'Amara T.',
    role: 'Single mom of three, Calgary',
    avatar: '👩‍🦱',
    stars: 5,
  },
  {
    quote:
      'The gratitude ritual has opened up conversations with my son that I never expected. He shares things during our practice he'd never bring up otherwise.',
    author: 'James L.',
    role: 'Father of one, Montreal',
    avatar: '🧔',
    stars: 5,
  },
  {
    quote:
      "My 3-year-old does the movement section with me and it's genuinely the cutest thing I've ever seen. We laugh every single morning. Worth it just for that.",
    author: 'Priya R.',
    role: 'New mom, Ottawa',
    avatar: '👩‍🦳',
    stars: 5,
  },
  {
    quote:
      'As someone who struggled with a morning routine myself, having a kid-friendly version that WE do together was the accountability I needed. We both grew.',
    author: 'Chris B.',
    role: 'Dad, Edmonton',
    avatar: '👱',
    stars: 5,
  },
]

export function Testimonials() {
  const ref = useReveal()

  return (
    <section className="section-py bg-cream overflow-hidden" ref={ref}>
      <div className="container-wide">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 reveal">
          <span className="inline-block font-body text-xs font-semibold tracking-widest
                           uppercase text-forest mb-3">
            Families Love It
          </span>
          <h2 className="font-heading text-heading-xl text-[var(--text)] mb-4">
            Real families. Real mornings.
          </h2>
          <p className="font-body text-body-lg text-[var(--text-light)]">
            Over 2,400 families have made MindBodyRitual part of their morning — here's what they say.
          </p>
        </div>

        {/* Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              className={`reveal reveal-delay-${(i % 3) + 1}
                          break-inside-avoid rounded-3xl p-6
                          bg-white border border-[var(--border-light)]
                          hover:shadow-soft transition-all duration-300`}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <span key={si} className="text-amber text-sm">★</span>
                ))}
              </div>

              <p className="font-body text-body-sm text-[var(--text)] leading-relaxed mb-5 italic">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage/30 to-forest/20
                                flex items-center justify-center text-lg border border-[var(--border-light)]">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-body font-semibold text-sm text-[var(--text)]">{t.author}</p>
                  <p className="font-body text-xs text-[var(--text-light)]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
