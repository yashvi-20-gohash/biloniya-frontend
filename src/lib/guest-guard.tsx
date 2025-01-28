'use client'

import { useRouter, usePathname } from 'next/navigation'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { SplashScreen } from '../components/loading-screen'
import { useSession } from 'next-auth/react'

// ----------------------------------------------------------------------

interface GuestGuardProps {
    children: ReactNode
}

export function GuestGuard({ children }: GuestGuardProps) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const pathname = usePathname()
    const [isChecking, setIsChecking] = useState(true)

    // Helper function to redirect users based on role
    const redirectUser = useCallback(() => {
        const userRole = session?.user?.sessionType
        if (userRole === 'USER' && !pathname.includes('/super-admin')) {
            router.replace('/dashboard')
        } else if (
            userRole === 'SUPER_ADMIN' &&
            pathname.includes('/super-admin')
        ) {
            router.replace('/super-admin/dashboard')
        } else {
            setIsChecking(false)
        }
    }, [pathname, router, session?.user?.sessionType])

    useEffect(() => {
        if (status === 'loading') return
        if (session?.user) {
            redirectUser()
        } else {
            setIsChecking(false) // Guest access allowed if unauthenticated
        }
    }, [status, session, pathname, redirectUser])

    if (isChecking || status === 'loading') {
        return <SplashScreen />
    }

    return <>{children}</>
}
