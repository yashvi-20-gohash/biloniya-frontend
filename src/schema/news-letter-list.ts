import { z } from "zod";

export const NewsLetterListSchema = z.object({
    id: z.string(),
    _id: z.string(),
    email: z.string(),

})



export const AddNewsLetterSchema = z.object({
    replyMessage: z.string().min(6, { message: 'Reply Message is required' }),
});

export type NewsLetterListType = z.infer<typeof NewsLetterListSchema>


