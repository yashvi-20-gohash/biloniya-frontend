import { z } from 'zod'

export const addServiceModal = z.object({
  title: z.string().min(3, { message: 'Title is required' }),
  duration: z.string().min(1, { message: 'Duration is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  serviceType: z
    .object({
      value: z.string(),
      name: z.string()
    })
    .nullable(),
  description: z.string().min(6, { message: 'Description is required' }),
  tags: z
    .array(z.object({
      label: z.string(),
      value: z.string(),
    }))

});


export const Servicelist = z.object({
  id: z.string(),
  _id: z.string(),
  title: z.string(),
  duration: z.string(),
  location: z.string(),
  serviceType: z.string(),
  description: z.string(),
  serviceImage: z.string(),
  serviceImageUrl: z.string(),
  tags: z.array(z.string()),
  isActive: z.boolean(),
})

export type ServicelistType = z.infer<typeof Servicelist>
