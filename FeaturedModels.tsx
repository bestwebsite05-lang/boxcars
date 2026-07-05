'use client'

import { useFilterStore } from '@/store/filterStore'
import { categories } from '@/lib/data/vehicles'
import { cn } from '@/lib/utils'

const categoryIcons: Record<string, string> = {
  SUV: '🚙',
  Sedan: '🚗',
  Hatchback: '🚘',
  Coupe: '🏎️',
  Hybrid: '⚡',
}

export function FeaturedModels() {
  const { category, setCategory } = useFilterStore()

  return (
    <div className="py-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Or Premium Featured Model
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Browse by category</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(category === cat ? '' : cat)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-full border-2 transition-all duration-200 font-medium text-sm',
                category === cat
                  ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm shadow-blue-100'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 text-gray-600 hover:text-blue-600'
              )}
            >
              <span className="text-lg">{categoryIcons[cat]}</span>
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}