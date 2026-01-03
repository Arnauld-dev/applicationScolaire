// Données mockées pour le développement

export const mockEleves = [
  {
    id: 1,
    nom: 'Pierre',
    prenom: 'Jean',
    email: 'jean.pierre@example.com',
    matricule: 'ELE001',
    classe: '4e Math',
    telephone: '+257 79 123 456',
    dateNaissance: '2008-05-15',
    statut: 'Actif'
  },
  {
    id: 2,
    nom: 'Martin',
    prenom: 'Marie',
    email: 'marie.martin@example.com',
    matricule: 'ELE002',
    classe: '4e Math',
    telephone: '+257 79 234 567',
    dateNaissance: '2008-07-20',
    statut: 'Actif'
  },
  {
    id: 3,
    nom: 'Durand',
    prenom: 'Paul',
    email: 'paul.durand@example.com',
    matricule: 'ELE003',
    classe: '5e Math',
    telephone: '+257 79 345 678',
    dateNaissance: '2007-03-10',
    statut: 'Actif'
  }
]

export const mockEnseignants = [
  {
    id: 1,
    nom: 'Dupont',
    prenom: 'Marie',
    email: 'marie.dupont@example.com',
    matieres: ['Mathématiques', 'Physique'],
    telephone: '+257 79 111 222',
    statut: 'Actif'
  },
  {
    id: 2,
    nom: 'Bernard',
    prenom: 'Jean',
    email: 'jean.bernard@example.com',
    matieres: ['Français', 'Histoire'],
    telephone: '+257 79 222 333',
    statut: 'Actif'
  }
]

export const mockClasses = [
  {
    id: 1,
    nom: '4e Math',
    niveau: '4e',
    effectif: 25,
    enseignant: 'M. Dupont',
    salle: 'A101'
  },
  {
    id: 2,
    nom: '5e Math',
    niveau: '5e',
    effectif: 28,
    enseignant: 'M. Dupont',
    salle: 'A102'
  },
  {
    id: 3,
    nom: '6e Physique',
    niveau: '6e',
    effectif: 22,
    enseignant: 'M. Durand',
    salle: 'Lab1'
  }
]

export const mockMatieres = [
  { id: 1, nom: 'Mathématiques', coef: 4, enseignant: 'M. Dupont' },
  { id: 2, nom: 'Français', coef: 3, enseignant: 'Mme Martin' },
  { id: 3, nom: 'Physique', coef: 3, enseignant: 'M. Durand' },
  { id: 4, nom: 'Chimie', coef: 2, enseignant: 'Mme Bernard' },
  { id: 5, nom: 'Anglais', coef: 2, enseignant: 'Mme Johnson' },
  { id: 6, nom: 'Histoire', coef: 2, enseignant: 'M. Petit' }
]

export const mockNotes = [
  { id: 1, eleveId: 1, matiere: 'Mathématiques', note: 78, coef: 4, date: '2026-09-15' },
  { id: 2, eleveId: 1, matiere: 'Français', note: 65, coef: 3, date: '2026-09-12' },
  { id: 3, eleveId: 1, matiere: 'Physique', note: 82, coef: 3, date: '2026-09-10' },
  { id: 4, eleveId: 2, matiere: 'Mathématiques', note: 85, coef: 4, date: '2026-09-15' },
  { id: 5, eleveId: 2, matiere: 'Français', note: 72, coef: 3, date: '2026-09-12' }
]

export const mockDevoirs = [
  {
    id: 1,
    matiere: 'Mathématiques',
    titre: 'Exercices sur les fonctions',
    description: 'Faire les exercices 1 à 10 page 45',
    dateLimite: '2026-09-20',
    classe: '4e Math',
    statut: 'en_cours'
  },
  {
    id: 2,
    matiere: 'Français',
    titre: 'Rédaction sur le thème de la paix',
    description: 'Rédiger une composition de 300 mots',
    dateLimite: '2026-09-18',
    classe: '4e Math',
    statut: 'urgent'
  }
]

export const mockPaiements = [
  {
    id: 1,
    eleveId: 1,
    type: 'Frais de scolarité',
    montantTotal: 200000,
    montantPaye: 200000,
    dateEcheance: '2026-09-01',
    datePaiement: '2026-08-25',
    statut: 'paye'
  },
  {
    id: 2,
    eleveId: 1,
    type: 'Frais d\'inscription',
    montantTotal: 50000,
    montantPaye: 50000,
    dateEcheance: '2026-08-15',
    datePaiement: '2026-08-10',
    statut: 'paye'
  },
  {
    id: 3,
    eleveId: 1,
    type: 'Frais de cantine',
    montantTotal: 150000,
    montantPaye: 75000,
    dateEcheance: '2026-10-01',
    datePaiement: null,
    statut: 'partiel'
  }
]

export const mockAnnonces = [
  {
    id: 1,
    titre: 'Rentrée scolaire',
    contenu: 'La rentrée est prévue le 10 septembre 2026',
    date: '2026-09-10',
    type: 'Officielle',
    classe: 'Toutes classes',
    auteur: 'Administration'
  },
  {
    id: 2,
    titre: 'Réunion parents',
    contenu: 'Réunion des parents d\'élèves le 15 septembre',
    date: '2026-09-08',
    type: 'Information',
    classe: 'Toutes classes',
    auteur: 'Administration'
  }
]

export const mockFrais = [
  {
    id: 1,
    type: 'Frais de scolarité',
    montant: 200000,
    classe: 'Toutes',
    dateEcheance: '2026-09-01'
  },
  {
    id: 2,
    type: 'Frais d\'inscription',
    montant: 50000,
    classe: 'Toutes',
    dateEcheance: '2026-08-15'
  },
  {
    id: 3,
    type: 'Frais de cantine',
    montant: 150000,
    classe: 'Toutes',
    dateEcheance: '2026-10-01'
  }
]

