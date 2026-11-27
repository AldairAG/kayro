import logoKayro from '../../assets/KAYRO_transparente.webp'
import { routes } from '../../routes'

type LandingPageProps = {
  onNavigate: (view: (typeof routes.auth)[keyof typeof routes.auth]) => void
}

const positions = [
  { name: 'Acciones', amount: '$60,206.40', weight: 48, change: '+2.4%', up: true },
  { name: 'Fondos', amount: '$46,409.10', weight: 37, change: '+1.1%', up: true },
  { name: 'Bonos', amount: '$18,814.50', weight: 15, change: '−0.3%', up: false },
]

const menu = ['Resumen', 'Portafolio', 'Movimientos', 'Reportes']

const capabilities = [
  {
    title: 'Acciones',
    text: 'Consulta el mercado y sigue las posiciones que te interesan.',
  },
  {
    title: 'Fondos',
    text: 'Compara alternativas para diversificar tu portafolio.',
  },
  {
    title: 'Bonos',
    text: 'Conoce opciones de renta fija y cómo encajan en tu plan.',
  },
]

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--info)]'

function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <main className="min-h-screen bg-(--surface) text-(--text-primary)">
      {/* Barra superior */}
      <header className="border-b border-(--border)/40 bg-(--background)">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="#inicio"
            className={`flex items-center gap-3 text-(--quinario) no-underline ${focusRing}`}
            aria-label="Kayro, inicio"
          >
            <img src={logoKayro} alt="Kayro" className="h-12 w-auto" />
          </a>

          <nav aria-label="Acceso a tu cuenta" className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => onNavigate(routes.auth.forgotPassword)}
              className={`hidden rounded-lg px-3 py-2 text-sm font-medium text-(--text-primary)/70 transition hover:text-(--secundario) md:inline ${focusRing}`}
            >
              ¿Olvidaste tu contraseña?
            </button>
            <button
              type="button"
              onClick={() => onNavigate(routes.auth.login)}
              className={`rounded-lg px-3 py-2 text-sm font-semibold text-(--secundario) transition hover:bg-(--surface) sm:px-4 ${focusRing}`}
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              onClick={() => onNavigate(routes.auth.register)}
              className={`rounded-lg bg-(--secundario) px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-(--quinario) ${focusRing}`}
            >
              Crear cuenta
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section
        id="inicio"
        className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 lg:py-20"
      >
        <div className="max-w-xl">
          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-(--quinario) sm:text-5xl">
            Tu portafolio, ordenado como un backoffice.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-(--text-primary)/75 sm:text-lg">
            Consulta tus posiciones, movimientos y rendimiento en un solo panel.
            Crea tu cuenta para comenzar a conocer la plataforma.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => onNavigate(routes.auth.register)}
              className={`inline-flex h-12 items-center justify-center rounded-lg bg-(--secundario) px-6 text-sm font-semibold text-white transition hover:bg-(--quinario) ${focusRing}`}
            >
              Crear una cuenta
            </button>
            <button
              type="button"
              onClick={() => onNavigate(routes.auth.login)}
              className={`inline-flex h-12 items-center justify-center rounded-lg border border-(--border) bg-(--background) px-6 text-sm font-semibold text-(--quinario) transition hover:border-(--secundario) hover:text-(--secundario) ${focusRing}`}
            >
              Ya tengo una cuenta
            </button>
          </div>

          <button
            type="button"
            onClick={() => onNavigate(routes.auth.forgotPassword)}
            className={`mt-5 rounded text-sm font-medium text-(--text-primary)/70 underline-offset-4 transition hover:text-(--secundario) hover:underline md:hidden ${focusRing}`}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {/* Vista previa del panel */}
        <div aria-hidden="true" className="w-full">
          <div className="overflow-hidden rounded-xl border border-(--border)/60 bg-(--background) shadow-[0_24px_60px_-28px_rgba(0,61,51,0.45)]">
            <div className="flex">
              {/* Menú lateral */}
              <div className="hidden w-44 shrink-0 flex-col bg-(--quinario) px-3 py-5 sm:flex">
                <div className="mb-6 flex items-center gap-2 px-2">
                  <span className="grid h-6 w-6 place-items-center rounded-md bg-(--terciario) text-xs font-bold text-(--quinario)">
                    K
                  </span>
                  <span className="text-sm font-semibold text-white">kayro</span>
                </div>
                <ul className="space-y-1">
                  {menu.map((item, index) => (
                    <li
                      key={item}
                      className={
                        index === 0
                          ? 'rounded-md bg-white/10 px-3 py-2 text-sm font-medium text-white shadow-[inset_2px_0_0_var(--terciario)]'
                          : 'rounded-md px-3 py-2 text-sm text-white/60'
                      }
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contenido */}
              <div className="min-w-0 flex-1 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-(--text-primary)/60">Valor del portafolio</p>
                    <p className="mt-1 text-3xl font-semibold tracking-tight tabular-nums text-(--quinario) sm:text-4xl">
                      $125,430.00
                    </p>
                    <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-(--secundario)">
                      <svg viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor">
                        <path d="M6 2 11 9H1z" />
                      </svg>
                      +4.2% este mes
                    </p>
                  </div>
                  <span className="rounded-md border border-(--premium)/60 bg-(--premium)/10 px-2.5 py-1 text-xs font-medium text-(--text-primary)">
                    Datos ilustrativos
                  </span>
                </div>

                <div className="mt-5 h-28 w-full">
                  <svg viewBox="0 0 320 80" fill="none" preserveAspectRatio="none" className="h-full w-full">
                    <defs>
                      <linearGradient id="portfolio-chart-fill" x1="160" y1="8" x2="160" y2="80" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00B140" stopOpacity=".22" />
                        <stop offset="1" stopColor="#00B140" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0 64C24 61 24 48 48 52S75 62 96 48 125 39 144 45 169 56 192 34 219 40 240 27 271 32 288 17 307 21 320 8V80H0V64Z" fill="url(#portfolio-chart-fill)" />
                    <path d="M0 64C24 61 24 48 48 52S75 62 96 48 125 39 144 45 169 56 192 34 219 40 240 27 271 32 288 17 307 21 320 8" stroke="#00B140" strokeLinecap="round" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                  </svg>
                </div>

                {/* Posiciones */}
                <table className="mt-5 w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-(--border)/50 text-xs text-(--text-primary)/60">
                      <th className="py-2 font-medium">Posición</th>
                      <th className="hidden py-2 font-medium sm:table-cell">Peso</th>
                      <th className="py-2 text-right font-medium">Valor</th>
                      <th className="py-2 text-right font-medium">Variación</th>
                    </tr>
                  </thead>
                  <tbody className="tabular-nums">
                    {positions.map((row) => (
                      <tr key={row.name} className="border-b border-(--border)/30 last:border-0">
                        <td className="py-3 font-medium text-(--text-primary)">{row.name}</td>
                        <td className="hidden py-3 sm:table-cell">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-(--surface)">
                              <div
                                className="h-full rounded-full bg-(--cuaternario)"
                                style={{ width: `${row.weight}%` }}
                              />
                            </div>
                            <span className="text-xs text-(--text-primary)/60">{row.weight}%</span>
                          </div>
                        </td>
                        <td className="py-3 text-right text-(--text-primary)">{row.amount}</td>
                        <td
                          className={`py-3 text-right font-medium ${row.up ? 'text-(--secundario)' : 'text-(--error)'
                            }`}
                        >
                          {row.change}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-(--text-primary)/60">
            Los datos mostrados son ilustrativos y no representan rendimientos reales.
          </p>
        </div>
      </section>

      {/* Qué puedes seguir */}
      <section className="border-t border-(--border)/40 bg-(--background)">
        <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
          <h2 className="max-w-md text-2xl font-semibold tracking-tight text-(--quinario) sm:text-3xl">
            Un solo lugar para cada tipo de inversión
          </h2>
          <dl className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {capabilities.map((item) => (
              <div key={item.title} className="border-t-2 border-(--cuaternario) pt-4">
                <dt className="text-base font-semibold text-(--quinario)">{item.title}</dt>
                <dd className="mt-2 max-w-xs text-sm leading-6 text-(--text-primary)/75">
                  {item.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <footer className="bg-(--quinario) px-5 py-6 text-center text-xs text-white/70">
        © 2026 Kayro. Invierte con claridad.
      </footer>
    </main>
  )
}

export default LandingPage