import { ShippingZone, ShippingMethod } from '@/types/shipping'

export const shippingZones: ShippingZone[] = [
  {
    id: 'zone-1',
    name: 'Local (NY, NJ, CT)',
    countries: ['United States'],
    estimatedDays: '1-2 days',
    basePrice: 150,
    pricePerMile: 0.85,
    currency: 'USD'
  },
  {
    id: 'zone-2',
    name: 'East Coast',
    countries: ['United States'],
    estimatedDays: '3-5 days',
    basePrice: 250,
    pricePerMile: 0.75,
    currency: 'USD'
  },
  {
    id: 'zone-3',
    name: 'Midwest',
    countries: ['United States'],
    estimatedDays: '5-7 days',
    basePrice: 350,
    pricePerMile: 0.65,
    currency: 'USD'
  },
  {
    id: 'zone-4',
    name: 'West Coast',
    countries: ['United States'],
    estimatedDays: '7-10 days',
    basePrice: 450,
    pricePerMile: 0.55,
    currency: 'USD'
  },
  {
    id: 'zone-5',
    name: 'Canada',
    countries: ['Canada'],
    estimatedDays: '5-8 days',
    basePrice: 400,
    pricePerMile: 0.70,
    currency: 'CAD'
  },
  {
    id: 'zone-6',
    name: 'International',
    countries: ['United Kingdom', 'Germany', 'France', 'Australia', 'UAE', 'Japan'],
    estimatedDays: '14-21 days',
    basePrice: 1200,
    pricePerMile: 1.20,
    currency: 'USD'
  }
]

export const shippingMethods: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: 'Economical option with reliable delivery',
    icon: '🚚',
    priceMultiplier: 1.0,
    estimatedDays: 'Standard',
    features: [
      'Tracked delivery',
      'Insurance included',
      'Door-to-door service',
      '7-day delivery window'
    ]
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: 'Faster delivery for urgent needs',
    icon: '⚡',
    priceMultiplier: 1.5,
    estimatedDays: 'Express',
    features: [
      'Priority handling',
      'Express tracking',
      'Insurance included',
      'Expedited delivery',
      '3-day delivery window'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Shipping',
    description: 'White glove delivery service',
    icon: '👑',
    priceMultiplier: 2.0,
    estimatedDays: 'Premium',
    features: [
      'White glove delivery',
      'Real-time tracking',
      'Full insurance coverage',
      'Personalized handling',
      '1-day delivery window',
      'Unboxing assistance'
    ]
  }
]

// US States with abbreviations
export const usStates = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' }
]

// International countries
export const internationalCountries = [
  'United Kingdom',
  'Germany',
  'France',
  'Australia',
  'UAE',
  'Japan',
  'Canada'
]

export const getZoneForLocation = (location: string): ShippingZone | undefined => {
  return shippingZones.find(zone => 
    zone.countries.some(country => 
      location.toLowerCase().includes(country.toLowerCase())
    )
  )
}

export const calculateShippingCost = (
  zone: ShippingZone,
  method: ShippingMethod,
  distance: number
): ShippingEstimate => {
  const baseCost = zone.basePrice
  const distanceCost = distance * zone.pricePerMile
  const totalCost = (baseCost + distanceCost) * method.priceMultiplier

  return {
    zone,
    method,
    baseCost,
    distanceCost,
    totalCost,
    estimatedDays: method.estimatedDays,
    currency: zone.currency
  }
}