import mongoose, { Schema, Document, Model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import idValidator from 'mongoose-id-validator'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  firstName: string
  status?: boolean
  lastName: string
  userRole: number
  password: string
  email: string
  address1?: string | null
  address2?: string | null
  city?: string | null
  zipCode?: string | null
  phone?: string | null
  username?: string
  isHeadUser: boolean
  isDeleted: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  lastLogin?: Date
  addedBy?: mongoose.Types.ObjectId | null
  updatedBy?: mongoose.Types.ObjectId | null
  loginOtp?: string
  loginOtpToken?: string
  registerStatus: number
  registerToken: string
  registerExpires: number
  resetPasswordToken: string
  resetPasswordExpires: number
  otp?: string // Add the OTP field
  fullName: string
  inactiveLimit: number
  userProfile?: string
}

interface IUserModel extends Model<IUser> {
  seedData: () => Promise<void> // Declare the seedData static method
}
const myCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'data',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
}
mongoosePaginate.paginate.options = { customLabels: myCustomLabels }

const userSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    userRole: {
      type: Number,
      default: 1,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      maxlength: [255, 'Email cannot be longer than 255 characters'],
      match: [/^\S+@\S+\.\S+$/, 'Email format is invalid'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    loginOtp: {
      type: String,
      default: null,
    },
    loginOtpToken: {
      type: String,
      default: null,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Number,
      default: null,
    },
    otp: {
      type: String,
      default: null,
    },
    inactiveLimit: {
      type: Number,
      default: 0,
    },
    addedBy: { type: Schema.Types.ObjectId },
    updatedBy: { type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
)

// Virtual property for full name
userSchema.virtual('fullName').get(function (this: IUser) {
  return this.lastName ? `${this.firstName} ${this.lastName}` : this.firstName
})

// Pre-save hook to set default status
userSchema.pre<IUser>('save', function (next) {
  if (this.isNew) {
    this.isDeleted = false
    this.isActive = true
  }
  if (!this.username) {
    this.username = this.email
  }
  next()
})

// Pre-insertMany hook to set default status on multiple docs
userSchema.pre('insertMany', function (next, docs: IUser[]) {
  if (docs && docs.length) {
    docs.forEach((doc) => {
      doc.isDeleted = false
      doc.isActive = true
    })
  }
  next()
})

// Indexes
userSchema.index({ email: 1 })
userSchema.index({ isActive: 1 })
userSchema.index({ createdAt: -1 })
// Plugins
userSchema.plugin(mongoosePaginate)
userSchema.plugin(idValidator)
userSchema.statics.seedData = async function () {
  const count = await this.countDocuments({ userRole: 2 })
  if (count === 0) {
    const hashedPassword = await bcrypt.hash('Admin@123', 10)
    const seedData = {
      firstName: 'SUPER',
      lastName: 'ADMIN',
      email: 'info@biloniya.com',
      password: hashedPassword,
      userRole: 2,
      registerStatus: 1,
    }
    await this.create(seedData)
  } else {
    console.log('Data already exists, skipping seeding')
  }
}
const User =
  (mongoose.models.User as IUserModel) ||
  mongoose.model<IUser, IUserModel>('User', userSchema)
export default User
