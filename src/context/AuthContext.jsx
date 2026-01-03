import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté (localStorage)
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password, role) => {
    setLoading(true)
    try {
      // Simulation d'appel API - à remplacer par un vrai appel
      // Pour l'instant, on utilise des données mockées
      // En mode développement, on simule une connexion réussie
      // avec des données mockées basées sur le rôle
      const mockUsers = {
        eleve: {
          id: 1,
          email: 'jean.pierre@example.com',
          nom: 'Jean Pierre',
          prenom: 'Jean',
          role: 'eleve',
          classe: '4e Math',
          matricule: 'ELE001'
        },
        enseignant: {
          id: 2,
          email: 'prof@example.com',
          nom: 'Dupont',
          prenom: 'Marie',
          role: 'enseignant',
          matieres: ['Mathématiques', 'Physique']
        },
        admin: {
          id: 3,
          email: 'admin@example.com',
          nom: 'Admin',
          prenom: 'Système',
          role: 'admin'
        }
      }

      // Simuler un délai de réponse
      await new Promise(resolve => setTimeout(resolve, 500))

      const userData = mockUsers[role] || null

      if (userData && email.includes('@')) {
        setUser(userData)
        setIsAuthenticated(true)
        localStorage.setItem('user', JSON.stringify(userData))
        setLoading(false)
        return { success: true, user: userData }
      } else {
        setLoading(false)
        return { success: false, error: 'Identifiants incorrects' }
      }
    } catch (error) {
      setLoading(false)
      return { success: false, error: 'Erreur de connexion' }
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    setUser,
    isAuthenticated,
    loading,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

