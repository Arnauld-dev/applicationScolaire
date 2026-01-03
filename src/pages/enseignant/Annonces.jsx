import React, { useState } from 'react'
import Card from '../../components/ui/Card'
import Table from '../../components/ui/Table'
import Form from '../../components/ui/Form'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Modal from '../../components/global/Modal'
import { toast } from 'react-toastify'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { formatDate } from '../../utils/helpers'

const Annonces = () => {
  const [annonces, setAnnonces] = useState([
    {
      id: 1,
      titre: 'Devoir de Mathématiques',
      contenu: 'Le devoir de Mathématiques est reporté au 25 septembre',
      date: '2026-09-10',
      classe: '4e Math'
    },
    {
      id: 2,
      titre: 'Réunion parents',
      contenu: 'Réunion des parents d\'élèves prévue le 15 septembre',
      date: '2026-09-08',
      classe: 'Toutes classes'
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingAnnonce, setEditingAnnonce] = useState(null)
  const [formData, setFormData] = useState({
    titre: '',
    contenu: '',
    classe: 'Toutes classes'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingAnnonce) {
      setAnnonces(annonces.map(a => 
        a.id === editingAnnonce.id 
          ? { ...a, ...formData, date: new Date().toISOString().split('T')[0] }
          : a
      ))
      toast.success('Annonce modifiée avec succès')
    } else {
      const newAnnonce = {
        id: annonces.length + 1,
        ...formData,
        date: new Date().toISOString().split('T')[0]
      }
      setAnnonces([...annonces, newAnnonce])
      toast.success('Annonce publiée avec succès')
    }
    
    setShowModal(false)
    setEditingAnnonce(null)
    setFormData({
      titre: '',
      contenu: '',
      classe: 'Toutes classes'
    })
  }

  const handleEdit = (annonce) => {
    setEditingAnnonce(annonce)
    setFormData({
      titre: annonce.titre,
      contenu: annonce.contenu,
      classe: annonce.classe
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce?')) {
      setAnnonces(annonces.filter(a => a.id !== id))
      toast.success('Annonce supprimée avec succès')
    }
  }

  const columns = [
    {
      key: 'titre',
      label: 'Titre',
      style: { width: '25%' }
    },
    {
      key: 'contenu',
      label: 'Contenu',
      style: { width: '40%' }
    },
    {
      key: 'classe',
      label: 'Classe',
      style: { width: '15%' }
    },
    {
      key: 'date',
      label: 'Date',
      style: { width: '15%' },
      render: (value) => formatDate(value)
    },
    {
      key: 'actions',
      label: 'Actions',
      style: { width: '5%' },
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
        <h2 className="mb-0">Gestion des Annonces</h2>
        <Button
          variant="primary"
          onClick={() => {
            setEditingAnnonce(null)
            setFormData({
              titre: '',
              contenu: '',
              classe: 'Toutes classes'
            })
            setShowModal(true)
          }}
          icon={<FaPlus />}
        >
          Publier une annonce
        </Button>
      </div>

      <Card title="Liste des annonces">
        <Table
          columns={columns}
          data={annonces}
          striped
          hover
          sortable
        />
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setEditingAnnonce(null)
        }}
        title={editingAnnonce ? 'Modifier l\'annonce' : 'Publier une annonce'}
        size="lg"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setShowModal(false)
                setEditingAnnonce(null)
              }}
            >
              Annuler
            </Button>
            <Button variant="primary" type="submit" form="annonce-form">
              {editingAnnonce ? 'Modifier' : 'Publier'}
            </Button>
          </>
        }
      >
        <Form id="annonce-form" onSubmit={handleSubmit}>
          <Input
            label="Titre"
            value={formData.titre}
            onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
            required
          />
          <Input
            label="Contenu"
            type="textarea"
            value={formData.contenu}
            onChange={(e) => setFormData({ ...formData, contenu: e.target.value })}
            required
            rows={5}
          />
          <Input
            label="Classe"
            value={formData.classe}
            onChange={(e) => setFormData({ ...formData, classe: e.target.value })}
            placeholder="Toutes classes"
          />
        </Form>
      </Modal>
    </div>
  )
}

export default Annonces

