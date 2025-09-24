'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => (
  <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
    {children}
  </div>
)

const Testimonials = () => {
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimation()

  const testimonials = [
    {
      name: 'Arjit Mohanty',
      title: 'Swastik PG , Bhubaneswar',
      avatar: '/ass.avif',
      quote: `"Earlier rent collection was full headache... tenants delay, I keep sending reminders, and complaints were all over WhatsApp.
With EasyMyPG app, rent comes on time and complaints are tracked automatically. For me, it's so easy now - I just open the app and everything is clear."`
    },
    {
      name: 'Ananta Sahu',
      title: 'Gharapna PG Operator, Mumbai',
      avatar: '/dd.avif',
      quote: `"Handling 50+ tenants in Mumbai was total mess with Excel and calls. Since I joined EasyMyPG waitlist and got access, life is simple.

Rent reminders go automatically, tenants pay on time, even their complaints come in-app. I actually save time and tenants also feel system is professional."`
    },
    {
      name: 'Riya Verma',
      title: 'Riya PG Operator, Bengaluru',
      avatar: '/as.avif',
      quote: `"I love how friendly this app is. Before, tenants kept calling me for small issues and I had no proper record. Now they raise it in the app, and I track everything easily.

Rent is smooth, no tension of late payments. Finally feels like I'm running my PG smart, not struggling daily."`
    }
  ]

  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials]

  useEffect(() => {
    if (!isHovered) {
      controls.start({
        x: '-50%',
        transition: {
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop'
        }
      })
    } else {
      controls.stop()
    }
  }, [isHovered, controls])

  return (
    <section className="py-20 md:-mt-24 -mt-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto text-center px-4">
        {/* Animated Heading */}
        <motion.h2 
          className="text-xl sm:text-4xl lg:text-[38px] text-[#1c0a28] leading-snug mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-[20px] sm:text-5xl lg:text-[38px]  text-[#1c0a28] inline-block">
            {['"15x', 'More', 'Revenue.', '15x', 'Less', 'Stress.'].map((word, index) => (
              <motion.span
                key={index}
                className={`inline-block mr-1 ${
                  word === '"15x' || word === '15x' ? 'italic font-normal' : 
                  word === 'Revenue.' || word === 'Stress.' ? 'italic font-normal' : ''
                }`}
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
                  scale: 1
                }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.4,
                  delay: index * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>
          <br />
          <motion.span 
            className="mt-2 block text-[#1c0a28]"
            initial={{ 
              opacity: 0, 
              y: 20 
            }}
            whileInView={{ 
              opacity: 1, 
              y: 0 
            }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6,
              delay: 0.6 
            }}
          >
            One Super App for Your PG."
          </motion.span>
        </motion.h2>

        {/* Desktop Cards - Static Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-6 text-left">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <Card className="p-8 rounded-4xl border-gray-200 bg-white hover:shadow-md transition-shadow duration-200 min-h-[280px] flex flex-col">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                    <Image
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      height={50}
                      width={50}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.display = 'none';
                        if (img.parentNode instanceof HTMLElement) {
                          img.parentNode.classList.add('bg-gradient-to-br', 'from-blue-400', 'to-purple-500');
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {testimonial.title}
                    </p>
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                    {testimonial.quote}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile Cards - Infinite Horizontal Scroll */}
        <div className="lg:hidden">
          <motion.div 
            className="flex gap-6 text-left"
            animate={controls}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            style={{ width: 'fit-content' }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-80"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: (index % 3) * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <Card className="p-6 rounded-2xl border-gray-200 bg-white shadow-sm min-h-[280px] flex flex-col">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                      <Image
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        height={48}
                        width={48}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.style.display = 'none';
                          if (img.parentNode instanceof HTMLElement) {
                            img.parentNode.classList.add('bg-gradient-to-br', 'from-blue-400', 'to-purple-500');
                          }
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base text-gray-900 mb-1">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                      {testimonial.quote}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials