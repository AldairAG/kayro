type LandingPageProps = {
  onNavigate: (view: 'login' | 'register' | 'forgot-password') => void
}

function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <main className="min-h-screen bg-[var(--terceario)] text-[color-mix(in_srgb,var(--primario)_15%,black)]">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <a
          href="#inicio"
          className="flex items-center gap-3 text-[color-mix(in_srgb,var(--primario)_80%,black)] no-underline"
          aria-label="Kayro, inicio"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--primario)] text-lg font-bold text-white">
            K
          </span>
          <span className="text-xl font-semibold tracking-tight">kayro</span>
        </a>

        <nav aria-label="Acceso a tu cuenta" className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('forgot-password')}
            className="hidden text-sm font-medium text-[color-mix(in_srgb,var(--primario)_45%,white)] transition hover:text-[var(--primario)] sm:inline"
          >
            ¿Olvidaste tu contraseña?
          </button>
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="rounded-xl px-3 py-2 text-sm font-semibold text-[var(--primario)] transition hover:bg-[color-mix(in_srgb,var(--primario)_5%,white)] sm:px-4"
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={() => onNavigate('register')}
            className="rounded-xl bg-[var(--primario)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[color-mix(in_srgb,var(--primario)_80%,white)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_srgb,var(--primario)_65%,white)]"
          >
            Crear cuenta
          </button>
        </nav>
      </header>

      <section
        id="inicio"
        className="mx-auto grid min-h-[calc(100vh-144px)] w-full max-w-6xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-20"
      >
        <div className="max-w-xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-[color-mix(in_srgb,var(--primario)_5%,white)] px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--primario)_80%,white)]">
            <span className="h-2 w-2 rounded-full bg-[var(--secundario)]" />
            Invierte con claridad
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[color-mix(in_srgb,var(--primario)_15%,black)] sm:text-5xl lg:text-6xl">
            Haz crecer tus metas,{' '}
            <span className="text-[color-mix(in_srgb,var(--primario)_80%,white)]">a tu manera.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-[color-mix(in_srgb,var(--primario)_45%,white)] sm:text-lg">
            Explora opciones de inversión y sigue tu portafolio desde un solo lugar.
            Crea tu cuenta para comenzar a conocer la plataforma.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--primario)] px-6 text-sm font-semibold text-white shadow-lg transition hover:bg-[color-mix(in_srgb,var(--primario)_80%,white)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_srgb,var(--primario)_65%,white)]"
            >
              Crear una cuenta
              <span aria-hidden="true">→</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[color-mix(in_srgb,var(--primario)_10%,white)] bg-[color-mix(in_srgb,var(--terceario)_35%,white)] px-6 text-sm font-semibold text-[var(--primario)] transition hover:bg-[color-mix(in_srgb,var(--primario)_5%,white)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_srgb,var(--primario)_65%,white)]"
            >
              Ya tengo una cuenta
            </button>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('forgot-password')}
            className="mt-5 text-sm font-medium text-[color-mix(in_srgb,var(--primario)_45%,white)] transition hover:text-[var(--primario)] sm:hidden"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <div
          aria-hidden="true"
          className="relative mx-auto w-full max-w-md rounded-[2rem] bg-gradient-to-br from-[color-mix(in_srgb,var(--primario)_80%,black)] via-[var(--primario)] to-[color-mix(in_srgb,var(--primario)_65%,white)] p-6 text-white shadow-2xl sm:p-8"
        >
          <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-[color-mix(in_srgb,var(--secundario)_25%,transparent)] blur-2xl" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm text-white/65">Portafolio de ejemplo</p>
              <p className="mt-1 text-xl font-semibold">Tu visión, en un solo lugar</p>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-[var(--secundario)]">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                <path d="M4 17 9 12l3 3 7-8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d="M14 7h5v5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </span>
          </div>

          <div className="relative mt-8 rounded-2xl border border-white/10 bg-white/10 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/55">Valor ilustrativo</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">$125,430.00</p>
            <div className="mt-4 h-20 w-full">
              <svg viewBox="0 0 320 80" fill="none" preserveAspectRatio="none" className="h-full w-full">
                <path d="M0 64C24 61 24 48 48 52S75 62 96 48 125 39 144 45 169 56 192 34 219 40 240 27 271 32 288 17 307 21 320 8" stroke="#e47b59" strokeLinecap="round" strokeWidth="3" />
                <path d="M0 64C24 61 24 48 48 52S75 62 96 48 125 39 144 45 169 56 192 34 219 40 240 27 271 32 288 17 307 21 320 8V80H0V64Z" fill="url(#portfolio-chart-fill)" />
                <defs>
                  <linearGradient id="portfolio-chart-fill" x1="160" y1="8" x2="160" y2="80" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#e47b59" stopOpacity=".28" />
                    <stop offset="1" stopColor="#e47b59" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="relative mt-4 space-y-3">
            {[
              ['Acciones', 'Explora el mercado'],
              ['Fondos', 'Diversifica tu portafolio'],
              ['Bonos', 'Conoce otras alternativas'],
            ].map(([label, status]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-4"
              >
                <span className="font-medium">{label}</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/75">
                  {status}
                </span>
              </div>
            ))}
          </div>
          <p className="relative mt-7 text-sm leading-6 text-white/65">
            Los datos mostrados son ilustrativos y no representan rendimientos reales.
          </p>
        </div>
      </section>

      <footer className="px-5 py-5 text-center text-xs text-[color-mix(in_srgb,var(--primario)_45%,white)]">
        © 2026 Kayro. Invierte con claridad.
      </footer>
    </main>
  )
}

export default LandingPage