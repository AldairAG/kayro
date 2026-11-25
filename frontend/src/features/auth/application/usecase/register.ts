import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AuthSessionDto } from '../../domain/auth.dto'
import { register as registerRequest } from '../../infrastructure/authApi'
import { storeAuthToken } from '../../infrastructure/authTokenStorage'
import { getRoleFromJwt } from '../../infrastructure/jwtRole'

export type RegisterCredentials = {
  nombre: string
  username: string
  email: string
  password: string
}

export const registerUser = createAsyncThunk<
  AuthSessionDto,
  RegisterCredentials,
  { rejectValue: string }
>('auth/register', async (credentials, { rejectWithValue }) => {
  try {
    const response = await registerRequest({ ...credentials, rol: 'USUARIO' })
    const session = {
      ...response.data,
      rol: getRoleFromJwt(response.data.token),
    }
    storeAuthToken(session.token, false)
    return session
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Ocurrió un error al crear la cuenta.',
    )
  }
})
