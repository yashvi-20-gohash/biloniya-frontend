import { NextResponse } from 'next/server'
import { USER_ID_HEADER } from '@/src/constants'
import { responseUtils } from '@/src/lib/response'
import { verifyUserIdInDatabase } from '../../../_lib/middleware'
import { replyToContactUs } from '../action'

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
        if (!body.id) {
            return NextResponse.json(
                responseUtils.badRequest({ message: 'id is required' })
            )
        }

        const response = await replyToContactUs(body.id, body)

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
                message: 'Failed to fetch contact message data',
                data: { error: (error as Error).message },
            })
        )
    }
}
