import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { useAuth } from '../hooks/useAuth'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { authLoading, isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const redirectTo = location.state?.from ?? '/admin'

  if (!authLoading && isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setIsSubmitting(true)
      setError('')
      await signInWithEmailAndPassword(auth, email.trim(), password)
      navigate(redirectTo, { replace: true })
    } catch {
      setError('Identifiants invalides. Verifiez votre email et votre mot de passe.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page auth-page">
      <section className="auth-layout">
        <div className="panel auth-hero">
          <span className="section-kicker">Espace administrateur</span>
          <h1>Accedez a la gestion du catalogue</h1>
          <p>
            Connectez-vous pour ajouter, modifier ou retirer les produits affiches
            dans le catalogue.
          </p>
        </div>

        <form className="panel auth-card" onSubmit={handleSubmit}>
          <div>
            <h2>Connexion</h2>
            <p>Utilisez votre compte administrateur pour poursuivre.</p>
          </div>

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@motoparts.fr"
              required
            />
          </label>

          <label className="field">
            <span>Mot de passe</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Votre mot de passe"
              required
            />
          </label>

          {error ? <div className="form-feedback error">{error}</div> : null}

          <button type="submit" className="button button-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
      </section>
    </div>
  )
}

export default Login
