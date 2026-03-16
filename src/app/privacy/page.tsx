import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — MindBodyRitual',
  description: 'MindBodyRitual Privacy Policy. Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="bg-gradient-to-b from-[#edf2ec] to-white py-16 text-center">
          <div className="container-wide">
            <h1 className="font-heading text-display-lg text-[var(--text)] mb-2">Privacy Policy</h1>
            <p className="font-body text-sm text-[var(--text-muted)]">Last updated: January 2025</p>
          </div>
        </div>

        <section className="section-py bg-white">
          <div className="container-wide max-w-3xl mx-auto">
            <div className="prose-policy space-y-8 font-body text-[var(--text)]">

              <div>
                <h2 className="font-heading text-heading-md text-[var(--text)] mb-3">1. Introduction</h2>
                <p className="text-[var(--text-light)] leading-relaxed">
                  Panbuddha Inc. ("we", "our", "us") operates the MindBodyRitual app and website
                  (mindbodyritual.ca). This Privacy Policy explains what personal information we collect,
                  how we use it, and your rights. By using MindBodyRitual, you agree to this policy.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-heading-md text-[var(--text)] mb-3">2. Information We Collect</h2>
                <p className="text-[var(--text-light)] leading-relaxed mb-3">
                  We collect the following categories of information:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-[var(--text-light)]">
                  <li><strong>Account information</strong>: email address, display name, password (hashed)</li>
                  <li><strong>Usage data</strong>: rituals completed, streak counts, session duration</li>
                  <li><strong>Payment information</strong>: processed securely via Stripe — we do not store card numbers</li>
                  <li><strong>Device information</strong>: device type, operating system, app version</li>
                  <li><strong>Communications</strong>: emails you send to our support team</li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-heading-md text-[var(--text)] mb-3">3. How We Use Your Information</h2>
                <ul className="list-disc list-inside space-y-1.5 text-[var(--text-light)]">
                  <li>To provide and improve the MindBodyRitual service</li>
                  <li>To process payments and manage your subscription</li>
                  <li>To send transactional emails (receipts, password resets)</li>
                  <li>To send product updates if you opt in</li>
                  <li>To analyse app performance and fix bugs</li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-heading-md text-[var(--text)] mb-3">4. Data Storage and Security</h2>
                <p className="text-[var(--text-light)] leading-relaxed">
                  Your data is stored on Supabase (hosted on AWS in Canada/US) with industry-standard
                  encryption at rest and in transit. We use Row Level Security (RLS) so users can only
                  access their own data. Payment data is handled entirely by Stripe and never stored on
                  our servers.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-heading-md text-[var(--text)] mb-3">5. Data Sharing</h2>
                <p className="text-[var(--text-light)] leading-relaxed">
                  We do not sell your personal data. We share information only with:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-[var(--text-light)] mt-2">
                  <li><strong>Supabase</strong> — database and authentication infrastructure</li>
                  <li><strong>Stripe</strong> — payment processing</li>
                  <li><strong>Law enforcement</strong> — only if required by applicable law</li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-heading-md text-[var(--text)] mb-3">6. Your Rights (PIPEDA)</h2>
                <p className="text-[var(--text-light)] leading-relaxed mb-3">
                  Under Canada's Personal Information Protection and Electronic Documents Act (PIPEDA),
                  you have the right to:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-[var(--text-light)]">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your account and associated data</li>
                  <li>Withdraw consent for optional communications</li>
                </ul>
                <p className="text-[var(--text-light)] leading-relaxed mt-3">
                  To exercise these rights, email us at{' '}
                  <a href="mailto:privacy@mindbodyritual.ca" className="text-forest underline">
                    privacy@mindbodyritual.ca
                  </a>
                </p>
              </div>

              <div>
                <h2 className="font-heading text-heading-md text-[var(--text)] mb-3">7. Children's Privacy</h2>
                <p className="text-[var(--text-light)] leading-relaxed">
                  MindBodyRitual accounts are created by adults (caregivers). We do not knowingly collect
                  personal information directly from children under 13. Children's wellness data (ritual
                  progress) is stored under the caregiver's account and subject to parental consent.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-heading-md text-[var(--text)] mb-3">8. Contact</h2>
                <p className="text-[var(--text-light)] leading-relaxed">
                  Questions about this policy? Contact our Privacy Officer at{' '}
                  <a href="mailto:privacy@mindbodyritual.ca" className="text-forest underline">
                    privacy@mindbodyritual.ca
                  </a>
                  {' '}or by mail: Panbuddha Inc., Canada.
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
