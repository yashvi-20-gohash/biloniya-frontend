import { NextResponse } from 'next/server'
import { createTestimonial, getTestimonialDetails, updateTestimonial, deleteTestimonial } from './action'
import { USER_ID_HEADER } from '@/src/constants'
import { verifyUserIdInDatabase } from '../../_lib/middleware'
import { responseUtils } from '@/src/lib/response'

// POST: Create Testimonial
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
        responseUtils.unAuthorized({ message: errorMessage })
      )
    }

    const body = await request.json()
    const response = await createTestimonial(body, userId)

    if (!response.success) {
      return NextResponse.json(
        responseUtils.failure({ message: response.error })
      )
    }

    return NextResponse.json(
      responseUtils.success({
        message: 'Testimonial created successfully',
        data: response.data,
      })
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      responseUtils.internalServerError({
        message: 'Failed to create testimonial',
        data: { error: (error as Error).message },
      })
    )
  }
}

// GET: Fetch Testimonial Details
export async function GET(request: Request) {
  try {
    const userId = request.headers.get(USER_ID_HEADER) as string
    const tokenExpiredTime = request.headers.get('tokenExpiredTime') as string
    const { isUserValid, errorMessage } = await verifyUserIdInDatabase(
      userId,
      tokenExpiredTime
    )

    if (!isUserValid) {
      return NextResponse.json(
        responseUtils.unAuthorized({ message: errorMessage })
      )
    }

    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    if (!id) {
      return NextResponse.json(
        responseUtils.badRequest({
          message: 'ID is required.',
        })
      )
    }

    const response = await getTestimonialDetails(id, userId)
    if (!response.success) {
      return NextResponse.json(
        responseUtils.failure({ message: response.error })
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
        message: 'Failed to fetch testimonial data',
        data: { error: (error as Error).message },
      })
    )
  }
}

// PUT: Update Testimonial
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
        responseUtils.unAuthorized({ message: errorMessage })
      )
    }

    const body = await request.json()
    if (!body.id) {
      return NextResponse.json(
        responseUtils.badRequest({
          message: 'ID is required.',
        })
      )
    }

    const updateData = await updateTestimonial(body.id, body, userId)
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
        message: 'Failed to update testimonial',
        data: { error: (error as Error).message },
      })
    )
  }
}

// DELETE: Delete Testimonial(s)
export async function DELETE(request: Request) {
  try {
    const userId = request.headers.get(USER_ID_HEADER) as string
    const tokenExpiredTime = request.headers.get('tokenExpiredTime') as string
    const { isUserValid, errorMessage } = await verifyUserIdInDatabase(
      userId,
      tokenExpiredTime
    )

    if (!isUserValid) {
      return NextResponse.json(
        responseUtils.unAuthorized({ message: errorMessage })
      )
    }

    const url = new URL(request.url)
    const idsParam = url.searchParams.get('ids')
    if (!idsParam) {
      return NextResponse.json(
        responseUtils.badRequest({
          message: 'ID is required.',
        })
      )
    }
    const ids = idsParam.split(',').map((id) => id.trim())
    const response = await deleteTestimonial(ids, userId)
    if (!response.success) {
      return NextResponse.json(
        responseUtils.failure({ message: response.error })
      )
    }

    return NextResponse.json(
      responseUtils.success({
        message: response.message,
      })
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      responseUtils.internalServerError({
        message: 'Failed to delete testimonial',
        data: { error: (error as Error).message },
      })
    )
  }
}
