// action.ts

import { connectDB } from '@/src/lib/mongodb'
import Service from '@/src/models/Service';

export async function getServiceList(serviceType?: string
) {
  await connectDB()

  try {
    const where: { [key: string]: unknown } = {
      isDeleted: false,
      isActive: true,
    }
    if (serviceType) {
      where.serviceType = serviceType
    }
    const service = await Service.aggregate([
      {
        $match: where
      },
      {
        $project: {
          title: 1,
          tags: 1,
          serviceType: 1,
          duration: 1,
          location: 1,
          description: 1,
          isActive: 1,
          createdAt: 1,
          serviceImage: 1,
          serviceImageUrl: {
            $cond: {
              if: { $ne: ['$serviceImage', null] },
              then: { $concat: [process.env.BUCKET_URL + 'uploads/', '$serviceImage'] },
              else: null,
            },
          },
        },
      },
    ])
    if (service.length == 0) {
      return {
        success: false,
        error: 'service not found.',
      }
    }
    return {
      success: true,
      message: 'Fetched service successfully',
      data: { service },
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch blogs',
    }
  }
}