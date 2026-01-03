import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import Card from '../../components/ui/Card'
import ProfilePicture from '../../components/ui/ProfilePicture'
import { FaEnvelope, FaIdCard, FaChalkboardTeacher, FaPhone, FaBook } from 'react-icons/fa'

const ProfilEnseignant = () => {
  const { user, setUser } = useAuth()
  const [currentUser, setCurrentUser] = useState(user)

  useEffect(() => {
    // Mettre à jour l'utilisateur depuis localStorage si la photo a changé
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setCurrentUser(userData)
        if (setUser) {
          setUser(userData)
        }
      } catch (error) {
        console.error('Error parsing stored user:', error)
      }
    }
  }, [])

  const handleImageChange = (newPhoto) => {
    const updatedUser = { ...currentUser, photo: newPhoto }
    setCurrentUser(updatedUser)
    if (setUser) {
      setUser(updatedUser)
    }
  }

  return (
    <div>
      <h2 className="mb-4">Mon Profil</h2>

      <div className="row">
        <div className="col-md-4 mb-4">
          <Card className="text-center p-4">
            <div className="mb-4 d-flex justify-content-center">
              <ProfilePicture 
                user={currentUser || user} 
                size={150} 
                editable={true}
                onImageChange={handleImageChange}
                showBorder={true}
              />
            </div>
            <h4 className="mb-2">{user?.prenom} {user?.nom}</h4>
            <p className="text-muted mb-3">Enseignant</p>
            <p className="small text-muted mb-0">
              Cliquez sur la photo pour la modifier
            </p>
          </Card>
        </div>

        <div className="col-md-8">
          <Card title="Informations personnelles">
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center mb-2">
                  <FaIdCard className="text-primary me-2" />
                  <strong>ID Enseignant:</strong>
                </div>
                <p className="ms-4 mb-0">{user?.id || 'N/A'}</p>
              </div>

              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center mb-2">
                  <FaChalkboardTeacher className="text-primary me-2" />
                  <strong>Matières:</strong>
                </div>
                <p className="ms-4 mb-0">
                  {user?.matieres ? user.matieres.join(', ') : 'Non assignées'}
                </p>
              </div>

              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center mb-2">
                  <FaEnvelope className="text-primary me-2" />
                  <strong>Email:</strong>
                </div>
                <p className="ms-4 mb-0">{user?.email || 'N/A'}</p>
              </div>

              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center mb-2">
                  <FaPhone className="text-primary me-2" />
                  <strong>Téléphone:</strong>
                </div>
                <p className="ms-4 mb-0">+257 XX XX XX XX</p>
              </div>
            </div>
          </Card>

          <Card title="Informations professionnelles" className="mt-4">
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center mb-2">
                  <FaBook className="text-primary me-2" />
                  <strong>Statut:</strong>
                </div>
                <p className="ms-4 mb-0">Actif</p>
              </div>
              <div className="col-md-6 mb-3">
                <strong>Année scolaire:</strong>
                <p className="text-muted mb-0">2026-2027</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ProfilEnseignant

