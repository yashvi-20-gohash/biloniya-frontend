import { connectDB } from '@/src/lib/mongodb'
import User from '@/src/models/User'
import UserToken from '@/src/models/UserToken'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'
import type { User as IUserType } from 'next-auth'
import { CURRENT_REDIRECT_URL } from '../constants'
import NextAuth from 'next-auth'

interface IUser extends IUserType {
  status?: 'SUCCESS' | 'FAILURE'
  message?: string
  data: {
    id: string
    email: string
    firstName?: string
    lastName?: string
    userRole?: number
    tokenExpiredTime?: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<IUser | null> {
        await connectDB()
        const user = await User.findOne({
          email: credentials?.email,
          registerStatus: 1,
        })
          .select(
            'password userRole firstName lastName email isActive lastLogin'
          )
          .exec()

        if (!user) throw new Error('Invalid credentials')
        if (user.userRole !== 1) throw new Error('You are not authorised------')

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          user.password
        )
        if (!passwordMatch) {
          throw new Error('Invalid credentials')
        }
        if (!user.isActive) {
          throw new Error('Your account is blocked. Please contact support.')
        }
        const expiresIn = process.env.EXPIRES_IN || '1h'
        const expiresInValue = parseInt(expiresIn)
        const expiresInUnit = expiresIn.replace(/\d/, '')
        const token = jwt.sign(
          { id: user._id, role: user.userRole },
          process.env.JWT_SECRET || 'your_jwt_secret',
          { expiresIn }
        )

        const expire = dayjs()
          .add(
            expiresInValue,
            expiresInUnit === 'h'
              ? 'hour'
              : expiresInUnit === 'm'
                ? 'minute'
                : expiresInUnit === 's'
                  ? 'second'
                  : expiresInUnit === 'd'
                    ? 'day'
                    : expiresInUnit === 'w'
                      ? 'week'
                      : 'hour' // Default to 'hour' if unit is unrecognized
          )
          .toISOString()

        // Token ko UserToken model mein store karna
        await UserToken.create({
          userId: user._id,
          token,
          tokenExpiredTime: expire,
        })
        user.lastLogin = new Date()
        await user.save()
        return {
          status: 'SUCCESS',
          message: 'Login successful',
          data: {
            id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userRole: user.userRole,
            tokenExpiredTime: expire.toString(),
          },
        } as IUser
      },
    }),
    CredentialsProvider({
      id: 'verifyotp',
      name: 'VerifyOtp',
      credentials: {
        token: { label: 'Token', type: 'text' },
        otp: { label: 'Otp', type: 'text' },
      },
      async authorize(credentials): Promise<IUser | null> {
        //verify otp
        await connectDB()
        const user = await User.findOne({
          loginOtpToken: credentials?.token,
          registerStatus: 1,
          userRole: 2,
        })
          .select('loginOtp loginOtpToken email userRole firstName lastName')
          .exec()

        if (!user) throw new Error('Invalid token')

        if (credentials?.otp != user.loginOtp) {
          throw new Error('Invalid OTP')
        }
        const expiresIn = process.env.EXPIRES_IN || '1h'
        const expiresInValue = parseInt(expiresIn)
        const expiresInUnit = expiresIn.replace(/\d/, '')
        const token = jwt.sign(
          { id: user._id, role: user.userRole },
          process.env.JWT_SECRET || 'your_jwt_secret',
          { expiresIn }
        )

        const expire = dayjs()
          .add(
            expiresInValue,
            expiresInUnit === 'h'
              ? 'hour'
              : expiresInUnit === 'm'
                ? 'minute'
                : expiresInUnit === 's'
                  ? 'second'
                  : expiresInUnit === 'd'
                    ? 'day'
                    : expiresInUnit === 'w'
                      ? 'week'
                      : 'hour' // Default to 'hour' if unit is unrecognized
          )
          .toISOString()

        // Token ko UserToken model mein store karna
        await UserToken.create({
          userId: user._id,
          token,
          tokenExpiredTime: expire,
        })
        user.lastLogin = new Date()
        user.loginOtpToken = ''
        user.loginOtp = ''
        await user.save()
        return {
          status: 'SUCCESS',
          message: 'Login successful',
          data: {
            id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userRole: user.userRole,
            tokenExpiredTime: expire.toString(),
          },
        } as IUser
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 86400,
    updateAge: 0,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.tokenExpiredTime = user.data?.tokenExpiredTime || ''
        token.id = user.data?.id
        token.name = `${user.data?.firstName} ${user.data?.lastName}`
        token.email = user.data?.email
        token.userRole = user.data?.userRole ?? 1
        token.isSuperAdmin = user.data?.userRole === 2
        token.sessionType = user.data?.userRole === 2 ? 'SUPER_ADMIN' : 'USER'
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.tokenExpiredTime = token.tokenExpiredTime as string
        session.user.id = token.id as string
        session.user.userRole = (token.userRole as number) ?? 1
        session.user.isSuperAdmin = token?.userRole === 2
        session.user.sessionType =
          token?.userRole === 2 ? 'SUPER_ADMIN' : 'USER'
      }
      return session
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith('/') || url === baseUrl) {
        if (url.includes('/super-admin')) {
          return `${baseUrl}/super-admin/dashboard`
        }
        return `${baseUrl}/dashboard`
      }
      return url
    },
  },
  pages: {
    signIn: `${CURRENT_REDIRECT_URL}/signin`,
    error: `${CURRENT_REDIRECT_URL}/signin`,
  },
}
export const { auth, handlers, signOut, signIn } = NextAuth(authOptions)

export async function customSignOut(userId: string) {
  await UserToken.deleteMany({ userId })
}
