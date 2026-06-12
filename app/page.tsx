import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import HeroSection from '@/components/home/hero-section'
import TrustStatsSection from '@/components/home/trust-stats-section'
import HowItWorks from '@/components/home/how-it-works'
import GuidanceSection from '@/components/home/guidance-section'
import AccommodationTypes from '@/components/home/accommodation-types'
import DestinationsSection from '@/components/home/destinations-section'
import TrustSection from '@/components/home/trust-section'
import MovingAbroadPreview from '@/components/home/moving-abroad-preview'
import CtaSection from '@/components/home/cta-section'

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <TrustStatsSection />
        <HowItWorks />
        <GuidanceSection />
        <AccommodationTypes />
        <DestinationsSection />
        <TrustSection />
        <MovingAbroadPreview />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
