// src/types/next-auth.d.ts
// NextAuth import ko hata diya gaya hai
import 'next-auth' // Directly import for type augmentation

declare module 'next-auth' {
  interface User {
    accessToken?: string // User type mein accessToken ki property add ki gayi
    data?: {
      id: string // User ID ki property
      email: string
      firstName?: string
      lastName?: string
      image?: string | null // Optional image property
      name?: string
      accessToken?: string
      userRole?: number
      isSuperAdmin?: boolean
      tokenExpiredTime?: string
      sessionType?: 'SUPER_ADMIN' | 'USER'
    }
    status?: 'SUCCESS' | 'FAILURE'
    message?: string
  }
  interface Session {
    accessToken?: string // Access Token ki property add ki gayi
    user: {
      id: string // User ID ki property
      email: string
      firstName?: string
      lastName?: string
      image?: string | null // Optional image property
      name?: string
      userRole?: number
      isSuperAdmin?: boolean
      tokenExpiredTime?: string
      sessionType?: 'SUPER_ADMIN' | 'USER'
    }
  }
}
