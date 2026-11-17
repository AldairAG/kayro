import { useState } from 'react'
import ForgotPasswordScreen from './ForgotPasswordScreen'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'

type AuthView = 'login' | 'register' | 'forgot-password'

function AuthScreen() {
  const [view, setView] = useState<AuthView>('login')
  const [feedback, setFeedback] = useState('')

  function navigate(nextView: AuthView) {
    setFeedback('')
    setView(nextView)
  }

  function showUnavailableMessage() {
    setFeedback('La interfaz está lista. La conexión con el servicio de autenticación aún no está configurada.')
  }

  if (view === 'register') {
    return (
      <RegisterScreen
        onLogin={() => navigate('login')}
        onSubmit={showUnavailableMessage}
        feedback={feedback}
      />
    )
  }

  if (view === 'forgot-password') {
    return (
      <ForgotPasswordScreen
        onLogin={() => navigate('login')}
        onSubmit={showUnavailableMessage}
        feedback={feedback}
      />
    )
  }

  return (
    <LoginScreen
      onRegister={() => navigate('register')}
      onForgotPassword={() => navigate('forgot-password')}
      onSubmit={showUnavailableMessage}
      feedback={feedback}
    />
  )
}

export default AuthScreen
