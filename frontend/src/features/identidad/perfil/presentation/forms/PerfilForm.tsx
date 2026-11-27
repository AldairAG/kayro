import { useState, type FormEvent } from 'react'
import type { Perfil, PerfilFormValues } from '../../domain/perfil.types'

type PerfilFormProps = {
  perfil: Perfil | null
  submitting: boolean
  feedback: string
  feedbackIsError: boolean
  onChange: () => void
  onSubmit: (values: PerfilFormValues) => void
}

const emptyValues: PerfilFormValues = {
  nombre: '',
  apellidos: '',
  telefono: '',
  pais: '',
  lada: '',
}

function PerfilForm({
  perfil,
  submitting,
  feedback,
  feedbackIsError,
  onChange,
  onSubmit,
}: PerfilFormProps) {
  const [values, setValues] = useState<PerfilFormValues>(() =>
    perfil
      ? {
          nombre: perfil.nombre,
          apellidos: perfil.apellidos,
          telefono: perfil.telefono,
          pais: perfil.pais,
          lada: perfil.lada,
        }
      : emptyValues,
  )

  function updateField(field: keyof PerfilFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    onChange()
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit(values)
  }

  const inputClassName =
    'mt-2 h-12 w-full rounded-xl border border-[color-mix(in_srgb,var(--border)_35%,var(--background))] bg-(--background) px-4 text-sm text-(--text-primary) outline-none transition placeholder:text-[color-mix(in_srgb,var(--text-primary)_35%,var(--background))] hover:border-[color-mix(in_srgb,var(--border)_65%,var(--background))] focus:border-(--primario) focus:ring-4 focus:ring-[color-mix(in_srgb,var(--primario)_10%,transparent)]'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-(--text-primary)">
          Nombre
          <input
            name="nombre"
            autoComplete="given-name"
            required
            value={values.nombre}
            onChange={(event) => updateField('nombre', event.target.value)}
            className={inputClassName}
          />
        </label>
        <label className="text-sm font-medium text-(--text-primary)">
          Apellidos
          <input
            name="apellidos"
            autoComplete="family-name"
            required
            value={values.apellidos}
            onChange={(event) => updateField('apellidos', event.target.value)}
            className={inputClassName}
          />
        </label>
        <label className="text-sm font-medium text-(--text-primary)">
          Lada
          <input
            name="lada"
            type="tel"
            autoComplete="tel-country-code"
            placeholder="+52"
            value={values.lada}
            onChange={(event) => updateField('lada', event.target.value)}
            className={inputClassName}
          />
        </label>
        <label className="text-sm font-medium text-(--text-primary)">
          Teléfono
          <input
            name="telefono"
            type="tel"
            autoComplete="tel-national"
            value={values.telefono}
            onChange={(event) => updateField('telefono', event.target.value)}
            className={inputClassName}
          />
        </label>
        <label className="text-sm font-medium text-(--text-primary) sm:col-span-2">
          País
          <input
            name="pais"
            autoComplete="country-name"
            value={values.pais}
            onChange={(event) => updateField('pais', event.target.value)}
            className={inputClassName}
          />
        </label>
      </div>

      {feedback && (
        <p
          role={feedbackIsError ? 'alert' : 'status'}
          className={`rounded-xl px-4 py-3 text-sm ${
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
        className="flex h-12 w-full items-center justify-center rounded-xl bg-(--quinario) px-5 text-sm font-semibold text-(--background) transition hover:bg-(--secundario) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primario) disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? 'Guardando…' : 'Guardar perfil'}
      </button>
    </form>
  )
}

export default PerfilForm