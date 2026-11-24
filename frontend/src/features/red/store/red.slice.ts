import { createSlice } from '@reduxjs/toolkit'
import { loginUser } from '../../auth/application/usecase/login'
import { registerUser } from '../../auth/application/usecase/register'
import { logout } from '../../auth/store/auth.slice'
import { obtenerRed } from '../application/query/obtenerRed'
import type { RedUsuario } from '../domain/red.types'

type RedState = {
  data: RedUsuario[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: RedState = {
  data: [],
  status: 'idle',
  error: null,
}

const redSlice = createSlice({
  name: 'red',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(obtenerRed.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(obtenerRed.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(obtenerRed.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? action.error.message ?? 'No se pudo cargar tu red.'
      })
      .addCase(loginUser.pending, () => initialState)
      .addCase(registerUser.pending, () => initialState)
      .addCase(logout, () => initialState)
  },
})

export default redSlice.reducer
