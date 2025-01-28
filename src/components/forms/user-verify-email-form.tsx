import { Card, CardContent } from '@/src/components/ui/card'
import { Form } from '@/src/components/ui/form'
import { TextField } from '@/src/components/ui/form/input'
import { useCountdownSeconds } from '@/src/hooks/useCountdown'
import { UserAuthStore } from '@/src/store/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdOutlineMail } from 'react-icons/md'
import { toast } from 'sonner'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '../ui/input-otp'
import LoadingButton from '../ui/loading-button'
import { verifyEmailUserSchema } from '@/src/schema/auth'

interface VerifyFormData {
  otp: string
  email: string
}

export default function UserAuthVerify() {
  const router = useRouter()
  const { status } = useSession()
  const { countdown, counting, startCountdown } = useCountdownSeconds(30)
  const [otpValue, setOtpValue] = useState<string>('')

  const { userVerifyData, apiResendOtp } = UserAuthStore()

  const formMethods = useForm<VerifyFormData>({
    resolver: zodResolver(verifyEmailUserSchema),
    defaultValues: {
      otp: '',
      email: '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    reset,
  } = formMethods

  const ref = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [status, router])

  useEffect(() => {
    if (userVerifyData?.email) {
      reset({ email: userVerifyData.email, otp: '' })
    }
  }, [userVerifyData, reset])

  const onSubmit = async () => {
    try {
      const res = await signIn('register', {
        email: userVerifyData?.email || '',
        otp: otpValue,
        redirect: false,
      })

      ref.current?.reset()
      const errorMessage = JSON.parse(res?.error || '{}')
      if (res?.error) {
        toast.error(errorMessage.errors)
      } else {
        toast.success('Registration successful!')
        router.push('/signin')
      }
    } catch (error) {
      toast.error('Failure')
    }
  }

  const handleResendCode = useCallback(async () => {
    try {
      startCountdown()
      const email = userVerifyData?.email as string
      const response = await apiResendOtp(email)
      if (response?.status === 'SUCCESS') return toast.success(response.message)
    } catch (error) {
      console.error(error)
      toast.error('Failed to resend OTP')
    }
  }, [startCountdown, userVerifyData, apiResendOtp])

  if (status === 'loading') {
    return null
  }

  return (
    <Card className="max-w-md w-full p-2 !pt-10">
      <CardContent>
        <Form {...formMethods}>
          <form
            ref={ref}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            id="verify-form"
          >
            <TextField name="email" label="Email" control={control} disabled />

            <div className="w-full flex justify-between">
              <InputOTP
                maxLength={6}
                className="w-full flex justify-between"
                onChange={(value) => setOtpValue(value)}
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

            <LoadingButton
              type="submit"
              isLoading={isSubmitting}
              className="w-full bg-primary text-white hover:opacity-80 hover:bg-primary hover:text-white"
              form="verify-form"
            >
              Verify
            </LoadingButton>
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

            <Link
              href="/signin"
              className="flex items-center justify-center mt-4"
            >
              <MdOutlineMail className="w-4 h-4 mr-1" />
              Return to sign in
            </Link>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
