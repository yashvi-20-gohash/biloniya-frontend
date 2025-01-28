'use client'
import { Card, CardContent } from '@/src/components/ui/card'
import { TextField } from '@/src/components/ui/form/input'
import { PasswordField } from '@/src/components/ui/form/passwordfield'; // Import PasswordField
import LoadingButton from '@/src/components/ui/loading-button'
import { CURRENT_BASE_URL } from '@/src/constants'
import { UserAuthStore } from '@/src/store/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'


// Define the validation schema for user sign-in
const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password is required' }),
})

export type UserFormValue = z.infer<typeof formSchema>

export default function UserAuthForm() {

  const ref = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)
  const { apiSuperAdminSignin } = UserAuthStore()

  const defaultValues = {
    email: '',
    password: '',
  }

  const formMethods = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const { handleSubmit, control } = formMethods
  const router = useRouter()

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true)
    const res = await apiSuperAdminSignin({
      email: data.email.toLowerCase(),
      password: data.password,
    })
    if (res?.status !== 'SUCCESS') {
      toast.error(res?.message)
      setLoading(false)
      return
    }

    if (res?.status === 'SUCCESS') {
      toast.success(res?.message || 'OTP Sent successfully')
      router.push(`/super-admin/verify/${res?.data?.token}`)
    }
    setLoading(false)
  }

  return (
    <Card className="pt-10 pb-6">
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-6"
          ref={ref}
          id="signin-form"
        >
          <TextField
            name="email"
            control={control}
            label="Email"
            required={true}
          />
          <PasswordField
            name="password"
            control={control}
            label="Password"
            required={true}
          />
          <div className="flex justify-end w-full">
            <Link
              href={`${CURRENT_BASE_URL}/forgot-password`}
              className="text-right text-sm underline"
            >
              Forgot password?
            </Link>
          </div>
          <LoadingButton
            type="submit"
            isLoading={loading}
            className="ml-auto w-full bg-[#b0191e] text-white hover:opacity-80 hover:bg-primary hover:text-white"
            form="signin-form" // Ensure this matches the form ID
          >
            Continue With Email
          </LoadingButton>
        </form>
      </CardContent>
    </Card>
  )
}
