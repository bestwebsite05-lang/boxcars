'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Search, 
  ChevronRight,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Wrench,
  Shield,
  Star,
  MessageSquare,
  Eye
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Footer } from '@/components/footer/Footer'
import { cn } from '@/lib/utils'

// Blog post type
interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  authorAvatar: string
  date: string
  readTime: string
  category: string
  tags: string[]
  featured?: boolean
  views?: number
  comments?: number
}

// Sample blog data
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Tips for Buying Your First Electric Car',
    excerpt: 'Everything you need to know before making the switch to electric vehicles. From charging to range anxiety.',
    content: '...',
    image: 'https://images.unsplash.com/photo-1593941707882-ef09b2a0e7c6?w=800&q=80',
    author: 'Sarah Mitchell',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    date: 'December 15, 2024',
    readTime: '8 min read',
    category: 'Buying Guide',
    tags: ['Electric Vehicles', 'EV', 'Buying Tips'],
    featured: true,
    views: 1234,
    comments: 23,
  },
  {
    id: '2',
    title: 'The Future of Autonomous Driving: What to Expect in 2025',
    excerpt: 'Self-driving cars are closer than you think. Explore the latest advancements in autonomous vehicle technology.',
    content: '...',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80',
    author: 'John Anderson',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    date: 'December 12, 2024',
    readTime: '6 min read',
    category: 'Technology',
    tags: ['Autonomous', 'AI', 'Future Tech'],
    featured: true,
    views: 856,
    comments: 15,
  },
  {
    id: '3',
    title: 'How to Maintain Your Car During Winter',
    excerpt: 'Essential maintenance tips to keep your car running smoothly through the cold winter months.',
    content: '...',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
    author: 'Michael Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    date: 'December 10, 2024',
    readTime: '5 min read',
    category: 'Maintenance',
    tags: ['Winter Care', 'Maintenance', 'Tips'],
    views: 654,
    comments: 12,
  },
  {
    id: '4',
    title: 'Top 5 Luxury SUVs of 2024',
    excerpt: 'Discover the most luxurious SUVs that combine comfort, performance, and cutting-edge technology.',
    content: '...',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
    author: 'Emily Rodriguez',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    date: 'December 8, 2024',
    readTime: '7 min read',
    category: 'Car Reviews',
    tags: ['SUVs', 'Luxury', 'Reviews'],
    views: 432,
    comments: 8,
  },
  {
    id: '5',
    title: 'Understanding Car Financing Options',
    excerpt: 'A comprehensive guide to car loans, leasing, and financing options to help you make the right decision.',
    content: '...',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    author: 'Sarah Mitchell',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    date: 'December 5, 2024',
    readTime: '9 min read',
    category: 'Finance',
    tags: ['Financing', 'Loans', 'Leasing'],
    views: 321,
    comments: 5,
  },
  {
    id: '6',
    title: 'How to Spot a Used Car Scam',
    excerpt: 'Protect yourself from used car scams with these expert tips and red flags to watch out for.',
    content: '...',
    image: 'https://images.unsplash.com/photo-1549317661-bcd0c1d2b2d4?w=800&q=80',
    author: 'John Anderson',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    date: 'December 3, 2024',
    readTime: '4 min read',
    category: 'Buying Guide',
    tags: ['Scams', 'Buying Tips', 'Safety'],
    views: 987,
    comments: 19,
  },
  {
    id: '7',
    title: 'The Rise of Hybrid Vehicles',
    excerpt: 'Why hybrid cars are becoming increasingly popular and how they compare to fully electric vehicles.',
    content: '...',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
    author: 'Michael Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    date: 'November 30, 2024',
    readTime: '6 min read',
    category: 'Technology',
    tags: ['Hybrid', 'EV', 'Green'],
    views: 543,
    comments: 11,
  },
  {
    id: '8',
    title: 'Best Family Cars for 2024',
    excerpt: 'Find the perfect family vehicle with our top picks for safety, space, and reliability.',
    content: '...',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
    author: 'Emily Rodriguez',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    date: 'November 28, 2024',
    readTime: '7 min read',
    category: 'Car Reviews',
    tags: ['Family Cars', 'SUVs', 'Safety'],
    views: 765,
    comments: 14,
  },
]

const categories = ['All', 'Buying Guide', 'Technology', 'Car Reviews', 'Maintenance', 'Finance']

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTag, setSelectedTag] = useState('All')

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    blogPosts.forEach(post => post.tags.forEach(tag => tags.add(tag)))
    return ['All', ...Array.from(tags)]
  }, [])

  // Filter posts
  const filteredPosts = useMemo(() => {
    let filtered = [...blogPosts]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    // Tag filter
    if (selectedTag !== 'All') {
      filtered = filtered.filter(post => post.tags.includes(selectedTag))
    }

    return filtered
  }, [searchQuery, selectedCategory, selectedTag])

  // Featured posts (top 2)
  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 2)

  // Regular posts (excluding featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  const hasActiveFilters = searchQuery || selectedCategory !== 'All' || selectedTag !== 'All'

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
    setSelectedTag('All')
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
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <AnimatedSection direction="up">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
                Our Blog
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Insights & Updates
                </span>
              </h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Expert advice, car reviews, and the latest automotive news
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles by title, topic, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    'px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors',
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Filters */}
          <div className="flex flex-wrap items-center gap-3 mt-3">
            {/* Tag Filter */}
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-3 py-1 rounded-md border border-gray-200 bg-white text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
            >
              {allTags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600">
              <span className="font-semibold">{filteredPosts.length}</span> articles found
            </p>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && !hasActiveFilters && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                Featured Articles
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredPosts.map((post, index) => (
                  <AnimatedSection key={post.id} direction="up" delay={index * 100}>
                    <BlogCard post={post} featured />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          )}

          {/* Regular Posts Grid */}
          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post, index) => (
                <AnimatedSection key={post.id} direction="up" delay={index * 50}>
                  <BlogCard post={post} />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <BookOpen className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No articles found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Try adjusting your search or filters to find what you're looking for
              </p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}

// Blog Card Component
function BlogCard({ post, featured }: { post: BlogPost; featured?: boolean }) {
  return (
    <div className={cn(
      "group bg-white rounded-2xl overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      featured && "lg:flex lg:flex-col"
    )}>
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden bg-gray-100">
        <img
          src={post.image}
          alt={post.title}
          
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            ⭐ Featured
          </div>
        )}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {post.views}
          </span>
          <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
            <MessageSquare className="w-3 h-3" />
            {post.comments}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <Link href={`/blog/${post.id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">
          {post.excerpt}
        </p>

        {/* Author & Date */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200">
              <img
                src={post.authorAvatar}
                alt={post.author}
              
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-900">{post.author}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {post.date}
              </p>
            </div>
          </div>
          <Link href={`/blog/${post.id}`}>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full"
            >
              Read More
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs text-gray-400">+{post.tags.length - 3} more</span>
          )}
        </div>
      </div>
    </div>
  )
}