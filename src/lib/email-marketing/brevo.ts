/**
 * Brevo (formerly Sendinblue) — EmailMarketingProvider implementation
 * ────────────────────────────────────────────────────────────────────
 * Required env vars:
 *   BREVO_API_KEY   — from Brevo dashboard → Settings → API Keys
 *   BREVO_LIST_ID   — (optional) numeric list ID from Brevo → Contacts → Lists
 *
 * Switching away from Brevo later?
 *   Create a new provider file (e.g. mailchimp.ts), implement the same
 *   EmailMarketingProvider interface, and update EMAIL_PROVIDER in your env.
 *   This file stays untouched.
 */

import type { EmailMarketingProvider, AddContactOptions } from './types'
import { EmailProviderConfigError } from './types'

const BREVO_API_URL = 'https://api.brevo.com/v3/contacts'

export class BrevoProvider implements EmailMarketingProvider {
  readonly name = 'Brevo'

  private readonly apiKey: string
  private readonly defaultListId: number | undefined

  constructor() {
    const key = process.env.BREVO_API_KEY
    if (!key) {
      throw new EmailProviderConfigError('Brevo', 'BREVO_API_KEY is not set')
    }
    this.apiKey = key

    const rawListId = process.env.BREVO_LIST_ID
    this.defaultListId = rawListId ? parseInt(rawListId, 10) : undefined
  }

  async addContact(email: string, options?: AddContactOptions): Promise<void> {
    // Resolve list ID: prefer per-call override, fall back to env default
    const rawListId = options?.listId ?? this.defaultListId
    const listId = typeof rawListId === 'string'
      ? parseInt(rawListId, 10)
      : rawListId

    const payload: Record<string, unknown> = {
      email,
      // updateEnabled: true means re-submitting an existing email is a no-op
      // rather than an error — keeps the integration idempotent
      updateEnabled: true,
    }

    if (listId && !isNaN(listId)) {
      payload.listIds = [listId]
    }

    // Optional: tag the contact with a source attribute for segmentation
    if (options?.source) {
      payload.attributes = { SOURCE: options.source }
    }

    const res = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'api-key': this.apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Brevo API error ${res.status}: ${body}`)
    }
  }
}
