import { Cta } from '@/components/landing/Cta'
import { Features } from '@/components/landing/Features'
import { Footer } from '@/components/landing/Footer'
import { Hero } from '@/components/landing/Hero'
import { SocialProof } from '@/components/landing/SocialProof'

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Features />
      <Cta />
      <Footer />
    </>
  )
}
