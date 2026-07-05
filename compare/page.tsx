'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Plus, 
  X, 
  Car, 
  Fuel, 
  Gauge, 
  Calendar, 
  DollarSign,
  Shield,
  Zap,
  Users,
  Battery,
  Settings,
  Trophy,
  Check,
  AlertCircle,
  ArrowLeft,
  Minimize2,
  Maximize2,
  Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Footer } from '@/components/footer/Footer'
import { vehicles } from '@/lib/data/vehicles'
import { Vehicle } from '@/types/vehicle'
import { cn } from '@/lib/utils'
import { formatPrice, formatMileage } from '@/lib/utils'

// Extended vehicle type with comparison specs
interface CompareVehicle extends Vehicle {
  specs?: {
    engine?: string
    horsepower?: number
    torque?: number
    transmission?: string
    drivetrain?: string
    fuelEconomy?: string
    seatingCapacity?: number
    cargoSpace?: string
    warranty?: string
    safetyRating?: string
    acceleration?: string
    topSpeed?: string
  }
}

// Enhanced vehicle data with specs for comparison
const compareVehicles: CompareVehicle[] = vehicles.map(v => ({
  ...v,
  specs: {
    engine: ['2.0L Turbo', '3.5L V6', '4.0L V8', '2.5L Hybrid', 'Electric Motor'][Math.floor(Math.random() * 5)],
    horsepower: [250, 350, 450, 200, 400][Math.floor(Math.random() * 5)],
    torque: [280, 380, 480, 220, 450][Math.floor(Math.random() * 5)],
    transmission: ['8-Speed Auto', 'CVT', '6-Speed Manual', 'Dual-Clutch', 'Single Speed'][Math.floor(Math.random() * 5)],
    drivetrain: ['FWD', 'RWD', 'AWD', '4WD'][Math.floor(Math.random() * 4)],
    fuelEconomy: ['25/32 MPG', '18/25 MPG', '15/20 MPG', '40/45 MPG', '100 MPGe'][Math.floor(Math.random() * 5)],
    seatingCapacity: [5, 7, 4, 6][Math.floor(Math.random() * 4)],
    cargoSpace: ['15.5 cu ft', '22.8 cu ft', '30.2 cu ft', '18.5 cu ft'][Math.floor(Math.random() * 4)],
    warranty: ['3yr/36k mi', '4yr/50k mi', '5yr/60k mi', '3yr/Unlimited'][Math.floor(Math.random() * 4)],
    safetyRating: ['5-Star', '5-Star', '5-Star', '4-Star'][Math.floor(Math.random() * 4)],
    acceleration: [`${(Math.random() * 5 + 3).toFixed(1)} sec`],
    topSpeed: [`${Math.floor(Math.random() * 100 + 120)} mph`],
  }
}))

// Comparison categories
const comparisonCategories = [
  {
    name: 'Pricing & Value',
    icon: DollarSign,
    specs: ['price', 'condition']
  },
  {
    name: 'Performance',
    icon: Zap,
    specs: ['horsepower', 'torque', 'acceleration', 'topSpeed']
  },
  {
    name: 'Efficiency',
    icon: Fuel,
    specs: ['fuelEconomy', 'fuelType']
  },
  {
    name: 'Dimensions & Capacity',
    icon: Users,
    specs: ['seatingCapacity', 'cargoSpace']
  },
  {
    name: 'Drivetrain',
    icon: Settings,
    specs: ['transmission', 'drivetrain']
  },
  {
    name: 'Safety & Warranty',
    icon: Shield,
    specs: ['safetyRating', 'warranty']
  }
]

