import React, { useState } from 'react'
import Card from '../../components/ui/Card'
import Table from '../../components/ui/Table'
import { getStatutNote, calculateMoyenne } from '../../utils/helpers'

const Notes = () => {
  // Données mockées des notes
  const [notes] = useState([
    { id: 1, matiere: 'Mathématiques', note: 78, coef: 4, date: '2026-09-15' },
    { id: 2, matiere: 'Français', note: 65, coef: 3, date: '2026-09-12' },
    { id: 3, matiere: 'Physique', note: 82, coef: 3, date: '2026-09-10' },
    { id: 4, matiere: 'Chimie', note: 75, coef: 2, date: '2026-09-08' },
    { id: 5, matiere: 'Anglais', note: 70, coef: 2, date: '2026-09-05' },
    { id: 6, matiere: 'Histoire', note: 68, coef: 2, date: '2026-09-03' }
  ])

  const columns = [
    {
      key: 'matiere',
      label: 'Matière',
      style: { width: '30%' }
    },
    {
      key: 'note',
      label: 'Note',
      style: { width: '15%' },
      render: (value) => (
        <span className="fw-bold">{value}/100</span>
      )
    },
    {
      key: 'coef',
      label: 'Coefficient',
      style: { width: '15%' }
    },
    {
      key: 'date',
      label: 'Date',
      style: { width: '20%' },
      render: (value) => new Date(value).toLocaleDateString('fr-FR')
    },
    {
      key: 'statut',
      label: 'Statut',
      style: { width: '20%' },
      render: (_, row) => {
        const statut = getStatutNote(row.note)
        return <span className={statut.class}>{statut.text}</span>
      }
    }
  ]

  const moyenne = calculateMoyenne(notes.map(n => ({ valeur: n.note })))

  return (
    <div>
      <h2 className="mb-4">Mes Notes</h2>

      <div className="row mb-4">
        <div className="col-md-4">
          <Card className="text-center bg-primary text-white">
            <h5 className="mb-2">Moyenne Générale</h5>
            <h2 className="mb-0">{moyenne}/100</h2>
          </Card>
        </div>
        <div className="col-md-4">
          <Card className="text-center bg-success text-white">
            <h5 className="mb-2">Total Matières</h5>
            <h2 className="mb-0">{notes.length}</h2>
          </Card>
        </div>
        <div className="col-md-4">
          <Card className="text-center bg-info text-white">
            <h5 className="mb-2">Dernière Note</h5>
            <h2 className="mb-0">{notes[0]?.note || 0}/100</h2>
          </Card>
        </div>
      </div>

      <Card title="Détail des notes">
        <Table
          columns={columns}
          data={notes}
          striped
          hover
          sortable
        />
      </Card>
    </div>
  )
}

export default Notes

