'use client'

import { useReveal } from '@/hooks/useReveal'
import { Accordion } from '@/components/ui/Accordion'

const faqs = [
  {
    question: 'What age is MindBodyRitual designed for?',
    answer:
      'MindBodyRitual is designed for caregivers and children ages 3 and up. All five rituals — breathwork, movement, stretching, nature moments, and gratitude — are designed to be fully accessible to toddlers through school-age kids, with the parent or caregiver participating alongside them.',
  },
  {
    question: 'What do I need to get started?',
    answer:
      'Just the app and five minutes per ritual. No equipment, no special clothing, no experience with yoga or meditation needed. All you need is a phone or tablet and a willingness to show up each morning.',
  },
  {
    question: 'How long does the full ritual take?',
    answer:
      'The full five-ritual session is 25 minutes — five minutes per ritual. If you only have time for one or two rituals on a busy morning, that works too. Any ritual is better than none.',
  },
  {
    question: 'Can we do the rituals at different times of day?',
    answer:
      'Absolutely. While the rituals are designed as a morning routine (they work great for setting intentions and energy for the day), many families do them after school, before bed, or whenever works best for their schedule.',
  },
  {
    question: 'Is there a free version?',
    answer:
      'Yes! MindBodyRitual has a free tier that includes five guided ritual sessions, the streak tracker, and access to the core breathwork and movement library. The Family plan unlocks the full library with unlimited sessions, premium audio guides, and family sharing.',
  },
  {
    question: 'Does it work without an internet connection?',
    answer:
      'Offline mode is available on the Family plan. If you are on the Free plan, you will need an internet connection to stream the guided sessions.',
  },
  {
    question: 'How is MindBodyRitual different from other kids\' wellness apps?',
    answer:
      'Most wellness apps are either for adults or for kids — but not for both together. MindBodyRitual is built specifically for caregivers and kids to do side by side. The bonding and shared experience is the point, not just the wellness benefits.',
  },
  {
    question: 'Is my data safe?',
    answer:
      'Yes. We use Supabase (industry-standard PostgreSQL) for data storage and never sell your personal data. Family streak data and email addresses are encrypted and used only to provide the service. See our Privacy Policy for full details.',
  },
]

export function FAQSection() {
  const ref = useReveal()

  return (
    <section id="faq" className="section-py bg-cream" ref={ref}>
      <div className="container-wide">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12 reveal">
            <span className="inline-block font-body text-xs font-semibold tracking-widest
                             uppercase text-forest mb-3">
              FAQ
            </span>
            <h2 className="font-heading text-heading-xl text-[var(--text)] mb-4">
              Common questions
            </h2>
            <p className="font-body text-body-lg text-[var(--text-light)]">
              Still have questions? Reach us at{' '}
              <a href="mailto:hello@mindbodyritual.ca" className="text-forest underline underline-offset-2">
                hello@mindbodyritual.ca
              </a>
            </p>
          </div>

          {/* Accordion */}
          <div className="reveal reveal-delay-1 space-y-2">
            {faqs.map((faq) => (
              <Accordion key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
