import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean
  glass?: boolean
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  gradient = false,
  glass = false
}) => {
  const baseClasses = 'rounded-2xl p-6 transition-all duration-300'
  const hoverClasses = hover ? 'hover:transform hover:scale-105 hover:shadow-xl cursor-pointer' : ''
  const gradientClasses = gradient ? 'bg-gradient-to-br from-white to-gray-50 border border-gray-100' : 'bg-white'
  const glassClasses = glass ? 'glass-effect' : ''
  const shadowClasses = 'shadow-lg hover:shadow-xl'
  
  const classes = `${baseClasses} ${hoverClasses} ${gradientClasses} ${glassClasses} ${shadowClasses} ${className}`
  
  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export default Card