'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const CARD_SIZES = {
  rentReminder: { width: 500, height: 420 },
  fineSystem: { width: 300, height: 420 },
  duesReports: { width: 300, height: 420 },
  
  expense: { width: 300, height: 420 },
  maintenance: { width: 500, height: 420 },
  taskAssignment: { width: 300, height: 420 },
  
  gap: 10
}

const MOBILE_CARD_SIZE = {
  width: '100%',
  height: 380
}

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

const animationStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes textGlow {
    0%, 100% {
      filter: blur(0px);
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    }
    50% {
      filter: blur(0.5px);
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .animate-fade-in-scale {
    animation: fadeInScale 0.6s ease-out forwards;
  }

  .animate-text-glow {
    animation: textGlow 3s ease-in-out infinite;
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .card-hover {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .card-hover:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    filter: brightness(1.05);
  }

  .image-hover {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .image-hover:hover {
    transform: scale(1.05);
    filter: blur(0.5px) brightness(1.1);
  }

  .initial-hidden {
    opacity: 0;
    transform: translateY(30px);
  }

  .stagger-delay-1 { animation-delay: 0.1s; }
  .stagger-delay-2 { animation-delay: 0.2s; }
  .stagger-delay-3 { animation-delay: 0.3s; }
  .stagger-delay-4 { animation-delay: 0.4s; }
  .stagger-delay-5 { animation-delay: 0.5s; }
  .stagger-delay-6 { animation-delay: 0.6s; }
`

const RentReminderCard = ({ width, height, delay = '' }: { width: number | string; height: number; delay?: string }) => {
  const [ref, isInView] = useInView()

  return (
    <div 
      ref={ref}
      className={`bg-[#fee899] rounded-2xl p-6 relative overflow-hidden card-hover ${
        isInView ? `animate-fade-in-up ${delay}` : 'initial-hidden'
      }`}
      style={{ width, height }}
    >
      <div className="h-full flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-[#2b1b12] mb-3">Rent Reminder</h3>
          <p className="text-base text-[#3b2d20] font-light max-w-[32ch]">Automatic payment reminders on WhatsApp & Collect Online</p>
        </div>
        <Image
          src="/ss.avif"
          alt="Task Assignment"
          height={450}
          width={300}
          className="h-[200px] align-right object-right image-hover"
        />
      </div>
    </div>
  )
}

// Fine Add System Card
const FineSystemCard = ({ width, height, delay = '' }: { width: number | string; height: number; delay?: string }) => {
  const [ref, isInView] = useInView()

  return (
    <div 
      ref={ref}
      className={`bg-[#fee899] rounded-2xl p-6 relative overflow-hidden card-hover ${
        isInView ? `animate-fade-in-up ${delay}` : 'initial-hidden'
      }`}
      style={{ width, height }}
    >
      <div className="h-full flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-[#2b1b12] mb-3">Fine Add System</h3>
          <p className="text-base text-[#3b2d20] font-light max-w-[32ch]">Automatic Late Fine, other Fine apply & Collected</p>
        </div>
        
        <Image
          src="/in.avif"
          alt="Task Assignment"
          height={450}
          width={550}
          className="h-[200px] image-hover"
        />
      </div>
    </div>
  )
}

// Dues & Reports Card
const DuesReportsCard = ({ width, height, delay = '' }: { width: number; height: number; delay?: string }) => {
  const [ref, isInView] = useInView()

  return (
    <div 
      ref={ref}
      className={`bg-[#fee899] rounded-2xl p-6 relative overflow-hidden card-hover ${
        isInView ? `animate-fade-in-up ${delay}` : 'initial-hidden'
      }`}
      style={{ width, height }}
    >
      <Image
        src="/rev.png"
        alt="Task Assignment"
        height={450}
        width={550}
        className="h-[350px] image-hover"
      />
    </div>
  )
}

// Expense Card
const ExpenseCard = ({ width, height, delay = '' }: { width: number; height: number; delay?: string }) => {
  const [ref, isInView] = useInView()

  return (
    <div 
      ref={ref}
      className={`bg-[#fee899] rounded-2xl p-6 flex items-center justify-center card-hover ${
        isInView ? `animate-fade-in-scale ${delay}` : 'initial-hidden'
      }`}
      style={{ width, height }}
    >
      <div className={`bg-white rounded-xl shadow-lg p-6 w-full max-w-[280px] ${isInView ? 'animate-float' : ''}`}>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Expense</h4>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-600">Duration</div>
              <div className="text-xl font-bold text-gray-800">₹1,500</div>
              <div className="text-xs text-gray-500">Total Expenses</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Sep</div>
              <div className="text-xl font-bold text-gray-800">3</div>
              <div className="text-xs text-gray-500">Expense Count</div>
            </div>
          </div>
          
          <hr className="border-gray-200" />
          
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-600">Duration</div>
              <div className="text-xl font-bold text-gray-800">₹1,500</div>
              <div className="text-xs text-gray-500">Total Expenses</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Sep</div>
              <div className="text-xl font-bold text-gray-800">3</div>
              <div className="text-xs text-gray-500">Expense Count</div>
            </div>
          </div>
          
          <hr className="border-gray-200" />
          
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-600">Duration</div>
              <div className="text-xl font-bold text-gray-800">₹1,500</div>
              <div className="text-xs text-gray-500">Total Expenses</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Sep</div>
              <div className="text-xl font-bold text-gray-800">3</div>
              <div className="text-xs text-gray-500">Expense Count</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Maintenance & Complaints Card
const MaintenanceCard = ({ width, height, delay = '' }: { width: number; height: number; delay?: string }) => {
  const [ref, isInView] = useInView()

  return (
    <div 
      ref={ref}
      className={`bg-[#fee899] rounded-2xl p-6 card-hover ${
        isInView ? `animate-fade-in-up ${delay}` : 'initial-hidden'
      }`}
      style={{ width, height }}
    >
      <div className="flex items-start mt-5 px-1 gap-4 h-full">
        <div className="flex-1 overflow-hidden">
          <h4 className="text-2xl font-bold text-[#3b0b4b] mb-3"> 🛠 Maintenance & Complaints</h4>

          <p className="text-[#3b2d20] leading-relaxed mb-4 font-light text-lg">
            Quickly resolve tenant complaints with our automated system that tracks and manages every issue while instantly notifying your team.
          </p>

          <ul className="text-[#3b2d20] space-y-2 text-md font-light list-disc list-inside">
            <li>
              <strong>Issue Ticketing:</strong> Tenants raise complaints via app.
            </li>
            <li>
              <strong>Smart Routing:</strong> Assign tasks to staff automatically.
            </li>
            <li>
              <strong>Status Tracking:</strong> See "Open → In Progress → Resolved."
            </li>
            <li>
              <strong>Team Notifications:</strong> Staff alerted instantly.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const TaskAssignmentCard = ({ width, height, delay = '' }: { width: number; height: number; delay?: string }) => {
  const [ref, isInView] = useInView()

  return (
    <div 
      ref={ref}
      className={`bg-[#fee899] rounded-2xl p-6 flex items-center justify-center card-hover ${
        isInView ? `animate-fade-in-scale ${delay}` : 'initial-hidden'
      }`}
      style={{ width, height }}
    >
      <Image
        src="/task.png"
        alt="Task Assignment"
        height={450}
        width={550}
        className="h-[300px] image-hover"
      />
    </div>
  )
}

// Main Component
const ResponsiveEasyMyPGReplica = () => {
  const { gap } = CARD_SIZES
  const [headingRef, headingInView] = useInView()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
      <div 
        className="min-h-screen py-8 md:py-16"
        style={{ background: 'linear-gradient(180deg, #1a0520 0%, #2e0730 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div 
            ref={headingRef}
            className={`text-center mx-auto mb-8 md:mb-12 ${
              headingInView ? 'animate-fade-in-up' : 'initial-hidden'
            }`}
          >
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-medium text-white leading-tight mb-4 md:mb-6 ${
              headingInView ? 'animate-text-glow' : ''
            }`}>
              "Excel aur diary ko bolo bye-bye - ab EasyMyPG hai bhai!"
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-200 mx-auto px-4">
              From tenant complaints to daily attendance, food menus to notices, staff salaries to vendor payments - EasyMyPG manages every detail of your PG in one simple dashboard, 24/7.
            </p>
          </div>

          {/* Mobile Layout - Only first 2 cards, stacked vertically */}
          <div className="block md:hidden">
            <div className="flex flex-col gap-4 px-4">
              <RentReminderCard 
                width={MOBILE_CARD_SIZE.width} 
                height={MOBILE_CARD_SIZE.height}
                delay="stagger-delay-1"
              />
              <FineSystemCard 
                width={MOBILE_CARD_SIZE.width} 
                height={MOBILE_CARD_SIZE.height}
                delay="stagger-delay-2"
              />
            </div>
          </div>

          {/* Desktop Layout - All 6 cards in 2 rows */}
          <div className="hidden md:block">
            {/* Top Row - 3 Cards */}
            <div className="flex justify-center mb-8">
              <div className="flex gap-3">
                <RentReminderCard 
                  width={CARD_SIZES.rentReminder.width} 
                  height={CARD_SIZES.rentReminder.height}
                  delay="stagger-delay-1"
                />
                <FineSystemCard 
                  width={CARD_SIZES.fineSystem.width} 
                  height={CARD_SIZES.fineSystem.height}
                  delay="stagger-delay-2"
                />
                <DuesReportsCard 
                  width={CARD_SIZES.duesReports.width} 
                  height={CARD_SIZES.duesReports.height}
                  delay="stagger-delay-3"
                />
              </div>
            </div>

            {/* Bottom Row - 3 Cards */}
            <div className="flex justify-center">
              <div className="flex gap-3">
                <ExpenseCard 
                  width={CARD_SIZES.expense.width} 
                  height={CARD_SIZES.expense.height}
                  delay="stagger-delay-4"
                />
                <MaintenanceCard 
                  width={CARD_SIZES.maintenance.width} 
                  height={CARD_SIZES.maintenance.height}
                  delay="stagger-delay-5"
                />
                <TaskAssignmentCard 
                  width={CARD_SIZES.taskAssignment.width} 
                  height={CARD_SIZES.taskAssignment.height}
                  delay="stagger-delay-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResponsiveEasyMyPGReplica