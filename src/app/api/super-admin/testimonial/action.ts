'use server'

import { connectDB } from '@/src/lib/mongodb'
import Testimonial, { ITestimonial } from '@/src/models/Testimonial'
import mongoose from 'mongoose'

// Add a new Testimonial
export const createTestimonial = async (
  data: Partial<ITestimonial>,
  userId: string | null
) => {
  await connectDB()

  try {
    // Check if testimonial with the same name already exists
    const existingTestimonial = await Testimonial.findOne({ name: data.name, type: data.type })
    if (existingTestimonial) {
      return {
        success: false,
        error: 'A testimonial with the same name already exists.',
      }
    }

    // Create and save the new testimonial
    const newTestimonial = new Testimonial({
      ...data,
      addedBy: userId,
    })
    await newTestimonial.save()
    const getLastData = await Testimonial.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(newTestimonial._id),
        },
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
    return {
      success: true,
      message: 'Testimonial added successfully.',
      data: { lastData: getLastData[0] },
    }
  } catch (error) {
    console.error('Error adding testimonial:', error)
    return {
      success: false,
      error: 'Failed to add testimonial.',
    }
  }
}

// Get Testimonial Details
export const getTestimonialDetails = async (id: string, userId: string) => {
  await connectDB()

  try {
    const testimonial = await Testimonial.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
          addedBy: new mongoose.Types.ObjectId(userId),
          isDeleted: false
        },
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
      return { success: false, error: 'Testimonial not found.' }
    }

    return {
      success: true,
      message: 'Testimonial details retrieved successfully.',
      data: { testimonial: testimonial[0] },
    }
  } catch (error) {
    console.error('Error retrieving testimonial:', error)
    return {
      success: false,
      error: 'Failed to retrieve testimonial.',
    }
  }
}

// Update Testimonial
export const updateTestimonial = async (
  id: string,
  data: Partial<ITestimonial>,
  userId: string | null
) => {
  await connectDB()

  try {
    // Check if the testimonial name already exists
    const existingTestimonial = await Testimonial.findOne({
      name: data.name,
      type: data.type,
      _id: { $ne: id },
    })
    if (existingTestimonial) {
      return { success: false, error: 'A testimonial with the same name already exists.' }
    }

    const testimonial = await Testimonial.findOneAndUpdate(
      { _id: id, addedBy: userId },
      { $set: { ...data } },
      { new: true }
    )

    if (!testimonial) {
      return { success: false, error: 'Testimonial not found or not authorized to update.' }
    }
    const getLastData = await Testimonial.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
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
    return {
      success: true,
      message: 'Testimonial updated successfully.',
      data: { lastData: getLastData[0] },
    }
  } catch (error) {
    console.error('Error updating testimonial:', error)
    return {
      success: false,
      error: 'Failed to update testimonial.',
    }
  }
}

// Delete Testimonial
export const deleteTestimonial = async (ids: string[], userId: string | null) => {
  await connectDB()

  try {
    const result = await Testimonial.deleteMany({ _id: { $in: ids }, addedBy: userId })
    if (result.deletedCount === 0) {
      return { success: false, message: 'No testimonials found to delete.' }
    }

    return { success: true, message: `Successfully deleted ${result.deletedCount} testimonial(s).` }
  } catch (error) {
    console.error('Error deleting testimonials:', error)
    return { success: false, error: 'Failed to delete testimonials.' }
  }
}

// Get Paginated Testimonial List
export const getTestimonials = async (
  page: number,
  limit: number,
  isActive?: string,
  search?: string,
  userId?: string | null
) => {
  await connectDB()

  try {
    const match: { [key: string]: unknown } = {
      isDeleted: false,
      ...(userId ? { addedBy: new mongoose.Types.ObjectId(userId) } : {}),
    }

    if (isActive !== undefined) {
      match.isActive = isActive === 'true'
    }

    if (search) {
      match.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ]
    }

    const aggregatePipeline: mongoose.PipelineStage[] = [
      { $match: match },
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
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
    ]

    const testimonials = await Testimonial.aggregate(aggregatePipeline).exec()
    const totalDocs = await Testimonial.countDocuments(match).exec()

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
      message: 'Testimonials retrieved successfully.',
      data: { data: testimonials, paginator },
    }
  } catch (error) {
    console.error('Error retrieving testimonials:', error)
    return {
      status: 'FAILURE',
      error: 'Failed to retrieve testimonials.',
    }
  }
}

// Update Testimonial Status
export const updateTestimonialStatus = async (
  ids: string[],
  data: Partial<ITestimonial>,
  userId: string | null
) => {
  await connectDB()

  try {
    const result = await Testimonial.updateMany(
      { _id: { $in: ids }, isDeleted: false, addedBy: userId },
      { $set: { isActive: data.isActive } }
    )

    if (result.matchedCount === 0) {
      return {
        success: false,
        error: 'Testimonial ID(s) not found or unauthorized access.',
      }
    }

    if (ids.length === 1) {
      const updatedTestimonial = await Testimonial.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(ids[0]),
          },
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
      return {
        success: true,
        message: data.isActive
          ? 'Testimonial status activated successfully.'
          : 'Testimonial status deactivated successfully.',
        data: { lastData: updatedTestimonial[0] },
      }
    }

    return {
      success: true,
      message: `Successfully updated status for ${result.modifiedCount} testimonial entry${result.modifiedCount > 1 ? 's' : ''}.`,
      data: { modifiedCount: result.modifiedCount },
    }
  } catch (error) {
    console.error('Error updating testimonial status:', error)
    return {
      success: false,
      error: 'Failed to update testimonial status.',
    }
  }
}
