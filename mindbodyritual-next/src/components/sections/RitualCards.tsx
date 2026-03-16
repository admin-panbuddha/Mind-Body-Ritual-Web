'use client'

import { useReveal } from '@/hooks/useReveal'

const rituals = [
  {
    emoji: '🌞',
    title: 'Wake-Up Stretch',
    subtitle: 'Body',
    duration: '5 min',
    color: 'from-amber/20 to-gold/10',
    accent: 'text-amber',
    border: 'border-amber/20',
    description:
      'Gentle full-body stretches to wake up muscles, improve circulation, and ease into the day with a smile.',
    tags: ['Ages 3+', 'No equipment'],
  },
  {
    emoji: '🧘',
    title: 'Breathwork',
    subtitle: 'Mind',
    duration: '5 min',
    color: 'from-sage/30 to-forest/10',
    accent: 'text-forest',
    border: 'border-forest/20',
    description:
      'Simple breathing exercises that calm the nervous system, build focus, and set a peaceful tone for the day.',
    tags: ['Calming', 'Focus'],
  },
  {
    emoji: '💪',
    title: 'Movement Flow',
    subtitle: 'Energy',
    duration: '5 min',
    color: 'from-[#e8d5f0]/40 to-[#d4c0e8]/20',
    accent: 'text-olive',
    border: 'border-olive/20',
    description:
      'Fun, energising movement — animal walks, yoga poses, balance challenges — that kids actually look forward to.',
    tags: ['High energy', 'Playful'],
  },
  {
    emoji: '🌿',
    title: 'Nature Moment',
    subtitle: 'Connection',
    duration: '5 min',
    color: 'from-[#d4eed4]/40 to-sage/20',
    accent: 'text-forest',
    border: 'border-sage/30',
    description:
      'A mindful pause to notice the natural world — light, weather, plants, sounds — and feel part of something larger.',
    tags: ['Mindfulness', 'Grounding'],
  },
  {
    emoji: '💛',
    title: 'Gratitude Practice',
    subtitle: 'Heart',
    duration: '5 min',
    color: 'from-gold/20 to-amber/10',
    accent: 'text-gold',
    border: 'border-gold/20',
    description:
      'Share one thing you\'re grateful for. Build the emotional habit of appreciation that lasts a lifetime.',
    tags: ['Emotional health', 'Bonding'],
  },
]

export function RitualCards() {
  const ref = useReveal()

  return (
    <section id="rituals" className="section-py bg-cream" ref={ref}>
      <div className="container-wide">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 reveal">
          <span className="inline-block font-body text-xs font-semibold tracking-widest
                           uppercase text-forest mb-3">
            The Five Rituals
          </span>
          <h2 className="font-heading text-heading-xl text-[var(--text)] mb-4">
            Five minutes each. A lifetime of impact.
          </h2>
          <p className="font-body text-body-lg text-[var(--text-light)]">
            Each ritual is carefully designed to be short enough to actually do and meaningful enough to matter.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rituals.map((ritual, i) => (
            <div
              key={ritual.title}
              className={`reveal reveal-delay-${(i % 3) + 1}
                          group relative rounded-3xl p-6 overflow-hidden
                          border ${ritual.border}
                          bg-gradient-to-br ${ritual.color}
                          hover:shadow-soft-md transition-all duration-300
                          hover:-translate-y-1 cursor-default`}
            >
              {/* Duration badge */}
              <div className="absolute top-4 right-4">
                <span className="font-body text-xs font-semibold text-[var(--text-light)]
                                 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1
                                 border border-[var(--border-light)]">
                  {ritual.duration}
                </span>
              </div>

              <div className="text-4xl mb-4">{ritual.emoji}</div>

              <div className="mb-1">
                <span className={`font-body text-xs font-semibold uppercase tracking-widest ${ritual.accent}`}>
                  {ritual.subtitle}
                </span>
              </div>

              <h3 className="font-heading font-semibold text-heading-sm text-[var(--text)] mb-2">
                {ritual.title}
              </h3>

              <p className="font-body text-body-sm text-[var(--text-light)] leading-relaxed mb-4">
                {ritual.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {ritual.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-[11px] font-medium text-[var(--text-light)]
                               bg-white/70 rounded-full px-2.5 py-0.5
                               border border-[var(--border-light)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* CTA card */}
          <div className="reveal reveal-delay-3 rounded-3xl p-6
                          bg-gradient-to-br from-forest to-[#2d5a3d]
                          flex flex-col items-center justify-center text-center
                          min-h-[200px] cursor-pointer
                          hover:shadow-soft-md transition-all duration-300 hover:-translate-y-1">
            <div className="text-4xl mb-3">🐼</div>
            <h3 className="font-heading font-semibold text-heading-sm text-white mb-2">
              Meet Panbuddha
            </h3>
            <p className="font-body text-sm text-white/80">
              Your family's wellness guide. Download the app to start your ritual today.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
