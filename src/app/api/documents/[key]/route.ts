import { NextResponse } from 'next/server'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3Client } from '@aws-sdk/client-s3'
const Bucket = process.env.S3_BUCKET
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
})

export async function GET(_: Request, { params }: { params: { key: string } }) {
  try {
    const command = new GetObjectCommand({ Bucket, Key: params.key })
    const src = await getSignedUrl(s3, command, { expiresIn: 3600 })

    return NextResponse.json({ src })
  } catch (error) {
    console.error('Error getting signed URL:', error)
    return NextResponse.json(
      { error: 'Failed to get signed URL.' },
      { status: 500 }
    )
  }
}
