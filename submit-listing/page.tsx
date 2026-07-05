import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Footer } from '@/components/footer/Footer'

export default function SubmitListingPage() {
  return (
    <>
      <section className="relative pt-20 pb-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <AnimatedSection direction="up">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
                Submit Listing
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Coming Soon
                </span>
              </h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                List your car for sale - Coming soon!
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
      <Footer />
    </>
  )
}