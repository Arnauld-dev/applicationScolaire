import React, { useState } from 'react'
import Card from '../../components/ui/Card'
import Table from '../../components/ui/Table'
import Form from '../../components/ui/Form'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'
import Modal from '../../components/global/Modal'
import { toast } from 'react-toastify'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { formatDate } from '../../utils/helpers'

const Devoirs = () => {
  const [devoirs, setDevoirs] = useState([
    {
      id: 1,
      matiere: 'Mathématiques',
      titre: 'Exercices sur les fonctions',
      description: 'Faire les exercices 1 à 10 page 45',
      dateLimite: '2026-09-20',
      classe: '4e Math'
    },
    {
      id: 2,
      matiere: 'Mathématiques',
      titre: 'Devoir maison - Algèbre',
      description: 'Résoudre les équations du chapitre 3',
      dateLimite: '2026-09-25',
      classe: '5e Math'
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingDevoir, setEditingDevoir] = useState(null)
  const [formData, setFormData] = useState({
    matiere: 'Mathématiques',
    titre: '',
    description: '',
    dateLimite: '',
    classe: '4e Math'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingDevoir) {
      setDevoirs(devoirs.map(d => 
        d.id === editingDevoir.id ? { ...d, ...formData } : d
      ))
      toast.success('Devoir modifié avec succès')
    } else {
      const newDevoir = {
        id: devoirs.length + 1,
        ...formData
      }
      setDevoirs([...devoirs, newDevoir])
      toast.success('Devoir ajouté avec succès')
    }
    
    setShowModal(false)
    setEditingDevoir(null)
    setFormData({
      matiere: 'Mathématiques',
      titre: '',
      description: '',
      dateLimite: '',
      classe: '4e Math'
    })
  }

  const handleEdit = (devoir) => {
    setEditingDevoir(devoir)
    setFormData({
      matiere: devoir.matiere,
      titre: devoir.titre,
      description: devoir.description,
      dateLimite: devoir.dateLimite,
      classe: devoir.classe
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce devoir?')) {
      setDevoirs(devoirs.filter(d => d.id !== id))
      toast.success('Devoir supprimé avec succès')
    }
  }

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
      key: 'classe',
      label: 'Classe',
      style: { width: '15%' }
    },
    {
      key: 'dateLimite',
      label: 'Date limite',
      style: { width: '10%' },
      render: (value) => formatDate(value)
    },
    {
      key: 'actions',
      label: 'Actions',
      style: { width: '10%' },
      render: (_, row) => (
        <div className="d-flex gap-2">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => handleEdit(row)}
            icon={<FaEdit />}
          />
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => handleDelete(row.id)}
            icon={<FaTrash />}
          />
        </div>
      )
    }
  ]

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Gestion des Devoirs</h2>
        <Button
          variant="primary"
          onClick={() => {
            setEditingDevoir(null)
            setFormData({
              matiere: 'Mathématiques',
              titre: '',
              description: '',
              dateLimite: '',
              classe: '4e Math'
            })
            setShowModal(true)
          }}
          icon={<FaPlus />}
        >
          Ajouter un devoir
        </Button>
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

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setEditingDevoir(null)
        }}
        title={editingDevoir ? 'Modifier le devoir' : 'Ajouter un devoir'}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setShowModal(false)
                setEditingDevoir(null)
              }}
            >
              Annuler
            </Button>
            <Button variant="primary" type="submit" form="devoir-form">
              {editingDevoir ? 'Modifier' : 'Ajouter'}
            </Button>
          </>
        }
      >
        <Form id="devoir-form" onSubmit={handleSubmit}>
          <Select
            label="Matière"
            value={formData.matiere}
            onChange={(e) => setFormData({ ...formData, matiere: e.target.value })}
            options={[
              'Mathématiques',
              'Français',
              'Physique',
              'Chimie',
              'Anglais',
              'Histoire'
            ]}
            required
          />
          <Select
            label="Classe"
            value={formData.classe}
            onChange={(e) => setFormData({ ...formData, classe: e.target.value })}
            options={[
              '4e Math',
              '5e Math',
              '6e Physique'
            ]}
            required
          />
          <Input
            label="Titre"
            value={formData.titre}
            onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
            required
          />
          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          <Input
            label="Date limite"
            type="date"
            value={formData.dateLimite}
            onChange={(e) => setFormData({ ...formData, dateLimite: e.target.value })}
            required
          />
        </Form>
      </Modal>
    </div>
  )
}

export default Devoirs

