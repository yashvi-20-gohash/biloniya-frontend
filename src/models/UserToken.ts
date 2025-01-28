import mongoose, { Schema, Document } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import idValidator from 'mongoose-id-validator'

export interface IUserToken extends Document {
  userId: mongoose.Types.ObjectId
  token: string
  tokenExpiredTime: Date
  isTokenExpired: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  addedBy?: mongoose.Types.ObjectId | null
  updatedBy?: mongoose.Types.ObjectId | null
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

const userTokenSchema: Schema<IUserToken> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    tokenExpiredTime: { type: Date, default: null },
    isTokenExpired: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    addedBy: { type: Schema.Types.ObjectId },
    updatedBy: { type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
)

// Pre-save hook to set defaults
userTokenSchema.pre<IUserToken>('save', function (next) {
  if (this.isNew) {
    this.isActive = true
    this.isTokenExpired = false
  }
  next()
})

// Pre-insertMany hook to set defaults for multiple documents

userTokenSchema.pre('insertMany', function (next, docs: IUserToken[]) {
  if (docs && docs.length) {
    docs.forEach((doc) => {
      //   doc.isDeleted = false
      doc.isActive = true
    })
  }
  next()
})

// Plugins
userTokenSchema.plugin(mongoosePaginate)
userTokenSchema.plugin(idValidator)

// Model export
const UserToken =
  mongoose.models.UserToken ||
  mongoose.model<IUserToken>('UserToken', userTokenSchema)

export default UserToken
