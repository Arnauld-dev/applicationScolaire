import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa'
import Button from '../ui/Button'
import ProfilePicture from '../ui/ProfilePicture'

const Navbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const getRoleLabel = (role) => {
    const labels = {
      eleve: 'Élève',
      enseignant: 'Enseignant',
      admin: 'Administration'
    }
    return labels[role] || role
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
      <div className="container-fluid">
        <button
          className="btn btn-link d-lg-none"
          onClick={onToggleSidebar}
          type="button"
        >
          <FaBars />
        </button>
        <Link to="/home" className="navbar-brand ms-2" style={{ 
          background: 'linear-gradient(135deg, #FFD700 0%, #FCDD09 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textDecoration: 'none'
        }}>
          <strong>Petit Séminaire de Mugera</strong>
        </Link>

        <div className="ms-auto d-flex align-items-center">
          <div className="dropdown">
            <button
              className="btn btn-link text-decoration-none dropdown-toggle d-flex align-items-center"
              type="button"
              onClick={() => setShowMenu(!showMenu)}
              style={{ border: 'none', background: 'transparent' }}
            >
              <ProfilePicture 
                user={user} 
                size={40} 
                editable={false}
                showBorder={true}
                className="me-2"
              />
              <span className="d-none d-md-inline">
                {user?.prenom || user?.nom || user?.email} ({getRoleLabel(user?.role)})
              </span>
            </button>
            {showMenu && (
              <div
                className="dropdown-menu dropdown-menu-end show"
                style={{ position: 'absolute', right: 0, top: '100%', minWidth: '200px' }}
              >
                <div className="px-3 py-2 border-bottom">
                  <div className="d-flex align-items-center">
                    <ProfilePicture 
                      user={user} 
                      size={50} 
                      editable={false}
                      showBorder={true}
                      className="me-3"
                    />
                    <div>
                      <div className="fw-bold">{user?.prenom} {user?.nom}</div>
                      <small className="text-muted">{user?.email}</small>
                    </div>
                  </div>
                </div>
                <a className="dropdown-item" href="#" onClick={(e) => {
                  e.preventDefault()
                  setShowMenu(false)
                  if (user?.role === 'eleve') {
                    navigate('/eleve/profil')
                  } else if (user?.role === 'enseignant') {
                    navigate('/enseignant/profil')
                  } else if (user?.role === 'admin') {
                    navigate('/admin/profil')
                  }
                }}>
                  <FaUser className="me-2" />
                  Profil
                </a>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={handleLogout}>
                  <FaSignOutAlt className="me-2" />
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

