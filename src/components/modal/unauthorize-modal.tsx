'use client'
import { useState } from 'react'
import { AlertModal } from './alert-modal'

interface UnauthorizedModalProps {
  isOpen: boolean
  onClose: () => void
}

const UnauthorizedModal: React.FC<UnauthorizedModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [loading, setLoading] = useState(false)

  const handleConfirm = () => {
    setLoading(true)
    localStorage.clear()
    window.location.href = '/'
  }

  return (
    <AlertModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      loading={loading}
      title="Unauthorized Access"
      description="You are not authorized to access this resource. Please sign in."
      cancelText="Close"
      confirmText="Sign In"
      variant="destructive"
    />
  )
}

export default UnauthorizedModal
