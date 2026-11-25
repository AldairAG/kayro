import type { UsuarioDto } from '../domain/usuario.dto'
import type { Usuario } from '../domain/usuario.types'

export function mapUsuarioDto(usuario: UsuarioDto): Usuario {
  return {
    id: usuario.id ?? null,
    username: usuario.username ?? '',
    email: usuario.email ?? '',
    nombre: usuario.perfil?.nombre ?? '',
    apellidos: usuario.perfil?.apellidos ?? '',
  }
}
