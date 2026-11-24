export type RedUsuarioDto = {
  id?: number | null
  username?: string | null
  perfil?: {
    nombre?: string | null
    apellidos?: string | null
  } | null
  nivel?: number | null
}
