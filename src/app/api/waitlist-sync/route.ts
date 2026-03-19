/**
 * POST /api/waitlist-sync
 *
 * Receives an email address and syncs it to the configured email
 * marketing provider (currently Brevo, switchable via EMAIL_PROVIDER env var).
 *
 * Called fire-and-forget by Download.tsx after a successful Supabase insert.
 *
 * Design decisions:
 * - Always returns HTTP 200 — a provider failure never surfaces as a UI error.
 *   The email is already safely in Supabase; this is a secondary sync.
 * - If no provider is configured, logs and returns OK (graceful no-op).
 * - Provider selection and all provider-specific logic live in
 *   src/lib/email-marketing/ — this route stays provider-agnostic.
 *
 * ── Switching providers ─────────────────────────────────────────
 * Change EMAIL_PROVIDER in your env vars. No changes needed here.
 * ───────────────────────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from 'next/server'
import { getEmailProvider, EmailProviderConfigError } from '@/lib/email-marketing'

export async function POST(req: NextRequest) {
  // Parse and validate request body
  let email: string
  try {
    const body = await req.json() as { email?: unknown }
    if (!body.email || typeof body.email !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid email' }, { status: 400 })
    }
    email = body.email.trim().toLowerCase()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  // Get the active provider (returns null if not configured)
  const provider = getEmailProvider()

  if (!provider) {
    console.warn('[waitlist-sync] No email provider configured — skipping sync for', email)
    return NextResponse.json({ ok: true, synced: false, reason: 'not_configured' })
  }

  // Sync to provider
  try {
    await provider.addContact(email, { source: 'website' })
    console.info(`[waitlist-sync] Synced to ${provider.name}:`, email)
    return NextResponse.json({ ok: true, synced: true, provider: provider.name })

  } catch (err) {
    if (err instanceof EmailProviderConfigError) {
      // Config issue — log clearly
      console.error('[waitlist-sync]', err.message)
    } else {
      // API / network error
      console.error(`[waitlist-sync] ${provider.name} error:`, err)
    }
    // Always return 200 — Supabase captured the email, don't break UX
    return NextResponse.json({ ok: true, synced: false, reason: 'provider_error' })
  }
}
