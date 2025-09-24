import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Waitlist from '@/models/Waitlist'
import { withAuth } from '@/lib/auth'

export const GET = withAuth(async (request: NextRequest & { admin: any }, { params }: { params: { id: string } }) => {
  try {
    await dbConnect()
    
    const { id } = params
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID parameter is required' },
        { status: 400 }
      )
    }

    const entry = await Waitlist.findById(id)
    
    if (!entry) {
      return NextResponse.json(
        { error: 'Waitlist entry not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ entry })

  } catch (error) {
    console.error('Get waitlist entry error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
})

// Update waitlist entry
export const PUT = withAuth(async (request: NextRequest & { admin: any }, { params }: { params: { id: string } }) => {
  try {
    await dbConnect()
    
    const { id } = params
    const updateData = await request.json()
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID parameter is required' },
        { status: 400 }
      )
    }

    // Validate status if provided
    if (updateData.status && !['pending', 'contacted', 'converted', 'rejected'].includes(updateData.status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      )
    }

    const entry = await Waitlist.findByIdAndUpdate(
      id,
      { 
        ...updateData, 
        updatedAt: new Date() 
      },
      { 
        new: true, 
        runValidators: true 
      }
    )
    
    if (!entry) {
      return NextResponse.json(
        { error: 'Waitlist entry not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Waitlist entry updated successfully',
      entry
    })

  } catch (error: any) {
    console.error('Update waitlist entry error:', error)
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json(
        { error: validationErrors.join(', ') },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
})

// Delete waitlist entry
export const DELETE = withAuth(async (request: NextRequest & { admin: any }, { params }: { params: { id: string } }) => {
  try {
    await dbConnect()
    
    const { id } = params
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID parameter is required' },
        { status: 400 }
      )
    }

    const entry = await Waitlist.findByIdAndDelete(id)
    
    if (!entry) {
      return NextResponse.json(
        { error: 'Waitlist entry not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Waitlist entry deleted successfully',
      deletedEntry: entry
    })

  } catch (error) {
    console.error('Delete waitlist entry error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
})