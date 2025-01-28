import { NextResponse } from 'next/server'
import { getPackageList } from './action'
import { responseUtils } from '@/src/lib/response'

export async function GET() {
  try {
    const response = await getPackageList()
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
        message: 'Failed to fetch blog list',
        data: { error: (error as Error).message },
      })
    )
  }
}
