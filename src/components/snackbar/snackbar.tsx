'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import StyledToaster from './styles'
import { toasterClasses } from './classes'

export function Snackbar() {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setPortalRoot(document.getElementById('portal-root'))
  }, [])

  const toastOptions = {
    unstyled: true,
    classNames: {
      toast: toasterClasses.toast,
      icon: toasterClasses.icon,
      content: toasterClasses.content,
      title: toasterClasses.title,
      description: toasterClasses.description,
      actionButton: toasterClasses.actionButton,
      cancelButton: toasterClasses.cancelButton,
      closeButton: toasterClasses.closeButton,
      default: toasterClasses.default,
      info: toasterClasses.info,
      error: toasterClasses.error,
      success: toasterClasses.success,
      warning: toasterClasses.warning,
    },
  }

  const icons = {
    loading: <span className={toasterClasses.loadingIcon} />,
    info: <span className={toasterClasses.iconSvg}>ℹ️</span>,
    success: <span className={toasterClasses.iconSvg}>✔️</span>,
    warning: <span className={toasterClasses.iconSvg}>⚠️</span>,
    error: <span className={toasterClasses.iconSvg}>❌</span>,
  }

  if (!portalRoot) return null

  return createPortal(
    <StyledToaster
      expand
      gap={12}
      closeButton
      offset={16}
      visibleToasts={4}
      position="top-right"
      className={toasterClasses.root}
      toastOptions={toastOptions}
      icons={icons}
    />,
    portalRoot
  )
}
