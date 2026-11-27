import { useEffect, useState } from 'react'

type LicenseOption = {
  id: string
  name: string
  description: string
  price: number
  benefits: string[]
  available: boolean
  featured?: boolean
}

const licenseOptions: LicenseOption[] = [
  {
    id: 'inicio',
    name: 'Inicio',
    description: 'El primer paso para comenzar a crecer.',
    price: 25,
    benefits: ['Acceso a la plataforma', 'Licencia personal', 'Soporte estándar'],
    available: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Más herramientas para impulsar tu actividad.',
    price: 75,
    benefits: ['Acceso a la plataforma', 'Licencia personal', 'Soporte prioritario'],
    available: true,
    featured: true,
  },
  {
    id: 'elite',
    name: 'Élite',
    description: 'Una opción avanzada para equipos en expansión.',
    price: 150,
    benefits: ['Acceso a la plataforma', 'Licencia de equipo', 'Atención preferente'],
    available: false,
  },
]

const walletAddress = import.meta.env.VITE_USDT_WALLET_ADDRESS?.trim() ?? ''

function LicenciasScreen() {
  const [selectedLicense, setSelectedLicense] = useState<LicenseOption | null>(null)
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    if (!selectedLicense) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedLicense(null)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [selectedLicense])

  const openPurchase = (license: LicenseOption) => {
    setCopied(false)
    setCopyError('')
    setConfirmed(false)
    setSelectedLicense(license)
  }

  const copyWalletAddress = async () => {
    if (!walletAddress) return

    try {
      await navigator.clipboard.writeText(walletAddress)
      setCopied(true)
      setCopyError('')
    } catch {
      setCopyError('No se pudo copiar. Selecciona y copia la dirección manualmente.')
    }
  }

  return (
    <main className="min-h-[calc(100vh-4.5rem)] bg-(--surface) px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-9 max-w-2xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--secundario)">
            Planes para tu cuenta
          </p>
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-(--text-primary) sm:text-4xl">
            Compra de licencias
          </h1>
          <p className="mt-3 text-sm leading-6 text-[color-mix(in_srgb,var(--text-primary)_65%,var(--background))] sm:text-base">
            Elige la licencia que mejor se adapte a ti. Todas las compras se realizan
            exclusivamente en USDT.
          </p>
        </header>

        <section aria-label="Licencias disponibles" className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {licenseOptions.map((license) => (
            <article
              key={license.id}
              className={`relative flex flex-col rounded-3xl border bg-(--background) p-6 shadow-[0_20px_60px_-44px_color-mix(in_srgb,var(--quinario)_30%,transparent)] transition sm:p-7 ${
                license.available
                  ? 'border-[color-mix(in_srgb,var(--border)_30%,var(--background))]'
                  : 'border-dashed border-[color-mix(in_srgb,var(--border)_55%,var(--background))] opacity-70'
              }`}
            >
              {license.featured && (
                <span className="absolute right-5 top-5 rounded-full bg-[color-mix(in_srgb,var(--terciario)_24%,var(--background))] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-(--secundario)">
                  Recomendada
                </span>
              )}
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--terciario)_20%,var(--background))] text-(--secundario)">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-6 w-6"
                >
                  <path d="M4 8.5 12 4l8 4.5-8 4.5-8-4.5Z" />
                  <path d="M4 12.5 12 17l8-4.5M4 16.5 12 21l8-4.5" />
                </svg>
              </div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-(--text-primary)">
                    {license.name}
                  </h2>
                  <p className="mt-2 min-h-10 text-sm leading-5 text-[color-mix(in_srgb,var(--text-primary)_62%,var(--background))]">
                    {license.description}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                    license.available
                      ? 'bg-[color-mix(in_srgb,var(--primario)_12%,var(--background))] text-(--secundario)'
                      : 'bg-(--surface) text-[color-mix(in_srgb,var(--text-primary)_55%,var(--background))]'
                  }`}
                >
                  {license.available ? 'Disponible' : 'Próximamente'}
                </span>
              </div>

              <p className="mt-7 text-3xl font-semibold tracking-tight text-(--text-primary)">
                {license.price}
                <span className="ml-2 text-sm font-semibold text-[color-mix(in_srgb,var(--text-primary)_55%,var(--background))]">
                  USDT
                </span>
              </p>

              <ul className="my-6 flex-1 space-y-3 border-t border-(--border)/25 pt-5">
                {license.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2.5 text-sm text-(--text-primary)">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--primario)_12%,var(--background))] text-(--secundario)">
                      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-3.5 w-3.5">
                        <path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                disabled={!license.available}
                onClick={() => openPurchase(license)}
                className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primario) ${
                  license.available
                    ? 'bg-(--quinario) text-(--background) hover:bg-(--secundario)'
                    : 'cursor-not-allowed bg-(--surface) text-[color-mix(in_srgb,var(--text-primary)_45%,var(--background))]'
                }`}
              >
                {license.available ? 'Comprar licencia' : 'No disponible'}
              </button>
            </article>
          ))}
        </section>

        <aside className="mt-8 rounded-3xl border border-[color-mix(in_srgb,var(--info)_16%,var(--background))] bg-[color-mix(in_srgb,var(--info)_5%,var(--background))] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-(--background) text-(--info)">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v5m0-8h.01" />
              </svg>
            </span>
            <div>
              <h2 className="text-sm font-semibold text-(--text-primary)">Información importante</h2>
              <p className="mt-1.5 text-sm leading-6 text-[color-mix(in_srgb,var(--text-primary)_68%,var(--background))]">
                El único medio de pago aceptado es USDT. Verifica los datos y la dirección
                configurada antes de transferir: los envíos a una dirección incorrecta no
                se pueden revertir. La disponibilidad de las licencias puede cambiar.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {selectedLicense && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedLicense(null)
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="purchase-dialog-title"
            className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-(--background) p-5 shadow-2xl sm:rounded-3xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-(--secundario)">
                  Resumen de compra
                </p>
                <h2 id="purchase-dialog-title" className="mt-2 text-xl font-semibold tracking-tight text-(--text-primary)">
                  Licencia {selectedLicense.name}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Cerrar resumen de compra"
                onClick={() => setSelectedLicense(null)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-(--text-primary) transition hover:bg-(--surface) focus-visible:outline-2 focus-visible:outline-(--primario)"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="h-5 w-5">
                  <path d="m18 6-12 12M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-6 rounded-2xl bg-(--surface) p-4">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-[color-mix(in_srgb,var(--text-primary)_65%,var(--background))]">
                  {selectedLicense.name}
                </span>
                <span className="font-semibold text-(--text-primary)">{selectedLicense.price} USDT</span>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4 border-t border-(--border)/30 pt-4">
                <span className="text-sm font-semibold text-(--text-primary)">Monto a depositar</span>
                <span className="text-lg font-bold text-(--secundario)">{selectedLicense.price} USDT</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-(--text-primary)">Información de pago</h3>
              <p className="mt-1 text-sm leading-5 text-[color-mix(in_srgb,var(--text-primary)_60%,var(--background))]">
                Envía exactamente el monto indicado en USDT a la dirección de wallet configurada.
              </p>
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-[color-mix(in_srgb,var(--text-primary)_68%,var(--background))]">
                    Dirección de wallet USDT
                  </span>
                  {!walletAddress && (
                    <span className="text-[10px] font-semibold text-(--error)">Pendiente de configuración</span>
                  )}
                </div>
                <div className="flex min-h-12 items-center gap-2 rounded-xl border border-(--border)/40 bg-(--background) p-2">
                  <code className="min-w-0 flex-1 break-all px-2 text-xs leading-5 text-(--text-primary)">
                    {walletAddress || 'La dirección USDT se configurará próximamente'}
                  </code>
                  <button
                    type="button"
                    disabled={!walletAddress}
                    onClick={copyWalletAddress}
                    className="shrink-0 rounded-lg bg-(--surface) px-3 py-2 text-xs font-semibold text-(--text-primary) transition hover:bg-(--border)/25 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {copied ? 'Copiada' : 'Copiar'}
                  </button>
                </div>
                {copyError && <p role="alert" className="mt-2 text-xs text-(--error)">{copyError}</p>}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-[color-mix(in_srgb,var(--premium)_35%,var(--background))] bg-[color-mix(in_srgb,var(--premium)_8%,var(--background))] px-4 py-3">
              <span className="text-sm font-medium text-(--text-primary)">Estado de la solicitud</span>
              <span className="rounded-full bg-(--background) px-3 py-1 text-xs font-semibold text-[color-mix(in_srgb,var(--text-primary)_72%,var(--background))]">
                {confirmed ? 'Confirmación local' : 'Pendiente de pago'}
              </span>
            </div>

            <p className="mt-3 text-xs leading-5 text-[color-mix(in_srgb,var(--text-primary)_58%,var(--background))]">
              La confirmación es solo visual en esta pantalla; no se procesa el pago ni se
              envía una solicitud al servidor.
            </p>
            <button
              type="button"
              onClick={() => setConfirmed(true)}
              disabled={confirmed}
              className="mt-5 w-full rounded-xl bg-(--quinario) px-4 py-3 text-sm font-semibold text-(--background) transition hover:bg-(--secundario) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primario) disabled:cursor-default disabled:opacity-65"
            >
              {confirmed ? 'Solicitud confirmada en esta sesión' : 'Confirmar solicitud'}
            </button>
          </section>
        </div>
      )}
    </main>
  )
}

export default LicenciasScreen