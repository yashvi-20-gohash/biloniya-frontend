import { NextResponse } from 'next/server'
import { createContactUs } from './action'
import { responseUtils } from '@/src/lib/response'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const response = await createContactUs(body)

    if (!response.success) {
      return NextResponse.json(
        responseUtils.failure({ message: response.error })
      )
    }

    return NextResponse.json(
      responseUtils.success({
        message: 'Contact message created successfully',
        data: response.data,
      })
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      responseUtils.internalServerError({
        message: 'Failed to create contact message',
        data: { error: (error as Error).message },
      })
    )
  }
}
