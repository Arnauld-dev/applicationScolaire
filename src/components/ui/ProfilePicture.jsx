import React, { useState, useRef, useEffect } from 'react'
import { FaUser, FaCamera, FaTimes, FaSearchPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'
import ProfilePictureZoom from './ProfilePictureZoom'

const ProfilePicture = ({
  user,
  size = 100,
  editable = false,
  onImageChange,
  className = '',
  showBorder = true,
  zoomable = true
}) => {
  const [imagePreview, setImagePreview] = useState(user?.photo || null)
  const [isHovered, setIsHovered] = useState(false)
  const [showZoom, setShowZoom] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    setImagePreview(user?.photo || null)
  }, [user?.photo])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('La photo ne doit pas dépasser 5MB')
        return
      }

      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        toast.error('Veuillez sélectionner une image')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        setImagePreview(base64String)
        
        // Sauvegarder dans localStorage
        if (user) {
          const updatedUser = { ...user, photo: base64String }
          localStorage.setItem('user', JSON.stringify(updatedUser))
        }

        // Appeler le callback si fourni
        if (onImageChange) {
          onImageChange(base64String)
        }

        toast.success('Photo de profil mise à jour')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = (e) => {
    e.stopPropagation()
    setImagePreview(null)
    
    if (user) {
      const updatedUser = { ...user }
      delete updatedUser.photo
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }

    if (onImageChange) {
      onImageChange(null)
    }

    toast.success('Photo de profil supprimée')
  }

  const handleClick = (e) => {
    // Double-clic pour zoomer
    if (e.detail === 2 && zoomable && imagePreview) {
      setShowZoom(true)
      return
    }
    
    // Simple clic pour éditer
    if (editable && fileInputRef.current && e.detail === 1) {
      // Petit délai pour distinguer le double-clic
      setTimeout(() => {
        if (fileInputRef.current) {
          fileInputRef.current.click()
        }
      }, 200)
    }
  }

  const handleImageClick = (e) => {
    e.stopPropagation()
    if (zoomable && imagePreview) {
      setShowZoom(true)
    }
  }

  const getInitials = () => {
    if (user?.prenom && user?.nom) {
      return `${user.prenom.charAt(0)}${user.nom.charAt(0)}`.toUpperCase()
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase()
    }
    return 'U'
  }

  const getBackgroundColor = () => {
    if (user?.role === 'eleve') {
      return 'linear-gradient(135deg, #FFD700 0%, #FCDD09 100%)'
    }
    if (user?.role === 'enseignant') {
      return 'linear-gradient(135deg, #00A859 0%, #008A4A 100%)'
    }
    if (user?.role === 'admin') {
      return 'linear-gradient(135deg, #CE1126 0%, #B00E20 100%)'
    }
    return 'linear-gradient(135deg, #6c757d 0%, #5a6268 100%)'
  }

  return (
    <div
      className={`profile-picture-container position-relative ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        cursor: editable ? 'pointer' : (zoomable && imagePreview ? 'pointer' : 'default')
      }}
      onMouseEnter={() => editable && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />

      {imagePreview ? (
        <img
          src={imagePreview}
          alt={`${user?.prenom || ''} ${user?.nom || ''}`}
          className="rounded-circle"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            border: showBorder ? `4px solid ${user?.role === 'eleve' ? '#FFD700' : user?.role === 'enseignant' ? '#00A859' : '#CE1126'}` : 'none',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease',
            cursor: zoomable ? 'pointer' : 'default'
          }}
          onClick={handleImageClick}
          title={zoomable ? 'Double-cliquez pour zoomer' : ''}
        />
      ) : (
        <div
          className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
          style={{
            width: '100%',
            height: '100%',
            background: getBackgroundColor(),
            fontSize: `${size * 0.4}px`,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            border: showBorder ? '4px solid rgba(255, 255, 255, 0.3)' : 'none'
          }}
        >
          {getInitials()}
        </div>
      )}

      {editable && (
        <>
          {isHovered && (
            <div
              className="position-absolute top-0 start-0 w-100 h-100 rounded-circle d-flex align-items-center justify-content-center"
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                transition: 'opacity 0.3s ease'
              }}
            >
              {imagePreview ? (
                <FaTimes
                  size={size * 0.3}
                  className="text-white"
                  onClick={handleRemoveImage}
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <FaCamera
                  size={size * 0.3}
                  className="text-white"
                />
              )}
            </div>
          )}
          {!isHovered && imagePreview && (
            <>
              <div
                className="position-absolute bottom-0 end-0 rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: `${size * 0.3}px`,
                  height: `${size * 0.3}px`,
                  background: 'linear-gradient(135deg, #FFD700 0%, #FCDD09 100%)',
                  border: '3px solid white',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  if (fileInputRef.current) {
                    fileInputRef.current.click()
                  }
                }}
                title="Modifier la photo"
              >
                <FaCamera size={size * 0.15} className="text-dark" />
              </div>
              {zoomable && (
                <div
                  className="position-absolute top-0 end-0 rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: `${size * 0.3}px`,
                    height: `${size * 0.3}px`,
                    background: 'linear-gradient(135deg, #00A859 0%, #008A4A 100%)',
                    border: '3px solid white',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease'
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowZoom(true)
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  title="Zoomer la photo"
                >
                  <FaSearchPlus size={size * 0.15} className="text-white" />
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Modal de zoom */}
      {zoomable && (
        <ProfilePictureZoom
          isOpen={showZoom}
          onClose={() => setShowZoom(false)}
          imageSrc={imagePreview}
          userName={user?.prenom && user?.nom ? `${user.prenom}-${user.nom}` : undefined}
        />
      )}
    </div>
  )
}

export default ProfilePicture

