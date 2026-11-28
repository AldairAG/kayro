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
import LicenciasScreen from './features/identidad/usuario/presentation/screens/Licencias'
import ConfimacionCompra from './features/home/presentation/screens/ConfimacionCompra'
import LandingPage from './pages/auth/ladingPage'
import { routes } from './routes'

type AppView =
  | typeof routes.home
  | (typeof routes.auth)[keyof typeof routes.auth]
  | (typeof routes.usuario)[keyof typeof routes.usuario]
  | (typeof routes.admin)[keyof typeof routes.admin]

function getInviterFromPath(pathname: string): string | null {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length !== 1) return null

  try {
    return decodeURIComponent(segments[0]).trim() || null
  } catch {
    return null
  }
}

function App() {
  const inviterUsername = getInviterFromPath(window.location.pathname)
  const [view, setView] = useState<AppView>(() =>
    inviterUsername ? routes.auth.register : routes.home,
  )
  const dispatch = useDispatch<AppDispatch>()
  const role = useSelector((state: unknown) => (state as RootState).auth.user?.rol)
  const clearInvitePath = () => {
    if (inviterUsername) window.history.replaceState(null, '', '/')
  }
  const handleLogout = () => {
    clearStoredAuthToken()
    dispatch(logout())
    clearInvitePath()
    setView(routes.home)
  }

  if (view === routes.home) {
    return <LandingPage onNavigate={setView} />
  }

  if (
    (view === routes.admin.usuarios || view === routes.admin.pagos) &&
    role === 'ROLE_ADMINISTRADOR'
  ) {
    return (
      <LayoutAdmin
        activeView={view}
        onLogout={handleLogout}
        onNavigateToUsers={() => setView(routes.admin.usuarios)}
        onNavigateToPayments={() => setView(routes.admin.pagos)}
      >
        {view === routes.admin.pagos ? <ConfimacionCompra /> : <UsuariosScreen />}
      </LayoutAdmin>
    )
  }

  if (
    view === routes.usuario.red ||
    view === routes.usuario.perfil ||
    view === routes.usuario.licencias ||
    view === routes.admin.usuarios ||
    view === routes.admin.pagos
  ) {
    const activeView =
      view === routes.usuario.red
        ? routes.usuario.red
        : view === routes.usuario.licencias
          ? routes.usuario.licencias
          : routes.usuario.perfil
    return (
      <LayoutUsuario
        activeView={activeView}
        onLogout={handleLogout}
        onNavigate={setView}
      >
        {activeView === routes.usuario.red ? (
          <RedScreen />
        ) : activeView === routes.usuario.licencias ? (
          <LicenciasScreen />
        ) : (
          <PerfilScreen />
        )}
      </LayoutUsuario>
    )
  }

  return (
    <AuthScreen
      key={view}
      initialView={view}
      sponsorUsername={inviterUsername ?? undefined}
      onHome={() => {
        clearInvitePath()
        setView(routes.home)
      }}
      onAuthenticated={(authenticatedRole) => {
        clearInvitePath()
        setView(
          authenticatedRole === 'ROLE_ADMINISTRADOR'
            ? routes.admin.usuarios
            : routes.usuario.perfil,
        )
      }}
    />
  )
}

export default App
