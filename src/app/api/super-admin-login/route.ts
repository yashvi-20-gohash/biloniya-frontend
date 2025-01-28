import { NextResponse } from 'next/server'
import { responseUtils } from '@/src/lib/response'
import { connectDB } from '@/src/lib/mongodb'
import User from '@/src/models/User'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'
import { compile } from 'handlebars'
import AWS from 'aws-sdk'

// AWS SES client setup
const ses = new AWS.SES({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  region: process.env.AWS_REGION as string,
})

interface EmailParams {
  toAddress: string
  subject: string
  body: string
}

// Function to send email using AWS SES
const sendEmail = async ({
  toAddress,
  subject,
  body,
}: EmailParams): Promise<void> => {
  const params = {
    Destination: { ToAddresses: [toAddress] },
    Message: {
      Body: { Html: { Data: body } },
      Subject: { Data: subject },
    },
    Source: process.env.AWS_SES_EMAIL_FROM as string,
  }

  try {
    const data = await ses.sendEmail(params).promise()
    console.log('Email sent successfully:', data)
  } catch (error) {
    console.error('Error sending email:', (error as Error).message)
  }
}

export async function POST(request: Request) {
  await connectDB()

  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        responseUtils.badRequest({
          message: 'Email and password are required.',
        })
      )
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
      registerStatus: 1,
      userRole: 2,
    })
      .select('password userRole email')
      .exec()

    if (!user) {
      return NextResponse.json(
        responseUtils.failure({
          message: 'Invalid email or password.',
        })
      )
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return NextResponse.json(
        responseUtils.failure({
          message: 'Invalid email or password.',
        })
      )
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const token = Buffer.from(crypto.randomBytes(20)).toString('hex')

    const templatePath = path.join(
      process.cwd(),
      'src/lib/templates',
      'loginOtp.hbs'
    )
    const htmlTemplate = fs.readFileSync(templatePath, 'utf-8')
    const template = compile(htmlTemplate)
    const html = template({ OTP: otp, LOGO: `${process.env.NEXTAUTH_URL}/footer-logo.png` })

    await sendEmail({
      toAddress: user.email,
      subject: 'Super Admin Login OTP',
      body: html,
    })

    user.loginOtp = otp
    user.loginOtpToken = token
    await user.save()

    return NextResponse.json(
      responseUtils.success({
        message: 'OTP sent successfully. Please verify to proceed with login.',
        data: { token },
      })
    )
  } catch (error) {
    console.error('Error during login OTP generation:', error)
    return NextResponse.json(
      responseUtils.internalServerError({
        message: 'An error occurred while processing the request.',
        data: { error: (error as Error).message },
      })
    )
  }
}
