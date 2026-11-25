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
    'mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--primario)] focus:ring-4 focus:ring-slate-100'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
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
        <label className="text-sm font-medium text-slate-700">
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
        <label className="text-sm font-medium text-slate-700">
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
        <label className="text-sm font-medium text-slate-700">
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
        <label className="text-sm font-medium text-slate-700 sm:col-span-2">
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
            feedbackIsError ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
          }`}
        >
          {feedback}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className="flex h-12 w-full items-center justify-center rounded-xl bg-[var(--primario)] px-5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? 'Guardando…' : 'Guardar perfil'}
      </button>
    </form>
  )
}

export default PerfilForm