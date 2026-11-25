import type { FormEvent } from 'react'
import AuthField from '../forms/AuthField'
import AuthLayout from '../components/AuthLayout'

type LoginScreenProps = {
  onRegister: () => void
  onForgotPassword: () => void
  onHome: () => void
  onSubmit: (credentials: { username: string; password: string; remember: boolean }) => void
  feedback: string
  feedbackIsError: boolean
  submitting: boolean
}

function LoginScreen({
  onRegister,
  onForgotPassword,
  onHome,
  onSubmit,
  feedback,
  feedbackIsError,
  submitting,
}: LoginScreenProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    onSubmit({
      username: String(formData.get('username')),
      password: String(formData.get('password')),
      remember: formData.get('remember') === 'on',
    })
  }

  return (
    <AuthLayout
      eyebrow="Acceso a tu cuenta"
      title="Bienvenido de vuelta"
      description="Ingresa para consultar y gestionar tu portafolio de inversión."
      onHome={onHome}
      footer={
        <>
          ¿Aún no tienes una cuenta?{' '}
          <button type="button" onClick={onRegister} className="font-semibold text-(--primario) transition hover:text-(--secundario)">
            Crear cuenta
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthField
          id="login-email"
          name="username"
          label="Nombre de usuario"
          placeholder="Tu nombre de usuario"
          autoComplete="username"
        />
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label htmlFor="login-password" className="text-sm font-medium text-(--text-primary)">Contraseña</label>
            <button type="button" onClick={onForgotPassword} className="text-xs font-semibold text-(--primario) transition hover:text-(--secundario) sm:text-sm">
              ¿La olvidaste?
            </button>
          </div>
          <input
            id="login-password"
            name="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            autoComplete="current-password"
            required
            className="h-12 w-full rounded-xl border border-[color-mix(in_srgb,var(--border)_35%,var(--background))] bg-(--background) px-4 text-sm text-(--text-primary) outline-none transition placeholder:text-[color-mix(in_srgb,var(--text-primary)_35%,var(--background))] hover:border-[color-mix(in_srgb,var(--border)_65%,var(--background))] focus:border-(--primario) focus:ring-4 focus:ring-[color-mix(in_srgb,var(--primario)_10%,transparent)]"
          />
        </div>

        <label className="flex w-fit cursor-pointer items-center gap-2.5 text-sm text-[color-mix(in_srgb,var(--text-primary)_65%,var(--background))]">
          <input
            type="checkbox"
            name="remember"
            className="h-4 w-4 rounded border-(--border) accent-(--primario) focus:ring-(--primario)"
          />
          Mantener mi sesión iniciada
        </label>

        {feedback && (
          <p
            role={feedbackIsError ? 'alert' : 'status'}
            className={`rounded-xl px-4 py-3 text-sm leading-5 ${
              feedbackIsError
                ? 'bg-[color-mix(in_srgb,var(--error)_8%,var(--background))] text-(--error)'
                : 'bg-[color-mix(in_srgb,var(--primario)_6%,var(--background))] text-(--primario)'
            }`}
          >
            {feedback}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-(--quinario) px-5 text-sm font-semibold text-(--background) shadow-[0_8px_20px_-10px_color-mix(in_srgb,var(--quinario)_75%,transparent)] transition hover:bg-(--secundario) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primario) disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Iniciando sesión…' : 'Entrar a mi cuenta'}
          {!submitting && <span aria-hidden="true">→</span>}
        </button>
      </form>

      <div className="my-7 flex items-center gap-4 text-[10px] font-semibold tracking-[0.14em] text-[color-mix(in_srgb,var(--text-primary)_45%,var(--background))]">
        <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--border)_25%,var(--background))]" />
        ACCESO A TU BACKOFFICE
        <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--border)_25%,var(--background))]" />
      </div>
      <p className="text-center text-xs leading-5 text-[color-mix(in_srgb,var(--text-primary)_55%,var(--background))]">
        Al continuar, aceptas nuestros términos de servicio y aviso de privacidad.
      </p>
    </AuthLayout>
  )
}

export default LoginScreen
