'use server'

import { connectDB } from '@/src/lib/mongodb'
import Newsletter from '@/src/models/Newsletter'
import mongoose from 'mongoose'

// Get Paginated Newsletter List
export const getNewLetterList = async (
  page: number,
  limit: number,
  isActive?: string,
  search?: string,
) => {
  await connectDB()

  try {
    const match: { [key: string]: unknown } = {
      isDeleted: false,
    }

    if (isActive !== undefined) {
      match.isActive = isActive === 'true'
    }

    if (search) {
      match.$or = [
        { email: { $regex: search, $options: 'i' } }, // search by email field
      ]
    }

    const aggregatePipeline: mongoose.PipelineStage[] = [
      { $match: match },
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $project: {
          email: 1,
          isActive: 1,
          createdAt: 1,
        },
      },
    ]

    const newsletters = await Newsletter.aggregate(aggregatePipeline).exec()
    const totalDocs = await Newsletter.countDocuments(match).exec()

    const paginator = {
      itemCount: totalDocs,
      perPage: limit,
      pageCount: Math.ceil(totalDocs / limit),
      currentPage: page,
      slNo: (page - 1) * limit + 1,
      hasPrevPage: page > 1,
      hasNextPage: page * limit < totalDocs,
      prev: page > 1 ? page - 1 : null,
      next: page * limit < totalDocs ? page + 1 : null,
    }

    return {
      status: 'SUCCESS',
      message: 'Newsletters retrieved successfully.',
      data: { data: newsletters, paginator },
    }
  } catch (error) {
    console.error('Error retrieving newsletters:', error)
    return {
      status: 'FAILURE',
      message: 'An error occurred while retrieving the newsletters. Please try again later.',
    }
  }
}
