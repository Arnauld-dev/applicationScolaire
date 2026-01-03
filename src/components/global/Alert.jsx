import React from 'react'
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa'

const Alert = ({
  type = 'info',
  title,
  message,
  onClose,
  className = '',
  dismissible = false
}) => {
  const icons = {
    success: <FaCheckCircle />,
    danger: <FaTimesCircle />,
    warning: <FaExclamationCircle />,
    info: <FaInfoCircle />
  }

  return (
    <div className={`alert alert-${type} ${dismissible ? 'alert-dismissible' : ''} ${className}`} role="alert">
      <div className="d-flex align-items-center">
        <span className="me-2">{icons[type]}</span>
        <div>
          {title && <strong>{title}</strong>}
          {title && message && <br />}
          {message}
        </div>
      </div>
      {dismissible && onClose && (
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
          aria-label="Fermer"
        />
      )}
    </div>
  )
}

export default Alert

