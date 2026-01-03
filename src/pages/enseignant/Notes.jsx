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

const Notes = () => {
  const [notes, setNotes] = useState([
    { id: 1, eleve: 'Jean Pierre', matricule: 'ELE001', matiere: 'Mathématiques', note: 78, coef: 4, date: '2026-09-15' },
    { id: 2, eleve: 'Marie Martin', matricule: 'ELE002', matiere: 'Mathématiques', note: 82, coef: 4, date: '2026-09-15' },
    { id: 3, eleve: 'Paul Durand', matricule: 'ELE003', matiere: 'Mathématiques', note: 75, coef: 4, date: '2026-09-15' }
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [formData, setFormData] = useState({
    eleve: '',
    matiere: 'Mathématiques',
    note: '',
    coef: '4',
    date: new Date().toISOString().split('T')[0]
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingNote) {
      // Modifier une note existante
      setNotes(notes.map(n => 
        n.id === editingNote.id 
          ? { ...n, ...formData, note: parseFloat(formData.note) }
          : n
      ))
      toast.success('Note modifiée avec succès')
    } else {
      // Ajouter une nouvelle note
      const newNote = {
        id: notes.length + 1,
        ...formData,
        note: parseFloat(formData.note),
        matricule: 'ELE' + String(notes.length + 1).padStart(3, '0')
      }
      setNotes([...notes, newNote])
      toast.success('Note ajoutée avec succès')
    }
    
    setShowModal(false)
    setEditingNote(null)
    setFormData({
      eleve: '',
      matiere: 'Mathématiques',
      note: '',
      coef: '4',
      date: new Date().toISOString().split('T')[0]
    })
  }

  const handleEdit = (note) => {
    setEditingNote(note)
    setFormData({
      eleve: note.eleve,
      matiere: note.matiere,
      note: note.note.toString(),
      coef: note.coef.toString(),
      date: note.date
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette note?')) {
      setNotes(notes.filter(n => n.id !== id))
      toast.success('Note supprimée avec succès')
    }
  }

  const columns = [
    {
      key: 'eleve',
      label: 'Élève',
      style: { width: '25%' }
    },
    {
      key: 'matricule',
      label: 'Matricule',
      style: { width: '15%' }
    },
    {
      key: 'matiere',
      label: 'Matière',
      style: { width: '20%' }
    },
    {
      key: 'note',
      label: 'Note',
      style: { width: '15%' },
      render: (value) => <span className="fw-bold">{value}/100</span>
    },
    {
      key: 'coef',
      label: 'Coefficient',
      style: { width: '10%' }
    },
    {
      key: 'date',
      label: 'Date',
      style: { width: '10%' },
      render: (value) => new Date(value).toLocaleDateString('fr-FR')
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
        <h2 className="mb-0">Gestion des Notes</h2>
        <Button
          variant="primary"
          onClick={() => {
            setEditingNote(null)
            setFormData({
              eleve: '',
              matiere: 'Mathématiques',
              note: '',
              coef: '4',
              date: new Date().toISOString().split('T')[0]
            })
            setShowModal(true)
          }}
          icon={<FaPlus />}
        >
          Ajouter une note
        </Button>
      </div>

      <Card title="Liste des notes">
        <Table
          columns={columns}
          data={notes}
          striped
          hover
          sortable
        />
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setEditingNote(null)
        }}
        title={editingNote ? 'Modifier la note' : 'Ajouter une note'}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setShowModal(false)
                setEditingNote(null)
              }}
            >
              Annuler
            </Button>
            <Button variant="primary" type="submit" form="note-form">
              {editingNote ? 'Modifier' : 'Ajouter'}
            </Button>
          </>
        }
      >
        <Form id="note-form" onSubmit={handleSubmit}>
          <Input
            label="Nom de l'élève"
            value={formData.eleve}
            onChange={(e) => setFormData({ ...formData, eleve: e.target.value })}
            required
          />
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
          <Input
            label="Note"
            type="number"
            min="0"
            max="100"
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            required
          />
          <Input
            label="Coefficient"
            type="number"
            min="1"
            max="10"
            value={formData.coef}
            onChange={(e) => setFormData({ ...formData, coef: e.target.value })}
            required
          />
          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </Form>
      </Modal>
    </div>
  )
}

export default Notes

