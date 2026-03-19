/**
 * Email Marketing — Factory + public API
 * ────────────────────────────────────────
 * This is the ONLY file the rest of the app should import from.
 *
 *   import { getEmailProvider } from '@/lib/email-marketing'
 *
 * The active provider is selected by the EMAIL_PROVIDER env var:
 *
 *   EMAIL_PROVIDER=brevo       → BrevoProvider    (current default)
 *   EMAIL_PROVIDER=mailchimp   → MailchimpProvider (add mailchimp.ts when needed)
 *
 * If EMAIL_PROVIDER is not set, Brevo is used as the default.
 *
 * ── Adding Mailchimp later ──────────────────────────────────────
 *   1. Create src/lib/email-marketing/mailchimp.ts
 *   2. Implement EmailMarketingProvider
 *   3. Add case 'mailchimp' below
 *   4. Set EMAIL_PROVIDER=mailchimp + MAILCHIMP_API_KEY + MAILCHIMP_LIST_ID
 *   Done — zero other files need to change.
 * ───────────────────────────────────────────────────────────────
 */

import type { EmailMarketingProvider } from './types'
export type { EmailMarketingProvider, AddContactOptions } from './types'
export { EmailProviderConfigError } from './types'

type SupportedProvider = 'brevo' | 'mailchimp'

/**
 * Returns the configured email marketing provider.
 * Throws EmailProviderConfigError if the provider is misconfigured.
 * Returns null if no provider is configured (graceful no-op in calling code).
 */
export function getEmailProvider(): EmailMarketingProvider | null {
  const providerName = (
    process.env.EMAIL_PROVIDER ?? 'brevo'
  ).toLowerCase() as SupportedProvider

  switch (providerName) {
    case 'brevo': {
      // Only import if key is present — avoids throwing during build
      if (!process.env.BREVO_API_KEY) return null
      const { BrevoProvider } = require('./brevo') as typeof import('./brevo')
      return new BrevoProvider()
    }

    case 'mailchimp': {
      // Placeholder — implement src/lib/email-marketing/mailchimp.ts
      // and uncomment when ready to switch.
      //
      // if (!process.env.MAILCHIMP_API_KEY) return null
      // const { MailchimpProvider } = require('./mailchimp')
      // return new MailchimpProvider()
      console.warn('[email-marketing] Mailchimp provider is not yet implemented')
      return null
    }

    default: {
      console.warn(`[email-marketing] Unknown EMAIL_PROVIDER: "${providerName}" — skipping sync`)
      return null
    }
  }
}
