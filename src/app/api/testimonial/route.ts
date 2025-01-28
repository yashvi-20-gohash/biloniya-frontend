import { NextResponse } from 'next/server'
import { getTestimonialList } from './action'
import { responseUtils } from '@/src/lib/response'

// Handler to fetch a list of blogs (no pagination)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || undefined

    const response = await getTestimonialList(type)
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
