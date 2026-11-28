import { useEffect, useState } from 'react'

type PaymentStatus = 'pending' | 'approved' | 'completed' | 'rejected'
type PaymentStatusFilter = PaymentStatus | 'all'
type PaymentTypeFilter = 'all' | 'USDT'
type PageSize = 5 | 10 | 25 | 50

type PaymentRequest = {
  id: string
  username: string
  email: string
  license: 'Inicio' | 'Pro'
  amount: number
  status: PaymentStatus
  submittedAt: string
  reference: string
  currency: 'USDT'
}

const demoPayments: PaymentRequest[] = [
  {
    id: 'DEMO-1042',
    username: 'lucia.demo',
    email: 'lucia.ejemplo@kayro.test',
    license: 'Inicio',
    amount: 25,
    status: 'pending',
    submittedAt: '2026-11-25T10:20:00',
    reference: 'DEMO-REF-1042',
    currency: 'USDT',
  },
  {
    id: 'DEMO-1041',
    username: 'marcos.demo',
    email: 'marcos.ejemplo@kayro.test',
    license: 'Pro',
    amount: 75,
    status: 'pending',
    submittedAt: '2026-11-24T16:45:00',
    reference: 'DEMO-REF-1041',
    currency: 'USDT',
  },
  {
    id: 'DEMO-1040',
    username: 'ana.demo',
    email: 'ana.ejemplo@kayro.test',
    license: 'Inicio',
    amount: 25,
    status: 'approved',
    submittedAt: '2026-11-23T09:10:00',
    reference: 'DEMO-REF-1040',
    currency: 'USDT',
  },
  {
    id: 'DEMO-1039',
    username: 'diego.demo',
    email: 'diego.ejemplo@kayro.test',
    license: 'Pro',
    amount: 75,
    status: 'completed',
    submittedAt: '2026-11-22T13:30:00',
    reference: 'DEMO-REF-1039',
    currency: 'USDT',
  },
  {
    id: 'DEMO-1038',
    username: 'sofia.demo',
    email: 'sofia.ejemplo@kayro.test',
    license: 'Inicio',
    amount: 25,
    status: 'rejected',
    submittedAt: '2026-11-21T11:05:00',
    reference: 'DEMO-REF-1038',
    currency: 'USDT',
  },
  {
    id: 'DEMO-1037',
    username: 'raul.demo',
    email: 'raul.ejemplo@kayro.test',
    license: 'Pro',
    amount: 75,
    status: 'pending',
    submittedAt: '2026-11-20T08:55:00',
    reference: 'DEMO-REF-1037',
    currency: 'USDT',
  },
  {
    id: 'DEMO-1036',
    username: 'ines.demo',
    email: 'ines.ejemplo@kayro.test',
    license: 'Inicio',
    amount: 25,
    status: 'completed',
    submittedAt: '2026-11-19T15:15:00',
    reference: 'DEMO-REF-1036',
    currency: 'USDT',
  },
]

const statusLabels: Record<PaymentStatus, string> = {
  pending: 'Pendiente',
  approved: 'Aprobado',
  completed: 'Completado',
  rejected: 'Rechazado',
}

const statusStyles: Record<PaymentStatus, string> = {
  pending: 'bg-[color-mix(in_srgb,var(--premium)_16%,var(--background))] text-[color-mix(in_srgb,var(--text-primary)_82%,var(--background))]',
  approved: 'bg-[color-mix(in_srgb,var(--info)_12%,var(--background))] text-(--info)',
  completed: 'bg-[color-mix(in_srgb,var(--primario)_12%,var(--background))] text-(--secundario)',
  rejected: 'bg-[color-mix(in_srgb,var(--error)_10%,var(--background))] text-(--error)',
}

const summaryCards: { status: PaymentStatus | 'all'; label: string; tone: string }[] = [
  { status: 'all', label: 'Pagos cargados', tone: 'text-(--text-primary)' },
  { status: 'pending', label: 'Pendientes', tone: 'text-[color-mix(in_srgb,var(--text-primary)_82%,var(--background))]' },
  { status: 'approved', label: 'Aprobados', tone: 'text-(--info)' },
  { status: 'completed', label: 'Completados', tone: 'text-(--secundario)' },
  { status: 'rejected', label: 'Rechazados', tone: 'text-(--error)' },
]

