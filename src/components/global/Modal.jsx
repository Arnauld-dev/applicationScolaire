import React from 'react'
import { FaTimes } from 'react-icons/fa'

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  footer,
  closeButton = true
}) => {
  if (!isOpen) return null

  const sizeClasses = {
    sm: 'modal-sm',
    md: '',
    lg: 'modal-lg',
    xl: 'modal-xl'
  }

  return (
    <>
      <div
        className="modal-backdrop fade show"
        onClick={onClose}
        style={{ zIndex: 1040 }}
      />
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ zIndex: 1050 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        <div className={`modal-dialog modal-dialog-centered ${sizeClasses[size]}`}>
          <div className="modal-content">
            {(title || closeButton) && (
              <div className="modal-header">
                {title && <h5 className="modal-title">{title}</h5>}
                {closeButton && (
                  <button
                    type="button"
                    className="btn-close"
                    onClick={onClose}
                    aria-label="Fermer"
                  />
                )}
              </div>
            )}
            <div className="modal-body">
              {children}
            </div>
            {footer && (
              <div className="modal-footer">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal

