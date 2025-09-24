'use client'
import React, { useEffect, useState } from 'react'
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
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated || loading) return

    const isLoginPage = pathname === '/admin/login'

    if (!isLoginPage && isUnauthenticated && !admin) {
      console.log('Redirecting to login - authentication required')
      router.replace('/admin/login')
      return
    }

    if (isLoginPage && isAuthenticated && admin) {
      console.log('Redirecting to dashboard - already authenticated')
      router.replace('/admin')
      return
    }
  }, [admin, loading, isAuthenticated, isUnauthenticated, pathname, router, isHydrated])

  if (!isHydrated || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">
            Loading...
          </p>
        </div>
      </div>
    )
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (isUnauthenticated || !admin) {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Sidebar onLogout={logout} admin={admin} />
      <div className="lg:ml-64">
        <div className="p-4 lg:p-8">
          <div className="pt-16 lg:pt-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}