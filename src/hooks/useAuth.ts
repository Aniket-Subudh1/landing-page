'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface Admin {
  id: string
  name: string
  email: string
  role: string
  lastLogin: string
}

export const useAuth = () => {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
        cache: 'no-store' // Prevent caching issues
      })
      
      if (response.ok) {
        const data = await response.json()
        setAdmin(data.admin)
      } else {
        setAdmin(null)
        // Only redirect if we're not already on the login page
        if (pathname && !pathname.includes('/login')) {
          router.push('/admin/login')
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setAdmin(null)
      // Only redirect if we're not already on the login page
      if (pathname && !pathname.includes('/login')) {
        router.push('/admin/login')
      }
    } finally {
      setLoading(false)
    }
  }, [router, pathname]) // Remove the dependency that was causing infinite loop

  useEffect(() => {
    checkAuth()
  }, []) // Only run once on mount, not when checkAuth changes

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok) {
        setAdmin(data.admin)
        router.push('/admin')
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
      setAdmin(null)
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
      // Force logout even if API call fails
      setAdmin(null)
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }

  return {
    admin,
    loading,
    login,
    logout,
    checkAuth
  }
}