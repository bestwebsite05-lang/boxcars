// Image optimization helper for Next.js Image component
export const getImageUrl = (path: string, width?: number, quality?: number) => {
  // If using a CDN or image service, format URL here
  return path
}

// Placeholder images for different vehicle types
export const placeholderImages = {
  sedan: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
  suv: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
  hatchback: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
  coupe: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
  hybrid: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
}