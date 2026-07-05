import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Gauge, Fuel } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Vehicle } from '@/types/vehicle'
import { formatPrice, formatMileage } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface VehicleCardProps {
  vehicle: Vehicle
  featured?: boolean
}

export function VehicleCard({ vehicle, featured }: VehicleCardProps) {
  const { id, title, year, price, mileage, fuelType, condition, images, description } = vehicle

  return (
    <div className={cn(
      "group relative bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      featured && "ring-2 ring-blue-500/20"
    )}>
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-blue-200">
          ⭐ Featured
        </div>
      )}

      {/* Condition Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className={cn(
          "text-xs font-bold px-3 py-1.5 rounded-full shadow-md",
          condition === 'New' 
            ? 'bg-green-500 text-white' 
            : 'bg-amber-500 text-white'
        )}>
          {condition}
        </span>
      </div>

      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden bg-gray-100">
        <Image
          src={images[0] || 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80'}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {description}
        </p>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-gray-50 rounded-xl">
          <div className="flex flex-col items-center">
            <Calendar className="w-4 h-4 text-gray-400 mb-0.5" />
            <span className="text-xs font-semibold text-gray-700">{year}</span>
          </div>
          <div className="flex flex-col items-center">
            <Gauge className="w-4 h-4 text-gray-400 mb-0.5" />
            <span className="text-xs font-semibold text-gray-700">{formatMileage(mileage)} mi</span>
          </div>
          <div className="flex flex-col items-center">
            <Fuel className="w-4 h-4 text-gray-400 mb-0.5" />
            <span className="text-xs font-semibold text-gray-700">{fuelType}</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-extrabold text-gray-900">
              {formatPrice(price)}
            </span>
          </div>
<Link href={`/listings/${id}`}>
  <Button 
    variant="outline" 
    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded-full px-6"
  >
    View Details
  </Button>
</Link>
        </div>
        <div className="flex items-center justify-between">
 
  <div className="flex gap-2">
    
    <Link href="/compare">
      <Button
        variant="outline"
        size="icon"
        className="border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 rounded-full"
        title="Add to compare"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </Link>
  </div>
</div>
      </div>
    </div>
  )
}