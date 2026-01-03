import React from 'react'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  disabled = false,
  loading = false,
  onClick,
  icon,
  iconPosition = 'left',
  ...props
}) => {
  const sizeClasses = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg'
  }

  const buttonContent = (
    <>
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Chargement...
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="me-2">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="ms-2">{icon}</span>}
        </>
      )}
    </>
  )

  return (
    <button
      type={type}
      className={`btn btn-${variant} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {buttonContent}
    </button>
  )
}

export default Button

