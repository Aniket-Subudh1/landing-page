'use client'

import React from 'react'
import { TrendingUp, Users, Building, Star, Clock, Shield } from 'lucide-react'
import Container from '../ui/Container'

const Stats: React.FC = () => {
  const mainStats = [
    {
      icon: Building,
      number: '500+',
      label: 'Properties Ready',
      description: 'PG and hostel owners waiting to join our platform',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: Users,
      number: '10,000+',
      label: 'Future Users',
      description: 'Tenants and property owners eager for our launch',
      color: 'from-secondary-500 to-secondary-600'
    },
    {
      icon: TrendingUp,
      number: '85%',
      label: 'Efficiency Boost',
      description: 'Expected improvement in management efficiency',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Star,
      number: '4.9/5',
      label: 'Expected Rating',
      description: 'Based on early user feedback and beta testing',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const additionalStats = [
    {
      icon: Clock,
      stat: '24/7',
      label: 'Support Ready',
      description: 'Round-the-clock customer support team'
    },
    {
      icon: Shield,
      stat: '99.9%',
      label: 'Uptime Goal',
      description: 'Reliable service you can count on'
    }
  ]

  return (
    <section className="py-12 lg:pb-16 pt-10 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <Container>
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 px-4 py-2 rounded-full text-sm font-medium text-primary-700 mb-6">
            <TrendingUp className="w-4 h-4" />
            <span>Our Impact</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Numbers That Speak
            <span className="text-gradient block">Our Commitment</span>
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            These aren&apos;t just numbers – they represent real property owners ready to transform 
            their business operations with EasyMyPG.
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {mainStats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              
              <div className="text-lg font-semibold text-gray-700 mb-3">
                {stat.label}
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {additionalStats.map((item, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-primary-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="text-4xl font-bold text-primary-400 mb-2">
                    {item.stat}
                  </div>
                  <div className="text-xl font-semibold mb-2">
                    {item.label}
                  </div>
                  <p className="text-gray-300">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 lg:p-12 text-center text-white">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4">
            Be Part of the Revolution
          </h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join hundreds of property owners who are ready to transform their PG management 
            experience with cutting-edge technology.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">Phase 1</div>
              <div className="text-white/80">Market Research</div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                <div className="bg-white h-2 rounded-full w-full"></div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">Phase 2</div>
              <div className="text-white/80">Development</div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                <div className="bg-white h-2 rounded-full w-2/5"></div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">Phase 3</div>
              <div className="text-white/80">Beta Testing</div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                <div className="bg-white h-2 rounded-full w-1/6"></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Stats