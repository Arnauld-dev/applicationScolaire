import axios from 'axios'
import { toast } from 'react-toastify'

// Configuration de base d'Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Intercepteur pour les requêtes
api.interceptors.request.use(
  (config) => {
    // Ajouter le token d'authentification si disponible
    const user = localStorage.getItem('user')
    if (user) {
      try {
        const userData = JSON.parse(user)
        if (userData.token) {
          config.headers.Authorization = `Bearer ${userData.token}`
        }
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      // Erreur de réponse du serveur
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          // Non autorisé - rediriger vers la page de connexion
          localStorage.removeItem('user')
          window.location.href = '/login'
          toast.error('Session expirée. Veuillez vous reconnecter.')
          break
        case 403:
          toast.error('Accès refusé')
          break
        case 404:
          toast.error('Ressource non trouvée')
          break
        case 500:
          toast.error('Erreur serveur. Veuillez réessayer plus tard.')
          break
        default:
          toast.error(data?.message || 'Une erreur est survenue')
      }
    } else if (error.request) {
      // La requête a été faite mais aucune réponse n'a été reçue
      toast.error('Impossible de contacter le serveur. Vérifiez votre connexion.')
    } else {
      // Erreur lors de la configuration de la requête
      toast.error('Erreur de configuration de la requête')
    }
    
    return Promise.reject(error)
  }
)

// Fonctions API pour l'authentification
export const authAPI = {
  login: async (email, password, role) => {
    // En mode développement, on simule une réponse
    // À remplacer par un vrai appel API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            user: {
              id: 1,
              email,
              role,
              nom: 'Test',
              prenom: 'User'
            },
            token: 'mock-token-123'
          }
        })
      }, 500)
    })
  },
  
  logout: async () => {
    // Nettoyer le token côté serveur si nécessaire
    return Promise.resolve()
  },
  
  forgotPassword: async (email) => {
    // Simulation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: 'Email envoyé' } })
      }, 1000)
    })
  }
}

// Fonctions API pour les élèves
export const eleveAPI = {
  getProfil: async (id) => {
    // Simulation
    return Promise.resolve({ data: {} })
  },
  
  getNotes: async (id) => {
    // Simulation
    return Promise.resolve({ data: [] })
  },
  
  getDevoirs: async (id) => {
    // Simulation
    return Promise.resolve({ data: [] })
  },
  
  getPaiements: async (id) => {
    // Simulation
    return Promise.resolve({ data: [] })
  }
}

// Fonctions API pour les enseignants
export const enseignantAPI = {
  getClasses: async (id) => {
    // Simulation
    return Promise.resolve({ data: [] })
  },
  
  getEleves: async (classeId) => {
    // Simulation
    return Promise.resolve({ data: [] })
  },
  
  addNote: async (noteData) => {
    // Simulation
    return Promise.resolve({ data: noteData })
  },
  
  addDevoir: async (devoirData) => {
    // Simulation
    return Promise.resolve({ data: devoirData })
  }
}

// Fonctions API pour l'administration
export const adminAPI = {
  getUtilisateurs: async () => {
    // Simulation
    return Promise.resolve({ data: [] })
  },
  
  createUtilisateur: async (userData) => {
    // Simulation
    return Promise.resolve({ data: userData })
  },
  
  updateUtilisateur: async (id, userData) => {
    // Simulation
    return Promise.resolve({ data: userData })
  },
  
  deleteUtilisateur: async (id) => {
    // Simulation
    return Promise.resolve({ data: { success: true } })
  }
}

export default api

