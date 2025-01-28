import { NextResponse } from 'next/server'
import { responseUtils } from '@/src/lib/response'
import { getDashboardStatistics } from './action'
import { USER_ID_HEADER } from '@/src/constants'
import { verifyUserIdInDatabase } from '../../_lib/middleware'

export async function POST(request: Request) {
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
    const dashboardData = await getDashboardStatistics()

    if (!dashboardData.success) {
      return NextResponse.json(
        responseUtils.failure({
          message: dashboardData.message,
        })
      )
    }

    return NextResponse.json(
      responseUtils.success({
        message: 'Dashboard statistics retrieved successfully',
        data: dashboardData.data,
      })
    )
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      responseUtils.internalServerError({
        message: 'Failed to process the request',
        data: { error: (error as Error).message },
      })
    )
  }
}
