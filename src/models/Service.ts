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

// Define the Service interface and export it
export interface IService extends Document {
    title: string
    description?: string
    serviceType?: string
    location?: string
    tags: string[] // Corrected to string[]
    category?: string
    duration?: string // Duration in minutes
    serviceImage?: string
    isDeleted: boolean
    isActive: boolean
    createdAt?: Date
    updatedAt?: Date
    addedBy?: mongoose.Schema.Types.ObjectId
    updatedBy?: mongoose.Schema.Types.ObjectId
}

// Define the service schema
const serviceSchema: Schema<IService> = new Schema(
    {
        title: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: null,
        },
        serviceType: {
            type: String,
            default: null,
        },
        duration: {
            type: String,
            default: null,
        },
        location: {
            type: String,
            default: null,
        },
        tags: {
            type: [String],
            default: [], // Corrected to an empty array
        },
        serviceImage: {
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
serviceSchema.pre<IService>('save', function (next) {
    if (this.isNew) {
        this.isDeleted = false
        this.isActive = true
    }
    next()
})

// Pre-insertMany hook to set default status on multiple docs
serviceSchema.pre('insertMany', function (next, docs: IService[]) {
    if (docs && docs.length) {
        docs.forEach((doc) => {
            doc.isDeleted = false
            doc.isActive = true
        })
    }
    next()
})

// Add indexes to optimize query performance
serviceSchema.index({ title: 1 }) // Corrected to `title` instead of `name`

// Set virtuals to be included in JSON and Object responses
serviceSchema.set('toObject', { virtuals: true })
serviceSchema.set('toJSON', { virtuals: true })

// Add plugins
serviceSchema.plugin(mongoosePaginate)
serviceSchema.plugin(idValidator)

// Export the model and the interface, checking if it already exists
const Service = mongoose.models.Service || mongoose.model<IService>('Service', serviceSchema)
export default Service
