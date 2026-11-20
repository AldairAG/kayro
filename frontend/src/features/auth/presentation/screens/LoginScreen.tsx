import type { FormEvent } from 'react'
import AuthField from '../forms/AuthField'
import AuthLayout from '../components/AuthLayout'

type LoginScreenProps = {
  onRegister: () => void
  onForgotPassword: () => void
  onHome: () => void
  onSubmit: (credentials: { email: string; password: string; remember: boolean }) => void
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
      email: String(formData.get('email')),
      password: String(formData.get('password')),
      remember: formData.get('remember') === 'on',
    })
  }

  return (
    <AuthLayout
      eyebrow="Bienvenido de nuevo"
      title="Inicia sesión"
      description="Ingresa tus datos para continuar con tu espacio de trabajo."
      onHome={onHome}
      footer={
        <>
          ¿Aún no tienes una cuenta?{' '}
          <button type="button" onClick={onRegister} className="font-semibold text-[color-mix(in_srgb,var(--primario)_80%,white)] hover:text-[color-mix(in_srgb,var(--secundario)_85%,black)]">
            Crear cuenta
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthField
          id="login-email"
          name="email"
          type="email"
          label="Correo electrónico"
          placeholder="nombre@empresa.com"
          autoComplete="email"
        />
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label htmlFor="login-password" className="text-sm font-medium text-[color-mix(in_srgb,var(--primario)_15%,black)]">Contraseña</label>
            <button type="button" onClick={onForgotPassword} className="text-xs font-semibold text-[color-mix(in_srgb,var(--primario)_80%,white)] hover:text-[color-mix(in_srgb,var(--secundario)_85%,black)] sm:text-sm">
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
            className="h-12 w-full rounded-xl border border-[color-mix(in_srgb,var(--primario)_10%,white)] bg-white px-4 text-sm text-[color-mix(in_srgb,var(--primario)_15%,black)] outline-none transition placeholder:text-[color-mix(in_srgb,var(--primario)_30%,white)] hover:border-[color-mix(in_srgb,var(--primario)_12%,white)] focus:border-[color-mix(in_srgb,var(--primario)_65%,white)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--primario)_5%,white)]"
          />
        </div>

        <label className="flex w-fit cursor-pointer items-center gap-2.5 text-sm text-[color-mix(in_srgb,var(--primario)_45%,white)]">
          <input
            type="checkbox"
            name="remember"
            className="h-4 w-4 rounded border-[color-mix(in_srgb,var(--primario)_10%,white)] accent-[color-mix(in_srgb,var(--primario)_80%,white)] focus:ring-[color-mix(in_srgb,var(--primario)_65%,white)]"
          />
          Mantener mi sesión iniciada
        </label>

        {feedback && (
          <p
            role={feedbackIsError ? 'alert' : 'status'}
            className={`rounded-xl px-4 py-3 text-sm leading-5 ${
              feedbackIsError
                ? 'bg-red-50 text-red-700'
                : 'bg-[color-mix(in_srgb,var(--primario)_5%,white)] text-[color-mix(in_srgb,var(--primario)_80%,white)]'
            }`}
          >
            {feedback}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--primario)] px-5 text-sm font-semibold text-white shadow-lg transition hover:bg-[color-mix(in_srgb,var(--primario)_80%,white)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_srgb,var(--primario)_65%,white)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Iniciando sesión…' : 'Iniciar sesión'}
          {!submitting && <span aria-hidden="true">→</span>}
        </button>
      </form>

      <div className="my-7 flex items-center gap-4 text-xs text-[color-mix(in_srgb,var(--primario)_45%,white)]">
        <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--primario)_10%,white)]" />
        ACCESO SEGURO
        <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--primario)_10%,white)]" />
      </div>
      <p className="text-center text-xs leading-5 text-[color-mix(in_srgb,var(--primario)_45%,white)]">
        Al continuar, aceptas nuestros términos de servicio y aviso de privacidad.
      </p>
    </AuthLayout>
  )
}

export default LoginScreen
