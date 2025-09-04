'use client'

import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Sparkles, Clock, Users } from 'lucide-react'
import Button from '../ui/Button'
import Container from '../ui/Container'
import Card from '../ui/Card'

const CTA: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    propertyCount: '',
    phone: '',
    location: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) setError('') // Clear error when user starts typing
  }

  const validateForm = () => {
    const { email, name, propertyCount } = formData
    if (!email || !name || !propertyCount) {
      setError('Please fill in all required fields')
      return false
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitted(true)
      setFormData({
        email: '',
        name: '',
        propertyCount: '',
        phone: '',
        location: ''
      })
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@easymypg.com',
      href: 'mailto:hello@easymypg.com',
      color: 'text-blue-500'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 98765 43210',
      href: 'tel:+919876543210',
      color: 'text-green-500'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Bhubaneswar, Odisha',
      href: '#',
      color: 'text-purple-500'
    }
  ]

  const benefits = [
    'Early access to the platform',
    'Special launch pricing (50% off)',
    'Priority customer support',
    'Free onboarding assistance',
    'Exclusive feature updates',
    'Direct feedback channel',
    'Beta testing opportunities',
    'Lifetime feature requests'
  ]

  const propertyOptions = [
    { value: '1', label: '1 Property' },
    { value: '2-5', label: '2-5 Properties' },
    { value: '6-10', label: '6-10 Properties' },
    { value: '11-25', label: '11-25 Properties' },
    { value: '25+', label: '25+ Properties' }
  ]

  if (submitted) {
    return (
      <section id="contact" className="py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary-600 rounded-full opacity-10 animate-float"></div>
          <div className="absolute bottom-20 -left-10 w-48 h-48 bg-secondary-600 rounded-full opacity-10 animate-float-delayed"></div>
        </div>

        <Container className="relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-white p-12">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Thank You for Your Interest!
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                You&apos;ve successfully joined our exclusive waitlist. We&apos;ll keep you updated 
                on our progress and notify you as soon as EasyMyPG is ready for launch.
              </p>

              <div className="bg-primary-50 rounded-2xl p-6 mb-8">
                <h3 className="font-bold text-primary-800 mb-3">What happens next?</h3>
                <div className="space-y-2 text-left text-primary-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span>Confirmation email sent to your inbox</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span>Regular updates on development progress</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span>Early access invitation when we launch</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="w-full"
                >
                  Submit Another Response
                </Button>
                <Button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  variant="primary"
                  className="w-full"
                >
                  Back to Top
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section id="contact" className="py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary-600 rounded-full opacity-10 animate-float"></div>
        <div className="absolute bottom-20 -left-10 w-48 h-48 bg-secondary-600 rounded-full opacity-10 animate-float-delayed"></div>
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="inline-flex items-center space-x-2 bg-primary-500/20 px-4 py-2 rounded-full text-sm font-medium text-primary-300 mb-6 animate-fade-in-down">
              <Sparkles className="w-4 h-4" />
              <span>Get Early Access</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
              Ready to Transform Your
              <span className="text-gradient block">Property Management?</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Join the exclusive waitlist and be among the first property owners to experience 
              the future of PG management. Get special benefits and priority access.
            </p>

            {/* Countdown Timer */}
            <div className="bg-gradient-to-r from-primary-600/20 to-secondary-600/20 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="w-5 h-5 text-primary-400" />
                <span className="text-primary-300 font-semibold">Expected Launch</span>
              </div>
              <div className="text-3xl font-bold text-white mb-2">Q4 2025</div>
              <p className="text-gray-300">Join now to secure your early access spot</p>
            </div>

            {/* Benefits */}
            <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <Users className="w-5 h-5 text-secondary-400" />
                <span>Exclusive Early Access Benefits:</span>
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300"
                  >
                    <div className="w-2 h-2 bg-secondary-400 rounded-full flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <h3 className="text-xl font-bold text-white mb-4">Questions? Get in Touch:</h3>
              {contactInfo.map((contact, index) => (
                <a 
                  key={index}
                  href={contact.href}
                  className="flex items-center space-x-4 text-gray-300 hover:text-white transition-all duration-300 group hover:translate-x-2"
                >
                  <div className={`w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110`}>
                    <contact.icon className={`w-5 h-5 ${contact.color}`} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">{contact.label}</div>
                    <div className="font-medium">{contact.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Content - Form */}
          <div className="animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <Card className="bg-white shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  Join the Waitlist
                </h3>
                <p className="text-gray-600">
                  Be the first to know when EasyMyPG launches and get exclusive early access
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-300"
                    placeholder="Enter your full name"
                    disabled={loading}
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-300"
                    placeholder="Enter your email address"
                    disabled={loading}
                  />
                </div>

                {/* Property Count */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Properties *
                  </label>
                  <select
                    value={formData.propertyCount}
                    onChange={(e) => handleInputChange('propertyCount', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-300 bg-white"
                    disabled={loading}
                  >
                    <option value="">Select number of properties</option>
                    {propertyOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Phone Field (Optional) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                    <span className="text-gray-400 font-normal"> (Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-300"
                    placeholder="Enter your phone number"
                    disabled={loading}
                  />
                </div>

                {/* Location Field (Optional) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                    <span className="text-gray-400 font-normal"> (Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-300"
                    placeholder="City, State"
                    disabled={loading}
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-xl animate-shake">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                  icon={loading ? undefined : Send}
                  iconPosition="right"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Joining Waitlist...</span>
                    </div>
                  ) : (
                    'Join the Waitlist'
                  )}
                </Button>

                {/* Privacy Note */}
                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  By joining our waitlist, you agree to receive updates about EasyMyPG. 
                  We respect your privacy and won&apos;t spam you. You can unsubscribe anytime.
                </p>
              </form>
            </Card>

            {/* Trust Indicators */}
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-xs text-gray-300">Already Interested</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-xs text-gray-300">Privacy Protected</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-white">24h</div>
                <div className="text-xs text-gray-300">Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default CTA