import { useEffect } from 'react'
import { useUsuarios } from '../hooks/useUsuarios'

function UsuariosScreen() {
  const { usuarios, status, error, cargar } = useUsuarios()

  useEffect(() => {
    if (status === 'idle') {
      void cargar()
    }
  }, [cargar, status])

  return (
    <main className="min-h-[calc(100vh-4.5rem)] bg-(--surface) px-4 py-6 sm:px-8 sm:py-10">
      <div>
        <div className="mb-8 max-w-2xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--secundario)">
            Administración
          </p>
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-(--text-primary) sm:text-4xl">
            Usuarios registrados
          </h1>
          <p className="mt-3 text-sm leading-6 text-[color-mix(in_srgb,var(--text-primary)_65%,var(--background))] sm:text-base">
            Consulta las cuentas registradas en la plataforma.
          </p>
        </div>

        <section className="overflow-hidden rounded-3xl border border-[color-mix(in_srgb,var(--border)_25%,var(--background))] bg-(--background) shadow-[0_20px_60px_-44px_color-mix(in_srgb,var(--quinario)_30%,transparent)]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[color-mix(in_srgb,var(--border)_20%,var(--background))] px-5 py-5 sm:px-7">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-(--secundario)">
                Gestión de cuentas
              </p>
              <h2 className="text-xl font-semibold tracking-tight text-(--text-primary)">
                Directorio
              </h2>
              {status === 'succeeded' && (
                <p className="mt-1.5 text-sm text-[color-mix(in_srgb,var(--text-primary)_60%,var(--background))]">
                  {usuarios.length} {usuarios.length === 1 ? 'usuario' : 'usuarios'}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => void cargar()}
              disabled={status === 'loading'}
              className="rounded-xl border border-[color-mix(in_srgb,var(--border)_35%,var(--background))] bg-(--background) px-4 py-2.5 text-sm font-semibold text-(--text-primary) transition hover:bg-(--surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primario) disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'loading' ? 'Cargando…' : 'Actualizar'}
            </button>
          </div>

          {status === 'loading' && (
            <div role="status" className="flex flex-col items-center justify-center gap-3 px-5 py-12">
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-[color-mix(in_srgb,var(--primario)_18%,var(--background))] border-t-(--primario)" aria-hidden="true" />
              <p className="text-sm text-[color-mix(in_srgb,var(--text-primary)_60%,var(--background))]">
                Cargando usuarios…
              </p>
            </div>
          )}

          {status === 'failed' && (
            <div className="m-5 rounded-2xl bg-[color-mix(in_srgb,var(--error)_8%,var(--background))] px-5 py-8 text-center sm:m-7">
              <p role="alert" className="text-sm text-(--error)">{error}</p>
              <button
                type="button"
                onClick={() => void cargar()}
                className="mt-4 rounded-xl bg-(--quinario) px-4 py-2.5 text-sm font-semibold text-(--background) transition hover:bg-(--secundario) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primario)"
              >
                Reintentar
              </button>
            </div>
          )}

          {status === 'succeeded' && usuarios.length === 0 && (
            <div className="m-5 rounded-2xl border border-dashed border-[color-mix(in_srgb,var(--border)_45%,var(--background))] bg-(--surface) px-5 py-12 text-center sm:m-7">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--primario)_10%,var(--background))] text-lg font-bold text-(--primario)">
                K
              </span>
              <p className="mt-4 text-sm font-medium text-(--text-primary)">
                No hay usuarios registrados.
              </p>
            </div>
          )}

          {status === 'succeeded' && usuarios.length > 0 && (
            <div className="overflow-x-auto px-5 pb-5 sm:px-7 sm:pb-7">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead className="bg-(--surface) text-[10px] uppercase tracking-[0.12em] text-[color-mix(in_srgb,var(--text-primary)_60%,var(--background))]">
                  <tr>
                    <th scope="col" className="px-5 py-3.5 font-semibold">Nombre</th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">Usuario</th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">Correo electrónico</th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[color-mix(in_srgb,var(--border)_20%,var(--background))]">
                  {usuarios.map((usuario, index) => (
                    <tr
                      key={usuario.id ?? `${usuario.username}-${index}`}
                      className="text-[color-mix(in_srgb,var(--text-primary)_75%,var(--background))] transition-colors hover:bg-(--surface)"
                    >
                      <td className="px-5 py-4 font-medium text-(--text-primary)">
                        {[usuario.nombre, usuario.apellidos].filter(Boolean).join(' ') ||
                          usuario.username ||
                          'Sin nombre'}
                      </td>
                      <td className="px-5 py-4">{usuario.username || '—'}</td>
                      <td className="px-5 py-4">{usuario.email || '—'}</td>
                      <td className="break-all px-5 py-4">{usuario.id ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default UsuariosScreen
