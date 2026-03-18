'use client'

import { useState } from 'react'
import { Reveal, RevealStagger, RevealItem } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { download } from '@/content'

export function Download() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    // Supabase will be wired up here when configured
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    setLoading(false)
  }

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
            {/* App Store */}
            <a
              href="#"
              className="flex items-center gap-3 bg-[var(--text)] text-white
                         rounded-2xl px-5 py-3.5 min-w-[180px]
                         hover:bg-forest transition-colors duration-200
                         border border-transparent hover:border-forest/30"
              aria-label="Download on the App Store"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 flex-shrink-0">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.19 1.28-2.17 3.83.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.75zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <div className="font-body text-[10px] text-white/70 leading-tight">Download on the</div>
                <div className="font-body font-semibold text-sm leading-tight">App Store</div>
              </div>
            </a>

            {/* Google Play */}
            <a
              href="#"
              className="flex items-center gap-3 bg-[var(--text)] text-white
                         rounded-2xl px-5 py-3.5 min-w-[180px]
                         hover:bg-forest transition-colors duration-200
                         border border-transparent hover:border-forest/30"
              aria-label="Get it on Google Play"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 flex-shrink-0">
                <path d="M3.18 23.76c.35.2.74.24 1.12.14L15.77 12 12 8.23 3.18 23.76zM20.5 10.61l-2.83-1.64-4.13 3.57 4.13 3.57 2.86-1.65c.82-.47.82-1.38-.03-1.85zM2.13 1.28C2.05 1.5 2 1.75 2 2.03v19.94c0 .28.05.53.14.75L13.65 12 2.13 1.28zM15.77 12L4.3.24C3.91.12 3.5.16 3.18.38L15.77 12z" />
              </svg>
              <div className="text-left">
                <div className="font-body text-[10px] text-white/70 leading-tight">Get it on</div>
                <div className="font-body font-semibold text-sm leading-tight">Google Play</div>
              </div>
            </a>
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
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
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
            )}
          </Reveal>

        </div>
      </div>
    </section>
  )
}
