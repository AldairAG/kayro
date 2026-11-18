import type { FormEvent } from 'react'
import AuthField from '../forms/AuthField'
import AuthLayout from '../components/AuthLayout'

type RegisterScreenProps = {
  onLogin: () => void
  onSubmit: () => void
  feedback: string
}

function RegisterScreen({ onLogin, onSubmit, feedback }: RegisterScreenProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <AuthLayout
      eyebrow="Comienza hoy"
      title="Crea tu cuenta"
      description="Configura tu acceso y empieza a organizar tu negocio."
      footer={
        <>
          ¿Ya tienes una cuenta?{' '}
          <button type="button" onClick={onLogin} className="font-semibold text-brand-800 hover:text-accent-strong">
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

        <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-xs leading-5 text-muted">
          <input
            type="checkbox"
            name="terms"
            required
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-line accent-brand-800 focus:ring-brand-700"
          />
          <span>Acepto los términos de servicio y el aviso de privacidad.</span>
        </label>

        {feedback && <p role="status" className="rounded-xl bg-brand-50 px-4 py-3 text-sm leading-5 text-brand-800">{feedback}</p>}

        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-900 px-5 text-sm font-semibold text-white shadow-lg shadow-brand-900/15 transition hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
        >
          Crear cuenta
          <span aria-hidden="true">→</span>
        </button>
      </form>
    </AuthLayout>
  )
}

export default RegisterScreen
