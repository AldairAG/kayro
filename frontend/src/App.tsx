import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from './store'
import type { RootState } from './store'
import { clearStoredAuthToken } from './features/identidad/auth/infrastructure/authTokenStorage'
import { logout } from './features/identidad/auth/store/auth.slice'
import AuthScreen from './features/identidad/auth/presentation/screens/AuthScreen'
import LayoutAdmin from './layout/layoutAdmin'
import LayoutUsuario from './layout/layoutUsuario'
import PerfilScreen from './features/identidad/perfil/presentation/screens/PerfilScreen'
import RedScreen from './features/identidad/red/presentation/screens/RedScreen'
import UsuariosScreen from './features/identidad/usuario/presentation/screens/UsuariosScreen'
import LandingPage from './pages/auth/ladingPage'

type AppView = 'landing' | 'login' | 'register' | 'forgot-password' | 'perfil' | 'red' | 'usuarios'

function App() {
  const [view, setView] = useState<AppView>('landing')
  const dispatch = useDispatch<AppDispatch>()
  const role = useSelector((state: unknown) => (state as RootState).auth.user?.rol)
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
      <LayoutAdmin
        onLogout={handleLogout}
        onNavigateToUsers={() => setView('usuarios')}
      >
        <UsuariosScreen />
      </LayoutAdmin>
    )
  }

  if (view === 'red' || view === 'perfil' || view === 'usuarios') {
    const activeView = view === 'red' ? 'red' : 'perfil'
    return (
      <LayoutUsuario
        activeView={activeView}
        onLogout={handleLogout}
        onNavigate={setView}
      >
        {activeView === 'red' ? <RedScreen /> : <PerfilScreen />}
      </LayoutUsuario>
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
