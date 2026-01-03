export const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

export const formatDateTime = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const calculateMoyenne = (notes) => {
  if (!notes || notes.length === 0) return 0
  const sum = notes.reduce((acc, note) => acc + parseFloat(note.valeur || 0), 0)
  return (sum / notes.length).toFixed(2)
}

export const getStatutNote = (note) => {
  const valeur = parseFloat(note)
  if (valeur >= 16) return { text: 'Excellent', class: 'text-success' }
  if (valeur >= 14) return { text: 'Très bien', class: 'text-success' }
  if (valeur >= 12) return { text: 'Bien', class: 'text-info' }
  if (valeur >= 10) return { text: 'Assez bien', class: 'text-warning' }
  return { text: 'Insuffisant', class: 'text-danger' }
}

export const getStatutPaiement = (montantPaye, montantTotal) => {
  const pourcentage = (montantPaye / montantTotal) * 100
  if (pourcentage === 100) return { text: 'Payé', class: 'badge bg-success' }
  if (pourcentage >= 50) return { text: 'Partiel', class: 'badge bg-warning' }
  return { text: 'En attente', class: 'badge bg-danger' }
}

export const getStatutDevoir = (dateLimite) => {
  if (!dateLimite) return { text: 'Sans limite', class: 'badge bg-secondary' }
  const maintenant = new Date()
  const limite = new Date(dateLimite)
  const diff = limite - maintenant
  const jours = Math.ceil(diff / (1000 * 60 * 60 * 24))
  
  if (jours < 0) return { text: 'En retard', class: 'badge bg-danger' }
  if (jours <= 2) return { text: 'Urgent', class: 'badge bg-warning' }
  return { text: 'En cours', class: 'badge bg-info' }
}

