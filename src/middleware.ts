import { responseUtils } from '@/src/lib/response'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { USER_ID_HEADER } from './constants'

interface Token {
  sub: string
  exp: number
  id: string
  userRole: number
  tokenExpiredTime: string
}


export async function middleware(request: NextRequest) {
  const token = (await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })) as Token | null

  const { pathname } = request.nextUrl
  console.log('token', token);

  if (pathname.startsWith('/api')) {
    if (!token) {
      console.error('No token found or token retrieval failed.')
      return NextResponse.json(
        responseUtils.unAuthorized({
          message: 'Your token has expired, please login again.',
        })
      )
    }
    const currentTime = Math.floor(Date.now() / 1000)
    if (token.exp < currentTime) {
      console.warn('Token expired. User must reauthenticate.')
      return NextResponse.json(
        responseUtils.unAuthorized({
          message: 'Your token has expired, please login again.',
        })
      )
    }
    const userId = token.id
    const tokenExpiredTime = token.tokenExpiredTime
    const response = NextResponse.next()
    response.headers.set(USER_ID_HEADER, userId || '')
    response.headers.set('tokenExpiredTime', tokenExpiredTime || '')

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/super-admin/:path*'],
}
