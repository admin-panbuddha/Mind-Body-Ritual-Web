'use client'

import { Content, useIsPreviewing } from '@builder.io/sdk-react'
import { BUILDER_API_KEY } from '@/lib/builder'

// Actual component imports for the palette
import { Hero } from '@/components/sections/Hero'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { RitualCards } from '@/components/sections/RitualCards'
import { Stats } from '@/components/sections/Stats'
import { Testimonials } from '@/components/sections/Testimonials'
import { PricingSection } from '@/components/sections/PricingSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { Download } from '@/components/sections/Download'

// Register real components — Builder.io renders these when you drag
// them onto a page in the visual editor
const customComponents = [
  { name: 'Hero',           component: Hero,           noWrap: true },
  { name: 'HowItWorks',     component: HowItWorks,     noWrap: true },
  { name: 'RitualCards',    component: RitualCards,    noWrap: true },
  { name: 'Stats',          component: Stats,          noWrap: true },
  { name: 'Testimonials',   component: Testimonials,   noWrap: true },
  { name: 'PricingSection', component: PricingSection, noWrap: true },
  { name: 'FAQSection',     component: FAQSection,     noWrap: true },
  { name: 'Download',       component: Download,       noWrap: true },
]

interface BuilderContentProps {
  // The content object returned from fetchOneEntry — null if no page
  // has been created in Builder.io for this URL yet
  content: object | null
  model: string
}

export function BuilderContent({ content, model }: BuilderContentProps) {
  // useIsPreviewing = true when you're inside the Builder.io visual editor
  // This allows you to see a live preview even before publishing
  const isPreviewing = useIsPreviewing()

  if (!content && !isPreviewing) return null

  return (
    <Content
      model={model}
      content={content}
      apiKey={BUILDER_API_KEY}
      customComponents={customComponents}
    />
  )
}
