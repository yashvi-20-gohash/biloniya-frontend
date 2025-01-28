import { z } from "zod";

export const ContactUsSchema = z.object({
    name: z.string().min(3, { message: 'Name is required' }),
    phone: z
        .string()
        .regex(/^\d{10}$/, { message: 'Phone Number must be exactly 10 digits' }),
    email: z.string().email({ message: 'Enter a valid email address' }),
    message: z.string().min(3, { message: 'Message is required' }),
});


export const ContactUsListSchema = z.object({
    id: z.string(),
    _id: z.string(),
    name: z.string(),
    phone: z.string(),
    email: z.string(),
    message: z.string(),
    replyMessage: z.string(),
})



export const ContactUsReplySchema = z.object({
    replyMessage: z.string().min(6, { message: 'Reply Message is required' }),
});

export type ContactUsListType = z.infer<typeof ContactUsListSchema>


