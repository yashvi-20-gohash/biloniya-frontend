import * as z from 'zod'

export const registerUserSchema = z.object({
  firstName: z.string().min(3, { message: 'First name: min 3 characters' }),
  lastName: z.string(),
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})

export const signinUserSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' }),
})
export const forgotPasswordUserSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Email must be a valid email address'),
})

export const verifyEmailUserSchema = z.object({
  otp: z.string().optional(),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Email must be a valid email address'),
})
export const verifyEmailAdminSchema = z.object({
  otp: z.string().optional(),
  token: z.string(),
})
export const resetPasswordUserSchema = z
  .object({
    otp: z.string().optional(),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Email must be a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Confirm Password must match Password',
  })
