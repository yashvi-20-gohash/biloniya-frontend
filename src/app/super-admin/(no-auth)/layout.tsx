import Sidebar from '@/src/components/layout/sidebar'
import { SessionUnuthoriseModel } from '@/src/components/sessionAuthoriuse/sessionAuthriseModel'
import { AuthGuard } from '@/src/lib/auth-guard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biloniya',
  description: 'Simplify your digital life',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AuthGuard>
        <Sidebar>

          {children}
        </Sidebar>
        <SessionUnuthoriseModel />
      </AuthGuard>
    </>
  )
}
