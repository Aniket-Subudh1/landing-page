'use client'

import React from 'react'
import Image from 'next/image'

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 flex items-center justify-center">
  <div className="w-full h-full md:max-w-[1500px] md:max-h-[860px] md:-mt-[250px] md:rounded-3xl 
    [background:linear-gradient(145deg,#ffdbe1_0%,#fff1bd_40%,#fff1bd_60%,#ffcb0f_100%)]">
  </div>
</div>



      <div className="relative z-10 top-10 flex flex-col items-center justify-center text-center px-4 py-16 max-w-7xl mx-auto">

        {/* Badge */}
        <div className="inline-flex items-center border border-black text-[#240029] px-4 py-1.5 rounded-full text-sm font-medium mb-8 shadow-sm">
          <span className="bg-[#240029] text-white px-2 py-0.5 rounded-full text-xs font-bold mr-2">
            NEW
          </span>
          567+ PGs Onboarded Already.
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl  font-bold text-[#240029] leading-tight mb-6">
          From Rent to Records <br />
          India's Easiest PG App.
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-[#240029] max-w-4xl mx-auto leading-relaxed mb-10">
          Rent Collection, Tenant Onboarding, Room Allocation, Bills, Ledas - it's all here.
          Ditch the spreadsheets and WhatsApp chaos. Manage & Grow your PG, Hostel, or Co-Living with EasyMyPG.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button className="bg-yellow-500 text-black px-8 py-3 rounded-lg text-base font-semibold hover:bg-yellow-400 transition-colors duration-300 shadow-md">
            Get Early Access
          </button>
          <button className="bg-white text-black px-8 py-3 rounded-lg text-base font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-md">
            Watch Demo
          </button>
        </div>

        {/* Bottom Text */}
        <div className="flex items-center text-gray-900 text-sm font-medium mb-14">
          <span className="mr-2">🚀</span>
          Already 500+ PGs on the waitlist. Don't miss your spot.
          <span className="ml-2 font-bold cursor-pointer hover:underline">
            Join Now →
          </span>
        </div>

        {/* App Preview Card with fade */}
        <div className="w-full max-w-[965px] mx-auto">
          <div className="relative bg-purple-50 bg-opacity-90  backdrop-blur-sm rounded-3xl p-2 md:p-2  overflow-hidden [mask-image:linear-gradient(to_bottom,black_70%,transparent_90%)] 
                  [mask-repeat:no-repeat] [mask-size:100%]">

            {/* Phone Image with fade mask */}
            <div className="text-center">
              <Image
                src="/ph.avif"
                alt="phone"
                width={950}
                height={10}
                className="rounded-2xl object-center border max-w-full  border-gray-300 
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
