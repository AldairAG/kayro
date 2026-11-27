import { createSlice } from '@reduxjs/toolkit'
import type { AuthSessionDto } from '../domain/auth.dto'
import { getStoredAuthToken } from '../infrastructure/authTokenStorage'
import { loginUser } from '../application/usecase/login'
import { registerUser } from '../application/usecase/register'

type AuthState = {
  token: string | null
  user: Pick<AuthSessionDto, 'id' | 'email' | 'rol' | 'username'> | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: AuthState = {
  token: getStoredAuthToken(),
  user: null,
  status: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthFeedback(state) {
      state.status = 'idle'
      state.error = null
    },
    logout(state) {
      state.token = null
      state.user = null
      state.status = 'idle'
      state.error = null
    }
  },
  extraReducers(builder) {
    for (const thunk of [loginUser, registerUser]) {
      builder
        .addCase(thunk.pending, (state) => {
          state.status = 'loading'
          state.error = null
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.token = action.payload.token
          state.user = {
            id: action.payload.id,
            email: action.payload.email,
            rol: action.payload.rol,
            username: action.payload.username,
          }
          state.status = 'succeeded'
          state.error = null
        })
        .addCase(thunk.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.payload ?? action.error.message ?? 'Ocurrió un error desconocido.'
        })
    }
  },
})

export const { clearAuthFeedback, logout } = authSlice.actions
export default authSlice.reducer
