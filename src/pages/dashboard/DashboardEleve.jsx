import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaBook, FaTasks, FaFileAlt, FaCreditCard, FaBullhorn } from 'react-icons/fa'
import Card from '../../components/ui/Card'
import ProfilePicture from '../../components/ui/ProfilePicture'

const DashboardEleve = () => {
  const { user } = useAuth()

  const quickLinks = [
    {
      title: 'Emploi du temps',
      icon: <FaCalendarAlt size={32} />,
      link: '/eleve/emploi-du-temps',
      color: 'primary'
    },
    {
      title: 'Mes Notes',
      icon: <FaBook size={32} />,
      link: '/eleve/notes',
      color: 'success'
    },
    {
      title: 'Devoirs',
      icon: <FaTasks size={32} />,
      link: '/eleve/devoirs',
      color: 'warning'
    },
    {
      title: 'Bulletins',
      icon: <FaFileAlt size={32} />,
      link: '/eleve/bulletins',
      color: 'info'
    },
    {
      title: 'Paiements',
      icon: <FaCreditCard size={32} />,
      link: '/eleve/paiements',
      color: 'danger'
    },
    {
      title: 'Annonces',
      icon: <FaBullhorn size={32} />,
      link: '#',
      color: 'secondary'
    }
  ]

  const recentAnnouncements = [
    {
      id: 1,
      titre: 'Rentrée scolaire',
      contenu: 'La rentrée est prévue le 10 septembre 2026',
      date: '10/09/2026'
    },
    {
      id: 2,
      titre: 'Réunion parents',
      contenu: 'Réunion des parents d\'élèves le 15 septembre',
      date: '08/09/2026'
    }
  ]

  return (
    <div>
      <div className="mb-4 d-flex align-items-center">
        <ProfilePicture 
          user={user} 
          size={80} 
          editable={false}
          showBorder={true}
          className="me-3"
        />
        <div>
          <h2 className="mb-2">Bienvenue, {user?.prenom} {user?.nom}</h2>
          <p className="text-muted mb-0">Classe: {user?.classe || 'Non assignée'}</p>
        </div>
      </div>

      <div className="row mb-4">
        {quickLinks.map((link) => (
          <div key={link.title} className="col-md-4 col-lg-3 mb-3">
            <Link to={link.link} className="text-decoration-none">
              <Card className="h-100 text-center hover-shadow">
                <div className={`text-${link.color} mb-3`}>
                  {link.icon}
                </div>
                <h6 className="mb-0">{link.title}</h6>
              </Card>
            </Link>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <Card title="Annonces récentes">
            {recentAnnouncements.length > 0 ? (
              <div>
                {recentAnnouncements.map((announcement) => (
                  <div key={announcement.id} className="border-bottom pb-3 mb-3">
                    <h6 className="mb-1">{announcement.titre}</h6>
                    <p className="text-muted small mb-1">{announcement.contenu}</p>
                    <span className="text-muted small">{announcement.date}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">Aucune annonce récente</p>
            )}
          </Card>
        </div>

        <div className="col-md-6 mb-4">
          <Card title="Statistiques">
            <div className="row text-center">
              <div className="col-6 mb-3">
                <div className="p-3 rounded" style={{ 
                  background: 'linear-gradient(135deg, #FFD700 0%, #FCDD09 100%)',
                  color: '#212529'
                }}>
                  <h4 className="mb-0" style={{ fontWeight: '700' }}>78%</h4>
                  <small style={{ fontWeight: '500' }}>Moyenne générale</small>
                </div>
              </div>
              <div className="col-6 mb-3">
                <div className="p-3 rounded" style={{ 
                  background: 'linear-gradient(135deg, #198754 0%, #157347 100%)',
                  color: 'white'
                }}>
                  <h4 className="mb-0" style={{ fontWeight: '700' }}>5</h4>
                  <small style={{ fontWeight: '500' }}>Devoirs en cours</small>
                </div>
              </div>
              <div className="col-6">
                <div className="p-3 rounded" style={{ 
                  background: 'linear-gradient(135deg, #003F87 0%, #002D5F 100%)',
                  color: 'white'
                }}>
                  <h4 className="mb-0" style={{ fontWeight: '700' }}>12</h4>
                  <small style={{ fontWeight: '500' }}>Matières</small>
                </div>
              </div>
              <div className="col-6">
                <div className="p-3 rounded" style={{ 
                  background: 'linear-gradient(135deg, #FFC107 0%, #FFB300 100%)',
                  color: '#212529'
                }}>
                  <h4 className="mb-0" style={{ fontWeight: '700' }}>2</h4>
                  <small style={{ fontWeight: '500' }}>Paiements en attente</small>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DashboardEleve

