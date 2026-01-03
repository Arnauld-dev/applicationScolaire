import React from 'react'

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  className = '',
  helpText,
  icon,
  rows,
  ...props
}) => {
  const inputId = name || `input-${Math.random().toString(36).substr(2, 9)}`
  const isTextarea = type === 'textarea'

  const inputElement = isTextarea ? (
    <textarea
      className={`form-control ${error ? 'is-invalid' : ''}`}
      id={inputId}
      name={name}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      rows={rows || 3}
      {...props}
    />
  ) : (
    <input
      type={type}
      className={`form-control ${error ? 'is-invalid' : ''}`}
      id={inputId}
      name={name}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      {...props}
    />
  )

  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}
      <div className={icon && !isTextarea ? 'input-group' : ''}>
        {icon && !isTextarea && (
          <span className="input-group-text">
            {icon}
          </span>
        )}
        {inputElement}
      </div>
      {error && <div className="invalid-feedback d-block">{error}</div>}
      {helpText && !error && <div className="form-text">{helpText}</div>}
    </div>
  )
}

export default Input

