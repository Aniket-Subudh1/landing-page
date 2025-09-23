'use client'

import React from 'react'
import Image from 'next/image'
const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Background gradient with pink tint matching the image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full md:max-w-[1600px] md:max-h-[900px] md:-mt-[300px] md:rounded-3xl bg-gradient-to-b from-pink-100 via-yellow-100 to-yellow-200"></div>
      </div>

      <div className="relative z-10 top-10 flex flex-col items-center justify-center text-center px-4 py-16 max-w-7xl mx-auto">

        {/* Badge */}
        <div className="inline-flex items-center border border-black text-purple-900 px-4 py-1.5 rounded-full text-sm font-medium mb-8 shadow-sm">
          <span className="bg-purple-900 text-white px-2 py-0.5 rounded-full text-xs font-bold mr-2">
            NEW
          </span>
          567+ PGs Onboarded Already.
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
          From Rent to Records <br />
          India's Easiest PG App.
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed mb-10">
          Rent Collection, Tenant Onboarding, Room Allocation, Bills, Ledas— it's all here.
          Ditch the spreadsheets and WhatsApp chaos. Manage & Grow your PG, Hostel,
          or Co-Living with EasyMyPG.
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

        {/* App Preview Card */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="bg-purple-50 bg-opacity-90 backdrop-blur-sm   visible rounded-3xl p-2 md:p-2 shadow-xl">

            {/* Placeholder for Phone Image */}
            <div className="text-center   text-gray-400">
              <Image
                src="/ph.avif"
                alt='phone'
                width={1000}
                height={10}
                className='rounded-2xl object-center border max-w-[1000px] border-gray-200 '
              />
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero