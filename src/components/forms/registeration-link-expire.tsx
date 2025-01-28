'use client'

import { Button } from '@/src/components/ui/button'
import { Card, CardContent } from '@/src/components/ui/card'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegistrationLinkExpired() {
  const router = useRouter()

  const handleRequestNewLink = () => {
    router.push(`/register`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <h1 className="text-2xl font-semibold text-[#1a2e1a] mb-6">
            Registration Link Expired
          </h1>
          <p className="text-[#4a7a4a] mb-6">
            The registration verification link you clicked has expired. For
            security reasons, these verification links are only valid for a
            limited time.
          </p>
          <Button
            onClick={handleRequestNewLink}
            className="w-full bg-primary hover:bg-primary text-white"
          >
            Start New Registration
          </Button>
          <p className="mt-4 text-sm text-center text-[#4a7a4a]">
            If you continue to experience issues, please contact our support
            team for assistance.
          </p>
          <p className="mt-4 text-sm text-center text-[#4a7a4a]">
            By clicking continue, you agree to our{' '}
            <Link href="/terms" className="hover:text-primary underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="hover:text-primary underline">
              Privacy Policy
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
