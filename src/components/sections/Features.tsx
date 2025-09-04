'use client'

import React from 'react'
import { Users, CreditCard, Shield, Bell, BarChart3, Clock, Home, CheckCircle } from 'lucide-react'
import Container from '../ui/Container'
import Card from '../ui/Card'

const Features: React.FC = () => {
  const mainFeatures = [
    {
      icon: Users,
      title: 'Tenant Management',
      description: 'Complete tenant lifecycle management from onboarding to checkout with digital profiles and documentation.',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: CreditCard,
      title: 'Payment Processing',
      description: 'Automated rent collection, payment reminders, and financial tracking with multiple payment options.',
      gradient: 'from-primary-500 to-primary-600'
    },
    {
      icon: Home,
      title: 'Room Management',
      description: 'Efficiently manage room assignments, availability, maintenance schedules, and occupancy rates.',
      gradient: 'from-secondary-500 to-secondary-600'
    },
    {
      icon: Shield,
      title: 'Security & Verification',
      description: 'Advanced verification system with document management and background check integration.',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights into occupancy rates, revenue trends, and operational efficiency metrics.',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Real-time alerts for payments, maintenance requests, check-ins/outs, and important updates.',
      gradient: 'from-red-500 to-red-600'
    }
  ]

  const additionalFeatures = [
    'Multi-property management',
    'Staff access controls',
    'Maintenance tracking',
    'Expense management',
    'Automated reports',
    'Mobile app access',
    '24/7 cloud backup',
    'API integrations'
  ]

  return (
    <section id="features" className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
      <Container>
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 px-4 py-2 rounded-full text-sm font-medium text-primary-700 mb-6">
            <CheckCircle className="w-4 h-4" />
            <span>Powerful Features</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to
            <span className="text-gradient block">Manage Your PG</span>
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            From tenant onboarding to financial management, EasyMyPG provides all the tools 
            you need to run your property business efficiently and profitably.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <Card key={index} hover className="text-center group">
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 lg:p-12 text-white">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-6">
                Plus Many More Features
              </h3>
              <p className="text-xl opacity-90 mb-8">
                Our comprehensive platform includes everything you need to modernize your PG management operations.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {additionalFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                    <span className="text-white/90">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="text-center">
                  <Clock className="w-16 h-16 text-white mx-auto mb-6 animate-pulse" />
                  <h4 className="text-2xl font-bold mb-4">Coming Soon</h4>
                  <p className="text-white/80 mb-6">
                    Be among the first to experience the future of PG management.
                  </p>
                  <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                    <div className="text-sm text-white/70">Expected Launch</div>
                    <div className="text-2xl font-bold">Q2 2024</div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/10 rounded-2xl animate-float-delayed"></div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Features