import { NextResponse } from 'next/server'
import { createGallery, deleteGallery } from './action'
import { USER_ID_HEADER } from '@/src/constants'
import { verifyUserIdInDatabase } from '../../_lib/middleware'
import { responseUtils } from '@/src/lib/response'

export async function POST(request: Request) {
  try {
    // Retrieve the userId and token expiration time from headers
    const userId = request.headers.get(USER_ID_HEADER) as string
    const tokenExpiredTime = request.headers.get('tokenExpiredTime') as string

    // Validate the userId in the database
    const { isUserValid, errorMessage } = await verifyUserIdInDatabase(userId, tokenExpiredTime)

    if (!isUserValid) {
      return NextResponse.json(responseUtils.unAuthorized({ message: errorMessage }))
    }

    // Get the request body and create the gallery
    const body = await request.json()
    const response = await createGallery(body, userId)

    if (!response.success) {
      return NextResponse.json(responseUtils.failure({ message: response.error }))
    }

    return NextResponse.json(
      responseUtils.success({
        message: 'Gallery created successfully',
        data: response.data,
      })
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      responseUtils.internalServerError({
        message: 'Failed to create gallery',
        data: { error: (error as Error).message },
      })
    )
  }
}

export async function DELETE(request: Request) {
  try {
    // Retrieve the userId and token expiration time from headers
    const userId = request.headers.get(USER_ID_HEADER) as string
    const tokenExpiredTime = request.headers.get('tokenExpiredTime') as string

    // Validate the userId in the database
    const { isUserValid, errorMessage } = await verifyUserIdInDatabase(userId, tokenExpiredTime)

    if (!isUserValid) {
      return NextResponse.json(responseUtils.unAuthorized({ message: errorMessage }))
    }

    // Get the ids from the URL query parameters
    const url = new URL(request.url)
    const idsParam = url.searchParams.get('ids')

    if (!idsParam) {
      return NextResponse.json(
        responseUtils.badRequest({
          message: 'Gallery IDs are required.',
        })
      )
    }

    const ids = idsParam.split(',').map((id) => id.trim())

    // Call the deleteGallery function
    const response = await deleteGallery(ids, userId)

    if (!response.success) {
      return NextResponse.json(
        responseUtils.failure({
          message: response.error,
        })
      )
    }

    return NextResponse.json(
      responseUtils.success({
        message: `Successfully deleted ${response.message}`,
      })
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      responseUtils.internalServerError({
        message: 'Failed to delete gallery',
        data: { error: (error as Error).message },
      })
    )
  }
}
