import mongoose, { Document, Model } from 'mongoose'

export interface IWaitlist extends Document {
  name: string
  email: string 
  pgName: string
  beds: string
  location: string
  phone: string
  role: string
  category: string
  agreeTerms: boolean
  createdAt: Date
  updatedAt: Date
  status: 'pending' | 'contacted' | 'converted' | 'rejected'
}

const WaitlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v: string) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
      },
      message: 'Please provide a valid email address'
    }
  },
  pgName: {
    type: String,
    required: [true, 'PG Name is required'],
    trim: true,
    maxlength: [100, 'PG Name cannot exceed 100 characters']
  },
  beds: {
    type: String,
    required: [true, 'Number of beds is required'],
    enum: ['1-10', '10+', '20+', '50+', '100+']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    enum: ['Bhubaneswar', 'Mumbai', 'Delhi', 'Kolkata', 'Bengaluru', 'City Not Mentioned']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v: string) {
        return /^[6-9]\d{9}$/.test(v)
      },
      message: 'Please provide a valid 10-digit phone number'
    }
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['PG Owner', 'Manager', 'Property Manager']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Paying Guest', 'Student Hostel', 'Other']
  },
  agreeTerms: {
    type: Boolean,
    required: [true, 'Terms agreement is required'],
    validate: {
      validator: function(v: boolean) {
        return v === true
      },
      message: 'Terms and conditions must be accepted'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'converted', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

WaitlistSchema.index({ createdAt: -1 })
WaitlistSchema.index({ location: 1 })
WaitlistSchema.index({ status: 1 })
WaitlistSchema.index({ phone: 1 }, { unique: true })
WaitlistSchema.index({ email: 1 }, { unique: true }) 

const Waitlist: Model<IWaitlist> = mongoose.models.Waitlist || mongoose.model<IWaitlist>('Waitlist', WaitlistSchema)

export default Waitlist