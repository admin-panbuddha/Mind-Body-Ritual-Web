'use client'

import { Reveal } from '@/components/ui/Reveal'
import { Accordion } from '@/components/ui/Accordion'
import { faq as faqContent } from '@/content'


export function FAQSection() {
  return (
    <section id="faq" className="section-py bg-cream">
      <div className="container-wide">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <Reveal className="text-center mb-12">
            <span className="inline-block font-body text-xs font-semibold tracking-widest
                             uppercase text-forest mb-3">
              {faqContent.sectionLabel}
            </span>
            <h2 className="font-heading text-heading-xl text-[var(--text)] mb-4">
              {faqContent.headline}
            </h2>
            <p className="font-body text-body-lg text-[var(--text-light)]">
              Still have questions? Reach us at{' '}
              <a href={`mailto:${faqContent.contactEmail}`} className="text-forest underline underline-offset-2">
                {faqContent.contactEmail}
              </a>
            </p>
          </Reveal>

          {/* Accordion */}
          <Reveal delay={0.1} className="space-y-2">
            {faqContent.items.map((item) => (
              <Accordion key={item.question} question={item.question} answer={item.answer} />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
