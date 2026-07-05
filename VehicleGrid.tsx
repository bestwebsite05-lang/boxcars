'use client'

import { useMemo } from 'react'
import { VehicleCard } from './VehicleCard'
import { vehicles } from '@/lib/data/vehicles'
import { useFilterStore } from '@/store/filterStore'
import { Car, FilterX } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function VehicleGrid() {
  const { condition, make, model, category } = useFilterStore()

  const filteredVehicles = useMemo(() => {
    let filtered = [...vehicles]

    // Filter by condition (All | New | Used)
    if (condition !== 'All') {
      filtered = filtered.filter(v => v.condition === condition)
    }

    // Filter by make
    if (make) {
      filtered = filtered.filter(v => v.make === make)
    }

    // Filter by model
    if (model) {
      filtered = filtered.filter(v => v.model === model)
    }

    // Filter by category
    if (category) {
      filtered = filtered.filter(v => v.category === category)
    }

    return filtered
  }, [condition, make, model, category])

  const hasFilters = condition !== 'All' || make || model || category

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Explore All Vehicles
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {filteredVehicles.length} vehicles found
            </p>
          </div>
          
          {/* Reset Filters */}
          {hasFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                useFilterStore.setState({
                  condition: 'All',
                  make: '',
                  model: '',
                  category: ''
                })
              }}
              className="mt-3 sm:mt-0 gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
            >
              <FilterX className="w-4 h-4" />
              Reset Filters
            </Button>
          )}
        </div>

        {/* Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard 
                key={vehicle.id} 
                vehicle={vehicle} 
                featured={vehicle.featured}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Car className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No vehicles found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your filters to find what you're looking for
            </p>
            <Button
              variant="outline"
              onClick={() => {
                useFilterStore.setState({
                  condition: 'All',
                  make: '',
                  model: '',
                  category: ''
                })
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}