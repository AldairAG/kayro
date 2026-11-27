import type { FormEvent } from 'react'
import AuthField from '../forms/AuthField'
import AuthLayout from '../components/AuthLayout'

type ForgotPasswordScreenProps = {
  onLogin: () => void
  onHome: () => void
  onSubmit: (email: string) => void
  feedback: string
  feedbackIsError: boolean
}

function ForgotPasswordScreen({ onLogin, onHome, onSubmit, feedback, feedbackIsError }: ForgotPasswordScreenProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    onSubmit(String(formData.get('email')))
  }

  return (
    <AuthLayout
      eyebrow="Recuperación de acceso"
      title="¿Olvidaste tu contraseña?"
      description="Escribe el correo asociado a tu cuenta. Te indicaremos cómo restablecer el acceso."
      onHome={onHome}
      footer={
        <>
          ¿Recordaste tu contraseña?{' '}
          <button type="button" onClick={onLogin} className="font-semibold text-[color-mix(in_srgb,var(--primario)_80%,white)] hover:text-[color-mix(in_srgb,var(--secundario)_85%,black)]">
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
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--primario)] px-5 text-sm font-semibold text-white shadow-lg transition hover:bg-[color-mix(in_srgb,var(--primario)_80%,white)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_srgb,var(--primario)_65%,white)]"
        >
          Enviar instrucciones
          <span aria-hidden="true">→</span>
        </button>
      </form>
    </AuthLayout>
  )
}

export default ForgotPasswordScreen
