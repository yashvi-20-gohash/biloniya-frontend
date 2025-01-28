
import VerifySuperAdminPage from '@/src/components/super-admin/verifyEmailSuperAdmin/verifyEmail'
import Image from 'next/image'
import Link from 'next/link'
export const metadata = { title: `Biloniya - Verify Email` }
export default function VerifyPage({ params }: { params: { token: string } }) {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="register-img h-full flex-col bg-muted p-10 text-white lg:flex ">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/footer-logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="object-contain"
          />
        </Link>

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
            <h4 className="text-3xl mb-2 uppercase font-bold text-[#fff]">
              Verify Your Email Super Admin
            </h4>
          </div>
          <blockquote className="space-y-2">
            <p className="text-lg font-normal text-[#fff]">
              Please check your email inbox and verify your email address to
              complete the registration process.
            </p>
          </blockquote>
        </div>
      </div>
      <div className="register-form">
        <VerifySuperAdminPage token={params.token} />
      </div>
    </div>
  )
}
