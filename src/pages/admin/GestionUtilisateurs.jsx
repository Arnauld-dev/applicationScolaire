import React, { useState } from 'react'
import Card from '../../components/ui/Card'
import Table from '../../components/ui/Table'
import Form from '../../components/ui/Form'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'
import Modal from '../../components/global/Modal'
import { toast } from 'react-toastify'
import { FaPlus, FaEdit, FaTrash, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa'

const GestionUtilisateurs = () => {
  const [activeTab, setActiveTab] = useState('eleves')
  const [eleves, setEleves] = useState([
    { id: 1, nom: 'Pierre', prenom: 'Jean', email: 'jean.pierre@example.com', matricule: 'ELE001', classe: '4e Math', statut: 'Actif' },
    { id: 2, nom: 'Martin', prenom: 'Marie', email: 'marie.martin@example.com', matricule: 'ELE002', classe: '4e Math', statut: 'Actif' },
    { id: 3, nom: 'Durand', prenom: 'Paul', email: 'paul.durand@example.com', matricule: 'ELE003', classe: '5e Math', statut: 'Actif' }
  ])

  const [enseignants, setEnseignants] = useState([
    { id: 1, nom: 'Dupont', prenom: 'Marie', email: 'marie.dupont@example.com', matieres: 'Mathématiques, Physique', statut: 'Actif' },
    { id: 2, nom: 'Bernard', prenom: 'Jean', email: 'jean.bernard@example.com', matieres: 'Français, Histoire', statut: 'Actif' }
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    matricule: '',
    classe: '',
    matieres: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (activeTab === 'eleves') {
      if (editingUser) {
        setEleves(eleves.map(e => 
          e.id === editingUser.id ? { ...e, ...formData } : e
        ))
        toast.success('Élève modifié avec succès')
      } else {
        const newEleve = {
          id: eleves.length + 1,
          ...formData,
          statut: 'Actif'
        }
        setEleves([...eleves, newEleve])
        toast.success('Élève ajouté avec succès')
      }
    } else {
      if (editingUser) {
        setEnseignants(enseignants.map(e => 
          e.id === editingUser.id ? { ...e, ...formData } : e
        ))
        toast.success('Enseignant modifié avec succès')
      } else {
        const newEnseignant = {
          id: enseignants.length + 1,
          ...formData,
          statut: 'Actif'
        }
        setEnseignants([...enseignants, newEnseignant])
        toast.success('Enseignant ajouté avec succès')
      }
    }
    
    setShowModal(false)
    setEditingUser(null)
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      matricule: '',
      classe: '',
      matieres: ''
    })
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      matricule: user.matricule || '',
      classe: user.classe || '',
      matieres: user.matieres || ''
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur?')) {
      if (activeTab === 'eleves') {
        setEleves(eleves.filter(e => e.id !== id))
      } else {
        setEnseignants(enseignants.filter(e => e.id !== id))
      }
      toast.success('Utilisateur supprimé avec succès')
    }
  }

  const elevesColumns = [
    { key: 'matricule', label: 'Matricule', style: { width: '15%' } },
    { key: 'nom', label: 'Nom', style: { width: '20%' }, render: (value, row) => `${row.prenom} ${value}` },
    { key: 'email', label: 'Email', style: { width: '25%' } },
    { key: 'classe', label: 'Classe', style: { width: '20%' } },
    { key: 'statut', label: 'Statut', style: { width: '10%' }, render: (value) => <span className="badge bg-success">{value}</span> },
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

  const enseignantsColumns = [
    { key: 'nom', label: 'Nom', style: { width: '25%' }, render: (value, row) => `${row.prenom} ${value}` },
    { key: 'email', label: 'Email', style: { width: '30%' } },
    { key: 'matieres', label: 'Matières', style: { width: '30%' } },
    { key: 'statut', label: 'Statut', style: { width: '10%' }, render: (value) => <span className="badge bg-success">{value}</span> },
    {
      key: 'actions',
      label: 'Actions',
      style: { width: '5%' },
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
        <h2 className="mb-0">Gestion des Utilisateurs</h2>
        <Button
          variant="primary"
          onClick={() => {
            setEditingUser(null)
            setFormData({
              nom: '',
              prenom: '',
              email: '',
              matricule: '',
              classe: '',
              matieres: ''
            })
            setShowModal(true)
          }}
          icon={<FaPlus />}
        >
          Ajouter un utilisateur
        </Button>
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'eleves' ? 'active' : ''}`}
            onClick={() => setActiveTab('eleves')}
          >
            <FaUserGraduate className="me-2" />
            Élèves ({eleves.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'enseignants' ? 'active' : ''}`}
            onClick={() => setActiveTab('enseignants')}
          >
            <FaChalkboardTeacher className="me-2" />
            Enseignants ({enseignants.length})
          </button>
        </li>
      </ul>

      <Card>
        {activeTab === 'eleves' ? (
          <Table columns={elevesColumns} data={eleves} striped hover sortable />
        ) : (
          <Table columns={enseignantsColumns} data={enseignants} striped hover sortable />
        )}
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setEditingUser(null)
        }}
        title={editingUser ? `Modifier ${activeTab === 'eleves' ? 'l\'élève' : 'l\'enseignant'}` : `Ajouter un ${activeTab === 'eleves' ? 'élève' : 'enseignant'}`}
        footer={
          <>
            <Button variant="secondary" onClick={() => { setShowModal(false); setEditingUser(null) }}>
              Annuler
            </Button>
            <Button variant="primary" type="submit" form="user-form">
              {editingUser ? 'Modifier' : 'Ajouter'}
            </Button>
          </>
        }
      >
        <Form id="user-form" onSubmit={handleSubmit}>
          <Input label="Nom" value={formData.nom} onChange={(e) => setFormData({ ...formData, nom: e.target.value })} required />
          <Input label="Prénom" value={formData.prenom} onChange={(e) => setFormData({ ...formData, prenom: e.target.value })} required />
          <Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          {activeTab === 'eleves' ? (
            <>
              <Input label="Matricule" value={formData.matricule} onChange={(e) => setFormData({ ...formData, matricule: e.target.value })} required />
              <Input label="Classe" value={formData.classe} onChange={(e) => setFormData({ ...formData, classe: e.target.value })} required />
            </>
          ) : (
            <Input label="Matières" value={formData.matieres} onChange={(e) => setFormData({ ...formData, matieres: e.target.value })} placeholder="Séparées par des virgules" required />
          )}
        </Form>
      </Modal>
    </div>
  )
}

export default GestionUtilisateurs

