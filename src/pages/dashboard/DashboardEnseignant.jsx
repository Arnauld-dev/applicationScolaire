import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { FaChalkboardTeacher, FaUsers, FaBook, FaTasks, FaBullhorn } from 'react-icons/fa'
import Card from '../../components/ui/Card'
import ProfilePicture from '../../components/ui/ProfilePicture'

const DashboardEnseignant = () => {
  const { user } = useAuth()

  const quickLinks = [
    {
      title: 'Mes Classes',
      icon: <FaChalkboardTeacher size={32} />,
      link: '/enseignant/classes',
      color: 'primary'
    },
    {
      title: 'Élèves',
      icon: <FaUsers size={32} />,
      link: '/enseignant/eleves',
      color: 'success'
    },
    {
      title: 'Notes',
      icon: <FaBook size={32} />,
      link: '/enseignant/notes',
      color: 'info'
    },
    {
      title: 'Devoirs',
      icon: <FaTasks size={32} />,
      link: '/enseignant/devoirs',
      color: 'warning'
    },
    {
      title: 'Annonces',
      icon: <FaBullhorn size={32} />,
      link: '/enseignant/annonces',
      color: 'secondary'
    }
  ]

  const myClasses = [
    { id: 1, nom: '4e Math', eleves: 25 },
    { id: 2, nom: '5e Math', eleves: 28 }
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
          <p className="text-muted mb-0">Enseignant</p>
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
          <Card title="Mes Classes">
            {myClasses.length > 0 ? (
              <div>
                {myClasses.map((classe) => (
                  <div key={classe.id} className="border-bottom pb-3 mb-3">
                    <h6 className="mb-1">{classe.nom}</h6>
                    <p className="text-muted small mb-0">{classe.eleves} élèves</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">Aucune classe assignée</p>
            )}
          </Card>
        </div>

        <div className="col-md-6 mb-4">
          <Card title="Statistiques">
            <div className="row text-center">
              <div className="col-6 mb-3">
                <div className="p-3 bg-light rounded">
                  <h4 className="text-primary mb-0">{myClasses.length}</h4>
                  <small className="text-muted">Classes</small>
                </div>
              </div>
              <div className="col-6 mb-3">
                <div className="p-3 bg-light rounded">
                  <h4 className="text-success mb-0">53</h4>
                  <small className="text-muted">Élèves total</small>
                </div>
              </div>
              <div className="col-6">
                <div className="p-3 bg-light rounded">
                  <h4 className="text-info mb-0">12</h4>
                  <small className="text-muted">Notes à saisir</small>
                </div>
              </div>
              <div className="col-6">
                <div className="p-3 bg-light rounded">
                  <h4 className="text-warning mb-0">5</h4>
                  <small className="text-muted">Devoirs en attente</small>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DashboardEnseignant

