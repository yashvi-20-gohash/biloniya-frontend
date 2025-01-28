
import { Card, CardContent } from '@/src/components/ui/card'
import { Form } from '@/src/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
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
import { verifyEmailAdminSchema } from '@/src/schema/auth'

interface VerifyFormData {
  otp: string
  token: string
}
interface SuperAdminAuthVerifyProps {
  token: string
}

export default function SuperAdminAuthVerify({
  token,
}: SuperAdminAuthVerifyProps) {
  const router = useRouter()
  const [otpValue, setOtpValue] = useState<string>('')

  const formMethods = useForm<VerifyFormData>({
    resolver: zodResolver(verifyEmailAdminSchema),
    defaultValues: {
      otp: '',
      token: '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = formMethods

  const onSubmit = async () => {
    try {
      const res = await signIn('verifyotp', {
        otp: otpValue,
        token: token,
        redirect: false,
      })
      if (res?.error) {
        toast.error(res?.error)
      } else {
        toast.success('Login successful!')
        router.push('/super-admin/dashboard')
      }
    } catch (error) {
      toast.error('Failure')
    }
  }

  return (
    <Card className="max-w-md w-full p-2 !pt-10">
      <CardContent>
        <Form {...formMethods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            id="verify-form"
          >
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

            <Link
              href="/super-admin/signin"
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
