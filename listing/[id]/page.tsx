'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft,
  Calendar,
  Gauge,
  Fuel,
  DollarSign,
  Car,
  Shield,
  Zap,
  Users,
  Settings,
  Heart,
  Share2,
  Clock,
  Check,
  X,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Star,
  StarHalf,
  Download,
  Printer,
  Truck,
  Calendar as CalendarIcon,
  Video,
  Camera,
  Maximize2,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Info,
  Wrench,
  Award,
  Sparkles,
  GitCompare,
  MessageSquare,
  ThumbsUp,
  Eye
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Footer } from '@/components/footer/Footer'
import { vehicles } from '@/lib/data/vehicles'
import { cn, formatPrice, formatMileage } from '@/lib/utils'

// Sample images for car (in real app, these would come from the data)
const carImages = [
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80',
  'https://images.unsplash.com/photo-1549317661-bcd0c1d2b2d4?w=1200&q=80',
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=80',
  'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80',
]

// Equipment categories
const equipmentCategories = [
  {
    name: 'Safety & Security',
    items: ['ABS Brakes', 'Airbags', 'Traction Control', 'Stability Control', 'Parking Sensors', 'Rear Camera', 'Blind Spot Monitor', 'Lane Departure Warning']
  },
  {
    name: 'Comfort & Convenience',
    items: ['Air Conditioning', 'Cruise Control', 'Power Windows', 'Power Mirrors', 'Heated Seats', 'Memory Seats', 'Keyless Entry', 'Push Start']
  },
  {
    name: 'Interior Features',
    items: ['Leather Seats', 'Heated Steering Wheel', 'Sunroof', 'Navigation', 'Premium Sound', 'Bluetooth', 'USB Ports', 'Wireless Charging']
  },
  {
    name: 'Exterior Features',
    items: ['Alloy Wheels', 'LED Headlights', 'Fog Lights', 'Power Tailgate', 'Roof Rack', 'Tinted Windows', 'Running Boards', 'Tow Package']
  }
]

// Enhanced specs
const getEnhancedSpecs = (vehicle: any) => {
  return {
    engine: ['2.0L Turbo Inline-4', '3.5L V6', '4.0L V8', '2.5L Hybrid', 'Electric Motor'][Math.floor(Math.random() * 5)],
    horsepower: [250, 350, 450, 200, 400][Math.floor(Math.random() * 5)],
    torque: [280, 380, 480, 220, 450][Math.floor(Math.random() * 5)],
    transmission: ['8-Speed Automatic', 'CVT', '6-Speed Manual', '7-Speed DCT', 'Single Speed'][Math.floor(Math.random() * 5)],
    drivetrain: ['FWD', 'RWD', 'AWD', '4WD'][Math.floor(Math.random() * 4)],
    fuelEconomy: ['25/32 MPG', '18/25 MPG', '15/20 MPG', '40/45 MPG', '100 MPGe'][Math.floor(Math.random() * 5)],
    seatingCapacity: [5, 7, 4, 6][Math.floor(Math.random() * 4)],
    cargoSpace: ['15.5 cu ft', '22.8 cu ft', '30.2 cu ft', '18.5 cu ft'][Math.floor(Math.random() * 4)],
    warranty: ['3yr/36k mi', '4yr/50k mi', '5yr/60k mi', '3yr/Unlimited'][Math.floor(Math.random() * 4)],
    safetyRating: ['5-Star', '5-Star', '5-Star', '4-Star'][Math.floor(Math.random() * 4)],
    acceleration: `${(Math.random() * 5 + 3).toFixed(1)} sec`,
    topSpeed: `${Math.floor(Math.random() * 100 + 120)} mph`,
    weight: `${Math.floor(Math.random() * 2000 + 3000)} lbs`,
    fuelTank: `${Math.floor(Math.random() * 10 + 15)} gallons`,
  }
}

