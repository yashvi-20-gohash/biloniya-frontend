'use client'

import React, { FC } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/src/lib/utils'
import { Progress } from '@/src/components/ui/progress'

interface LoadingScreenProps {
  portal?: boolean
  className?: string
}

export const LoadingScreen: FC<LoadingScreenProps> = ({
  portal = false,
  className,
  ...other
}) => {
  const content = (
    <div
      className={cn(
        'flex items-center justify-center w-full h-full p-5',
        className
      )}
      {...other}
    >
      <Progress className="w-full max-w-xs" />
    </div>
  )

  if (portal) {
    const portalRoot = document.getElementById('portal-root')
    if (!portalRoot) return null // Make sure the portal root exists
    return createPortal(content, portalRoot)
  }

  return content
}
