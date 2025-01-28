// /app/api/resend-otp/route.ts
import { NextResponse } from 'next/server'
import { responseUtils } from '@/src/lib/response'
import { resendOTP } from './action'

export async function POST(req: Request) {
  const url = new URL(req.url)
  if (url.pathname === '/api/resend-otp') {
    const body = await req.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        responseUtils.badRequest({
          message: 'email is required.',
        })
      )
    }

    const response = await resendOTP(email)

    if (response.success) {
      return NextResponse.json(
        responseUtils.success({
          message: response.message,
          data: null,
        })
      )
    } else {
      return NextResponse.json(
        responseUtils.failure({
          message: `Failed to resend otp: ${response.error}`,
        })
      )
    }
  }
}
