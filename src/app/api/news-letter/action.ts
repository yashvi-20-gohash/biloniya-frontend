'use server'

import { connectDB } from '@/src/lib/mongodb'
import Newsletter, { INewsletter } from '@/src/models/Newsletter'


export const submitNewLetter = async (data: Partial<INewsletter>) => {
  await connectDB()

  try {
    const newContact = new Newsletter({
      email: data.email,
    })

    await newContact.save()

    return {
      success: true,
      message: 'Thank you for reaching out. Our admin will contact you shortly.',
    }
  } catch (error) {
    console.error('Error submitting contact us message:', error)

    return {
      success: false,
      error: 'Failed to submit contact us message. Please try again later.',
    }
  }
}
