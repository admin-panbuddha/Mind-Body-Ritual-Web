'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const links = [
  { label: 'The Ritual', href: '#rituals' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Experiment', href: '/experiment' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-350',
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-soft-sm border-b border-[var(--border-light)]'
          : 'bg-transparent'
      )}
    >
      <div className="container-wide">
        <nav className="flex items-center justify-between h-16 md:h-20" aria-label="Main navigation">
          {/* Brand */}
          <a href="/" className="font-heading font-semibold text-xl text-forest hover:opacity-80 transition-opacity">
            MindBodyRitual
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {links.map(l => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="px-4 py-2 rounded-xl font-body font-medium text-[var(--text-light)]
                             hover:text-forest hover:bg-[var(--sage-light)]
                             transition-all duration-200 text-sm"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button href="#download" size="sm" variant="primary">
              Get the App
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl text-[var(--text)] hover:bg-[var(--sage-light)] transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 bg-white border-b border-[var(--border-light)]',
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="container-wide py-4 flex flex-col gap-1">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 rounded-xl font-body font-medium text-[var(--text-light)]
                         hover:text-forest hover:bg-[var(--sage-light)] transition-all duration-200"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[var(--border-light)]">
            <Button href="#download" size="md" variant="primary" className="w-full justify-center">
              Get the App
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
