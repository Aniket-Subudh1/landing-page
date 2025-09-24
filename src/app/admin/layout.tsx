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

  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner />
  }

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Redirect to login if not authenticated (handled by useAuth hook)
  if (!admin) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex">
      <Sidebar onLogout={logout} admin={admin} />
      
      <main className="flex-1 lg:ml-0 p-4 lg:p-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto pt-16 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  )
}
