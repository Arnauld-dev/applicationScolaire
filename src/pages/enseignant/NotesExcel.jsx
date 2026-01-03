import React, { useState, useCallback, useMemo } from 'react'
import DataGrid from 'react-data-grid'
import { toast } from 'react-toastify'
import * as XLSX from 'xlsx'
import { FaFileExcel, FaDownload, FaUpload, FaSave, FaTrash, FaPlus } from 'react-icons/fa'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'

const NotesExcel = () => {
  const { user } = useAuth()
  
  // Calculer les valeurs dérivées
  const calculateDerivedValues = useCallback((row) => {
    const notes = [row.note1, row.note2, row.note3].filter(n => n && n !== '' && !isNaN(parseFloat(n)))
    const moyenne = notes.length > 0 
      ? (notes.reduce((sum, n) => sum + parseFloat(n), 0) / notes.length).toFixed(2)
      : '0.00'
    
    const coef = parseFloat(row.coef) || 1
    const noteFinale = (parseFloat(moyenne) * coef).toFixed(2)
    
    let mention = ''
    let mentionColor = '#6c757d'
    const moy = parseFloat(moyenne)
    if (moy >= 16) { mention = 'Excellent'; mentionColor = '#00A859' }
    else if (moy >= 14) { mention = 'Très bien'; mentionColor = '#00A859' }
    else if (moy >= 12) { mention = 'Bien'; mentionColor = '#FFD700' }
    else if (moy >= 10) { mention = 'Assez bien'; mentionColor = '#FFC107' }
    else { mention = 'Insuffisant'; mentionColor = '#CE1126' }
    
    return { ...row, moyenne, note_finale: noteFinale, mention, mentionColor }
  }, [])

  // Données initiales
  const initialData = useMemo(() => [
    { id: 1, matricule: 'ELE001', nom: 'Pierre', prenom: 'Jean', note1: '', note2: '', note3: '', coef: '4' },
    { id: 2, matricule: 'ELE002', nom: 'Martin', prenom: 'Marie', note1: '', note2: '', note3: '', coef: '4' },
    { id: 3, matricule: 'ELE003', nom: 'Durand', prenom: 'Paul', note1: '', note2: '', note3: '', coef: '4' },
    { id: 4, matricule: 'ELE004', nom: 'Bernard', prenom: 'Sophie', note1: '', note2: '', note3: '', coef: '4' },
    { id: 5, matricule: 'ELE005', nom: 'Dubois', prenom: 'Luc', note1: '', note2: '', note3: '', coef: '4' }
  ].map(row => calculateDerivedValues(row)), [calculateDerivedValues])

  const [data, setData] = useState(initialData)

  // Supprimer une ligne
  const handleDeleteRow = useCallback((id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette ligne?')) {
      setData(prevData => prevData.filter(row => row.id !== id))
      toast.success('Ligne supprimée')
    }
  }, [])

  // Définir les colonnes avec référence à handleDeleteRow
  const columns = useMemo(() => [
    { key: 'id', name: 'ID', width: 60, frozen: true, resizable: true },
    { key: 'matricule', name: 'Matricule', width: 120, frozen: true, resizable: true },
    { key: 'nom', name: 'Nom', width: 150, frozen: true, resizable: true },
    { key: 'prenom', name: 'Prénom', width: 150, frozen: true, resizable: true },
    { 
      key: 'note1', 
      name: 'Note 1', 
      width: 100, 
      editable: true, 
      resizable: true,
      editor: ({ row, onRowUpdate, rowIdx }) => (
        <input
          type="number"
          className="form-control"
          value={row.note1 || ''}
          onChange={(e) => {
            onRowUpdate(rowIdx, { ...row, note1: e.target.value })
          }}
          style={{ width: '100%', border: 'none', padding: '0.5rem' }}
          autoFocus
        />
      )
    },
    { 
      key: 'note2', 
      name: 'Note 2', 
      width: 100, 
      editable: true,
      resizable: true,
      editor: ({ row, onRowUpdate, rowIdx }) => (
        <input
          type="number"
          className="form-control"
          value={row.note2 || ''}
          onChange={(e) => {
            onRowUpdate(rowIdx, { ...row, note2: e.target.value })
          }}
          style={{ width: '100%', border: 'none', padding: '0.5rem' }}
          autoFocus
        />
      )
    },
    { 
      key: 'note3', 
      name: 'Note 3', 
      width: 100, 
      editable: true,
      resizable: true,
      editor: ({ row, onRowUpdate, rowIdx }) => (
        <input
          type="number"
          className="form-control"
          value={row.note3 || ''}
          onChange={(e) => {
            onRowUpdate(rowIdx, { ...row, note3: e.target.value })
          }}
          style={{ width: '100%', border: 'none', padding: '0.5rem' }}
          autoFocus
        />
      )
    },
    { 
      key: 'moyenne', 
      name: 'Moyenne', 
      width: 120, 
      editable: false,
      resizable: true,
      formatter: ({ row }) => (
        <div style={{ textAlign: 'center', fontWeight: '600', padding: '0.5rem' }}>
          {row.moyenne || '0.00'}
        </div>
      )
    },
    { 
      key: 'coef', 
      name: 'Coefficient', 
      width: 120, 
      editable: true,
      resizable: true,
      editor: ({ row, onRowUpdate, rowIdx }) => (
        <input
          type="number"
          className="form-control"
          value={row.coef || '4'}
          onChange={(e) => {
            onRowUpdate(rowIdx, { ...row, coef: e.target.value })
          }}
          style={{ width: '100%', border: 'none', padding: '0.5rem' }}
          autoFocus
        />
      )
    },
    { 
      key: 'note_finale', 
      name: 'Note Finale', 
      width: 120, 
      editable: false,
      resizable: true,
      formatter: ({ row }) => {
        const noteFinale = parseFloat(row.note_finale) || 0
        return (
          <div style={{ 
            textAlign: 'center', 
            fontWeight: '600', 
            color: noteFinale >= 10 ? '#00A859' : '#CE1126',
            padding: '0.5rem'
          }}>
            {row.note_finale || '0.00'}
          </div>
        )
      }
    },
    { 
      key: 'mention', 
      name: 'Mention', 
      width: 120, 
      editable: false,
      resizable: true,
      formatter: ({ row }) => (
        <div style={{ 
          textAlign: 'center', 
          fontWeight: '600', 
          color: row.mentionColor || '#6c757d',
          padding: '0.5rem'
        }}>
          {row.mention || '-'}
        </div>
      )
    },
    {
      key: 'actions',
      name: 'Actions',
      width: 100,
      frozen: false,
      resizable: true,
      formatter: ({ row }) => (
        <div className="d-flex gap-1 justify-content-center" style={{ padding: '0.5rem' }}>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={(e) => {
              e.stopPropagation()
              handleDeleteRow(row.id)
            }}
            title="Supprimer"
          >
            <FaTrash />
          </button>
        </div>
      )
    }
  ], [handleDeleteRow])

  // Gérer les changements de lignes (API v6)
  const handleRowsUpdate = useCallback(({ fromRow, toRow, updated }) => {
    setData(prevData => {
      const newData = [...prevData]
      for (let i = fromRow; i <= toRow; i++) {
        newData[i] = { ...newData[i], ...updated }
      }
      return newData.map(row => calculateDerivedValues(row))
    })
  }, [calculateDerivedValues])

  // Row getter pour l'API v6
  const rowGetter = useCallback((i) => {
    return data[i]
  }, [data])

  // Importer depuis Excel
  const handleImportExcel = useCallback((event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, { type: 'binary' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

        // Convertir les données Excel en format de grille
        if (jsonData.length > 1) {
          const headers = jsonData[0]
          const rows = jsonData.slice(1).map((row, index) => {
            const rowData = { id: index + 1 }
            headers.forEach((header, colIndex) => {
              const key = header.toLowerCase().replace(/\s+/g, '_')
              rowData[key] = row[colIndex] || ''
            })
            return calculateDerivedValues(rowData)
          })
          setData(rows)
          toast.success('Fichier Excel importé avec succès!')
        }
      } catch (error) {
        toast.error('Erreur lors de l\'importation du fichier Excel')
        console.error(error)
      }
    }
    reader.readAsBinaryString(file)
  }, [calculateDerivedValues])

  // Exporter vers Excel
  const handleExportExcel = useCallback(() => {
    // Préparer les données pour l'export
    const exportData = data.map(row => ({
      'ID': row.id,
      'Matricule': row.matricule,
      'Nom': row.nom,
      'Prénom': row.prenom,
      'Note 1': row.note1 || '',
      'Note 2': row.note2 || '',
      'Note 3': row.note3 || '',
      'Moyenne': row.moyenne || '0.00',
      'Coefficient': row.coef || '1',
      'Note Finale': row.note_finale || '0.00',
      'Mention': getMention(parseFloat(row.moyenne) || 0)
    }))

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Notes')
    
    // Ajuster la largeur des colonnes
    const colWidths = [
      { wch: 5 },  // ID
      { wch: 12 }, // Matricule
      { wch: 15 }, // Nom
      { wch: 15 }, // Prénom
      { wch: 10 }, // Note 1
      { wch: 10 }, // Note 2
      { wch: 10 }, // Note 3
      { wch: 12 }, // Moyenne
      { wch: 12 }, // Coefficient
      { wch: 12 }, // Note Finale
      { wch: 12 }  // Mention
    ]
    worksheet['!cols'] = colWidths

    XLSX.writeFile(workbook, `Notes_${new Date().toISOString().split('T')[0]}.xlsx`)
    toast.success('Fichier Excel exporté avec succès!')
  }, [data])

  const getMention = (moyenne) => {
    if (moyenne >= 16) return 'Excellent'
    if (moyenne >= 14) return 'Très bien'
    if (moyenne >= 12) return 'Bien'
    if (moyenne >= 10) return 'Assez bien'
    return 'Insuffisant'
  }

  // Calculer les statistiques
  const statistics = useMemo(() => {
    const notes = data.map(row => parseFloat(row.moyenne) || 0)
    const validNotes = notes.filter(n => n > 0)
    const moyenneGenerale = validNotes.length > 0
      ? (validNotes.reduce((sum, n) => sum + n, 0) / validNotes.length).toFixed(2)
      : '0.00'
    const maxNote = validNotes.length > 0 ? Math.max(...validNotes).toFixed(2) : '0.00'
    const minNote = validNotes.length > 0 ? Math.min(...validNotes).toFixed(2) : '0.00'
    const admis = validNotes.filter(n => n >= 10).length
    const tauxReussite = validNotes.length > 0 ? ((admis / validNotes.length) * 100).toFixed(1) : '0.0'

    return {
      moyenneGenerale,
      maxNote,
      minNote,
      total: validNotes.length,
      admis,
      tauxReussite
    }
  }, [data])

  // Ajouter une nouvelle ligne
  const handleAddRow = () => {
    const newId = Math.max(...data.map(r => r.id), 0) + 1
    const newRow = {
      id: newId,
      matricule: `ELE${String(newId).padStart(3, '0')}`,
      nom: '',
      prenom: '',
      note1: '',
      note2: '',
      note3: '',
      coef: '4'
    }
    setData([...data, calculateDerivedValues(newRow)])
    toast.success('Nouvelle ligne ajoutée')
  }


  // Sauvegarder les données
  const handleSave = () => {
    // Ici, vous pouvez envoyer les données au backend
    toast.success('Notes sauvegardées avec succès!')
  }


  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Gestion des Notes - Tableur Excel</h2>
        <div className="d-flex gap-2">
          <label className="btn btn-outline-primary">
            <FaUpload className="me-2" />
            Importer Excel
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleImportExcel}
              style={{ display: 'none' }}
            />
          </label>
          <Button variant="success" onClick={handleExportExcel} icon={<FaDownload />}>
            Exporter Excel
          </Button>
          <Button variant="primary" onClick={handleAddRow}>
            + Ajouter ligne
          </Button>
          <Button variant="primary" onClick={handleSave} icon={<FaSave />}>
            Sauvegarder
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="row mb-4">
        <div className="col-md-2">
          <Card className="text-center">
            <h6 className="text-muted mb-2">Moyenne Générale</h6>
            <h4 className="mb-0" style={{ color: '#FFD700' }}>{statistics.moyenneGenerale}</h4>
          </Card>
        </div>
        <div className="col-md-2">
          <Card className="text-center">
            <h6 className="text-muted mb-2">Note Max</h6>
            <h4 className="mb-0" style={{ color: '#00A859' }}>{statistics.maxNote}</h4>
          </Card>
        </div>
        <div className="col-md-2">
          <Card className="text-center">
            <h6 className="text-muted mb-2">Note Min</h6>
            <h4 className="mb-0" style={{ color: '#CE1126' }}>{statistics.minNote}</h4>
          </Card>
        </div>
        <div className="col-md-2">
          <Card className="text-center">
            <h6 className="text-muted mb-2">Total Élèves</h6>
            <h4 className="mb-0">{statistics.total}</h4>
          </Card>
        </div>
        <div className="col-md-2">
          <Card className="text-center">
            <h6 className="text-muted mb-2">Admis</h6>
            <h4 className="mb-0" style={{ color: '#00A859' }}>{statistics.admis}</h4>
          </Card>
        </div>
        <div className="col-md-2">
          <Card className="text-center">
            <h6 className="text-muted mb-2">Taux Réussite</h6>
            <h4 className="mb-0" style={{ color: '#FFD700' }}>{statistics.tauxReussite}%</h4>
          </Card>
        </div>
      </div>

      {/* Grille de données */}
      <Card>
        <div style={{ height: '600px' }}>
          <DataGrid
            columns={columns}
            rowGetter={rowGetter}
            rowsCount={data.length}
            onRowsUpdate={handleRowsUpdate}
            enableCellSelect={true}
            minHeight={600}
            className="rdg-light fill-grid"
          />
        </div>
      </Card>

      {/* Instructions */}
      <Card className="mt-4" title="Instructions">
        <div className="row">
          <div className="col-md-6">
            <h6>Fonctionnalités Excel disponibles :</h6>
            <ul>
              <li><strong>Édition inline :</strong> Double-cliquez sur une cellule pour modifier</li>
              <li><strong>Calcul automatique :</strong> La moyenne est calculée automatiquement</li>
              <li><strong>Formules :</strong> Moyenne = (Note1 + Note2 + Note3) / 3</li>
              <li><strong>Note finale :</strong> Moyenne × Coefficient</li>
              <li><strong>Mention :</strong> Calculée automatiquement selon la moyenne</li>
            </ul>
          </div>
          <div className="col-md-6">
            <h6>Import/Export :</h6>
            <ul>
              <li><strong>Importer :</strong> Cliquez sur "Importer Excel" pour charger un fichier</li>
              <li><strong>Exporter :</strong> Cliquez sur "Exporter Excel" pour télécharger</li>
              <li><strong>Format :</strong> Les fichiers doivent être en format .xlsx ou .xls</li>
              <li><strong>Sauvegarde :</strong> Utilisez "Sauvegarder" pour enregistrer dans la base de données</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default NotesExcel

