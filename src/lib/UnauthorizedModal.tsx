// UnauthorizedModal.tsx
import React from 'react'

interface UnauthorizedModalProps {
  isOpen: boolean
  onClose: () => void
}

const UnauthorizedModal: React.FC<UnauthorizedModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Unauthorized Access</h2>
        <p>You do not have permission to access this resource.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default UnauthorizedModal
