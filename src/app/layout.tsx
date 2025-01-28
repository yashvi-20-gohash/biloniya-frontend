import '@/src/global.css'
import '@uploadthing/react/styles.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from 'sonner'
import LoadingScreen from './loading'
import { Suspense } from 'react'
import Providers from '../components/layout/providers'
import { getServerSession } from 'next-auth'
import { authOptions } from '../lib/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Biloniya Group of Companies',
  description: 'Welcome to our services',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={`${inter.className}`} suppressHydrationWarning={true}>
        <Suspense fallback={<LoadingScreen />}>
          <NextTopLoader showSpinner={false} color="#b0191e" />
          <Providers session={session}>
            <Toaster
              position="top-right"
              richColors
              expand={false}
              duration={2000}
              closeButton
            />
            {children}
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}
