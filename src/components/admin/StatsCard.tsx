'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease'
  }
  icon: LucideIcon
  color: 'yellow' | 'purple' | 'green' | 'red' | 'blue'
  delay?: number
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  color,
  delay = 0
}) => {
  const colorClasses = {
    yellow: {
      bg: 'bg-gradient-to-br from-yellow-100 to-yellow-200',
      icon: 'bg-gradient-to-br from-yellow-400 to-yellow-500',
      iconText: 'text-white',
      change: change?.type === 'increase' ? 'text-green-600' : 'text-red-600'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-100 to-purple-200',
      icon: 'bg-gradient-to-br from-purple-500 to-purple-600',
      iconText: 'text-white',
      change: change?.type === 'increase' ? 'text-green-600' : 'text-red-600'
    },
    green: {
      bg: 'bg-gradient-to-br from-green-100 to-green-200',
      icon: 'bg-gradient-to-br from-green-500 to-green-600',
      iconText: 'text-white',
      change: change?.type === 'increase' ? 'text-green-600' : 'text-red-600'
    },
    red: {
      bg: 'bg-gradient-to-br from-red-100 to-red-200',
      icon: 'bg-gradient-to-br from-red-500 to-red-600',
      iconText: 'text-white',
      change: change?.type === 'increase' ? 'text-green-600' : 'text-red-600'
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-100 to-blue-200',
      icon: 'bg-gradient-to-br from-blue-500 to-blue-600',
      iconText: 'text-white',
      change: change?.type === 'increase' ? 'text-green-600' : 'text-red-600'
    }
  }

  const classes = colorClasses[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -5, 
        transition: { duration: 0.2 } 
      }}
      className={`${classes.bg} rounded-2xl p-6 shadow-sm border border-white/50 hover:shadow-md transition-shadow duration-300`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-[#1a0520]">{value}</p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${classes.change}`}>
              <span className="font-medium">
                {change.type === 'increase' ? '+' : '-'}{Math.abs(change.value)}%
              </span>
              <span className="text-gray-500 ml-1">vs last week</span>
            </div>
          )}
        </div>
        <div className={`${classes.icon} w-14 h-14 rounded-xl flex items-center justify-center shadow-lg`}>
          <Icon className={`w-7 h-7 ${classes.iconText}`} />
        </div>
      </div>
    </motion.div>
  )
}

export default StatsCard