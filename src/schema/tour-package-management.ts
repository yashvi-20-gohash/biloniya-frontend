import { z } from 'zod'

export const addTourSchema = z.object({
  title: z.string().min(3, { message: 'Title is required' }),
  duration: z.string().min(3, { message: 'Duration is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  description: z.string().min(6, { message: 'Description is required' }),
  tags: z
    .array(z.object({
      label: z.string(),
      value: z.string(),
    }))

});


export const TourListSchema = z.object({
  id: z.string(),
  _id: z.string(),
  title: z.string(),
  duration: z.string(),
  location: z.string(),
  description: z.string(),
  tourImage: z.string(),
  tourImageUrl: z.string(),
  tags: z.array(z.string()),
  isActive: z.boolean(),
})

export type TourListType = z.infer<typeof TourListSchema>
