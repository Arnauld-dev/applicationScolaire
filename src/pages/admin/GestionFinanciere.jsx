import React, { useState } from 'react'
import Card from '../../components/ui/Card'
import Table from '../../components/ui/Table'
import Form from '../../components/ui/Form'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'
import Modal from '../../components/global/Modal'
import { toast } from 'react-toastify'
import { FaPlus, FaEdit, FaTrash, FaDollarSign } from 'react-icons/fa'
import { formatDate, getStatutPaiement } from '../../utils/helpers'

const GestionFinanciere = () => {
  const [frais, setFrais] = useState([
    { id: 1, type: 'Frais de scolarité', montant: 200000, classe: 'Toutes', dateEcheance: '2026-09-01' },
    { id: 2, type: 'Frais d\'inscription', montant: 50000, classe: 'Toutes', dateEcheance: '2026-08-15' },
    { id: 3, type: 'Frais de cantine', montant: 150000, classe: 'Toutes', dateEcheance: '2026-10-01' }
  ])

  const [paiements, setPaiements] = useState([
    {
      id: 1,
      eleve: 'Jean Pierre',
      type: 'Frais de scolarité',
      montant: 200000,
      datePaiement: '2026-08-25',
      statut: 'paye'
    },
    {
      id: 2,
      eleve: 'Marie Martin',
      type: 'Frais de scolarité',
      montant: 200000,
      datePaiement: '2026-08-26',
      statut: 'paye'
    }
  ])

  const [activeTab, setActiveTab] = useState('frais')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    type: '',
    montant: '',
    classe: 'Toutes',
    dateEcheance: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (activeTab === 'frais') {
      if (editingItem) {
        setFrais(frais.map(f => 
          f.id === editingItem.id ? { ...f, ...formData, montant: parseInt(formData.montant) } : f
        ))
        toast.success('Frais modifié avec succès')
      } else {
        const newFrais = {
          id: frais.length + 1,
          ...formData,
          montant: parseInt(formData.montant)
        }
        setFrais([...frais, newFrais])
        toast.success('Frais ajouté avec succès')
      }
    }
    
    setShowModal(false)
    setEditingItem(null)
    setFormData({
      type: '',
      montant: '',
      classe: 'Toutes',
      dateEcheance: ''
    })
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      type: item.type,
      montant: item.montant.toString(),
      classe: item.classe || 'Toutes',
      dateEcheance: item.dateEcheance || ''
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élément?')) {
      setFrais(frais.filter(f => f.id !== id))
      toast.success('Frais supprimé avec succès')
    }
  }

  const fraisColumns = [
    { key: 'type', label: 'Type de frais', style: { width: '30%' } },
    { key: 'montant', label: 'Montant', style: { width: '20%' }, render: (value) => `${value.toLocaleString('fr-FR')} FBU` },
    { key: 'classe', label: 'Classe', style: { width: '20%' } },
    { key: 'dateEcheance', label: 'Date d\'échéance', style: { width: '20%' }, render: (value) => formatDate(value) },
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

  const paiementsColumns = [
    { key: 'eleve', label: 'Élève', style: { width: '25%' } },
    { key: 'type', label: 'Type', style: { width: '25%' } },
    { key: 'montant', label: 'Montant', style: { width: '20%' }, render: (value) => `${value.toLocaleString('fr-FR')} FBU` },
    { key: 'datePaiement', label: 'Date', style: { width: '20%' }, render: (value) => formatDate(value) },
    { key: 'statut', label: 'Statut', style: { width: '10%' }, render: (value) => <span className="badge bg-success">{value}</span> }
  ]

  const totalFrais = frais.reduce((sum, f) => sum + f.montant, 0)
  const totalPaiements = paiements.reduce((sum, p) => sum + p.montant, 0)

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Gestion Financière</h2>
        {activeTab === 'frais' && (
          <Button
            variant="primary"
            onClick={() => {
              setEditingItem(null)
              setFormData({
                type: '',
                montant: '',
                classe: 'Toutes',
                dateEcheance: ''
              })
              setShowModal(true)
            }}
            icon={<FaPlus />}
          >
            Ajouter des frais
          </Button>
        )}
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <Card className="text-center">
            <h5 className="text-muted mb-2">Total Frais</h5>
            <h3 className="mb-0 text-primary">{totalFrais.toLocaleString('fr-FR')} FBU</h3>
          </Card>
        </div>
        <div className="col-md-4">
          <Card className="text-center">
            <h5 className="text-muted mb-2">Total Paiements</h5>
            <h3 className="mb-0 text-success">{totalPaiements.toLocaleString('fr-FR')} FBU</h3>
          </Card>
        </div>
        <div className="col-md-4">
          <Card className="text-center">
            <h5 className="text-muted mb-2">Taux de recouvrement</h5>
            <h3 className="mb-0 text-info">
              {totalFrais > 0 ? Math.round((totalPaiements / totalFrais) * 100) : 0}%
            </h3>
          </Card>
        </div>
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'frais' ? 'active' : ''}`}
            onClick={() => setActiveTab('frais')}
          >
            <FaDollarSign className="me-2" />
            Frais Scolaires ({frais.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'paiements' ? 'active' : ''}`}
            onClick={() => setActiveTab('paiements')}
          >
            <FaDollarSign className="me-2" />
            Paiements ({paiements.length})
          </button>
        </li>
      </ul>

      <Card>
        {activeTab === 'frais' ? (
          <Table columns={fraisColumns} data={frais} striped hover sortable />
        ) : (
          <Table columns={paiementsColumns} data={paiements} striped hover sortable />
        )}
      </Card>

      {activeTab === 'frais' && (
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false)
            setEditingItem(null)
          }}
          title={editingItem ? 'Modifier les frais' : 'Ajouter des frais'}
          footer={
            <>
              <Button variant="secondary" onClick={() => { setShowModal(false); setEditingItem(null) }}>
                Annuler
              </Button>
              <Button variant="primary" type="submit" form="frais-form">
                {editingItem ? 'Modifier' : 'Ajouter'}
              </Button>
            </>
          }
        >
          <Form id="frais-form" onSubmit={handleSubmit}>
            <Input label="Type de frais" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} required />
            <Input label="Montant" type="number" value={formData.montant} onChange={(e) => setFormData({ ...formData, montant: e.target.value })} required />
            <Input label="Classe" value={formData.classe} onChange={(e) => setFormData({ ...formData, classe: e.target.value })} placeholder="Toutes" />
            <Input label="Date d'échéance" type="date" value={formData.dateEcheance} onChange={(e) => setFormData({ ...formData, dateEcheance: e.target.value })} required />
          </Form>
        </Modal>
      )}
    </div>
  )
}

export default GestionFinanciere

