import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import ForgotPasswordScreen from './ForgotPasswordScreen'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'

type AuthView = 'login' | 'register' | 'forgot-password'

type AuthScreenProps = {
  initialView?: AuthView
  onHome: () => void
}

function AuthScreen({ initialView = 'login', onHome }: AuthScreenProps) {
  const [view, setView] = useState<AuthView>(initialView)
  const [notice, setNotice] = useState('')
  const { status, error, login, register, clearFeedback } = useAuth()

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
          register(credentials)
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
        login(credentials)
      }}
      feedback={feedback}
      feedbackIsError={status === 'failed'}
      submitting={status === 'loading'}
    />
  )
}

export default AuthScreen
