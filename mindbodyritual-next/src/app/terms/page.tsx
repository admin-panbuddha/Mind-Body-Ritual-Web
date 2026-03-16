import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — MindBodyRitual',
  description: 'MindBodyRitual Terms of Service. Read the terms governing your use of our app and website.',
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="bg-gradient-to-b from-[#edf2ec] to-white py-16 text-center">
          <div className="container-wide">
            <h1 className="font-heading text-display-lg text-[var(--text)] mb-2">Terms of Service</h1>
            <p className="font-body text-sm text-[var(--text-muted)]">Last updated: January 2025</p>
          </div>
        </div>

        <section className="section-py bg-white">
          <div className="container-wide max-w-3xl mx-auto">
            <div className="space-y-8 font-body text-[var(--text)]">

              <div>
                <h2 className="font-heading text-heading-md text-[var(--text)] mb-3">1. Acceptance of Terms</h2>
                <p className="text-[var(--text-light)] leading-relaxed">
                  By downloading, installing, or using MindBodyRitual (the "App") or visiting
                  mindbodyritual.ca (the "Site"), you agree to these Terms of Service and our Privacy Policy.
                  If you do not agree, please do not use our services. These terms are governed by the laws
                  of the Province of British Columbia, Canada.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-heading-md text-[var(--text)] mb-3">2. Description of Service</h2>
                <p className="text-[var(--text-light)] leading-relaxed">
                  MindBodyRitual provides guided wellness rituals for families. We offer a free tier and a
                  paid Family subscription. We reserve the right to modify, suspend, or discontinue any
                  aspect of the service with reasonable notice.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-heading-md text-[var(--text)] mb-3">3. Account Responsibility</h2>
                <p className="text-[var(--text-light)] leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account credentials and for
                  all activities that occur under your account. You must be at least 18 years of age to
                  create an account. Children may use the App only under adult supervision.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-heading-md text-[var(--text)] mb-3">4. Subscriptions and Payments</h2>
                <p className="text-[var(--text-light)] leading-relaxed mb-3">
                  The Family plan is billed monthly or annually in Canadian dollars (CAD). Subscriptions
                  auto-renew unless cancelled before the renewal date. To cancel:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-[var(--text-light)]">
                  <li>In-app: Settings → Subscription → Cancel Plan</li>
                  <li>iOS: through your Apple ID subscriptions settings</li>
                  <li>Android: through Google Play subscriptions</li>
                </ul>
                <p className="text-[var(--text-light)] leading-relaxed mt-3">
                  We do not offer refunds for partial billing periods. If you experience a billing error,
                  contact us within 30 days at hello@mindbodyritual.ca.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-heading-md text-[var(--text)] mb-3">5. Intellectual Property</h2>
                <p className="text-[var(--text-light)] leading-relaxed">
                  All content in MindBodyRitual — including audio guides, visual designs, the Panbuddha
                  mascot, ritual programmes, and written content — is owned by Panbuddha Inc. and protected
                  by copyright. You may not reproduce, distribute, or create derivative works from our
                  content without written permission.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-heading-md text-[var(--text)] mb-3">6. Health Disclaimer</h2>
                <p className="text-[var(--text-light)] leading-relaxed">
                  MindBodyRitual is a wellness app, not a medical service. Our content is for general
                  wellness purposes only and does not constitute medical advice. Consult a healthcare
                  professional before beginning any new physical activity programme, particularly if you or
                  your child have existing health conditions.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-heading-md text-[var(--text)] mb-3">7. Limitation of Liability</h2>
                <p className="text-[var(--text-light)] leading-relaxed">
                  To the maximum extent permitted by law, Panbuddha Inc. shall not be liable for any
                  indirect, incidental, or consequential damages arising from your use of MindBodyRitual.
                  Our total liability to you shall not exceed the amount you paid us in the 12 months
                  preceding the claim.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-heading-md text-[var(--text)] mb-3">8. Changes to Terms</h2>
                <p className="text-[var(--text-light)] leading-relaxed">
                  We may update these terms from time to time. We will notify you of material changes by
                  email or in-app notification at least 14 days before they take effect. Continued use of
                  MindBodyRitual after changes take effect constitutes acceptance of the updated terms.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-heading-md text-[var(--text)] mb-3">9. Contact</h2>
                <p className="text-[var(--text-light)] leading-relaxed">
                  Questions about these terms? Email{' '}
                  <a href="mailto:legal@mindbodyritual.ca" className="text-forest underline">
                    legal@mindbodyritual.ca
                  </a>
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
