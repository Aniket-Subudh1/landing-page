import { NextRequest, NextResponse } from 'next/server'
import { clearAuthCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ message: 'Logged out successfully' })
  return clearAuthCookie(response)
}