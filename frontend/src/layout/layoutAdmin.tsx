import { useState } from 'react'
import type { ReactNode } from 'react'
import Header from '../components/nav/header'
import SidebarAdmin from '../components/nav/sidebarAdmin'
import { routes } from '../routes'

type AdminView = (typeof routes.admin)[keyof typeof routes.admin]
type LayoutAdminProps = {
  activeView: AdminView
  children: ReactNode
  onLogout: () => void
  onNavigateToUsers: () => void
  onNavigateToPayments: () => void
}

function LayoutAdmin({
  activeView,
  children,
  onLogout,
  onNavigateToUsers,
  onNavigateToPayments,
}: LayoutAdminProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-(--surface)">
      <Header onLogout={onLogout} />
      <div className="flex w-full flex-col md:min-h-[calc(100vh-4.5rem)] md:flex-row">
        <SidebarAdmin
          activeView={activeView}
          collapsed={sidebarCollapsed}
          onNavigateToUsers={onNavigateToUsers}
          onNavigateToPayments={onNavigateToPayments}
          onToggle={() => setSidebarCollapsed((collapsed) => !collapsed)}
        />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  )
}

export default LayoutAdmin