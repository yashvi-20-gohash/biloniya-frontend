import { NextResponse } from 'next/server'
import { responseUtils } from '@/src/lib/response' // Adjust the import path as necessary
import { updatePackageStatus } from '../action' // Adjust the import path if needed
import { USER_ID_HEADER } from '@/src/constants'
import { verifyUserIdInDatabase } from '../../../_lib/middleware'

// Handle PUT requests

export async function PUT(request: Request) {
  try {
    const userId = request.headers.get(USER_ID_HEADER) as string
    const tokenExpiredTime = request.headers.get('tokenExpiredTime') as string
    const { isUserValid, errorMessage } = await verifyUserIdInDatabase(
      userId,
      tokenExpiredTime
    )

    if (!isUserValid) {
      return NextResponse.json(
        responseUtils.unAuthorized({
          message: errorMessage,
        })
      )
    }

    const body = await request.json()
    if (body.id.length == 0) {
      return NextResponse.json(
        responseUtils.badRequest({
          message: 'ID is required.',
        })
      )
    }
    const updateData = await updatePackageStatus(body.id, body, userId)
    if (!updateData.success) {
      return NextResponse.json(
        responseUtils.failure({
          message: updateData.error,
        })
      )
    }

    return NextResponse.json(
      responseUtils.success({
        message: updateData.message,
        data: updateData.data,
      })
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      responseUtils.internalServerError({
        message: 'Failed to process request',
        data: { error: (error as Error).message },
      })
    )
  }
}
