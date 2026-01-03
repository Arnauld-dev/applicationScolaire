import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
//import { useTheme } from '../context/ThemeContext'
import { FaGraduationCap, FaUsers, FaBook, FaAward, FaArrowRight, FaMoon, FaSun } from 'react-icons/fa'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import mugeraImage from '../image/mugera.png'
import backgroundImage from '../image/images (1).jpg'

const Home = () => {
  const { isAuthenticated } = useAuth()
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = mugeraImage
    img.onload = () => setImageLoaded(true)
    img.onerror = () => {
      setImageLoaded(false)
      console.error('Erreur lors du chargement de l\'image')
    }
  }, [])

  const features = [
    {
      icon: <FaGraduationCap size={48} />,
      title: 'Excellence Académique',
      description: 'Un enseignement de qualité pour former les leaders de demain'
    },
    {
      icon: <FaUsers size={48} />,
      title: 'Communauté Scolaire',
      description: 'Un environnement propice à l\'épanouissement et au développement'
    },
    {
      icon: <FaBook size={48} />,
      title: 'Ressources Pédagogiques',
      description: 'Accès à tous les outils nécessaires pour réussir'
    },
    {
      icon: <FaAward size={48} />,
      title: 'Valeurs Chrétiennes',
      description: 'Formation intégrale basée sur les valeurs humaines et spirituelles'
    }
  ]

  return (
    <div className="home-page">
      <style>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
      
      {/* Bandeau défilant */}
      <div style={{
        background: 'linear-gradient(135deg, #FFD700 0%, #FCDD09 100%)',
        color: '#212529',
        padding: '25px 0',
        overflow: 'hidden',
        position: 'relative',
        whiteSpace: 'nowrap',
        fontWeight: 'bold',
        fontSize: '2.5rem',
        boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)',
        zIndex: 1000,
        textTransform: 'capitalize'
      }}>
        <div style={{
          display: 'inline-block',
          animation: 'scroll-infinite 30s linear infinite',
          paddingLeft: '100%'
        }}>
          <span style={{ marginRight: '80px', display: 'inline-block' }}>
            Bienvenu Au Petit Seminaire Sainte Famille De Mugera
          </span>
          <span style={{ marginRight: '80px', display: 'inline-block' }}>
            Bienvenu Au Petit Seminaire Sainte Famille De Mugera
          </span>
          <span style={{ marginRight: '80px', display: 'inline-block' }}>
            Bienvenu Au Petit Seminaire Sainte Famille De Mugera
          </span>
          <span style={{ marginRight: '80px', display: 'inline-block' }}>
            Bienvenu Au Petit Seminaire Sainte Famille De Mugera
          </span>
        </div>
      </div>

      {/* Hero Section avec l'image */}
      <section className="hero-section position-relative" style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        padding: '4rem 0',
        position: 'relative'
      }}>
        {/* Overlay pour améliorer la lisibilité */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.4) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(0, 168, 89, 0.3) 100%)',
          zIndex: 1
        }} />
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="hero-content">
                <h1 className="display-4 fw-bold mb-4" style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FCDD09 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Petit Séminaire de Mugera
                </h1>
                <p className="lead text-muted mb-4" style={{ fontSize: '1.25rem' }}>
                  Une institution d'excellence dédiée à la formation intégrale des jeunes, 
                  alliant excellence académique et valeurs chrétiennes.
                </p>
                {!isAuthenticated ? (
                  <div className="d-flex gap-3 flex-wrap">
                    <Link to="/login">
                      <Button variant="primary" size="lg" icon={<FaArrowRight />}>
                        Se connecter
                      </Button>
                    </Link>
                    <Button variant="outline-primary" size="lg">
                      En savoir plus
                    </Button>
                  </div>
                ) : (
                  <Link to="/">
                    <Button variant="primary" size="lg" icon={<FaArrowRight />}>
                      Accéder au tableau de bord
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image" style={{
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(255, 215, 0, 0.3)'
              }}>
                {imageLoaded ? (
                  <img 
                    src={mugeraImage} 
                    alt="Petit Séminaire de Mugera"
                    className="img-fluid"
                    style={{
                      width: '100%',
                      height: '500px',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'opacity 0.3s ease'
                    }}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(false)}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '500px',
                    background: 'linear-gradient(135deg, #FFD700 0%, #FCDD09 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#212529',
                    fontSize: '1.5rem',
                    fontWeight: '600'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏛️</div>
                      <div>Petit Séminaire de Mugera</div>
                      <p style={{ fontSize: '1rem', marginTop: '1rem', opacity: 0.8 }}>
                        Image du bâtiment principal
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Caractéristiques */}
      <section className="features-section py-5" style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF9E6 100%)'
      }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3" style={{
              color: '#FCDD09'
            }}>
              Nos Valeurs
            </h2>
            <p className="lead text-muted">
              Ce qui fait la force de notre institution
            </p>
          </div>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <Card className="h-100 text-center" style={{
                  borderTop: '4px solid #FFD700',
                  transition: 'all 0.3s'
                }}>
                  <div className="mb-3" style={{ color: '#FFD700' }}>
                    {feature.icon}
                  </div>
                  <h5 className="fw-bold mb-3" style={{ color: '#FCDD09' }}>
                    {feature.title}
                  </h5>
                  <p className="text-muted mb-0">
                    {feature.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section À propos */}
      <section className="about-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="display-5 fw-bold mb-4" style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FCDD09 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                À propos de nous
              </h2>
              <p className="lead text-muted mb-4">
                Le Petit Séminaire de Mugera est une institution d'enseignement secondaire 
                qui se distingue par son engagement envers l'excellence académique et la 
                formation intégrale des élèves.
              </p>
              <p className="text-muted mb-4">
                Fondé sur des valeurs chrétiennes solides, notre établissement offre un 
                environnement propice à l'apprentissage, au développement personnel et à 
                l'épanouissement spirituel. Nous préparons nos élèves à devenir des citoyens 
                responsables et des leaders dans leurs communautés.
              </p>
              <div className="d-flex gap-4">
                <div>
                  <h3 className="fw-bold" style={{ color: '#FFD700' }}>450+</h3>
                  <p className="text-muted mb-0">Élèves</p>
                </div>
                <div>
                  <h3 className="fw-bold" style={{ color: '#FFD700' }}>35+</h3>
                  <p className="text-muted mb-0">Enseignants</p>
                </div>
                <div>
                  <h3 className="fw-bold" style={{ color: '#FFD700' }}>18</h3>
                  <p className="text-muted mb-0">Classes</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <Card style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FCDD09 100%)',
                border: 'none',
                padding: '3rem'
              }}>
                <div className="text-center text-dark">
                  <FaGraduationCap size={80} className="mb-4" />
                  <h3 className="fw-bold mb-3">Mission</h3>
                  <p className="mb-0" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                    Former des jeunes complets, équilibrés et engagés, capables de contribuer 
                    positivement à la société grâce à une éducation de qualité et des valeurs 
                    humaines et spirituelles solides.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      {!isAuthenticated && (
        <section className="cta-section py-5" style={{
          background: 'linear-gradient(135deg, #FFD700 0%, #FCDD09 100%)',
          color: '#212529'
        }}>
          <div className="container text-center">
            <h2 className="display-5 fw-bold mb-4">
              Rejoignez notre communauté
            </h2>
            <p className="lead mb-4" style={{ fontSize: '1.25rem' }}>
              Accédez à votre espace personnel pour suivre votre parcours académique
            </p>
            <Link to="/login">
              <Button 
                variant="dark" 
                size="lg"
                icon={<FaArrowRight />}
                style={{
                  background: '#212529',
                  border: 'none',
                  padding: '0.75rem 2rem'
                }}
              >
                Se connecter maintenant
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}

export default Home

