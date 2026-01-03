import React, { useState } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { FaDownload } from 'react-icons/fa'

const Bulletins = () => {
  // Données mockées des bulletins
  const [bulletins] = useState([
    {
      id: 1,
      periode: '1er Trimestre',
      annee: '2026-2027',
      moyenne: 75.5,
      rang: 12,
      totalEleves: 28,
      date: '2026-10-15'
    },
    {
      id: 2,
      periode: '2e Trimestre',
      annee: '2025-2026',
      moyenne: 78.2,
      rang: 10,
      totalEleves: 28,
      date: '2026-01-20'
    },
    {
      id: 3,
      periode: '3e Trimestre',
      annee: '2025-2026',
      moyenne: 80.1,
      rang: 8,
      totalEleves: 28,
      date: '2026-04-25'
    }
  ])

  const handleDownload = (bulletin) => {
    // Simulation de téléchargement
    alert(`Téléchargement du bulletin: ${bulletin.periode} ${bulletin.annee}`)
  }

  return (
    <div>
      <h2 className="mb-4">Mes Bulletins</h2>

      <div className="row">
        {bulletins.map((bulletin) => (
          <div key={bulletin.id} className="col-md-6 col-lg-4 mb-4">
            <Card>
              <div className="text-center mb-3">
                <h5 className="mb-1">{bulletin.periode}</h5>
                <p className="text-muted small mb-0">{bulletin.annee}</p>
              </div>

              <div className="border-top pt-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Moyenne:</span>
                  <strong className="text-primary">{bulletin.moyenne}/100</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Rang:</span>
                  <strong>{bulletin.rang}/{bulletin.totalEleves}</strong>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Date:</span>
                  <span className="text-muted">
                    {new Date(bulletin.date).toLocaleDateString('fr-FR')}
                  </span>
                </div>

                <Button
                  variant="outline-primary"
                  className="w-100"
                  onClick={() => handleDownload(bulletin)}
                  icon={<FaDownload />}
                >
                  Télécharger PDF
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {bulletins.length === 0 && (
        <Card>
          <p className="text-center text-muted mb-0">Aucun bulletin disponible</p>
        </Card>
      )}
    </div>
  )
}

export default Bulletins