export default function ComparePage() {
  const [selectedVehicles, setSelectedVehicles] = useState<CompareVehicle[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  // Available vehicles (not already selected)
  const availableVehicles = useMemo(() => {
    const selectedIds = new Set(selectedVehicles.map(v => v.id))
    return compareVehicles.filter(v => !selectedIds.has(v.id))
  }, [selectedVehicles])

  // Filter available vehicles by search
  const filteredAvailable = useMemo(() => {
    if (!searchQuery) return availableVehicles.slice(0, 8)
    const query = searchQuery.toLowerCase()
    return availableVehicles.filter(v => 
      v.title.toLowerCase().includes(query) ||
      v.make.toLowerCase().includes(query) ||
      v.model.toLowerCase().includes(query)
    )
  }, [availableVehicles, searchQuery])

  const addVehicle = (vehicle: CompareVehicle) => {
    if (selectedVehicles.length >= 4) {
      alert('You can compare up to 4 vehicles at a time')
      return
    }
    setSelectedVehicles([...selectedVehicles, vehicle])
    setShowAddModal(false)
    setSearchQuery('')
  }

  const removeVehicle = (vehicleId: string) => {
    setSelectedVehicles(selectedVehicles.filter(v => v.id !== vehicleId))
  }

  const clearAll = () => {
    setSelectedVehicles([])
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
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
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
                  Car Comparison
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    Find Your Perfect Match
                  </span>
                </h1>
                <p className="text-white/70 mt-2">
                  Compare up to 4 vehicles side-by-side to make the best decision
                </p>
              </div>
              {selectedVehicles.length > 0 && (
                <Button
                  variant="outline"
                  onClick={clearAll}
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Comparison Area */}
      <section className="py-8 bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {selectedVehicles.length === 0 ? (
            // Empty State
            <AnimatedSection direction="up">
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-300">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-50 rounded-full mb-6">
                  <Car className="w-12 h-12 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  No Vehicles Selected
                </h2>
                <p className="text-gray-500 max-w-md mx-auto mb-8">
                  Add up to 4 vehicles to compare their specifications, features, and prices side-by-side.
                </p>
                <Button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-200 px-8 py-6 text-base"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add First Vehicle
                </Button>
              </div>
            </AnimatedSection>
          ) : (
            // Comparison Table
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Vehicle Cards Header */}
                <div className="grid grid-cols-[200px_repeat(auto-fit,minmax(250px,1fr))] gap-4 mb-6">
                  <div className="hidden md:block" /> {/* Spacer */}
                  {selectedVehicles.map((vehicle) => (
                    <div key={vehicle.id} className="relative">
                      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md">
                        <div className="relative h-48 w-full bg-gray-100">
                          <Image
                            src={vehicle.images[0] || '/cars/placeholder.jpg'}
                            alt={vehicle.title}
                            fill
                            className="object-cover"
                          />
                          <button
                            onClick={() => removeVehicle(vehicle.id)}
                            className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-red-500 text-gray-600 hover:text-white rounded-full shadow-md transition-all duration-200 hover:scale-110"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <div className="absolute bottom-2 left-2">
                            <span className={cn(
                              "text-xs font-bold px-3 py-1 rounded-full shadow-md",
                              vehicle.condition === 'New' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-amber-500 text-white'
                            )}>
                              {vehicle.condition}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{vehicle.title}</h3>
                          <p className="text-lg font-extrabold text-blue-600">{formatPrice(vehicle.price)}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                            <Calendar className="w-3 h-3" />
                            <span>{vehicle.year}</span>
                            <span className="w-px h-3 bg-gray-300" />
                            <Gauge className="w-3 h-3" />
                            <span>{formatMileage(vehicle.mileage)} mi</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Vehicle Button */}
                  {selectedVehicles.length < 4 && (
                    <div className="flex items-center justify-center min-h-[200px]">
                      <button
                        onClick={() => setShowAddModal(true)}
                        className="w-full h-full min-h-[200px] border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 flex flex-col items-center justify-center gap-2 group"
                      >
                        <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                          <Plus className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <span className="text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors">
                          Add Vehicle
                        </span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Comparison Specifications */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  {comparisonCategories.map((category) => {
                    const Icon = category.icon
                    return (
                      <div key={category.name} className="border-b border-gray-100 last:border-b-0">
                        {/* Category Header */}
                        <div className="bg-gray-50 px-6 py-3 flex items-center gap-2">
                          <Icon className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-gray-700 text-sm">{category.name}</span>
                        </div>

                        {/* Category Specs */}
                        {category.specs.map((specKey) => {
                          const allValues = selectedVehicles.map(v => {
                            // @ts-ignore - dynamic access
                            return v.specs?.[specKey] ?? v[specKey] ?? '—'
                          })

                          // Check if all values are the same (for highlighting)
                          const allSame = allValues.every(v => v === allValues[0])

                          return (
                            <div key={specKey} className="grid grid-cols-[200px_repeat(auto-fit,minmax(250px,1fr))] gap-4 hover:bg-gray-50 transition-colors">
                              <div className="px-6 py-3 font-medium text-gray-600 text-sm capitalize flex items-center">
                                {specKey.replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                              {selectedVehicles.map((vehicle, idx) => {
                                // @ts-ignore - dynamic access
                                const value = vehicle.specs?.[specKey] ?? vehicle[specKey] ?? '—'
                                const isBest = !allSame && 
                                  (specKey === 'price' ? value === Math.min(...selectedVehicles.map(v => v.price)) :
                                   specKey === 'horsepower' ? value === Math.max(...selectedVehicles.map(v => v.specs?.horsepower || 0)) :
                                   false)
                                
                                return (
                                  <div key={`${vehicle.id}-${specKey}`} className={cn(
                                    "px-6 py-3 text-sm flex items-center gap-2 border-l border-gray-100",
                                    isBest && "bg-green-50"
                                  )}>
                                    {value}
                                    {isBest && <Trophy className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                                    {!allSame && value === '—' && <AlertCircle className="w-4 h-4 text-gray-400" />}
                                  </div>
                                )
                              })}
                              {selectedVehicles.length < 4 && (
                                <div className="px-6 py-3 border-l border-gray-100" />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>

                {/* Bottom Actions */}
                <div className="mt-8 flex flex-wrap gap-4">
                  {selectedVehicles.length < 4 && (
                    <Button 
                      onClick={() => setShowAddModal(true)}
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Another Vehicle
                    </Button>
                  )}
                  <Button 
                    variant="outline"
                    onClick={clearAll}
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear All Vehicles
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Add a Vehicle</h2>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setSearchQuery('')
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Search */}
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by make, model, or year..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Vehicle Grid */}
            <div className="p-6 overflow-y-auto max-h-[400px]">
              {filteredAvailable.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredAvailable.map((vehicle) => (
                    <button
                      key={vehicle.id}
                      onClick={() => addVehicle(vehicle)}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group text-left"
                    >
                      <div className="relative w-20 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={vehicle.images[0] || '/cars/placeholder.jpg'}
                          alt={vehicle.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {vehicle.title}
                        </h4>
                        <p className="text-xs text-gray-500">{vehicle.year} · {formatMileage(vehicle.mileage)} mi</p>
                        <p className="text-sm font-bold text-blue-600">{formatPrice(vehicle.price)}</p>
                      </div>
                      <Plus className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No vehicles found</p>
                  <p className="text-sm text-gray-400 mt-1">Try adjusting your search</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <p className="text-sm text-gray-500">
                {selectedVehicles.length} of 4 vehicles selected
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}