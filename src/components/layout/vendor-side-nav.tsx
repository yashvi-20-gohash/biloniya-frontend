'use client'
import Link from 'next/link'
import { buttonVariants } from '@/src/components/ui/button'
import { useSidebar } from '@/src/hooks/useSidebar'
import { cn } from '@/src/lib/utils'
import { usePathname } from 'next/navigation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/src/components/layout/subnav-accordion'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
import { getSidebarIcon } from '@/src/constants/navbar'
const sidebarItems = [
  {
    title: 'Overview',
    href: '/vendor-admin/vendor-dashbord',
    icon: '/category.png',
    children: [],
    isChildren: false,
  },
  {
    title: 'Layout',
    href: '#',
    icon: '/category.png',
    children: [],
    isChildren: false,
  },
  {
    title: 'Subscription Management',
    href: '/vendor-admin/current-active-subscription',
    icon: '/category.png',
    children: [],
    isChildren: false,
  },
  {
    title: 'Costumer Management',
    href: '/super-admin/admin-coustmer-list',
    icon: '/category.png',
    children: [],
    isChildren: false,
  },

  {
    title: 'Booking',
    href: '/vendor-admin/vendor-dashboard',
    icon: '/category.png',
    children: [],
    isChildren: false,
  },

  {
    title: 'Notification',
    href: '#',
    icon: '/category.png',
    children: [],
    isChildren: false,
  },

  {
    title: ' Analyist and reporting ',
    href: '#',
    icon: '/category.png',
    children: [],
    isChildren: false,
  },
]
interface SideNavProps {
  setOpen?: (open: boolean) => void
  className?: string
}
interface SidebarItem {
  title: string
  href?: string // Optional because some items may not have links
  icon?: string // Optional for items without icons
  children?: SidebarItem[] // Recursive type for nested children
  isChildren?: boolean // Indicates if the item has children
}
export function SideNav({ setOpen, className }: SideNavProps) {
  const path = usePathname()
  const { isOpen } = useSidebar()
  const [openItem, setOpenItem] = useState('')
  const [lastOpenItem, setLastOpenItem] = useState('')
  useEffect(() => {
    if (isOpen) {
      setOpenItem(lastOpenItem)
    }
  }, [isOpen, lastOpenItem])
  useEffect(() => {
    if (!isOpen) {
      setLastOpenItem(openItem)
      setOpenItem('')
    }
  }, [isOpen, openItem])
  const renderChildren = (children: SidebarItem[], depth = 0) => {
    return children.map((child) =>
      child.children && child.children.length > 0 ? (
        <Accordion
          type="single"
          collapsible
          className="space-y-2"
          onValueChange={setOpenItem}
          key={child.title}
        >
          <AccordionItem
            value={child.title}
            className={cn('border-none', `pl-${depth * 4}`)}
          >
            <AccordionTrigger
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'group relative flex h-12 justify-between px-4 py-2 text-base duration-200 hover:bg-muted hover:no-underline'
              )}
            >
              <div>
                {child.icon ? (
                  getSidebarIcon(child.icon)
                ) : (
                  <ChevronDownIcon className="h-5 w-5" />
                )}
              </div>
              <div
                className={cn(
                  'absolute left-12 text-sm duration-200 font-normal',
                  !isOpen && className
                )}
              >
                {child.title}
              </div>
              {isOpen && (
                <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
              )}
            </AccordionTrigger>
            <AccordionContent className="mt-1 space-y-1  pb-1 ml-5">
              {renderChildren(child.children, depth + 1)}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <Link
          key={child.title}
          href={child.href || '#'}
          onClick={() => {
            if (setOpen) setOpen(false)
          }}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'group relative flex h-12 justify-start gap-x-3',
            path === child.href && 'bg-muted font-bold hover:bg-muted'
          )}
        >
          <div
            className={cn(
              'absolute left-12 text-sm duration-200 font-normal',
              !isOpen && className
            )}
          >
            {child.title}
          </div>
        </Link>
      )
    )
  }
  return (
    <nav>
      {sidebarItems.map((item) =>
        item.isChildren ? (
          renderChildren([item])
        ) : (
          <Link
            key={item.title}
            href={item.href}
            onClick={() => {
              if (setOpen) setOpen(false)
            }}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'group relative flex h-12 justify-start',
              path === item.href && 'bg-muted font-bold hover:bg-muted'
            )}
          >
            {item.icon ? (
              getSidebarIcon(item.icon)
            ) : (
              <ChevronDownIcon className="h-5 w-5" />
            )}
            <span
              className={cn(
                'absolute left-12 text-sm duration-200 font-normal',
                !isOpen && className
              )}
            >
              {item.title}
            </span>
          </Link>
        )
      )}
    </nav>
  )
}
