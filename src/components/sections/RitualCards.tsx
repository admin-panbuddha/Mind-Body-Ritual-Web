'use client'

import { useReveal } from '@/hooks/useReveal'

const rituals = [
  {
    step: 1,
    emoji: '🌞',
    title: 'Wake-Up Stretch',
    subtitle: 'Body',
    duration: '5 min',
    iconBg: 'rgba(229,177,119,0.18)',
    cardFrom: '#fffbf4',
    cardTo: '#fdf5e8',
    accentHex: '#C9813A',
    borderHex: 'rgba(229,177,119,0.3)',
    glowHex: 'rgba(229,177,119,0.22)',
    accentClass: 'text-amber',
    description:
      'Gentle full-body stretches to wake up muscles, improve circulation, and ease into the day with a smile.',
    tags: ['Ages 3+', 'No equipment'],
  },
  {
    step: 2,
    emoji: '🧘',
    title: 'Breathwork',
    subtitle: 'Mind',
    duration: '5 min',
    iconBg: 'rgba(139,168,136,0.22)',
    cardFrom: '#f6faf6',
    cardTo: '#edf5ec',
    accentHex: '#3D6B4F',
    borderHex: 'rgba(139,168,136,0.32)',
    glowHex: 'rgba(61,107,79,0.16)',
    accentClass: 'text-forest',
    description:
      'Simple breathing exercises that calm the nervous system, build focus, and set a peaceful tone for the day.',
    tags: ['Calming', 'Focus'],
  },
  {
    step: 3,
    emoji: '💪',
    title: 'Movement Flow',
    subtitle: 'Energy',
    duration: '5 min',
    iconBg: 'rgba(139,92,246,0.12)',
    cardFrom: '#fdf9ff',
    cardTo: '#f3eeff',
    accentHex: '#7C3AED',
    borderHex: 'rgba(139,92,246,0.2)',
    glowHex: 'rgba(139,92,246,0.14)',
    accentClass: 'text-lavender',
    description:
      'Fun, energising movement — animal walks, yoga poses, balance challenges — that kids actually look forward to.',
    tags: ['High energy', 'Playful'],
  },
  {
    step: 4,
    emoji: '🌿',
    title: 'Nature Moment',
    subtitle: 'Connection',
    duration: '5 min',
    iconBg: 'rgba(139,168,136,0.28)',
    cardFrom: '#f4fbf4',
    cardTo: '#e6f4e6',
    accentHex: '#5a8a6a',
    borderHex: 'rgba(139,168,136,0.3)',
    glowHex: 'rgba(139,168,136,0.2)',
    accentClass: 'text-sage',
    description:
      'A mindful pause to notice the natural world — light, weather, plants, sounds — and feel part of something larger.',
    tags: ['Mindfulness', 'Grounding'],
  },
  {
    step: 5,
    emoji: '💛',
    title: 'Gratitude Practice',
    subtitle: 'Heart',
    duration: '5 min',
    iconBg: 'rgba(201,169,110,0.18)',
    cardFrom: '#fdfbf5',
    cardTo: '#f8f0dc',
    accentHex: '#A8843A',
    borderHex: 'rgba(201,169,110,0.3)',
    glowHex: 'rgba(201,169,110,0.22)',
    accentClass: 'text-gold',
    description:
      "Share one thing you're grateful for. Build the emotional habit of appreciation that lasts a lifetime.",
    tags: ['Emotional health', 'Bonding'],
  },
]

