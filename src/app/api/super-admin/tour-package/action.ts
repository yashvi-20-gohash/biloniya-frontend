'use server'

import { connectDB } from '@/src/lib/mongodb'
import TourPackage, { ITourPackage } from '@/src/models/TourPackage'
import mongoose from 'mongoose'

// Add a new TourPackage
export const createPackage = async (
  data: Partial<ITourPackage>,
  userId: string | null
) => {
  await connectDB()

  try {
    const existingPackage = await TourPackage.findOne({ title: data.title })
    if (existingPackage) {
      return {
        success: false,
        error: 'A tour package with the same title already exists.',
      }
    }

    const newPackage = new TourPackage({
      ...data,
      addedBy: userId,
    })
    await newPackage.save()

    return {
      success: true,
      message: 'Tour Package added successfully.',
      data: { lastData: newPackage },
    }
  } catch (error) {
    console.error('Error adding tour package:', error)
    return {
      success: false,
      error: 'Failed to add tour package.',
    }
  }
}

// Get Tour Package Details
export const getPackageDetails = async (id: string, userId: string) => {
  await connectDB()

  try {
    const tourPackage = await TourPackage.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
          isDeleted: false,
          addedBy: new mongoose.Types.ObjectId(userId),
        },
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

    if (!tourPackage.length) {
      return { success: false, error: 'Tour package not found.' }
    }

    return {
      success: true,
      message: 'Tour package details retrieved successfully.',
      data: { tourPackage: tourPackage[0] },
    }
  } catch (error) {
    console.error('Error retrieving tour package:', error)
    return {
      success: false,
      error: 'Failed to retrieve tour package.',
    }
  }
}

// Update Tour Package
export const updatePackage = async (
  id: string,
  data: Partial<ITourPackage>,
  userId: string | null
) => {
  await connectDB()

  try {
    const existingPackage = await TourPackage.findOne({
      title: data.title,
      _id: { $ne: id },
    })
    if (existingPackage) {
      return { success: false, error: 'A tour package with the same title already exists.' }
    }

    const tourPackage = await TourPackage.findOneAndUpdate(
      { _id: id, addedBy: userId },
      {
        $set: { ...data },
      },
      { new: true }
    )

    if (!tourPackage) {
      return { success: false, error: 'Tour package not found or not authorized to update.' }
    }

    return {
      success: true,
      message: 'Tour package updated successfully.',
      data: { lastData: tourPackage },
    }
  } catch (error) {
    console.error('Error updating tour package:', error)
    return {
      success: false,
      error: 'Failed to update tour package.',
    }
  }
}

// Delete Tour Package
export const deletePackage = async (ids: string[], userId: string | null) => {
  await connectDB()

  try {
    const result = await TourPackage.deleteMany({ _id: { $in: ids }, addedBy: userId })
    if (result.deletedCount === 0) {
      return { success: false, message: 'No tour packages found to delete.' }
    }

    return { success: true, message: `Successfully deleted ${result.deletedCount} tour package(s).` }
  } catch (error) {
    console.error('Error deleting tour packages:', error)
    return { success: false, error: 'Failed to delete tour packages.' }
  }
}

// Get Paginated Tour Package List
export const getPackages = async (
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
        { title: { $regex: search, $options: 'i' } },
      ]
    }

    const aggregatePipeline: mongoose.PipelineStage[] = [
      { $match: match },
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
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
    ]

    const packages = await TourPackage.aggregate(aggregatePipeline).exec()
    const totalDocs = await TourPackage.countDocuments(match).exec()

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
      message: 'Tour packages retrieved successfully.',
      data: { data: packages, paginator },
    }
  } catch (error) {
    console.error('Error retrieving tour packages:', error)
    return {
      status: 'FAILURE',
      message: 'An error occurred while retrieving the tour packages. Please try again later.',
    }
  }
}

// Update Tour Package Status
export const updatePackageStatus = async (
  ids: string[],
  data: Partial<ITourPackage>,
  userId: string | null
) => {
  await connectDB()

  try {
    // Update the status for the selected tour packages
    const result = await TourPackage.updateMany(
      { _id: { $in: ids }, isDeleted: false, addedBy: userId },
      { $set: { isActive: data.isActive } }
    )

    // If no tour packages are matched or updated
    if (result.matchedCount === 0) {
      return {
        success: false,
        error: 'Tour package ID(s) not found or unauthorized access.',
      }
    }

    // For a single package, fetch the updated tour package and return it
    if (ids.length === 1) {
      const updatedPackage = await TourPackage.findOne({ _id: ids[0] })
      return {
        success: true,
        message: data.isActive
          ? 'Tour package status activated successfully.'
          : 'Tour package status deactivated successfully.',
        data: { lastData: updatedPackage },
      }
    }

    // For multiple packages, return the number of modified entries
    return {
      success: true,
      message: `Successfully updated status for ${result.modifiedCount} tour package entry${result.modifiedCount > 1 ? 's' : ''
        }.`,
      data: { modifiedCount: result.modifiedCount },
    }
  } catch (error) {
    console.error('Error updating tour package status:', error)
    return {
      success: false,
      error: 'Failed to update tour package status.',
    }
  }
}
