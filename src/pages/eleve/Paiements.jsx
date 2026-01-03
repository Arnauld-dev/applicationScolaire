import React, { useState } from 'react'
import Card from '../../components/ui/Card'
import Table from '../../components/ui/Table'
import { getStatutPaiement, formatDate } from '../../utils/helpers'

const Paiements = () => {
  // Données mockées des paiements
  const [paiements] = useState([
    {
      id: 1,
      type: 'Frais de scolarité',
      montantTotal: 200000,
      montantPaye: 200000,
      dateEcheance: '2026-09-01',
      datePaiement: '2026-08-25',
      statut: 'paye'
    },
    {
      id: 2,
      type: 'Frais d\'inscription',
      montantTotal: 50000,
      montantPaye: 50000,
      dateEcheance: '2026-08-15',
      datePaiement: '2026-08-10',
      statut: 'paye'
    },
    {
      id: 3,
      type: 'Frais de cantine',
      montantTotal: 150000,
      montantPaye: 75000,
      dateEcheance: '2026-10-01',
      datePaiement: null,
      statut: 'partiel'
    },
    {
      id: 4,
      type: 'Frais de transport',
      montantTotal: 100000,
      montantPaye: 0,
      dateEcheance: '2026-10-15',
      datePaiement: null,
      statut: 'en_attente'
    }
  ])

  const columns = [
    {
      key: 'type',
      label: 'Type de frais',
      style: { width: '25%' }
    },
    {
      key: 'montantTotal',
      label: 'Montant total',
      style: { width: '15%' },
      render: (value) => `${value.toLocaleString('fr-FR')} FBU`
    },
    {
      key: 'montantPaye',
      label: 'Montant payé',
      style: { width: '15%' },
      render: (value) => `${value.toLocaleString('fr-FR')} FBU`
    },
    {
      key: 'dateEcheance',
      label: 'Date d\'échéance',
      style: { width: '15%' },
      render: (value) => formatDate(value)
    },
    {
      key: 'datePaiement',
      label: 'Date de paiement',
      style: { width: '15%' },
      render: (value) => value ? formatDate(value) : '-'
    },
    {
      key: 'statut',
      label: 'Statut',
      style: { width: '15%' },
      render: (_, row) => {
        const statut = getStatutPaiement(row.montantPaye, row.montantTotal)
        return <span className={statut.class}>{statut.text}</span>
      }
    }
  ]

  const totalFrais = paiements.reduce((sum, p) => sum + p.montantTotal, 0)
  const totalPaye = paiements.reduce((sum, p) => sum + p.montantPaye, 0)
  const resteAPayer = totalFrais - totalPaye

  return (
    <div>
      <h2 className="mb-4">Mes Paiements</h2>

      <div className="row mb-4">
        <div className="col-md-3">
          <Card className="text-center">
            <h5 className="text-muted mb-2">Total des frais</h5>
            <h3 className="mb-0 text-primary">
              {totalFrais.toLocaleString('fr-FR')} FBU
            </h3>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="text-center">
            <h5 className="text-muted mb-2">Total payé</h5>
            <h3 className="mb-0 text-success">
              {totalPaye.toLocaleString('fr-FR')} FBU
            </h3>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="text-center">
            <h5 className="text-muted mb-2">Reste à payer</h5>
            <h3 className="mb-0 text-danger">
              {resteAPayer.toLocaleString('fr-FR')} FBU
            </h3>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="text-center">
            <h5 className="text-muted mb-2">Taux de paiement</h5>
            <h3 className="mb-0 text-info">
              {totalFrais > 0 ? Math.round((totalPaye / totalFrais) * 100) : 0}%
            </h3>
          </Card>
        </div>
      </div>

      <Card title="Historique des paiements">
        <Table
          columns={columns}
          data={paiements}
          striped
          hover
          sortable
        />
      </Card>
    </div>
  )
}

export default Paiements

