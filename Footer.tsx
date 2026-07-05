import Link from 'next/link'
import { 
  Car, 
  Mail, 
  Phone, 
  MapPin,
  // Use these exact icon names - they exist in lucide-react
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react'

const socialLinks = [
 { name: 'Facebook', icon: 'f', href: '#' },
  { name: 'Twitter', icon: 't', href: '#' },
  { name: 'Instagram', icon: 'i', href: '#' },
  { name: 'Youtube', icon: 'y', href: '#' }
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <Car className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-extrabold">
                <span className="text-white">BOX</span>
                <span className="text-blue-400">CARS</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Find your perfect car from thousands of new and used vehicles. Trusted by 50,000+ customers.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-sm">info@boxcars.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-sm">123 Auto Drive, NYC 10001</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/listings" className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">
                  Listings
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Buyers Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              For Buyers
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/listings?condition=new" className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">
                  New Cars
                </Link>
              </li>
              <li>
                <Link href="/listings?condition=used" className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">
                  Used Cars
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">
                  Compare Vehicles
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">
                  Shipping
                </Link>
              </li>
            </ul>
          </div>

          {/* For Sellers Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              For Sellers
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/submit-listing" className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">
                  Submit Listing
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/dealer" className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">
                  Dealer Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest deals and updates.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} BOXCARS. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}