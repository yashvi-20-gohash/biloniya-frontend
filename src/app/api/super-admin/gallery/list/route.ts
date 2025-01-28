// src/app/api/smtp/route.ts
import { NextResponse } from 'next/server'
import { responseUtils } from '@/src/lib/response' // Adjust the import path as necessary
import { getGalleries } from '../action' // Adjust the import path if needed
import { USER_ID_HEADER } from '@/src/constants'
import { verifyUserIdInDatabase } from '../../../_lib/middleware'

// Handle GET requests
export async function GET(request: Request) {
  try {
    // Retrieve userId and token expiration time from request headers
    const userId = request.headers.get(USER_ID_HEADER) as string
    const tokenExpiredTime = request.headers.get('tokenExpiredTime') as string

    // Validate user in the database
    const { isUserValid, errorMessage } = await verifyUserIdInDatabase(userId, tokenExpiredTime)

    if (!isUserValid) {
      return NextResponse.json(
        responseUtils.unAuthorized({ message: errorMessage })
      )
    }

    // Extract query parameters from the URL
    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page')) || 1
    const limit = Number(searchParams.get('limit')) || 10
    const isActive = searchParams.get('query[isActive]') || undefined
    const search = searchParams.get('search') || undefined

    // Get the blogs from the action function
    const result = await getGalleries(page, limit, isActive, search, userId)

    // Return the appropriate response based on the result status
    if (result.status === 'SUCCESS') {
      return NextResponse.json(
        responseUtils.success({
          message: result.message,
          data: result.data,
        })
      )
    } else {
      return NextResponse.json(
        responseUtils.failure({
          message: result.message, // Use the message from the result
        })
      )
    }
  } catch (error) {
    console.error('Error in GET route:', error)
    return NextResponse.json(
      responseUtils.internalServerError({
        message: 'Internal server error',
        data: { error: (error as Error).message },
      })
    )
  }
}
