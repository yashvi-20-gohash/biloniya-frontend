import VerifyPageClient from '@/src/components/super-admin/verifyEmail/verifyEmail'
import Image from 'next/image'
import Link from 'next/link'
export const metadata = { title: `Biloniya - Verify Email` }
export default function VerifyPage({ params }: { params: { token: string } }) {
  return (
    <div className="relative flex h-screen overflow-hidden flex-col md:grid lg:max-w-none lg:grid-cols-2">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex ">
        <div className="absolute inset-0 bg-[var(--background)]" />
        <div className="relative z-20 flex items-center text-lg font-medium text-primary">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/logo.jpg"
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
              alt="Verify Email"
            />
          </div>
          <div>
            <h4 className="text-3xl mb-2 uppercase font-bold text-[#40B06E]">
              Verify Your Email
            </h4>
          </div>
          <blockquote className="space-y-2">
            <p className="text-lg font-normal text-[#40B06E]">
              Please check your email inbox and verify your email address to
              complete the registration process.
            </p>
          </blockquote>
        </div>
      </div>
      <VerifyPageClient token={params.token} />
    </div>
  )
}
