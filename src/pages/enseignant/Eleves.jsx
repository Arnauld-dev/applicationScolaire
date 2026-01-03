import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Table from '../../components/ui/Table'
import Select from '../../components/ui/Select'

const Eleves = () => {
  const [searchParams] = useSearchParams()
  const classeId = searchParams.get('classe') || '1'

  // Données mockées des élèves
  const [eleves] = useState([
    { id: 1, nom: 'Pierre', prenom: 'Jean', matricule: 'ELE001', moyenne: 78.5 },
    { id: 2, nom: 'Martin', prenom: 'Marie', matricule: 'ELE002', moyenne: 82.3 },
    { id: 3, nom: 'Durand', prenom: 'Paul', matricule: 'ELE003', moyenne: 75.1 },
    { id: 4, nom: 'Bernard', prenom: 'Sophie', matricule: 'ELE004', moyenne: 88.2 },
    { id: 5, nom: 'Dubois', prenom: 'Luc', matricule: 'ELE005', moyenne: 71.5 }
  ])

  const columns = [
    {
      key: 'matricule',
      label: 'Matricule',
      style: { width: '15%' }
    },
    {
      key: 'nom',
      label: 'Nom',
      style: { width: '25%' },
      render: (value, row) => `${row.prenom} ${value}`
    },
    {
      key: 'prenom',
      label: 'Prénom',
      style: { width: '20%' }
    },
    {
      key: 'moyenne',
      label: 'Moyenne',
      style: { width: '20%' },
      render: (value) => (
        <span className="fw-bold">{value}/100</span>
      )
    },
    {
      key: 'statut',
      label: 'Statut',
      style: { width: '20%' },
      render: (_, row) => {
        if (row.moyenne >= 16) return <span className="badge bg-success">Excellent</span>
        if (row.moyenne >= 12) return <span className="badge bg-info">Bien</span>
        if (row.moyenne >= 10) return <span className="badge bg-warning">Assez bien</span>
        return <span className="badge bg-danger">Insuffisant</span>
      }
    }
  ]

  return (
    <div>
      <h2 className="mb-4">Liste des Élèves</h2>

      <Card>
        <div className="mb-3">
          <Select
            label="Sélectionner une classe"
            value={classeId}
            options={[
              { value: '1', label: '4e Math' },
              { value: '2', label: '5e Math' },
              { value: '3', label: '6e Physique' }
            ]}
          />
        </div>

        <Table
          columns={columns}
          data={eleves}
          striped
          hover
          sortable
        />
      </Card>
    </div>
  )
}

export default Eleves

