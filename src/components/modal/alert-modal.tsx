'use client'
import { useEffect, useState } from 'react'
import { Modal } from '@/src/components/ui/modal'
import LoadingButton from '@/src/components/ui/loading-button' // Import your LoadingButton component
import { Button } from '../front/ui/button'

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading: boolean
  title?: string
  description?: string
  cancelText?: string
  confirmText?: string
  variant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'success'
    | 'error'
    | null
    | undefined
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  cancelText = 'Cancel',
  confirmText = 'Continue',
  variant = 'destructive',
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button
          disabled={loading} // Normal button for cancel
          variant="outline"
          onClick={onClose}
        >
          {cancelText}
        </Button>
        <LoadingButton
          variant={variant}
          onClick={onConfirm}
          isLoading={loading}
          className="padding-20"
        >
          {confirmText}
        </LoadingButton>
      </div>
    </Modal>
  )
}
