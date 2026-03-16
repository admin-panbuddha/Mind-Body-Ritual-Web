import { Navbar } from '@/components/sections/Navbar'
import { PricingSection } from '@/components/sections/PricingSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { Footer } from '@/components/sections/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing — MindBodyRitual',
  description:
    'Simple, transparent pricing. Start free. Upgrade to Family plan for unlimited access for up to 6 family members.',
}

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <div className="bg-gradient-to-b from-[#edf2ec] to-white section-py text-center">
          <div className="container-wide max-w-2xl mx-auto">
            <span className="inline-block font-body text-xs font-semibold tracking-widest
                             uppercase text-forest mb-4">
              Pricing
            </span>
            <h1 className="font-heading text-display-lg text-[var(--text)] mb-4">
              Start free. Grow together.
            </h1>
            <p className="font-body text-body-lg text-[var(--text-light)]">
              MindBodyRitual is free to start. Unlock the full library with a Family plan — designed for
              up to six family members, no matter how your family is shaped.
            </p>
          </div>
        </div>

        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}
