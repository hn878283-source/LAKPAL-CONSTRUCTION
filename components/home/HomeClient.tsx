'use client'

import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import ProcessSection from '@/components/home/ProcessSection'
import StatsSection from '@/components/home/StatsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import CTASection from '@/components/home/CTASection'
import Footer from '@/components/shared/Footer'

export default function HomeClient() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <ProcessSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </>
  )
}
