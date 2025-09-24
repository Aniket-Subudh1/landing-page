'use client'

import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Admin {
  id: string
  name: string
  email: string
  role: string
  lastLogin: string
}

type AuthState = 'loading' | 'authenticated' | 'unauthenticated' | 'error'

interface AuthContextValue {
  admin: Admin | null
  authState: AuthState
  loading: boolean
  isAuthenticated: boolean
  isUnauthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [authState, setAuthState] = useState<AuthState>('loading')
  const router = useRouter()

  // request counter to ignore stale responses
  const requestCounter = useRef(0)
  // mounted flag
  const mounted = useRef(true)

  // Robust checkAuth that ignores stale responses
  const checkAuth = async () => {
    const token = ++requestCounter.current
    try {
      if (!mounted.current) return
      setAuthState(prev => (prev === 'loading' ? 'loading' : prev))
      const res = await fetch('/api/auth/me', {
        credentials: 'include',
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      })
      // If a newer request started, ignore this response
      if (token !== requestCounter.current) {
        console.log('Ignored stale checkAuth response (token mismatch).')
        return
      }

      if (!mounted.current) return

      if (res.ok) {
        const data = await res.json()
        if (data?.admin) {
          setAdmin(data.admin)
          setAuthState('authenticated')
          return
        }
      }

      // fallback: no admin or bad response
      setAdmin(null)
      setAuthState('unauthenticated')
    } catch (err) {
      console.error('checkAuth error', err)
      if (!mounted.current) return
      setAdmin(null)
      setAuthState('error')
    }
  }

  useEffect(() => {
    mounted.current = true
    checkAuth()
    return () => {
      mounted.current = false
    }
    // Intentionally run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Optionally set a "checking" state here if you want
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (res.ok && data?.admin) {
        // update shared state directly
        setAdmin(data.admin)
        setAuthState('authenticated')
        // bump request counter so any inflight checkAuth responses are ignored
        requestCounter.current++
        return { success: true }
      }

      // keep state clean
      setAdmin(null)
      setAuthState('unauthenticated')
      return { success: false, error: data?.error || 'Login failed' }
    } catch (err) {
      console.error('login error', err)
      setAdmin(null)
      setAuthState('error')
      return { success: false, error: 'Network error' }
    }
  }

  const logout = async () => {
    try {
      setAuthState('loading')
      // best-effort logout call
      try {
        await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
      } catch (e) {
        console.warn('logout API failed but continuing', e)
      }
      // clear state
      setAdmin(null)
      setAuthState('unauthenticated')
      requestCounter.current++
      router.replace('/admin/login')
    } catch (err) {
      console.error('logout error', err)
      setAdmin(null)
      setAuthState('unauthenticated')
      requestCounter.current++
      router.replace('/admin/login')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        admin,
        authState,
        loading: authState === 'loading',
        isAuthenticated: authState === 'authenticated' && admin !== null,
        isUnauthenticated: authState === 'unauthenticated',
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
