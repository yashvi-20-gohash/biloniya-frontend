// action.ts

import { connectDB } from '@/src/lib/mongodb'
import Gallery from '@/src/models/Gallery';

export async function getGalleryList() {
  await connectDB()

  try {
    const gallery = await Gallery.aggregate([
      {
        $match: {
          isDeleted: false,
          isActive: true,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
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
    if (gallery.length == 0) {
      return {
        success: false,
        error: 'gallery not found.',
      }
    }
    return {
      success: true,
      message: 'Fetched gallery successfully',
      data: { gallery },
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch blogs',
    }
  }
}
export async function getHomeGalleryList() {
  await connectDB()

  try {
    const gallery = await Gallery.aggregate([
      {
        $match: {
          isDeleted: false,
          isActive: true,
        },
      },
      {
        $limit: 4,
      },
      {
        $project: {
          _id: 1,
          title: 1,
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
    if (gallery.length == 0) {
      return {
        success: false,
        error: 'gallery not found.',
      }
    }
    return {
      success: true,
      message: 'Fetched gallery successfully',
      data: { gallery },
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch blogs',
    }
  }
}
