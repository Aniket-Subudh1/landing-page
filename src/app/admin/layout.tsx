// src/components/admin/AdminLayout.tsx
'use client'
import React, { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import Sidebar from '@/components/admin/Sidebar'
import LoadingSpinner from '@/components/admin/LoadingSpinner'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { admin, loading, isAuthenticated, isUnauthenticated, logout } = useAuth()
  const hasRedirected = useRef(false)

  console.log('AdminLayout render:', {
    pathname,
    admin: admin?.email || null,
    loading,
    isAuthenticated,
    isUnauthenticated,
    hasRedirected: hasRedirected.current
  })

  useEffect(() => {
    if (pathname === '/admin/login') {
      hasRedirected.current = false
      return
    }

    if (!loading && isUnauthenticated && !hasRedirected.current) {
      console.log('Redirecting to login - user not authenticated')
      hasRedirected.current = true
      router.replace('/admin/login')
    }
    
    if (isAuthenticated && admin) {
      hasRedirected.current = false
    }
  }, [loading, isUnauthenticated, isAuthenticated, admin, pathname, router])

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (isUnauthenticated && !admin) {
    if (!hasRedirected.current) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner />
            <p className="mt-4 text-gray-600">Redirecting to login...</p>
          </div>
        </div>
      )
    }
    // If already redirected, don't render anything to avoid flash
    return null
  }

  // Render admin layout if authenticated
  if (isAuthenticated && admin) {
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

  // Fallback - shouldn't reach here normally
  return null
}
