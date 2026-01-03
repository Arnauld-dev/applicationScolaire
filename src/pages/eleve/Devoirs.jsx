import React, { useState } from 'react'
import Card from '../../components/ui/Card'
import Table from '../../components/ui/Table'
import { getStatutDevoir } from '../../utils/helpers'
import { formatDate } from '../../utils/helpers'

const Devoirs = () => {
  // Données mockées des devoirs
  const [devoirs] = useState([
    {
      id: 1,
      matiere: 'Mathématiques',
      titre: 'Exercices sur les fonctions',
      description: 'Faire les exercices 1 à 10 page 45',
      dateLimite: '2026-09-20',
      statut: 'en_cours'
    },
    {
      id: 2,
      matiere: 'Français',
      titre: 'Rédaction sur le thème de la paix',
      description: 'Rédiger une composition de 300 mots',
      dateLimite: '2026-09-18',
      statut: 'urgent'
    },
    {
      id: 3,
      matiere: 'Physique',
      titre: 'TP sur les circuits électriques',
      description: 'Compléter le rapport de TP',
      dateLimite: '2026-09-22',
      statut: 'en_cours'
    },
    {
      id: 4,
      matiere: 'Histoire',
      titre: 'Exposé sur la colonisation',
      description: 'Préparer un exposé de 15 minutes',
      dateLimite: '2026-09-15',
      statut: 'en_retard'
    }
  ])

  const columns = [
    {
      key: 'matiere',
      label: 'Matière',
      style: { width: '20%' }
    },
    {
      key: 'titre',
      label: 'Titre',
      style: { width: '25%' }
    },
    {
      key: 'description',
      label: 'Description',
      style: { width: '30%' }
    },
    {
      key: 'dateLimite',
      label: 'Date limite',
      style: { width: '15%' },
      render: (value) => formatDate(value)
    },
    {
      key: 'statut',
      label: 'Statut',
      style: { width: '10%' },
      render: (_, row) => {
        const statut = getStatutDevoir(row.dateLimite)
        return <span className={statut.class}>{statut.text}</span>
      }
    }
  ]

  return (
    <div>
      <h2 className="mb-4">Mes Devoirs</h2>

      <div className="row mb-4">
        <div className="col-md-3">
          <Card className="text-center">
            <h5 className="text-muted mb-2">Total</h5>
            <h3 className="mb-0">{devoirs.length}</h3>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="text-center">
            <h5 className="text-warning mb-2">Urgents</h5>
            <h3 className="mb-0">
              {devoirs.filter(d => getStatutDevoir(d.dateLimite).text === 'Urgent').length}
            </h3>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="text-center">
            <h5 className="text-danger mb-2">En retard</h5>
            <h3 className="mb-0">
              {devoirs.filter(d => getStatutDevoir(d.dateLimite).text === 'En retard').length}
            </h3>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="text-center">
            <h5 className="text-info mb-2">En cours</h5>
            <h3 className="mb-0">
              {devoirs.filter(d => getStatutDevoir(d.dateLimite).text === 'En cours').length}
            </h3>
          </Card>
        </div>
      </div>

      <Card title="Liste des devoirs">
        <Table
          columns={columns}
          data={devoirs}
          striped
          hover
          sortable
        />
      </Card>
    </div>
  )
}

export default Devoirs

