'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Admin {
  id: string
  name: string
  email: string
  role: string
  lastLogin: string
}

type AuthState = 'loading' | 'authenticated' | 'unauthenticated' | 'error'


type Subscriber = () => void

const store = {
  admin: null as Admin | null,
  authState: 'loading' as AuthState,
  requestCounter: 0,
  subscribers: new Set<Subscriber>(),
  setState(next: Partial<{ admin: Admin | null; authState: AuthState }>) {
    if (typeof next.admin !== 'undefined') this.admin = next.admin
    if (typeof next.authState !== 'undefined') this.authState = next.authState
    // notify
    this.subscribers.forEach((s) => s())
  },
  subscribe(s: Subscriber) {
    this.subscribers.add(s)
    return () => this.subscribers.delete(s)
  }
}

export const useAuth = () => {
  const router = useRouter()
  const [, setTick] = useState(0)
  const mountedRef = useRef(true)
  const hasCheckedAuth = useRef(false)

 
  const getAdmin = () => store.admin
  const getAuthState = () => store.authState

 
  useEffect(() => {
    mountedRef.current = true
    const unsub = store.subscribe(() => {
      if (!mountedRef.current) return

      setTick((t) => t + 1)
    })
    return () => {
      mountedRef.current = false
      unsub()
    }
  }, [])


  const checkAuth = async () => {
  
    if (hasCheckedAuth.current) {
      console.log('Auth already checked, skipping...')
      return
    }

    try {
      hasCheckedAuth.current = true
      console.log('Checking authentication...')

      const token = ++store.requestCounter

      const response = await fetch('/api/auth/me', {
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      })

      if (token !== store.requestCounter) {
        console.log('Ignored stale /api/auth/me response (token mismatch).')
        return
      }

      if (!mountedRef.current) return

      if (response.ok) {
        const data = await response.json()
        if (data.admin) {
          console.log('Authentication successful:', data.admin.email)
          store.setState({ admin: data.admin, authState: 'authenticated' })
        } else {
          console.log('No admin data in response')
          store.setState({ admin: null, authState: 'unauthenticated' })
        }
      } else {
        console.log('Authentication failed:', response.status)
        store.setState({ admin: null, authState: 'unauthenticated' })
      }
    } catch (error) {
      console.error('Auth check error:', error)
      if (mountedRef.current) {
        store.setState({ admin: null, authState: 'error' })
      }
    }
  }

  useEffect(() => {
    mountedRef.current = true
    hasCheckedAuth.current = false
    checkAuth()
    return () => {
      mountedRef.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 

  const login = async (email: string, password: string) => {
    try {
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
        store.setState({ admin: data.admin, authState: 'authenticated' })
        store.requestCounter++
        hasCheckedAuth.current = true
        return { success: true }
      } else {
        console.log('Login failed:', data.error || 'Unknown error')
        store.setState({ admin: null, authState: 'unauthenticated' })
        return { success: false, error: data.error || 'Login failed' }
      }
    } catch (error) {
      console.error('Login network error:', error)
      store.setState({ admin: null, authState: 'error' })
      return { success: false, error: 'Network error. Please try again.' }
    }
  }

  const logout = async () => {
    try {
      console.log('Initiating logout...')
      store.setState({ authState: 'loading' })

      try {
        const response = await fetch('/api/auth/logout', {
          method: 'POST',
          credentials: 'include'
        })
        console.log('Logout API response:', response.status)
      } catch (apiError) {
        console.error('Logout API error (continuing anyway):', apiError)
      }

      store.setState({ admin: null, authState: 'unauthenticated' })
      store.requestCounter = 0
      hasCheckedAuth.current = false
      console.log('Logout complete, redirecting to login')
      router.replace('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
      store.setState({ admin: null, authState: 'unauthenticated' })
      store.requestCounter = 0
      hasCheckedAuth.current = false
      router.replace('/admin/login')
    }
  }

  return {
    admin: getAdmin(),
    authState: getAuthState(),
    loading: getAuthState() === 'loading',
    isAuthenticated: getAuthState() === 'authenticated' && getAdmin() !== null,
    isUnauthenticated: getAuthState() === 'unauthenticated',
    login,
    logout,
    checkAuth
  }
}
