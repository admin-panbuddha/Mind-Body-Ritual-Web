'use client'

import { useState } from 'react'
import { Reveal, RevealStagger } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { download } from '@/content'
import { createClient } from '@/lib/supabase/client'

// ── Brevo sync (fire-and-forget) ─────────────────────────────────
// Called after a successful Supabase insert. Runs in the background —
// the result is intentionally ignored so Brevo issues never affect the UI.
async function syncToBrevo(email: string): Promise<void> {
  try {
    await fetch('/api/waitlist-sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
  } catch {
    // Network error — safe to ignore, email is already in Supabase
  }
}

// Detect at build time whether Supabase is configured.
// If env vars are absent the form degrades gracefully instead of silently
// pretending to submit.
const supabaseConfigured = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// ── Store button ──────────────────────────────────────────────────────
// Renders a real link when a store URL is provided, or a non-navigating
// button that scrolls to the waitlist form when the app isn't live yet.
function StoreButton({
  href,
  ariaLabel,
  icon,
  topLine,
  bottomLine,
}: {
  href: string
  ariaLabel: string
  icon: React.ReactNode
  topLine: string
  bottomLine: string
}) {
  const className =
    'flex items-center gap-3 bg-[var(--text)] text-white ' +
    'rounded-2xl px-5 py-3.5 min-w-[180px] ' +
    'hover:bg-forest transition-colors duration-200 ' +
    'border border-transparent hover:border-forest/30'

  const inner = (
    <>
      {icon}
      <div className="text-left">
        <div className="font-body text-[10px] text-white/70 leading-tight">{topLine}</div>
        <div className="font-body font-semibold text-sm leading-tight">{bottomLine}</div>
      </div>
    </>
  )

  if (href) {
    return (
      <a href={href} className={className} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    )
  }

  // App not yet in store — scroll to waitlist form
  return (
    <a
      href="#waitlist-form"
      className={className}
      aria-label={`${ariaLabel} — join the waitlist`}
      title="Not yet available — join the waitlist to be notified"
    >
      {inner}
    </a>
  )
}

export function Download() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError(null)

    if (!supabaseConfigured) {
      setError(download.waitlistConfigError)
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { error: sbError } = await supabase
        .from('waitlist')
        .insert({ email, source: 'website' })

      if (sbError) {
        // 23505 = unique_violation — email already on the list, treat as success
        if (sbError.code === '23505') {
          setSubmitted(true)
          // Still sync to Brevo — they may not be in the list yet
          void syncToBrevo(email)
        } else {
          setError(download.waitlistError)
        }
      } else {
        setSubmitted(true)
        // Fire-and-forget: sync to Brevo in background.
        // UI does NOT wait for this — a Brevo failure won't affect the user.
        void syncToBrevo(email)
      }
    } catch {
      setError(download.waitlistError)
    } finally {
      setLoading(false)
    }
  }

  const appleIcon = (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 flex-shrink-0">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.19 1.28-2.17 3.83.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.75zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )

  const androidIcon = (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 flex-shrink-0">
      <path d="M3.18 23.76c.35.2.74.24 1.12.14L15.77 12 12 8.23 3.18 23.76zM20.5 10.61l-2.83-1.64-4.13 3.57 4.13 3.57 2.86-1.65c.82-.47.82-1.38-.03-1.85zM2.13 1.28C2.05 1.5 2 1.75 2 2.03v19.94c0 .28.05.53.14.75L13.65 12 2.13 1.28zM15.77 12L4.3.24C3.91.12 3.5.16 3.18.38L15.77 12z" />
    </svg>
  )

  return (
    <section id="download" className="section-py relative overflow-hidden bg-cream">

      {/* Background blob */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px]
                        rounded-full bg-gradient-to-b from-[#e8f0e9]/80 to-transparent blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        <div className="max-w-2xl mx-auto text-center">

          <Reveal className="mb-6">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-forest
                            flex items-center justify-center text-4xl
                            shadow-soft mb-6">
              🐼
            </div>
            <span className="inline-block font-body text-xs font-semibold tracking-widest
                             uppercase text-forest mb-4">
              {download.sectionLabel}
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-heading text-heading-xl md:text-display-lg
                           text-[var(--text)] mb-4">
              {download.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="font-body text-body-lg text-[var(--text-light)] mb-10">
              {download.subheadline}
            </p>
          </Reveal>

          {/* App store buttons */}
          <RevealStagger
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
            stagger={0.12}
            delay={0.2}
          >
            <StoreButton
              href={download.appStoreUrl}
              ariaLabel="Download on the App Store"
              icon={appleIcon}
              topLine="Download on the"
              bottomLine="App Store"
            />
            <StoreButton
              href={download.googlePlayUrl}
              ariaLabel="Get it on Google Play"
              icon={androidIcon}
              topLine="Get it on"
              bottomLine="Google Play"
            />
          </RevealStagger>

          {/* Email waitlist */}
          <Reveal delay={0.3} className="max-w-md mx-auto">
            <p className="font-body text-sm text-[var(--text-light)] mb-4">
              {download.waitlistText}
            </p>

            {submitted ? (
              <div className="flex items-center justify-center gap-2 py-4 text-forest font-body font-semibold">
                <Icon name="ui_Icon_leaf" size={24} className="inline-block" />
                {download.waitlistSuccess}
              </div>
            ) : (
              <>
                <form id="waitlist-form" onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    id="waitlist-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={download.emailPlaceholder}
                    required
                    className="flex-1 px-4 py-3 rounded-xl border border-[var(--border)]
                               bg-white font-body text-sm text-[var(--text)]
                               placeholder:text-[var(--text-muted)]
                               focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest
                               transition-all"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={loading}
                    className="sm:flex-shrink-0"
                  >
                    {loading ? download.waitlistLoading : download.waitlistButton}
                  </Button>
                </form>

                {/* CASL consent line */}
                <p className="mt-2 font-body text-[11px] text-[var(--text-muted)] text-center leading-relaxed">
                  {download.waitlistConsent}
                </p>
              </>
            )}

            {/* Error state */}
            {error && !submitted && (
              <p className="mt-3 font-body text-xs text-red-600 text-center">
                {error}
              </p>
            )}
          </Reveal>

        </div>
      </div>
    </section>
  )
}
