import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AuthResponseDto } from '../../domain/auth.dto'
import { register as registerRequest } from '../../infrastructure/authApi'
import { storeAuthToken } from '../../infrastructure/authTokenStorage'

export type RegisterCredentials = {
  nombre: string
  username: string
  email: string
  password: string
}

export const registerUser = createAsyncThunk<
  AuthResponseDto,
  RegisterCredentials,
  { rejectValue: string }
>('auth/register', async (credentials, { rejectWithValue }) => {
  try {
    const session = await registerRequest({ ...credentials, rol: 'USUARIO' })
    storeAuthToken(session.token, false)
    return session
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Ocurrió un error al crear la cuenta.',
    )
  }
})
