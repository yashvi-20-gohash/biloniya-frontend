import { z } from 'zod'

export const addGalleryModal = z.object({
  title: z.string().min(3, { message: 'Title is required' }),
});


export const Gallerylist = z.object({
  id: z.string(),
  _id: z.string(),
  title: z.string(),
  isActive: z.boolean(),
})

export type GallerylistType = z.infer<typeof Gallerylist>
