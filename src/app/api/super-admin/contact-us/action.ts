'use server'

import { connectDB } from '@/src/lib/mongodb'
import ContactUs, { IContactUs } from '@/src/models/ContactUs'
import mongoose from 'mongoose'

// Get Contact Us Messages
export const getContactList = async (
  page: number,
  limit: number,
  isRead?: string,
  search?: string
) => {
  await connectDB()

  try {
    // Build the match conditions
    const match: { [key: string]: unknown } = {}

    if (search) {
      match.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
      ]
    }

    // Aggregation pipeline
    const aggregatePipeline: mongoose.PipelineStage[] = [
      { $match: match },
      {
        $sort: { createdAt: -1 },
      },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          name: 1,
          phone: 1,
          email: 1,
          subject: 1,
          message: 1,
          isRead: 1,
          createdAt: 1,
        },
      },
    ]

    // Execute the aggregation
    const messages = await ContactUs.aggregate(aggregatePipeline).exec()

    // Count total documents that match the conditions (for pagination)
    const totalDocs = await ContactUs.countDocuments(match).exec()

    // Construct pagination info
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

    // Return success response
    return {
      status: 'SUCCESS',
      message: `Contact Us messages retrieved successfully.`,
      data: {
        data: messages,
        paginator,
      },
    }
  } catch (error) {
    // Log and return failure response
    console.error('Error retrieving contact us messages:', error)
    return {
      status: 'FAILURE',
      message:
        'An error occurred while retrieving the contact us messages. Please try again later.',
    }
  }
}

export const getContactUsDetails = async (id: string) => {
  await connectDB()

  try {
    const contactUs = await ContactUs.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id), // Match by ContactUs ID
          isDeleted: false, // Ensure contact info is not deleted
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          phone: 1,
          message: 1,
          replyMessage: 1,
          createdAt: 1,
          updatedAt: 1,
          addedBy: 1,
          updatedBy: 1,
          isActive: 1,
          isDeleted: 1,
        },
      },
    ])

    if (!contactUs.length) {
      return {
        success: false,
        error: 'Contact Us entry not found.',
      }
    }

    return {
      success: true,
      message: 'Contact Us details retrieved successfully.',
      data: { contactUs: contactUs[0] }, // Aggregation returns an array, so we use the first element
    }
  } catch (error) {
    console.error('Error retrieving Contact Us details:', error)
    return {
      success: false,
      error: 'Failed to retrieve Contact Us details.',
    }
  }
}

// Reply to Contact Us entry
export const replyToContactUs = async (id: string, data: IContactUs) => {
  await connectDB()

  try {
    const contactUs = await ContactUs.findById(id)
    if (!contactUs) {
      return {
        success: false,
        error: 'Contact Us entry not found.',
      }
    }

    contactUs.replyMessage = data.replyMessage ?? contactUs.replyMessage
    await contactUs.save()

    return {
      success: true,
      message: 'Reply sent successfully.',
      data: { contactUs }, // Return updated contact details if needed
    }
  } catch (error) {
    console.error('Error replying to Contact Us entry:', error)
    return {
      success: false,
      error: 'Failed to send reply to Contact Us entry.',
    }
  }
}
