import { routes } from '../../routes'

type UsuarioView = (typeof routes.usuario)[keyof typeof routes.usuario]

type SidebarUsuarioProps = {
  activeView: UsuarioView
  collapsed: boolean
  onNavigate: (view: UsuarioView) => void
  onToggle: () => void
}

const views: { id: UsuarioView; label: string }[] = [
  { id: routes.usuario.perfil, label: 'Mi perfil' },
  { id: routes.usuario.red, label: 'Mi red' },
  { id: routes.usuario.licencias, label: 'Licencias' },
]

function SidebarUsuario({ activeView, collapsed, onNavigate, onToggle }: SidebarUsuarioProps) {
  return (
    <aside
      className={`shrink-0 border-b border-(--border)/40 bg-(--background) transition-[width] md:border-r md:border-b-0 ${
        collapsed ? 'md:w-20' : 'md:w-60'
      }`}
    >
      <nav
        aria-label="Navegación principal"
        className={`flex gap-2 p-3 md:flex-col md:p-4 ${collapsed ? 'md:items-center' : ''}`}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? 'Expandir menú lateral' : 'Contraer menú lateral'}
          aria-expanded={!collapsed}
          aria-controls="usuario-sidebar-views"
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
        <div id="usuario-sidebar-views" className="flex min-w-0 flex-1 gap-2 md:flex-col">
        {views.map(({ id, label }) => {
          const isActive = activeView === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              aria-current={isActive ? 'page' : undefined}
              aria-label={label}
              title={collapsed ? label : undefined}
              className={`flex h-11 min-w-0 items-center rounded-xl text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primario) ${
                isActive
                  ? 'bg-(--quinario) text-(--background)'
                  : 'text-(--text-primary) hover:bg-(--surface)'
              } ${collapsed ? 'w-11 shrink-0 justify-center p-0' : 'flex-1 justify-center px-3 md:w-full md:flex-none md:justify-start md:px-4'}`}
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
                {id === routes.usuario.perfil ? (
                  <>
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                  </>
                ) : id === routes.usuario.red ? (
                  <>
                    <circle cx="12" cy="5" r="2.5" />
                    <circle cx="6" cy="18" r="2.5" />
                    <circle cx="18" cy="18" r="2.5" />
                    <path d="m10.9 7.3-3.8 8.4m5.9-8.4 3.8 8.4M8.5 18h7" />
                  </>
                ) : (
                  <>
                    <path d="M4 8.5 12 4l8 4.5-8 4.5-8-4.5Z" />
                    <path d="M4 12.5 12 17l8-4.5M4 16.5 12 21l8-4.5" />
                  </>
                )}
              </svg>
              {!collapsed && <span className="ml-3 truncate">{label}</span>}
            </button>
          )
        })}
        </div>
      </nav>
    </aside>
  )
}

export default SidebarUsuario