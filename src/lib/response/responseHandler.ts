import { NextApiRequest, NextApiResponse } from 'next'
import { responseUtils } from './index'
import responseCode from './responseCode'

/**
 * @description :: Extend NextApiResponse to include custom response methods.
 */
export interface CustomNextApiResponse extends NextApiResponse {
  success: (data?: Record<string, unknown>) => void
  failure: (data?: Record<string, unknown>) => void
  internalServerError: (data?: Record<string, unknown>) => void
  badRequest: (data?: Record<string, unknown>) => void
  recordNotFound: (data?: Record<string, unknown>) => void
  validationError: (data?: Record<string, unknown>) => void
  unAuthorized: (data?: Record<string, unknown>) => void
}

const responseHandler = (
  req: NextApiRequest,
  res: CustomNextApiResponse,
  next: () => void
) => {
  res.success = (data = {}) => {
    res.status(responseCode.success).json(responseUtils.success(data))
  }

  res.failure = (data = {}) => {
    res.status(responseCode.success).json(responseUtils.failure(data))
  }

  res.internalServerError = (data = {}) => {
    res
      .status(responseCode.internalServerError)
      .json(responseUtils.internalServerError(data))
  }

  res.badRequest = (data = {}) => {
    res.status(responseCode.badRequest).json(responseUtils.badRequest(data))
  }

  res.recordNotFound = (data = {}) => {
    res
      .status(responseCode.recordNotFound)
      .json(responseUtils.recordNotFound(data))
  }

  res.validationError = (data = {}) => {
    res
      .status(responseCode.validationError)
      .json(responseUtils.validationError(data))
  }

  res.unAuthorized = (data = {}) => {
    res.status(responseCode.unAuthorized).json(responseUtils.unAuthorized(data))
  }

  next()
}

export default responseHandler
