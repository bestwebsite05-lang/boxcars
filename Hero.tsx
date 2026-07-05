'use client'

import { Search, Car } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useFilterStore } from '@/store/filterStore'
import { makes, models } from '@/lib/data/vehicles'

export function Hero() {
  const { condition, setCondition, make, setMake, model, setModel } = useFilterStore()

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/cars/New GLC - 2023.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      >
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <Car className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white/90">20,000+ cars available</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-4">
            Find cars for sale
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              and for rent near you
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Find Your Perfect Car — browse thousands of new and used vehicles from trusted dealers
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 max-w-5xl mx-auto border border-white/20">
          {/* Filter Tabs */}
          <Tabs 
            defaultValue="All" 
            value={condition} 
            onValueChange={(val) => setCondition(val as 'All' | 'New' | 'Used')}
            className="mb-6"
          >
            <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto bg-gray-100/80 p-1">
              <TabsTrigger 
                value="All" 
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
              >
                All
              </TabsTrigger>
              <TabsTrigger 
                value="New" 
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
              >
                New
              </TabsTrigger>
              <TabsTrigger 
                value="Used" 
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
              >
                Used
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Make Select */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                Any Makes
              </label>
              <Select value={make} onValueChange={setMake}>
                <SelectTrigger className="w-full bg-white border-gray-200 hover:border-blue-400 transition-colors">
                  <SelectValue placeholder="All Makes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Makes</SelectItem>
                  {makes.map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Model Select */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                Any Models
              </label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="w-full bg-white border-gray-200 hover:border-blue-400 transition-colors">
                  <SelectValue placeholder="All Models" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Models</SelectItem>
                  {models.map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                Price Range
              </label>
              <Select>
                <SelectTrigger className="w-full bg-white border-gray-200 hover:border-blue-400 transition-colors">
                  <SelectValue placeholder="All Prices" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-10000">$0 - $10,000</SelectItem>
                  <SelectItem value="10000-20000">$10,000 - $20,000</SelectItem>
                  <SelectItem value="20000-40000">$20,000 - $40,000</SelectItem>
                  <SelectItem value="40000-70000">$40,000 - $70,000</SelectItem>
                  <SelectItem value="70000-100000">$70,000 - $100,000</SelectItem>
                  <SelectItem value="100000-999999">$100,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-200/50 text-white font-semibold py-6 transition-all duration-300 hover:scale-[1.02]"
                size="lg"
              >
                <Search className="w-5 h-5 mr-2" />
                Search Cars
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}