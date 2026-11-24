import { createAsyncThunk } from '@reduxjs/toolkit'
import type { Usuario } from '../../domain/usuario.types'
import { obtenerUsuarios as obtenerUsuariosRequest } from '../../infrastructure/usuarioApi'

export const obtenerUsuarios = createAsyncThunk<
  Usuario[],
  void,
  { rejectValue: string }
>('usuario/obtenerTodos', async (_, { rejectWithValue }) => {
  try {
    return await obtenerUsuariosRequest()
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Ocurrió un error al cargar los usuarios.',
    )
  }
})
