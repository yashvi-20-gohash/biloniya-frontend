import { authOptions } from '@/src/lib/auth'
import NextAuth from 'next-auth'

// Correctly handling GET and POST requests in Next.js route file

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
