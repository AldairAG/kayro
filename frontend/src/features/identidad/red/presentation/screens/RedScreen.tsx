import { useEffect } from 'react'
import { useRed } from '../hooks/useRed'

const niveles = Array.from({ length: 7 }, (_, index) => index + 1)

function RedScreen() {
  const { red, status, error, usuarioId, cargar } = useRed()

  useEffect(() => {
    if (usuarioId !== null && status === 'idle') {
      void cargar()
    }
  }, [cargar, status, usuarioId])

  return (
    <main className="min-h-[calc(100vh-4.5rem)] bg-(--surface) px-4 py-6 sm:px-8 sm:py-10">
      <div>
        <div className="mb-8 max-w-2xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--secundario)">
            Crecimiento de comunidad
          </p>
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-(--text-primary) sm:text-4xl">
            Mi red
          </h1>
          <p className="mt-3 text-sm leading-6 text-[color-mix(in_srgb,var(--text-primary)_65%,var(--background))] sm:text-base">
            Consulta las personas que forman parte de tu red de referidos.
          </p>
        </div>

        <section className="rounded-3xl border border-[color-mix(in_srgb,var(--border)_25%,var(--background))] bg-(--background) p-5 shadow-[0_20px_60px_-44px_color-mix(in_srgb,var(--quinario)_30%,transparent)] sm:p-7">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-(--secundario)">
                Tu comunidad
              </p>
              <h2 className="text-xl font-semibold tracking-tight text-(--text-primary)">
                Integrantes
              </h2>
              {status === 'succeeded' && (
                <p className="mt-1.5 text-sm text-[color-mix(in_srgb,var(--text-primary)_60%,var(--background))]">
                  {red.length} {red.length === 1 ? 'integrante' : 'integrantes'} en tu red
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => void cargar()}
              disabled={status === 'loading' || usuarioId === null}
              className="rounded-xl border border-[color-mix(in_srgb,var(--border)_35%,var(--background))] bg-(--background) px-4 py-2.5 text-sm font-semibold text-(--text-primary) transition hover:bg-(--surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primario) disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'loading' ? 'Cargando…' : 'Actualizar'}
            </button>
          </div>

          {usuarioId === null && (
            <p
              role="alert"
              className="rounded-2xl bg-[color-mix(in_srgb,var(--error)_8%,var(--background))] px-5 py-8 text-center text-sm leading-6 text-(--error)"
            >
              No se encontró el usuario de la sesión. Inicia sesión nuevamente para consultar tu red.
            </p>
          )}

          {usuarioId !== null && status === 'loading' && (
            <div role="status" className="flex flex-col items-center justify-center gap-3 py-12">
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-[color-mix(in_srgb,var(--primario)_18%,var(--background))] border-t-(--primario)" aria-hidden="true" />
              <p className="text-sm text-[color-mix(in_srgb,var(--text-primary)_60%,var(--background))]">
                Cargando tu red…
              </p>
            </div>
          )}

          {usuarioId !== null && status === 'failed' && (
            <div className="rounded-2xl bg-[color-mix(in_srgb,var(--error)_8%,var(--background))] px-5 py-8 text-center">
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

          {status === 'succeeded' && red.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[color-mix(in_srgb,var(--border)_45%,var(--background))] bg-(--surface) px-5 py-12 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--primario)_10%,var(--background))] text-lg font-bold text-(--primario)">
                K
              </span>
              <p className="mt-4 text-sm font-medium text-(--text-primary)">
                Aún no hay integrantes en tu red.
              </p>
            </div>
          )}

          {status === 'succeeded' && red.length > 0 && (
            <div className="space-y-7">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                {niveles.map((nivel) => {
                  const cantidad = red.filter((usuario) => usuario.nivel === nivel).length
                  return (
                    <div
                      key={nivel}
                      className="rounded-2xl border border-[color-mix(in_srgb,var(--border)_24%,var(--background))] bg-(--surface) px-3 py-4 text-center"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-[color-mix(in_srgb,var(--text-primary)_60%,var(--background))]">
                        Nivel {nivel}
                      </p>
                      <p className="mt-2 text-2xl font-semibold tracking-tight text-(--quinario)">
                        {cantidad}
                      </p>
                    </div>
                  )
                })}
              </div>

              <div className="overflow-x-auto rounded-2xl border border-[color-mix(in_srgb,var(--border)_25%,var(--background))]">
                <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                  <thead className="bg-(--surface) text-[10px] uppercase tracking-[0.12em] text-[color-mix(in_srgb,var(--text-primary)_60%,var(--background))]">
                    <tr>
                      <th scope="col" className="px-5 py-3.5 font-semibold">Nombre</th>
                      <th scope="col" className="px-5 py-3.5 font-semibold">Usuario</th>
                      <th scope="col" className="px-5 py-3.5 font-semibold">Nivel</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[color-mix(in_srgb,var(--border)_20%,var(--background))]">
                    {red.map((usuario) => (
                      <tr
                        key={usuario.id}
                        className="text-[color-mix(in_srgb,var(--text-primary)_75%,var(--background))] transition-colors hover:bg-(--surface)"
                      >
                        <td className="px-5 py-4 font-medium text-(--text-primary)">
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
