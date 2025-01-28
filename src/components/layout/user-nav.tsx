'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from '@/src/components/ui/dropdown-menu'
import { Wallet } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { AlertModal } from '../modal/alert-modal'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import { CURRENT_BASE_URL, CURRENT_REDIRECT_URL } from '@/src/constants'

export function UserNav() {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLogout = () => {
    setIsModalOpen(true)
  }
  const handleConfirmLogout = () => {
    signOut({ callbackUrl: `${CURRENT_REDIRECT_URL}/signin` })
    toast.success('Logout successful!')
    setIsModalOpen(false)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSettingsClick = () => {
    router.push('/settings')
  }
  const handleProfileClick = () => {
    router.push('/profile')
  }




  return (
    <>
      <div className="flex items-center">
        {CURRENT_BASE_URL !== '/super-admin' && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-6 w-6 icon-style">
                  <Link href="/buy-credit" className="mr-2 ">
                    <Wallet className="h-4 w-4" />
                  </Link>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Buy Credit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <DropdownMenu>

          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuGroup>
              {CURRENT_BASE_URL === '/super-admin' && (
                <DropdownMenuItem
                  onClick={handleProfileClick}
                  className="cursor-pointer"
                >
                  Profile
                  <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              )}
              {CURRENT_BASE_URL !== '/super-admin' && (
                <DropdownMenuItem
                  onClick={handleSettingsClick}
                  className="cursor-pointer"
                >
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer"
            >
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Alert Modal for logout confirmation */}

      <AlertModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
        loading={false}
        title="Logout"
        description="Do you really want to Logout?"
        cancelText="Cancel"
        confirmText="Logout"
        variant="error"
      />
    </>
  )
}
