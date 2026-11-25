import { useSelector } from 'react-redux'
import type { RootState } from '../../../../store'
import PerfilForm from '../forms/PerfilForm'
import { usePerfil } from '../hooks/usePerfil'

type PerfilScreenProps = {
  onLogout: () => void
  onRed: () => void
}

function PerfilScreen({ onLogout, onRed }: PerfilScreenProps) {
  const email = useSelector((state: RootState) => state.auth.user?.email ?? '')
  const { perfil, status, error, actualizar, clearFeedback } = usePerfil()
  const feedback =
    status === 'succeeded' ? 'Tu perfil se actualizó correctamente.' : error ?? ''

  return (
    <main className="min-h-screen bg-(--surface) px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-(--quinario) text-lg font-bold text-(--terciario)">
              K
            </span>
            <div>
              <p className="text-lg font-bold tracking-tight text-(--quinario)">kayro</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--text-primary)_55%,var(--background))]">
                Backoffice de inversión
              </p>
            </div>
          </div>
          <nav aria-label="Navegación de cuenta" className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onRed}
              className="rounded-xl bg-(--quinario) px-4 py-2.5 text-sm font-semibold text-(--background) transition hover:bg-(--secundario) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primario)"
            >
              Mi red
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-xl border border-[color-mix(in_srgb,var(--border)_35%,var(--background))] bg-(--background) px-4 py-2.5 text-sm font-semibold text-(--text-primary) transition hover:bg-(--surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primario)"
            >
              Cerrar sesión
            </button>
          </nav>
        </header>

        <div className="mb-8 max-w-2xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--secundario)">
            Espacio personal
          </p>
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-(--text-primary) sm:text-4xl">
            Perfil de inversionista
          </h1>
          <p className="mt-3 text-sm leading-6 text-[color-mix(in_srgb,var(--text-primary)_65%,var(--background))] sm:text-base">
            Administra tu información personal y los datos de tu cuenta.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <section className="relative overflow-hidden rounded-3xl bg-(--quinario) p-6 text-(--background) shadow-[0_24px_60px_-40px_color-mix(in_srgb,var(--quinario)_60%,transparent)] sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-[color-mix(in_srgb,var(--background)_8%,transparent)]" />
            <div className="pointer-events-none absolute -right-8 -top-12 h-40 w-40 rounded-full border border-[color-mix(in_srgb,var(--background)_8%,transparent)]" />
            <div className="relative">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--background)_60%,transparent)]">
                Cuenta Kayro
              </p>
              <div className="mt-6 grid h-14 w-14 place-items-center rounded-2xl bg-(--terciario) text-xl font-bold text-(--quinario)">
                K
              </div>
              <h2 className="mt-5 text-xl font-semibold tracking-tight">Datos de acceso</h2>

              <div className="mt-6 border-t border-[color-mix(in_srgb,var(--background)_12%,transparent)] pt-5">
                <p className="text-xs text-[color-mix(in_srgb,var(--background)_55%,transparent)]">
                  Correo electrónico
                </p>
                <p className="mt-2 break-all text-sm font-medium text-(--background)">
                  {email || 'No disponible'}
                </p>
              </div>
              {perfil?.username && (
                <div className="mt-5 border-t border-[color-mix(in_srgb,var(--background)_12%,transparent)] pt-5">
                  <p className="text-xs text-[color-mix(in_srgb,var(--background)_55%,transparent)]">
                    Nombre de usuario
                  </p>
                  <p className="mt-2 break-all text-sm font-medium text-(--background)">
                    {perfil.username}
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-[color-mix(in_srgb,var(--border)_25%,var(--background))] bg-(--background) p-6 shadow-[0_20px_60px_-44px_color-mix(in_srgb,var(--quinario)_30%,transparent)] sm:p-8">
            <div className="mb-7">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-(--secundario)">
                Información de cuenta
              </p>
              <h2 className="text-xl font-semibold tracking-tight text-(--text-primary)">
                Información personal
              </h2>
              <p className="mt-2 text-sm leading-6 text-[color-mix(in_srgb,var(--text-primary)_60%,var(--background))]">
                Completa o actualiza los datos asociados a tu perfil.
              </p>
            </div>
            <PerfilForm
              perfil={perfil}
              submitting={status === 'loading'}
              feedback={feedback}
              feedbackIsError={status === 'failed'}
              onChange={clearFeedback}
              onSubmit={(values) => actualizar(values)}
            />
          </section>
        </div>
      </div>
    </main>
  )
}

export default PerfilScreen