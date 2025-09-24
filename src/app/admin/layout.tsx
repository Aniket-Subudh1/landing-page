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
    isUnauthenticated
  })

  // Reset redirect flag when we change routes
  useEffect(() => {
    if (pathname === '/admin/login') {
      hasRedirected.current = false
    }
  }, [pathname])

  useEffect(() => {
    // Don't do anything if we're on the login page
    if (pathname === '/admin/login') {
      return
    }

    // Only redirect if we're definitely unauthenticated and haven't already redirected
    if (!loading && isUnauthenticated && !admin && !hasRedirected.current) {
      console.log('Redirecting to login - user not authenticated')
      hasRedirected.current = true
      router.replace('/admin/login')
    }
  }, [loading, isUnauthenticated, admin, pathname, router])

  // If we're on the login page, just render children
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Show loading state while checking authentication
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

  // If unauthenticated, show loading while redirect is happening
  if (isUnauthenticated && !admin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
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

  // Fallback loading state
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )
}