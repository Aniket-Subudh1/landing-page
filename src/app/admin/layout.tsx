'use client'
import React, { useEffect } from 'react'
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

  console.log('AdminLayout render:', {
    pathname,
    admin: admin?.email || null,
    loading,
    isAuthenticated,
    isUnauthenticated
  })

  useEffect(() => {
    
    if (pathname === '/admin/login') {
      return
    }

    
    if (!loading && isUnauthenticated && !admin) {
      console.log('Redirecting to login - authentication required')
      router.replace('/admin/login')
    }
  }, [admin, loading, isAuthenticated, isUnauthenticated, pathname, router])


  if (pathname === '/admin/login') {
    console.log('Rendering login page')
    return <>{children}</>
  }


  if (loading) {
    console.log('Showing loading state')
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">
            Checking authentication...
          </p>
        </div>
      </div>
    )
  }

  if (isUnauthenticated && !admin) {
    console.log('No admin found, showing redirect message')
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated && admin) {
    console.log('Rendering admin layout for:', admin.email)
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


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )
}