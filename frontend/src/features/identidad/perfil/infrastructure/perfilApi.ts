import { apiBase } from '../../../../app/api/apiBase'
import type { ActualizarPerfilDto, UsuarioPerfilDto } from '../domain/perfil.dto'

export async function actualizarPerfil(
  perfil: ActualizarPerfilDto,
): Promise<UsuarioPerfilDto> {
  const response = await apiBase.put<UsuarioPerfilDto>('/usuario/perfil', perfil)

  if (!response.success || !response.data) {
    throw new Error(response.message || 'No se pudo actualizar el perfil.')
  }

  return response.data
}