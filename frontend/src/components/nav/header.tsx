import logoKayro from '../../assets/KAYRO_transparente.webp'

type HeaderProps = {
  onLogout: () => void
}

function Header({ onLogout }: HeaderProps) {
  return (
    <header className="border-b border-(--border)/40 bg-(--background)">
      <div className="flex h-[4.5rem] w-full items-center justify-between px-4 sm:px-8">
        <img src={logoKayro} alt="Kayro" className="h-12 w-auto" />
        <button
          type="button"
          onClick={onLogout}
          className="rounded-xl bg-(--quinario) px-4 py-2.5 text-sm font-semibold text-(--background) transition hover:bg-(--secundario) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primario)"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  )
}

export default Header