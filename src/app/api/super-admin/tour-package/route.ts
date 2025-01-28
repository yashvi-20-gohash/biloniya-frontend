import { NextResponse } from 'next/server'
import { createPackage, getPackageDetails, updatePackage, deletePackage } from './action'
import { USER_ID_HEADER } from '@/src/constants'
import { verifyUserIdInDatabase } from '../../_lib/middleware'
import { responseUtils } from '@/src/lib/response'

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

    const response = await createPackage(body, userId)

    if (!response.success) {
      return NextResponse.json(
        responseUtils.failure({ message: response.error })
      )
    }

    return NextResponse.json(
      responseUtils.success({
        message: 'Tour Package created successfully',
        data: response.data,
      })
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      responseUtils.internalServerError({
        message: 'Failed to create Tour Package',
        data: { error: (error as Error).message },
      })
    )
  }
}

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
    const response = await getPackageDetails(id, userId)
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
        message: 'Failed to fetch Tour Package data',
        data: { error: (error as Error).message },
      })
    )
  }
}

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

    const updateData = await updatePackage(body.id, body, userId)
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
        message: 'Failed to update Tour Package',
        data: { error: (error as Error).message },
      })
    )
  }
}

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
    const response = await deletePackage(ids, userId)
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
      })
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      responseUtils.internalServerError({
        message: 'Failed to delete Tour Package',
        data: { error: (error as Error).message },
      })
    )
  }
}
