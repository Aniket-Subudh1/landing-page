'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  BarChart3, 
  UserCheck,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'

interface SidebarProps {
  onLogout: () => void
  admin: {
    name: string
    email: string
    role: string
  }
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout, admin }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Waitlist', href: '/admin/waitlist', icon: Users },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 40
      }
    },
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 40
      }
    }
  }

  const overlayVariants = {
    open: {
      opacity: 1,
      visibility: 'visible' as const
    },
    closed: {
      opacity: 0,
      visibility: 'hidden' as const
    }
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#1a0520] text-white rounded-lg shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-[#1a0520] via-[#2e0730] to-[#1a0520] text-white z-50 lg:relative lg:translate-x-0"
        variants={sidebarVariants}
        initial="closed"
        animate={isMobileOpen ? "open" : "closed"}
        style={{ translateX: isMobileOpen ? '0%' : '-100%' }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-purple-800/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center">
                  <span className="font-bold text-[#1a0520]">E</span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">EasyMyPG</h2>
                  <p className="text-xs text-purple-300">Admin Panel</p>
                </div>
              </div>
              
              <button
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden p-1 hover:bg-purple-800/30 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Admin Info */}
          <div className="p-4 border-b border-purple-800/30">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{admin.name}</p>
                <p className="text-xs text-purple-300 truncate">{admin.email}</p>
                <span className="inline-block px-2 py-0.5 text-xs bg-yellow-400 text-[#1a0520] rounded-full font-medium mt-1">
                  {admin.role}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#1a0520] shadow-lg transform scale-105'
                      : 'text-purple-200 hover:bg-purple-800/30 hover:text-white hover:translate-x-2'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.name}</span>
                  {active && (
                    <motion.div
                      className="w-2 h-2 bg-[#1a0520] rounded-full ml-auto"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-purple-800/30">
            <button
              onClick={onLogout}
              className="flex items-center space-x-3 w-full px-3 py-3 text-sm font-medium text-purple-200 hover:bg-red-600/20 hover:text-red-300 rounded-xl transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Desktop sidebar backdrop */}
      <div className="hidden lg:block w-64 flex-shrink-0" />
    </>
  )
}

export default Sidebar