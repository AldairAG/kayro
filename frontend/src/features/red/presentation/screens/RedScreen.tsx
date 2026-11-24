import { useEffect } from 'react'
import { useRed } from '../hooks/useRed'

type RedScreenProps = {
  onBack: () => void
  onLogout: () => void
}

const niveles = Array.from({ length: 7 }, (_, index) => index + 1)

function RedScreen({ onBack, onLogout }: RedScreenProps) {
  const { red, status, error, usuarioId, cargar } = useRed()

  useEffect(() => {
    if (usuarioId !== null && status === 'idle') {
      void cargar()
    }
  }, [cargar, status, usuarioId])

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              Kayro
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              Mi red
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Consulta las personas que forman parte de tu red de referidos.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onBack}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Volver al perfil
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

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Integrantes</h2>
              {status === 'succeeded' && (
                <p className="mt-1 text-sm text-slate-500">
                  {red.length} {red.length === 1 ? 'integrante' : 'integrantes'} en tu red
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => void cargar()}
              disabled={status === 'loading' || usuarioId === null}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'loading' ? 'Cargando…' : 'Actualizar'}
            </button>
          </div>

          {usuarioId === null && (
            <p role="alert" className="py-8 text-center text-sm text-red-700">
              No se encontró el usuario de la sesión. Inicia sesión nuevamente para consultar tu red.
            </p>
          )}

          {usuarioId !== null && status === 'loading' && (
            <p role="status" className="py-10 text-center text-sm text-slate-500">
              Cargando tu red…
            </p>
          )}

          {usuarioId !== null && status === 'failed' && (
            <div className="py-8 text-center">
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

          {status === 'succeeded' && red.length === 0 && (
            <p className="py-10 text-center text-sm text-slate-500">
              Aún no hay integrantes en tu red.
            </p>
          )}

          {status === 'succeeded' && red.length > 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                {niveles.map((nivel) => {
                  const cantidad = red.filter((usuario) => usuario.nivel === nivel).length
                  return (
                    <div
                      key={nivel}
                      className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-4 text-center"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Nivel {nivel}
                      </p>
                      <p className="mt-1 text-2xl font-semibold text-slate-900">{cantidad}</p>
                    </div>
                  )
                })}
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-100">
                <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th scope="col" className="px-5 py-3 font-semibold">Nombre</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Usuario</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Nivel</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {red.map((usuario) => (
                      <tr key={usuario.id} className="text-slate-700">
                        <td className="px-5 py-4 font-medium text-slate-900">
                          {[usuario.nombre, usuario.apellidos].filter(Boolean).join(' ') ||
                            usuario.username ||
                            'Sin nombre'}
                        </td>
                        <td className="px-5 py-4">{usuario.username || '—'}</td>
                        <td className="px-5 py-4">Nivel {usuario.nivel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default RedScreen
