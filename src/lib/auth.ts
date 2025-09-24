import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import Admin from '@/models/Admin'
import dbConnect from './mongodb'

const JWT_SECRET = process.env.JWT_SECRET!
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required')
}

export interface JWTPayload {
  adminId: string
  email: string
  role: string
  iat?: number
  exp?: number
}

export const generateToken = (payload: Omit<JWTPayload, 'iat' | 'exp'>): string => {
  try {
    return jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )
  } catch (error) {
    console.error('Token generation failed:', error)
    throw new Error('Failed to generate token')
  }
}

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded as JWTPayload
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

export const setAuthCookie = (response: NextResponse, token: string): NextResponse => {
  response.cookies.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60,
    path: '/'
  })
  return response
}

export const clearAuthCookie = (response: NextResponse): NextResponse => {
  response.cookies.delete('auth-token')
  return response
}

export const getAuthToken = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get('auth-token')
    return authCookie?.value || null
  } catch (error) {
    console.error('Failed to get auth token:', error)
    return null
  }
}

export const validateAuthToken = async (): Promise<JWTPayload | null> => {
  const token = await getAuthToken()
  if (!token) return null
  
  return verifyToken(token)
}

export const withAuth = (handler: Function) => {
  return async (req: NextRequest, context?: any) => {
    try {
      await dbConnect()
      
      const token = req.cookies.get('auth-token')?.value
      
      if (!token) {
        return NextResponse.json(
          { error: 'Authentication required' }, 
          { status: 401 }
        )
      }

      const decoded = verifyToken(token)
      if (!decoded) {
        return NextResponse.json(
          { error: 'Invalid or expired token' }, 
          { status: 401 }
        )
      }

      const admin = await Admin.findById(decoded.adminId).select('+password')
      if (!admin || !admin.isActive) {
        return NextResponse.json(
          { error: 'Admin account not found or inactive' }, 
          { status: 401 }
        )
      }

      const requestWithAdmin = req as NextRequest & { admin: any }
      requestWithAdmin.admin = admin

      return handler(requestWithAdmin, context)
    } catch (error) {
      console.error('Auth middleware error:', error)
      return NextResponse.json(
        { error: 'Authentication error' }, 
        { status: 500 }
      )
    }
  }
}

const loginAttempts = new Map<string, { count: number; lastAttempt: Date }>()

export const rateLimitLogin = (identifier: string): { allowed: boolean; resetTime?: Date } => {
  const now = new Date()
  const attempts = loginAttempts.get(identifier)
  
  if (attempts && (now.getTime() - attempts.lastAttempt.getTime()) > 15 * 60 * 1000) {
    loginAttempts.delete(identifier)
  }
  
  const currentAttempts = loginAttempts.get(identifier)
  
  if (!currentAttempts) {
    loginAttempts.set(identifier, { count: 1, lastAttempt: now })
    return { allowed: true }
  }
  
  if (currentAttempts.count >= 5) {
    const resetTime = new Date(currentAttempts.lastAttempt.getTime() + 15 * 60 * 1000)
    return { allowed: false, resetTime }
  }
  
  currentAttempts.count++
  currentAttempts.lastAttempt = now
  return { allowed: true }
}

export const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' }
  }
  
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return { 
      valid: false, 
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' 
    }
  }
  
  return { valid: true }
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}