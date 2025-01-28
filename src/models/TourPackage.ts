import mongoose, { Document, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import idValidator from 'mongoose-id-validator';

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
};

// Set custom pagination options globally
mongoosePaginate.paginate.options = { customLabels: myCustomLabels };

// Define the Service interface and export it
export interface ITourPackage extends Document {
    title: string;
    description?: string;
    location?: string;
    tags: string[]; // Corrected to string[]
    duration?: string; // Duration in minutes
    tourImage?: string;
    isDeleted: boolean;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    addedBy?: mongoose.Schema.Types.ObjectId;
    updatedBy?: mongoose.Schema.Types.ObjectId;
}

// Define the service schema
const tourPackageSchema: Schema<ITourPackage> = new Schema(
    {
        title: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: null,
        },
        duration: {
            type: String, // Duration should be a number instead of a string
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
        tourImage: {
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
        timestamps: true, // Using `timestamps: true` will automatically handle createdAt and updatedAt
    }
);

// Pre-save hook to set default status
tourPackageSchema.pre<ITourPackage>('save', function (next) {
    if (this.isNew) {
        this.isDeleted = false;
        this.isActive = true;
    }
    next();
});

// Pre-insertMany hook to set default status on multiple docs
tourPackageSchema.pre('insertMany', function (next, docs: ITourPackage[]) {
    if (docs && docs.length) {
        docs.forEach((doc) => {
            doc.isDeleted = false;
            doc.isActive = true;
        });
    }
    next();
});

// Add indexes to optimize query performance
tourPackageSchema.index({ title: 1 }); // Corrected to `title` instead of `name`

// Set virtuals to be included in JSON and Object responses
tourPackageSchema.set('toObject', { virtuals: true });
tourPackageSchema.set('toJSON', { virtuals: true });

// Add plugins
tourPackageSchema.plugin(mongoosePaginate);
tourPackageSchema.plugin(idValidator);

// Export the model and the interface, checking if it already exists
const TourPackage = mongoose.models.TourPackage || mongoose.model<ITourPackage>('TourPackage', tourPackageSchema);
export default TourPackage;
