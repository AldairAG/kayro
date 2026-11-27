import type { RedUsuarioDto } from '../domain/red.dto'
import type { RedUsuario } from '../domain/red.types'

export function mapRedUsuarioDto(usuario: RedUsuarioDto): RedUsuario {
  const id = usuario.id
  const nivel = usuario.nivel

  if (
    typeof id !== 'number' ||
    !Number.isInteger(id) ||
    typeof nivel !== 'number' ||
    !Number.isInteger(nivel)
  ) {
    throw new Error('El servidor devolvió un integrante de red inválido.')
  }

  if (nivel < 1 || nivel > 7) {
    throw new Error('El servidor devolvió un nivel de red inválido.')
  }

  return {
    id,
    username: usuario.username ?? '',
    nombre: usuario.perfil?.nombre ?? '',
    apellidos: usuario.perfil?.apellidos ?? '',
    nivel,
  }
}
