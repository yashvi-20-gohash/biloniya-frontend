import UserAuthForm from '@/src/components/forms/user-auth-form'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'


export const metadata: Metadata = {
  title: `Biloniya - Signin`,
  description: 'Login via your email and password.',
}

export default function SigninPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex ">
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
            <h4 className="text-3xl mb-2 uppercase font-bold text-white">
              {' '}
              Sign In{' '}
            </h4>
          </div>
          <blockquote className="space-y-2">
            <p className="text-lg text-white">
              Welcome back! Please enter your email and password to sign in.
            </p>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-left">
              {`Super Admin's Sign in`}
            </h1>
          </div>
          <UserAuthForm />
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
    </div>
  )
}
