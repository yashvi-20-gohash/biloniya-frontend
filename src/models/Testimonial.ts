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

// Define the Testimonial interface and export it
export interface ITestimonial extends Document {
    type: string
    name: string
    countryName: string
    description: string
    rating: number // Could be out of 5
    image?: string
    isActive: boolean
    isDeleted: boolean
    createdAt?: Date
    updatedAt?: Date
    addedBy?: mongoose.Schema.Types.ObjectId
    updatedBy?: mongoose.Schema.Types.ObjectId
}

// Define the testimonial schema
const testimonialSchema: Schema<ITestimonial> = new Schema(
    {
        type: {
            type: String,
        },
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        countryName: {
            type: String,
        },
        description: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
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
testimonialSchema.pre<ITestimonial>('save', function (next) {
    if (this.isNew) {
        this.isDeleted = false
        this.isActive = true
    }
    next()
})

// Pre-insertMany hook to set default status on multiple docs
testimonialSchema.pre('insertMany', function (next, docs: ITestimonial[]) {
    if (docs && docs.length) {
        docs.forEach((doc) => {
            doc.isDeleted = false
            doc.isActive = true
        })
    }
    next()
})

// Add indexes to optimize query performance
testimonialSchema.index({ name: 1, company: 1 }) // Index for name and company to optimize queries

// Set virtuals to be included in JSON and Object responses
testimonialSchema.set('toObject', { virtuals: true })
testimonialSchema.set('toJSON', { virtuals: true })

// Add plugins
testimonialSchema.plugin(mongoosePaginate)
testimonialSchema.plugin(idValidator)

// Export the model and the interface, checking if it already exists
const Testimonial = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', testimonialSchema)
export default Testimonial
