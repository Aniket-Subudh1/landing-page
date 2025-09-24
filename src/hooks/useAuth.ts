'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface Admin {
  id: string
  name: string
  email: string
  role: string
  lastLogin: string
}

type AuthState = 'loading' | 'authenticated' | 'unauthenticated' | 'error'

export const useAuth = () => {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [authState, setAuthState] = useState<AuthState>('loading')
  const router = useRouter()
  const pathname = usePathname()
  const mountedRef = useRef(true)
  const isCheckingAuth = useRef(false)

  const checkAuth = useCallback(async () => {
    // Prevent multiple simultaneous auth checks
    if (isCheckingAuth.current) return
    
    try {
      isCheckingAuth.current = true
      setAuthState('loading')
      
      console.log('Checking authentication...')
      
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      
      if (!mountedRef.current) return
      
      if (response.ok) {
        const data = await response.json()
        if (data.admin) {
          console.log('Authentication successful:', data.admin.email)
          setAdmin(data.admin)
          setAuthState('authenticated')
        } else {
          console.log('No admin data in response')
          setAdmin(null)
          setAuthState('unauthenticated')
        }
      } else {
        console.log('Authentication failed:', response.status)
        setAdmin(null)
        setAuthState('unauthenticated')
      }
    } catch (error) {
      console.error('Auth check error:', error)
      if (mountedRef.current) {
        setAdmin(null)
        setAuthState('error')
      }
    } finally {
      isCheckingAuth.current = false
    }
  }, [])

  // Initial auth check on mount
  useEffect(() => {
    mountedRef.current = true
    checkAuth()
    
    return () => {
      mountedRef.current = false
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setAuthState('loading')
      console.log('Attempting login for:', email)
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()
      console.log('Login response:', response.status, response.ok)

      if (response.ok && data.admin) {
        console.log('Login successful:', data.admin.email)
        setAdmin(data.admin)
        setAuthState('authenticated')
        
        // Navigate after successful login
        router.replace('/admin')
        return { success: true }
      } else {
        console.log('Login failed:', data.error || 'Unknown error')
        setAdmin(null)
        setAuthState('unauthenticated')
        return { success: false, error: data.error || 'Login failed' }
      }
    } catch (error) {
      console.error('Login network error:', error)
      setAdmin(null)
      setAuthState('error')
      return { success: false, error: 'Network error. Please try again.' }
    }
  }

  const logout = async () => {
    try {
      console.log('Initiating logout...')
      setAuthState('loading')
      
      // Immediately clear the admin state
      setAdmin(null)
      
      // Call the logout API
      try {
        const response = await fetch('/api/auth/logout', {
          method: 'POST',
          credentials: 'include'
        })
        console.log('Logout API response:', response.status)
      } catch (apiError) {
        console.error('Logout API error (continuing anyway):', apiError)
      }
      
      // Set state and navigate
      setAuthState('unauthenticated')
      console.log('Logout complete, redirecting to login')
      router.replace('/admin/login')
      
    } catch (error) {
      console.error('Logout error:', error)
      // Force logout even if something fails
      setAdmin(null)
      setAuthState('unauthenticated')
      router.replace('/admin/login')
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  return {
    admin,
    authState,
    loading: authState === 'loading',
    isAuthenticated: authState === 'authenticated',
    isUnauthenticated: authState === 'unauthenticated',
    login,
    logout,
    checkAuth
  }
}