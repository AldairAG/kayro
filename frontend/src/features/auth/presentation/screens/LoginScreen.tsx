import type { FormEvent } from 'react'
import AuthField from '../forms/AuthField'
import AuthLayout from '../components/AuthLayout'

type LoginScreenProps = {
  onRegister: () => void
  onForgotPassword: () => void
  onSubmit: () => void
  feedback: string
}

function LoginScreen({ onRegister, onForgotPassword, onSubmit, feedback }: LoginScreenProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <AuthLayout
      eyebrow="Bienvenido de nuevo"
      title="Inicia sesión"
      description="Ingresa tus datos para continuar con tu espacio de trabajo."
      footer={
        <>
          ¿Aún no tienes una cuenta?{' '}
          <button type="button" onClick={onRegister} className="font-semibold text-brand-800 hover:text-accent-strong">
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
            <label htmlFor="login-password" className="text-sm font-medium text-ink">Contraseña</label>
            <button type="button" onClick={onForgotPassword} className="text-xs font-semibold text-brand-800 hover:text-accent-strong sm:text-sm">
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
            className="h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-ink outline-none transition placeholder:text-muted/65 hover:border-brand-100 focus:border-brand-700 focus:ring-4 focus:ring-brand-100"
          />
        </div>

        <label className="flex w-fit cursor-pointer items-center gap-2.5 text-sm text-muted">
          <input
            type="checkbox"
            name="remember"
            className="h-4 w-4 rounded border-line accent-brand-800 focus:ring-brand-700"
          />
          Mantener mi sesión iniciada
        </label>

        {feedback && <p role="status" className="rounded-xl bg-brand-50 px-4 py-3 text-sm leading-5 text-brand-800">{feedback}</p>}

        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-900 px-5 text-sm font-semibold text-white shadow-lg shadow-brand-900/15 transition hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
        >
          Iniciar sesión
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <div className="my-7 flex items-center gap-4 text-xs text-muted">
        <span className="h-px flex-1 bg-line" />
        ACCESO SEGURO
        <span className="h-px flex-1 bg-line" />
      </div>
      <p className="text-center text-xs leading-5 text-muted">
        Al continuar, aceptas nuestros términos de servicio y aviso de privacidad.
      </p>
    </AuthLayout>
  )
}

export default LoginScreen
