'use client'

import React, { useState } from 'react'
import { NotebookPen } from 'lucide-react'


import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

const Container = ({ children, className = "" }: ContainerProps) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
)

const Features = () => {
  const features = [
    {
      title: 'Full Floor Plan in Your Pocket',
      description: 'Instantly see every room and bed on your phone. No need to remember sharing types.',
    },
    {
      title: 'Live Status of Tenants',
      description: 'Know which beds are filled, vacant, or under notice in real time.',
    },
    {
      title: 'Real-time room status updates',
      description: 'Real-time update of filled, vacant, under notice rooms & beds',
    },
    {
      title: 'Allot or block Room & bed in one click',
      description: 'Simplify room and bed assignments in one step',
    },
  ]


  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="features" className="py-16 lg:py-20 relative overflow-visible">
      <div
        aria-hidden
        className="absolute inset-x-0 top-6 flex justify-center pointer-events-none"
      >
        <div
          className="w-[370px] lg:w-[1500px] sm:w-[700px] max-w-[1400px] h-[1080px] sm:h-[1150px] lg:h-[820px] rounded-3xl"
          style={{
            boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
            background:
              'linear-gradient(135deg, #2e0730 0%, #350d36 20%, #4a154b 45%, #1a0520 85%)',
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-regular text-white mb-4 leading-tight">
            "No tracking, no tension. Har room ka status phone pe."
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4">
           Forget running behind registers, Excel sheets, or calling wardens. Now you can see which rooms are filled, vacant, or under notice
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[50vh]">
          {/* Image section */}
          <div className="w-full flex justify-center lg:justify-start order-1 lg:order-2">
            <div className="w-full max-w-[320px] sm:max-w-[480px] lg:max-w-[720px] rounded-3xl overflow-hidden">
              <img
                src="kk.avif"
                alt="app mockup"
                className="w-full h-auto block"
                style={{ display: 'block' }}
              />
            </div>
          </div>

          <div className="w-full space-y-4 lg:space-y-6 max-w-xl mx-auto lg:mx-0 order-2 lg:order-1 px-4 lg:px-0">
            {features.map((feature, i) => {
              const isHovered = i === hoveredIndex
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredIndex(null)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`
                    group w-full text-left flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl transition-all duration-300 cursor-pointer
                    ${isHovered
                      ? 'bg-white shadow-[0_20px_40px_rgba(80,0,100,0.12)] scale-[1.01]'
                      : 'bg-transparent hover:bg-white hover:shadow-[0_20px_40px_rgba(80,0,100,0.12)] hover:scale-[1.01]'}
                    `}
                  style={{
                    border: isHovered ? 'none' : '1px solid rgba(205, 169, 236, 0.12)',
                    backdropFilter: isHovered ? undefined : 'blur(6px)',
                  }}
                >
                  {/* icon box */}
                  <div
                    className={`
                      flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300
                      ${isHovered || 'group-hover:bg-gradient-to-br group-hover:from-[#D9B8FF] group-hover:to-[#A06BDA]'}
                      ${isHovered ? 'bg-gradient-to-br from-[#D9B8FF] to-[#A06BDA]' : 'bg-[#2b0b2f] border border-[rgba(255,255,255,0.04)]'}
                      `}
                  >
                    <NotebookPen
                      className={`
                        w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300
                        ${isHovered || 'group-hover:text-white'}
                        ${isHovered ? 'text-white' : 'text-[#E9D7FF]'}
                      `}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-sm sm:text-base font-semibold leading-snug transition-colors duration-300 ${
                        isHovered || 'group-hover:text-[#3b0b4b]'
                      } ${
                        isHovered ? 'text-[#3b0b4b]' : 'text-white'
                      }`}
                    >
                      {feature.title}
                    </h3>
                    <p className={`mt-2 text-xs sm:text-sm transition-colors duration-300 ${
                      isHovered || 'group-hover:text-gray-600'
                    } ${isHovered ? 'text-gray-600' : 'text-gray-300'}`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Features