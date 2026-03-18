'use client'

import { Reveal, RevealStagger, RevealItem } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'
import { testimonials as testimonialsData } from '@/content'

export function Testimonials() {
  return (
    <section className="section-py bg-cream overflow-hidden">
      <div className="container-wide">

        {/* Header */}
        <Reveal className="text-center max-w-xl mx-auto mb-16">
          <span className="inline-block font-body text-xs font-semibold tracking-widest
                           uppercase text-forest mb-3">
            {testimonialsData.sectionLabel}
          </span>
          <h2 className="font-heading text-heading-xl text-[var(--text)] mb-4">
            {testimonialsData.headline}
          </h2>
          <p className="font-body text-body-lg text-[var(--text-light)]">
            {testimonialsData.subheadline}
          </p>
        </Reveal>

        {/* Grid — staggered masonry */}
        <RevealStagger
          className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5"
          stagger={0.08}
        >
          {testimonialsData.items.map((t) => (
            <RevealItem key={t.author}>
              <div
                className="break-inside-avoid rounded-3xl p-6
                            bg-white border border-[var(--border-light)]
                            hover:shadow-soft transition-shadow duration-300"
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
                                  flex items-center justify-center border border-[var(--border-light)]">
                    <Icon name={t.icon} size={20} />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-sm text-[var(--text)]">{t.author}</p>
                    <p className="font-body text-xs text-[var(--text-light)]">{t.role}</p>
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
