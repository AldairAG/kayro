import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ActualizarPerfilDto } from '../../domain/perfil.dto'
import type { Perfil } from '../../domain/perfil.types'
import { mapUsuarioDtoToPerfil } from '../../infrastructure/perfil.mapper'
import { actualizarPerfil as actualizarPerfilRequest } from '../../infrastructure/perfilApi'

export const actualizarPerfil = createAsyncThunk<
  Perfil,
  ActualizarPerfilDto,
  { rejectValue: string }
>('perfil/actualizar', async (perfil, { rejectWithValue }) => {
  try {
    const usuario = await actualizarPerfilRequest(perfil)
    return mapUsuarioDtoToPerfil(usuario)
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Ocurrió un error al actualizar el perfil.',
    )
  }
})