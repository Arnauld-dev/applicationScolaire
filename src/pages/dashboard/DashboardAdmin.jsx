import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { FaUsers, FaGraduationCap, FaDollarSign, FaBullhorn } from 'react-icons/fa'
import Card from '../../components/ui/Card'
import ProfilePicture from '../../components/ui/ProfilePicture'

const DashboardAdmin = () => {
  const { user } = useAuth()

  const quickLinks = [
    {
      title: 'Utilisateurs',
      icon: <FaUsers size={32} />,
      link: '/admin/utilisateurs',
      color: 'primary'
    },
    {
      title: 'Académique',
      icon: <FaGraduationCap size={32} />,
      link: '/admin/academique',
      color: 'success'
    },
    {
      title: 'Financière',
      icon: <FaDollarSign size={32} />,
      link: '/admin/financiere',
      color: 'warning'
    },
    {
      title: 'Annonces',
      icon: <FaBullhorn size={32} />,
      link: '/admin/annonces',
      color: 'info'
    }
  ]

  const stats = [
    { label: 'Total Élèves', value: 450, color: 'primary', icon: <FaUsers /> },
    { label: 'Total Enseignants', value: 35, color: 'success', icon: <FaGraduationCap /> },
    { label: 'Classes', value: 18, color: 'info', icon: <FaGraduationCap /> },
    { label: 'Taux de paiement', value: '85%', color: 'warning', icon: <FaDollarSign /> }
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
          <h2 className="mb-2">Tableau de bord - Administration</h2>
          <p className="text-muted mb-0">Bienvenue, {user?.prenom} {user?.nom}</p>
        </div>
      </div>

      <div className="row mb-4">
        {stats.map((stat) => (
          <div key={stat.label} className="col-md-3 col-sm-6 mb-3">
            <Card className="h-100" style={{ 
              background: stat.color === 'primary' 
                ? 'linear-gradient(135deg, #FFD700 0%, #FCDD09 100%)' 
                : stat.color === 'success'
                ? 'linear-gradient(135deg, #198754 0%, #157347 100%)'
                : stat.color === 'info'
                ? 'linear-gradient(135deg, #003F87 0%, #002D5F 100%)'
                : 'linear-gradient(135deg, #FFC107 0%, #FFB300 100%)',
              color: stat.color === 'primary' || stat.color === 'warning' ? '#212529' : 'white',
              border: 'none'
            }}>
              <div className="d-flex align-items-center">
                <div className="me-3" style={{ fontSize: '2rem', opacity: 0.9 }}>
                  {stat.icon}
                </div>
                <div>
                  <h3 className="mb-0" style={{ fontWeight: '700' }}>{stat.value}</h3>
                  <small style={{ opacity: 0.9, fontWeight: '500' }}>{stat.label}</small>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className="row mb-4">
        {quickLinks.map((link) => (
          <div key={link.title} className="col-md-3 col-sm-6 mb-3">
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
          <Card title="Activités récentes">
            <div className="list-group list-group-flush">
              <div className="list-group-item border-0 px-0">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="mb-1">Nouvel élève inscrit</h6>
                    <p className="text-muted small mb-0">Jean Pierre - 4e Math</p>
                  </div>
                  <small className="text-muted">Il y a 2 heures</small>
                </div>
              </div>
              <div className="list-group-item border-0 px-0">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="mb-1">Paiement reçu</h6>
                    <p className="text-muted small mb-0">Frais scolaires - 150,000 FBU</p>
                  </div>
                  <small className="text-muted">Il y a 5 heures</small>
                </div>
              </div>
              <div className="list-group-item border-0 px-0">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="mb-1">Nouvelle classe créée</h6>
                    <p className="text-muted small mb-0">6e Math</p>
                  </div>
                  <small className="text-muted">Hier</small>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-md-6 mb-4">
          <Card title="Annonces récentes">
            <div>
              <div className="border-bottom pb-3 mb-3">
                <h6 className="mb-1">Rentrée scolaire</h6>
                <p className="text-muted small mb-1">La rentrée est prévue le 10 septembre 2026</p>
                <span className="text-muted small">10/09/2026</span>
              </div>
              <div className="border-bottom pb-3 mb-3">
                <h6 className="mb-1">Réunion parents</h6>
                <p className="text-muted small mb-1">Réunion des parents d'élèves le 15 septembre</p>
                <span className="text-muted small">08/09/2026</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DashboardAdmin

