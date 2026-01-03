import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  FaHome,
  FaUser,
  FaCalendarAlt,
  FaBook,
  FaTasks,
  FaFileAlt,
  FaFileExcel,
  FaCreditCard,
  FaUsers,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaDollarSign,
  FaBullhorn,
  FaCog
} from 'react-icons/fa'

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth()

  const menuItems = {
    eleve: [
      { path: '/', label: 'Tableau de bord', icon: <FaHome /> },
      { path: '/eleve/profil', label: 'Mon Profil', icon: <FaUser /> },
      { path: '/eleve/emploi-du-temps', label: 'Emploi du temps', icon: <FaCalendarAlt /> },
      { path: '/eleve/notes', label: 'Mes Notes', icon: <FaBook /> },
      { path: '/eleve/devoirs', label: 'Devoirs', icon: <FaTasks /> },
      { path: '/eleve/bulletins', label: 'Bulletins', icon: <FaFileAlt /> },
      { path: '/eleve/paiements', label: 'Paiements', icon: <FaCreditCard /> }
    ],
    enseignant: [
      { path: '/', label: 'Tableau de bord', icon: <FaHome /> },
      { path: '/enseignant/profil', label: 'Mon Profil', icon: <FaUser /> },
      { path: '/enseignant/classes', label: 'Mes Classes', icon: <FaChalkboardTeacher /> },
      { path: '/enseignant/eleves', label: 'Élèves', icon: <FaUsers /> },
      { path: '/enseignant/notes', label: 'Notes', icon: <FaBook /> },
      { path: '/enseignant/notes-excel', label: 'Notes Excel', icon: <FaFileExcel /> },
      { path: '/enseignant/devoirs', label: 'Devoirs', icon: <FaTasks /> },
      { path: '/enseignant/annonces', label: 'Annonces', icon: <FaBullhorn /> }
    ],
    admin: [
      { path: '/', label: 'Tableau de bord', icon: <FaHome /> },
      { path: '/admin/profil', label: 'Mon Profil', icon: <FaUser /> },
      { path: '/admin/utilisateurs', label: 'Utilisateurs', icon: <FaUsers /> },
      { path: '/admin/academique', label: 'Académique', icon: <FaGraduationCap /> },
      { path: '/admin/financiere', label: 'Financière', icon: <FaDollarSign /> },
      { path: '/admin/annonces', label: 'Annonces', icon: <FaBullhorn /> }
    ]
  }

  const items = menuItems[user?.role] || []

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay d-lg-none"
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1039
          }}
        />
      )}
      <aside
        className={`sidebar bg-light border-end ${isOpen ? 'show' : ''}`}
        style={{
          position: 'fixed',
          top: '56px',
          left: 0,
          height: 'calc(100vh - 56px)',
          width: '250px',
          zIndex: 1040,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          overflowY: 'auto'
        }}
      >
        <nav className="p-3">
          <ul className="nav flex-column">
            {items.map((item) => (
              <li key={item.path} className="nav-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link d-flex align-items-center ${isActive ? 'active' : ''}`
                  }
                  onClick={onClose}
                >
                  <span className="me-2">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar

