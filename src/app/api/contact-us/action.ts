'use server'

import { connectDB } from '@/src/lib/mongodb'
import ContactUs, { IContactUs } from '@/src/models/ContactUs'

// Add a new Contact Us message
export const createContactUs = async (data: Partial<IContactUs>) => {
  await connectDB()

  try {
    const newContact = new ContactUs({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      createdAt: new Date(),
    })
    await newContact.save()

    return {
      success: true,
      message: 'Thank you for reaching out. Our admin will contact you shortly',
      data: { lastData: newContact },
    }
  } catch (error) {
    console.error('Error submitting contact us message:', error)
    return {
      success: false,
      error: 'Failed to submit contact us message.',
    }
  }
}
