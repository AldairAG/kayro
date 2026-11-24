import type { UsuarioPerfilDto } from '../domain/perfil.dto'
import type { Perfil } from '../domain/perfil.types'

export function mapUsuarioDtoToPerfil(usuario: UsuarioPerfilDto): Perfil {
  return {
    id: usuario.id ?? undefined,
    username: usuario.username ?? undefined,
    email: usuario.email ?? undefined,
    nombre: usuario.perfil?.nombre ?? '',
    apellidos: usuario.perfil?.apellidos ?? '',
    telefono: usuario.perfil?.telefono ?? '',
    pais: usuario.perfil?.pais ?? '',
    lada: usuario.perfil?.lada ?? '',
  }
}