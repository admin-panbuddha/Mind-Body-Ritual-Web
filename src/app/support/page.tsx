import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import { Accordion } from '@/components/ui/Accordion'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support — MindBodyRitual',
  description: 'Get help with MindBodyRitual. Browse common questions or contact our support team.',
}

const supportFaqs = [
  {
    question: 'How do I reset my password?',
    answer:
      'On the login screen, tap "Forgot password?" and enter your email address. You\'ll receive a reset link within a few minutes. Check your spam folder if you don\'t see it.',
  },
  {
    question: 'How do I cancel my Family plan subscription?',
    answer:
      'You can cancel anytime from within the app: go to Settings → Subscription → Cancel Plan. Your access continues until the end of the current billing period. No fees for cancelling.',
  },
  {
    question: 'Why isn\'t the app downloading my offline sessions?',
    answer:
      'Offline downloads require a Wi-Fi connection and at least 500MB of free storage. Make sure you\'re connected to Wi-Fi, then go to Settings → Downloads → Download All Sessions.',
  },
  {
    question: 'Can I use MindBodyRitual on multiple devices?',
    answer:
      'Yes. You can log into your account on up to two devices simultaneously. Family plan members each get their own profile with separate streak tracking.',
  },
  {
    question: 'How do I add family members to my plan?',
    answer:
      'From the app, go to Settings → Family → Invite Member. Enter their email address. They\'ll receive an invitation to create their own profile under your family account.',
  },
  {
    question: 'I purchased a plan but it\'s not showing as active — what do I do?',
    answer:
      'First, try signing out and back in. If the issue persists, contact us at hello@mindbodyritual.ca with your purchase receipt and we\'ll manually activate your account within 24 hours.',
  },
]

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">

        {/* Hero */}
        <div className="bg-gradient-to-b from-[#edf2ec] to-white py-20 text-center">
          <div className="container-wide max-w-2xl mx-auto">
            <span className="inline-block font-body text-xs font-semibold tracking-widest
                             uppercase text-forest mb-4">
              Support
            </span>
            <h1 className="font-heading text-display-lg text-[var(--text)] mb-4">
              How can we help?
            </h1>
            <p className="font-body text-body-lg text-[var(--text-light)] mb-8">
              Browse our most common questions below, or reach us directly.
            </p>
            <a
              href="mailto:hello@mindbodyritual.ca"
              className="inline-flex items-center gap-2 font-body font-medium text-sm
                         text-forest border border-forest/30 rounded-2xl px-5 py-3
                         hover:bg-forest hover:text-white transition-all duration-200"
            >
              ✉️ hello@mindbodyritual.ca
            </a>
          </div>
        </div>

        {/* FAQ */}
        <section className="section-py bg-white">
          <div className="container-wide max-w-2xl mx-auto">
            <h2 className="font-heading text-heading-lg text-[var(--text)] mb-8">
              Common questions
            </h2>
            <div className="space-y-2">
              {supportFaqs.map((faq) => (
                <Accordion key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact card */}
        <section className="section-py bg-cream">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center bg-white rounded-3xl p-10
                            border border-[var(--border-light)] shadow-soft">
              <div className="text-4xl mb-4">🐼</div>
              <h2 className="font-heading text-heading-lg text-[var(--text)] mb-3">
                Still need help?
              </h2>
              <p className="font-body text-body-lg text-[var(--text-light)] mb-6">
                Our team typically responds within one business day.
              </p>
              <a
                href="mailto:hello@mindbodyritual.ca"
                className="inline-flex items-center gap-2 bg-forest text-white
                           font-body font-semibold text-sm rounded-2xl px-6 py-3
                           hover:bg-[var(--forest-deep)] transition-colors duration-200"
              >
                Email Support
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
