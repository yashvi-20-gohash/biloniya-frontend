'use server'
import { connectDB } from '@/src/lib/mongodb'
import ContactUs from '@/src/models/ContactUs'

export const getDashboardStatistics = async () => {
  await connectDB()
  try {
    const totalContactUsCount = await ContactUs.countDocuments({
      isDeleted: false,
    })
    const topContactList = await ContactUs.aggregate([
      { $sort: { createdAt: -1 } },
      { $limit: 5 },
    ])
    return {
      success: true,
      data: {
        totalContactUsCount,
        topContactList,
      },
    }
  } catch (error) {
    console.error('Error fetching customer data for dashboard:', error)
    return {
      success: false,
      message:
        'An error occurred while fetching the dashboard statistics. Please try again later.',
    }
  }
}
