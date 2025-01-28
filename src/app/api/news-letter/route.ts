import { NextResponse } from 'next/server'
import { submitNewLetter } from './action'
import { responseUtils } from '@/src/lib/response'

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const body = await request.json()
    if (!body.email) {
      return NextResponse.json(
        responseUtils.badRequest({
          message: 'Email is required.',
        })
      )
    }
    // Submit the newsletter request
    const response = await submitNewLetter(body)

    // Check if the submission was successful
    if (!response.success) {
      return NextResponse.json(
        responseUtils.failure({
          message: response.error || 'Failed to submit the newsletter',
        }),
        { status: 400 }
      )
    }

    // Return a successful response
    return NextResponse.json(
      responseUtils.success({
        message: response.message,
      }),
      { status: 200 }
    )
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in POST /newsletter:', error)

    // Return an internal server error response
    return NextResponse.json(
      responseUtils.internalServerError({
        message: 'Failed to submit the newsletter',
        data: { error: (error as Error).message },
      }),
      { status: 500 }
    )
  }
}
