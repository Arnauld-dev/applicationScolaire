import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import { FaUser, FaLock, FaGraduationCap, FaShieldAlt, FaBookOpen } from 'react-icons/fa'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'
import Form from '../../components/ui/Form'
import Card from '../../components/ui/Card'
import Loader from '../../components/global/Loader'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('eleve')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const result = await login(email, password, role)

    if (result.success) {
      toast.success('Connexion réussie!')
      navigate('/')
    } else {
      toast.error(result.error || 'Erreur de connexion')
    }

    setLoading(false)
  }

  return (
    <div 
      className="login-page min-vh-100 d-flex align-items-center justify-content-center position-relative"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, rgba(255, 255, 255, 0.95) 30%, rgba(0, 168, 89, 0.05) 70%, rgba(206, 17, 38, 0.05) 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Éléments décoratifs en arrière-plan */}
      <div 
        className="position-absolute"
        style={{
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0
        }}
      />
      <div 
        className="position-absolute"
        style={{
          bottom: '-10%',
          left: '-5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0, 168, 89, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0
        }}
      />
      <div 
        className="position-absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(206, 17, 38, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0
        }}
      />

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 col-xl-4">
            <div 
              className="card border-0 shadow-lg"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
                background: 'rgba(255, 255, 255, 0.95)',
                animation: 'fadeInUp 0.6s ease-out'
              }}
            >
              {/* En-tête avec dégradé */}
              <div 
                className="text-center py-4 px-4"
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #00A859 50%, #CE1126 100%)',
                  position: 'relative'
                }}
              >
                <div 
                  className="mb-3 mx-auto"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.95)',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
                >
                  <FaGraduationCap size={50} style={{ color: '#FFD700' }} />
                </div>
                <h2 
                  className="mb-2 text-white fw-bold"
                  style={{
                    fontSize: '1.75rem',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  Petit Séminaire de Mugera
                </h2>
                <p className="text-white mb-0" style={{ opacity: 0.95, fontSize: '0.95rem' }}>
                  Portail de connexion sécurisé
                </p>
              </div>

              <div className="card-body p-4">
                <Form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <Select
                      label={
                        <span className="d-flex align-items-center">
                          <FaShieldAlt className="me-2" style={{ color: '#FFD700' }} />
                          Type de compte
                        </span>
                      }
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      options={[
                        { value: 'eleve', label: '👨‍🎓 Élève' },
                        { value: 'enseignant', label: '👨‍🏫 Enseignant' },
                        { value: 'admin', label: '👨‍💼 Administration' }
                      ]}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <Input
                      label="Email ou Matricule"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="exemple@email.com ou ELE001"
                      icon={<FaUser style={{ color: '#6c757d' }} />}
                      required
                      className="input-modern"
                    />
                  </div>

                  <div className="mb-4">
                    <Input
                      label="Mot de passe"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Entrez votre mot de passe"
                      icon={<FaLock style={{ color: '#6c757d' }} />}
                      required
                      className="input-modern"
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="remember"
                        style={{ cursor: 'pointer' }}
                      />
                      <label 
                        className="form-check-label" 
                        htmlFor="remember"
                        style={{ cursor: 'pointer', fontSize: '0.9rem' }}
                      >
                        Se souvenir de moi
                      </label>
                    </div>
                    <Link 
                      to="/forgot-password" 
                      className="text-decoration-none"
                      style={{ 
                        fontSize: '0.9rem',
                        color: '#00A859',
                        fontWeight: '500',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#008A4A'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#00A859'}
                    >
                      Mot de passe oublié?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 py-3 fw-bold"
                    loading={loading}
                    disabled={loading}
                    style={{
                      background: 'linear-gradient(135deg, #FFD700 0%, #FCDD09 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '1.05rem',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.3)',
                      transition: 'all 0.3s ease',
                      color: '#212529'
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.4)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 215, 0, 0.3)'
                    }}
                  >
                    {!loading && 'Se connecter'}
                  </Button>
                </Form>

                <div className="mt-4 pt-3 border-top text-center">
                  <p className="text-muted small mb-2">
                    <FaBookOpen className="me-2" style={{ color: '#6c757d' }} />
                    Besoin d'aide?
                  </p>
                  <p className="text-muted small mb-0" style={{ fontSize: '0.85rem' }}>
                    Contactez l'administration du séminaire
                  </p>
                </div>
              </div>
            </div>

            {/* Informations supplémentaires */}
            <div className="text-center mt-4">
              <p className="text-muted small mb-0" style={{ fontSize: '0.85rem' }}>
                © {new Date().getFullYear()} Petit Séminaire de Mugera - Tous droits réservés
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .input-modern .form-control {
          border-radius: 10px;
          border: 2px solid #e9ecef;
          padding: 0.75rem 1rem;
          transition: all 0.3s ease;
        }

        .input-modern .form-control:focus {
          border-color: #FFD700;
          box-shadow: 0 0 0 0.2rem rgba(255, 215, 0, 0.15);
          transform: translateY(-1px);
        }

        .input-modern .input-group-text {
          border-radius: 10px 0 0 10px;
          border: 2px solid #e9ecef;
          border-right: none;
          background: #f8f9fa;
        }

        .input-modern .form-control:focus + .input-group-text,
        .input-modern .form-control:focus ~ .input-group-text {
          border-color: #FFD700;
        }

        .form-select {
          border-radius: 10px;
          border: 2px solid #e9ecef;
          padding: 0.75rem 1rem;
          transition: all 0.3s ease;
        }

        .form-select:focus {
          border-color: #FFD700;
          box-shadow: 0 0 0 0.2rem rgba(255, 215, 0, 0.15);
        }

        .form-check-input:checked {
          background-color: #FFD700;
          border-color: #FFD700;
        }

        .form-check-input:focus {
          border-color: #FFD700;
          box-shadow: 0 0 0 0.2rem rgba(255, 215, 0, 0.15);
        }
      `}</style>
    </div>
  )
}

export default Login

