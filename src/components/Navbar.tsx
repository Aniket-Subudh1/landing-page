/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import Image from 'next/image'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Tenants App', href: '#tenants', hasDropdown: true },
    { name: 'Manager App', href: '#manager', hasDropdown: true },
    { name: 'Features', href: '#features', hasDropdown: true },
    { name: 'Blog', href: '#blog', hasDropdown: false },
    { name: 'Support', href: '#support', hasDropdown: false },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <nav className="fixed z-50 left-1/2 transform -translate-x-1/2 top-4 w-11/12 max-w-7xl backdrop-blur-lg rounded-2xl border border-black/30 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt='logo'
            height={30}
            width={30}
          />
          <span className="text-lg font-extrabold text-gray-900">
            Easy My Pg
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              <span>{item.name}</span>
              {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          <button className="px-4 py-2 text-sm font-medium bg-white rounded-lg border border-black text-black hover:text-gray-600 transition-colors duration-200">
            Free Access
          </button>
          <button className="px-6 py-2 bg-yellow-400 border border-black hover:bg-yellow-500 text-gray-900 font-semibold text-sm rounded-lg transition-colors duration-200">
            Download Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 transition-colors duration-200"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden mt-2 pb-4 border-t border-black/30 backdrop-blur-lg rounded-b-2xl shadow-sm">
          <div className="pt-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="flex items-center justify-between w-full px-6 py-3 text-left text-gray-600 hover:text-gray-900 hover:bg-white/20 rounded-lg transition-all duration-200"
              >
                <span className="font-medium text-sm">{item.name}</span>
                {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
              </button>
            ))}
            <div className="px-6 pt-4 space-y-3">
              <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-black/30 bg-white/80 rounded-lg transition-colors duration-200">
                Free Access
              </button>
              <button className="w-full px-6 py-2 bg-yellow-400 border border-black hover:bg-yellow-500 text-gray-900 font-semibold text-sm rounded-lg transition-colors duration-200">
                Download Now
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar