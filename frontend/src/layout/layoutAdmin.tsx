import { useState } from 'react'
import type { ReactNode } from 'react'
import Header from '../components/nav/header'
import SidebarAdmin from '../components/nav/sidebarAdmin'

type LayoutAdminProps = {
  children: ReactNode
  onLogout: () => void
  onNavigateToUsers: () => void
}

function LayoutAdmin({ children, onLogout, onNavigateToUsers }: LayoutAdminProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-(--surface)">
      <Header onLogout={onLogout} />
      <div className="flex w-full flex-col md:min-h-[calc(100vh-4.5rem)] md:flex-row">
        <SidebarAdmin
          collapsed={sidebarCollapsed}
          onNavigateToUsers={onNavigateToUsers}
          onToggle={() => setSidebarCollapsed((collapsed) => !collapsed)}
        />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  )
}

export default LayoutAdmin