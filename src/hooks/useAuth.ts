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

type AuthState = 'loading' | 'authenticated' | 'unauthenticated'

export const useAuth = () => {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [authState, setAuthState] = useState<AuthState>('loading')
  const router = useRouter()
  const pathname = usePathname()
  const mountedRef = useRef(true)
  const isCheckingAuth = useRef(false)
  const hasInitialized = useRef(false)
  const loginInProgress = useRef(false)

  const checkAuth = useCallback(async (skipIfAuthenticated = true) => {
    // Skip auth check if we're already authenticated and not forced
    if (skipIfAuthenticated && authState === 'authenticated' && admin) {
      return true
    }

    // Prevent multiple simultaneous auth checks
    if (isCheckingAuth.current || !mountedRef.current || loginInProgress.current) {
      return false
    }
    
    try {
      isCheckingAuth.current = true
      
      console.log('Checking authentication...')
      
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
      
      if (!mountedRef.current) return false
      
      console.log('Auth check response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        if (data.admin && mountedRef.current) {
          console.log('Authentication successful:', data.admin.email)
          setAdmin(data.admin)
          setAuthState('authenticated')
          return true
        }
      }
      
      // Authentication failed
      if (mountedRef.current && !loginInProgress.current) {
        console.log('Authentication failed or no admin data')
        setAdmin(null)
        setAuthState('unauthenticated')
      }
      return false
      
    } catch (error) {
      console.error('Auth check error:', error)
      if (mountedRef.current && !loginInProgress.current) {
        setAdmin(null)
        setAuthState('unauthenticated')
      }
      return false
    } finally {
      isCheckingAuth.current = false
      hasInitialized.current = true
    }
  }, [authState, admin])

  // Initial auth check on mount
  useEffect(() => {
    mountedRef.current = true
    
    // Only check auth on initial load
    if (!hasInitialized.current) {
      checkAuth(false)
    }
    
    return () => {
      mountedRef.current = false
    }
  }, [])

  const login = async (email: string, password: string) => {
    if (!mountedRef.current) return { success: false, error: 'Component unmounted' }
    
    try {
      loginInProgress.current = true
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

      if (!mountedRef.current) return { success: false, error: 'Component unmounted' }

      const data = await response.json()
      console.log('Login response:', response.status, response.ok)

      if (response.ok && data.admin) {
        console.log('Login successful, setting admin state:', data.admin.email)
        
        // Set admin state immediately
        setAdmin(data.admin)
        setAuthState('authenticated')
        
        // Navigate after a short delay to ensure state is set
        setTimeout(() => {
          if (mountedRef.current) {
            console.log('Navigating to /admin')
            router.replace('/admin')
          }
        }, 100)
        
        return { success: true }
      } else {
        console.log('Login failed:', data.error || 'Unknown error')
        setAdmin(null)
        setAuthState('unauthenticated')
        return { success: false, error: data.error || 'Login failed' }
      }
    } catch (error) {
      console.error('Login network error:', error)
      if (mountedRef.current) {
        setAdmin(null)
        setAuthState('unauthenticated')
      }
      return { success: false, error: 'Network error. Please try again.' }
    } finally {
      loginInProgress.current = false
    }
  }

  const logout = async () => {
    try {
      console.log('Initiating logout...')
      
      // Set logout state immediately
      loginInProgress.current = false
      setAdmin(null)
      setAuthState('loading')
      hasInitialized.current = false
      
      // Call logout API
      try {
        const response = await fetch('/api/auth/logout', {
          method: 'POST',
          credentials: 'include'
        })
        console.log('Logout API response:', response.status)
      } catch (apiError) {
        console.error('Logout API error (continuing anyway):', apiError)
      }
      
      // Final state update
      setAuthState('unauthenticated')
      
      // Navigate to login
      setTimeout(() => {
        if (mountedRef.current) {
          router.replace('/admin/login')
        }
      }, 100)
      
    } catch (error) {
      console.error('Logout error:', error)
      // Force state reset even if something fails
      loginInProgress.current = false
      setAdmin(null)
      setAuthState('unauthenticated')
      hasInitialized.current = false
      router.replace('/admin/login')
    }
  }

  return {
    admin,
    authState,
    loading: authState === 'loading',
    isAuthenticated: authState === 'authenticated' && admin !== null,
    isUnauthenticated: authState === 'unauthenticated',
    login,
    logout,
    checkAuth
  }
}