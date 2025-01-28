import { connectDB } from '@/src/lib/mongodb'
import User from '@/src/models/User'
import UserToken from '@/src/models/UserToken'

export const verifyUserIdInDatabase = async (
  userId: string,
  tokenExpiredTime: string
): Promise<{ isUserValid: boolean; errorMessage?: string }> => {
  try {
    await connectDB()

    const user = await UserToken.findOne({
      userId: userId,
      tokenExpiredTime: tokenExpiredTime,
    })
    const getUser = await User.findOne({ _id: userId })
    if (!user || !getUser) {
      return {
        isUserValid: false,
        errorMessage: 'Your token has expired, please login again.',
      }
    }

    if (!getUser.isActive) {
      return { isUserValid: false, errorMessage: 'User is blocked' }
    }
    const currentTime = Math.floor(Date.now() / 1000)
    const convertExpiredTime = Math.floor(
      new Date(user.tokenExpiredTime).getTime() / 1000
    )
    if (convertExpiredTime < currentTime) {
      return {
        isUserValid: false,
        errorMessage: 'Your token has expired, please login again.',
      }
    }

    return { isUserValid: true }
  } catch (error) {
    console.error('Error verifying user ID in the database:', error)
    return { isUserValid: false, errorMessage: 'Error verifying user' }
  }
}
