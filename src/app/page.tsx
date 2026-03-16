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

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <HowItWorks />
        <RitualCards />
        <Stats />
        <Testimonials />
        <PricingSection />
        <Download />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}
