/**
 * Email Marketing — Provider-agnostic interface
 * ──────────────────────────────────────────────
 * All email marketing providers (Brevo, Mailchimp, Resend, etc.) must
 * implement this interface. The rest of the app only imports from
 * src/lib/email-marketing/index.ts — never from a provider file directly.
 *
 * To add a new provider:
 *   1. Create src/lib/email-marketing/[provider].ts
 *   2. Implement the EmailMarketingProvider interface
 *   3. Add a case to the factory in index.ts
 *   4. Set EMAIL_PROVIDER=[provider] in your env vars
 *
 * That's it — no other files need to change.
 */

export interface AddContactOptions {
  /** Source tag — helps segment where signups came from (e.g. "website", "blog") */
  source?: string
  /** Provider-specific list/audience ID to add the contact to */
  listId?: string | number
}

export interface EmailMarketingProvider {
  /**
   * Add or update a contact in the provider's list.
   * Should be idempotent — calling with an existing email must not throw.
   */
  addContact(email: string, options?: AddContactOptions): Promise<void>

  /** Human-readable name of this provider — used in logs */
  readonly name: string
}

/** Thrown when a provider is misconfigured (missing API key etc.) */
export class EmailProviderConfigError extends Error {
  constructor(provider: string, detail: string) {
    super(`[email-marketing] ${provider} configuration error: ${detail}`)
    this.name = 'EmailProviderConfigError'
  }
}
