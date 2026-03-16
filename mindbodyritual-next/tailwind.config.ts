import type { Config } from 'tailwindcss'

// ui-ux-pro-max: App Store Style Landing + Organic Biophilic
// Design system: Lora (headings) + Raleway (body), wellness palette
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── Brand colours (ui-ux-pro-max + MindBodyRitual tokens) ──
      colors: {
        cream:    '#FAF9F2',
        forest:   '#3D6B4F',
        'forest-deep': '#2C4A37',
        sage:     '#8BA888',
        'sage-light': '#e2ede0',
        amber:    '#E5B177',
        olive:    '#55583D',
        gold:     '#C9A96E',
        'gold-light': '#f2e8d0',
        // ui-ux-pro-max wellness palette
        lavender: '#8B5CF6',
        'lavender-light': '#C4B5FD',
        'wellness-green': '#10B981',
        'wellness-bg':    '#FAF5FF',
      },
      // ── Typography ──────────────────────────────────────────────
      fontFamily: {
        heading: ['Lora', 'Georgia', 'serif'],
        body:    ['Raleway', 'Inter', 'sans-serif'],
        // Keep legacy fonts for backward compat
        crimson: ['Crimson Pro', 'Georgia', 'serif'],
        inter:   ['Inter', 'sans-serif'],
      },
      // ── Spacing scale ────────────────────────────────────────────
      spacing: {
        '18':  '4.5rem',
        '22':  '5.5rem',
        '26':  '6.5rem',
        '30':  '7.5rem',
        '34':  '8.5rem',
        '120': '30rem',
        '140': '35rem',
        '160': '40rem',
      },
      // ── Border radius ────────────────────────────────────────────
      borderRadius: {
        '2xl':  '1rem',
        '3xl':  '1.5rem',
        '4xl':  '2rem',
      },
      // ── Box shadows ──────────────────────────────────────────────
      boxShadow: {
        'soft-sm': '0 2px 8px rgba(0,0,0,.05)',
        'soft-md': '0 8px 24px rgba(0,0,0,.09)',
        'soft-lg': '0 16px 48px rgba(0,0,0,.13)',
        'soft-xl': '0 24px 64px rgba(0,0,0,.18)',
        'glow-amber': '0 0 32px rgba(229,177,119,.25)',
        'glow-forest': '0 0 32px rgba(61,107,79,.2)',
      },
      // ── Animation ────────────────────────────────────────────────
      transitionTimingFunction: {
        'ease-wellness': 'cubic-bezier(.25,.46,.45,.94)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
      },
      // ── Typography scale (ui-ux-pro-max: 32px+ headings) ────────
      fontSize: {
        'display-xl': ['4.5rem',  { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1',  letterSpacing: '-0.025em' }],
        'display-md': ['3rem',    { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.2',  letterSpacing: '-0.015em' }],
        'heading-lg': ['1.875rem',{ lineHeight: '1.3' }],
        'heading-md': ['1.5rem',  { lineHeight: '1.35' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.4' }],
      },
      // ── Max width ────────────────────────────────────────────────
      maxWidth: {
        'container': '1200px',
        'prose-wide': '72ch',
      },
    },
  },
  plugins: [],
}

export default config
