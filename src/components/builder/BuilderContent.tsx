'use client'

import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react'
import { BUILDER_API_KEY } from '@/lib/builder'

// Initialise the builder client
builder.init(BUILDER_API_KEY)

// ── Register your custom components so they appear in Builder.io's ──
// visual editor palette. Drag them onto any page from the sidebar.
import { Hero } from '@/components/sections/Hero'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { RitualCards } from '@/components/sections/RitualCards'
import { Stats } from '@/components/sections/Stats'
import { Testimonials } from '@/components/sections/Testimonials'
import { PricingSection } from '@/components/sections/PricingSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { Download } from '@/components/sections/Download'

import { Builder } from '@builder.io/react'

Builder.registerComponent(Hero,           { name: 'Hero' })
Builder.registerComponent(HowItWorks,     { name: 'HowItWorks' })
Builder.registerComponent(RitualCards,    { name: 'RitualCards' })
Builder.registerComponent(Stats,          { name: 'Stats' })
Builder.registerComponent(Testimonials,   { name: 'Testimonials' })
Builder.registerComponent(PricingSection, { name: 'PricingSection' })
Builder.registerComponent(FAQSection,     { name: 'FAQSection' })
Builder.registerComponent(Download,       { name: 'Download' })

interface BuilderContentProps {
  content: object | null
  model: string
}

export function BuilderContent({ content, model }: BuilderContentProps) {
  const isPreviewing = useIsPreviewing()

  if (!content && !isPreviewing) return null

  return (
    <BuilderComponent
      model={model}
      content={content}
    />
  )
}
