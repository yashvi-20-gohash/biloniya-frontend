'use client'

import useCommonStore from '@/src/store/common'
import { Button } from '../ui/button'
import { Modal } from '../ui/modal'
import { signOut } from 'next-auth/react'
import { toast } from 'sonner'
import { CURRENT_REDIRECT_URL } from '@/src/constants'


export const SessionUnuthoriseModel: React.FC = () => {
  const { unAuthoriseSession } = useCommonStore()

  const handleConfirmLogout = () => {
    signOut({ callbackUrl: `${CURRENT_REDIRECT_URL}/signin` })
    toast.success('Logout successful!')
    useCommonStore.setState({
      unAuthoriseSession: false,
    })
  }

  return (
    <Modal
      title="Unauthorised"
      description="  You have an invalid session!"
      isOpen={unAuthoriseSession}
      onClose={() => { }}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button onClick={handleConfirmLogout}>Sign again</Button>
      </div>
    </Modal>
  )
}
