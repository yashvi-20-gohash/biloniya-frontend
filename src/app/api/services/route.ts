import { NextResponse } from 'next/server'
import { getServiceList } from './action'
import { responseUtils } from '@/src/lib/response'

// Handler to fetch a list of blogs (no pagination)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const serviceType = searchParams.get('serviceType') || undefined

    const response = await getServiceList(serviceType)
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
