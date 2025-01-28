'use client'
import { useEffect, useState, useCallback, ReactNode } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SplashScreen } from '@/src/components/loading-screen'
import React from 'react'
import { CURRENT_BASE_URL, CURRENT_REDIRECT_URL } from '../constants'
import { useSession } from 'next-auth/react'

interface AuthGuardProps {
    children: ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
    const { status, data: session } = useSession()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isChecking, setIsChecking] = useState(true)

    const createQueryString = useCallback(
        (name: string, value: string): string => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )
    const redirectToLogin = useCallback(() => {
        const returnUrl = `${CURRENT_BASE_URL}/signin?${createQueryString('returnTo', pathname)}`

        router.replace(returnUrl)
    }, [router, pathname, createQueryString])

    const checkPermissions = useCallback(() => {
        if (status === 'loading') return

        // Check if unauthenticated
        if (status === 'unauthenticated') {
            redirectToLogin()
            return
        }

        const userRole = session?.user?.userRole
        const isSuperAdmin =
            userRole === 2 &&
            CURRENT_REDIRECT_URL === `/${process.env.NEXT_PUBLIC_SUPER_ADMIN_URL}`
        if (isSuperAdmin) {
            setIsChecking(false)
        } else {
            redirectToLogin() // Redirect unauthorized users
        }
    }, [status, session, redirectToLogin])

    useEffect(() => {
        checkPermissions()
    }, [status, checkPermissions])

    if (isChecking || status === 'loading') {
        return <SplashScreen />
    }

    return <>{children}</>
}
