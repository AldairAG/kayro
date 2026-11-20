import type { FormEvent } from 'react'
import AuthField from '../forms/AuthField'
import AuthLayout from '../components/AuthLayout'

type RegisterScreenProps = {
  onLogin: () => void
  onHome: () => void
  onSubmit: (credentials: { nombre: string; username: string; email: string; password: string }) => void
  feedback: string
  feedbackIsError: boolean
  submitting: boolean
}

function RegisterScreen({
  onLogin,
  onHome,
  onSubmit,
  feedback,
  feedbackIsError,
  submitting,
}: RegisterScreenProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    onSubmit({
      nombre: String(formData.get('name')),
      username: String(formData.get('username')),
      email: String(formData.get('email')),
      password: String(formData.get('password')),
    })
  }

  return (
    <AuthLayout
      eyebrow="Comienza hoy"
      title="Crea tu cuenta"
      description="Configura tu acceso y empieza a organizar tu negocio."
      onHome={onHome}
      footer={
        <>
          ¿Ya tienes una cuenta?{' '}
          <button type="button" onClick={onLogin} className="font-semibold text-[color-mix(in_srgb,var(--primario)_80%,white)] hover:text-[color-mix(in_srgb,var(--secundario)_85%,black)]">
            Inicia sesión
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthField
          id="register-name"
          name="name"
          label="Nombre completo"
          placeholder="Tu nombre"
          autoComplete="name"
        />
        <AuthField
          id="register-username"
          name="username"
          label="Nombre de usuario"
          placeholder="Elige un nombre de usuario"
          autoComplete="username"
          minLength={3}
        />
        <AuthField
          id="register-email"
          name="email"
          type="email"
          label="Correo electrónico"
          placeholder="nombre@empresa.com"
          autoComplete="email"
        />
        <AuthField
          id="register-password"
          name="password"
          type="password"
          label="Contraseña"
          placeholder="Al menos 8 caracteres"
          autoComplete="new-password"
          minLength={8}
        />

        <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-xs leading-5 text-[color-mix(in_srgb,var(--primario)_45%,white)]">
          <input
            type="checkbox"
            name="terms"
            required
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-[color-mix(in_srgb,var(--primario)_10%,white)] accent-[color-mix(in_srgb,var(--primario)_80%,white)] focus:ring-[color-mix(in_srgb,var(--primario)_65%,white)]"
          />
          <span>Acepto los términos de servicio y el aviso de privacidad.</span>
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
          {submitting ? 'Creando cuenta…' : 'Crear cuenta'}
          {!submitting && <span aria-hidden="true">→</span>}
        </button>
      </form>
    </AuthLayout>
  )
}

export default RegisterScreen
