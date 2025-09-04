/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowRight,
  Heart,
  Smartphone,
  Shield,
  Users,
  Building2,
  Clock
} from 'lucide-react'
import Button from '../ui/Button'
import Container from '../ui/Container'

const Footer: React.FC = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ]

  const features = [
    { name: 'Tenant Management', icon: Users },
    { name: 'Mobile App', icon: Smartphone },
    { name: 'Security & Privacy', icon: Shield },
    { name: 'Property Analytics', icon: Building2 }
  ]

  const contactInfo = [
    { icon: Mail, text: 'hello@easymypg.com', href: 'mailto:hello@easymypg.com' },
    { icon: Phone, text: '+91 98765 43210', href: 'tel:+919876543210' },
    { icon: MapPin, text: 'Bhubaneswar, Odisha, India', href: '#' }
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-700' }
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary-600 rounded-full opacity-10 animate-float"></div>
        <div className="absolute bottom-20 -left-10 w-48 h-48 bg-secondary-600 rounded-full opacity-10 animate-float-delayed"></div>
      </div>

      <Container className="relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                  <img 
                    src="/logo.png" 
                    alt="EasyMyPG Logo" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <span className="text-2xl font-bold">
                  Easy<span className="text-primary-400">MyPG</span>
                </span>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                Transforming PG and hostel management with cutting-edge technology. 
                Making property management seamless, efficient, and stress-free.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-gray-300 ${social.color} hover:bg-gray-600 transition-all duration-300 transform hover:scale-110`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Quick Links</h3>
              <div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(link.href)}
                    className="block text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:translate-x-2 transform"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Key Features</h3>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 text-gray-300 hover:text-primary-400 transition-colors duration-300">
                    <feature.icon className="w-4 h-4" />
                    <span>{feature.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact & Newsletter */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Get in Touch</h3>
              
              {/* Contact Info */}
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    className="flex items-center space-x-3 text-gray-300 hover:text-primary-400 transition-colors duration-300"
                  >
                    <contact.icon className="w-5 h-5" />
                    <span>{contact.text}</span>
                  </a>
                ))}
              </div>

              {/* Newsletter Signup */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Stay Updated</h4>
                <p className="text-sm text-gray-400">
                  Get notified when we launch and receive exclusive updates.
                </p>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pre-launch Banner */}
        <div className="py-8 border-t border-gray-700">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-6 lg:p-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Clock className="w-6 h-6 text-white" />
              <span className="text-lg font-semibold text-white">Coming Soon</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Be Among the First to Experience EasyMyPG
            </h3>
            <p className="text-lg text-primary-100 mb-6 max-w-2xl mx-auto">
              Join our exclusive early access program and get priority access when we launch.
            </p>
            <Button
              onClick={() => scrollToSection('#interest')}
              variant="outline"
              size="lg"
              className="bg-white text-primary-600 border-white hover:bg-primary-50"
            >
              Show Interest
            </Button>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-gray-700">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <span>&copy; 2025 EasyMyPG. All rights reserved.</span>
              <span className="hidden lg:inline">|</span>
              <span className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>for Property Owners</span>
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-primary-400 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer