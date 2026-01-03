import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-light border-top mt-auto py-3">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-muted small">
              © {currentYear} Petit Séminaire de Mugera. Tous droits réservés.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="mb-0 text-muted small">
              Application de gestion scolaire
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

