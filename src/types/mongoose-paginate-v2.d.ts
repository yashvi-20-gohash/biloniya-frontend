import 'mongoose'
import { Document, Model as MongooseModel } from 'mongoose'

interface PaginateOptions {
  page?: number
  limit?: number
  sort?: Record<string, 1 | -1> // Specify sort order as 1 (ascending) or -1 (descending)
  // Add any other options you want to support
}

// Define a generic interface for the pagination result
interface PaginateResult<T> {
  docs: T[]
  total: number
  page: number
  limit: number
}

declare module 'mongoose' {
  interface Model<T extends Document> extends MongooseModel<T> {
    paginate(
      query?: Partial<Record<keyof T, unknown>>, // Use `unknown` instead of `any`
      options?: PaginateOptions,
      callback?: (err: Error | null, result: PaginateResult<T>) => void
    ): Promise<PaginateResult<T>>
  }
}
