// import ThemeToggle from '@/src/components/layout/ThemeToggle/theme-toggle'
import { GuestGuard } from '@/src/lib/guest-guard'
// import { GuestGuard } from '@/src/lib/guest-guard'
import { ReactNode } from 'react'

// ----------------------------------------------------------------------

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <GuestGuard>
      <div className="flex">
        <main className="w-full flex-1 overflow-hidden">{children}</main>
        <div className="flex mr-2 mt-2">
          {/* <ThemeToggle /> */}
        </div>
      </div>
    </GuestGuard>
  )
}
