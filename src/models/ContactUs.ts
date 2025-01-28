import mongoose, { Document, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import idValidator from 'mongoose-id-validator'

// Define custom pagination labels
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

// Define the ContactUs interface and export it
export interface IContactUs extends Document {
  name: string
  email: string
  phone: string
  replyMessage: string
  message: string
  isDeleted: boolean
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
  addedBy?: mongoose.Schema.Types.ObjectId
  updatedBy?: mongoose.Schema.Types.ObjectId
}

// Define the ContactUs schema
const contactUsSchema: Schema<IContactUs> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      maxlength: [255, 'Name cannot be longer than 255 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      maxlength: [15, 'Phone number cannot be longer than 15 characters'],
    },
    message: {
      type: String,
      default: null,
    },
    replyMessage: {
      type: String,
      default: null,
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
    addedBy: { type: Schema.Types.ObjectId, default: null },
    updatedBy: { type: Schema.Types.ObjectId, default: null },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
)

// Pre-save hook to set default status
contactUsSchema.pre<IContactUs>('save', function (next) {
  if (this.isNew) {
    this.isActive = true
    this.isDeleted = false
  }
  next()
})

// Pre-insertMany hook to set default status on multiple docs
contactUsSchema.pre('insertMany', function (next, docs: IContactUs[]) {
  if (docs && docs.length) {
    docs.forEach((doc) => {
      doc.isActive = true
      doc.isDeleted = false
    })
  }
  next()
})

// Add indexes to optimize query performance
contactUsSchema.index({ email: 1 })
contactUsSchema.index({ phone: 1 })

// Set virtuals to be included in JSON and Object responses
contactUsSchema.set('toObject', { virtuals: true })
contactUsSchema.set('toJSON', { virtuals: true })

// Add plugins
contactUsSchema.plugin(mongoosePaginate)
contactUsSchema.plugin(idValidator)

// Export the model and the interface, checking if it already exists
const ContactUs =
  mongoose.models.ContactUs ||
  mongoose.model<IContactUs>('ContactUs', contactUsSchema)
export default ContactUs
