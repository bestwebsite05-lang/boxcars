'use client'

import Image from 'next/image'
import { brands } from '@/lib/data/vehicles'
import { cn } from '@/lib/utils'
import { useFilterStore } from '@/store/filterStore'

// Brand logos mapping (using colored SVG placeholders)
const brandLogos: Record<string, { color: string; bg: string }> = {
  'Audi': { color: '#BB0A30', bg: 'bg-red-50' },
  'BMW': { color: '#0066B1', bg: 'bg-blue-50' },
  'Ford': { color: '#003478', bg: 'bg-blue-50' },
  'Mercedes Benz': { color: '#00ADEF', bg: 'bg-sky-50' },
  'Peugeot': { color: '#0066CC', bg: 'bg-blue-50' },
  'Volkswagen': { color: '#001E60', bg: 'bg-indigo-50' },
}

export function BrandStrip() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Explore Our Premium Brands
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Trusted by thousands of car enthusiasts worldwide
          </p>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {brands.map((brand) => {
            const logo = brandLogos[brand]
            return (
              <button
                key={brand}
                className={cn(
                  'group relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
                  logo?.bg || 'bg-gray-50',
                  'hover:border-blue-400 hover:shadow-blue-100'
                )}
                onClick={() => {
                  // Scroll to vehicle grid and filter by brand
                  const gridSection = document.getElementById('vehicle-grid')
                  if (gridSection) {
                    gridSection.scrollIntoView({ behavior: 'smooth' })
                  }
                  // Update filter store
                  useFilterStore.setState({ make: brand })
                }}
              >
                {/* Brand Circle */}
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-2 group-hover:shadow-md transition-all duration-300">
                  <span 
                    className="text-2xl font-bold"
                    style={{ color: logo?.color || '#333' }}
                  >
                    {brand.charAt(0)}
                  </span>
                </div>
                
                {/* Brand Name */}
                <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                  {brand}
                </span>

                {/* Hover Indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-8" />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}