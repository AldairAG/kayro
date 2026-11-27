import type { ReactNode } from 'react'

type AuthLayoutProps = {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
  footer: ReactNode
  onHome: () => void
}

function AuthLayout({
  eyebrow,
  title,
  description,
  children,
  footer,
  onHome,
}: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-(--surface) p-0 sm:p-5 lg:p-8">
      <div className="grid min-h-screen w-full max-w-[1280px] overflow-hidden bg-(--background) shadow-[0_32px_100px_-48px_color-mix(in_srgb,var(--quinario)_28%,transparent)] sm:min-h-[720px] sm:rounded-[28px] lg:grid-cols-[1.02fr_0.98fr]">
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-(--quinario) p-10 text-(--background) lg:flex xl:p-14">
          <div className="pointer-events-none absolute -right-28 -top-32 h-[440px] w-[440px] rounded-full border border-[color-mix(in_srgb,var(--background)_6%,transparent)]" />
          <div className="pointer-events-none absolute -right-12 -top-16 h-[300px] w-[300px] rounded-full border border-[color-mix(in_srgb,var(--background)_6%,transparent)]" />
          <div className="pointer-events-none absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-[color-mix(in_srgb,var(--cuaternario)_35%,transparent)] blur-3xl" />

          <button
            type="button"
            onClick={onHome}
            className="relative flex w-fit items-center gap-3 text-left"
            aria-label="Volver al inicio de Kayro"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-(--terciario) text-(--quinario)">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                <path d="M5 18V6h3v5.1L13 6h4l-5.8 6L17.5 18h-4l-4.2-4.8L8 14.6V18H5Z" fill="currentColor" />
                <circle cx="18.5" cy="7" r="2" fill="currentColor" />
              </svg>
            </span>
            <span className="text-xl font-semibold tracking-wide">kayro</span>
          </button>

          <div className="relative my-12 max-w-lg">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--background)_10%,transparent)] bg-[color-mix(in_srgb,var(--background)_4%,transparent)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--background)_65%,transparent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-(--terciario)" />
              Centro de inversión
            </div>
            <h2 className="text-4xl font-semibold leading-[1.12] tracking-tight xl:text-[3.25rem]">
              Tu estrategia,
              <br />
              <span className="text-(--terciario)">en una sola vista.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-[color-mix(in_srgb,var(--background)_60%,transparent)] xl:text-base">
              Consulta tu actividad y administra tu portafolio desde un espacio pensado para invertir con claridad.
            </p>
          </div>

          <div className="relative rounded-2xl border border-[color-mix(in_srgb,var(--background)_10%,transparent)] bg-[color-mix(in_srgb,var(--background)_6%,transparent)] p-5 shadow-2xl backdrop-blur-sm xl:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[color-mix(in_srgb,var(--background)_90%,transparent)]">Resumen de portafolio</p>
                <p className="mt-1 text-xs text-[color-mix(in_srgb,var(--background)_40%,transparent)]">Vista general de tu cuenta</p>
              </div>
              <span className="rounded-lg border border-[color-mix(in_srgb,var(--background)_10%,transparent)] bg-[color-mix(in_srgb,var(--background)_4%,transparent)] px-2.5 py-1 text-[10px] font-medium text-[color-mix(in_srgb,var(--background)_55%,transparent)]">
                PANEL
              </span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] text-[color-mix(in_srgb,var(--background)_45%,transparent)]">Valor del portafolio</p>
                <p className="mt-1 text-xl font-semibold tracking-tight text-(--background)">— — —</p>
              </div>
              <div>
                <p className="text-[11px] text-[color-mix(in_srgb,var(--background)_45%,transparent)]">Rendimiento</p>
                <p className="mt-1 text-xl font-semibold tracking-tight text-(--background)">— —</p>
              </div>
            </div>
            <div className="mt-5 h-16 overflow-hidden rounded-lg bg-[color-mix(in_srgb,var(--background)_3%,transparent)]">
              <svg viewBox="0 0 420 64" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
                <path d="M0 49H420M0 31H420M0 13H420" stroke="var(--background)" strokeOpacity=".07" />
                <path d="M0 49C30 48 34 39 61 41S96 50 126 36 165 43 192 28 230 36 260 23 301 32 327 17 371 24 420 7" fill="none" stroke="var(--terciario)" strokeWidth="2" />
                <path d="M0 49C30 48 34 39 61 41S96 50 126 36 165 43 192 28 230 36 260 23 301 32 327 17 371 24 420 7V64H0Z" fill="url(#portfolio-chart-fill)" />
                <defs>
                  <linearGradient id="portfolio-chart-fill" x1="210" y1="7" x2="210" y2="64" gradientUnits="userSpaceOnUse">
                    <stop stopColor="var(--terciario)" stopOpacity=".16" />
                    <stop offset="1" stopColor="var(--terciario)" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <p className="relative mt-8 text-xs text-[color-mix(in_srgb,var(--background)_35%,transparent)]">
            Información clara para tomar tus propias decisiones.
          </p>
        </aside>

        <section className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-14 xl:px-20">
          <div className="w-full max-w-[400px]">
            <button
              type="button"
              onClick={onHome}
              className="mb-10 inline-flex items-center gap-2 text-lg font-bold text-(--quinario) lg:hidden"
              aria-label="Volver al inicio de Kayro"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-(--quinario) text-(--terciario)">
                <span aria-hidden="true">K</span>
              </span>
              kayro
            </button>

            <div className="mb-5 flex justify-end">
              <button
                type="button"
                onClick={onHome}
                className="text-sm font-medium text-[color-mix(in_srgb,var(--text-primary)_65%,var(--background))] transition hover:text-(--quinario) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primario)"
              >
                ← Volver al inicio
              </button>
            </div>
            <div className="mb-8">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--secundario)">
                {eyebrow}
              </p>
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-(--text-primary) sm:text-[2.35rem]">
                {title}
              </h1>
              <p className="mt-3 text-sm leading-6 text-[color-mix(in_srgb,var(--text-primary)_65%,var(--background))] sm:text-[15px]">{description}</p>
            </div>

            {children}
            <div className="mt-8 border-t border-[color-mix(in_srgb,var(--border)_25%,var(--background))] pt-6 text-center text-sm text-[color-mix(in_srgb,var(--text-primary)_60%,var(--background))]">
              {footer}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AuthLayout