export function RitualCards() {
  const ref = useReveal()

  return (
    <section id="rituals" className="section-py bg-cream" ref={ref}>
      <div className="container-wide">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="text-center max-w-2xl mx-auto mb-12 reveal">
          <span className="inline-block font-body text-xs font-semibold tracking-widest uppercase text-forest mb-4">
            The Five Rituals
          </span>
          <h2 className="font-heading text-display-sm text-[var(--text)] mb-4">
            Five minutes each.<br />A lifetime of impact.
          </h2>
          <p className="font-body text-body-lg text-[var(--text-light)] mb-7">
            Each ritual is carefully designed to be short enough to actually do
            and meaningful enough to matter.
          </p>
          {/* 25-minute total pill */}
          <div className="inline-flex items-center gap-2.5 bg-forest/[0.07] rounded-full
                          px-5 py-2.5 border border-forest/[0.12]">
            <span className="text-base">⏱</span>
            <span className="font-body text-sm font-semibold text-forest">25 minutes total</span>
            <span className="w-px h-4 bg-forest/20" />
            <span className="font-body text-sm text-[var(--text-muted)]">5 rituals × 5 min</span>
          </div>
        </div>

        {/* ── Step connector row ──────────────────────────────────── */}
        <div className="hidden sm:flex items-center justify-center gap-1.5 mb-10 reveal reveal-delay-1">
          {rituals.map((r, i) => (
            <div key={r.step} className="flex items-center gap-1.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center
                           text-[11px] font-bold font-body text-white shadow-soft-sm"
                style={{ backgroundColor: r.accentHex }}
              >
                {r.step}
              </div>
              {i < rituals.length - 1 && (
                <div className="w-10 h-px bg-gradient-to-r from-[var(--border)] to-[var(--border-light)]" />
              )}
            </div>
          ))}
        </div>

        {/* ── Cards grid ─────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          {rituals.map((ritual, i) => (
            <div
              key={ritual.title}
              className={`reveal reveal-delay-${(i % 3) + 1}
                          group relative rounded-3xl overflow-hidden cursor-default
                          transition-all duration-[350ms]
                          hover:-translate-y-2`}
              style={{
                background: `linear-gradient(145deg, ${ritual.cardFrom} 0%, ${ritual.cardTo} 100%)`,
                border: `1px solid ${ritual.borderHex}`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  `0 20px 60px ${ritual.glowHex}, 0 4px 16px rgba(0,0,0,0.06)`
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = ''
              }}
            >
              {/* Top accent stripe */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{
                  background: `linear-gradient(90deg, ${ritual.accentHex}, ${ritual.accentHex}55, transparent)`,
                }}
              />

              <div className="p-6 pt-7">
                {/* Step badge + duration */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center
                               text-[11px] font-bold font-body text-white"
                    style={{ backgroundColor: ritual.accentHex }}
                  >
                    {ritual.step}
                  </div>
                  <span
                    className="font-body text-xs font-semibold text-[var(--text-light)]
                               bg-white/80 backdrop-blur-sm rounded-full px-3 py-1
                               border border-[var(--border-light)]"
                  >
                    {ritual.duration}
                  </span>
                </div>

                {/* Icon container */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-3xl
                             group-hover:scale-110 transition-transform duration-[250ms]"
                  style={{ backgroundColor: ritual.iconBg }}
                >
                  {ritual.emoji}
                </div>

                {/* Category */}
                <span className={`font-body text-[11px] font-semibold uppercase tracking-widest ${ritual.accentClass} mb-1 block`}>
                  {ritual.subtitle}
                </span>

                {/* Title */}
                <h3 className="font-heading font-semibold text-heading-sm text-[var(--text)] mb-2">
                  {ritual.title}
                </h3>

                {/* Description */}
                <p className="font-body text-body-sm text-[var(--text-light)] leading-relaxed mb-4">
                  {ritual.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {ritual.tags.map(tag => (
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
            </div>
          ))}

          {/* ── Panbuddha CTA card ──────────────────────────────── */}
          <div
            className="reveal reveal-delay-3 group relative rounded-3xl overflow-hidden
                       cursor-pointer transition-all duration-[350ms]
                       hover:-translate-y-2 hover:shadow-soft-xl"
            style={{
              background: 'linear-gradient(135deg, #2C4A37 0%, #3D6B4F 55%, #4d7a60 100%)',
            }}
          >
            {/* Ambient blobs */}
            <div
              className="absolute inset-0 opacity-[0.08] pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 25% 15%, #8BA888 0%, transparent 50%),' +
                  'radial-gradient(circle at 80% 85%, #C9A96E 0%, transparent 50%)',
              }}
            />

            <div className="relative p-6 flex flex-col items-center justify-center text-center min-h-[280px] gap-0">
              {/* Panda */}
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-[250ms]">
                🐼
              </div>

              {/* Live badge */}
              <div className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 mb-3 border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-light animate-pulse" />
                <span className="font-body text-[10px] font-semibold text-white/75 uppercase tracking-widest">
                  Your Guide
                </span>
              </div>

              <h3 className="font-heading font-semibold text-heading-sm text-white mb-2">
                Meet Panbuddha
              </h3>
              <p className="font-body text-sm text-white/70 mb-5 leading-relaxed max-w-[200px]">
                Your family's wellness companion. Start your morning ritual today.
              </p>

              {/* CTA button */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5
                           border border-white/25 bg-white/12
                           hover:bg-white/20 transition-colors duration-200
                           font-body text-sm font-semibold text-white"
              >
                Get the app
                <span className="text-white/70 text-xs">→</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
