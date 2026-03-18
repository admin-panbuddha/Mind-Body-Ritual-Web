import { Navbar }        from '@/components/sections/Navbar'
import { Hero }          from '@/components/sections/Hero'
import { SocialProof }   from '@/components/sections/SocialProof'
import { HowItWorks }    from '@/components/sections/HowItWorks'
import { RitualCards }   from '@/components/sections/RitualCards'
import { Resources }     from '@/components/sections/Resources'
import { VideoSection }  from '@/components/sections/VideoSection'
import { Stats }         from '@/components/sections/Stats'
import { Testimonials }  from '@/components/sections/Testimonials'
import { MusicSection }  from '@/components/sections/MusicSection'
import { VideoLibrary }  from '@/components/sections/VideoLibrary'
import { PricingSection} from '@/components/sections/PricingSection'
import { Download }      from '@/components/sections/Download'
import { FAQSection }    from '@/components/sections/FAQSection'
import { Footer }        from '@/components/sections/Footer'
import { SideNav }       from '@/components/ui/SideNav'

export default function HomePage() {
  return (
    <>
      <Navbar />
      {/* Sticky left scroll index — desktop only, hidden on mobile */}
      <SideNav />
      <main>
        <Hero />
        <SocialProof />
        <HowItWorks />
        <RitualCards />
        {/* ── Wellness Resources ────────────────────────────── */}
        <Resources />
        {/* ─────────────────────────────────────────────────── */}
        <VideoSection />
        <Stats />
        <Testimonials />
        {/* ── Media Library ─────────────────────────────────── */}
        <MusicSection />
        <VideoLibrary />
        {/* ─────────────────────────────────────────────────── */}
        <PricingSection />
        <Download />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}
