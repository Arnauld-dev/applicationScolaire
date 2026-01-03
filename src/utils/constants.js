export const ROLES = {
  ELEVE: 'eleve',
  ENSEIGNANT: 'enseignant',
  ADMIN: 'admin'
}

export const ROUTES = {
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/',
  // Élève
  ELEVE_PROFIL: '/eleve/profil',
  ELEVE_EMPLOI_DU_TEMPS: '/eleve/emploi-du-temps',
  ELEVE_NOTES: '/eleve/notes',
  ELEVE_DEVOIRS: '/eleve/devoirs',
  ELEVE_BULLETINS: '/eleve/bulletins',
  ELEVE_PAIEMENTS: '/eleve/paiements',
  // Enseignant
  ENSEIGNANT_CLASSES: '/enseignant/classes',
  ENSEIGNANT_ELEVES: '/enseignant/eleves',
  ENSEIGNANT_NOTES: '/enseignant/notes',
  ENSEIGNANT_DEVOIRS: '/enseignant/devoirs',
  ENSEIGNANT_ANNONCES: '/enseignant/annonces',
  // Admin
  ADMIN_UTILISATEURS: '/admin/utilisateurs',
  ADMIN_ACADEMIQUE: '/admin/academique',
  ADMIN_FINANCIERE: '/admin/financiere',
  ADMIN_ANNONCES: '/admin/annonces'
}

export const JOURS_SEMAINE = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi'
]

export const HEURES_COURS = [
  '08:00 - 09:00',
  '09:00 - 10:00',
  '10:15 - 11:15',
  '11:15 - 12:15',
  '14:00 - 15:00',
  '15:00 - 16:00'
]

