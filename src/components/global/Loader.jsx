import React from 'react'

const Loader = ({ size = 'md', fullScreen = false, text = 'Chargement...' }) => {
  const sizeClasses = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg'
  }

  const loader = (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className={`spinner-border text-primary ${sizeClasses[size]}`} role="status">
        <span className="visually-hidden">Chargement...</span>
      </div>
      {text && <p className="mt-3 text-muted">{text}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75" style={{ zIndex: 9999 }}>
        {loader}
      </div>
    )
  }

  return loader
}

export default Loader

