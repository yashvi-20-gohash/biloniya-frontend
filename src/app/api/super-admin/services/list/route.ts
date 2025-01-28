// src/app/api/smtp/route.ts
import { NextResponse } from 'next/server'
import { responseUtils } from '@/src/lib/response' // Adjust the import path as necessary
import { getServices } from '../action' // Adjust the import path if needed
import { USER_ID_HEADER } from '@/src/constants'
import { verifyUserIdInDatabase } from '../../../_lib/middleware'

// Handle GET requests
export async function GET(request: Request) {
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

  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10
  const isActive = searchParams.get('query[isActive]') || undefined
  const search = searchParams.get('search') || undefined

  try {
    const result = await getServices(page, limit, isActive, search, userId)

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
          message: result.message, // Change to use result.message
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
