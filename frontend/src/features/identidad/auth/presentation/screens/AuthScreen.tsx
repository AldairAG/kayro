import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { loginUser } from '../../application/usecase/login'
import { registerUser } from '../../application/usecase/register'
import ForgotPasswordScreen from './ForgotPasswordScreen'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'

type AuthView = 'login' | 'register' | 'forgot-password'

type AuthScreenProps = {
  initialView?: AuthView
  onHome: () => void
  onAuthenticated: (role: string | null) => void
}

function AuthScreen({ initialView = 'login', onHome, onAuthenticated }: AuthScreenProps) {
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
      ? view === 'register'
        ? 'Tu cuenta se creó correctamente.'
        : 'Iniciaste sesión correctamente.'
      : error || '')

  function handleForgotPassword() {
    setNotice('La recuperación de contraseña aún no está disponible en el servicio de autenticación.')
  }

  if (view === 'register') {
    return (
      <RegisterScreen
        onLogin={() => navigate('login')}
        onHome={onHome}
        onSubmit={(credentials) => {
          setNotice('')
          void submitRegistration(credentials)
        }}
        feedback={feedback}
        feedbackIsError={status === 'failed' || Boolean(notice)}
        submitting={status === 'loading'}
      />
    )
  }

  if (view === 'forgot-password') {
    return (
      <ForgotPasswordScreen
        onLogin={() => navigate('login')}
        onHome={onHome}
        onSubmit={handleForgotPassword}
        feedback={feedback}
        feedbackIsError
      />
    )
  }

  return (
    <LoginScreen
      onRegister={() => navigate('register')}
      onForgotPassword={() => navigate('forgot-password')}
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
