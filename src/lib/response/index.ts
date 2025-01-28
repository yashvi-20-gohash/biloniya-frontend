import responseStatus from './responseStatus'

interface ResponseData {
  message?: string
  data?: Record<string, unknown> | null
}

interface Response {
  status: string
  message: string
  data: Record<string, unknown> | null
}

export const responseUtils = {
  success: (data: ResponseData = {}): Response => ({
    status: responseStatus.success,
    message: data.message || 'Your request is successfully executed',
    data: data.data && Object.keys(data.data).length ? data.data : null,
  }),

  failure: (data: ResponseData = {}): Response => ({
    status: responseStatus.failure,
    message: data.message || 'Some error occurred while performing action.',
    data: data.data && Object.keys(data.data).length ? data.data : null,
  }),

  internalServerError: (data: ResponseData = {}): Response => ({
    status: responseStatus.serverError,
    message: data.message || 'Internal server error.',
    data: data.data && Object.keys(data.data).length ? data.data : null,
  }),

  badRequest: (data: ResponseData = {}): Response => ({
    status: responseStatus.badRequest,
    message: data.message || 'Request parameters are invalid or missing.',
    data: data.data && Object.keys(data.data).length ? data.data : null,
  }),

  recordNotFound: (data: ResponseData = {}): Response => ({
    status: responseStatus.recordNotFound,
    message: data.message || 'Record(s) not found with specified criteria.',
    data: data.data && Object.keys(data.data).length ? data.data : null,
  }),

  validationError: (data: ResponseData = {}): Response => ({
    status: responseStatus.validationError,
    message: data.message || `Invalid Data, Validation Failed.`,
    data: data.data && Object.keys(data.data).length ? data.data : null,
  }),

  unAuthorized: (data: ResponseData = {}): Response => ({
    status: responseStatus.unauthorized,
    message: data.message || 'You are not authorized to access the request',
    data: data.data && Object.keys(data.data).length ? data.data : null,
  }),
}
