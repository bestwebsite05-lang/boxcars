'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Truck, 
  MapPin, 
  Clock, 
  DollarSign, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Package,
  Calendar,
  Globe,
  ChevronDown,
  ChevronUp,
  X,
  AlertCircle,
  Phone,
  Mail,
  User,
  MessageSquare,
  Building
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Footer } from '@/components/footer/Footer'
import { cn } from '@/lib/utils'
import { 
  shippingZones, 
  shippingMethods, 
  usStates, 
  internationalCountries,
  calculateShippingCost,
  getZoneForLocation
} from '@/lib/data/shipping'
import { formatPrice } from '@/lib/utils'

// Shipping process steps
const shippingSteps = [
  {
    icon: Package,
    title: 'Package & Inspect',
    description: 'We thoroughly inspect and prepare your vehicle for shipping'
  },
  {
    icon: Truck,
    title: 'Load & Transport',
    description: 'Secure loading and professional transport to your location'
  },
  {
    icon: MapPin,
    title: 'Track Delivery',
    description: 'Real-time tracking with updates at every stage'
  },
  {
    icon: CheckCircle,
    title: 'Receive & Inspect',
    description: 'Final inspection and delivery to your doorstep'
  }
]

export default function ShippingPage() {
  const [pickupLocation, setPickupLocation] = useState('')
  const [deliveryLocation, setDeliveryLocation] = useState('')
  const [selectedMethod, setSelectedMethod] = useState('standard')
  const [vehicleWeight, setVehicleWeight] = useState('3500')
  const [showEstimate, setShowEstimate] = useState(false)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  // Calculate distance (simplified)
  const distance = useMemo(() => {
    if (pickupLocation && deliveryLocation) {
      // Simple distance approximation based on state
      const stateMap: Record<string, number> = {
        'NY': 0, 'NJ': 50, 'CT': 100, 'PA': 200, 'MA': 250,
        'CA': 3000, 'TX': 1800, 'FL': 1200, 'IL': 800,
        'WA': 2800, 'OR': 2700, 'NV': 2500, 'AZ': 2400,
        'CO': 1900, 'GA': 1000, 'NC': 700, 'VA': 500
      }
      
      const pickup = pickupLocation.split('-')[0]?.trim() || ''
      const delivery = deliveryLocation.split('-')[0]?.trim() || ''
      
      const pickupDist = stateMap[pickup] || 500
      const deliveryDist = stateMap[delivery] || 500
      
      return Math.abs(pickupDist - deliveryDist) + 100
    }
    return 500
  }, [pickupLocation, deliveryLocation])

  // Get zone based on delivery location
  const zone = useMemo(() => {
    if (deliveryLocation) {
      // Check if it's international
      const isInternational = internationalCountries.some(country => 
        deliveryLocation.toLowerCase().includes(country.toLowerCase())
      )
      if (isInternational) {
        return shippingZones.find(z => z.name === 'International')
      }
      
      // Check US zones
      const stateName = deliveryLocation.split('-')[1]?.trim() || ''
      const zones = shippingZones.filter(z => z.name !== 'International')
      for (const zone of zones) {
        if (zone.name === 'Local (NY, NJ, CT)' && ['NY', 'NJ', 'CT'].some(s => stateName.includes(s))) {
          return zone
        }
        if (zone.name === 'East Coast' && ['PA', 'MA', 'VA', 'NC', 'GA', 'FL'].some(s => stateName.includes(s))) {
          return zone
        }
        if (zone.name === 'Midwest' && ['IL', 'OH', 'MI', 'IN', 'WI'].some(s => stateName.includes(s))) {
          return zone
        }
        if (zone.name === 'West Coast' && ['CA', 'WA', 'OR', 'NV'].some(s => stateName.includes(s))) {
          return zone
        }
      }
    }
    return shippingZones[0] // Default
  }, [deliveryLocation])

  // Calculate estimate
  const estimate = useMemo(() => {
    if (pickupLocation && deliveryLocation && zone) {
      const method = shippingMethods.find(m => m.id === selectedMethod) || shippingMethods[0]
      const weight = parseInt(vehicleWeight) || 3500
      const weightMultiplier = 1 + (weight - 3500) / 10000 // Simple weight adjustment
      
      return calculateShippingCost(zone, method, distance * weightMultiplier)
    }
    return null
  }, [pickupLocation, deliveryLocation, selectedMethod, vehicleWeight, distance, zone])

  const faqs = [
    {
      question: 'How long does shipping usually take?',
      answer: 'Shipping time varies based on your location and chosen method. Local deliveries take 1-2 days, while international shipping can take 14-21 days. Express and Premium options are available for faster delivery.'
    },
    {
      question: 'Is my car insured during shipping?',
      answer: 'Yes! All vehicles are fully insured during transit. Our premium shipping option includes additional coverage for complete peace of mind.'
    },
    {
      question: 'What happens if my car gets damaged?',
      answer: 'We have a comprehensive damage protection policy. Any damage discovered during inspection will be documented and reported immediately. Our insurance covers all repair costs.'
    },
    {
      question: 'Can I track my shipment?',
      answer: 'Absolutely! All shipments include real-time tracking. You\'ll receive updates via email and SMS at every stage of the journey.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to over 50 countries worldwide. International shipping includes customs clearance and door-to-door delivery.'
    },
    {
      question: 'What documents do I need?',
      answer: 'You\'ll need the vehicle title, registration, and a valid ID. For international shipping, additional customs documentation is required.'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <AnimatedSection direction="up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4">
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Back to Home
                </Link>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
                  Vehicle Shipping
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">
                    Door-to-Door Delivery
                  </span>
                </h1>
                <p className="text-white/70 mt-2 max-w-xl">
                  Safe, reliable, and insured vehicle shipping across the US and internationally
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-extrabold text-blue-600">50+</div>
              <div className="text-sm text-gray-500">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-extrabold text-blue-600">99.5%</div>
              <div className="text-sm text-gray-500">Delivery Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-extrabold text-blue-600">24/7</div>
              <div className="text-sm text-gray-500">Real-Time Tracking</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-extrabold text-blue-600">100%</div>
              <div className="text-sm text-gray-500">Insurance Coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Calculator */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Shipping Calculator</h2>
              <p className="text-gray-500 mt-2">Get an instant estimate for your vehicle shipping</p>
            </div>
          </AnimatedSection>

          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pickup Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Pickup Location
                </label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                >
                  <option value="">Select pickup location</option>
                  {usStates.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Delivery Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Delivery Location
                </label>
                <select
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                >
                  <option value="">Select delivery location</option>
                  <optgroup label="United States">
                    {usStates.map((state) => (
                      <option key={state.value} value={`${state.value}-${state.label}`}>
                        {state.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="International">
                    {internationalCountries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Vehicle Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Package className="w-4 h-4 inline mr-1" />
                  Vehicle Weight (lbs)
                </label>
                <input
                  type="number"
                  value={vehicleWeight}
                  onChange={(e) => setVehicleWeight(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                  min="1000"
                  max="10000"
                  step="100"
                />
              </div>

              {/* Shipping Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Truck className="w-4 h-4 inline mr-1" />
                  Shipping Method
                </label>
                <select
                  value={selectedMethod}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                >
                  {shippingMethods.map((method) => (
                    <option key={method.id} value={method.id}>
                      {method.icon} {method.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="mt-6">
              <Button
                onClick={() => setShowEstimate(true)}
                disabled={!pickupLocation || !deliveryLocation}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-200 py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Truck className="w-5 h-5 mr-2" />
                Get Shipping Estimate
              </Button>
            </div>

            {/* Estimate Results */}
            {showEstimate && estimate && (
              <AnimatedSection direction="up" className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Total Cost</div>
                    <div className="text-3xl font-extrabold text-blue-600">
                      {formatPrice(estimate.totalCost)}
                    </div>
                    <div className="text-xs text-gray-500">{estimate.currency}</div>
                  </div>
                  <div className="text-center border-l-2 border-r-2 border-blue-200 hidden md:block" />
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Estimated Delivery</div>
                    <div className="text-2xl font-bold text-gray-900">{estimate.estimatedDays}</div>
                    <div className="text-xs text-gray-500">{estimate.zone.estimatedDays}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Shipping Zone</div>
                    <div className="text-lg font-semibold text-gray-900">{estimate.zone.name}</div>
                    <div className="text-xs text-gray-500">{estimate.method.name} Method</div>
                  </div>
                </div>

                {/* Method Features */}
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <div className="flex flex-wrap gap-2">
                    {estimate.method.features.map(( feature, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 text-xs bg-white/70 px-3 py-1 rounded-full text-gray-700">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <Link href="/contact">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Request Shipping
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>

      {/* Shipping Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
              <p className="text-gray-500 mt-2">Simple 4-step shipping process</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {shippingSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <AnimatedSection key={step.title} direction="up" delay={index * 100}>
                  <div className="relative">
                    <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                      <div className="relative">
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-8 h-8 text-blue-600" />
                        </div>
                        {index < shippingSteps.length - 1 && (
                          <div className="hidden md:block absolute top-8 left-[calc(50%+4rem)] w-[calc(100%-8rem)] h-0.5 bg-blue-200">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full" />
                          </div>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        <span className="text-blue-600 mr-1">{index + 1}.</span>
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Shipping Methods */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Shipping Methods</h2>
              <p className="text-gray-500 mt-2">Choose the option that fits your needs</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shippingMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <AnimatedSection key={method.id} direction="up" delay={index * 100}>
                  <div className={cn(
                    "bg-white rounded-2xl p-6 border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                    selectedMethod === method.id 
                      ? "border-blue-600 shadow-lg shadow-blue-100" 
                      : "border-gray-200 hover:border-blue-300"
                  )}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{Icon}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{method.name}</h3>
                          <p className="text-sm text-gray-500">{method.description}</p>
                        </div>
                      </div>
                      {selectedMethod === method.id && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>

                    <div className="space-y-2">
                      {method.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Est. Delivery</span>
                        <span className="text-sm font-semibold text-gray-900">{method.estimatedDays}</span>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Shipping Zones */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Shipping Zones</h2>
              <p className="text-gray-500 mt-2">We deliver to locations worldwide</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {shippingZones.map((zone, index) => (
              <AnimatedSection key={zone.id} direction="up" delay={index * 50}>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{zone.name}</h4>
                      <p className="text-sm text-gray-500">{zone.countries.join(', ')}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-blue-600">
                        {formatPrice(zone.basePrice)}+
                      </div>
                      <div className="text-xs text-gray-500">{zone.currency}</div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {zone.estimatedDays}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <p className="text-gray-500 mt-2">Everything you need to know about shipping</p>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index} direction="up" delay={index * 50}>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-6 pb-4 text-gray-600 text-sm">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection direction="up">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Ready to Ship Your Vehicle?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Contact us for a personalized shipping quote
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg shadow-blue-500/25 px-8 py-6 text-base">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contact Shipping Team
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-base"
                onClick={() => {
                  document.querySelector('#shipping-calculator')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <Truck className="w-5 h-5 mr-2" />
                Calculate Shipping
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </>
  )
}