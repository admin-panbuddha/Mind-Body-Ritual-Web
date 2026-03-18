'use client'

import { motion } from 'motion/react'
import { Icon } from '@/components/ui/Icon'
import { resources } from '@/content'

export function Resources() {
  return (
    <section id="resources" className="bg-cream section-py" style={{ overflowX: 'clip' }}>
      <div className="container-wide">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block font-body text-xs font-semibold tracking-widest uppercase text-forest mb-4">
            {resources.sectionLabel}
          </span>
          <h2 className="font-heading text-display-sm text-[var(--text)] mb-4">
            {resources.headline}
          </h2>
          <p className="font-body text-body-lg text-[var(--text-light)]">
            {resources.subheadline}
          </p>
        </div>

        {/* Resource cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {resources.items.map((item, i) => (
            <motion.a
              key={item.title}
              href={item.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className="group flex flex-col rounded-2xl bg-white/60 border border-black/[0.06]
                         p-6 hover:bg-white/90 hover:shadow-soft transition-all duration-250
                         cursor-pointer no-underline"
              style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}
            >
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 shrink-0
                           transition-transform duration-250 group-hover:scale-110"
                style={{
                  backgroundColor: `${item.accentHex}18`,
                  border: `1.5px solid ${item.accentHex}30`,
                }}
              >
                <Icon name={item.icon} size={20} />
              </div>

              {/* Category pill */}
              <span
                className="font-body text-[10px] font-bold uppercase tracking-widest mb-2"
                style={{ color: item.accentHex }}
              >
                {item.category}
              </span>

              {/* Title */}
              <h3 className="font-heading font-semibold text-[15px] text-[var(--text)] leading-snug mb-2
                             group-hover:text-forest transition-colors duration-200">
                {item.title}
              </h3>

              {/* Description */}
              <p className="font-body text-xs text-[var(--text-light)] leading-relaxed flex-1">
                {item.description}
              </p>

              {/* Read time + arrow */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-black/[0.05]">
                <span className="font-body text-[11px] text-[var(--text-muted)]">
                  {item.readTime}
                </span>
                <span
                  className="font-body text-[11px] font-semibold transition-all duration-200
                             group-hover:translate-x-1"
                  style={{ color: item.accentHex }}
                >
                  Read →
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={resources.ctaHref}
            className="inline-flex items-center gap-2 rounded-full border-2 border-forest
                       px-7 py-3 font-body text-sm font-semibold text-forest
                       hover:bg-forest hover:text-white transition-all duration-220
                       hover:shadow-soft"
          >
            {resources.cta}
            <span className="text-base leading-none">→</span>
          </a>
        </div>

      </div>
    </section>
  )
}
