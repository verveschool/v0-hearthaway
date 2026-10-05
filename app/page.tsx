import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import HeroSection from '@/components/home/hero-section'
import AccommodationPartnersSection from '@/components/home/accommodation-partners-section'
import TrustStatsSection from '@/components/home/trust-stats-section'
import HowItWorks from '@/components/home/how-it-works'
import CtaSection from '@/components/home/cta-section'

export default function HomePage() {
  return (
    <>
      <Navigation />

      <main>
        <HeroSection />
        <AccommodationPartnersSection />
        <TrustStatsSection />
        <HowItWorks />
        <CtaSection />
      </main>

      <Footer />
    </>
  )
}
