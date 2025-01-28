'use client'

import { VerifyPasswordSkeleton } from '@/src/components/skeleton/forgot-password-skeleton'
import { UserAuthStore } from '@/src/store/auth'
import Link from 'next/link'
import { useEffect } from 'react'
import RegistrationLinkExpired from '../../forms/registeration-link-expire'
import UserAuthVerify from '../../forms/user-verify-email-form'

export default function VerifyPageClient({ token }: { token: string }) {
  const { apiVerifRegisterUser, userVerifyLoading, userVerifyData } =
    UserAuthStore()

  useEffect(() => {
    if (token) {
      apiVerifRegisterUser(token)
    }
  }, [token, apiVerifRegisterUser])

  if (userVerifyLoading) {
    return <VerifyPasswordSkeleton />
  }

  return (
    <div className="flex h-full items-center p-4 lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-left">
            Please check your email!
          </h1>
          <p className="text-sm text-muted-foreground text-left">
            {`We’ve sent a 6-digit confirmation email to your email. Please enter the code in the box to verify your email.`}
          </p>
        </div>
        {!userVerifyData ? <RegistrationLinkExpired /> : <UserAuthVerify />}
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{' '}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
