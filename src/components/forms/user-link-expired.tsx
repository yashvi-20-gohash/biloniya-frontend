'use client'

import { Button } from '@/src/components/ui/button'
import { Card, CardContent } from '@/src/components/ui/card'
import { CURRENT_BASE_URL } from '@/src/constants'
import { useRouter } from 'next/navigation'

export default function LinkExpired() {
  const router = useRouter()

  const handleRequestNewLink = () => {
    // Navigate to the password reset request page
    router.push(`${CURRENT_BASE_URL}/forgot-password`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <h1 className="text-2xl font-semibold text-[#1a2e1a] mb-6">
            Link Expired
          </h1>
          <p className="text-[#4a7a4a] mb-6">
            The password reset link you clicked has expired. For security
            reasons, these links are only valid for a limited time.
          </p>
          <Button
            onClick={handleRequestNewLink}
            className="w-full bg-primary hover:bg-primary text-white"
          >
            Request New Link
          </Button>
          <p className="mt-4 text-sm text-center text-[#4a7a4a]">
            If you continue to experience issues, please contact our support
            team for assistance.
          </p>
          <p className="mt-4 text-sm text-center text-[#4a7a4a]">
            By clicking continue, you agree to our{' '}
            <a href="/terms" className="hover:text-primary underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="hover:text-primary underline">
              Privacy Policy
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
