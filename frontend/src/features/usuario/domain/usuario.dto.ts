export type FiltroUsuariosDto = {
  busqueda: string
  pagina: number
  tamanio: number
  ordenarPor: 'username'
  direccion: 'ASC'
}

export type UsuarioDto = {
  id?: number | null
  username?: string | null
  email?: string | null
  perfil?: {
    nombre?: string | null
    apellidos?: string | null
  } | null
}
