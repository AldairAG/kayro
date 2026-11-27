import { createSlice } from '@reduxjs/toolkit'
import { logout } from '../../auth/store/auth.slice'
import { obtenerUsuarios } from '../application/query/obtenerUsuarios'
import type { Usuario } from '../domain/usuario.types'

type UsuarioState = {
  data: Usuario[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: UsuarioState = {
  data: [],
  status: 'idle',
  error: null,
}

const usuarioSlice = createSlice({
  name: 'usuario',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(obtenerUsuarios.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(obtenerUsuarios.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(obtenerUsuarios.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? action.error.message ?? 'No se pudieron cargar los usuarios.'
      })
      .addCase(logout, () => initialState)
  },
})

export default usuarioSlice.reducer
