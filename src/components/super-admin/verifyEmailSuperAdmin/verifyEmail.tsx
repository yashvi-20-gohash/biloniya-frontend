'use client'

import Link from 'next/link'
import SuperAdminAuthVerify from '../../forms/super-admin-verify'

export default function VerifySuperAdminPage({ token }: { token: string }) {
  return (
    <div className="flex h-full items-center p-4 lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-left">
            Please verify your otp for login!
          </h1>
          <p className="text-sm text-muted-foreground text-left">
            {`We’ve sent a 6-digit confirmation email to your email. Please enter the code in the box to verify your email.`}
          </p>
        </div>
        <SuperAdminAuthVerify token={token} />
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
