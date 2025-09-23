'use client'

import React, { useState, useEffect, useRef } from 'react'
import { X, Check } from 'lucide-react'
import { motion } from 'framer-motion'

const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.disconnect()
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return [ref, isInView] as const
}

const AnimatedText = ({ text, inView }: { text: string; inView: boolean }) => {
  const words = text.split(' ')
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const child = {
    hidden: {
      opacity: 0,
      x: 20,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.h1
      className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-medium text-[#2e0730] mb-4 md:mb-6 leading-tight"
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block mr-2"
          style={{ willChange: 'transform, filter, opacity' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  )
}

const PGComparison: React.FC = () => {
  const [headerRef, headerInView] = useInView()
  const [traditionalRef, traditionalInView] = useInView()
  const [smartRef, smartInView] = useInView()
  const [listItemsRef, listItemsInView] = useInView()

  const traditionalProblems = [
    "Knock on doors, endless calls & WhatsApp follow-ups",
    "Manual registers (Bahi-Khata), time-consuming & error-prone", 
    "Low rent collection rate, more spam calls & delays",
    "No digital branding, just plain & common property look",
    "Tenants face poor experience: everything via calls/WhatsApp",
    "Difficult to track vacant, filled, or under notice rooms",
    "No proper record of room sharing types, facilities, or photos",
    "Rent reminders depend on memory, risk of missed payments"
  ]

  const smartSolutions = [
    "Fast digital rent & bill collection with a few taps",
    "24/7 digital accountant – track income, expenses, dues",
    "Higher conversions with smart reminders & follow-ups",
    "Smart Tenant App for payments, complaints in one place",
    "Real-time status of filled, vacant & under notice rooms/beds",
    "Payment links, bulk WhatsApp reminders handling built-in",
    "Rent Collected On Time , every Time",
    "Centralized details of room type, rent, facilities & photos"
  ]

  return (
    <section className="py-8 md:py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-32 left-20 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div 
          ref={headerRef}
          className="text-center mb-12 md:mb-16"
        >
          <AnimatedText 
            text="Why rent like 1990s when you are in 2025?" 
            inView={headerInView} 
          />
          <motion.p 
            className="text-lg sm:text-xl lg:text-2xl font-light text-gray-600 font-medium"
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={headerInView ? { 
              opacity: 1, 
              y: 0, 
              filter: 'blur(0px)',
              transition: {
                duration: 0.6,
                delay: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            } : { opacity: 0, y: 20, filter: 'blur(6px)' }}
          >
            Upgrade to 2025: rent on time, no jhik-jhik, no Excel, no stress.
          </motion.p>
        </div>

        {/* Comparison Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 relative">
          {/* Dividing Line */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="hidden lg:block w-px h-full bg-gradient-to-b from-transparent via-[#2e0730] to-transparent opacity-30"></div>
            <div className="lg:hidden w-full h-px bg-gradient-to-r from-transparent via-[#2e0730] to-transparent opacity-30"></div>
          </div>

          {/* Traditional PG Section */}
          <motion.div 
            ref={traditionalRef}
            className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg border border-gray-200/50 relative overflow-hidden"
            initial={{ opacity: 0, x: -50, filter: 'blur(6px)' }}
            animate={traditionalInView ? { 
              opacity: 1, 
              x: 0, 
              filter: 'blur(0px)',
              transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            } : { opacity: 0, x: -50, filter: 'blur(6px)' }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            
            <div className="relative z-10">
              <motion.img
                src="sss.png"
                alt="Traditional PG platforms"
                className="w-full max-w-lg mx-auto mb-6 md:mb-8 object-contain rounded-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={traditionalInView ? {
                  scale: 1,
                  opacity: 1,
                  transition: { duration: 0.6, delay: 0.2 }
                } : { scale: 0.8, opacity: 0 }}
              />

              <div className="text-center mb-6 md:mb-8">
                <motion.div 
                  className="inline-block bg-[#2e0730] text-white px-4 md:px-5 py-2 rounded-full text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  initial={{ y: 20, opacity: 0 }}
                  animate={traditionalInView ? {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.5, delay: 0.4 }
                  } : { y: 20, opacity: 0 }}
                >
                  Normal using Pg
                </motion.div>
              </div>

              {/* Problems list */}
              <div ref={listItemsRef} className="space-y-4 md:space-y-5">
                {traditionalProblems.map((problem, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start space-x-3 md:space-x-4 hover:translate-x-2 transition-transform duration-300"
                    initial={{ opacity: 0, x: 30, filter: 'blur(4px)' }}
                    animate={listItemsInView ? {
                      opacity: 1,
                      x: 0,
                      filter: 'blur(0px)',
                      transition: {
                        duration: 0.4,
                        delay: 0.6 + index * 0.08,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }
                    } : { opacity: 0, x: 30, filter: 'blur(4px)' }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <X className="w-4 h-4 text-red-500 font-bold" />
                    </div>
                    <p className="text-gray-800 leading-relaxed font-medium text-sm md:text-base underline decoration-red-600 hover:decoration-red-800 transition-colors duration-200">{problem}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Smart PG Section */}
          <motion.div 
            ref={smartRef}
            className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg border border-gray-200/50 relative overflow-hidden"
            initial={{ opacity: 0, x: 50, filter: 'blur(6px)' }}
            animate={smartInView ? { 
              opacity: 1, 
              x: 0, 
              filter: 'blur(0px)',
              transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            } : { opacity: 0, x: 50, filter: 'blur(6px)' }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-green-100 rounded-full -translate-y-16 -translate-x-16 opacity-50"></div>

            <div className="relative z-10">
              <motion.img
                src="dsd.png"
                alt="EasyMyPG Icon"
                className="w-full max-w-lg mx-auto mb-6 md:mb-8 object-contain rounded-2xl hover:scale-105 transition-transform duration-300"
                initial={{ scale: 0.8, opacity: 0, rotateY: 180 }}
                animate={smartInView ? {
                  scale: 1,
                  opacity: 1,
                  rotateY: 0,
                  transition: { duration: 0.8, delay: 0.3 }
                } : { scale: 0.8, opacity: 0, rotateY: 180 }}
              />

              <div className="text-center mb-6 md:mb-8">
                <motion.div 
                  className="inline-block bg-[#2e0730] text-white px-4 md:px-5 py-2 rounded-full text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  initial={{ y: 20, opacity: 0 }}
                  animate={smartInView ? {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.5, delay: 0.5 }
                  } : { y: 20, opacity: 0 }}
                >
                  Smart PG using EasymyPg
                </motion.div>
              </div>

              {/* Solutions list */}
              <div className="space-y-4 md:space-y-5">
                {smartSolutions.map((solution, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start space-x-3 md:space-x-4 hover:translate-x-2 transition-transform duration-300"
                    initial={{ opacity: 0, x: -30, filter: 'blur(4px)' }}
                    animate={smartInView ? {
                      opacity: 1,
                      x: 0,
                      filter: 'blur(0px)',
                      transition: {
                        duration: 0.4,
                        delay: 0.7 + index * 0.08,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }
                    } : { opacity: 0, x: -30, filter: 'blur(4px)' }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <Check className="w-4 h-4 text-green-500 font-bold" />
                    </div>
                    <p className="text-gray-800 leading-relaxed font-medium text-sm md:text-base underline decoration-green-600 hover:decoration-green-800 transition-colors duration-200">{solution}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default PGComparison