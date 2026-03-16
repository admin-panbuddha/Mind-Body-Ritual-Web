import { fetchOneEntry } from '@builder.io/sdk-react'
import { BUILDER_API_KEY, BUILDER_MODELS } from '@/lib/builder'

import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { SocialProof } from '@/components/sections/SocialProof'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { RitualCards } from '@/components/sections/RitualCards'
import { Stats } from '@/components/sections/Stats'
import { Testimonials } from '@/components/sections/Testimonials'
import { PricingSection } from '@/components/sections/PricingSection'
import { Download } from '@/components/sections/Download'
import { FAQSection } from '@/components/sections/FAQSection'
import { Footer } from '@/components/sections/Footer'
import { BuilderContent } from '@/components/builder/BuilderContent'

export default async function HomePage() {
  // Check if a page has been created in Builder.io for "/"
  // Returns null if no Builder.io page exists yet → falls back to coded sections
  const builderContent = await fetchOneEntry({
    model: BUILDER_MODELS.page,
    apiKey: BUILDER_API_KEY,
    userAttributes: { urlPath: '/' },
  }).catch(() => null) // safe fallback if API key not configured

  return (
    <>
      <Navbar />
      <main>
        {builderContent ? (
          // ── Builder.io page exists → render the visual editor version ──
          <BuilderContent
            content={builderContent}
            model={BUILDER_MODELS.page}
          />
        ) : (
          // ── No Builder.io page yet → show coded sections ──────────────
          // To take over this page visually: go to builder.io/content,
          // create a new Page, set the URL to "/", add your sections.
          <>
            <Hero />
            <SocialProof />
            <HowItWorks />
            <RitualCards />
            <Stats />
            <Testimonials />
            <PricingSection />
            <Download />
            <FAQSection />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
