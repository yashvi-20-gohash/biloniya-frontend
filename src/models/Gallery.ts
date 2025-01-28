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

// Define the Gallery interface and export it
export interface IGallery extends Document {
    title: string
    image: string
    isPublic: boolean
    isActive: boolean
    isDeleted: boolean
    createdAt?: Date
    updatedAt?: Date
    addedBy?: mongoose.Schema.Types.ObjectId
    updatedBy?: mongoose.Schema.Types.ObjectId
}

// Define the gallery schema
const gallerySchema: Schema<IGallery> = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
        },
        image: {
            type: String,
            required: true,
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
gallerySchema.pre<IGallery>('save', function (next) {
    if (this.isNew) {
        this.isDeleted = false
        this.isActive = true
    }
    next()
})

// Pre-insertMany hook to set default status on multiple docs
gallerySchema.pre('insertMany', function (next, docs: IGallery[]) {
    if (docs && docs.length) {
        docs.forEach((doc) => {
            doc.isDeleted = false
            doc.isActive = true
        })
    }
    next()
})

// Add indexes to optimize query performance
gallerySchema.index({ title: 1 })

// Set virtuals to be included in JSON and Object responses
gallerySchema.set('toObject', { virtuals: true })
gallerySchema.set('toJSON', { virtuals: true })

// Add plugins
gallerySchema.plugin(mongoosePaginate)
gallerySchema.plugin(idValidator)

// Export the model and the interface, checking if it already exists
const Gallery = mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', gallerySchema)
export default Gallery
