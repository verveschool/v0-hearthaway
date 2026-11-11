import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import HeroSection from '@/components/home/hero-section'
import TotalHomeDiscovery from '@/components/home/total-home-discovery'
import AccommodationPartnersSection from '@/components/home/accommodation-partners-section'
import TrustStatsSection from '@/components/home/trust-stats-section'
import HowItWorks from '@/components/home/how-it-works'
import CtaSection from '@/components/home/cta-section'
import { HomeMotion } from '@/components/home/home-motion'

export default function HomePage() {
  return (
    <>
      <Navigation />

      <main>
        <HomeMotion />
        <HeroSection />
        <TrustStatsSection />
        <TotalHomeDiscovery />
        <AccommodationPartnersSection />
        <HowItWorks />
        <CtaSection />
      </main>

      <Footer />
    </>
  )
}
