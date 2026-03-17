import type { Metadata, Viewport } from 'next'
import { Lora, Raleway } from 'next/font/google'
import { PageTransition } from '@/components/ui/PageTransition'
import './globals.css'

// ── Fonts loaded via next/font (self-hosted, zero layout shift) ──
const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'MindBodyRitual — 25-Minute Family Wellness Ritual',
  description:
    'A 25-minute morning routine for caregivers and kids ages 3+. Five simple rituals that build focus, calm, and connection every day.',
  keywords: [
    'family wellness',
    'morning routine',
    'mindfulness for kids',
    'kids yoga',
    'family fitness',
    'daily ritual',
    'children meditation',
    'wellness app',
  ],
  authors: [{ name: 'Panbuddha' }],
  creator: 'Panbuddha',
  metadataBase: new URL('https://mindbodyritual.ca'),
  openGraph: {
    title: 'MindBodyRitual — 25-Minute Family Wellness Ritual',
    description:
      'A 25-minute morning routine for caregivers and kids ages 3+. Five simple rituals that build focus, calm, and connection every day.',
    url: 'https://mindbodyritual.ca',
    siteName: 'MindBodyRitual',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindBodyRitual — 25-Minute Family Wellness Ritual',
    description:
      'A 25-minute morning routine for caregivers and kids ages 3+. Five simple rituals that build focus, calm, and connection every day.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3D6B4F',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${lora.variable} ${raleway.variable}`}>
      <body className="bg-cream text-[var(--text)] antialiased">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
