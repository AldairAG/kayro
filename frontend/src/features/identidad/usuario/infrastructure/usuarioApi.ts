import { apiBase } from '../../../../app/api/apiBase'
import type { FiltroUsuariosDto, UsuarioDto } from '../domain/usuario.dto'
import type { Usuario } from '../domain/usuario.types'
import { mapUsuarioDto } from './usuario.mapper'

const pageSize = 100

export async function obtenerUsuarios(): Promise<Usuario[]> {
  const usuarios: Usuario[] = []
  let pagina = 0

  while (true) {
    const filtro: FiltroUsuariosDto = {
      busqueda: '',
      pagina,
      tamanio: pageSize,
      ordenarPor: 'username',
      direccion: 'ASC',
    }
    const response = await apiBase.get<UsuarioDto[]>('/usuario/', { data: filtro })

    if (!response.success || !Array.isArray(response.data)) {
      throw new Error(response.message || 'El servidor devolvió una lista de usuarios inválida.')
    }

    usuarios.push(...response.data.map(mapUsuarioDto))
    if (response.data.length < pageSize) {
      return usuarios
    }

    pagina += 1
  }
}
