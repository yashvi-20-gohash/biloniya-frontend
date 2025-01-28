import { NextResponse } from 'next/server'
import { getContactUsDetails } from './action'
import { USER_ID_HEADER } from '@/src/constants'
import { verifyUserIdInDatabase } from '../../_lib/middleware'
import { responseUtils } from '@/src/lib/response'

export async function GET(request: Request) {
  try {
    const userId = request.headers.get(USER_ID_HEADER) as string
    const tokenExpiredTime = request.headers.get('tokenExpiredTime') as string
    const { isUserValid, errorMessage } = await verifyUserIdInDatabase(
      userId,
      tokenExpiredTime
    )

    if (!isUserValid) {
      return NextResponse.json(
        responseUtils.unAuthorized({ message: errorMessage })
      )
    }

    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    if (!id) {
      return NextResponse.json(
        responseUtils.badRequest({
          message: 'ID is required.',
        })
      )
    }
    const response = await getContactUsDetails(id)
    if (!response.success) {
      return NextResponse.json(
        responseUtils.failure({
          message: response.error,
        })
      )
    }

    return NextResponse.json(
      responseUtils.success({
        message: response.message,
        data: response.data,
      })
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      responseUtils.internalServerError({
        message: 'Failed to fetch contact message data',
        data: { error: (error as Error).message },
      })
    )
  }
}
