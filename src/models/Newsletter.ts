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

// Define the Newsletter interface and export it
export interface INewsletter extends Document {
    email: string
    isDeleted: boolean
    isActive: boolean
    createdAt?: Date
    updatedAt?: Date
    addedBy?: mongoose.Schema.Types.ObjectId
    updatedBy?: mongoose.Schema.Types.ObjectId
}

// Define the Newsletter schema
const newsletterSchema: Schema<INewsletter> = new Schema(
    {
        email: {
            type: String,
            default: ""
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
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
newsletterSchema.pre<INewsletter>('save', function (next) {
    if (this.isNew) {
        this.isDeleted = false
        this.isActive = true
    }
    next()
})

// Pre-insertMany hook to set default status on multiple docs
newsletterSchema.pre('insertMany', function (next, docs: INewsletter[]) {
    if (docs && docs.length) {
        docs.forEach((doc) => {
            doc.isActive = true
            doc.isDeleted = false
        })
    }
    next()
})

// Add indexes to optimize query performance
newsletterSchema.index({ title: 1 })
newsletterSchema.index({ sentDate: 1 })

// Set virtuals to be included in JSON and Object responses
newsletterSchema.set('toObject', { virtuals: true })
newsletterSchema.set('toJSON', { virtuals: true })

// Add plugins
newsletterSchema.plugin(mongoosePaginate)
newsletterSchema.plugin(idValidator)

// Export the model and the interface, checking if it already exists
const Newsletter =
    mongoose.models.Newsletter ||
    mongoose.model<INewsletter>('Newsletter', newsletterSchema)
export default Newsletter