function formatDate(value: string) {
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function ConfimacionCompra() {
  const [payments, setPayments] = useState<PaymentRequest[]>([])
  const [loadStatus, setLoadStatus] = useState<'loading' | 'error' | 'success'>('loading')
  const [loadError, setLoadError] = useState('')
  const [actionError, setActionError] = useState('')
  const [action, setAction] = useState<{ id: string; status: 'approved' | 'rejected' } | null>(null)
  const [statusFilter, setStatusFilter] = useState<PaymentStatusFilter>('all')
  const [typeFilter, setTypeFilter] = useState<PaymentTypeFilter>('all')
  const [pageSize, setPageSize] = useState<PageSize>(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let active = true
    const timer = window.setTimeout(() => {
      if (!active) return

      try {
        setPayments([...demoPayments])
        setLoadError('')
        setLoadStatus('success')
      } catch {
        setLoadError('No se pudieron cargar las solicitudes de demostración.')
        setLoadStatus('error')
      }
    }, 350)

    return () => {
      active = false
      window.clearTimeout(timer)
    }
  }, [reloadKey])

  const filteredPayments = payments.filter(
    (payment) =>
      (statusFilter === 'all' || payment.status === statusFilter) &&
      (typeFilter === 'all' || payment.currency === typeFilter),
  )
  const totalPages = Math.max(1, Math.ceil(filteredPayments.length / pageSize))
  const visiblePage = Math.min(currentPage, totalPages)
  const pagePayments = filteredPayments.slice(
    (visiblePage - 1) * pageSize,
    visiblePage * pageSize,
  )
  const firstItem = filteredPayments.length === 0 ? 0 : (visiblePage - 1) * pageSize + 1
  const lastItem = Math.min(visiblePage * pageSize, filteredPayments.length)
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  function refreshPayments() {
    if (loadStatus === 'loading' || action) return
    setLoadStatus('loading')
    setLoadError('')
    setReloadKey((key) => key + 1)
  }

  function updateStatus(paymentId: string, nextStatus: 'approved' | 'rejected') {
    setActionError('')
    setAction({ id: paymentId, status: nextStatus })

    window.setTimeout(() => {
      try {
        setPayments((currentPayments) =>
          currentPayments.map((payment) =>
            payment.id === paymentId ? { ...payment, status: nextStatus } : payment,
          ),
        )
        setAction(null)
      } catch {
        setActionError(
          `No se pudo ${nextStatus === 'approved' ? 'aprobar' : 'rechazar'} la solicitud. Inténtalo de nuevo.`,
        )
        setAction(null)
      }
    }, 300)
  }

  return (
    <main className="min-h-[calc(100vh-4.5rem)] bg-(--surface) px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--secundario)">
              Administración
            </p>
            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-(--text-primary) sm:text-4xl">
              Gestión de Pagos
            </h1>
            <p className="mt-3 text-sm leading-6 text-[color-mix(in_srgb,var(--text-primary)_65%,var(--background))] sm:text-base">
              Revisa las solicitudes de compra de licencias y gestiona su estado.
            </p>
          </div>
          <button
            type="button"
            onClick={refreshPayments}
            disabled={loadStatus === 'loading' || Boolean(action)}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-(--quinario) px-4 text-sm font-semibold text-(--background) transition hover:bg-(--secundario) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primario) disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadStatus === 'loading' ? (
              <>
                <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />
                Actualizando…
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
                  <path d="M20 7v5h-5M4 17v-5h5" />
                  <path d="M5.6 9a7 7 0 0 1 11.6-2L20 12M4 12l2.8 5a7 7 0 0 0 11.6-2" />
                </svg>
                Actualizar lista
              </>
            )}
          </button>
        </header>

        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-[color-mix(in_srgb,var(--info)_20%,var(--background))] bg-[color-mix(in_srgb,var(--info)_6%,var(--background))] p-4">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-(--background) text-(--info)" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 11v5m0-8h.01" />
            </svg>
          </span>
          <p className="text-sm leading-6 text-(--text-primary)">
            <strong>Modo demostración:</strong> las solicitudes son ejemplos; aprobar o
            rechazar solo cambia el estado en esta vista. No hay pagos ni cambios guardados
            en el servidor. El único activo mostrado es USDT.
          </p>
        </div>

        {actionError && (
          <div className="mb-6 flex items-start justify-between gap-4 rounded-2xl border border-[color-mix(in_srgb,var(--error)_20%,var(--background))] bg-[color-mix(in_srgb,var(--error)_7%,var(--background))] px-4 py-3">
            <p role="alert" className="text-sm leading-6 text-(--error)">{actionError}</p>
            <button
              type="button"
              onClick={() => setActionError('')}
              aria-label="Cerrar alerta de acción"
              className="rounded-lg px-2 py-1 text-sm font-semibold text-(--error) hover:bg-(--error)/10 focus-visible:outline-2 focus-visible:outline-(--error)"
            >
              Cerrar
            </button>
          </div>
        )}

        <section aria-label="Resumen de pagos" className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {summaryCards.map((card) => {
            const count =
              card.status === 'all'
                ? payments.length
                : payments.filter((payment) => payment.status === card.status).length
            return (
              <article key={card.status} className="rounded-2xl border border-[color-mix(in_srgb,var(--border)_25%,var(--background))] bg-(--background) p-4 shadow-[0_12px_30px_-24px_color-mix(in_srgb,var(--quinario)_35%,transparent)] sm:p-5">
                <p className="text-xs font-medium leading-5 text-[color-mix(in_srgb,var(--text-primary)_62%,var(--background))]">
                  {card.label}
                </p>
                <p className={`mt-2 text-2xl font-semibold tabular-nums ${card.tone}`}>
                  {loadStatus === 'loading' ? '—' : count}
                </p>
              </article>
            )
          })}
        </section>

        <section className="overflow-hidden rounded-3xl border border-[color-mix(in_srgb,var(--border)_25%,var(--background))] bg-(--background) shadow-[0_20px_60px_-44px_color-mix(in_srgb,var(--quinario)_30%,transparent)]">
          <div className="flex flex-col gap-4 border-b border-[color-mix(in_srgb,var(--border)_20%,var(--background))] px-5 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-(--secundario)">
                Solicitudes de pago
              </p>
              <h2 className="text-lg font-semibold tracking-tight text-(--text-primary)">Compras de licencias</h2>
              {loadStatus === 'success' && (
                <p className="mt-1 text-sm text-[color-mix(in_srgb,var(--text-primary)_58%,var(--background))]">
                  {filteredPayments.length} {filteredPayments.length === 1 ? 'resultado' : 'resultados'}
                </p>
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:w-auto lg:min-w-[26rem]">
              <div>
                <label htmlFor="payment-status-filter" className="mb-1.5 block text-xs font-medium text-(--text-primary)">
                  Estado
                </label>
                <select
                  id="payment-status-filter"
                  value={statusFilter}
                  onChange={(event) => {
                    setStatusFilter(event.target.value as PaymentStatusFilter)
                    setCurrentPage(1)
                  }}
                  className="h-10 w-full rounded-xl border border-[color-mix(in_srgb,var(--border)_35%,var(--background))] bg-(--background) px-3 text-sm text-(--text-primary) outline-none focus:border-(--primario) focus:ring-4 focus:ring-[color-mix(in_srgb,var(--primario)_10%,transparent)]"
                >
                  <option value="all">Todos los estados</option>
                  <option value="pending">Pendientes</option>
                  <option value="approved">Aprobados</option>
                  <option value="completed">Completados</option>
                  <option value="rejected">Rechazados</option>
                </select>
              </div>
              <div>
                <label htmlFor="payment-type-filter" className="mb-1.5 block text-xs font-medium text-(--text-primary)">
                  Tipo de pago
                </label>
                <select
                  id="payment-type-filter"
                  value={typeFilter}
                  onChange={(event) => {
                    setTypeFilter(event.target.value as PaymentTypeFilter)
                    setCurrentPage(1)
                  }}
                  className="h-10 w-full rounded-xl border border-[color-mix(in_srgb,var(--border)_35%,var(--background))] bg-(--background) px-3 text-sm text-(--text-primary) outline-none focus:border-(--primario) focus:ring-4 focus:ring-[color-mix(in_srgb,var(--primario)_10%,transparent)]"
                >
                  <option value="all">Todos los tipos</option>
                  <option value="USDT">USDT</option>
                </select>
              </div>
            </div>
          </div>

          {loadStatus === 'loading' && (
            <div role="status" className="flex flex-col items-center justify-center gap-3 px-5 py-14">
              <span aria-hidden="true" className="h-8 w-8 animate-spin rounded-full border-2 border-[color-mix(in_srgb,var(--primario)_18%,var(--background))] border-t-(--primario)" />
              <p className="text-sm text-[color-mix(in_srgb,var(--text-primary)_60%,var(--background))]">Cargando solicitudes de demostración…</p>
            </div>
          )}

          {loadStatus === 'error' && (
            <div className="m-5 rounded-2xl bg-[color-mix(in_srgb,var(--error)_8%,var(--background))] px-5 py-8 text-center sm:m-6">
              <p role="alert" className="text-sm text-(--error)">{loadError}</p>
              <button
                type="button"
                onClick={refreshPayments}
                className="mt-4 rounded-xl bg-(--quinario) px-4 py-2.5 text-sm font-semibold text-(--background) transition hover:bg-(--secundario) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primario)"
              >
                Reintentar
              </button>
            </div>
          )}

          {loadStatus === 'success' && filteredPayments.length === 0 && (
            <div className="m-5 rounded-2xl border border-dashed border-[color-mix(in_srgb,var(--border)_45%,var(--background))] bg-(--surface) px-5 py-12 text-center sm:m-6">
              <h3 className="text-sm font-semibold text-(--text-primary)">No hay solicitudes para estos filtros.</h3>
              <p className="mt-1 text-sm text-[color-mix(in_srgb,var(--text-primary)_60%,var(--background))]">Prueba con otro estado o tipo de pago.</p>
            </div>
          )}

          {loadStatus === 'success' && filteredPayments.length > 0 && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] border-collapse text-left text-sm">
                  <thead className="bg-(--surface) text-[10px] uppercase tracking-[0.12em] text-[color-mix(in_srgb,var(--text-primary)_60%,var(--background))]">
                    <tr>
                      <th scope="col" className="px-5 py-3.5 font-semibold">Solicitud</th>
                      <th scope="col" className="px-5 py-3.5 font-semibold">Usuario</th>
                      <th scope="col" className="px-5 py-3.5 font-semibold">Licencia</th>
                      <th scope="col" className="px-5 py-3.5 font-semibold">Monto</th>
                      <th scope="col" className="px-5 py-3.5 font-semibold">Referencia</th>
                      <th scope="col" className="px-5 py-3.5 font-semibold">Fecha</th>
                      <th scope="col" className="px-5 py-3.5 font-semibold">Estado</th>
                      <th scope="col" className="px-5 py-3.5 text-right font-semibold">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[color-mix(in_srgb,var(--border)_20%,var(--background))]">
                    {pagePayments.map((payment) => (
                      <tr
                        key={payment.id}
                        className="text-[color-mix(in_srgb,var(--text-primary)_78%,var(--background))] transition-colors hover:bg-(--surface)"
                      >
                        <td className="whitespace-nowrap px-5 py-4">
                          <p className="font-mono text-xs font-semibold text-(--text-primary)">{payment.id}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-medium text-(--text-primary)">{payment.username}</p>
                          <p className="mt-1 max-w-44 break-all text-xs text-[color-mix(in_srgb,var(--text-primary)_58%,var(--background))]">
                            {payment.email}
                          </p>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 font-medium text-(--text-primary)">
                          {payment.license}
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 font-semibold text-(--text-primary)">
                          {payment.amount} {payment.currency}
                        </td>
                        <td className="px-5 py-4">
                          <span className="max-w-32 break-all font-mono text-xs text-[color-mix(in_srgb,var(--text-primary)_68%,var(--background))]">
                            {payment.reference}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-xs">
                          {formatDate(payment.submittedAt)}
                        </td>
                        <td className="whitespace-nowrap px-5 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[payment.status]}`}>
                            {statusLabels[payment.status]}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          {payment.status === 'pending' ? (
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => updateStatus(payment.id, 'rejected')}
                                disabled={Boolean(action)}
                                className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[color-mix(in_srgb,var(--error)_35%,var(--background))] px-3 text-xs font-semibold text-(--error) transition hover:bg-[color-mix(in_srgb,var(--error)_6%,var(--background))] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--error) disabled:cursor-not-allowed disabled:opacity-55"
                              >
                                {action?.id === payment.id && action.status === 'rejected' ? <span aria-hidden="true" className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-(--error)/30 border-t-(--error)" /> : null}
                                Rechazar
                              </button>
                              <button
                                type="button"
                                onClick={() => updateStatus(payment.id, 'approved')}
                                disabled={Boolean(action)}
                                className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-(--quinario) px-3 text-xs font-semibold text-(--background) transition hover:bg-(--secundario) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primario) disabled:cursor-not-allowed disabled:opacity-55"
                              >
                                {action?.id === payment.id && action.status === 'approved' ? <span aria-hidden="true" className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/35 border-t-white" /> : null}
                                Aprobar
                              </button>
                            </div>
                          ) : (
                            <p className="whitespace-nowrap text-right text-xs text-[color-mix(in_srgb,var(--text-primary)_55%,var(--background))]">
                              Sin acciones
                            </p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <nav
                aria-label="Paginación de solicitudes de pago"
                className="flex flex-col gap-4 border-t border-[color-mix(in_srgb,var(--border)_20%,var(--background))] px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between"
              >
                <p className="text-xs text-[color-mix(in_srgb,var(--text-primary)_60%,var(--background))]">
                  Mostrando {firstItem}–{lastItem} de {filteredPayments.length}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:justify-end">
                  <div className="flex flex-wrap items-center justify-center gap-1">
                    <button
                      type="button"
                      aria-label="Ir a la primera página"
                      onClick={() => setCurrentPage(1)}
                      disabled={visiblePage === 1}
                      className="h-9 rounded-lg border border-(--border)/35 px-2.5 text-xs font-semibold text-(--text-primary) hover:bg-(--surface) disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      «
                    </button>
                    <button
                      type="button"
                      aria-label="Ir a la página anterior"
                      onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                      disabled={visiblePage === 1}
                      className="h-9 rounded-lg border border-(--border)/35 px-2.5 text-xs font-semibold text-(--text-primary) hover:bg-(--surface) disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Anterior
                    </button>
                    {pageNumbers.map((page) => (
                      <button
                        key={page}
                        type="button"
                        aria-label={`Página ${page}`}
                        aria-current={page === visiblePage ? 'page' : undefined}
                        onClick={() => setCurrentPage(page)}
                        className={`h-9 min-w-9 rounded-lg px-2.5 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primario) ${
                          page === visiblePage
                            ? 'bg-(--quinario) text-(--background)'
                            : 'border border-(--border)/35 text-(--text-primary) hover:bg-(--surface)'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      type="button"
                      aria-label="Ir a la página siguiente"
                      onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                      disabled={visiblePage === totalPages}
                      className="h-9 rounded-lg border border-(--border)/35 px-2.5 text-xs font-semibold text-(--text-primary) hover:bg-(--surface) disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Siguiente
                    </button>
                    <button
                      type="button"
                      aria-label="Ir a la última página"
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={visiblePage === totalPages}
                      className="h-9 rounded-lg border border-(--border)/35 px-2.5 text-xs font-semibold text-(--text-primary) hover:bg-(--surface) disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      »
                    </button>
                  </div>
                  <label className="flex items-center justify-center gap-2 text-xs text-[color-mix(in_srgb,var(--text-primary)_65%,var(--background))]">
                    Por página
                    <select
                      aria-label="Elementos por página"
                      value={pageSize}
                      onChange={(event) => {
                        setPageSize(Number(event.target.value) as PageSize)
                        setCurrentPage(1)
                      }}
                      className="h-9 rounded-lg border border-(--border)/35 bg-(--background) px-2 text-xs text-(--text-primary) focus-visible:outline-2 focus-visible:outline-(--primario)"
                    >
                      {[5, 10, 25, 50].map((size) => <option key={size} value={size}>{size}</option>)}
                    </select>
                  </label>
                </div>
              </nav>
            </>
          )}
        </section>
      </div>
    </main>
  )
}

export default ConfimacionCompra