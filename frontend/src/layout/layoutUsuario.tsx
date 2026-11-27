import { useState } from 'react'
import type { ReactNode } from 'react'
import Header from '../components/nav/header'
import SidebarUsuario from '../components/nav/sidebarUsuario'

type UsuarioView = 'perfil' | 'red'

type LayoutUsuarioProps = {
  activeView: UsuarioView
  children: ReactNode
  onLogout: () => void
  onNavigate: (view: UsuarioView) => void
}

function LayoutUsuario({ activeView, children, onLogout, onNavigate }: LayoutUsuarioProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-(--surface)">
      <Header onLogout={onLogout} />
      <div className="flex w-full flex-col md:min-h-[calc(100vh-4.5rem)] md:flex-row">
        <SidebarUsuario
          activeView={activeView}
          collapsed={sidebarCollapsed}
          onNavigate={onNavigate}
          onToggle={() => setSidebarCollapsed((collapsed) => !collapsed)}
        />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  )
}

export default LayoutUsuario