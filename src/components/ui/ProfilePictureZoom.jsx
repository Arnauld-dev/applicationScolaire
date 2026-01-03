import React, { useState, useRef, useEffect } from 'react'
import { FaTimes, FaSearchPlus, FaSearchMinus, FaUndo, FaDownload } from 'react-icons/fa'
import { toast } from 'react-toastify'

const ProfilePictureZoom = ({ isOpen, onClose, imageSrc, userName }) => {
  const [zoom, setZoom] = useState(100)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const imageRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setZoom(100)
      setPosition({ x: 0, y: 0 })
      document.body.style.overflow = 'hidden'
      
      // Gérer la touche ESC
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }
      
      window.addEventListener('keydown', handleEscape)
      
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleEscape)
      }
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 500))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50))
  }

  const handleReset = () => {
    setZoom(100)
    setPosition({ x: 0, y: 0 })
  }

  const handleWheel = (e) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -10 : 10
    setZoom(prev => Math.max(50, Math.min(500, prev + delta)))
  }

  const handleMouseDown = (e) => {
    if (zoom > 100) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      })
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging && zoom > 100) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleDownload = () => {
    if (imageSrc) {
      const link = document.createElement('a')
      link.href = imageSrc
      const fileName = userName 
        ? `photo-profil-${userName}.png`
        : 'photo-profil.png'
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast.success('Photo de profil téléchargée')
    }
  }

  if (!isOpen || !imageSrc) return null

  return (
    <div
      className="profile-zoom-modal"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: zoom > 100 ? (isDragging ? 'grabbing' : 'grab') : 'default'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Contrôles en haut */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '10px 20px',
          borderRadius: '25px',
          zIndex: 10000
        }}
      >
        <button
          onClick={handleZoomOut}
          disabled={zoom <= 50}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '8px',
            cursor: zoom <= 50 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (zoom > 50) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
          }}
          title="Zoom arrière"
        >
          <FaSearchMinus />
        </button>

        <span
          style={{
            color: 'white',
            minWidth: '60px',
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          {zoom}%
        </span>

        <button
          onClick={handleZoomIn}
          disabled={zoom >= 500}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '8px',
            cursor: zoom >= 500 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (zoom < 500) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
          }}
          title="Zoom avant"
        >
          <FaSearchPlus />
        </button>

        <div
          style={{
            width: '1px',
            height: '20px',
            background: 'rgba(255, 255, 255, 0.3)',
            margin: '0 5px'
          }}
        />

        <button
          onClick={handleReset}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
          }}
          title="Réinitialiser"
        >
          <FaUndo />
        </button>

        <div
          style={{
            width: '1px',
            height: '20px',
            background: 'rgba(255, 255, 255, 0.3)',
            margin: '0 5px'
          }}
        />

        <button
          onClick={handleDownload}
          style={{
            background: 'linear-gradient(135deg, #00A859 0%, #008A4A 100%)',
            border: 'none',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
          title="Télécharger"
        >
          <FaDownload />
        </button>
      </div>

      {/* Bouton fermer */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          color: 'white',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          transition: 'all 0.2s ease',
          zIndex: 10000
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(220, 53, 69, 0.8)'
          e.currentTarget.style.transform = 'rotate(90deg)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
          e.currentTarget.style.transform = 'rotate(0deg)'
        }}
        title="Fermer (ESC)"
      >
        <FaTimes />
      </button>

      {/* Image avec zoom */}
      <div
        ref={containerRef}
        style={{
          width: '90%',
          height: '90%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative'
        }}
        onMouseDown={handleMouseDown}
      >
        <img
          ref={imageRef}
          src={imageSrc}
          alt={userName || 'Photo de profil'}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            transform: `scale(${zoom / 100}) translate(${position.x / (zoom / 100)}px, ${position.y / (zoom / 100)}px)`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
            userSelect: 'none',
            pointerEvents: 'none'
          }}
          draggable={false}
        />
      </div>

      {/* Instructions en bas */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '14px',
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '8px 16px',
          borderRadius: '20px'
        }}
      >
        {zoom > 100 ? (
          <span>Glissez pour déplacer • Molette pour zoomer • ESC pour fermer</span>
        ) : (
          <span>Double-cliquez ou utilisez les boutons pour zoomer • ESC pour fermer</span>
        )}
      </div>
    </div>
  )
}

export default ProfilePictureZoom

