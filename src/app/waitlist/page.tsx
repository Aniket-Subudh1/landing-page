'use client'

import React, { useState, useMemo } from 'react'
import { motion, Variants } from 'framer-motion'
import { ChevronDown, Check, Phone, MapPin, Building, User, Hash, UserCheck, Mail, CheckCircle, Sparkles } from 'lucide-react'

const WaitlistForm = () => {
  const shouldAnimate = true

  const [formData, setFormData] = useState({
    name: '',
    email: '', 
    pgName: '',
    beds: '10+',
    location: 'Bhubaneswar',
    phone: '',
    role: 'PG Owner',
    category: 'Paying Guest',
    agreeTerms: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [showRoleDropdown, setShowRoleDropdown] = useState(false)
  const [showBedsDropdown, setShowBedsDropdown] = useState(false)

  // Memoized title words for animation
  const titleWords = useMemo(() => ["Join", "The", "Waitlist"], [])

  const locations = [
    'Bhubaneswar', 'Mumbai', 'Delhi', 'Kolkata', 'Bengaluru', 'City Not Mentioned'
  ]

  const bedOptions = ['1-10', '10+', '20+', '50+', '100+']
  const roleOptions = ['PG Owner', 'Manager', 'Property Manager']

  const pgCategories = [
    {
      id: 'Paying Guest',
      title: 'Paying Guest',
      icon: '🏠',
      bgColor: 'bg-green-500',
      textColor: 'text-white'
    },
    {
      id: 'Student Hostel',
      title: 'Student Hostel', 
      icon: '🏫',
      bgColor: 'bg-orange-400',
      textColor: 'text-white'
    },
    {
      id: 'Other',
      title: 'Other',
      icon: '❓',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-600'
    }
  ]

  // Animation variants
  const titleWordVariants: Variants = {
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

  const titleContainerVariants: Variants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const formVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: 'blur(5px)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        delay: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const successVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.agreeTerms) {
      setSubmitMessage('Please agree to Terms & Conditions')
      return
    }

    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccessfullySubmitted(true)
        setSubmitMessage('')
      } else {
        setSubmitMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setSubmitMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleJoinAgain = () => {
    setIsSuccessfullySubmitted(false)
    setFormData({
      name: '',
      email: '',
      pgName: '',
      beds: '10+',
      location: 'Bhubaneswar',
      phone: '',
      role: 'PG Owner',
      category: 'Paying Guest',
      agreeTerms: false
    })
  }

  return (
    <section className="min-h-screen relative overflow-hidden py-20">
      {/* Background gradient - same as hero */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full [background:linear-gradient(145deg,#ffdbe1_0%,#fff1bd_40%,#fff1bd_60%,#ffcb0f_100%)]">
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
        
        {/* Title with word-by-word animation */}
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#240029] leading-tight mb-12"
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          variants={titleContainerVariants}
        >
          {titleWords.map((word, index) => (
            <motion.span
              key={`title-word-${index}`}
              className="inline-block mr-4"
              variants={titleWordVariants}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Error Message (only show if not successfully submitted) */}
        {submitMessage && !isSuccessfullySubmitted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl border bg-red-50 border-red-200 text-red-800"
          >
            {submitMessage}
          </motion.div>
        )}

        {/* Form Container */}
        <motion.div
          className="w-full max-w-2xl bg-gradient-to-br from-yellow-100/80 to-yellow-200/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-yellow-300/30"
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          variants={formVariants}
        >
          {/* Success State */}
          {isSuccessfullySubmitted ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={successVariants}
              className="text-center py-8"
            >
              {/* Success Animation Icons */}
              <div className="relative mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                  className="w-24 h-24 mx-auto bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl"
                >
                  <CheckCircle className="w-12 h-12 text-white" />
                </motion.div>
                
                {/* Floating sparkles */}
                <motion.div
                  animate={{ 
                    y: [-10, -20, -10],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-2 -left-6"
                >
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                </motion.div>
                
                <motion.div
                  animate={{ 
                    y: [-15, -5, -15],
                    rotate: [360, 180, 0]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute -top-4 -right-4"
                >
                  <Sparkles className="w-5 h-5 text-pink-500" />
                </motion.div>
                
                <motion.div
                  animate={{ 
                    y: [-8, -18, -8],
                    rotate: [0, -180, -360]
                  }}
                  transition={{ 
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute -bottom-2 left-8"
                >
                  <Sparkles className="w-4 h-4 text-blue-500" />
                </motion.div>
              </div>

              {/* Success Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-[#240029] mb-4">
                  🎉 Welcome to EasyMyPG!
                </h2>
                <p className="text-lg text-[#240029]/80 mb-6 leading-relaxed">
                  Thank you for joining our waitlist! We've sent a confirmation email with all the details you need to know.
                </p>
                
                {/* Success Info Cards */}
                <div className="grid gap-4 mb-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-yellow-300/50"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span className="text-[#240029] font-medium">Confirmation sent to {formData.email}</span>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-yellow-300/50"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <Building className="w-5 h-5 text-green-600" />
                      <span className="text-[#240029] font-medium">PG "{formData.pgName}" registered successfully</span>
                    </div>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    onClick={handleJoinAgain}
                    className="flex-1 py-3 px-6 bg-white/60 backdrop-blur-sm border border-yellow-300/50 text-[#240029] font-semibold rounded-xl hover:bg-white/80 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    Join Another PG
                  </motion.button>
                  
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="flex-1 py-3 px-6 bg-[#3b0b4b] hover:bg-[#4a1555] text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-yellow-100"
                  >
                    Share with Friends
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#240029] text-left">
                  <User className="inline w-4 h-4 mr-2" />
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Write Your Full Name"
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-yellow-300/50 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#240029] text-left">
                  <Mail className="inline w-4 h-4 mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-yellow-300/50 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* PG Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#240029] text-left">
                  <Building className="inline w-4 h-4 mr-2" />
                  PG / Guest House Name
                </label>
                <input
                  type="text"
                  value={formData.pgName}
                  onChange={(e) => handleInputChange('pgName', e.target.value)}
                  placeholder="Enter your PG / Guest house Name"
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-yellow-300/50 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Number of Beds */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#240029] text-left">
                  <Hash className="inline w-4 h-4 mr-2" />
                  No Of Beds
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowBedsDropdown(!showBedsDropdown)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-yellow-300/50 rounded-xl text-gray-800 text-left focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 flex items-center justify-between disabled:opacity-50"
                  >
                    {formData.beds}
                    <ChevronDown className={`w-4 h-4 transition-transform ${showBedsDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {showBedsDropdown && !isSubmitting && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white/90 backdrop-blur-sm border border-yellow-300/50 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
                      {bedOptions.map((beds) => (
                        <button
                          key={beds}
                          type="button"
                          onClick={() => {
                            handleInputChange('beds', beds)
                            setShowBedsDropdown(false)
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-yellow-100/50 transition-colors first:rounded-t-xl last:rounded-b-xl"
                        >
                          {beds}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Location Dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#240029] text-left">
                  <MapPin className="inline w-4 h-4 mr-2" />
                  Location
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-yellow-300/50 rounded-xl text-gray-800 text-left focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 flex items-center justify-between disabled:opacity-50"
                  >
                    {formData.location}
                    <ChevronDown className={`w-4 h-4 transition-transform ${showLocationDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {showLocationDropdown && !isSubmitting && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white/90 backdrop-blur-sm border border-yellow-300/50 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
                      {locations.map((location) => (
                        <button
                          key={location}
                          type="button"
                          onClick={() => {
                            handleInputChange('location', location)
                            setShowLocationDropdown(false)
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-yellow-100/50 transition-colors first:rounded-t-xl last:rounded-b-xl"
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#240029] text-left">
                  <Phone className="inline w-4 h-4 mr-2" />
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <div className="px-3 py-3 bg-white/60 backdrop-blur-sm border border-yellow-300/50 rounded-xl text-gray-800 text-sm flex items-center">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="8260397998"
                    className="flex-1 px-4 py-3 bg-white/60 backdrop-blur-sm border border-yellow-300/50 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* PG Owner / Manager */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#240029] text-left">
                  <UserCheck className="inline w-4 h-4 mr-2" />
                  PG Owner / Manager
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-yellow-300/50 rounded-xl text-gray-800 text-left focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 flex items-center justify-between disabled:opacity-50"
                  >
                    {formData.role}
                    <ChevronDown className={`w-4 h-4 transition-transform ${showRoleDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {showRoleDropdown && !isSubmitting && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white/90 backdrop-blur-sm border border-yellow-300/50 rounded-xl shadow-lg z-10">
                      {roleOptions.map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => {
                            handleInputChange('role', role)
                            setShowRoleDropdown(false)
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-yellow-100/50 transition-colors first:rounded-t-xl last:rounded-b-xl"
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* PG Category */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-[#240029] text-left">
                  PG Category
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {pgCategories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleInputChange('category', category.id)}
                      disabled={isSubmitting}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-center disabled:opacity-50 ${
                        formData.category === category.id
                          ? 'border-yellow-400 bg-yellow-100/60 shadow-lg scale-105'
                          : 'border-yellow-300/50 bg-white/40 hover:border-yellow-400 hover:bg-yellow-50/60'
                      }`}
                    >
                      <div className={`w-16 h-16 mx-auto mb-3 ${category.bgColor} ${category.textColor} rounded-xl flex items-center justify-center text-2xl`}>
                        {category.icon}
                      </div>
                      <div className="text-sm font-semibold text-[#240029]">{category.title}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('agreeTerms', !formData.agreeTerms)}
                  disabled={isSubmitting}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 mt-0.5 disabled:opacity-50 ${
                    formData.agreeTerms
                      ? 'bg-blue-500 border-blue-500'
                      : 'bg-white/60 border-yellow-300'
                  }`}
                >
                  {formData.agreeTerms && <Check className="w-3 h-3 text-white" />}
                </button>
                <label className="text-sm text-[#240029] text-left">
                  I agree with the <span className="text-blue-600 underline cursor-pointer">Terms & Conditions</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#3b0b4b] hover:bg-[#4a1555] text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-yellow-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Joining Waitlist...
                  </>
                ) : (
                  'Join The Early Access'
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default WaitlistForm