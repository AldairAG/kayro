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
      eyebrow="Crea tu espacio de inversión"
      title="Empieza con Kayro"
      description="Regístrate para explorar y gestionar tus inversiones desde un solo lugar."
      onHome={onHome}
      footer={
        <>
          ¿Ya tienes una cuenta?{' '}
          <button type="button" onClick={onLogin} className="font-semibold text-(--primario) transition hover:text-(--secundario)">
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

        <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-xs leading-5 text-[color-mix(in_srgb,var(--text-primary)_65%,var(--background))]">
          <input
            type="checkbox"
            name="terms"
            required
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-(--border) accent-(--primario) focus:ring-(--primario)"
          />
          <span>Acepto los términos de servicio y el aviso de privacidad.</span>
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
          {submitting ? 'Creando cuenta…' : 'Crear cuenta'}
          {!submitting && <span aria-hidden="true">→</span>}
        </button>
      </form>
    </AuthLayout>
  )
}

export default RegisterScreen
