import { routes } from '../../routes'

type AdminView = (typeof routes.admin)[keyof typeof routes.admin]

type SidebarAdminProps = {
  activeView: AdminView
  collapsed: boolean
  onNavigateToUsers: () => void
  onNavigateToPayments: () => void
  onToggle: () => void
}

function SidebarAdmin({
  activeView,
  collapsed,
  onNavigateToUsers,
  onNavigateToPayments,
  onToggle,
}: SidebarAdminProps) {
  const navButtonClass = (isActive: boolean) =>
    `flex h-11 min-w-0 items-center rounded-xl text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primario) ${
      isActive
        ? 'bg-(--quinario) text-(--background)'
        : 'text-(--text-primary) hover:bg-(--surface)'
    } ${
      collapsed
        ? 'w-11 shrink-0 justify-center p-0'
        : 'flex-1 justify-center px-3 md:w-full md:flex-none md:justify-start md:px-4'
    }`

  return (
    <aside
      className={`shrink-0 border-b border-(--border)/40 bg-(--background) transition-[width] md:border-r md:border-b-0 ${
        collapsed ? 'md:w-20' : 'md:w-60'
      }`}
    >
      <nav
        aria-label="Navegación de administración"
        className={`flex gap-2 p-3 md:flex-col md:p-4 ${collapsed ? 'md:items-center' : ''}`}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? 'Expandir menú lateral' : 'Contraer menú lateral'}
          aria-expanded={!collapsed}
          aria-controls="admin-sidebar-views"
          title={collapsed ? 'Expandir menú lateral' : 'Contraer menú lateral'}
          className={`flex h-11 shrink-0 items-center justify-center rounded-xl text-(--text-primary) transition hover:bg-(--surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primario) ${
            collapsed ? 'w-11' : 'w-11 md:w-full md:justify-end md:px-3'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`h-5 w-5 transition-transform ${collapsed ? 'rotate-180' : ''}`}
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <div id="admin-sidebar-views" className="flex min-w-0 flex-1 gap-2 md:flex-col">
          <button
            type="button"
            onClick={onNavigateToUsers}
            aria-current={activeView === routes.admin.usuarios ? 'page' : undefined}
            aria-label="Usuarios"
            title={collapsed ? 'Usuarios' : undefined}
            className={navButtonClass(activeView === routes.admin.usuarios)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-5 w-5 shrink-0"
            >
              <circle cx="9" cy="8" r="3" />
              <path d="M3 20v-1a6 6 0 0 1 12 0v1m2-11a3 3 0 0 1 0 6m1 2a5 5 0 0 1 3 4v1" />
            </svg>
            {!collapsed && <span className="ml-3 truncate">Usuarios</span>}
          </button>
          <button
            type="button"
            onClick={onNavigateToPayments}
            aria-current={activeView === routes.admin.pagos ? 'page' : undefined}
            aria-label="Confirmación de compra"
            title={collapsed ? 'Confirmación de compra' : undefined}
            className={navButtonClass(activeView === routes.admin.pagos)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-5 w-5 shrink-0"
            >
              <path d="M4 5h16v14H4z" />
              <path d="M8 9h8m-8 4h5m-2 6v-3" />
              <path d="m15 15 1.5 1.5L20 13" />
            </svg>
            {!collapsed && <span className="ml-3 truncate">Gestión de Pagos</span>}
          </button>
        </div>
      </nav>
    </aside>
  )
}

export default SidebarAdmin