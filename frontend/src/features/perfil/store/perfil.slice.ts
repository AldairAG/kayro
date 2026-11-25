import { createSlice } from '@reduxjs/toolkit'
import { loginUser } from '../../auth/application/usecase/login'
import { registerUser } from '../../auth/application/usecase/register'
import { logout } from '../../auth/store/auth.slice'
import { actualizarPerfil } from '../application/usecase/actualizarPerfil'
import type { Perfil } from '../domain/perfil.types'

type PerfilState = {
  data: Perfil | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: PerfilState = {
  data: null,
  status: 'idle',
  error: null,
}

const perfilSlice = createSlice({
  name: 'perfil',
  initialState,
  reducers: {
    clearPerfilFeedback(state) {
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(actualizarPerfil.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(actualizarPerfil.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(actualizarPerfil.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? action.error.message ?? 'No se pudo actualizar el perfil.'
      })
      .addCase(loginUser.pending, () => initialState)
      .addCase(registerUser.pending, () => initialState)
      .addCase(logout, () => initialState)
  },
})

export const { clearPerfilFeedback } = perfilSlice.actions
export default perfilSlice.reducer