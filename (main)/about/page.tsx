import { Metadata } from 'next'
import Image from 'next/image'
import { 
  Users, 
  Award, 
  Shield, 
  Clock, 
  Car, 
  Heart, 
  Star, 
  ThumbsUp,
  Target,
  Eye,
  Sparkles,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Footer } from '@/components/footer/Footer'

export const metadata: Metadata = {
  title: 'About Us - BOXCARS',
  description: 'Learn about BOXCARS - Your trusted partner in finding the perfect car since 2015.',
}

const stats = [
  { number: '50K+', label: 'Happy Customers', icon: Users },
  { number: '98%', label: 'Satisfaction Rate', icon: Star },
  { number: '12K+', label: 'Cars Sold', icon: Car },
  { number: '4.9', label: 'Average Rating', icon: ThumbsUp },
]

const values = [
  {
    icon: Shield,
    title: 'Trust & Transparency',
    description: 'We believe in honest dealings and clear communication. Every car comes with a full history report.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Your satisfaction is our priority. We go the extra mile to find the perfect car for you.',
  },
  {
    icon: Award,
    title: 'Quality Assurance',
    description: 'Every vehicle in our inventory undergoes rigorous inspection by certified mechanics.',
  },
  {
    icon: Clock,
    title: 'Reliable Service',
    description: 'With over 10 years of experience, we provide dependable service you can count on.',
  },
]

const teamMembers = [
  {
    name: 'John Anderson',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    description: 'Former automotive engineer with 20 years of industry experience.',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Head of Sales',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    description: 'Passionate about matching people with their dream cars.',
  },
  {
    name: 'Michael Chen',
    role: 'Lead Mechanic',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    description: 'Certified master technician with 15+ years of experience.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Customer Experience',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    description: 'Dedicated to ensuring every customer has a 5-star experience.',
  },
]

const milestones = [
  { year: '2015', title: 'Founded', description: 'BOXCARS was born with a vision to revolutionize car buying' },
  { year: '2017', title: 'First Location', description: 'Opened our flagship showroom in New York City' },
  { year: '2019', title: '10,000 Cars Sold', description: 'Celebrated a major milestone in our journey' },
  { year: '2022', title: 'Online Platform', description: 'Launched our advanced digital car buying platform' },
  { year: '2024', title: 'Global Recognition', description: 'Voted Best Car Dealership in the region' },
]

export default function AboutPage() {
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
                About
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  BOXCARS
                </span>
              </h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Your trusted partner in finding the perfect car since 2015
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <AnimatedSection key={stat.label} direction="up" delay={index * 100}>
                  <div className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-3">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-3xl font-extrabold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="right">
              <div>
                <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Our Story</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                  Driven by Passion,
                  <br />
                  <span className="text-blue-600">Guided by Excellence</span>
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  BOXCARS was founded in 2015 with a simple mission: to transform the car buying experience 
                  from stressful to seamless. What started as a small dealership has grown into a trusted 
                  destination for thousands of satisfied customers.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We believe that buying a car should be exciting, not overwhelming. That's why we combine 
                  expert knowledge with cutting-edge technology to help you find the perfect vehicle for 
                  your lifestyle and budget.
                </p>
                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span className="text-sm text-gray-600">10+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span className="text-sm text-gray-600">100% Verified Listings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span className="text-sm text-gray-600">24/7 Support</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={200}>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-2xl">
                  <div className="absolute top-4 right-4 opacity-10">
                    <Car className="w-32 h-32" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-blue-100 leading-relaxed mb-6">
                    To connect people with their dream cars through transparency, trust, and exceptional service.
                  </p>
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-blue-100 leading-relaxed">
                    To become the most trusted and innovative car marketplace globally.
                  </p>
                  <div className="flex gap-4 mt-6">
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-300" />
                      <span className="text-sm text-blue-100">Quality Focus</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-blue-300" />
                      <span className="text-sm text-blue-100">Innovation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-300" />
                      <span className="text-sm text-blue-100">Excellence</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">What We Stand For</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                Our Core Values
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto mt-2">
                These principles guide everything we do at BOXCARS
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <AnimatedSection key={value.title} direction="up" delay={index * 100}>
                  <div className="group p-6 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-600 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Our Journey</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                Company Milestones
              </h2>
            </div>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-blue-200 hidden md:block" />
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <AnimatedSection 
                  key={milestone.year} 
                  direction={index % 2 === 0 ? 'right' : 'left'} 
                  delay={index * 100}
                >
                  <div className={`flex flex-col md:flex-row items-center gap-4 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
                        <span className="text-3xl font-extrabold text-blue-600">{milestone.year}</span>
                        <h3 className="text-xl font-bold text-gray-900 mt-1">{milestone.title}</h3>
                        <p className="text-gray-600 text-sm">{milestone.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center md:w-0">
                      <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-md z-10" />
                    </div>
                    
                    <div className="w-full md:w-1/2 hidden md:block" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Meet The Team</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                The People Behind BOXCARS
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto mt-2">
                Dedicated professionals committed to your car buying success
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <AnimatedSection key={member.name} direction="up" delay={index * 100}>
                <div className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-64 w-full overflow-hidden bg-gray-200">
                    <img
                      src={member.image}
                      alt={member.name}
                      
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-bold text-white">{member.name}</h3>
                      <p className="text-sm text-white/80">{member.role}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600">{member.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection direction="up">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Ready to Find Your Perfect Car?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Visit our showroom or browse our online inventory today
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg shadow-blue-500/25 px-8 py-6 text-base"
                asChild
              >
                <a href="/listings">Browse Cars</a>
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-base"
                asChild
              >
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </>
  )
}