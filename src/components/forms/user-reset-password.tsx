'use client'

import { Card, CardContent } from '@/src/components/ui/card'
import { Form } from '@/src/components/ui/form'
import { TextField } from '@/src/components/ui/form/input'
import { CURRENT_BASE_URL } from '@/src/constants'
import { useCountdownSeconds } from '@/src/hooks/useCountdown'
import { UserAuthStore } from '@/src/store/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { PasswordField } from '../ui/form/passwordfield'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '../ui/input-otp'
import LoadingButton from '../ui/loading-button'
import { resetPasswordUserSchema } from '@/src/schema/auth'

export default function ResetPassword() {
  const [otpValue, setOtpValue] = useState<string>('')
  const { countdown, counting, startCountdown } = useCountdownSeconds(30)

  const {
    apiForgotPasswordOtp,
    apiForgotPasswordOtpLoading,
    emailFormData,
    apiResendOtp,
  } = UserAuthStore()
  const router = useRouter()

  const defaultValues = useMemo(
    () => ({
      otp: '',
      password: '',
      confirmPassword: '',
      email: emailFormData ? emailFormData?.email : '',
    }),
    [emailFormData]
  )
  const formMethods = useForm({
    resolver: zodResolver(resetPasswordUserSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = formMethods
  const onSubmit = async (data: z.infer<typeof resetPasswordUserSchema>) => {
    try {
      const res = await apiForgotPasswordOtp({
        token: emailFormData ? emailFormData?.token : '',
        otp: otpValue,
        password: data.password,
        email: '',
      })

      if (res?.status === 'SUCCESS') {
        toast.success(res?.message)
        router.push(`${CURRENT_BASE_URL}/signin`)
      } else {
        toast.error(res?.message)
        return
      }
    } catch (error) {
      console.error(error)
      toast.error('Error updating password. Please try again.')
    }
  }
  const handleResendCode = useCallback(async () => {
    try {
      startCountdown()
      const email = emailFormData?.email as string
      const response = await apiResendOtp(email)
      if (response?.status === 'SUCCESS') {
      }
    } catch (error) {
      console.error(error)
      // toast.error('Failed to resend OTP')
    }
  }, [startCountdown, emailFormData, apiResendOtp])

  return (
    <Card className="p-2 !pt-10">
      <CardContent>
        <Form {...formMethods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            id="reset-form"
          >
            <TextField name="email" control={control} label="Email" disabled />

            <div className="w-full flex justify-between">
              <InputOTP
                maxLength={6}
                className="w-full flex justify-between"
                onChange={(value) => setOtpValue(value)}
                required={true}
              >
                <InputOTPGroup className="w-full flex justify-between">
                  <InputOTPSlot index={0} className="w-[54px]" />
                  <InputOTPSlot index={1} className="w-[54px]" />
                  <InputOTPSlot index={2} className="w-[54px]" />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup className="w-full flex flex-end">
                  <InputOTPSlot index={3} className="w-[54px]" />
                  <InputOTPSlot index={4} className="w-[54px]" />
                  <InputOTPSlot index={5} className="w-[54px]" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <PasswordField
              name="password"
              control={control}
              label="Password"
              required={true}
            />
            <PasswordField
              name="confirmPassword"
              control={control}
              label="Confirm New Password"
              required={true}
            />
            <p className="text-center">
              Don’t have a code?{' '}
              <span
                onClick={handleResendCode}
                className={`cursor-pointer ${counting ? 'text-gray-400' : 'text-blue-600'}`}
                style={{ pointerEvents: counting ? 'none' : 'auto' }}
              >
                Resend code {counting && `(${countdown}s)`}
              </span>
            </p>
            <LoadingButton
              type="submit"
              isLoading={apiForgotPasswordOtpLoading || isSubmitting}
              className="w-full bg-primary text-white hover:opacity-80 hover:bg-primary hover:text-white"
              form="reset-form" // Ensure this matches the form ID
            >
              Update Password
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
