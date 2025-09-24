'use client'
import Link from 'next/link'
import React, { useMemo } from 'react'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

const Hero: React.FC = () => {

  const headingWords = useMemo(() => 
    ["From", "Rent", "to", "Records", "India's", "Easiest", "PG", "App."], []
  );
  
  const subtitleWords = useMemo(() => 
    ["Rent", "Collection,", "Tenant", "Onboarding,", "Room", "Allocation,", "Bills", "Ledas", "-", "it's", "all", "here.", "Ditch", "the", "spreadsheets", "and", "WhatsApp", "chaos.", "Manage", "&", "Grow", "your", "PG,", "Hostel,", "or", "Co-Living", "with", "EasyMyPG."], []
  );
  
  const bottomWords = useMemo(() => 
    ["Already", "500+", "PGs", "on", "the", "waitlist.", "Don't", "miss", "your", "spot."], []
  );

  const badgeVariants: Variants = {
    hidden: { 
      opacity: 0, 
      filter: 'blur(10px)',
      y: 20,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)',
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    }
  }

  const newBadgeVariants: Variants = {
    hidden: { 
      rotate: -120, 
      scale: 0, 
      opacity: 0 
    },
    visible: { 
      rotate: 0, 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.1,
        ease: 'easeInOut'
      }
    }
  }

  const wordVariants: Variants = {
    hidden: { 
      opacity: 0, 
      filter: 'blur(10px)',
      y: 20,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)',
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    }
  }

  const subtitleWordVariants: Variants = {
    hidden: { 
      opacity: 0, 
      filter: 'blur(10px)',
      y: 20,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)',
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    }
  }

  const bottomWordVariants: Variants = {
    hidden: { 
      opacity: 0, 
      filter: 'blur(10px)',
      y: 20,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)',
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    }
  }

  const buttonVariants: Variants = {
    hidden: { 
      opacity: 0, 
      filter: 'blur(10px)',
      y: 20,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)',
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    }
  }

  const watchDemoVariants: Variants = {
    hidden: { 
      opacity: 0, 
      filter: 'blur(10px)',
      y: 20,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)',
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: 0.1,
        ease: 'easeInOut'
      }
    }
  }

  const containerVariants: Variants = {
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  }

  const subtitleContainerVariants: Variants = {
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.8
      }
    }
  }

  const bottomContainerVariants: Variants = {
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 1.4
      }
    }
  }

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-[800px] md:max-w-[1450px] sm:max-h-[860px] md:max-h-[960px] -mt-[245px] md:-mt-[450px] md:rounded-3xl 
          [background:linear-gradient(145deg,#ffdbe1_0%,#fff1bd_40%,#fff1bd_60%,#ffcb0f_100%)]">
        </div>
      </div>

      <div className="relative z-10 top-10 flex flex-col items-center justify-center text-center  py-16 max-w-7xl mx-auto">

        {/* Badge */}
        <motion.div 
          className="inline-flex items-center border border-gray-400 text-[#240029] px-4 py-1.5 rounded-full text-sm font-medium mb-8 shadow-sm"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={badgeVariants}
          role="status"
          aria-label="567 PGs already onboarded"
        >
          <motion.span 
            className="bg-[#240029] text-white px-2 py-0.5 rounded-full text-xs font-bold mr-2"
            variants={newBadgeVariants}
          >
            NEW
          </motion.span>
          567+ PGs Onboarded Already.
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>

        {/* Heading */}
        <h1 className="text-[34.5px] md:text-6xl lg:text-7xl tracking-[-2px] font-inter-semibold text-[#240029] mb-6">
          <motion.span 
            className="inline-block"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {headingWords.slice(0, 4).map((word, index) => (
              <motion.span
                key={`heading-word-${index}`}
                className="inline-block mr-1.5"
                variants={wordVariants}
              >
                {word}
              </motion.span>
            ))}
          </motion.span>
          <br />
          <motion.span 
            className="inline-block"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {headingWords.slice(4).map((word, index) => (
              <motion.span
                key={`heading-word-${index + 4}`}
                className="inline-block mr-1.5"
                variants={wordVariants}
              >
                {word}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        {/* Subtitle */}
       <motion.p className="text-sm md:text-lg text-[#290029ad]  font-medium max-w-xl px-2 pl-3  mx-auto  mb-10 text-justify [text-align-last:center]"

          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={subtitleContainerVariants}
        >
          {subtitleWords.map((word, index) => ( 
            <motion.span
              key={`subtitle-word-${index}`}
              className="inline-block mr-1"
              variants={subtitleWordVariants}
            >
              {word}{' '}
            </motion.span>
          ))}
        </motion.p>

        {/* CTA Buttons */}
        <div className="flex flex-row gap-2 sm:gap-4 justify-center mb-6 w-full sm:max-w-none mx-auto">
          <Link href="/waitlist">
          <motion.button 
            className="flex-1 sm:flex-none px-4 sm:px-8 py-2.5 gap-2 sm:py-3 rounded-lg border border-black text-sm sm:text-base font-semibold transition-all duration-300 whitespace-nowrap"
            style={{
              backgroundColor: 'rgb(255, 204, 17)',
              color: 'black',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(7, 7, 7, 0.2)',
              borderRadius: '8px',
              boxShadow: 'rgba(32, 0, 36, 0.05) 0px 1px 2px 0px, rgba(255, 255, 255, 0.4) 0px 10px 24px -10px inset'
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: buttonVariants.hidden,
              visible: {
                ...buttonVariants.visible,
                transition: {
                  duration: 0.4,
                  ease: 'easeInOut',
                  delay: 1.8
                }
              }
            }}
            whileHover={{
              scale: 1.05,
              rotate: 1,
              backgroundColor: 'rgb(36, 0, 41)',
              color: 'rgb(255, 255, 153)',
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="Get early access to EasyMyPG"
          >
            Get Early Access
          </motion.button>
          </Link>
          <motion.button 
  className="flex-1 sm:flex-none bg-white text-black border border-black 
             px-3 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base 
             font-semibold shadow-md whitespace-nowrap w-auto max-w-fit"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    ...watchDemoVariants,
    visible: {
      ...watchDemoVariants.visible,
      transition: {
        ...(watchDemoVariants.visible as { transition?: any }).transition,
        delay: 1.9
      }
    }
  }}
  whileHover={{
    backgroundColor: '#f3f4f6',
    scale: 1.02,
    transition: { duration: 0.2 }
  }}
  whileTap={{ scale: 0.98 }}
  aria-label="Watch EasyMyPG demo video"
>
  Watch Demo
</motion.button>

        </div>

        {/* Bottom Text */}
        <div className="flex items-center text-gray-900 text-[10px] md:text-sm font-light mb-14">
          <motion.div
            className="mr-1"
            initial={{ 
              opacity: 0, 
              filter: 'blur(10px)',
              rotate: -180,
              scale: 0.5
            }}
            whileInView={{ 
              opacity: 1, 
              filter: 'blur(0px)',
              rotate: 0,
              scale: 1,
              transition: {
                duration: 0.5,
                delay: 1.3,
                ease: [0.68, -0.55, 0.265, 1.55]
              }
            }}
            viewport={{ once: true }}
          >
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-600" aria-hidden="true" />
          </motion.div>
          <motion.div
            className="inline-block"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={bottomContainerVariants}
          >
            {bottomWords.map((word, index) => (
              <motion.span
                key={`bottom-word-${index}`}
                className="inline-block mr-1"
                variants={bottomWordVariants}
              >
                {word}{' '}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.button
            className=" font-bold cursor-pointer inline-block bg-transparent border-none text-inherit"
            initial={{ 
              opacity: 0, 
              filter: 'blur(10px)',
              y: 20,
              scale: 0.8
            }}
            whileInView={{ 
              opacity: 1, 
              filter: 'blur(0px)',
              y: 0,
              scale: 1,
              transition: {
                duration: 0.4,
                delay: 2.2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.1,
              rotate: -2,
              color: '#ffcc11',
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="Join the waitlist now"
          >
            Join Now →
          </motion.button>
        </div>

        {/* Phone Image */}
        <div className="w-full max-w-[965px] mx-auto">
          <div className="relative bg-purple-50 bg-opacity-90 backdrop-blur-sm rounded-3xl p-2 md:p-2 overflow-hidden [mask-image:linear-gradient(to_bottom,black_70%,transparent_90%)] 
                  [mask-repeat:no-repeat] [mask-size:100%]">

            <div className="text-center">
              <Image
                src="/ph.avif"
                alt="EasyMyPG mobile application interface showing PG management features"
                width={950}
                height={10}
                priority
                className="rounded-2xl object-center border max-w-full border-gray-300 
                  [mask-image:linear-gradient(to_bottom,black_90%,transparent_90%)] 
                  [mask-repeat:no-repeat] [mask-size:100%]"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero