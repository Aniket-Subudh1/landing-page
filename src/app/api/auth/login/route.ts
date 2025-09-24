import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Admin from '@/models/Admin'
import { generateToken, setAuthCookie, rateLimitLogin } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { email, password } = await request.json()
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Rate limiting
    const rateLimitResult = rateLimitLogin(`${email}_${clientIP}`)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many login attempts. Please try again later.',
          resetTime: rateLimitResult.resetTime
        },
        { status: 429 }
      )
    }

    // Find admin with password field
    const admin = await Admin.findOne({ 
      email: email.toLowerCase(),
      isActive: true 
    }).select('+password')

    if (!admin || !(await admin.comparePassword(password))) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Update last login
    admin.lastLogin = new Date()
    await admin.save()

    // Generate token
    const token = generateToken({
      adminId: admin._id.toString(),
      email: admin.email,
      role: admin.role
    })

    // Create response with admin data
    const adminResponse = {
      id: admin._id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      lastLogin: admin.lastLogin
    }

    const response = NextResponse.json({
      message: 'Login successful',
      admin: adminResponse
    })

    // Set HTTP-only cookie
    return setAuthCookie(response, token)

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
