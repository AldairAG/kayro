import { useState } from 'react'
import AuthScreen from './features/auth/presentation/screens/AuthScreen'
import LandingPage from './pages/auth/ladingPage'

type AppView = 'landing' | 'login' | 'register' | 'forgot-password'

function App() {
  const [view, setView] = useState<AppView>('landing')

  if (view === 'landing') {
    return <LandingPage onNavigate={setView} />
  }

  return (
    <AuthScreen
      key={view}
      initialView={view}
      onHome={() => setView('landing')}
    />
  )
}

export default App
