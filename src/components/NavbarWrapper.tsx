'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

const NavbarWrapper: React.FC = () => {
  const pathname = usePathname()
  
  const isAdminRoute = pathname?.startsWith('/admin')
  
  if (isAdminRoute) {
    return null
  }
  
  return <Navbar />
}

export default NavbarWrapper