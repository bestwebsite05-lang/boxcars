import { Hero } from '@/components/hero/Hero'
import { FeaturedModels } from '@/components/featured/FeaturedModels'
import { VehicleGrid } from '@/components/vehicles/VehicleGrid'
import { BrandStrip } from '@/components/brands/BrandStrip'
import { CTA } from '@/components/cta/CTA'
import { Footer } from '@/components/footer/Footer'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export default function Home() {
  return (
    <>
      <Hero />
      <AnimatedSection direction="up">
      <FeaturedModels />
      </AnimatedSection>


      <AnimatedSection direction='up' delay={200}>
      <VehicleGrid />
      </AnimatedSection>

      <AnimatedSection direction='left' delay={100}>
      <BrandStrip/>
      </AnimatedSection>

      <AnimatedSection direction='up' delay={300}>
        <CTA/>
      </AnimatedSection>
      <Footer/>
      

    </>
  )
}