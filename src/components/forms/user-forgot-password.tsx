'use client'

import { Card, CardContent } from '@/src/components/ui/card'
import { TextField } from '@/src/components/ui/form/input'
import { CURRENT_BASE_URL } from '@/src/constants'
import { UserAuthStore } from '@/src/store/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import LoadingButton from '../ui/loading-button'
import { forgotPasswordUserSchema } from '@/src/schema/auth'

type ForgotPasswordFormInputs = z.infer<typeof forgotPasswordUserSchema>

export default function ForgotPassword() {
  const { apiForgotPassword, apiForgotPasswordLoading } = UserAuthStore()
  const router = useRouter()

  const defaultValues: ForgotPasswordFormInputs = {
    email: '',
  }

  const form = useForm<ForgotPasswordFormInputs>({
    resolver: zodResolver(forgotPasswordUserSchema),
    defaultValues,
  })

  const onSubmit = async (data: ForgotPasswordFormInputs) => {
    const res = await apiForgotPassword({
      email: data.email,
    })

    if (res?.status === 'SUCCESS') {
      router.push(`${CURRENT_BASE_URL}/reset-password/${res.data?.token}`)
    } else if (res?.status === 'FAILURE') {
      toast.error(res.message)
      return
    }
    toast.success(res?.message)
    // router.push(`/reset-password/${res.data?.token}`)
  }
  return (
    <Card className="pt-10 pb-6">
      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          id="forgot-form"
        >
          <TextField
            name="email"
            control={form.control}
            label="Email address"
            required={true}
          />
          <LoadingButton
            type="submit"
            isLoading={apiForgotPasswordLoading}
            className="w-full bg-[#b0191e] text-white hover:opacity-80 hover:bg-primary hover:text-white"
            form="forgot-form" // Ensure this matches the form ID
          >
            Send Request
          </LoadingButton>
          <div className="flex justify-end text-[15px] underline">
            <Link href={`${CURRENT_BASE_URL}/signin`}>Return to sign in</Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
