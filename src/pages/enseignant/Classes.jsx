import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Table from '../../components/ui/Table'
import Button from '../../components/ui/Button'
import { FaUsers, FaEye } from 'react-icons/fa'

const Classes = () => {
  // Données mockées des classes
  const [classes] = useState([
    { id: 1, nom: '4e Math', niveau: '4e', eleves: 25, matiere: 'Mathématiques' },
    { id: 2, nom: '5e Math', niveau: '5e', eleves: 28, matiere: 'Mathématiques' },
    { id: 3, nom: '6e Physique', niveau: '6e', eleves: 22, matiere: 'Physique' }
  ])

  const columns = [
    {
      key: 'nom',
      label: 'Classe',
      style: { width: '25%' }
    },
    {
      key: 'niveau',
      label: 'Niveau',
      style: { width: '15%' }
    },
    {
      key: 'matiere',
      label: 'Matière',
      style: { width: '30%' }
    },
    {
      key: 'eleves',
      label: 'Nombre d\'élèves',
      style: { width: '20%' },
      render: (value) => (
        <span>
          <FaUsers className="me-2" />
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      style: { width: '10%' },
      render: (_, row) => (
        <Link to={`/enseignant/eleves?classe=${row.id}`}>
          <Button variant="outline-primary" size="sm" icon={<FaEye />}>
            Voir
          </Button>
        </Link>
      )
    }
  ]

  return (
    <div>
      <h2 className="mb-4">Mes Classes</h2>

      <div className="row mb-4">
        <div className="col-md-4">
          <Card className="text-center">
            <h5 className="text-muted mb-2">Total Classes</h5>
            <h3 className="mb-0 text-primary">{classes.length}</h3>
          </Card>
        </div>
        <div className="col-md-4">
          <Card className="text-center">
            <h5 className="text-muted mb-2">Total Élèves</h5>
            <h3 className="mb-0 text-success">
              {classes.reduce((sum, c) => sum + c.eleves, 0)}
            </h3>
          </Card>
        </div>
        <div className="col-md-4">
          <Card className="text-center">
            <h5 className="text-muted mb-2">Matières enseignées</h5>
            <h3 className="mb-0 text-info">
              {new Set(classes.map(c => c.matiere)).size}
            </h3>
          </Card>
        </div>
      </div>

      <Card title="Liste des classes">
        <Table
          columns={columns}
          data={classes}
          striped
          hover
        />
      </Card>
    </div>
  )
}

export default Classes

