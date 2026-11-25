import type { PerfilFormValues } from './perfil.types'

export type PerfilDto = {
  id?: number | null
  nombre?: string | null
  apellidos?: string | null
  telefono?: string | null
  pais?: string | null
  lada?: string | null
}

export type UsuarioPerfilDto = {
  id?: number | null
  username?: string | null
  email?: string | null
  perfil?: PerfilDto | null
}

export type ActualizarPerfilDto = PerfilFormValues