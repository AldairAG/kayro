import { useState, type ChangeEvent } from 'react'

const documents = [
  { id: 'idFront', label: 'Identificación oficial · frente' },
  { id: 'idBack', label: 'Identificación oficial · reverso' },
  { id: 'proofOfAddress', label: 'Comprobante de domicilio' },
] as const

type DocumentId = (typeof documents)[number]['id']
type DocumentNames = Partial<Record<DocumentId, string>>
type DocumentErrors = Partial<Record<DocumentId, string>>

const acceptedTypes = ['application/pdf', 'image/jpeg', 'image/png']
const maxFileSize = 10 * 1024 * 1024

function KycVerificationCard() {
  const [fileNames, setFileNames] = useState<DocumentNames>({})
  const [errors, setErrors] = useState<DocumentErrors>({})
  const selectedCount = documents.filter(({ id }) => fileNames[id]).length

  function handleFileChange(id: DocumentId, event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0]
    if (!file) return

    if (!acceptedTypes.includes(file.type)) {
      setErrors((current) => ({ ...current, [id]: 'Elige un archivo PDF, JPG o PNG.' }))
      setFileNames((current) => {
        const next = { ...current }
        delete next[id]
        return next
      })
      event.currentTarget.value = ''
      return
    }

    if (file.size > maxFileSize) {
      setErrors((current) => ({ ...current, [id]: 'El archivo no debe superar 10 MB.' }))
      setFileNames((current) => {
        const next = { ...current }
        delete next[id]
        return next
      })
      event.currentTarget.value = ''
      return
    }

    setErrors((current) => ({ ...current, [id]: undefined }))
    setFileNames((current) => ({ ...current, [id]: file.name }))
  }

  return (
    <section
      aria-labelledby="kyc-heading"
      className="rounded-3xl border border-[color-mix(in_srgb,var(--border)_25%,var(--background))] bg-(--background) p-6 shadow-[0_20px_60px_-44px_color-mix(in_srgb,var(--quinario)_30%,transparent)] sm:p-8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-(--secundario)">
            Verificación de identidad
          </p>
          <h2 id="kyc-heading" className="text-xl font-semibold tracking-tight text-(--text-primary)">
            Verificación KYC
          </h2>
          <p className="mt-2 text-sm leading-6 text-[color-mix(in_srgb,var(--text-primary)_60%,var(--background))]">
            Prepara tus documentos para verificar tu identidad.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[color-mix(in_srgb,var(--premium)_18%,var(--background))] px-3 py-1.5 text-xs font-semibold text-(--text-primary)">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-(--premium)" />
          No verificado
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {documents.map(({ id, label }) => (
          <div key={id}>
            <label htmlFor={`kyc-${id}`} className="text-sm font-medium text-(--text-primary)">
              {label}
            </label>
            <input
              id={`kyc-${id}`}
              name={id}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
              aria-describedby={errors[id] ? `kyc-${id}-error` : `kyc-${id}-help`}
              aria-invalid={Boolean(errors[id])}
              onChange={(event) => handleFileChange(id, event)}
              className="mt-2 block w-full cursor-pointer rounded-xl border border-[color-mix(in_srgb,var(--border)_35%,var(--background))] bg-(--background) text-sm text-(--text-primary) file:mr-4 file:cursor-pointer file:border-0 file:bg-(--surface) file:px-4 file:py-3 file:text-sm file:font-semibold file:text-(--text-primary) hover:border-[color-mix(in_srgb,var(--border)_65%,var(--background))] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primario)"
            />
            {errors[id] ? (
              <p id={`kyc-${id}-error`} role="alert" className="mt-2 text-xs text-(--error)">
                {errors[id]}
              </p>
            ) : (
              <p id={`kyc-${id}-help`} className="mt-2 text-xs text-[color-mix(in_srgb,var(--text-primary)_55%,var(--background))]">
                {fileNames[id] ? `Seleccionado: ${fileNames[id]}` : 'PDF, JPG o PNG · Máximo 10 MB'}
              </p>
            )}
          </div>
        ))}
      </div>

      <p role="status" className="mt-5 text-sm text-[color-mix(in_srgb,var(--text-primary)_65%,var(--background))]">
        {selectedCount} de {documents.length} documentos seleccionados.
      </p>
      <p className="mt-3 rounded-xl bg-(--surface) px-4 py-3 text-xs leading-5 text-[color-mix(in_srgb,var(--text-primary)_65%,var(--background))]">
        El envío de documentos aún no está disponible. Los archivos seleccionados no se
        cargan ni se guardan; la verificación permanece sin completar.
      </p>
    </section>
  )
}

export default KycVerificationCard
