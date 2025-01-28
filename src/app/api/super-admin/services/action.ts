'use server'

import { connectDB } from '@/src/lib/mongodb'
import Service, { IService } from '@/src/models/Service'
import mongoose from 'mongoose'

// Add a new Service
export const createService = async (
  data: Partial<IService>,
  userId: string | null
) => {
  await connectDB()

  try {
    const existingService = await Service.findOne({ title: data.title, serviceType: data.serviceType })
    if (existingService) {
      return {
        success: false,
        error: 'A service with the same title already exists.',
      }
    }

    const newService = new Service({
      ...data,
      addedBy: userId,
    })
    await newService.save()

    return {
      success: true,
      message: 'Service added successfully.',
      data: { lastData: newService },
    }
  } catch (error) {
    console.error('Error adding service:', error)
    return {
      success: false,
      error: 'Failed to add service.',
    }
  }
}

// Get Service Details
export const getServiceDetails = async (id: string, userId: string) => {
  await connectDB()

  try {
    const service = await Service.aggregate([
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

    if (!service.length) {
      return { success: false, error: 'Service not found.' }
    }

    return {
      success: true,
      message: 'Service details retrieved successfully.',
      data: { service: service[0] },
    }
  } catch (error) {
    console.error('Error retrieving service:', error)
    return {
      success: false,
      error: 'Failed to retrieve service.',
    }
  }
}

// Update Service
export const updateService = async (
  id: string,
  data: Partial<IService>,
  userId: string | null
) => {
  await connectDB()

  try {
    const existingService = await Service.findOne({
      title: data.title,
      serviceType: data.serviceType,
      _id: { $ne: id },
    })
    if (existingService) {
      return { success: false, error: 'A service with the same title already exists.' }
    }

    const service = await Service.findOneAndUpdate(
      { _id: id, addedBy: userId },
      {
        $set: { ...data },
      },
      { new: true }
    )

    if (!service) {
      return { success: false, error: 'Service not found or not authorized to update.' }
    }

    return {
      success: true,
      message: 'Service updated successfully.',
      data: { lastData: service },
    }
  } catch (error) {
    console.error('Error updating service:', error)
    return {
      success: false,
      error: 'Failed to update service.',
    }
  }
}

// Delete Service
export const deleteService = async (ids: string[], userId: string | null) => {
  await connectDB()

  try {
    const result = await Service.deleteMany({ _id: { $in: ids }, addedBy: userId })
    if (result.deletedCount === 0) {
      return { success: false, message: 'No services found to delete.' }
    }

    return { success: true, message: `Successfully deleted ${result.deletedCount} service(s).` }
  } catch (error) {
    console.error('Error deleting services:', error)
    return { success: false, error: 'Failed to delete services.' }
  }
}

// Get Paginated Service List
export const getServices = async (
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
    ]

    const services = await Service.aggregate(aggregatePipeline).exec()
    const totalDocs = await Service.countDocuments(match).exec()

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
      message: 'Services retrieved successfully.',
      data: { data: services, paginator },
    }
  } catch (error) {
    console.error('Error retrieving services:', error)
    return {
      status: 'FAILURE',
      message: 'An error occurred while retrieving the services. Please try again later.',
    }
  }
}

export const updateServiceStatus = async (
  ids: string[],
  data: Partial<IService>,
  userId: string | null
) => {
  await connectDB()

  try {
    // Update the status for the selected services
    const result = await Service.updateMany(
      { _id: { $in: ids }, isDeleted: false, addedBy: userId },
      { $set: { isActive: data.isActive } }
    )

    // If no services are matched or updated
    if (result.matchedCount === 0) {
      return {
        success: false,
        error: 'Service ID(s) not found or unauthorized access.',
      }
    }

    // For a single service, fetch the updated service and return it
    if (ids.length === 1) {
      const updatedService = await Service.findOne({ _id: ids[0] })
      return {
        success: true,
        message: data.isActive
          ? 'Service status activated successfully.'
          : 'Service status deactivated successfully.',
        data: { lastData: updatedService },
      }
    }

    // For multiple services, return the number of modified entries
    return {
      success: true,
      message: `Successfully updated status for ${result.modifiedCount} service entry${result.modifiedCount > 1 ? 's' : ''
        }.`,
      data: { modifiedCount: result.modifiedCount },
    }
  } catch (error) {
    console.error('Error updating service status:', error)
    return {
      success: false,
      error: 'Failed to update service status.',
    }
  }
}