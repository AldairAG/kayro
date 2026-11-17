import type { FormEvent } from 'react'
import AuthField from '../forms/AuthField'
import AuthLayout from '../components/AuthLayout'

type ForgotPasswordScreenProps = {
  onLogin: () => void
  onSubmit: () => void
  feedback: string
}

function ForgotPasswordScreen({ onLogin, onSubmit, feedback }: ForgotPasswordScreenProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <AuthLayout
      eyebrow="Recuperación de acceso"
      title="¿Olvidaste tu contraseña?"
      description="Escribe el correo asociado a tu cuenta. Te indicaremos cómo restablecer el acceso."
      footer={
        <>
          ¿Recordaste tu contraseña?{' '}
          <button type="button" onClick={onLogin} className="font-semibold text-brand-800 hover:text-accent-strong">
            Volver a iniciar sesión
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthField
          id="forgot-email"
          name="email"
          type="email"
          label="Correo electrónico"
          placeholder="nombre@empresa.com"
          autoComplete="email"
        />

        {feedback && <p role="status" className="rounded-xl bg-brand-50 px-4 py-3 text-sm leading-5 text-brand-800">{feedback}</p>}

        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-900 px-5 text-sm font-semibold text-white shadow-lg shadow-brand-900/15 transition hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
        >
          Enviar instrucciones
          <span aria-hidden="true">→</span>
        </button>
      </form>
    </AuthLayout>
  )
}

export default ForgotPasswordScreen
