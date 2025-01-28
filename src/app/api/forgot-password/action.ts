'use server'
import { connectDB } from '@/src/lib/mongodb'
import User from '@/src/models/User'
import crypto from 'crypto'
import { generateOTP } from '@/src/lib/utils'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'
import { compile } from 'handlebars'
import AWS from 'aws-sdk'

// AWS SES client setup
const ses = new AWS.SES({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: process.env.AWS_REGION!,
})

interface EmailParams {
  toAddress: string
  subject: string
  body: string
}

// Function to send email using AWS SES
export const sendEmail = async ({
  toAddress,
  subject,
  body,
}: EmailParams): Promise<void> => {
  const params = {
    Destination: { ToAddresses: [toAddress] }, // Recipient email address
    Message: {
      Body: { Html: { Data: body } }, // Email content
      Subject: { Data: subject }, // Email subject
    },
    Source: process.env.AWS_SES_EMAIL_FROM!, // Verified email address in SES
  }

  try {
    const data = await ses.sendEmail(params).promise()
    console.log('Email sent successfully:', data)
  } catch (error) {
    console.error('Error sending email:', (error as Error).message)
  }
}

export const requestPasswordReset = async (email: string) => {
  await connectDB()

  const user = await User.findOne({ email })
  if (!user) {
    return {
      success: false,
      error: 'No user found with this email.',
    }
  }

  const token = crypto.randomBytes(20).toString('hex')
  user.resetPasswordToken = token
  user.resetPasswordExpires = Date.now() + 600000 // 10 minutes

  const otp = generateOTP() // Function to generate a 6-digit OTP
  user.otp = otp // Save OTP to the user model
  await user.save()
  const templatePath = path.join(
    process.cwd(),
    'src/lib/templates',
    'passwordResetTemplate.hbs'
  )
  const htmlTemplate = fs.readFileSync(templatePath, 'utf-8')
  const template = compile(htmlTemplate)

  const html = template({
    RESET_LINK: `${process.env.NEXTAUTH_URL}/reset-password/${token}`, // Dynamic reset link
    OTP: otp, // Dynamic OTP
    LOGO: `${process.env.NEXTAUTH_URL}/footer-logo.png`
  })

  try {
    await sendEmail({
      toAddress: user.email,
      subject: 'Password Reset',
      body: html,
    })
    return {
      success: true,
      message: 'Reset link and OTP sent to your email.',
      data: { token },
    }
  } catch (error) {
    console.error('Error sending email:', error)
    return {
      success: false,
      error: 'Error sending reset link. Please try again later.',
    }
  }
}
export const checkValidLink = async (token: string) => {
  await connectDB()

  const user = await User.findOne({ resetPasswordToken: token })
  if (!user) {
    return {
      success: false,
      error: 'No user found with this token.',
    }
  }

  // Check if the token is expired
  const isTokenExpired = Date.now() > user.resetPasswordExpires
  if (isTokenExpired) {
    return {
      success: false,
      error: 'The reset link has expired. Please request a new one.',
    }
  }

  return {
    success: true,
    message: 'Reset link is valid.',
    data: { token, email: user.email },
  }
}

export const updatePassword = async (values: {
  otp: string
  token: string
  password: string
}) => {
  const { otp, token, password } = values
  try {
    await connectDB()

    // Check if user exists
    const user = await User.findOne({ resetPasswordToken: token })
    if (!user) {
      return {
        success: false,
        error: 'User not found. Please register first.',
      }
    }

    // Check if the OTP matches
    if (user.otp !== otp) {
      return {
        success: false,
        error: 'Invalid OTP. Please try again.',
      }
    }

    // Check if the OTP has expired
    if (Date.now() > user.resetPasswordExpires) {
      return {
        success: false,
        error: 'OTP has expired. Please request a new one.',
      }
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Update user details
    user.password = hashedPassword
    user.otp = undefined // Clear the OTP
    user.resetPasswordToken = '' // Clear the reset token
    user.resetPasswordExpires = 0 // Clear the expiration time
    await user.save() // Save user changes to the database

    return {
      data: {},
      success: true,
    }
  } catch (e) {
    // Log the error details
    console.error('Error updating password:', e)

    // Return a generic error message to the client
    return {
      success: false,
      error: 'Server error. Please try again later.',
    }
  }
}
