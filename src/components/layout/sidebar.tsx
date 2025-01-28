'use client'

import { useSidebar } from '@/src/hooks/useSidebar'
import { cn } from '@/src/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BsArrowLeftShort, BsList } from 'react-icons/bs'
import { SideNav } from './side-nav'
import { CURRENT_BASE_URL } from '@/src/constants'
import SuperAdminHeader from './header'
// import SuperAdminHeader from '@/src/components/layout/header'

export default function Sidebar({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const { isOpen, toggle } = useSidebar()
  const [status, setStatus] = useState(false)
  const pathname = usePathname()

  const handleToggle = () => {
    setStatus(true)
    toggle()
    setTimeout(() => setStatus(false), 500)
  }

  // Close sidebar on mobile only when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    const sidebar = document.getElementById('sidebar')
    const isMobile = window.innerWidth < 768 // Define mobile width breakpoint
    if (isMobile && isOpen && sidebar && !sidebar.contains(e.target as Node)) {
      toggle() // Close the sidebar
    }
  }

  useEffect(() => {
    // Log when route path changes
    console.log('Route path changed:', pathname)

    // Add event listener for clicks outside the sidebar
    document.addEventListener('click', handleClickOutside)

    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener('click', handleClickOutside)
    }
  }, [pathname, isOpen])

  return (
    <div className="flex w-full">
      {/* Sidebar: Occupies 3/12 columns */}
      <div className="w-fit bg-white border-r">
        <div className="main-nav sticky top-0 bg-white z-50">
          <nav
            id="sidebar"
            className={cn(
              `relative hidden h-screen ${CURRENT_BASE_URL !== '/super-admin' && 'super-admin-height'} md:block`,
              status && 'duration-500',
              isOpen ? 'w-72' : 'w-[78px]',
              className
            )}
          >
            <div className="hidden p-5 pb-0 lg:block">
              <div
                className={`relative z-20 flex text-lg font-medium text-primary ${isOpen ? 'justify-start' : ''}`}
              >
                <div className="aspect-[6/1] w-full">
                  <Link href="/">
                    {isOpen ? (
                      <Image
                        src="/logo.png"
                        alt="Logo"
                        layout="fill"
                        objectFit="contain"
                        className="object-contain"
                      />

                    ) : (
                      <Image
                        src="/logo.jpg"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="object-contain ml-0"
                      />
                    )}
                  </Link>
                </div>
              </div>
            </div>

            {/* Hamburger Button for Mobile */}
            <BsList
              className={cn(
                'md:hidden absolute top-12 left-12 text-2xl text-primary cursor-pointer',
                isOpen ? 'hidden' : 'block'
              )}
              onClick={handleToggle}
            />

            {/* Arrow Button for Closing Sidebar */}
            <BsArrowLeftShort
              className={cn(
                'absolute -right-4 top-10 bg-white z-10 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
                !isOpen && 'rotate-180'
              )}
              onClick={handleToggle}
            />

            <div
              className={`space-y-4 h-[620px] lg:min-h-screen overflow-y-auto ${CURRENT_BASE_URL !== '/super-admin' && 'admin-height'} app-main-sidebar`}
            >
              <div className="px-3 py-2">
                <div className="mt-3 space-y-1">
                  <SideNav
                    className={`${!isOpen ? '!hidden' : ''} text-background transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100`}
                  />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content: Occupies 9/12 columns */}
      <div className="flex flex-col w-full">
        <SuperAdminHeader />
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  )
}
