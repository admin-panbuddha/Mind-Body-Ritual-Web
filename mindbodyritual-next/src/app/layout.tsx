import type { Metadata, Viewport } from 'next'
import './globals.css'

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
    <html lang="en">
      <body className="bg-cream text-[var(--text)] antialiased">
        {children}
      </body>
    </html>
  )
}
