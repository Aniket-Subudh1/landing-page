import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/auth'

export const GET = withAuth(async (request: NextRequest & { admin: any }) => {
  try {
    const { admin } = request
    
    return NextResponse.json({
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        lastLogin: admin.lastLogin,
        isActive: admin.isActive,
        createdAt: admin.createdAt
      }
    })
  } catch (error) {
    console.error('Auth me error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
})