import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import HeroSection from '@/components/home/hero-section'
import HowItWorks from '@/components/home/how-it-works'
import DestinationsSection from '@/components/home/destinations-section'
import TrustSection from '@/components/home/trust-section'
import AccommodationTypes from '@/components/home/accommodation-types'
import MovingAbroadPreview from '@/components/home/moving-abroad-preview'
import CtaSection from '@/components/home/cta-section'

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <HowItWorks />
        <DestinationsSection />
        <TrustSection />
        <AccommodationTypes />
        <MovingAbroadPreview />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
