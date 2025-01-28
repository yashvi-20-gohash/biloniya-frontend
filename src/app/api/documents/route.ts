import { NextRequest, NextResponse } from 'next/server'
import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3'
import { responseUtils } from '@/src/lib/response'

const Bucket = process.env.S3_BUCKET
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
})

// Function to generate a random string
const generateRandomString = (length: number) => {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

// Endpoint to get the list of files in the bucket
export async function GET() {
  const response = await s3.send(new ListObjectsCommand({ Bucket }))
  return NextResponse.json(response?.Contents ?? [])
}

// Endpoint to upload a file to the bucket
export async function POST(request: NextRequest) {
  const formData = await request.formData()

  const files = formData.getAll('file') as File[]

  const responses = await Promise.all(
    files.map(async (file) => {
      const uniqueNumber = generateRandomString(4)
      const timestamp = Date.now() // Current timestamp

      // Extract the file extension
      const fileExtension = file.name.split('.').pop() // Get the extension
      const uniqueFileName = `${timestamp}${uniqueNumber}.${fileExtension}` // Format: timestamp-uniqueNumber.extension

      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const Key = `uploads/${uniqueFileName}` // Ensure the file is stored in the 'uploads' directory

      // Upload the file to S3
      const putObjectResponse = await s3.send(
        new PutObjectCommand({
          Bucket,
          Key,
          Body: buffer,
        })
      )

      // Generate the S3 file URL
      const imageUrl = `https://${Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${Key}`

      // Return file details and the image URL
      return {
        Key: uniqueFileName,
        LastModified: new Date().toISOString(),
        Size: file.size,
        ETag: putObjectResponse.ETag, // Optionally set ETag from the response
        imageUrl,
      }
    })
  )

  return NextResponse.json(
    responseUtils.success({
      message: 'Image(s) uploaded successfully',
      data: { responses },
    })
  )
}
