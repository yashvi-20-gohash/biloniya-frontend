import React from 'react'
import { Button } from '@/src/components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'

interface LoadingButtonProps {
  isLoading: boolean
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  size?: 'sm' | 'lg' | 'default' | 'icon' | null | undefined
  form?: string // Made optional to be consistent
  onClick?: () => void
  className?: string // Add className prop
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

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  children,
  type = 'button',
  form = '',
  size = 'default',
  onClick,
  className = '', // Default value for className
  variant = 'default',
}) => {
  return (
    <Button
      size={size}
      style={{ minWidth: '100px' }}
      type={type}
      form={form}
      onClick={onClick}
      disabled={isLoading}
      className={className}
      variant={variant} // Apply className to Button
    >
      {isLoading ? (
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        children
      )}
    </Button>
  )
}

export default LoadingButton
