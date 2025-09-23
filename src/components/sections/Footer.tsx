/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

const HeroCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.3, 
        rootMargin: '0px 0px -100px 0px' 
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="w-full px-4 md:px-6 mt-10 mb-20 lg:px-10">
    
      <div className="relative mx-auto max-w-[1400px] h-[400px] sm:h-[450px] lg:h-[500px] rounded-[28px] bg-[#1A0422] text-white overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0">
      
          <div className="px-6 sm:px-10 lg:px-16 py-8 sm:py-12 lg:py-20 relative z-20">
            <h1
              className={`font-semibold tracking-tight leading-[0.95]
                          text-[32px] sm:text-[42px] md:text-[52px] lg:text-[50px]
                          transition-all duration-1000 ease-out
                          ${isVisible 
                            ? 'opacity-100 translate-y-0 blur-0' 
                            : 'opacity-0 translate-y-8 blur-sm'
                          }`}
              style={{ 
                letterSpacing: '-0.02em',
                transitionDelay: '0.2s'
              }}
            >
              Join Today with 500+ <br className="hidden md:block" />
              PG Owner for Access
            </h1>

            <p 
              className={`mt-4 sm:mt-6 text-[16px] sm:text-[18px] lg:text-[20px] text-[#CBB9D6]
                         transition-all duration-1000 ease-out
                         ${isVisible 
                           ? 'opacity-100 translate-y-0 blur-0' 
                           : 'opacity-0 translate-y-6 blur-sm'
                         }`}
              style={{ transitionDelay: '0.4s' }}
            >
              Upgrade to 2025: rent on time, no jhik-jhik, no Excel, no stress.
            </p>

            <div 
              className={`mt-6 sm:mt-8 transition-all duration-1000 ease-out
                         ${isVisible 
                           ? 'opacity-100 translate-y-0 blur-0' 
                           : 'opacity-0 translate-y-4 blur-sm'
                         }`}
              style={{ transitionDelay: '0.6s' }}
            >
              <Link href="/waitlist" rel="noopener noreferrer">
                <button
                  className="group inline-flex relative z-50 items-center gap-2 rounded-[12px]
                             bg-[#F9C300] px-6 py-3 text-[#1A0422] font-semibold
                             shadow-[0_6px_20px_rgba(249,195,0,0.35)]
                             hover:translate-y-[-1px] transition-transform
                             touch-manipulation"
                  style={{ 
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation'
                  }}
                >
                  Get the Beta Access
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div className="relative min-h-[200px] sm:min-h-[300px] lg:min-h-[520px] z-10">
            {/* Background blur elements with lower z-index */}
            <div className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[#F9C300] opacity-[0.08] blur-3xl z-0" />
            <div className="absolute -right-10 bottom-0 h-[380px] w-[380px] rounded-full bg-[#7A3DFF] opacity-[0.15] blur-3xl z-0" />

            <img
              src="sasa.avif"
              alt="EasyMyPG App"
              className={`absolute z-5 right-[-10%] sm:right-[10%] lg:right-[0%]
                          bottom-[-70px] sm:bottom-[-100px] lg:bottom-[-250px]
                          w-[320px] sm:w-[380px] md:w-[280px] lg:w-[1200px] xl:w-[1400px]
                          rotate-[10deg]
                          drop-shadow-[0_16px_40px_rgba(0,0,0,0.45)]
                          transition-all duration-1200 ease-out
                          ${isVisible 
                            ? 'opacity-100 translate-x-0 rotate-[10deg] blur-0' 
                            : 'opacity-0 translate-x-8 rotate-[5deg] blur-sm'
                          }`}
              style={{ transitionDelay: '0.8s' }}
              draggable={false}
            />
          </div>
        </div>

        {/* Overlay container */}
        <div className="pointer-events-none absolute inset-0 z-0"></div>
      </div>
    </section>
  )
}

export default HeroCTA