import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Form from '../../components/ui/Form'
import Card from '../../components/ui/Card'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulation d'envoi d'email
    await new Promise(resolve => setTimeout(resolve, 1000))

    toast.success('Un email de réinitialisation a été envoyé!')
    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
            <Card className="border-0 shadow">
              <div className="text-center mb-4">
                <h3 className="mb-1">Mot de passe oublié</h3>
                <p className="text-muted">
                  {sent
                    ? 'Vérifiez votre boîte email'
                    : 'Entrez votre email pour recevoir un lien de réinitialisation'}
                </p>
              </div>

              {!sent ? (
                <Form onSubmit={handleSubmit}>
                  <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    icon={<FaEnvelope />}
                    required
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 mb-3"
                    loading={loading}
                    disabled={loading}
                  >
                    Envoyer le lien
                  </Button>
                </Form>
              ) : (
                <div className="text-center">
                  <div className="alert alert-success">
                    <FaEnvelope className="me-2" />
                    Un email a été envoyé à <strong>{email}</strong>
                  </div>
                  <p className="text-muted small">
                    Si vous ne recevez pas l'email, vérifiez votre dossier spam.
                  </p>
                </div>
              )}

              <div className="mt-3 text-center">
                <Link to="/login" className="text-decoration-none">
                  <FaArrowLeft className="me-2" />
                  Retour à la connexion
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword

