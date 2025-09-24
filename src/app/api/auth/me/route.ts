import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Admin from '@/models/Admin'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    // Get token from cookies
    const token = request.cookies.get('auth-token')?.value
    
    if (!token) {
      console.log('No auth token found')
      return NextResponse.json(
        { error: 'No authentication token' },
        { status: 401 }
      )
    }

    // Verify token
    const decoded = verifyToken(token)
    if (!decoded) {
      console.log('Invalid token')
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    // Get admin from database
    const admin = await Admin.findById(decoded.adminId)
    if (!admin || !admin.isActive) {
      console.log('Admin not found or inactive')
      return NextResponse.json(
        { error: 'Admin account not found or inactive' },
        { status: 401 }
      )
    }

    console.log('Auth check successful for:', admin.email)
    
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
}