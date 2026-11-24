import { useEffect } from 'react'
import { useUsuarios } from '../hooks/useUsuarios'

type UsuariosScreenProps = {
  onLogout: () => void
  onProfile: () => void
}

function UsuariosScreen({ onLogout, onProfile }: UsuariosScreenProps) {
  const { usuarios, status, error, cargar } = useUsuarios()

  useEffect(() => {
    if (status === 'idle') {
      void cargar()
    }
  }, [cargar, status])

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              Kayro · Administración
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              Usuarios registrados
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Consulta las cuentas registradas en la plataforma.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onProfile}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Mi perfil
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="font-semibold text-slate-900">Directorio</h2>
              {status === 'succeeded' && (
                <p className="mt-1 text-sm text-slate-500">
                  {usuarios.length} {usuarios.length === 1 ? 'usuario' : 'usuarios'}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => void cargar()}
              disabled={status === 'loading'}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'loading' ? 'Cargando…' : 'Actualizar'}
            </button>
          </div>

          {status === 'loading' && (
            <p role="status" className="px-5 py-10 text-center text-sm text-slate-500">
              Cargando usuarios…
            </p>
          )}

          {status === 'failed' && (
            <div className="px-5 py-8 text-center">
              <p role="alert" className="text-sm text-red-700">{error}</p>
              <button
                type="button"
                onClick={() => void cargar()}
                className="mt-4 rounded-lg bg-[var(--primario)] px-4 py-2 text-sm font-semibold text-white"
              >
                Reintentar
              </button>
            </div>
          )}

          {status === 'succeeded' && usuarios.length === 0 && (
            <p className="px-5 py-10 text-center text-sm text-slate-500">
              No hay usuarios registrados.
            </p>
          )}

          {status === 'succeeded' && usuarios.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold">Nombre</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Usuario</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Correo electrónico</th>
                    <th scope="col" className="px-5 py-3 font-semibold">ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {usuarios.map((usuario, index) => (
                    <tr key={usuario.id ?? `${usuario.username}-${index}`} className="text-slate-700">
                      <td className="px-5 py-4 font-medium text-slate-900">
                        {[usuario.nombre, usuario.apellidos].filter(Boolean).join(' ') ||
                          usuario.username ||
                          'Sin nombre'}
                      </td>
                      <td className="px-5 py-4">{usuario.username || '—'}</td>
                      <td className="px-5 py-4">{usuario.email || '—'}</td>
                      <td className="px-5 py-4">{usuario.id ?? '—'}</td>
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