export default function CarDetailsPage() {
  const params = useParams()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [testDriveName, setTestDriveName] = useState('')
  const [testDriveEmail, setTestDriveEmail] = useState('')
  const [testDrivePhone, setTestDrivePhone] = useState('')
  const [isBooking, setIsBooking] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  // Find vehicle by ID
  const vehicle = useMemo(() => {
    const id = params.id as string
    return vehicles.find(v => v.id === id) || vehicles[0]
  }, [params.id])

  // Get enhanced specs
  const specs = useMemo(() => getEnhancedSpecs(vehicle), [vehicle])

  // Related vehicles (same make or category)
  const relatedVehicles = useMemo(() => {
    return vehicles
      .filter(v => v.id !== vehicle.id && (v.make === vehicle.make || v.category === vehicle.category))
      .slice(0, 4)
  }, [vehicle])

  // Handle image navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carImages.length) % carImages.length)
  }

  // Handle test drive booking
  const handleTestDriveBooking = (e: React.FormEvent) => {
    e.preventDefault()
    setIsBooking(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsBooking(false)
      setBookingSuccess(true)
      
      // Reset after 3 seconds
      setTimeout(() => {
        setBookingSuccess(false)
        setSelectedDate('')
        setSelectedTime('')
        setTestDriveName('')
        setTestDriveEmail('')
        setTestDrivePhone('')
      }, 3000)
    }, 1500)
  }

  // Generate random ratings
  const rating = useMemo(() => {
    const r = 3.5 + Math.random() * 1.5
    return Math.round(r * 10) / 10
  }, [])

  const reviewCount = Math.floor(Math.random() * 200 + 50)

  return (
    <>
      {/* Back Navigation */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <Link href="/listings" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Listings</span>
            </Link>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Heart className={cn("w-5 h-5", isLiked ? "fill-red-500 text-red-500" : "text-gray-500")} />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Share2 className="w-5 h-5 text-gray-500" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Download className="w-5 h-5 text-gray-500" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Printer className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images & Gallery */}
            <div className="lg:col-span-2">
              <AnimatedSection direction="up">
                {/* Main Image */}
                <div className="relative bg-black rounded-2xl overflow-hidden group">
                  <div className="relative h-[400px] md:h-[500px]">
                    <Image
                      src={carImages[currentImageIndex] || vehicle.images[0] || '/cars/placeholder.jpg'}
                      alt={vehicle.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {vehicle.featured && (
                        <span className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                          ⭐ Featured
                        </span>
                      )}
                      <span className={cn(
                        "text-xs font-bold px-3 py-1.5 rounded-full shadow-lg",
                        vehicle.condition === 'New' ? "bg-green-500 text-white" : "bg-amber-500 text-white"
                      )}>
                        {vehicle.condition}
                      </span>
                    </div>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                      {currentImageIndex + 1} / {carImages.length}
                    </div>

                    {/* Navigation Buttons */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRightIcon className="w-6 h-6" />
                    </button>

                    {/* Expand Button */}
                    <button className="absolute bottom-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors">
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                  {carImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={cn(
                        "relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all",
                        currentImageIndex === idx ? "border-blue-600" : "border-transparent hover:border-gray-300"
                      )}
                    >
                      <Image
                        src={img}
                        alt={`View ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                      {idx === 0 && (
                        <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                          <Video className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                  <button className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors flex items-center justify-center bg-gray-100">
                    <Camera className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">+4</span>
                  </button>
                </div>

                {/* Rating & Quick Info */}
                <div className="flex flex-wrap items-center gap-4 mt-4 p-4 bg-white rounded-xl border border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => {
                        const starValue = i + 1
                        const isFullStar = starValue <= Math.floor(rating)
                        const isHalfStar = starValue === Math.ceil(rating) && rating % 1 !== 0
                        return (
                          <span key={i}>
                            {isFullStar ? (
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ) : isHalfStar ? (
                              <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ) : (
                              <Star className="w-4 h-4 text-gray-300" />
                            )}
                          </span>
                        )
                      })}
                    </div>
                    <span className="text-sm font-bold text-gray-900">{rating}</span>
                    <span className="text-sm text-gray-500">({reviewCount} reviews)</span>
                  </div>
                  <div className="w-px h-6 bg-gray-200 hidden sm:block" />
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Eye className="w-4 h-4" />
                    <span>{Math.floor(Math.random() * 500 + 100)} views</span>
                  </div>
                  <div className="w-px h-6 bg-gray-200 hidden sm:block" />
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{Math.floor(Math.random() * 50 + 10)} likes</span>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Column - Details & Actions */}
            <div className="lg:col-span-1">
              <AnimatedSection direction="left">
                {/* Price & Title */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-4">
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{vehicle.title}</h1>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{vehicle.year}</span>
                    <span className="w-px h-4 bg-gray-300" />
                    <Gauge className="w-4 h-4" />
                    <span>{formatMileage(vehicle.mileage)} mi</span>
                    <span className="w-px h-4 bg-gray-300" />
                    <Fuel className="w-4 h-4" />
                    <span>{vehicle.fuelType}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-3xl font-extrabold text-blue-600">{formatPrice(vehicle.price)}</span>
                      <span className="text-sm text-gray-500 ml-1">USD</span>
                    </div>
                    <span className={cn(
                      "text-sm font-bold px-3 py-1 rounded-full",
                      vehicle.condition === 'New' ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    )}>
                      {vehicle.condition}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mb-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-200">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Dealer
                    </Button>
                    <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/compare" className="w-full">
                      <Button variant="outline" className="w-full border-gray-300">
                        <GitCompare className="w-4 h-4 mr-2" />
                        Compare
                      </Button>
                    </Link>
                    <Link href="/shipping" className="w-full">
                      <Button variant="outline" className="w-full border-gray-300">
                        <Truck className="w-4 h-4 mr-2" />
                        Shipping
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-white rounded-2xl p-4 border border-gray-200 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">123 Auto Drive</p>
                      <p className="text-xs text-gray-500">New York, NY 10001</p>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-auto text-blue-600">
                      View Map
                    </Button>
                  </div>
                </div>

                {/* Dealer Info */}
                <div className="bg-white rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Car className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">BOXCARS Dealership</p>
                      <p className="text-xs text-gray-500">Premium Auto Dealer</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-900">4.9</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Tabs Section - Specifications, Equipment, Description */}
          <div className="mt-8">
            <AnimatedSection direction="up">
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                {/* Tabs Navigation */}
                <div className="border-b border-gray-200">
                  <div className="flex overflow-x-auto">
                    {[
                      { id: 'specs', label: 'Specifications', icon: Settings },
                      { id: 'equipment', label: 'Equipment', icon: Wrench },
                      { id: 'description', label: 'Description', icon: Info },
                      { id: 'schedule', label: 'Schedule Test Drive', icon: CalendarIcon },
                    ].map((tab, idx) => {
                      const Icon = tab.icon
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                          }}
                          className={cn(
                            "px-4 sm:px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap",
                            idx === 0 ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          {tab.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Specifications Section */}
                <div id="specs" className="p-6 scroll-mt-24">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-600" />
                    Technical Specifications
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-xs text-gray-500">Engine</p>
                          <p className="font-semibold text-gray-900">{specs.engine}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-xs text-gray-500">Horsepower</p>
                          <p className="font-semibold text-gray-900">{specs.horsepower} HP</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-xs text-gray-500">Torque</p>
                          <p className="font-semibold text-gray-900">{specs.torque} lb-ft</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-xs text-gray-500">Transmission</p>
                          <p className="font-semibold text-gray-900">{specs.transmission}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-xs text-gray-500">Drivetrain</p>
                          <p className="font-semibold text-gray-900">{specs.drivetrain}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-xs text-gray-500">Fuel Economy</p>
                          <p className="font-semibold text-gray-900">{specs.fuelEconomy}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-xs text-gray-500">Seating Capacity</p>
                          <p className="font-semibold text-gray-900">{specs.seatingCapacity} seats</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-xs text-gray-500">Cargo Space</p>
                          <p className="font-semibold text-gray-900">{specs.cargoSpace}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-xs text-gray-500">Acceleration 0-60</p>
                          <p className="font-semibold text-gray-900">{specs.acceleration}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-xs text-gray-500">Top Speed</p>
                          <p className="font-semibold text-gray-900">{specs.topSpeed}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-xs text-gray-500">Vehicle Weight</p>
                          <p className="font-semibold text-gray-900">{specs.weight}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-xs text-gray-500">Fuel Tank</p>
                          <p className="font-semibold text-gray-900">{specs.fuelTank}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Safety Rating & Warranty */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 flex items-center gap-4">
                      <Shield className="w-10 h-10 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Safety Rating</p>
                        <p className="text-2xl font-bold text-green-600">{specs.safetyRating}</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 flex items-center gap-4">
                      <Award className="w-10 h-10 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Warranty</p>
                        <p className="text-lg font-bold text-blue-600">{specs.warranty}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Equipment Section */}
                <div id="equipment" className="p-6 border-t border-gray-200 scroll-mt-24">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-blue-600" />
                    Equipment & Features
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {equipmentCategories.map((category) => (
                      <div key={category.name} className="bg-gray-50 rounded-xl p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">{category.name}</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {category.items.map((item) => (
                            <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                              <Check className="w-3 h-3 text-green-500" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description Section */}
                <div id="description" className="p-6 border-t border-gray-200 scroll-mt-24">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-600" />
                    Vehicle Description
                  </h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-600 leading-relaxed">
                      {vehicle.description}
                    </p>
                    <p className="text-gray-600 leading-relaxed mt-3">
                      This {vehicle.year} {vehicle.make} {vehicle.model} is in excellent condition with only {formatMileage(vehicle.mileage)} miles. 
                      It features a powerful {specs.engine} engine producing {specs.horsepower} horsepower and 
                      {specs.torque} lb-ft of torque. The {specs.transmission} transmission provides smooth and 
                      responsive shifting.
                    </p>
                    {showFullDescription && (
                      <>
                        <p className="text-gray-600 leading-relaxed mt-3">
                          The interior is spacious and comfortable with seating for {specs.seatingCapacity} passengers 
                          and {specs.cargoSpace} of cargo space. Premium features include leather upholstery, 
                          heated seats, navigation system, and a premium sound system.
                        </p>
                        <p className="text-gray-600 leading-relaxed mt-3">
                          Safety is a top priority with {specs.safetyRating} safety rating and a comprehensive 
                          warranty of {specs.warranty}. This vehicle has been thoroughly inspected and is 
                          ready for its new owner.
                        </p>
                      </>
                    )}
                    <button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="text-blue-600 font-medium hover:text-blue-700 transition-colors mt-3 inline-flex items-center gap-1"
                    >
                      {showFullDescription ? 'Show Less' : 'Read More'}
                      <ChevronRight className={cn("w-4 h-4 transition-transform", showFullDescription && "rotate-90")} />
                    </button>
                  </div>
                </div>

                {/* Schedule Test Drive Section */}
                <div id="schedule" className="p-6 border-t border-gray-200 scroll-mt-24 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-blue-600" />
                    Schedule Test Drive
                  </h2>
                  
                  {bookingSuccess ? (
                    <div className="bg-white rounded-xl p-8 text-center border-2 border-green-200">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
                      <p className="text-gray-600">Your test drive has been scheduled successfully. We'll send you a confirmation email with all the details.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleTestDriveBooking} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                        <Input
                          type="text"
                          placeholder="John Doe"
                          value={testDriveName}
                          onChange={(e) => setTestDriveName(e.target.value)}
                          required
                          className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          value={testDriveEmail}
                          onChange={(e) => setTestDriveEmail(e.target.value)}
                          required
                          className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                        <Input
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={testDrivePhone}
                          onChange={(e) => setTestDrivePhone(e.target.value)}
                          required
                          className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Date *</label>
                        <Input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Time *</label>
                        <select
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          required
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select a time</option>
                          <option value="09:00">9:00 AM</option>
                          <option value="10:00">10:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="12:00">12:00 PM</option>
                          <option value="13:00">1:00 PM</option>
                          <option value="14:00">2:00 PM</option>
                          <option value="15:00">3:00 PM</option>
                          <option value="16:00">4:00 PM</option>
                          <option value="17:00">5:00 PM</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <Button
                          type="submit"
                          disabled={isBooking}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-200 py-6 text-base"
                        >
                          {isBooking ? (
                            <>
                              <Clock className="w-5 h-5 mr-2 animate-spin" />
                              Booking...
                            </>
                          ) : (
                            <>
                              <CalendarIcon className="w-5 h-5 mr-2" />
                              Schedule Test Drive
                            </>
                          )}
                        </Button>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                          By scheduling a test drive, you agree to our terms and conditions. We'll contact you to confirm your appointment.
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Related Vehicles */}
          {relatedVehicles.length > 0 && (
            <section className="mt-12">
              <AnimatedSection direction="up">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Similar Vehicles</h2>
                  <Link href="/listings" className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1">
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {relatedVehicles.map((vehicle, index) => (
                    <Link key={vehicle.id} href={`/listings/${vehicle.id}`}>
                      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                        <div className="relative h-40 w-full bg-gray-100">
                          <Image
                            src={vehicle.images[0] || '/cars/placeholder.jpg'}
                            alt={vehicle.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className={cn(
                            "absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full shadow-md",
                            vehicle.condition === 'New' ? "bg-green-500 text-white" : "bg-amber-500 text-white"
                          )}>
                            {vehicle.condition}
                          </span>
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900 text-sm truncate">{vehicle.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                            <span>{vehicle.year}</span>
                            <span className="w-px h-3 bg-gray-300" />
                            <span>{formatMileage(vehicle.mileage)} mi</span>
                          </div>
                          <p className="text-lg font-bold text-blue-600 mt-1">{formatPrice(vehicle.price)}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </AnimatedSection>
            </section>
          )}
        </div>
      </section>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4 md:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500">Price</p>
            <p className="text-xl font-bold text-blue-600">{formatPrice(vehicle.price)}</p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-200">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Test Drive
            </Button>
            <Button variant="outline" className="border-blue-600 text-blue-600">
              <Phone className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}