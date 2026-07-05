'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Car, User, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Listings', href: '/listings' },
  { name: 'Compare', href: '/compare' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]


export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 transition-transform group-hover:scale-105">
              <Car className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="text-gray-900">BOX</span>
              <span className="text-blue-600">CARS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm" className="gap-2 text-gray-600 hover:text-blue-600">
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
            </Link>
            <Link href="/submit-listing">
              <Button size="sm" className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-200">
                <User className="w-4 h-4" />
                Submit Listing
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-gray-100',
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <Link href="/sign-in" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full justify-center gap-2">
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
            </Link>
            <Link href="/submit-listing" onClick={() => setIsOpen(false)}>
              <Button className="w-full justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700">
                <User className="w-4 h-4" />
                Submit Listing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}