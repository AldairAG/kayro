import type { ReactNode } from 'react'

type AuthLayoutProps = {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
  footer: ReactNode
}

function AuthLayout({
  eyebrow,
  title,
  description,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas p-4 sm:p-8">
      <div className="grid min-h-[680px] w-full max-w-6xl overflow-hidden rounded-[2rem] bg-surface shadow-[0_28px_90px_-42px_rgba(16,43,73,0.38)] lg:grid-cols-[0.92fr_1.08fr]">
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700 p-12 text-white lg:flex xl:p-16">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />
          <div className="absolute -bottom-40 -left-36 h-[28rem] w-[28rem] rounded-full border border-white/10" />
          <div className="absolute bottom-24 right-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />

          <a href="/" className="relative flex w-fit items-center gap-3" aria-label="Kayro inicio">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                <path d="M5 18V6h3v5.1L13 6h4l-5.8 6L17.5 18h-4l-4.2-4.8L8 14.6V18H5Z" fill="currentColor" />
                <circle cx="18.5" cy="7" r="2" fill="#E47B59" />
              </svg>
            </span>
            <span className="text-xl font-semibold tracking-wide">kayro</span>
          </a>

          <div className="relative max-w-md pb-8">
            <div className="mb-6 h-1 w-12 rounded-full bg-accent" />
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white/65">
              Tu negocio, en equilibrio
            </p>
            <h2 className="text-4xl font-semibold leading-[1.15] tracking-tight xl:text-5xl">
              Cada detalle cuenta. Nosotros te ayudamos a conectarlos.
            </h2>
            <p className="mt-6 max-w-sm text-base leading-7 text-white/70">
              Administra tus productos, recetas e inventario desde un solo lugar.
            </p>
          </div>

          <p className="relative text-sm text-white/45">Una mejor forma de llevar tu operación.</p>
        </aside>

        <section className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-14 xl:px-20">
          <div className="w-full max-w-md">
            <a href="/" className="mb-10 inline-flex items-center gap-2 text-lg font-bold text-brand-900 lg:hidden">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-900 text-white">
                <span aria-hidden="true">K</span>
              </span>
              kayro
            </a>

            <div className="mb-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-strong">
                {eyebrow}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-[2.15rem]">
                {title}
              </h1>
              <p className="mt-3 text-sm leading-6 text-muted sm:text-base">{description}</p>
            </div>

            {children}
            <div className="mt-8 border-t border-line pt-6 text-center text-sm text-muted">
              {footer}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AuthLayout
