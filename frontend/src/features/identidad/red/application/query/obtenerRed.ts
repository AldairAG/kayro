import { createAsyncThunk } from '@reduxjs/toolkit'
import type { RedUsuario } from '../../domain/red.types'
import { obtenerRed as obtenerRedRequest } from '../../infrastructure/redApi'

export const obtenerRed = createAsyncThunk<
  RedUsuario[],
  number,
  { rejectValue: string }
>('red/obtener', async (usuarioId, { rejectWithValue }) => {
  if (!Number.isInteger(usuarioId) || usuarioId <= 0) {
    return rejectWithValue('No se pudo determinar el usuario de la sesión.')
  }

  try {
    return await obtenerRedRequest(usuarioId)
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Ocurrió un error al cargar tu red.',
    )
  }
})
