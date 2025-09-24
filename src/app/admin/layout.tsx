'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import Sidebar from '@/components/admin/Sidebar'
import LoadingSpinner from '@/components/admin/LoadingSpinner'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { admin, loading, logout } = useAuth()

  
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

 
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!admin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex">
      <Sidebar onLogout={logout} admin={admin} />
      
      <div className="flex-1 lg:ml-64 p-4 lg:p-8">
        <div className="pt-16 lg:pt-0">
          {children}
        </div>
      </div>
    </div>
  )
}