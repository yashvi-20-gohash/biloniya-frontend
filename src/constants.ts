// /src/constants.ts

export const USER_ID_HEADER = 'X-User-ID'
// /src/utils/getCurrentRedirectUrlClient.ts

export const CURRENT_REDIRECT_URL = (() => {
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname
    const path = pathname.split('/')[1] === 'super-admin'
    return path ? `/super-admin` : '/'
  }
  return null
})()
export const CURRENT_BASE_URL =
  CURRENT_REDIRECT_URL === '/' ? '' : CURRENT_REDIRECT_URL

export const CREDIT_RANGES = [
  { min: 1, max: 100, value: 5.0 },
  { min: 101, max: 200, value: 4.0 },
  { min: 201, max: Infinity, value: 3.0 },
]
