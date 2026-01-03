import React, { useState } from 'react'
import Card from '../../components/ui/Card'
import Table from '../../components/ui/Table'
import Form from '../../components/ui/Form'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'
import Modal from '../../components/global/Modal'
import { toast } from 'react-toastify'
import { FaPlus, FaEdit, FaTrash, FaGraduationCap, FaBook, FaCalendarAlt } from 'react-icons/fa'

const GestionAcademique = () => {
  const [activeTab, setActiveTab] = useState('classes')
  const [classes, setClasses] = useState([
    { id: 1, nom: '4e Math', niveau: '4e', effectif: 25, enseignant: 'M. Dupont' },
    { id: 2, nom: '5e Math', niveau: '5e', effectif: 28, enseignant: 'M. Dupont' },
    { id: 3, nom: '6e Physique', niveau: '6e', effectif: 22, enseignant: 'M. Durand' }
  ])

  const [matieres, setMatieres] = useState([
    { id: 1, nom: 'Mathématiques', coef: 4, enseignant: 'M. Dupont' },
    { id: 2, nom: 'Français', coef: 3, enseignant: 'Mme Martin' },
    { id: 3, nom: 'Physique', coef: 3, enseignant: 'M. Durand' }
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    nom: '',
    niveau: '',
    effectif: '',
    enseignant: '',
    coef: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (activeTab === 'classes') {
      if (editingItem) {
        setClasses(classes.map(c => 
          c.id === editingItem.id ? { ...c, ...formData, effectif: parseInt(formData.effectif) } : c
        ))
        toast.success('Classe modifiée avec succès')
      } else {
        const newClasse = {
          id: classes.length + 1,
          ...formData,
          effectif: parseInt(formData.effectif)
        }
        setClasses([...classes, newClasse])
        toast.success('Classe ajoutée avec succès')
      }
    } else {
      if (editingItem) {
        setMatieres(matieres.map(m => 
          m.id === editingItem.id ? { ...m, ...formData, coef: parseInt(formData.coef) } : m
        ))
        toast.success('Matière modifiée avec succès')
      } else {
        const newMatiere = {
          id: matieres.length + 1,
          ...formData,
          coef: parseInt(formData.coef)
        }
        setMatieres([...matieres, newMatiere])
        toast.success('Matière ajoutée avec succès')
      }
    }
    
    setShowModal(false)
    setEditingItem(null)
    setFormData({
      nom: '',
      niveau: '',
      effectif: '',
      enseignant: '',
      coef: ''
    })
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      nom: item.nom,
      niveau: item.niveau || '',
      effectif: item.effectif?.toString() || '',
      enseignant: item.enseignant || '',
      coef: item.coef?.toString() || ''
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élément?')) {
      if (activeTab === 'classes') {
        setClasses(classes.filter(c => c.id !== id))
      } else {
        setMatieres(matieres.filter(m => m.id !== id))
      }
      toast.success('Élément supprimé avec succès')
    }
  }

  const classesColumns = [
    { key: 'nom', label: 'Nom de la classe', style: { width: '30%' } },
    { key: 'niveau', label: 'Niveau', style: { width: '20%' } },
    { key: 'effectif', label: 'Effectif', style: { width: '20%' } },
    { key: 'enseignant', label: 'Enseignant', style: { width: '20%' } },
    {
      key: 'actions',
      label: 'Actions',
      style: { width: '10%' },
      render: (_, row) => (
        <div className="d-flex gap-2">
          <Button variant="outline-primary" size="sm" onClick={() => handleEdit(row)} icon={<FaEdit />} />
          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(row.id)} icon={<FaTrash />} />
        </div>
      )
    }
  ]

  const matieresColumns = [
    { key: 'nom', label: 'Matière', style: { width: '40%' } },
    { key: 'coef', label: 'Coefficient', style: { width: '20%' } },
    { key: 'enseignant', label: 'Enseignant', style: { width: '30%' } },
    {
      key: 'actions',
      label: 'Actions',
      style: { width: '10%' },
      render: (_, row) => (
        <div className="d-flex gap-2">
          <Button variant="outline-primary" size="sm" onClick={() => handleEdit(row)} icon={<FaEdit />} />
          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(row.id)} icon={<FaTrash />} />
        </div>
      )
    }
  ]

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Gestion Académique</h2>
        <Button
          variant="primary"
          onClick={() => {
            setEditingItem(null)
            setFormData({
              nom: '',
              niveau: '',
              effectif: '',
              enseignant: '',
              coef: ''
            })
            setShowModal(true)
          }}
          icon={<FaPlus />}
        >
          Ajouter
        </Button>
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'classes' ? 'active' : ''}`}
            onClick={() => setActiveTab('classes')}
          >
            <FaGraduationCap className="me-2" />
            Classes ({classes.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'matieres' ? 'active' : ''}`}
            onClick={() => setActiveTab('matieres')}
          >
            <FaBook className="me-2" />
            Matières ({matieres.length})
          </button>
        </li>
      </ul>

      <Card>
        {activeTab === 'classes' ? (
          <Table columns={classesColumns} data={classes} striped hover sortable />
        ) : (
          <Table columns={matieresColumns} data={matieres} striped hover sortable />
        )}
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setEditingItem(null)
        }}
        title={editingItem ? `Modifier ${activeTab === 'classes' ? 'la classe' : 'la matière'}` : `Ajouter une ${activeTab === 'classes' ? 'classe' : 'matière'}`}
        footer={
          <>
            <Button variant="secondary" onClick={() => { setShowModal(false); setEditingItem(null) }}>
              Annuler
            </Button>
            <Button variant="primary" type="submit" form="academique-form">
              {editingItem ? 'Modifier' : 'Ajouter'}
            </Button>
          </>
        }
      >
        <Form id="academique-form" onSubmit={handleSubmit}>
          <Input label="Nom" value={formData.nom} onChange={(e) => setFormData({ ...formData, nom: e.target.value })} required />
          {activeTab === 'classes' ? (
            <>
              <Select label="Niveau" value={formData.niveau} onChange={(e) => setFormData({ ...formData, niveau: e.target.value })} options={['6e', '5e', '4e', '3e']} required />
              <Input label="Effectif" type="number" value={formData.effectif} onChange={(e) => setFormData({ ...formData, effectif: e.target.value })} required />
            </>
          ) : (
            <Input label="Coefficient" type="number" value={formData.coef} onChange={(e) => setFormData({ ...formData, coef: e.target.value })} required />
          )}
          <Input label="Enseignant" value={formData.enseignant} onChange={(e) => setFormData({ ...formData, enseignant: e.target.value })} required />
        </Form>
      </Modal>
    </div>
  )
}

export default GestionAcademique

