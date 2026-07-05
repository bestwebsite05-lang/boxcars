import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Shield, Clock, Wrench, ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-white/90">
                Trusted by 50,000+ customers
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Get A Fair Price For Your Car
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Sell To Us Today
              </span>
            </h2>

            <p className="text-lg text-white/70 mb-8 max-w-lg">
              We are committed to providing our customers with exceptional service, 
              competitive pricing, and a wide range of benefits.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                  <Shield className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    We are the UK's largest provider
                  </p>
                  <p className="text-white/60 text-sm">
                    With more patrols in more places than anyone else
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                  <Clock className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    You get 24/7 roadside assistance
                  </p>
                  <p className="text-white/60 text-sm">
                    Always available when you need us most
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                  <Wrench className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    We fix 4 out of 5 cars at the roadside
                  </p>
                  <p className="text-white/60 text-sm">
                    Quick and efficient service you can rely on
                  </p>
                </div>
              </div>
            </div>

            <Link href="/submit-listing">
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-2xl shadow-blue-500/25 text-white font-semibold px-8 py-6 text-base transition-all duration-300 hover:scale-[1.02]"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Right Content - Stats/Visual */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-4xl font-extrabold text-white mb-1">50K+</div>
              <p className="text-white/60 text-sm">Happy Customers</p>
              <div className="mt-4 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-4xl font-extrabold text-white mb-1">98%</div>
              <p className="text-white/60 text-sm">Satisfaction Rate</p>
              <div className="mt-4 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[98%] bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 col-span-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Cars Sold This Month</span>
                <span className="text-2xl font-bold text-white">1,284</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full" />
              </div>
              <p className="text-white/60 text-xs mt-2">↑ 12.5% from last month</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}