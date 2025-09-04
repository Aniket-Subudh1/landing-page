'use client'

import React from 'react'
import { Target, Heart, Zap, Award, Users2, Building2 } from 'lucide-react'
import Container from '../ui/Container'
import Card from '../ui/Card'

const About: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To revolutionize property management by providing intuitive, comprehensive digital solutions that eliminate manual processes and boost operational efficiency.',
      color: 'text-primary-600'
    },
    {
      icon: Heart,
      title: 'Our Vision',
      description: 'Creating a world where property management is seamless, transparent, and stress-free for both owners and tenants through cutting-edge technology.',
      color: 'text-red-500'
    },
    {
      icon: Zap,
      title: 'Our Values',
      description: 'Innovation, reliability, and customer success drive everything we do. We believe in building lasting relationships through exceptional service.',
      color: 'text-secondary-600'
    }
  ]

  const stats = [
    { icon: Building2, number: '500+', label: 'PGs Ready to Join' },
    { icon: Users2, number: '10K+', label: 'Tenants to Benefit' },
    { icon: Award, number: '99.9%', label: 'Uptime Guarantee' },
  ]

  const team = [
    {
      name: 'Development Team',
      role: 'Full-Stack Engineers',
      description: 'Expert developers with years of experience in property tech and mobile applications.'
    },
    {
      name: 'Product Team',
      role: 'UX/UI Designers',
      description: 'Creative minds focused on delivering intuitive and beautiful user experiences.'
    },
    {
      name: 'Business Team',
      role: 'Industry Experts',
      description: 'Property management veterans who understand the real challenges owners face.'
    }
  ]

  return (
    <section id="about" className="py-12 lg:pb-16 pt-10 bg-white">
      <Container>
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary-100 px-4 py-2 rounded-full text-sm font-medium text-secondary-700 mb-6">
            <Heart className="w-4 h-4" />
            <span>About EasyMyPG</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Built by Property Experts,
            <span className="text-gradient block">For Property Owners</span>
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            We understand the challenges of managing PGs and hostels because we&apos;ve been there. 
            EasyMyPG is born from real-world experience and a passion for solving genuine problems.
          </p>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {values.map((value, index) => (
            <Card key={index} hover gradient className="text-center">
              <div className={`w-16 h-16 ${value.color} bg-opacity-10 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <value.icon className={`w-8 h-8 ${value.color}`} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {value.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 lg:p-12 mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Make an Impact
            </h3>
            <p className="text-xl text-gray-300">
              Join the growing community of forward-thinking property owners
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-primary-400 mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Why Property Owners Choose EasyMyPG
            </h3>
            
            <div className="space-y-6">
              {[
                {
                  title: 'Industry Experience',
                  description: 'Built by professionals who understand property management inside and out.'
                },
                {
                  title: 'Technology First',
                  description: 'Modern, mobile-first approach that works seamlessly across all devices.'
                },
                {
                  title: 'Scalable Solution',
                  description: 'Whether you manage 1 property or 100, our platform grows with your business.'
                },
                {
                  title: 'Dedicated Support',
                  description: '24/7 customer support to ensure your operations never skip a beat.'
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-primary-100 rounded-2xl p-6 transform -rotate-3">
                  <h4 className="font-bold text-primary-800 mb-2">Mobile First</h4>
                  <p className="text-sm text-primary-700">Native Android apps for seamless experience</p>
                </div>
                <div className="bg-secondary-100 rounded-2xl p-6 transform rotate-2">
                  <h4 className="font-bold text-secondary-800 mb-2">Secure</h4>
                  <p className="text-sm text-secondary-700">Bank-grade security for your data</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-blue-100 rounded-2xl p-6 transform rotate-3">
                  <h4 className="font-bold text-blue-800 mb-2">Reliable</h4>
                  <p className="text-sm text-blue-700">99.9% uptime guarantee</p>
                </div>
                <div className="bg-purple-100 rounded-2xl p-6 transform -rotate-1">
                  <h4 className="font-bold text-purple-800 mb-2">Scalable</h4>
                  <p className="text-sm text-purple-700">Grows with your business</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12">
            Meet Our Expert Team
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} hover gradient className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(' ')[0][0]}
                  </span>
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h4>
                
                <div className="text-primary-600 font-semibold mb-4">
                  {member.role}
                </div>
                
                <p className="text-gray-600 leading-relaxed">
                  {member.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default About