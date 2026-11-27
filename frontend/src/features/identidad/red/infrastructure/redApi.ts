import { apiBase } from '../../../../app/api/apiBase'
import type { RedUsuarioDto } from '../domain/red.dto'
import type { RedUsuario } from '../domain/red.types'
import { mapRedUsuarioDto } from './red.mapper'

export async function obtenerRed(usuarioId: number): Promise<RedUsuario[]> {
  const response = await apiBase.get<RedUsuarioDto[]>(`/usuario/red/${usuarioId}`)

  if (!response.success || !Array.isArray(response.data)) {
    throw new Error(response.message || 'El servidor devolvió una red inválida.')
  }

  return response.data.map(mapRedUsuarioDto)
}
