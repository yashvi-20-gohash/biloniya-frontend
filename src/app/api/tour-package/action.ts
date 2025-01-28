// action.ts

import { connectDB } from '@/src/lib/mongodb'
import TourPackage from '@/src/models/TourPackage';

export async function getPackageList() {
  await connectDB()

  try {
    const where: { [key: string]: unknown } = {
      isDeleted: false,
      isActive: true,
    }
    const service = await TourPackage.aggregate([
      {
        $match: where
      },
      {
        $project: {
          title: 1,
          tags: 1,
          duration: 1,
          location: 1,
          description: 1,
          isActive: 1,
          createdAt: 1,
          tourImage: 1,
          tourImageUrl: {
            $cond: {
              if: { $ne: ['$tourImage', null] },
              then: { $concat: [process.env.BUCKET_URL + 'uploads/', '$tourImage'] },
              else: null,
            },
          },
        },
      },
    ])
    if (service.length == 0) {
      return {
        success: false,
        error: 'Tour package not found.',
      }
    }
    return {
      success: true,
      message: 'Fetched tour package successfully',
      data: { service },
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch blogs',
    }
  }
}