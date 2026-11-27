import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { loginUser } from '../../application/usecase/login'
import { registerUser } from '../../application/usecase/register'
import ForgotPasswordScreen from './ForgotPasswordScreen'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import { routes } from '../../../../../routes'

type AuthView = (typeof routes.auth)[keyof typeof routes.auth]

type AuthScreenProps = {
  initialView?: AuthView
  sponsorUsername?: string
  onHome: () => void
  onAuthenticated: (role: string | null) => void
}

function AuthScreen({
  initialView = routes.auth.login,
  sponsorUsername,
  onHome,
  onAuthenticated,
}: AuthScreenProps) {
  const [view, setView] = useState<AuthView>(initialView)
  const [notice, setNotice] = useState('')
  const { status, error, login, register, clearFeedback } = useAuth()

  async function submitLogin(credentials: Parameters<typeof login>[0]) {
    const result = await login(credentials)
    if (loginUser.fulfilled.match(result)) {
      onAuthenticated(result.payload.rol)
    }
  }

  async function submitRegistration(credentials: Parameters<typeof register>[0]) {
    const result = await register(credentials)
    if (registerUser.fulfilled.match(result)) {
      onAuthenticated(result.payload.rol)
    }
  }

  function navigate(nextView: AuthView) {
    setNotice('')
    clearFeedback()
    setView(nextView)
  }

  const feedback =
    notice ||
    (status === 'succeeded'
      ? view === routes.auth.register
        ? 'Tu cuenta se creó correctamente.'
        : 'Iniciaste sesión correctamente.'
      : error || '')

  function handleForgotPassword() {
    setNotice('La recuperación de contraseña aún no está disponible en el servicio de autenticación.')
  }

  if (view === routes.auth.register) {
    return (
      <RegisterScreen
        onLogin={() => navigate(routes.auth.login)}
        onHome={onHome}
        onSubmit={(credentials) => {
          setNotice('')
          void submitRegistration(credentials)
        }}
        feedback={feedback}
        feedbackIsError={status === 'failed' || Boolean(notice)}
        submitting={status === 'loading'}
        sponsorUsername={sponsorUsername}
      />
    )
  }

  if (view === routes.auth.forgotPassword) {
    return (
      <ForgotPasswordScreen
        onLogin={() => navigate(routes.auth.login)}
        onHome={onHome}
        onSubmit={handleForgotPassword}
        feedback={feedback}
        feedbackIsError
      />
    )
  }

  return (
    <LoginScreen
      onRegister={() => navigate(routes.auth.register)}
      onForgotPassword={() => navigate(routes.auth.forgotPassword)}
      onHome={onHome}
      onSubmit={(credentials) => {
        setNotice('')
        void submitLogin(credentials)
      }}
      feedback={feedback}
      feedbackIsError={status === 'failed'}
      submitting={status === 'loading'}
    />
  )
}

export default AuthScreen
