import React from 'react'

const Card = ({ title, subtitle, children, className = '', headerActions, footer }) => {
  return (
    <div className={`card shadow-sm ${className}`}>
      {(title || subtitle || headerActions) && (
        <div className="card-header bg-white border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              {title && <h5 className="card-title mb-0">{title}</h5>}
              {subtitle && <p className="text-muted small mb-0">{subtitle}</p>}
            </div>
            {headerActions && <div>{headerActions}</div>}
          </div>
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
      {footer && (
        <div className="card-footer bg-white border-top">
          {footer}
        </div>
      )}
    </div>
  )
}

export default Card

