'use client'

import HeroSection from '@/components/template/HeroSection'
import FeaturesSection from '@/components/template/FeaturesSection'
import PricingCards from '@/components/template/PricingCards'
import Testimonials from '@/components/template/Testimonials'
import NewsletterForm from '@/components/template/NewsletterForm'
import CallToAction from '@/components/template/CallToAction'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <PricingCards />
      <Testimonials />
      <NewsletterForm />
      <CallToAction />
    </>
  )
}
