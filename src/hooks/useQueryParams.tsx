export interface IQueryParams {
  itemCount?: number
  perPage?: number
  limit: number
  search?: string
  page: number
  pageCount?: number
  currentPage?: number
  slNo?: number
  hasPrevPage?: boolean
  hasNextPage?: boolean
  prev?: number | null
  next?: number | null
  [key: string]: unknown
}
