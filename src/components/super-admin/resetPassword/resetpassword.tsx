// ResetPasswordPageClient.tsx

'use client'

import LinkExpired from '@/src/components/forms/user-link-expired'
import { ForgotPasswordSkeleton } from '@/src/components/skeleton/forgot-password-skeleton'
import { buttonVariants } from '@/src/components/ui/button'
import { cn } from '@/src/lib/utils'
import { UserAuthStore } from '@/src/store/auth'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import ResetPassword from '../../forms/user-reset-password'

interface ResetPasswordPageClientProps {
  token: string
}

export default function ResetPasswordPageClient({
  token,
}: ResetPasswordPageClientProps) {
  const {
    verifyForgotPasswordData,
    apiVerifForgotPassword,
    apiVerifyPasswordLoading,
  } = UserAuthStore()

  useEffect(() => {
    if (token) {
      apiVerifForgotPassword(token)
    }
  }, [token, apiVerifForgotPassword])

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/examples/authentication"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 hidden md:right-8 md:top-8'
        )}
      >
        Login
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
        <div className="absolute inset-0" />
        <div className="relative z-20 flex items-center text-lg font-medium text-primary">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/footer-logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </Link>
        </div>
        <div className="relative z-20 mt-auto py-10">
          <div>
            <Image
              src="/admin-auth.png"
              className="w-7/12 mb-12 mx-auto"
              width={2000}
              height={2000}
              alt="main-auth"
            />
          </div>
          <div>
            <h4 className="text-3xl mb-2 uppercase font-bold text-[#fff]">
              Reset Password
            </h4>
          </div>
          <blockquote className="space-y-2">
            <p className="text-lg text-[#fff]">
              Enter your email to receive a link to reset your password.
            </p>
          </blockquote>
        </div>
      </div>
      {apiVerifyPasswordLoading ? (
        <ForgotPasswordSkeleton />
      ) : (
        <>
          {!verifyForgotPasswordData ? (
            <LinkExpired />
          ) : (
            <div className="flex h-full items-center p-4 lg:p-8">
              <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
                <div className="flex flex-col space-y-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight text-left">
                    Request sent successfully!
                  </h1>
                  <p className="text-sm text-muted-foreground text-left">
                    {`We’ve sent a 6-digit confirmation email to your email. Please enter the code in the box to verify your email.`}
                  </p>
                </div>
                <ResetPassword />
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
          )}
        </>
      )}
    </div>
  )
}
