'use client'

import React from 'react'
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

// Mobile card sizes (same size for both cards on mobile)
const MOBILE_CARD_SIZE = {
  width: '100%',
  height: 380
}

// Rent Reminder Card
const RentReminderCard = ({ width, height }: { width: number | string; height: number }) => (
  <div 
    className="bg-[#fee899] rounded-2xl p-6 relative overflow-hidden"
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
      className="h-[200px] align-right object-right"
   />
    </div>
  </div>
)

// Fine Add System Card
const FineSystemCard = ({ width, height }: { width: number | string; height: number }) => (
  <div 
    className="bg-[#fee899] rounded-2xl p-6 relative overflow-hidden"
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
      className="h-[200px]"
   />
    </div>
  </div>
)

// Dues & Reports Card
const DuesReportsCard = ({ width, height }: { width: number; height: number }) => (
  <div 
    className="bg-[#fee899] rounded-2xl p-6 relative overflow-hidden"
    style={{ width, height }}
  >
     <Image
      src="/rev.png"
      alt="Task Assignment"
      height={450}
      width={550}
      className="h-[350px]"
   />
  </div>
)

// Expense Card
const ExpenseCard = ({ width, height }: { width: number; height: number }) => (
  <div 
    className="bg-[#fee899] rounded-2xl p-6 flex items-center justify-center"
    style={{ width, height }}
  >
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-[280px]">
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

// Maintenance & Complaints Card
const MaintenanceCard = ({ width, height }: { width: number; height: number }) => (
  <div 
    className="bg-[#fee899] rounded-2xl p-6"
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

const TaskAssignmentCard = ({ width, height }: { width: number; height: number }) => (
  <div 
    className="bg-[#fee899] rounded-2xl p-6 flex items-center justify-center"
    style={{ width, height }}
  >
   <Image
      src="/task.png"
      alt="Task Assignment"
      height={450}
      width={550}
      className="h-[300px]"
   />
  </div>
)

// Main Component
const ResponsiveEasyMyPGReplica = () => {
  const { gap } = CARD_SIZES

  return (
    <div 
      className="min-h-screen py-8 md:py-16"
      style={{ background: 'linear-gradient(180deg, #1a0520 0%, #2e0730 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mx-auto mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-white leading-tight mb-4 md:mb-6">
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
            />
            <FineSystemCard 
              width={MOBILE_CARD_SIZE.width} 
              height={MOBILE_CARD_SIZE.height} 
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
              />
              <FineSystemCard 
                width={CARD_SIZES.fineSystem.width} 
                height={CARD_SIZES.fineSystem.height} 
              />
              <DuesReportsCard 
                width={CARD_SIZES.duesReports.width} 
                height={CARD_SIZES.duesReports.height} 
              />
            </div>
          </div>

          {/* Bottom Row - 3 Cards */}
          <div className="flex justify-center">
            <div className="flex gap-3">
              <ExpenseCard 
                width={CARD_SIZES.expense.width} 
                height={CARD_SIZES.expense.height} 
              />
              <MaintenanceCard 
                width={CARD_SIZES.maintenance.width} 
                height={CARD_SIZES.maintenance.height} 
              />
              <TaskAssignmentCard 
                width={CARD_SIZES.taskAssignment.width} 
                height={CARD_SIZES.taskAssignment.height} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResponsiveEasyMyPGReplica