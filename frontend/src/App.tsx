import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from './store'
import type { RootState } from './store'
import { clearStoredAuthToken } from './features/auth/infrastructure/authTokenStorage'
import { logout } from './features/auth/store/auth.slice'
import AuthScreen from './features/auth/presentation/screens/AuthScreen'
import PerfilScreen from './features/perfil/presentation/screens/PerfilScreen'
import RedScreen from './features/red/presentation/screens/RedScreen'
import UsuariosScreen from './features/usuario/presentation/screens/UsuariosScreen'
import LandingPage from './pages/auth/ladingPage'

type AppView = 'landing' | 'login' | 'register' | 'forgot-password' | 'perfil' | 'red' | 'usuarios'

function App() {
  const [view, setView] = useState<AppView>('landing')
  const dispatch = useDispatch<AppDispatch>()
  const role = useSelector((state: RootState) => state.auth.user?.rol)
  const handleLogout = () => {
    clearStoredAuthToken()
    dispatch(logout())
    setView('landing')
  }

  if (view === 'landing') {
    return <LandingPage onNavigate={setView} />
  }

  if (view === 'usuarios' && role === 'ROLE_ADMINISTRADOR') {
    return (
      <UsuariosScreen
        onProfile={() => setView('perfil')}
        onLogout={handleLogout}
      />
    )
  }

  if (view === 'red') {
    return <RedScreen onBack={() => setView('perfil')} onLogout={handleLogout} />
  }

  if (view === 'perfil' || view === 'usuarios') {
    return (
      <PerfilScreen
        onLogout={handleLogout}
        onRed={() => setView('red')}
      />
    )
  }

  return (
    <AuthScreen
      key={view}
      initialView={view}
      onHome={() => setView('landing')}
      onAuthenticated={(authenticatedRole) =>
        setView(authenticatedRole === 'ROLE_ADMINISTRADOR' ? 'usuarios' : 'perfil')
      }
    />
  )
}

export default App
