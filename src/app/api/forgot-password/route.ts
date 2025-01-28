import { NextResponse } from 'next/server'
import { requestPasswordReset, checkValidLink, updatePassword } from './action'
import { responseUtils } from '@/src/lib/response'

export async function POST(req: Request) {
  const url = new URL(req.url)

  if (url.pathname === '/api/forgot-password') {
    const body = await req.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        responseUtils.badRequest({
          message: 'Email is required for password reset.',
        })
      )
    }

    const response = await requestPasswordReset(email)

    if (response.success) {
      return NextResponse.json(
        responseUtils.success({
          message: 'Password reset link sent successfully.',
          data: response.data,
        })
      )
    } else {
      return NextResponse.json(
        responseUtils.failure({
          message: `Failed to reset password: ${response.error}`,
        })
      )
    }
  }
}
export async function GET(req: Request) {
  const url = new URL(req.url)

  const token = url.searchParams.get('token')

  if (!token) {
    return NextResponse.json(
      responseUtils.badRequest({
        message: 'Token is required for password reset.',
      })
    )
  }

  const response = await checkValidLink(token)

  if (response.success) {
    return NextResponse.json(
      responseUtils.success({
        message: 'Link Valid',
        data: response.data,
      })
    )
  } else {
    return NextResponse.json(
      responseUtils.failure({
        message: `${response.error}`,
      })
    )
  }
}
export async function PUT(req: Request) {
  const body = await req.json()
  const { otp, token, password } = body

  if (!otp || !token || !password) {
    return NextResponse.json(
      responseUtils.badRequest({
        message: 'Otp and token , password are required',
      })
    )
  }

  const response = await updatePassword(body)

  if (response.success) {
    return NextResponse.json(
      responseUtils.success({
        message: 'Password update successfully',
        data: null,
      })
    )
  } else {
    return NextResponse.json(
      responseUtils.failure({
        message: `${response.error}`,
      })
    )
  }
}
