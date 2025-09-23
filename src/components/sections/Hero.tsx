'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const Hero: React.FC = () => {
  const [animationStage, setAnimationStage] = useState(0)
  const [visibleWords1, setVisibleWords1] = useState(0)
  const [visibleWords2, setVisibleWords2] = useState(0)
  const [visibleWords3, setVisibleWords3] = useState(0)

  const headingWords = ["From", "Rent", "to", "Records", "India's", "Easiest", "PG", "App."]
  const subtitleWords = ["Rent", "Collection,", "Tenant", "Onboarding,", "Room", "Allocation,", "Bills", "Ledas", "-", "it's", "all", "here.", "Ditch", "the", "spreadsheets", "and", "WhatsApp", "chaos.", "Manage", "&", "Grow", "your", "PG,", "Hostel,", "or", "Co-Living", "with", "EasyMyPG."]
  const bottomWords = ["Already", "500+", "PGs", "on", "the", "waitlist.", "Don't", "miss", "your", "spot."]

  useEffect(() => {
 
    setAnimationStage(1)

   
    const headingTimer = setTimeout(() => {
      setAnimationStage(2)
      const headingInterval = setInterval(() => {
        setVisibleWords1(prev => {
          if (prev >= headingWords.length) {
            clearInterval(headingInterval)
            return prev
          }
          return prev + 1
        })
      }, 120)
    }, 400)

   
    const subtitleTimer = setTimeout(() => {
      setAnimationStage(3)
      const subtitleInterval = setInterval(() => {
        setVisibleWords2(prev => {
          if (prev >= subtitleWords.length) {
            clearInterval(subtitleInterval)
            return prev
          }
          return prev + 1
        })
      }, 60)
    }, 1200)

   
    const bottomTimer = setTimeout(() => {
      setAnimationStage(4)
      const bottomInterval = setInterval(() => {
        setVisibleWords3(prev => {
          if (prev >= bottomWords.length) {
            clearInterval(bottomInterval)
            setAnimationStage(5) 
            return prev
          }
          return prev + 1
        })
      }, 100)
    }, 3000)

    return () => {
      clearTimeout(headingTimer)
      clearTimeout(subtitleTimer) 
      clearTimeout(bottomTimer)
    }
  }, [])

  const styles = `
    @keyframes badgePulse {
      0% { transform: scale(0.8) rotateY(-180deg); opacity: 0; }
      50% { transform: scale(1.05) rotateY(0deg); opacity: 0.8; }
      100% { transform: scale(1) rotateY(0deg); opacity: 1; }
    }

    @keyframes wordSlideIn {
      0% { 
        transform: translateX(-30px) translateY(-15px) scale(0.7); 
        opacity: 0; 
        filter: blur(6px);
      }
      60% { 
        transform: translateX(3px) translateY(-1px) scale(1.05); 
        opacity: 0.9; 
        filter: blur(1px);
      }
      100% { 
        transform: translateX(0) translateY(0) scale(1); 
        opacity: 1; 
        filter: blur(0px);
      }
    }

    @keyframes wordSlideInSubtle {
      0% { 
        transform: translateY(20px) scale(0.95); 
        opacity: 0; 
        filter: blur(3px);
      }
      70% { 
        transform: translateY(-1px) scale(1.01); 
        opacity: 0.95; 
        filter: blur(0.5px);
      }
      100% { 
        transform: translateY(0) scale(1); 
        opacity: 1; 
        filter: blur(0px);
      }
    }

    @keyframes bottomWordFloat {
      0% { 
        transform: translateY(15px) rotateX(60deg); 
        opacity: 0; 
        filter: blur(4px);
      }
      50% { 
        transform: translateY(-3px) rotateX(20deg); 
        opacity: 0.8; 
        filter: blur(1px);
      }
      100% { 
        transform: translateY(0) rotateX(0deg); 
        opacity: 1; 
        filter: blur(0px);
      }
    }

    @keyframes joinNowGlow {
      0% { 
        transform: scale(0.7) rotate(-3deg); 
        opacity: 0; 
        box-shadow: 0 0 0 rgba(255, 204, 17, 0);
        filter: blur(3px);
      }
      50% { 
        transform: scale(1.05) rotate(1deg); 
        opacity: 0.9; 
        box-shadow: 0 0 25px rgba(255, 204, 17, 0.5);
        filter: blur(0.5px);
      }
      100% { 
        transform: scale(1) rotate(0deg); 
        opacity: 1; 
        box-shadow: 0 0 15px rgba(255, 204, 17, 0.3);
        filter: blur(0px);
      }
    }

    @keyframes watchDemoSlide {
      0% { 
        transform: translateX(20px) scale(0.8); 
        opacity: 0; 
        filter: blur(2px);
      }
      60% { 
        transform: translateX(-2px) scale(1.02); 
        opacity: 0.9; 
        filter: blur(0.5px);
      }
      100% { 
        transform: translateX(0) scale(1); 
        opacity: 1; 
        filter: blur(0px);
      }
    }

    @keyframes newBadgeRotate {
      0% { 
        transform: rotate(-120deg) scale(0); 
        opacity: 0; 
      }
      50% { 
        transform: rotate(5deg) scale(1.1); 
        opacity: 0.9; 
      }
      100% { 
        transform: rotate(0deg) scale(1); 
        opacity: 1; 
      }
    }

    .badge-animated {
      animation: badgePulse 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
    }

    .word-animated {
      animation: wordSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    .word-animated-subtitle {
      animation: wordSlideInSubtle 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }

    .word-animated-bottom {
      animation: bottomWordFloat 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }

    .join-now-animated {
      animation: joinNowGlow 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
    }

    .watch-demo-animated {
      animation: watchDemoSlide 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    .new-badge-animated {
      animation: newBadgeRotate 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
    }

    .word-hidden {
      opacity: 0;
      transform: translateX(-30px);
    }
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <section id="home" className="min-h-screen relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full md:max-w-[1500px] md:max-h-[860px] md:-mt-[245px] md:rounded-3xl 
            [background:linear-gradient(145deg,#ffdbe1_0%,#fff1bd_40%,#fff1bd_60%,#ffcb0f_100%)]">
          </div>
        </div>

        <div className="relative z-10 top-10 flex flex-col items-center justify-center text-center px-4 py-16 max-w-7xl mx-auto">

          {/* Badge */}
          <div className={`inline-flex items-center border border-gray-400 text-[#240029] px-4 py-1.5 rounded-full text-sm font-medium mb-8 shadow-sm ${animationStage >= 1 ? 'badge-animated' : 'opacity-0'}`}>
            <span className={`bg-[#240029] text-white px-2 py-0.5 rounded-full text-xs font-bold mr-2 ${animationStage >= 1 ? 'new-badge-animated' : 'opacity-0'}`}
              style={{ animationDelay: '0.2s' }}>
              NEW
            </span>
            567+ PGs Onboarded Already.
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-inter-semibold text-[#240029] leading-tight mb-6">
            <span className="inline-block">
              {headingWords.slice(0, 4).map((word, index) => (
                <span
                  key={index}
                  className={`inline-block mr-3 ${index < visibleWords1 ? 'word-animated' : 'word-hidden'}`}
                  style={{ 
                    animationDelay: `${index * 0.12}s`,
                    animationFillMode: 'both'
                  }}
                >
                  {word}
                </span>
              ))}
            </span>
            <br />
            <span className="inline-block">
              {headingWords.slice(4).map((word, index) => (
                <span
                  key={index + 4}
                  className={`inline-block mr-3 ${(index + 4) < visibleWords1 ? 'word-animated' : 'word-hidden'}`}
                  style={{ 
                    animationDelay: `${(index + 4) * 0.12}s`,
                    animationFillMode: 'both'
                  }}
                >
                  {word}
                </span>
              ))}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-lg text-[#290029ad] font-medium max-w-4xl mx-auto leading-relaxed mb-10">
            {subtitleWords.map((word, index) => (
              <span
                key={index}
                className={`inline-block mr-1 ${index < visibleWords2 ? 'word-animated-subtitle' : 'word-hidden'}`}
                style={{ 
                  animationDelay: `${index * 0.06}s`,
                  animationFillMode: 'both'
                }}
              >
                {word}{' '}
              </span>
            ))}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row gap-2 sm:gap-4 justify-center mb-6 w-full max-w-md sm:max-w-none mx-auto">
            <button 
              className={`flex-1 sm:flex-none px-4 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 whitespace-nowrap ${animationStage >= 5 ? 'join-now-animated' : 'opacity-0'}`}
              style={{
                backgroundColor: 'rgb(255, 204, 17)',
                color: 'black',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(41, 0, 41, 0.2)',
                borderRadius: '8px',
                boxShadow: 'rgba(32, 0, 36, 0.05) 0px 1px 2px 0px, rgba(255, 255, 255, 0.4) 0px 10px 24px -10px inset',
                animationDelay: '0.1s',
                animationFillMode: 'both'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(36, 0, 41)'
                e.currentTarget.style.color = 'rgb(255, 255, 153)'
                e.currentTarget.style.transform = 'scale(1.05) rotate(1deg)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(255, 204, 17)'
                e.currentTarget.style.color = 'black'
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
              }}
            >
              Get Early Access
            </button>
            <button className={`flex-1 sm:flex-none bg-white text-black px-4 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-300 transition-colors duration-300 shadow-md whitespace-nowrap ${animationStage >= 5 ? 'watch-demo-animated' : 'opacity-0'}`}
              style={{ 
                animationDelay: '0.3s',
                animationFillMode: 'both'
              }}>
              Watch Demo
            </button>
          </div>

          {/* Bottom Text */}
          <div className="flex items-center text-gray-900 text-[10px] md:text-sm font-light mb-14">
            <span className="mr-2">🚀</span>
            {bottomWords.map((word, index) => (
              <span
                key={index}
                className={`inline-block mr-1 ${index < visibleWords3 ? 'word-animated-bottom' : 'word-hidden'}`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                {word}{' '}
              </span>
            ))}
            <span 
              className={`ml-2 font-bold cursor-pointer  inline-block ${visibleWords3 >= bottomWords.length ? 'join-now-animated' : 'word-hidden'}`}
              style={{ 
                animationDelay: '1.2s',
                animationFillMode: 'both'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) rotate(-2deg)'
                e.currentTarget.style.color = '#ffcc11'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
                e.currentTarget.style.color = 'inherit'
              }}
            >
              Join Now →
            </span>
          </div>

        
          <div className="w-full max-w-[965px] mx-auto">
            <div className="relative bg-purple-50 bg-opacity-90 backdrop-blur-sm rounded-3xl p-2 md:p-2 overflow-hidden [mask-image:linear-gradient(to_bottom,black_70%,transparent_90%)] 
                    [mask-repeat:no-repeat] [mask-size:100%]">

           
              <div className="text-center">
                <Image
                  src="/ph.avif"
                  alt="phone"
                  width={950}
                  height={10}
                  className="rounded-2xl object-center border max-w-full border-gray-300 
                    [mask-image:linear-gradient(to_bottom,black_90%,transparent_90%)] 
                    [mask-repeat:no-repeat] [mask-size:100%]"
                />
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero