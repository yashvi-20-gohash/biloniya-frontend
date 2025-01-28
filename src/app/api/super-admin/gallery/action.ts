import { connectDB } from '@/src/lib/mongodb';
import Gallery, { IGallery } from '@/src/models/Gallery';
import mongoose from 'mongoose';


// Add a new Gallery
export const createGallery = async (
  data: Partial<IGallery>,
  userId: string | null
) => {
  await connectDB();

  try {
    const existingTitleGallery = await Gallery.findOne({ title: data.title });
    if (existingTitleGallery) {
      return {
        success: false,
        error: 'A gallery with the same title already exists.',
      };
    }

    const newGallery = new Gallery({
      title: data.title,
      image: data.image,
      addedBy: userId,
    });
    await newGallery.save();
    const getLastData = await Gallery.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(newGallery._id),
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
    return {
      success: true,
      message: 'Gallery added successfully.',
      data: { lastData: getLastData[0] },
    };
  } catch (error) {
    console.error('Error adding gallery:', error);
    return {
      success: false,
      error: 'Failed to add gallery.',
    };
  }
};

// Delete Gallery
export const deleteGallery = async (ids: string[], userId: string | null) => {
  await connectDB();

  try {
    const result = await Gallery.deleteMany({ _id: { $in: ids }, addedBy: userId })
    if (result.deletedCount === 0) {
      return {
        success: false,
        message: 'No galleries found to delete.',
      };
    }
    return {
      success: true,
      message: `Successfully deleted ${result.deletedCount} gallery(ies).`,
    };
  } catch (error) {
    console.error('Error deleting galleries:', error);
    return {
      success: false,
      error: 'Failed to delete galleries.',
    };
  }
};

// Get Paginated Gallery List
export const getGalleries = async (
  page: number,
  limit: number,
  isActive?: string,
  search?: string,
  userId?: string | null
) => {
  await connectDB();

  try {
    const match: { [key: string]: unknown } = {
      isDeleted: false,
      ...(userId ? { addedBy: new mongoose.Types.ObjectId(userId) } : {}),
    };

    if (isActive !== undefined) {
      match.isActive = isActive === 'true';
    }

    if (search) {
      match.$or = [{ title: { $regex: search, $options: 'i' } }];
    }

    const aggregatePipeline: mongoose.PipelineStage[] = [
      { $match: match },
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
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
    ];

    const galleries = await Gallery.aggregate(aggregatePipeline).exec();
    const totalDocs = await Gallery.countDocuments(match).exec();

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
    };

    return {
      status: 'SUCCESS',
      message: 'Galleries retrieved successfully.',
      data: {
        data: galleries,
        paginator,
      },
    };
  } catch (error) {
    console.error('Error retrieving galleries:', error);
    return {
      status: 'FAILURE',
      message:
        'An error occurred while retrieving the galleries. Please try again later.',
    };
  }
};

export const updateGalleryStatus = async (
  ids: string[],
  data: Partial<IGallery>,
  userId: string | null
) => {
  await connectDB()

  try {
    // Update the gallery status
    const result = await Gallery.updateMany(
      { _id: { $in: ids }, isDeleted: false, addedBy: userId },
      { $set: { isActive: data.isActive } }
    )

    if (result.matchedCount === 0) {
      return {
        success: false,
        error: 'Gallery ID(s) not found.',
      }
    }

    if (ids.length === 1) {
      // For a single gallery, fetch the updated data
      const updatedGallery = await Gallery.findOne({ _id: ids[0] })
      return {
        success: true,
        message: data.isActive
          ? 'Gallery status activated successfully.'
          : 'Gallery status deactivated successfully.',
        data: { lastData: updatedGallery },
      }
    } else {
      return {
        success: true,
        message: `Successfully updated status for ${result.modifiedCount} gallery entries.`,
        data: { modifiedCount: result.modifiedCount },
      }
    }
  } catch (error) {
    console.error('Error updating gallery status:', error)
    return {
      success: false,
      error: 'Failed to update gallery status.',
    }
  }
}