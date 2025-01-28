// action.ts

import { connectDB } from '@/src/lib/mongodb'
import Testimonial from '@/src/models/Testimonial';

export async function getTestimonialList(type?: string
) {
  await connectDB()

  try {
    const where: { [key: string]: unknown } = {
      isDeleted: false,
      isActive: true,
    }
    if (type) {
      where.type = type
    }
    const testimonial = await Testimonial.aggregate([
      {
        $match: where
      },
      {
        $project: {
          _id: 1,
          name: 1,
          type: 1,
          countryName: 1,
          description: 1,
          rating: 1,
          image: 1,
          isActive: 1,
          createdAt: 1,
          imageUrl: {
            $cond: {
              if: { $ne: ['$image', null] },
              then: { $concat: [process.env.BUCKET_URL + 'uploads/', '$image'] },
              else: null,
            },
          },
        },
      },
    ])
    if (testimonial.length == 0) {
      return {
        success: false,
        error: 'testimonial not found.',
      }
    }
    return {
      success: true,
      message: 'Fetched testimonial successfully',
      data: { testimonial },
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch testimonial',
    }
  }
}