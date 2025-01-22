import { Features } from '@/components/sections/features'
import { FAQ } from '@/components/sections/faq'
import { HowItWorks } from '@/components/sections/how-it-works'
import MainSection from '@/components/layout/main-section'
import FeaturePost from '@/components/sections/feature-post'

export default function Home() {
  return (
    <div className='w-full'>
      <MainSection />
      <FeaturePost />
      <Features />
      <HowItWorks />
      <FAQ />
    </div>
  )
}