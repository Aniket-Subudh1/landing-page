'use client'

import React from 'react'
import { ArrowRight, Play, Smartphone, Users, Shield, TrendingUp } from 'lucide-react'
import Button from '../ui/Button'
import Container from '../ui/Container'

const Hero: React.FC = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-1/2 -left-10 w-48 h-48 bg-secondary-200 rounded-full opacity-20 animate-float-delayed"></div>
        <div className="absolute bottom-20 right-1/3 w-32 h-32 bg-primary-300 rounded-full opacity-30 animate-bounce-slow"></div>
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen py-20">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-secondary-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-md animate-fade-in-down">
              <TrendingUp className="w-4 h-4 text-primary-600" />
              <span>Coming Soon - Join the Revolution</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight animate-fade-in-up">
                <span className="text-gray-900">Transform Your</span>
                <br />
                <span className="text-gradient">PG / HOSTEL Management</span>
                <br />
                <span className="text-gray-900">Experience</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-800 max-w-2xl leading-relaxed animate-fade-in-up font-light tracking-wide" style={{ animationDelay: '0.2s', fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif' }}>
                Say goodbye to manual processes and embrace the future of property management with EasyMyPG - the complete digital solution for PG and hostel owners.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {[
                { icon: Users, text: 'Tenant Management' },
                { icon: Smartphone, text: 'Mobile First' },
                { icon: Shield, text: 'Secure & Reliable' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
                  <feature.icon className="w-4 h-4 text-primary-600" />
                  <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Button 
                onClick={() => scrollToSection('#features')}
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
              >
                Explore Features
              </Button>
              
              <Button 
                onClick={() => scrollToSection('#about')}
                variant="outline"
                size="lg"
                icon={Play}
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              {[
                { number: '100+', label: 'PG Owners Interested' },
                { number: '24/7', label: 'Support Ready' },
                { number: '99%', label: 'Uptime Guaranteed' }
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-primary-600">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - App Preview */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <div className="relative z-10">
              {/* Phone Mockup */}
              <div className="relative mx-auto w-72 h-[600px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="bg-primary-500 h-12 flex items-center justify-between px-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                    <span className="text-white text-xs font-medium">12:22</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-2 border border-white rounded-sm"></div>
                    </div>
                  </div>
                  
                  {/* App Content Preview */}
                  <div className="p-4 bg-gradient-to-br from-primary-50 to-secondary-50 h-full">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-bold text-gray-900">Welcome to EasyMyPG</h3>
                      <p className="text-sm text-gray-600">Property Management Made Easy</p>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Dashboard Cards */}
                      <div className="bg-white rounded-xl p-4 shadow-md">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-600">Total Collection</div>
                            <div className="text-xl font-bold text-primary-600">₹8,99,450</div>
                          </div>
                          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-primary-600" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-xl p-4 shadow-md">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-600">Active Tenants</div>
                            <div className="text-xl font-bold text-secondary-600">124</div>
                          </div>
                          <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-secondary-600" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-xl p-4 shadow-md">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-600">Available Rooms</div>
                            <div className="text-xl font-bold text-gray-900">12</div>
                          </div>
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <Shield className="w-6 h-6 text-gray-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <div className="inline-flex bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                        Coming Soon
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary-200 rounded-2xl opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-200 rounded-full opacity-60 animate-bounce"></div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Hero