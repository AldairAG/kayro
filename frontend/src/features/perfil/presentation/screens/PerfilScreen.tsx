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
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              Kayro
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              Mi perfil
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Administra tu información personal y los datos de tu cuenta.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onRed}
              className="rounded-xl bg-[var(--primario)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Mi red
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

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Cuenta</h2>
          <p className="mt-1 text-sm text-slate-500">Correo electrónico</p>
          <p className="mt-1 break-all text-sm font-medium text-slate-800">
            {email || 'No disponible'}
          </p>
          {perfil?.username && (
            <p className="mt-2 text-sm text-slate-600">Usuario: {perfil.username}</p>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Información personal</h2>
            <p className="mt-1 text-sm text-slate-500">
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
    </main>
  )
}

export default PerfilScreen