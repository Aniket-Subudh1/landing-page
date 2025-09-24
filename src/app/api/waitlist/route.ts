import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Waitlist from '@/models/Waitlist'
import { sendWaitlistConfirmation } from '@/lib/email'
import { withAuth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const data = await request.json()
    const { name, email, pgName, beds, location, phone, role, category, agreeTerms } = data

    // Validation
    if (!name || !email || !pgName || !beds || !location || !phone || !role || !category || !agreeTerms) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email validation
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Phone validation
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Please provide a valid 10-digit phone number' },
        { status: 400 }
      )
    }

    // Check if phone number or email already exists
    const existingEntry = await Waitlist.findOne({ 
      $or: [{ phone }, { email: email.toLowerCase() }] 
    })
    
    if (existingEntry) {
      const duplicateField = existingEntry.phone === phone ? 'phone number' : 'email address'
      return NextResponse.json(
        { error: `This ${duplicateField} is already registered in our waitlist` },
        { status: 409 }
      )
    }

    // Create waitlist entry
    const waitlistEntry = await Waitlist.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      pgName: pgName.trim(),
      beds,
      location,
      phone,
      role,
      category,
      agreeTerms,
      status: 'pending'
    })

    // Send confirmation email (non-blocking)
    sendWaitlistConfirmation(email, name, pgName).catch(err => 
      console.error('Email sending failed:', err)
    )

    return NextResponse.json({
      message: 'Successfully joined the waitlist! Check your email for confirmation.',
      entry: {
        id: waitlistEntry._id,
        name: waitlistEntry.name,
        email: waitlistEntry.email,
        pgName: waitlistEntry.pgName,
        status: waitlistEntry.status,
        createdAt: waitlistEntry.createdAt
      }
    }, { status: 201 })

  } catch (error: any) {
    console.error('Waitlist submission error:', error)
    
    if (error.code === 11000) {
      // Handle duplicate key error
      const duplicateField = error.keyPattern?.phone ? 'phone number' : 'email address'
      return NextResponse.json(
        { error: `This ${duplicateField} is already registered in our waitlist` },
        { status: 409 }
      )
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json(
        { error: validationErrors.join(', ') },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}

// Protected route for admin to get all waitlist entries
export const GET = withAuth(async (request: NextRequest & { admin: any }) => {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const location = searchParams.get('location')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    // Build query
    const query: any = {}
    
    if (status && status !== 'all') {
      query.status = status
    }
    
    if (location && location !== 'all') {
      query.location = location
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { pgName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ]
    }

    // Calculate skip for pagination
    const skip = (page - 1) * limit

    // Get total count for pagination
    const total = await Waitlist.countDocuments(query)

    // Get waitlist entries
    const entries = await Waitlist.find(query)
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(limit)
      .lean()

    // Get stats
    const stats = await Waitlist.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ])

    const locationStats = await Waitlist.aggregate([
      {
        $group: {
          _id: '$location',
          count: { $sum: 1 }
        }
      }
    ])

    // Get entries from last 7 days
    const recentEntries = await Waitlist.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    })

    // Get entries by category
    const categoryStats = await Waitlist.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ])

    return NextResponse.json({
      entries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      },
      stats: {
        total,
        byStatus: stats.reduce((acc, item) => ({
          ...acc,
          [item._id]: item.count
        }), {
          pending: 0,
          contacted: 0,
          converted: 0,
          rejected: 0
        }),
        byLocation: locationStats.reduce((acc, item) => ({
          ...acc,
          [item._id]: item.count
        }), {}),
        byCategory: categoryStats.reduce((acc, item) => ({
          ...acc,
          [item._id]: item.count
        }), {}),
        recentEntries,
        conversionRate: stats.find(s => s._id === 'converted')?.count || 0 / Math.max(total, 1) * 100
      }
    })

  } catch (error) {
    console.error('Get waitlist error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
})

// Protected route for bulk operations (admin only)
export const PATCH = withAuth(async (request: NextRequest & { admin: any }) => {
  try {
    await dbConnect()
    
    const { action, ids, status } = await request.json()

    if (!action || !ids || !Array.isArray(ids)) {
      return NextResponse.json(
        { error: 'Invalid request. Action and IDs are required.' },
        { status: 400 }
      )
    }

    let result

    switch (action) {
      case 'updateStatus':
        if (!status || !['pending', 'contacted', 'converted', 'rejected'].includes(status)) {
          return NextResponse.json(
            { error: 'Invalid status' },
            { status: 400 }
          )
        }

        result = await Waitlist.updateMany(
          { _id: { $in: ids } },
          { status, updatedAt: new Date() }
        )

        return NextResponse.json({
          message: `Successfully updated ${result.modifiedCount} entries to ${status}`,
          modifiedCount: result.modifiedCount
        })

      case 'delete':
        result = await Waitlist.deleteMany({ _id: { $in: ids } })
        
        return NextResponse.json({
          message: `Successfully deleted ${result.deletedCount} entries`,
          deletedCount: result.deletedCount
        })

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('Bulk operation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
})