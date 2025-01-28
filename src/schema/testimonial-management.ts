import { z } from 'zod'

export const addTestimonialSchema = z.object({
  name: z.string().min(3, { message: 'Name is required' }),
  countryName: z.string().min(1, { message: 'Country name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  rating: z
    .string(),
  // .transform((value) => Number(value)) // String ko number me convert karega
  // .refine((value) => value >= 1 && value <= 5, {
  //   message: "Rating must be between 1 and 5",
  // }),
  type: z
    .object({
      value: z.string(),
      name: z.string()
    })
    .nullable(),
});


export const TestimonialListSchema = z.object({
  id: z.string(),
  _id: z.string(),
  name: z.string(),
  type: z.string(),
  image: z.string(),
  countryName: z.string(),
  description: z.string(),
  rating: z.number(),
  imageUrl: z.string(),
  isActive: z.boolean(),
})

export type TestimonialLisType = z.infer<typeof TestimonialListSchema>
